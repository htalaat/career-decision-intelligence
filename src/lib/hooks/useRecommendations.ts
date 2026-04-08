import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase/client";
import { useAuthStore } from "../../stores/authStore";
import { useRecommendationStore } from "../../stores/recommendationStore";
import { generateRecommendations } from "../engine/rank";
import type { EngineProfile, EngineCareerPath } from "../engine/types";
import { trackEvent, EVENTS } from "../utils/analytics";

/** Fetch the latest recommendation run for the current user */
export function useLatestRecommendation() {
  const userId = useAuthStore((s) => s.user?.id);

  return useQuery({
    queryKey: ["recommendations", "latest", userId],
    queryFn: async () => {
      if (!userId) throw new Error("Not authenticated");

      // Get latest run
      const { data: run, error: runError } = await supabase
        .from("recommendation_runs")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (runError) {
        if (runError.code === "PGRST116") return null; // no runs yet
        throw runError;
      }

      // Get items for this run
      const { data: items, error: itemsError } = await supabase
        .from("recommendation_items")
        .select("*")
        .eq("run_id", run.id)
        .order("rank");

      if (itemsError) throw itemsError;

      return { run, items };
    },
    enabled: !!userId,
  });
}

/** Run the engine, save results to Supabase, return the run ID */
export function useRunRecommendations() {
  const userId = useAuthStore((s) => s.user?.id);
  const queryClient = useQueryClient();
  const setLatestRunId = useRecommendationStore((s) => s.setLatestRunId);

  return useMutation({
    mutationFn: async ({
      engineProfile,
      careerPaths,
    }: {
      engineProfile: EngineProfile;
      careerPaths: EngineCareerPath[];
    }) => {
      if (!userId) throw new Error("Not authenticated");

      // Run the deterministic engine
      const result = generateRecommendations(engineProfile, careerPaths);

      // Save the run
      const { data: run, error: runError } = await supabase
        .from("recommendation_runs")
        .insert({
          user_id: userId,
          profile_snapshot: result.profileSnapshot as unknown as Record<string, unknown>,
          scoring_model_version: result.scoringModelVersion,
        })
        .select("id")
        .single();

      if (runError) throw runError;

      // Save all items
      const items = result.scoredPaths.map((sp) => ({
        run_id: run.id,
        career_path_id: sp.careerPathId,
        overall_score: sp.overallScore,
        confidence_score: sp.confidenceScore,
        interest_fit: sp.breakdown.interestFit,
        strength_fit: sp.breakdown.strengthFit,
        values_fit: sp.breakdown.valuesFit,
        workstyle_fit: sp.breakdown.workstyleFit,
        goals_fit: sp.breakdown.goalsFit,
        feasibility_fit: sp.breakdown.feasibilityFit,
        education_fit: sp.breakdown.educationFit,
        country_fit: sp.breakdown.countryFit,
        penalties: sp.penalties as unknown as Record<string, unknown>,
        explanation: sp.explanation as unknown as Record<string, unknown>,
        rank: sp.rank,
      }));

      const { error: itemsError } = await supabase
        .from("recommendation_items")
        .insert(items);

      if (itemsError) throw itemsError;

      return { runId: run.id, result };
    },
    onSuccess: ({ runId }) => {
      setLatestRunId(runId);
      queryClient.invalidateQueries({ queryKey: ["recommendations"] });
      trackEvent(EVENTS.RECOMMENDATIONS_GENERATED, { runId });
    },
  });
}

/**
 * Build an EngineProfile from Supabase data.
 * Fetches answers, weights, and constraints for the current user.
 */
export async function buildEngineProfile(userId: string): Promise<EngineProfile> {
  // Get student profile
  const { data: sp } = await supabase
    .from("student_profiles")
    .select("id, current_stage, country, city_region, current_faculty, intended_field, relocation_willingness, decision_readiness")
    .eq("user_id", userId)
    .single();

  if (!sp) throw new Error("Student profile not found");

  // Get answers
  const { data: answers } = await supabase
    .from("profile_answers")
    .select("question_key, answer_value")
    .eq("profile_id", sp.id);

  // Get weights (may not exist yet — handle gracefully)
  const { data: weights } = await supabase
    .from("preference_weights")
    .select("*")
    .eq("profile_id", sp.id)
    .maybeSingle();

  // Get constraints (may not exist yet — handle gracefully)
  const { data: constraints } = await supabase
    .from("constraint_sets")
    .select("*")
    .eq("profile_id", sp.id)
    .maybeSingle();

  const answerMap = new Map(
    (answers ?? []).map((a) => [a.question_key, a.answer_value]),
  );

  return {
    interests: (answerMap.get("interests") as string[]) ?? [],
    strengths: (answerMap.get("strengths") as string[]) ?? [],
    values: (answerMap.get("values") as string[]) ?? [],
    workstyle: (answerMap.get("workstyle") as string[]) ?? [],
    weights: {
      income: weights?.income ?? 50,
      stability: weights?.stability ?? 50,
      flexibility: weights?.flexibility ?? 50,
      prestige: weights?.prestige ?? 50,
      creativity: weights?.creativity ?? 50,
      impact: weights?.impact ?? 50,
      study_duration: weights?.study_duration ?? 50,
      risk: weights?.risk ?? 50,
    },
    constraints: {
      financial_level: constraints?.financial_level ?? null,
      family_expectation: constraints?.family_expectation ?? null,
      risk_tolerance: constraints?.risk_tolerance ?? null,
      max_study_years: constraints?.max_study_years ?? null,
      location_constraint: constraints?.location_constraint ?? null,
    },
    current_stage: sp.current_stage,
    country: sp.country ?? null,
    city_region: sp.city_region ?? null,
    current_faculty: sp.current_faculty ?? null,
    intended_field: sp.intended_field ?? null,
    relocation_willingness: sp.relocation_willingness ?? null,
    decision_readiness: sp.decision_readiness ?? null,
    study_country_preference: null, // captured in answers
    clusterReactions: (answerMap.get("cluster_reactions") as Record<string, string>) ?? null,
    subjectsEnjoyed: (answerMap.get("subjects_enjoyed") as string[]) ?? [],
    subjectsGoodAt: (answerMap.get("subjects_good_at") as string[]) ?? [],
    subjectsDisliked: (answerMap.get("subjects_disliked") as string[]) ?? [],
    currentSubjects: (answerMap.get("current_subjects") as string[]) ?? [],
    schoolSystem: (answerMap.get("school_system") as string) ?? null,
    curriculumLevel: (answerMap.get("curriculum_level") as string) ?? null,
  };
}

/**
 * Build EngineCareerPath[] from Supabase data.
 * Attaches trait mappings to each career path.
 */
export function buildEngineCareerPaths(
  paths: Array<Record<string, unknown>>,
  mappings: Array<Record<string, unknown>>,
  studyDirections?: Array<Record<string, unknown>>,
): EngineCareerPath[] {
  return paths.map((p) => ({
    id: p.id as string,
    slug: p.slug as string,
    title: p.title as string,
    domain: p.domain as string,
    summary: p.summary as string,
    education_path: (p.education_path as string) ?? null,
    typical_duration_years: (p.typical_duration_years as number) ?? null,
    income_potential: (p.income_potential as string) ?? null,
    tags: (p.tags as string[]) ?? [],
    traitMappings: mappings
      .filter((m) => m.career_path_id === p.id)
      .map((m) => ({
        trait_key: m.trait_key as string,
        weight: Number(m.weight),
        rationale: (m.rationale as string) ?? null,
      })),
    studyDirections: (studyDirections ?? [])
      .filter((sd) => sd.career_path_id === p.id)
      .map((sd) => ({
        faculty_cluster: sd.faculty_cluster as string,
        degree_type: sd.degree_type as string,
        field_of_study: sd.field_of_study as string,
        country_notes: (sd.country_notes as string) ?? null,
        prerequisites: (sd.prerequisites as string) ?? null,
        typical_duration_years: (sd.typical_duration_years as number) ?? null,
        relevance_level: (sd.relevance_level as string) ?? "primary",
      })),
  }));
}

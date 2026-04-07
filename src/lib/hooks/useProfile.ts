import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase/client";
import { useAuthStore } from "../../stores/authStore";

/** Fetch the current user's profile and student profile */
export function useProfile() {
  const userId = useAuthStore((s) => s.user?.id);

  return useQuery({
    queryKey: ["profile", userId],
    queryFn: async () => {
      if (!userId) throw new Error("Not authenticated");

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();
      if (profileError) throw profileError;

      const { data: studentProfile, error: spError } = await supabase
        .from("student_profiles")
        .select("*")
        .eq("user_id", userId)
        .single();
      if (spError) throw spError;

      return { profile, studentProfile };
    },
    enabled: !!userId,
  });
}

/** Save all onboarding answers to Supabase in one batch */
export function useSaveOnboarding() {
  const userId = useAuthStore((s) => s.user?.id);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (answers: Record<string, unknown>) => {
      if (!userId) throw new Error("Not authenticated");

      // Update profile name
      await supabase
        .from("profiles")
        .update({
          first_name: answers.first_name as string,
          preferred_name: (answers.preferred_name as string) || null,
          onboarding_completed: true,
        })
        .eq("id", userId);

      // Get student profile ID
      const { data: sp } = await supabase
        .from("student_profiles")
        .select("id")
        .eq("user_id", userId)
        .single();
      if (!sp) throw new Error("Student profile not found");
      const profileId = sp.id;

      // Update student profile with new fields
      await supabase
        .from("student_profiles")
        .update({
          current_stage: answers.current_stage as string,
          country: (answers.country as string) ?? null,
          city_region: (answers.city_region as string) ?? null,
          current_school: (answers.current_school as string) ?? null,
          current_faculty: (answers.current_faculty as string) ?? null,
          intended_field: (answers.intended_field as string) ?? null,
          relocation_willingness: (answers.relocation_willingness as string) ?? null,
          decision_readiness: (answers.decision_readiness as string) ?? null,
          completion_percent: 100,
        })
        .eq("id", profileId);

      // Save answers (interests, strengths, values, workstyle + high-school fields)
      const answerKeys = [
        "interests", "strengths", "values", "workstyle",
        "school_system", "curriculum_level", "curriculum_country",
        "current_subjects", "subjects_enjoyed", "subjects_good_at", "subjects_disliked",
        "cluster_reactions",
      ];
      for (const key of answerKeys) {
        if (answers[key]) {
          await supabase.from("profile_answers").insert({
            profile_id: profileId,
            question_key: key,
            answer_value: answers[key],
          });
        }
      }

      // Save constraints — from separate money/duration screens
      const financialLevel = answers.financial_level as string | undefined;
      const familyExpectation = answers.family_expectation as string | undefined;
      const riskTolerance = answers.risk_tolerance as string | undefined;
      const maxStudyYears = answers.max_study_years as number | null | undefined;

      if (financialLevel || familyExpectation || riskTolerance || maxStudyYears !== undefined) {
        const { error: constraintError } = await supabase.from("constraint_sets").upsert(
          {
            profile_id: profileId,
            financial_level: financialLevel ?? null,
            family_expectation: familyExpectation ?? null,
            risk_tolerance: riskTolerance ?? null,
            max_study_years: maxStudyYears ?? null,
          },
          { onConflict: "profile_id" },
        );
        if (constraintError) {
          console.error("Constraint save error:", constraintError);
        }
      }

      // Save weights
      if (answers.weights) {
        const { error: weightsError } = await supabase.from("preference_weights").upsert(
          {
            profile_id: profileId,
            ...(answers.weights as Record<string, number>),
          },
          { onConflict: "profile_id" },
        );
        if (weightsError) {
          console.error("Weights save error:", weightsError);
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}

/** Fetch the current user's profile answers, weights, and constraints */
export function useProfileAnswers() {
  const userId = useAuthStore((s) => s.user?.id);

  return useQuery({
    queryKey: ["profile-answers", userId],
    queryFn: async () => {
      if (!userId) throw new Error("Not authenticated");

      const { data: sp } = await supabase
        .from("student_profiles")
        .select("id")
        .eq("user_id", userId)
        .single();
      if (!sp) throw new Error("Student profile not found");

      const { data: answers } = await supabase
        .from("profile_answers")
        .select("*")
        .eq("profile_id", sp.id)
        .order("version", { ascending: false });

      const { data: weights } = await supabase
        .from("preference_weights")
        .select("*")
        .eq("profile_id", sp.id)
        .single();

      const { data: constraints } = await supabase
        .from("constraint_sets")
        .select("*")
        .eq("profile_id", sp.id)
        .single();

      // Build latest answer map (highest version per question_key)
      const latestAnswers = new Map<string, unknown>();
      for (const a of answers ?? []) {
        if (!latestAnswers.has(a.question_key as string)) {
          latestAnswers.set(a.question_key as string, a.answer_value);
        }
      }

      return {
        profileId: sp.id as string,
        answers: Object.fromEntries(latestAnswers),
        weights,
        constraints,
        answerHistory: answers ?? [],
      };
    },
    enabled: !!userId,
  });
}

/** Update profile answers with version increment. Preserves old answers. */
export function useUpdateProfile() {
  const userId = useAuthStore((s) => s.user?.id);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      profileId: string;
      updates: Record<string, unknown>;
      studentProfileUpdates?: Record<string, unknown>;
      constraintUpdates?: Record<string, unknown>;
      weightUpdates?: Record<string, number>;
    }) => {
      if (!userId) throw new Error("Not authenticated");

      // Get current max version
      const { data: versionData } = await supabase
        .from("profile_answers")
        .select("version")
        .eq("profile_id", params.profileId)
        .order("version", { ascending: false })
        .limit(1)
        .single();

      const nextVersion = ((versionData?.version as number) ?? 0) + 1;

      // Insert new answer versions (preserves old ones)
      const answerKeys = [
        "interests", "strengths", "values", "workstyle",
        "school_system", "curriculum_level", "curriculum_country",
        "current_subjects", "subjects_enjoyed", "subjects_good_at", "subjects_disliked",
        "cluster_reactions",
      ];
      for (const key of answerKeys) {
        if (params.updates[key] !== undefined) {
          await supabase.from("profile_answers").insert({
            profile_id: params.profileId,
            question_key: key,
            answer_value: params.updates[key],
            version: nextVersion,
          });
        }
      }

      // Update student profile fields
      if (params.studentProfileUpdates) {
        await supabase
          .from("student_profiles")
          .update({
            ...params.studentProfileUpdates,
            latest_version: nextVersion,
            updated_at: new Date().toISOString(),
          })
          .eq("id", params.profileId);
      }

      // Upsert constraints
      if (params.constraintUpdates) {
        await supabase.from("constraint_sets").upsert({
          profile_id: params.profileId,
          ...params.constraintUpdates,
        });
      }

      // Upsert weights
      if (params.weightUpdates) {
        await supabase.from("preference_weights").upsert({
          profile_id: params.profileId,
          ...params.weightUpdates,
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["profile-answers"] });
    },
  });
}

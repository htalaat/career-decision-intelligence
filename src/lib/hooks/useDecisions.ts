import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase/client";
import { useAuthStore } from "../../stores/authStore";
import { trackEvent, EVENTS } from "../utils/analytics";
import { ACTION_PLAN_TEMPLATES } from "../config/content";

/** Fetch all decision snapshots for the current user */
export function useDecisions() {
  const userId = useAuthStore((s) => s.user?.id);

  return useQuery({
    queryKey: ["decisions", userId],
    queryFn: async () => {
      if (!userId) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("decision_snapshots")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });
}

/** Create a new decision snapshot */
export function useCreateDecision() {
  const userId = useAuthStore((s) => s.user?.id);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      chosenCareerPathId: string;
      status: "exploring" | "leaning" | "decided";
      summary: Record<string, unknown>;
    }) => {
      if (!userId) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("decision_snapshots")
        .insert({
          user_id: userId,
          chosen_career_path_id: params.chosenCareerPathId,
          status: params.status,
          summary: params.summary,
        })
        .select("id")
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["decisions"] });
      trackEvent(EVENTS.DECISION_CREATED);
    },
  });
}

/** Fetch action plans for a decision */
export function useActionPlan(decisionId: string | null) {
  return useQuery({
    queryKey: ["action-plan", decisionId],
    queryFn: async () => {
      if (!decisionId) throw new Error("No decision ID");

      const { data, error } = await supabase
        .from("action_plans")
        .select("*")
        .eq("decision_id", decisionId)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (error) {
        if (error.code === "PGRST116") return null;
        throw error;
      }
      return data;
    },
    enabled: !!decisionId,
  });
}

/** Create an action plan for a decision */
export function useCreateActionPlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      decisionId: string;
      plan: Record<string, unknown>;
    }) => {
      const { data, error } = await supabase
        .from("action_plans")
        .insert({
          decision_id: params.decisionId,
          plan: params.plan,
        })
        .select("id")
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: ["action-plan", vars.decisionId] });
    },
  });
}

/** Update action plan (e.g., checking off tasks) */
export function useUpdateActionPlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      planId: string;
      plan: Record<string, unknown>;
      decisionId: string;
    }) => {
      const { error } = await supabase
        .from("action_plans")
        .update({ plan: params.plan, updated_at: new Date().toISOString() })
        .eq("id", params.planId);

      if (error) throw error;
    },
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: ["action-plan", vars.decisionId] });
    },
  });
}

/**
 * Generate a structured action plan for a career decision.
 * Uses recommendation explanation data to create career-specific,
 * contextual next steps organized by 7/30/90 day milestones.
 */
export function generateActionPlanTemplate(
  careerTitle: string,
  educationPath: string | null,
  explanation?: {
    suggestedFaculty?: string | null;
    suggestedDegree?: string | null;
    whatToStudy?: string | null;
    validationQuestions?: string[];
    whatMayBlock?: string[];
    topPositives?: string[];
    countryConsiderations?: string | null;
  },
): Record<string, unknown> {
  const faculty = explanation?.suggestedFaculty;
  const degree = explanation?.suggestedDegree;
  const blockers = explanation?.whatMayBlock ?? [];
  const validationQs = explanation?.validationQuestions ?? [];
  const countryNotes = explanation?.countryConsiderations;

  const sevenDayTasks: { id: string; text: string; done: boolean }[] = [
    { id: "7d-1", text: ACTION_PLAN_TEMPLATES.sevenDay.researchDay(careerTitle), done: false },
    { id: "7d-2", text: ACTION_PLAN_TEMPLATES.sevenDay.findProfessionals(careerTitle), done: false },
    { id: "7d-3", text: ACTION_PLAN_TEMPLATES.sevenDay.writeQuestions, done: false },
  ];

  // Add validation question tasks
  validationQs.slice(0, 2).forEach((q, i) => {
    sevenDayTasks.push({ id: `7d-vq-${i}`, text: ACTION_PLAN_TEMPLATES.sevenDay.investigateQuestion(q), done: false });
  });

  const thirtyDayTasks: { id: string; text: string; done: boolean }[] = [
    { id: "30d-1", text: ACTION_PLAN_TEMPLATES.thirtyDay.talkToProfessional(careerTitle), done: false },
  ];

  // Add education research tasks
  if (faculty) {
    thirtyDayTasks.push({ id: "30d-edu-1", text: ACTION_PLAN_TEMPLATES.thirtyDay.researchFacultyPrograms(faculty), done: false });
  }
  if (degree) {
    thirtyDayTasks.push({ id: "30d-edu-2", text: ACTION_PLAN_TEMPLATES.thirtyDay.lookIntoDegree(degree), done: false });
  }
  if (educationPath) {
    thirtyDayTasks.push({ id: "30d-edu-3", text: ACTION_PLAN_TEMPLATES.thirtyDay.researchEducationPath(educationPath), done: false });
  }

  thirtyDayTasks.push(
    { id: "30d-3", text: ACTION_PLAN_TEMPLATES.thirtyDay.identifySkill, done: false },
    { id: "30d-4", text: ACTION_PLAN_TEMPLATES.thirtyDay.comparePaths, done: false },
  );

  // Add blocker investigation tasks
  blockers.slice(0, 2).forEach((b, i) => {
    thirtyDayTasks.push({ id: `30d-block-${i}`, text: ACTION_PLAN_TEMPLATES.thirtyDay.addressBlocker(b), done: false });
  });

  // Add country-specific task
  if (countryNotes) {
    thirtyDayTasks.push({ id: "30d-country", text: ACTION_PLAN_TEMPLATES.thirtyDay.researchCountry(countryNotes), done: false });
  }

  const ninetyDayTasks: { id: string; text: string; done: boolean }[] = [
    { id: "90d-1", text: ACTION_PLAN_TEMPLATES.ninetyDay.completeCourse, done: false },
    { id: "90d-2", text: ACTION_PLAN_TEMPLATES.ninetyDay.attendEvent, done: false },
    { id: "90d-3", text: ACTION_PLAN_TEMPLATES.ninetyDay.shadowVolunteer, done: false },
    { id: "90d-4", text: ACTION_PLAN_TEMPLATES.ninetyDay.updateDecision, done: false },
    { id: "90d-5", text: ACTION_PLAN_TEMPLATES.ninetyDay.sharePlan, done: false },
  ];

  if (faculty) {
    ninetyDayTasks.push({ id: "90d-apply", text: ACTION_PLAN_TEMPLATES.ninetyDay.prepareApplication(faculty), done: false });
  }

  return {
    careerTitle,
    educationPath,
    suggestedFaculty: faculty ?? null,
    suggestedDegree: degree ?? null,
    milestones: [
      { period: "Next 7 days", tasks: sevenDayTasks },
      { period: "Next 30 days", tasks: thirtyDayTasks },
      { period: "Next 90 days", tasks: ninetyDayTasks },
    ],
  };
}

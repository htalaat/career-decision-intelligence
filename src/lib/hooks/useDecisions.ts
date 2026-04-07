import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase/client";
import { useAuthStore } from "../../stores/authStore";
import { trackEvent, EVENTS } from "../utils/analytics";

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

  const sevenDayTasks = [
    { id: "7d-1", text: `Research what a typical day looks like for a ${careerTitle}`, done: false },
    { id: "7d-2", text: `Find 2-3 people working as a ${careerTitle} on LinkedIn and read their profiles`, done: false },
    { id: "7d-3", text: "Write down your top 3 questions about this career path", done: false },
  ];

  // Add validation question tasks
  validationQs.slice(0, 2).forEach((q, i) => {
    sevenDayTasks.push({ id: `7d-vq-${i}`, text: `Investigate: ${q}`, done: false });
  });

  const thirtyDayTasks = [
    { id: "30d-1", text: `Talk to at least one ${careerTitle} about their experience and daily reality`, done: false },
  ];

  // Add education research tasks
  if (faculty) {
    thirtyDayTasks.push({ id: "30d-edu-1", text: `Research ${faculty} programs at universities you're considering`, done: false });
  }
  if (degree) {
    thirtyDayTasks.push({ id: "30d-edu-2", text: `Look into requirements for ${degree}`, done: false });
  }
  if (educationPath) {
    thirtyDayTasks.push({ id: "30d-edu-3", text: `Research education path: ${educationPath}`, done: false });
  }

  thirtyDayTasks.push(
    { id: "30d-3", text: "Identify one skill you could start building now for this career", done: false },
    { id: "30d-4", text: "Compare this path against your other shortlisted options", done: false },
  );

  // Add blocker investigation tasks
  blockers.slice(0, 2).forEach((b, i) => {
    thirtyDayTasks.push({ id: `30d-block-${i}`, text: `Address potential blocker: ${b}`, done: false });
  });

  // Add country-specific task
  if (countryNotes) {
    thirtyDayTasks.push({ id: "30d-country", text: `Research country considerations: ${countryNotes}`, done: false });
  }

  const ninetyDayTasks = [
    { id: "90d-1", text: "Complete an introductory course, project, or certification in this field", done: false },
    { id: "90d-2", text: "Attend a relevant meetup, webinar, or industry event", done: false },
    { id: "90d-3", text: "Shadow or volunteer in a related role if possible", done: false },
    { id: "90d-4", text: "Update your decision status — has your confidence changed?", done: false },
    { id: "90d-5", text: "Share your plan with a mentor, advisor, or trusted person for feedback", done: false },
  ];

  if (faculty) {
    ninetyDayTasks.push({ id: "90d-apply", text: `Prepare application materials for ${faculty} programs if applicable`, done: false });
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

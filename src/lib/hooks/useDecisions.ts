import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase/client";
import { useAuthStore } from "../../stores/authStore";

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
 * Generate a template action plan for a career path.
 * Returns a structured plan with 7-day, 30-day, and 90-day milestones.
 */
export function generateActionPlanTemplate(
  careerTitle: string,
  educationPath: string | null,
): Record<string, unknown> {
  return {
    careerTitle,
    milestones: [
      {
        period: "Next 7 days",
        tasks: [
          { id: "7d-1", text: `Research what a typical day looks like for a ${careerTitle}`, done: false },
          { id: "7d-2", text: `Find 2-3 people working as a ${careerTitle} on LinkedIn`, done: false },
          { id: "7d-3", text: "Write down your top 3 questions about this path", done: false },
        ],
      },
      {
        period: "Next 30 days",
        tasks: [
          { id: "30d-1", text: `Talk to at least one ${careerTitle} about their experience`, done: false },
          { id: "30d-2", text: educationPath ? `Research programs: ${educationPath}` : "Research relevant education programs", done: false },
          { id: "30d-3", text: "Identify one skill you could start building now", done: false },
          { id: "30d-4", text: "Compare this path with your other shortlisted options", done: false },
        ],
      },
      {
        period: "Next 90 days",
        tasks: [
          { id: "90d-1", text: "Complete an introductory course or project in this field", done: false },
          { id: "90d-2", text: "Attend a relevant meetup, event, or webinar", done: false },
          { id: "90d-3", text: "Shadow or volunteer in a related role if possible", done: false },
          { id: "90d-4", text: "Update your decision — has your confidence changed?", done: false },
          { id: "90d-5", text: "Share your plan with a mentor or advisor for feedback", done: false },
        ],
      },
    ],
  };
}

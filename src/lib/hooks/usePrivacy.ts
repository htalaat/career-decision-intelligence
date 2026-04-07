import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "../supabase/client";
import { signOut } from "../supabase/auth";
import { useAuthStore } from "../../stores/authStore";
import { trackEvent, EVENTS } from "../utils/analytics";

/** Fetch all consent logs for the current user */
export function useConsentHistory() {
  const userId = useAuthStore((s) => s.user?.id);

  return useQuery({
    queryKey: ["consent-history", userId],
    queryFn: async () => {
      if (!userId) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("consent_logs")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });
}

/** Export all user data as a JSON object */
export function useExportData() {
  const userId = useAuthStore((s) => s.user?.id);

  return useMutation({
    mutationFn: async () => {
      if (!userId) throw new Error("Not authenticated");

      // Fetch profile
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      // Fetch student profile
      const { data: studentProfile } = await supabase
        .from("student_profiles")
        .select("*")
        .eq("user_id", userId)
        .single();

      const profileId = studentProfile?.id;

      // Fetch answers
      const { data: answers } = profileId
        ? await supabase
            .from("profile_answers")
            .select("*")
            .eq("profile_id", profileId)
        : { data: [] };

      // Fetch weights
      const { data: weights } = profileId
        ? await supabase
            .from("preference_weights")
            .select("*")
            .eq("profile_id", profileId)
            .single()
        : { data: null };

      // Fetch constraints
      const { data: constraints } = profileId
        ? await supabase
            .from("constraint_sets")
            .select("*")
            .eq("profile_id", profileId)
            .single()
        : { data: null };

      // Fetch recommendation runs
      const { data: runs } = await supabase
        .from("recommendation_runs")
        .select("*")
        .eq("user_id", userId);

      // Fetch recommendation items
      const runIds = (runs ?? []).map((r) => r.id as string);
      const { data: items } = runIds.length > 0
        ? await supabase
            .from("recommendation_items")
            .select("*")
            .in("run_id", runIds)
        : { data: [] };

      // Fetch shortlist
      const { data: shortlist } = await supabase
        .from("shortlist_items")
        .select("*")
        .eq("user_id", userId);

      // Fetch decisions
      const { data: decisions } = await supabase
        .from("decision_snapshots")
        .select("*")
        .eq("user_id", userId);

      // Fetch action plans
      const decisionIds = (decisions ?? []).map((d) => d.id as string);
      const { data: actionPlans } = decisionIds.length > 0
        ? await supabase
            .from("action_plans")
            .select("*")
            .in("decision_id", decisionIds)
        : { data: [] };

      // Fetch comparison scenarios
      const { data: scenarios } = await supabase
        .from("comparison_scenarios")
        .select("*")
        .eq("user_id", userId);

      // Fetch consents
      const { data: consents } = await supabase
        .from("consent_logs")
        .select("*")
        .eq("user_id", userId);

      return {
        exportedAt: new Date().toISOString(),
        profile,
        studentProfile,
        answers,
        weights,
        constraints,
        recommendationRuns: runs,
        recommendationItems: items,
        shortlist,
        decisions,
        actionPlans,
        comparisonScenarios: scenarios,
        consents,
      };
    },
    onSuccess: () => {
      trackEvent(EVENTS.DATA_EXPORTED);
    },
  });
}

/** Delete user account and all associated data, then sign out */
export function useDeleteAccount() {
  const userId = useAuthStore((s) => s.user?.id);

  return useMutation({
    mutationFn: async () => {
      if (!userId) throw new Error("Not authenticated");

      // Delete profile (cascades to all child tables via foreign keys)
      const { error } = await supabase
        .from("profiles")
        .delete()
        .eq("id", userId);

      if (error) throw error;

      // Track before sign-out (last chance to fire)
      trackEvent(EVENTS.ACCOUNT_DELETED);

      // Sign out
      await signOut();
    },
  });
}

/** Update user's display name */
export function useUpdateName() {
  const userId = useAuthStore((s) => s.user?.id);

  return useMutation({
    mutationFn: async (params: { firstName: string; preferredName: string | null }) => {
      if (!userId) throw new Error("Not authenticated");

      const { error } = await supabase
        .from("profiles")
        .update({
          first_name: params.firstName,
          preferred_name: params.preferredName,
        })
        .eq("id", userId);

      if (error) throw error;
    },
  });
}

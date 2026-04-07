import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase/client";
import { useAuthStore } from "../../stores/authStore";
import { trackEvent, EVENTS } from "../utils/analytics";

/** Fetch saved comparison scenarios for the current user */
export function useCompareScenarios() {
  const userId = useAuthStore((s) => s.user?.id);

  return useQuery({
    queryKey: ["compare-scenarios", userId],
    queryFn: async () => {
      if (!userId) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("comparison_scenarios")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });
}

/** Save a new comparison scenario */
export function useSaveCompareScenario() {
  const userId = useAuthStore((s) => s.user?.id);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      title: string;
      selectedPathIds: string[];
      customWeights: Record<string, number> | null;
      resultSnapshot: Record<string, unknown>;
    }) => {
      if (!userId) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("comparison_scenarios")
        .insert({
          user_id: userId,
          title: params.title,
          selected_path_ids: params.selectedPathIds,
          custom_weights: params.customWeights,
          result_snapshot: params.resultSnapshot,
        })
        .select("id")
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["compare-scenarios"] });
      trackEvent(EVENTS.COMPARE_SCENARIO_SAVED);
    },
  });
}

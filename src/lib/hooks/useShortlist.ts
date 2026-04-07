import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase/client";
import { useAuthStore } from "../../stores/authStore";
import { useRecommendationStore } from "../../stores/recommendationStore";
import { trackEvent, EVENTS } from "../utils/analytics";

/** Fetch the user's shortlisted career path IDs */
export function useShortlist() {
  const userId = useAuthStore((s) => s.user?.id);
  const setShortlist = useRecommendationStore((s) => s.setShortlist);

  return useQuery({
    queryKey: ["shortlist", userId],
    queryFn: async () => {
      if (!userId) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("shortlist_items")
        .select("career_path_id")
        .eq("user_id", userId);

      if (error) throw error;

      const ids = data.map((d) => d.career_path_id as string);
      setShortlist(ids);
      return ids;
    },
    enabled: !!userId,
  });
}

/** Add a career path to the shortlist */
export function useAddToShortlist() {
  const userId = useAuthStore((s) => s.user?.id);
  const queryClient = useQueryClient();
  const toggleShortlist = useRecommendationStore((s) => s.toggleShortlist);

  return useMutation({
    mutationFn: async (careerPathId: string) => {
      if (!userId) throw new Error("Not authenticated");

      const { error } = await supabase
        .from("shortlist_items")
        .insert({ user_id: userId, career_path_id: careerPathId });

      if (error) throw error;
    },
    onSuccess: (_, careerPathId) => {
      toggleShortlist(careerPathId);
      queryClient.invalidateQueries({ queryKey: ["shortlist"] });
      trackEvent(EVENTS.SHORTLIST_ADDED, { careerPathId });
    },
  });
}

/** Remove a career path from the shortlist */
export function useRemoveFromShortlist() {
  const userId = useAuthStore((s) => s.user?.id);
  const queryClient = useQueryClient();
  const toggleShortlist = useRecommendationStore((s) => s.toggleShortlist);

  return useMutation({
    mutationFn: async (careerPathId: string) => {
      if (!userId) throw new Error("Not authenticated");

      const { error } = await supabase
        .from("shortlist_items")
        .delete()
        .eq("user_id", userId)
        .eq("career_path_id", careerPathId);

      if (error) throw error;
    },
    onSuccess: (_, careerPathId) => {
      toggleShortlist(careerPathId);
      queryClient.invalidateQueries({ queryKey: ["shortlist"] });
      trackEvent(EVENTS.SHORTLIST_REMOVED, { careerPathId });
    },
  });
}

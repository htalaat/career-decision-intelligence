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

      // Update stage
      if (answers.current_stage) {
        await supabase
          .from("student_profiles")
          .update({ current_stage: answers.current_stage as string, completion_percent: 100 })
          .eq("id", profileId);
      }

      // Save answers (interests, strengths, values, workstyle)
      const answerKeys = ["interests", "strengths", "values", "workstyle"];
      for (const key of answerKeys) {
        if (answers[key]) {
          await supabase.from("profile_answers").insert({
            profile_id: profileId,
            question_key: key,
            answer_value: answers[key],
          });
        }
      }

      // Save constraints
      if (answers.constraints) {
        const c = answers.constraints as Record<string, string>;
        await supabase.from("constraint_sets").upsert({
          profile_id: profileId,
          financial_level: c.financial_level,
          family_expectation: c.family_expectation,
          risk_tolerance: c.risk_tolerance,
        });
      }

      // Save weights
      if (answers.weights) {
        await supabase.from("preference_weights").upsert({
          profile_id: profileId,
          ...(answers.weights as Record<string, number>),
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}

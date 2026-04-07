import { supabase } from "./client";
import { useRecommendationStore } from "../../stores/recommendationStore";
import { useCompareStore } from "../../stores/compareStore";
import { useDecisionStore } from "../../stores/decisionStore";
import { useOnboardingStore } from "../../stores/onboardingStore";

/** Send a magic link to the user's email */
export async function signInWithMagicLink(email: string): Promise<void> {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: typeof window !== "undefined"
        ? `${window.location.origin}`
        : "career-decision://",
    },
  });
  if (error) throw error;
}

/** Sign out the current user and reset all stores to prevent data leaking between sessions */
export async function signOut(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;

  // Reset all stores to prevent data leaking between sessions
  useRecommendationStore.getState().reset();
  useCompareStore.getState().clearSelection();
  useDecisionStore.getState().reset();
  useOnboardingStore.getState().reset();
}

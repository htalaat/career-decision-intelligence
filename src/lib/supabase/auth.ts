import { supabase } from "./client";

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

/** Sign out the current user */
export async function signOut(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

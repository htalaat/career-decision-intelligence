import { create } from "zustand";
import { supabase } from "../lib/supabase/client";
import type { Session, User } from "@supabase/supabase-js";

interface AuthState {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  initialize: () => Promise<void>;
  setSession: (session: Session | null) => void;
}

/**
 * Ensure profile and student_profile rows exist for this user.
 * The DB trigger handle_new_user fails for anonymous users because
 * profiles.email is NOT NULL and anonymous users have no email.
 * This function creates the rows if they're missing.
 */
async function ensureProfileExists(userId: string): Promise<void> {
  const { data: existing } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", userId)
    .maybeSingle();

  if (existing) return; // profile already exists

  console.log("[Auth] Creating profile for anonymous user:", userId);

  const { error: profileError } = await supabase
    .from("profiles")
    .insert({ id: userId, email: `anon-${userId.slice(0, 8)}@anonymous.local` });

  if (profileError) {
    console.error("[Auth] Profile creation failed:", profileError.message);
    return;
  }

  const { error: studentError } = await supabase
    .from("student_profiles")
    .insert({ user_id: userId });

  if (studentError) {
    console.error("[Auth] Student profile creation failed:", studentError.message);
  }
}

/** Global auth state */
export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  user: null,
  isLoading: true,
  isAuthenticated: false,

  initialize: async () => {
    try {
      const { data } = await supabase.auth.getSession();

      if (data.session) {
        // Existing session — ensure profile exists (may be anonymous user)
        await ensureProfileExists(data.session.user.id);
        set({
          session: data.session,
          user: data.session.user,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        // Auto sign-in anonymously — no email or magic link needed
        const { data: anonData, error: anonError } = await supabase.auth.signInAnonymously();
        if (anonError) {
          console.error("[Auth] Anonymous sign-in failed:", anonError.message);
          set({ isLoading: false });
        } else if (anonData.session) {
          await ensureProfileExists(anonData.session.user.id);
          set({
            session: anonData.session,
            user: anonData.session.user,
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          set({ isLoading: false });
        }
      }
    } catch (err) {
      console.error("[Auth] Initialization failed:", err);
      set({ isLoading: false });
    }

    supabase.auth.onAuthStateChange((_event, session) => {
      set({
        session,
        user: session?.user ?? null,
        isAuthenticated: !!session,
      });
    });
  },

  setSession: (session) =>
    set({
      session,
      user: session?.user ?? null,
      isAuthenticated: !!session,
    }),
}));

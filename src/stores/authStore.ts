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
        } else {
          set({
            session: anonData.session,
            user: anonData.session?.user ?? null,
            isAuthenticated: !!anonData.session,
            isLoading: false,
          });
        }
      }
    } catch {
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

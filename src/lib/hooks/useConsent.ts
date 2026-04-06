import { useMutation } from "@tanstack/react-query";
import { supabase } from "../supabase/client";
import { useAuthStore } from "../../stores/authStore";

/** Log a consent event */
export function useLogConsent() {
  const userId = useAuthStore((s) => s.user?.id);

  return useMutation({
    mutationFn: async (params: { type: string; version: string; granted: boolean }) => {
      if (!userId) throw new Error("Not authenticated");
      await supabase.from("consent_logs").insert({
        user_id: userId,
        consent_type: params.type,
        consent_version: params.version,
        granted: params.granted,
      });
    },
  });
}

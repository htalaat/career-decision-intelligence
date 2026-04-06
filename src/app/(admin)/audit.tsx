import React from "react";
import { View, Text, Pressable, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { Screen } from "../../components/ui/Screen";
import { Badge } from "../../components/ui/Badge";
import { EmptyState } from "../../components/ui/EmptyState";
import { useTokens } from "../../lib/theme/PersonaProvider";
import { supabase } from "../../lib/supabase/client";

function useAuditLog() {
  return useQuery({
    queryKey: ["admin-audit-log"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("admin_audit_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);

      if (error) throw error;
      return data;
    },
  });
}

/** Admin: view audit log of admin actions */
export default function AdminAudit() {
  const router = useRouter();
  const tokens = useTokens();
  const { data: logs, isLoading } = useAuditLog();

  if (isLoading) {
    return (
      <Screen padded>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator color={tokens.colors.accent.DEFAULT} size="large" />
        </View>
      </Screen>
    );
  }

  return (
    <Screen scroll padded>
      <View style={{ gap: 20, paddingTop: 8 }}>
        <Pressable onPress={() => router.back()} accessibilityLabel="Go back" accessibilityRole="button">
          <Text style={{ fontSize: tokens.typography.bodySize, color: tokens.colors.accent.DEFAULT }}>← Back</Text>
        </Pressable>

        <View style={{ gap: 4 }}>
          <Text style={{ fontSize: tokens.typography.headingSize, fontWeight: "700", color: tokens.colors.text.primary }}>
            Audit log
          </Text>
          <Text style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.text.muted }}>
            Admin actions history (latest 100)
          </Text>
        </View>

        {(logs ?? []).length === 0 ? (
          <EmptyState title="No audit entries" message="Admin actions will appear here when they occur." />
        ) : (
          <View style={{ gap: 8 }}>
            {(logs ?? []).map((log: Record<string, unknown>) => (
              <View
                key={log.id as string}
                style={{
                  backgroundColor: tokens.colors.surface.secondary,
                  borderRadius: 10,
                  padding: 12,
                  gap: 4,
                }}
              >
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                  <Badge label={log.action as string} variant="accent" />
                  <Text style={{ fontSize: 11, color: tokens.colors.text.muted }}>
                    {new Date(log.created_at as string).toLocaleString()}
                  </Text>
                </View>
                <Text style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.text.primary }}>
                  {log.object_type as string} {log.object_id ? `(${(log.object_id as string).slice(0, 8)}...)` : ""}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </Screen>
  );
}

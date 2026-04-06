import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { Screen } from "../../components/ui/Screen";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { useTokens } from "../../lib/theme/PersonaProvider";
import { useCareerPaths } from "../../lib/hooks/useCareerPaths";

/** Admin: list all career paths with domain grouping */
export default function AdminCareerPaths() {
  const router = useRouter();
  const tokens = useTokens();
  const { data, isLoading } = useCareerPaths();

  const paths = data?.paths ?? [];

  // Group by domain
  const grouped = paths.reduce<Record<string, Array<Record<string, unknown>>>>((acc, p: Record<string, unknown>) => {
    const domain = p.domain as string;
    if (!acc[domain]) acc[domain] = [];
    acc[domain].push(p);
    return acc;
  }, {});

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
            Career paths
          </Text>
          <Text style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.text.muted }}>
            {paths.length} active paths across {Object.keys(grouped).length} domains
          </Text>
        </View>

        {Object.entries(grouped).sort().map(([domain, domainPaths]) => (
          <View key={domain} style={{ gap: 8 }}>
            <Text style={{ fontSize: tokens.typography.bodySize, fontWeight: "600", color: tokens.colors.text.secondary }}>
              {domain} ({domainPaths.length})
            </Text>
            {domainPaths.map((p) => (
              <Pressable
                key={p.id as string}
                onPress={() => router.push(`/(admin)/career-paths/${p.id as string}` as never)}
                style={{
                  backgroundColor: tokens.colors.surface.secondary,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: tokens.colors.border.DEFAULT,
                  padding: 12,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: tokens.typography.bodySize, fontWeight: "500", color: tokens.colors.text.primary }}>
                    {p.title as string}
                  </Text>
                  <Text style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.text.muted }}>
                    {p.slug as string}
                  </Text>
                </View>
                <Badge label={p.income_potential as string ?? "—"} variant="default" />
              </Pressable>
            ))}
          </View>
        ))}
      </View>
    </Screen>
  );
}

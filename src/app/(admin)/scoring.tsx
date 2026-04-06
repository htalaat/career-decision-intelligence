import React from "react";
import { View, Text, ScrollView, Pressable, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { Screen } from "../../components/ui/Screen";
import { useTokens } from "../../lib/theme/PersonaProvider";
import { useCareerPaths } from "../../lib/hooks/useCareerPaths";

/** Admin: view all trait mappings / scoring rules */
export default function AdminScoring() {
  const router = useRouter();
  const tokens = useTokens();
  const { data, isLoading } = useCareerPaths();

  const mappings = data?.mappings ?? [];
  const paths = data?.paths ?? [];

  // Group mappings by trait key
  const byTrait = mappings.reduce<Record<string, Array<Record<string, unknown>>>>((acc, m: Record<string, unknown>) => {
    const key = m.trait_key as string;
    if (!acc[key]) acc[key] = [];
    acc[key].push(m);
    return acc;
  }, {});

  const pathMap = new Map(paths.map((p: Record<string, unknown>) => [p.id as string, p.title as string]));

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
            Scoring rules
          </Text>
          <Text style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.text.muted }}>
            {mappings.length} trait mappings across {Object.keys(byTrait).length} traits
          </Text>
        </View>

        {Object.entries(byTrait).sort().map(([trait, traitMappings]) => (
          <View key={trait} style={{ gap: 6 }}>
            <Text style={{ fontSize: tokens.typography.bodySize, fontWeight: "600", color: tokens.colors.accent.DEFAULT }}>
              {trait}
            </Text>
            {traitMappings
              .sort((a, b) => Number(b.weight) - Number(a.weight))
              .map((m) => (
                <View
                  key={m.id as string}
                  style={{
                    backgroundColor: tokens.colors.surface.secondary,
                    borderRadius: 8,
                    padding: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.text.primary }}>
                      {pathMap.get(m.career_path_id as string) ?? "Unknown"}
                    </Text>
                    {(m.rationale as string) && (
                      <Text style={{ fontSize: 11, color: tokens.colors.text.muted }}>
                        {m.rationale as string}
                      </Text>
                    )}
                  </View>
                  <View style={{
                    backgroundColor: tokens.colors.accent.DEFAULT + "20",
                    borderRadius: 6,
                    paddingHorizontal: 8,
                    paddingVertical: 2,
                  }}>
                    <Text style={{ fontSize: tokens.typography.captionSize, fontWeight: "600", color: tokens.colors.accent.DEFAULT }}>
                      {Number(m.weight).toFixed(2)}
                    </Text>
                  </View>
                </View>
              ))}
          </View>
        ))}
      </View>
    </Screen>
  );
}

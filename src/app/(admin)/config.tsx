import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { Screen } from "../../components/ui/Screen";
import { Badge } from "../../components/ui/Badge";
import { useTokens } from "../../lib/theme/PersonaProvider";
import { useCountryContext } from "../../lib/hooks/useCareerPaths";
import { useCareerPaths } from "../../lib/hooks/useCareerPaths";

/** Admin: view and manage seed configurations — countries, faculties, study directions */
export default function AdminConfig() {
  const router = useRouter();
  const tokens = useTokens();
  const { data: countries, isLoading: countriesLoading } = useCountryContext();
  const { data: careerData, isLoading: careersLoading } = useCareerPaths();
  const [activeTab, setActiveTab] = useState<"countries" | "directions">("countries");

  const studyDirections = careerData?.studyDirections ?? [];
  const paths = careerData?.paths ?? [];
  const pathMap = new Map(paths.map((p: Record<string, unknown>) => [p.id as string, p.title as string]));

  const isLoading = countriesLoading || careersLoading;

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
            Seed configuration
          </Text>
          <Text style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.text.muted }}>
            View country contexts and study direction mappings. Edit via assets/config/seed-config.json or Supabase directly.
          </Text>
        </View>

        {/* Tab switcher */}
        <View style={{ flexDirection: "row", gap: 8 }}>
          {(["countries", "directions"] as const).map((tab) => (
            <Pressable
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 20,
                backgroundColor: activeTab === tab ? tokens.colors.accent.DEFAULT : tokens.colors.surface.elevated,
              }}
            >
              <Text style={{
                fontSize: tokens.typography.captionSize,
                fontWeight: "600",
                color: activeTab === tab ? "#FFFFFF" : tokens.colors.text.secondary,
              }}>
                {tab === "countries" ? `Countries (${(countries ?? []).length})` : `Study Directions (${studyDirections.length})`}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Countries tab */}
        {activeTab === "countries" && (
          <View style={{ gap: 8 }}>
            {(countries ?? []).map((c: Record<string, unknown>) => (
              <View
                key={c.id as string}
                style={{
                  backgroundColor: tokens.colors.surface.secondary,
                  borderRadius: 10,
                  padding: 12,
                  gap: 6,
                }}
              >
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                  <Text style={{ fontSize: tokens.typography.bodySize, fontWeight: "600", color: tokens.colors.text.primary }}>
                    {c.country_name as string} ({c.country_code as string})
                  </Text>
                  <Badge label={c.cost_level as string ?? "—"} variant="default" />
                </View>
                <Text style={{ fontSize: 12, color: tokens.colors.text.secondary, lineHeight: 16 }}>
                  {c.education_system_notes as string}
                </Text>
                <View style={{ flexDirection: "row", gap: 12 }}>
                  <Text style={{ fontSize: 11, color: tokens.colors.text.muted }}>
                    Bachelor: {c.typical_bachelor_years as number}yr
                  </Text>
                  <Text style={{ fontSize: 11, color: tokens.colors.text.muted }}>
                    Master: {c.typical_master_years as number}yr
                  </Text>
                  <Text style={{ fontSize: 11, color: tokens.colors.text.muted }}>
                    Language: {c.language_of_instruction as string}
                  </Text>
                  <Text style={{ fontSize: 11, color: tokens.colors.text.muted }}>
                    Visa: {c.visa_complexity as string}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Study directions tab */}
        {activeTab === "directions" && (
          <View style={{ gap: 8 }}>
            {studyDirections.map((sd: Record<string, unknown>) => (
              <View
                key={sd.id as string}
                style={{
                  backgroundColor: tokens.colors.surface.secondary,
                  borderRadius: 10,
                  padding: 12,
                  gap: 4,
                }}
              >
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                  <Text style={{ fontSize: tokens.typography.bodySize, fontWeight: "500", color: tokens.colors.text.primary, flex: 1 }}>
                    {sd.field_of_study as string}
                  </Text>
                  <Badge label={sd.relevance_level as string} variant={sd.relevance_level === "primary" ? "accent" : "default"} />
                </View>
                <Text style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.accent.DEFAULT }}>
                  → {pathMap.get(sd.career_path_id as string) ?? "Unknown career"}
                </Text>
                <View style={{ flexDirection: "row", gap: 8 }}>
                  <Text style={{ fontSize: 11, color: tokens.colors.text.muted }}>
                    Faculty: {sd.faculty_cluster as string}
                  </Text>
                  <Text style={{ fontSize: 11, color: tokens.colors.text.muted }}>
                    Degree: {sd.degree_type as string}
                  </Text>
                  {(sd.typical_duration_years as number) != null && (
                    <Text style={{ fontSize: 11, color: tokens.colors.text.muted }}>
                      {sd.typical_duration_years as number}yr
                    </Text>
                  )}
                </View>
                {(sd.country_notes as string) && (
                  <Text style={{ fontSize: 11, color: tokens.colors.text.secondary }}>
                    {sd.country_notes as string}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}
      </View>
    </Screen>
  );
}

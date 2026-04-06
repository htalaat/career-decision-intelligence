import React from "react";
import { View, Text, ScrollView, ActivityIndicator, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Screen } from "../../components/ui/Screen";
import { RecommendationCard } from "../../components/features/RecommendationCard";
import { ErrorState } from "../../components/ui/ErrorState";
import { useTokens } from "../../lib/theme/PersonaProvider";
import { useCareerPaths } from "../../lib/hooks/useCareerPaths";
import { useLatestRecommendation } from "../../lib/hooks/useRecommendations";

/** Full recommendation run results — all paths ranked */
export default function RecommendationResultsScreen() {
  const { runId } = useLocalSearchParams<{ runId: string }>();
  const router = useRouter();
  const tokens = useTokens();
  const { data: recData, isLoading } = useLatestRecommendation();
  const { data: careerData } = useCareerPaths();

  if (isLoading) {
    return (
      <Screen padded>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator color={tokens.colors.accent.DEFAULT} size="large" />
        </View>
      </Screen>
    );
  }

  const items = recData?.items ?? [];
  if (items.length === 0) {
    return (
      <Screen padded>
        <ErrorState message="No recommendation results found" />
      </Screen>
    );
  }

  const pathMap = new Map(
    (careerData?.paths ?? []).map((p: Record<string, unknown>) => [p.id as string, p]),
  );

  return (
    <Screen scroll padded>
      <View style={{ gap: 16, paddingTop: 8 }}>
        <Pressable onPress={() => router.back()} accessibilityLabel="Go back" accessibilityRole="button">
          <Text style={{ fontSize: tokens.typography.bodySize, color: tokens.colors.accent.DEFAULT }}>
            ← Back
          </Text>
        </Pressable>

        <View style={{ gap: 4 }}>
          <Text style={{ fontSize: tokens.typography.headingSize, fontWeight: "700", color: tokens.colors.text.primary }}>
            Your recommendations
          </Text>
          <Text style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.text.muted }}>
            {items.length} career paths ranked by fit
          </Text>
        </View>

        <View style={{ gap: 12 }}>
          {items.map((item: Record<string, unknown>) => {
            const career = pathMap.get(item.career_path_id as string);
            const explanation = (item.explanation as Record<string, unknown>) ?? {};
            return (
              <RecommendationCard
                key={item.id as string}
                rank={item.rank as number}
                title={(career?.title as string) ?? "Unknown"}
                domain={(career?.domain as string) ?? ""}
                overallScore={Number(item.overall_score)}
                topPositives={((explanation.topPositives as string[]) ?? []).slice(0, 2)}
                topNegatives={((explanation.topNegatives as string[]) ?? []).slice(0, 1)}
                onPress={() => router.push(`/career/${item.career_path_id as string}`)}
              />
            );
          })}
        </View>
      </View>
    </Screen>
  );
}

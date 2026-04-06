import React from "react";
import { View, Text, ScrollView, ActivityIndicator, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Screen } from "../../components/ui/Screen";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { ScoreBreakdown } from "../../components/features/ScoreBreakdown";
import { ExplainBlock } from "../../components/features/ExplainBlock";
import { ErrorState } from "../../components/ui/ErrorState";
import { useTokens } from "../../lib/theme/PersonaProvider";
import { useCareerPaths } from "../../lib/hooks/useCareerPaths";
import { useLatestRecommendation } from "../../lib/hooks/useRecommendations";
import { useShortlist, useAddToShortlist, useRemoveFromShortlist } from "../../lib/hooks/useShortlist";
import { useRecommendationStore } from "../../stores/recommendationStore";

/** Career path detail with score breakdown and explanation */
export default function CareerDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const tokens = useTokens();
  const { data: careerData, isLoading } = useCareerPaths();
  const { data: recData } = useLatestRecommendation();
  const shortlistedIds = useRecommendationStore((s) => s.shortlistedIds);
  const addToShortlist = useAddToShortlist();
  const removeFromShortlist = useRemoveFromShortlist();

  useShortlist();

  if (isLoading) {
    return (
      <Screen padded>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator color={tokens.colors.accent.DEFAULT} size="large" />
        </View>
      </Screen>
    );
  }

  const career = (careerData?.paths ?? []).find((p: Record<string, unknown>) => p.id === id);
  if (!career) {
    return (
      <Screen padded>
        <ErrorState message="Career path not found" />
      </Screen>
    );
  }

  // Find recommendation item for this career
  const recItem = (recData?.items ?? []).find(
    (item: Record<string, unknown>) => item.career_path_id === id,
  );
  const explanation = (recItem?.explanation as Record<string, unknown>) ?? {};
  const isShortlisted = shortlistedIds.includes(id ?? "");

  const handleToggleShortlist = () => {
    if (!id) return;
    if (isShortlisted) {
      removeFromShortlist.mutate(id);
    } else {
      addToShortlist.mutate(id);
    }
  };

  return (
    <Screen scroll padded>
      <View style={{ gap: 20, paddingTop: 8 }}>
        {/* Back button */}
        <Pressable onPress={() => router.back()} accessibilityLabel="Go back" accessibilityRole="button">
          <Text style={{ fontSize: tokens.typography.bodySize, color: tokens.colors.accent.DEFAULT }}>
            ← Back
          </Text>
        </Pressable>

        {/* Header */}
        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: tokens.typography.headingSize, fontWeight: "700", color: tokens.colors.text.primary }}>
            {career.title as string}
          </Text>
          <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
            <Badge label={career.domain as string} variant="accent" />
            {(career.income_potential as string) && (
              <Badge
                label={`Income: ${career.income_potential as string}`}
                variant={(career.income_potential as string) === "very_high" ? "success" : "default"}
              />
            )}
          </View>
        </View>

        {/* Summary */}
        <Text style={{
          fontSize: tokens.typography.bodySize,
          color: tokens.colors.text.secondary,
          lineHeight: tokens.typography.bodySize * tokens.typography.lineHeightMultiplier,
        }}>
          {career.summary as string}
        </Text>

        {/* Education path */}
        {(career.education_path as string) && (
          <View style={{ gap: 4 }}>
            <Text style={{ fontSize: tokens.typography.captionSize, fontWeight: "600", color: tokens.colors.text.muted }}>
              Education path
            </Text>
            <Text style={{ fontSize: tokens.typography.bodySize, color: tokens.colors.text.primary }}>
              {career.education_path as string}
            </Text>
            {(career.typical_duration_years as number) != null && (
              <Text style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.text.muted }}>
                Typical duration: {career.typical_duration_years as number} years
              </Text>
            )}
          </View>
        )}

        {/* Score breakdown (only if recommendations exist) */}
        {recItem && (
          <ScoreBreakdown
            interestFit={Number(recItem.interest_fit)}
            strengthFit={Number(recItem.strength_fit)}
            valuesFit={Number(recItem.values_fit)}
            workstyleFit={Number(recItem.workstyle_fit)}
            goalsFit={Number(recItem.goals_fit)}
            feasibilityFit={Number(recItem.feasibility_fit)}
          />
        )}

        {/* Explanation */}
        {recItem && (
          <ExplainBlock
            topPositives={(explanation.topPositives as string[]) ?? []}
            topNegatives={(explanation.topNegatives as string[]) ?? []}
            missingInfo={(explanation.missingInfo as string[]) ?? []}
            validationQuestions={(explanation.validationQuestions as string[]) ?? []}
          />
        )}

        {/* Shortlist button */}
        <Button
          label={isShortlisted ? "Remove from shortlist" : "Add to shortlist"}
          variant={isShortlisted ? "secondary" : "primary"}
          onPress={handleToggleShortlist}
        />
      </View>
    </Screen>
  );
}

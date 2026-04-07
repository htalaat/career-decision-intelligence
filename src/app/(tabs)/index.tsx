import React from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { Screen } from "../../components/ui/Screen";
import { RecommendationCard } from "../../components/features/RecommendationCard";
import { Button } from "../../components/ui/Button";
import { EmptyState } from "../../components/ui/EmptyState";
import { ErrorState } from "../../components/ui/ErrorState";
import { useTokens } from "../../lib/theme/PersonaProvider";
import { useLatestRecommendation } from "../../lib/hooks/useRecommendations";
import { useProfile } from "../../lib/hooks/useProfile";
import { useCareerPaths } from "../../lib/hooks/useCareerPaths";

/** Dashboard: shows top recommendations or prompts to generate them */
export default function DashboardScreen() {
  const router = useRouter();
  const tokens = useTokens();
  const { data: profileData, error: profileError, refetch: refetchProfile } = useProfile();
  const { data: recData, isLoading, error: recError, refetch: refetchRec } = useLatestRecommendation();
  const { data: careerData } = useCareerPaths();

  const displayName = profileData?.profile?.preferred_name || profileData?.profile?.first_name || "there";

  if (isLoading) {
    return (
      <Screen padded>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator color={tokens.colors.accent.DEFAULT} size="large" />
        </View>
      </Screen>
    );
  }

  if (profileError || recError) {
    return (
      <Screen padded>
        <ErrorState
          message="Failed to load your data. Please try again."
          onRetry={() => {
            void refetchProfile();
            void refetchRec();
          }}
        />
      </Screen>
    );
  }

  const items = recData?.items ?? [];
  const topItems = items.slice(0, 5);

  // Build a map of career path ID → career title/domain for display
  const pathMap = new Map(
    (careerData?.paths ?? []).map((p: Record<string, unknown>) => [p.id as string, p]),
  );

  return (
    <Screen scroll padded>
      <View style={{ gap: 24, paddingTop: 16 }}>
        {/* Greeting */}
        <View style={{ gap: 4 }}>
          <Text style={{ fontSize: tokens.typography.headingSize, fontWeight: "700", color: tokens.colors.text.primary }}>
            Hi {displayName}
          </Text>
          <Text style={{ fontSize: tokens.typography.bodySize, color: tokens.colors.text.secondary }}>
            {items.length > 0
              ? "Here are your top career recommendations."
              : "Let's find career paths that fit you."}
          </Text>
        </View>

        {/* Recommendations or empty state */}
        {items.length === 0 ? (
          <EmptyState
            title="No recommendations yet"
            message="Complete your profile to get personalized career recommendations."
            actionLabel="Go to Explore"
            onAction={() => router.push("/(tabs)/explore")}
          />
        ) : (
          <View style={{ gap: 12 }}>
            <Text style={{ fontSize: tokens.typography.titleSize, fontWeight: "600", color: tokens.colors.text.primary }}>
              Top recommendations
            </Text>
            {topItems.map((item: Record<string, unknown>) => {
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
            {items.length > 5 && (
              <Button
                label={`View all ${items.length} results`}
                variant="secondary"
                onPress={() => router.push(`/recommendation/${recData?.run?.id as string}`)}
              />
            )}
          </View>
        )}

        {/* Profile actions */}
        <View style={{ gap: 8, paddingTop: 8 }}>
          <Button
            label="Edit my profile"
            variant="secondary"
            onPress={() => router.push("/edit-profile" as never)}
          />
          {items.length > 0 && (
            <Button
              label="Re-run recommendations with current profile"
              variant="ghost"
              onPress={async () => {
                // This would need to be wired with the re-run logic
                router.push("/edit-profile" as never);
              }}
            />
          )}
        </View>
      </View>
    </Screen>
  );
}

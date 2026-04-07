import React, { useMemo } from "react";
import { View, Text, ScrollView, ActivityIndicator, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Screen } from "../../components/ui/Screen";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { EmptyState } from "../../components/ui/EmptyState";
import { ErrorState } from "../../components/ui/ErrorState";
import { FadeIn } from "../../components/ui/FadeIn";
import { useTokens } from "../../lib/theme/PersonaProvider";
import { useLatestRecommendation } from "../../lib/hooks/useRecommendations";
import { useProfile } from "../../lib/hooks/useProfile";
import { useCareerPaths } from "../../lib/hooks/useCareerPaths";
import { DIRECTION_CLUSTERS } from "../../lib/utils/constants";

/** Dashboard: cluster-first career exploration */
export default function DashboardScreen() {
  const router = useRouter();
  const tokens = useTokens();
  const { data: profileData, error: profileError, refetch: refetchProfile } = useProfile();
  const { data: recData, isLoading, error: recError, refetch: refetchRec } = useLatestRecommendation();
  const { data: careerData } = useCareerPaths();

  const displayName = profileData?.profile?.preferred_name || profileData?.profile?.first_name || "there";
  const items = recData?.items ?? [];

  const pathMap = useMemo(() =>
    new Map((careerData?.paths ?? []).map((p: Record<string, unknown>) => [p.id as string, p])),
    [careerData],
  );

  // Group recommendations by cluster
  const clusterGroups = useMemo(() => {
    if (items.length === 0) return [];

    return DIRECTION_CLUSTERS.map((cluster) => {
      const clusterItems = items.filter((item: Record<string, unknown>) => {
        const career = pathMap.get(item.career_path_id as string);
        return career && (cluster.domains as readonly string[]).includes(career.domain as string);
      }).sort((a: Record<string, unknown>, b: Record<string, unknown>) =>
        Number(b.overall_score) - Number(a.overall_score),
      );

      return { ...cluster, items: clusterItems };
    })
      .filter((g) => g.items.length > 0)
      .sort((a, b) => {
        const aTop = Number(a.items[0]?.overall_score ?? 0);
        const bTop = Number(b.items[0]?.overall_score ?? 0);
        return bTop - aTop;
      });
  }, [items, pathMap]);

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
          message="Something went wrong loading your data."
          onRetry={() => { refetchProfile(); refetchRec(); }}
        />
      </Screen>
    );
  }

  return (
    <Screen scroll padded>
      <View style={{ gap: 24, paddingTop: 16 }}>
        {/* Greeting */}
        <FadeIn>
          <View style={{ gap: 6 }}>
            <Text style={{
              fontSize: tokens.typography.headingSize,
              fontWeight: tokens.typography.headingWeight,
              color: tokens.colors.text.primary,
            }}>
              Hey {displayName} 👋
            </Text>
            <Text style={{ fontSize: tokens.typography.bodySize, color: tokens.colors.text.secondary }}>
              {items.length > 0
                ? "Here's what we found for you. Explore your directions."
                : "Complete your profile to discover your directions."}
            </Text>
          </View>
        </FadeIn>

        {/* No recommendations yet */}
        {items.length === 0 ? (
          <EmptyState
            title="No directions yet"
            message="Finish your profile to see career directions that match you."
            actionLabel="Get started"
            onAction={() => router.push("/(onboarding)/splash" as never)}
          />
        ) : (
          <>
            {/* Cluster groups */}
            {clusterGroups.map((cluster, index) => (
              <FadeIn key={cluster.key} delay={index * 100}>
              <View style={{ gap: 12 }}>
                {/* Cluster header */}
                <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                  <View style={{
                    width: 40, height: 40, borderRadius: 12,
                    backgroundColor: cluster.color + "20",
                    alignItems: "center", justifyContent: "center",
                  }}>
                    <Text style={{ fontSize: 20 }}>{cluster.emoji}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{
                      fontSize: tokens.typography.titleSize,
                      fontWeight: tokens.typography.titleWeight,
                      color: tokens.colors.text.primary,
                    }}>
                      {cluster.label}
                    </Text>
                    <Text style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.text.muted }}>
                      {cluster.items.length} career{cluster.items.length !== 1 ? "s" : ""} match
                    </Text>
                  </View>
                </View>

                {/* Career cards in this cluster */}
                {cluster.items.slice(0, 3).map((item: Record<string, unknown>) => {
                  const career = pathMap.get(item.career_path_id as string);
                  if (!career) return null;
                  const score = Number(item.overall_score);
                  const explanation = (item.explanation as Record<string, unknown>) ?? {};
                  const topPositive = ((explanation.topPositives as string[]) ?? [])[0];

                  return (
                    <Pressable
                      key={item.id as string}
                      onPress={() => router.push(`/career/${item.career_path_id as string}` as never)}
                      accessibilityLabel={`${career.title as string}, ${score}% fit`}
                      accessibilityRole="button"
                      style={{
                        backgroundColor: tokens.colors.surface.secondary,
                        borderRadius: tokens.borderRadius.lg,
                        borderWidth: 1,
                        borderColor: tokens.colors.border.DEFAULT,
                        padding: 16,
                        gap: 8,
                        marginLeft: 50, // indent under cluster header
                      }}
                    >
                      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{
                          fontSize: tokens.typography.bodySize,
                          fontWeight: "600",
                          color: tokens.colors.text.primary,
                          flex: 1,
                        }}>
                          {career.title as string}
                        </Text>
                        <Badge
                          label={`${score}%`}
                          variant={score >= 70 ? "success" : score >= 50 ? "warning" : "error"}
                        />
                      </View>
                      {topPositive && (
                        <Text style={{
                          fontSize: tokens.typography.captionSize,
                          color: tokens.colors.text.secondary,
                          lineHeight: tokens.typography.captionSize * 1.5,
                        }}>
                          {topPositive}
                        </Text>
                      )}
                      {(explanation.suggestedFaculty as string) && (
                        <Text style={{ fontSize: 12, color: tokens.colors.accent.DEFAULT }}>
                          📚 {explanation.suggestedFaculty as string}
                        </Text>
                      )}
                    </Pressable>
                  );
                })}
              </View>
              </FadeIn>
            ))}

            {/* Actions */}
            <View style={{ gap: 10, paddingTop: 8 }}>
              <Button
                label="Edit my profile"
                variant="secondary"
                onPress={() => router.push("/edit-profile" as never)}
              />
            </View>
          </>
        )}
      </View>
    </Screen>
  );
}

import React, { useState, useMemo } from "react";
import { View, Text, ScrollView, ActivityIndicator, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Screen } from "../../components/ui/Screen";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { CareerCard } from "../../components/features/CareerCard";
import { FilterBar } from "../../components/features/FilterBar";
import { EmptyState } from "../../components/ui/EmptyState";
import { ErrorState } from "../../components/ui/ErrorState";
import { FadeIn } from "../../components/ui/FadeIn";
import { useTokens } from "../../lib/theme/PersonaProvider";
import { useLatestRecommendation } from "../../lib/hooks/useRecommendations";
import { useProfile } from "../../lib/hooks/useProfile";
import { useCareerPaths } from "../../lib/hooks/useCareerPaths";
import { useShortlist, useAddToShortlist, useRemoveFromShortlist } from "../../lib/hooks/useShortlist";
import { useRecommendationStore } from "../../stores/recommendationStore";
import { DIRECTION_CLUSTERS } from "../../lib/utils/constants";

type ViewMode = "clusters" | "browse";

/**
 * Discover: merged dashboard + explore screen.
 * Shows greeting, direction clusters with nested career cards and shortlist toggles,
 * domain filter pills for browsing, and a compare banner when 2+ shortlisted.
 */
export default function DiscoverScreen() {
  const router = useRouter();
  const tokens = useTokens();
  const { data: profileData, error: profileError, refetch: refetchProfile } = useProfile();
  const { data: recData, isLoading, error: recError, refetch: refetchRec } = useLatestRecommendation();
  const { data: careerData, isLoading: careersLoading, error: careersError, refetch: refetchCareers } = useCareerPaths();
  const shortlistedIds = useRecommendationStore((s) => s.shortlistedIds);
  const addToShortlist = useAddToShortlist();
  const removeFromShortlist = useRemoveFromShortlist();

  useShortlist(); // sync shortlist into store

  const [viewMode, setViewMode] = useState<ViewMode>("clusters");
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);

  const displayName = profileData?.profile?.preferred_name || profileData?.profile?.first_name || "there";
  const items = recData?.items ?? [];
  const paths = careerData?.paths ?? [];

  const pathMap = useMemo(
    () => new Map((paths).map((p: Record<string, unknown>) => [p.id as string, p])),
    [paths],
  );

  // Score map from latest recommendation
  const scoreMap = useMemo(() => {
    const map = new Map<string, number>();
    for (const item of items) {
      map.set(item.career_path_id as string, Number(item.overall_score));
    }
    return map;
  }, [items]);

  // Unique domains for filter pills
  const domains = useMemo(() => {
    const d = new Set(paths.map((p: Record<string, unknown>) => p.domain as string));
    return Array.from(d).sort();
  }, [paths]);

  // Cluster groups from recommendation items
  const clusterGroups = useMemo(() => {
    if (items.length === 0) return [];
    return DIRECTION_CLUSTERS.map((cluster) => {
      const clusterItems = items
        .filter((item: Record<string, unknown>) => {
          const career = pathMap.get(item.career_path_id as string);
          return career && (cluster.domains as readonly string[]).includes(career.domain as string);
        })
        .sort(
          (a: Record<string, unknown>, b: Record<string, unknown>) =>
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

  // Filtered paths for browse mode
  const filteredPaths = selectedDomain
    ? paths.filter((p: Record<string, unknown>) => p.domain === selectedDomain)
    : paths;

  const handleToggleShortlist = (careerPathId: string) => {
    if (shortlistedIds.includes(careerPathId)) {
      removeFromShortlist.mutate(careerPathId);
    } else {
      addToShortlist.mutate(careerPathId);
    }
  };

  if (isLoading || careersLoading) {
    return (
      <Screen padded>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator color={tokens.colors.accent.DEFAULT} size="large" />
        </View>
      </Screen>
    );
  }

  if (profileError || recError || careersError) {
    return (
      <Screen padded>
        <ErrorState
          message="Something went wrong loading your data."
          onRetry={() => { refetchProfile(); refetchRec(); refetchCareers(); }}
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
            <Text
              style={{
                fontSize: tokens.typography.headingSize,
                fontWeight: tokens.typography.headingWeight,
                color: tokens.colors.text.primary,
              }}
            >
              Hey {displayName} 👋
            </Text>
            <Text style={{ fontSize: tokens.typography.bodySize, color: tokens.colors.text.secondary }}>
              {items.length > 0
                ? "Explore your directions and shortlist favourites."
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
            {/* Compare banner */}
            {shortlistedIds.length >= 2 && (
              <FadeIn>
                <Pressable
                  onPress={() => router.push("/(tabs)/compare" as never)}
                  accessibilityLabel="Compare your shortlisted picks"
                  accessibilityRole="button"
                  style={{
                    backgroundColor: tokens.colors.accent.DEFAULT,
                    borderRadius: tokens.borderRadius.lg,
                    padding: 14,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: tokens.typography.bodySize, fontWeight: "600", color: "#FFFFFF" }}>
                    Compare your {shortlistedIds.length} picks →
                  </Text>
                  <Text style={{ fontSize: 18 }}>📊</Text>
                </Pressable>
              </FadeIn>
            )}

            {/* View mode toggle */}
            <View
              style={{
                flexDirection: "row",
                backgroundColor: tokens.colors.surface.secondary,
                borderRadius: 10,
                padding: 4,
                borderWidth: 1,
                borderColor: tokens.colors.border.DEFAULT,
              }}
            >
              {(["clusters", "browse"] as ViewMode[]).map((mode) => (
                <Pressable
                  key={mode}
                  onPress={() => setViewMode(mode)}
                  accessibilityLabel={mode === "clusters" ? "View by direction clusters" : "Browse all careers"}
                  accessibilityRole="tab"
                  style={{
                    flex: 1,
                    paddingVertical: 8,
                    borderRadius: 8,
                    alignItems: "center",
                    backgroundColor:
                      viewMode === mode ? tokens.colors.accent.DEFAULT : "transparent",
                  }}
                >
                  <Text
                    style={{
                      fontSize: tokens.typography.captionSize,
                      fontWeight: "600",
                      color: viewMode === mode ? "#FFFFFF" : tokens.colors.text.muted,
                    }}
                  >
                    {mode === "clusters" ? "My Directions" : "Browse All"}
                  </Text>
                </Pressable>
              ))}
            </View>

            {/* ── CLUSTERS VIEW ── */}
            {viewMode === "clusters" && (
              <View style={{ gap: 24 }}>
                {clusterGroups.map((cluster, index) => (
                  <FadeIn key={cluster.key} delay={index * 100}>
                    <View style={{ gap: 12 }}>
                      {/* Cluster header */}
                      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                        <View
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: 12,
                            backgroundColor: cluster.color + "20",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Text style={{ fontSize: 20 }}>{cluster.emoji}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text
                            style={{
                              fontSize: tokens.typography.titleSize,
                              fontWeight: tokens.typography.titleWeight,
                              color: tokens.colors.text.primary,
                            }}
                          >
                            {cluster.label}
                          </Text>
                          <Text
                            style={{
                              fontSize: tokens.typography.captionSize,
                              color: tokens.colors.text.muted,
                            }}
                          >
                            {cluster.items.length} career
                            {cluster.items.length !== 1 ? "s" : ""} match
                          </Text>
                        </View>
                      </View>

                      {/* Career cards */}
                      {cluster.items.slice(0, 3).map((item: Record<string, unknown>) => {
                        const career = pathMap.get(item.career_path_id as string);
                        if (!career) return null;
                        const score = Number(item.overall_score);
                        const explanation = (item.explanation as Record<string, unknown>) ?? {};
                        const topPositive = ((explanation.topPositives as string[]) ?? [])[0];
                        const careerPathId = item.career_path_id as string;
                        const isShortlisted = shortlistedIds.includes(careerPathId);

                        return (
                          <Pressable
                            key={item.id as string}
                            onPress={() => router.push(`/career/${careerPathId}` as never)}
                            accessibilityLabel={`${career.title as string}, ${score}% fit`}
                            accessibilityRole="button"
                            style={{
                              backgroundColor: tokens.colors.surface.secondary,
                              borderRadius: tokens.borderRadius.lg,
                              borderWidth: 1,
                              borderColor: isShortlisted
                                ? tokens.colors.accent.DEFAULT + "60"
                                : tokens.colors.border.DEFAULT,
                              padding: 16,
                              gap: 8,
                              marginLeft: 50,
                            }}
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: tokens.typography.bodySize,
                                  fontWeight: "600",
                                  color: tokens.colors.text.primary,
                                  flex: 1,
                                }}
                              >
                                {career.title as string}
                              </Text>
                              <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                                <Badge
                                  label={`${score}%`}
                                  variant={score >= 70 ? "success" : score >= 50 ? "warning" : "error"}
                                />
                                {/* Shortlist toggle */}
                                <Pressable
                                  onPress={(e) => {
                                    e.stopPropagation();
                                    handleToggleShortlist(careerPathId);
                                  }}
                                  accessibilityLabel={
                                    isShortlisted
                                      ? `Remove ${career.title as string} from shortlist`
                                      : `Add ${career.title as string} to shortlist`
                                  }
                                  accessibilityRole="checkbox"
                                  style={{
                                    width: 28,
                                    height: 28,
                                    borderRadius: 14,
                                    backgroundColor: isShortlisted
                                      ? tokens.colors.accent.DEFAULT
                                      : tokens.colors.surface.elevated,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderWidth: 1,
                                    borderColor: isShortlisted
                                      ? tokens.colors.accent.DEFAULT
                                      : tokens.colors.border.DEFAULT,
                                  }}
                                >
                                  <Text
                                    style={{
                                      fontSize: 14,
                                      color: isShortlisted ? "#FFFFFF" : tokens.colors.text.muted,
                                    }}
                                  >
                                    {isShortlisted ? "✓" : "+"}
                                  </Text>
                                </Pressable>
                              </View>
                            </View>

                            {topPositive && (
                              <Text
                                style={{
                                  fontSize: tokens.typography.captionSize,
                                  color: tokens.colors.text.secondary,
                                  lineHeight: tokens.typography.captionSize * 1.5,
                                }}
                              >
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
              </View>
            )}

            {/* ── BROWSE VIEW ── */}
            {viewMode === "browse" && (
              <View style={{ gap: 14 }}>
                <FilterBar
                  domains={domains}
                  selectedDomain={selectedDomain}
                  onSelectDomain={setSelectedDomain}
                />

                <Text style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.text.muted }}>
                  {filteredPaths.length} paths{" "}
                  {selectedDomain ? `in ${selectedDomain}` : "across all domains"}
                </Text>

                <View style={{ gap: 12 }}>
                  {filteredPaths.map((career: Record<string, unknown>) => (
                    <CareerCard
                      key={career.id as string}
                      title={career.title as string}
                      domain={career.domain as string}
                      summary={career.summary as string}
                      fitScore={scoreMap.get(career.id as string)}
                      isShortlisted={shortlistedIds.includes(career.id as string)}
                      onPress={() => router.push(`/career/${career.id as string}` as never)}
                      onToggleShortlist={() => handleToggleShortlist(career.id as string)}
                    />
                  ))}
                </View>
              </View>
            )}

            {/* Footer links */}
            <View
              style={{
                gap: 10,
                paddingTop: 8,
                paddingBottom: 16,
                borderTopWidth: 1,
                borderTopColor: tokens.colors.border.DEFAULT,
              }}
            >
              <Button
                label="Edit my profile"
                variant="secondary"
                onPress={() => router.push("/edit-profile" as never)}
              />
              <Button
                label="Re-run recommendations"
                variant="ghost"
                onPress={() => router.push("/edit-profile" as never)}
              />
            </View>
          </>
        )}
      </View>
    </Screen>
  );
}

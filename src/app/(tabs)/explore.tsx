import React, { useState, useMemo } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { Screen } from "../../components/ui/Screen";
import { CareerCard } from "../../components/features/CareerCard";
import { FilterBar } from "../../components/features/FilterBar";
import { ErrorState } from "../../components/ui/ErrorState";
import { useTokens } from "../../lib/theme/PersonaProvider";
import { useCareerPaths } from "../../lib/hooks/useCareerPaths";
import { useShortlist, useAddToShortlist, useRemoveFromShortlist } from "../../lib/hooks/useShortlist";
import { useRecommendationStore } from "../../stores/recommendationStore";
import { useLatestRecommendation } from "../../lib/hooks/useRecommendations";

/** Explore: browse and filter all career paths */
export default function ExploreScreen() {
  const router = useRouter();
  const tokens = useTokens();
  const { data: careerData, isLoading, error, refetch } = useCareerPaths();
  const { data: recData } = useLatestRecommendation();
  const shortlistedIds = useRecommendationStore((s) => s.shortlistedIds);
  const addToShortlist = useAddToShortlist();
  const removeFromShortlist = useRemoveFromShortlist();

  useShortlist(); // load shortlist into store

  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);

  const paths = careerData?.paths ?? [];

  // Build score map from latest recommendation
  const scoreMap = useMemo(() => {
    const map = new Map<string, number>();
    for (const item of recData?.items ?? []) {
      map.set(item.career_path_id as string, Number(item.overall_score));
    }
    return map;
  }, [recData]);

  // Extract unique domains
  const domains = useMemo(() => {
    const d = new Set(paths.map((p: Record<string, unknown>) => p.domain as string));
    return Array.from(d).sort();
  }, [paths]);

  // Filter
  const filtered = selectedDomain
    ? paths.filter((p: Record<string, unknown>) => p.domain === selectedDomain)
    : paths;

  if (isLoading) {
    return (
      <Screen padded>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator color={tokens.colors.accent.DEFAULT} size="large" />
        </View>
      </Screen>
    );
  }

  if (error) {
    return (
      <Screen padded>
        <ErrorState message="Failed to load career paths" onRetry={() => refetch()} />
      </Screen>
    );
  }

  const handleToggleShortlist = (careerPathId: string) => {
    if (shortlistedIds.includes(careerPathId)) {
      removeFromShortlist.mutate(careerPathId);
    } else {
      addToShortlist.mutate(careerPathId);
    }
  };

  return (
    <Screen padded>
      <View style={{ flex: 1, gap: 16, paddingTop: 16 }}>
        <Text style={{ fontSize: tokens.typography.headingSize, fontWeight: "700", color: tokens.colors.text.primary }}>
          Explore careers
        </Text>

        <FilterBar
          domains={domains}
          selectedDomain={selectedDomain}
          onSelectDomain={setSelectedDomain}
        />

        <Text style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.text.muted }}>
          {filtered.length} paths {selectedDomain ? `in ${selectedDomain}` : "across all domains"}
        </Text>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 12, paddingBottom: 32 }}>
          {filtered.map((career: Record<string, unknown>) => (
            <CareerCard
              key={career.id as string}
              title={career.title as string}
              domain={career.domain as string}
              summary={career.summary as string}
              fitScore={scoreMap.get(career.id as string)}
              isShortlisted={shortlistedIds.includes(career.id as string)}
              onPress={() => router.push(`/career/${career.id as string}`)}
              onToggleShortlist={() => handleToggleShortlist(career.id as string)}
            />
          ))}
        </ScrollView>
      </View>
    </Screen>
  );
}

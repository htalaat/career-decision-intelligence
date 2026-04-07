import React, { useState, useMemo } from "react";
import { View, Text, ScrollView, Pressable, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { Button } from "../../components/ui/Button";
import { FadeIn } from "../../components/ui/FadeIn";
import { useTokens } from "../../lib/theme/PersonaProvider";
import { useOnboardingStore } from "../../stores/onboardingStore";
import { useCareerPaths } from "../../lib/hooks/useCareerPaths";
import { buildEngineCareerPaths } from "../../lib/hooks/useRecommendations";
import { generateRecommendations } from "../../lib/engine/rank";
import { DIRECTION_CLUSTERS, CLUSTER_REACTIONS } from "../../lib/utils/constants";
import type { EngineProfile } from "../../lib/engine/types";

interface ClusterScore {
  key: string;
  label: string;
  emoji: string;
  color: string;
  domains: readonly string[];
  score: number;
  careerCount: number;
}

/** Step 9: Direction cluster reveal — show broad directions before specific careers */
export default function ClustersScreen() {
  const router = useRouter();
  const tokens = useTokens();
  const { answers, setAnswer, nextStep } = useOnboardingStore();
  const { data: careerData, isLoading } = useCareerPaths();
  const [reactions, setReactions] = useState<Record<string, string>>({});

  /** Build a quick profile from discovery answers only */
  const discoveryProfile: EngineProfile = useMemo(() => ({
    interests: (answers.interests as string[]) ?? [],
    strengths: (answers.strengths as string[]) ?? [],
    values: (answers.values as string[]) ?? [],
    workstyle: (answers.workstyle as string[]) ?? [],
    weights: { income: 50, stability: 50, flexibility: 50, prestige: 50, creativity: 50, impact: 50, study_duration: 50, risk: 50 },
    constraints: { financial_level: null, family_expectation: null, risk_tolerance: null, max_study_years: null, location_constraint: null },
    current_stage: (answers.current_stage as string) ?? null,
    country: null,
    city_region: null,
    current_faculty: null,
    intended_field: null,
    relocation_willingness: null,
    decision_readiness: (answers.decision_readiness as string) ?? null,
    study_country_preference: null,
    clusterReactions: null,
  }), [answers]);

  /** Run engine with discovery-only profile to rank clusters */
  const clusterScores: ClusterScore[] = useMemo(() => {
    if (!careerData?.paths) return [];

    const enginePaths = buildEngineCareerPaths(
      careerData.paths,
      careerData.mappings ?? [],
      careerData.studyDirections ?? [],
    );

    const result = generateRecommendations(discoveryProfile, enginePaths);

    return DIRECTION_CLUSTERS.map((cluster) => {
      const clusterCareers = result.scoredPaths.filter((sp) =>
        (cluster.domains as readonly string[]).includes(sp.domain),
      );
      const avgScore = clusterCareers.length > 0
        ? Math.round(clusterCareers.reduce((sum, c) => sum + c.overallScore, 0) / clusterCareers.length)
        : 0;
      return { ...cluster, score: avgScore, careerCount: clusterCareers.length };
    })
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);
  }, [discoveryProfile, careerData]);

  const handleReaction = (clusterKey: string, reaction: string) => {
    setReactions((prev) => ({ ...prev, [clusterKey]: reaction }));
  };

  const reactedCount = Object.keys(reactions).length;
  const canContinue = reactedCount >= 3;

  const handleNext = () => {
    setAnswer("cluster_reactions", reactions);
    nextStep();
    router.push("/(onboarding)/country" as never);
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color={tokens.colors.accent.DEFAULT} size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 20 }}>
        <FadeIn>
          <View style={{ gap: 8 }}>
            <Text style={{
              fontSize: tokens.typography.headingSize,
              fontWeight: tokens.typography.headingWeight,
              color: tokens.colors.text.primary,
            }}>
              Here's what we see
            </Text>
            <Text style={{
              fontSize: tokens.typography.bodySize,
              color: tokens.colors.text.secondary,
              lineHeight: tokens.typography.bodySize * 1.5,
            }}>
              Based on what you told us, these directions might fit you.
              Tell us how each one feels.
            </Text>
          </View>
        </FadeIn>

        {/* Cluster cards */}
        {clusterScores.map((cluster, index) => {
          const currentReaction = reactions[cluster.key];
          return (
            <FadeIn key={cluster.key} delay={index * 150}>
            <View
              style={{
                backgroundColor: tokens.colors.surface.secondary,
                borderRadius: tokens.borderRadius.xl,
                borderWidth: 2,
                borderColor: currentReaction
                  ? currentReaction === "not_for_me" ? tokens.colors.error + "40" : cluster.color + "60"
                  : tokens.colors.border.DEFAULT,
                padding: 20,
                gap: 14,
              }}
            >
              {/* Cluster header */}
              <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                <View style={{
                  width: 48, height: 48, borderRadius: 14,
                  backgroundColor: cluster.color + "20",
                  alignItems: "center", justifyContent: "center",
                }}>
                  <Text style={{ fontSize: 24 }}>{cluster.emoji}</Text>
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
                    {cluster.score}% match · {cluster.careerCount} careers
                  </Text>
                </View>
              </View>

              {/* Reaction buttons */}
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                {CLUSTER_REACTIONS.map((reaction) => {
                  const isSelected = currentReaction === reaction.value;
                  return (
                    <Pressable
                      key={reaction.value}
                      onPress={() => handleReaction(cluster.key, reaction.value)}
                      accessibilityLabel={`${reaction.label} for ${cluster.label}`}
                      accessibilityRole="radio"
                      style={{
                        paddingHorizontal: 14,
                        paddingVertical: 8,
                        borderRadius: tokens.borderRadius.full,
                        backgroundColor: isSelected
                          ? reaction.value === "not_for_me" ? tokens.colors.error + "30" : cluster.color + "30"
                          : tokens.colors.surface.elevated,
                        borderWidth: 1,
                        borderColor: isSelected ? cluster.color : "transparent",
                      }}
                    >
                      <Text style={{
                        fontSize: tokens.typography.captionSize,
                        fontWeight: isSelected ? "600" : "400",
                        color: isSelected ? tokens.colors.text.primary : tokens.colors.text.secondary,
                      }}>
                        {reaction.emoji} {reaction.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
            </FadeIn>
          );
        })}
      </ScrollView>

      <View style={{ gap: 8, paddingTop: 16 }}>
        <Text style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.text.muted, textAlign: "center" }}>
          {canContinue
            ? `${reactedCount} directions rated — ready to continue`
            : `React to at least 3 directions (${reactedCount}/3)`}
        </Text>
        <Button
          label="Continue"
          onPress={handleNext}
          disabled={!canContinue}
        />
      </View>
    </View>
  );
}

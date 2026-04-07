import React, { useMemo } from "react";
import { View, Text } from "react-native";
import { MotiView } from "moti";
import { useTokens } from "../../lib/theme/PersonaProvider";
import { useCareerPaths } from "../../lib/hooks/useCareerPaths";
import { buildEngineCareerPaths } from "../../lib/hooks/useRecommendations";
import { generateRecommendations } from "../../lib/engine/rank";
import { DIRECTION_CLUSTERS } from "../../lib/utils/constants";
import type { EngineProfile } from "../../lib/engine/types";

interface ClusterPreviewProps {
  partialProfile: Partial<EngineProfile>;
}

/** Shows top 3 direction clusters based on partial profile — early payoff moment */
export function ClusterPreview({ partialProfile }: ClusterPreviewProps) {
  const tokens = useTokens();
  const { data: careerData } = useCareerPaths();

  const topClusters = useMemo(() => {
    if (!careerData?.paths) return [];

    // Build a full engine profile with defaults for missing fields
    const fullProfile: EngineProfile = {
      interests: partialProfile.interests ?? [],
      strengths: partialProfile.strengths ?? [],
      values: partialProfile.values ?? [],
      workstyle: partialProfile.workstyle ?? [],
      weights: partialProfile.weights ?? { income: 50, stability: 50, flexibility: 50, prestige: 50, creativity: 50, impact: 50, study_duration: 50, risk: 50 },
      constraints: partialProfile.constraints ?? { financial_level: null, family_expectation: null, risk_tolerance: null, max_study_years: null, location_constraint: null },
      current_stage: "high_school",
      country: partialProfile.country ?? null,
      city_region: null,
      current_faculty: null,
      intended_field: null,
      relocation_willingness: null,
      decision_readiness: null,
      study_country_preference: null,
      clusterReactions: null,
      subjectsEnjoyed: partialProfile.subjectsEnjoyed ?? [],
      subjectsGoodAt: partialProfile.subjectsGoodAt ?? [],
      subjectsDisliked: partialProfile.subjectsDisliked ?? [],
      currentSubjects: partialProfile.currentSubjects ?? [],
      schoolSystem: partialProfile.schoolSystem ?? null,
      curriculumLevel: partialProfile.curriculumLevel ?? null,
    };

    const enginePaths = buildEngineCareerPaths(
      careerData.paths,
      careerData.mappings ?? [],
      careerData.studyDirections ?? [],
    );

    const result = generateRecommendations(fullProfile, enginePaths);

    // Score clusters by averaging career scores in each domain
    return DIRECTION_CLUSTERS.map((cluster) => {
      const careers = result.scoredPaths.filter((sp) =>
        (cluster.domains as readonly string[]).includes(sp.domain),
      );
      const avg = careers.length > 0
        ? Math.round(careers.reduce((s, c) => s + c.overallScore, 0) / careers.length)
        : 0;
      return { ...cluster, score: avg };
    })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }, [partialProfile, careerData]);

  if (topClusters.length === 0) return null;

  return (
    <MotiView
      from={{ opacity: 0, translateY: 12 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 500 }}
    >
      <View style={{
        backgroundColor: tokens.colors.surface.secondary,
        borderRadius: tokens.borderRadius.lg,
        borderWidth: 1,
        borderColor: tokens.colors.border.DEFAULT,
        padding: 16,
        gap: 12,
      }}>
        <Text style={{
          fontSize: tokens.typography.captionSize,
          fontWeight: "600",
          color: tokens.colors.accent.DEFAULT,
          textTransform: "uppercase",
          letterSpacing: 0.5,
        }}>
          ✨ Early peek at your directions
        </Text>

        {topClusters.map((cluster, i) => (
          <View
            key={cluster.key}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              paddingVertical: 6,
            }}
          >
            <View style={{
              width: 32, height: 32, borderRadius: 10,
              backgroundColor: cluster.color + "20",
              alignItems: "center", justifyContent: "center",
            }}>
              <Text style={{ fontSize: 16 }}>{cluster.emoji}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{
                fontSize: tokens.typography.captionSize,
                fontWeight: "600",
                color: tokens.colors.text.primary,
              }}>
                {cluster.label}
              </Text>
            </View>
            <Text style={{
              fontSize: tokens.typography.captionSize,
              fontWeight: "700",
              color: cluster.color,
            }}>
              {cluster.score}%
            </Text>
          </View>
        ))}

        <Text style={{
          fontSize: 12,
          color: tokens.colors.text.muted,
          textAlign: "center",
        }}>
          This is just a preview — it gets better as you tell us more
        </Text>
      </View>
    </MotiView>
  );
}

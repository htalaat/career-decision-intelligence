import React from "react";
import { View, Text } from "react-native";
import { useTokens } from "../../lib/theme/PersonaProvider";
import type { ScoredPath } from "../../lib/engine/types";

interface CompareTableProps {
  paths: ScoredPath[];
}

interface DimensionDef {
  label: string;
  getValue: (p: ScoredPath) => number;
}

const DIMENSIONS: DimensionDef[] = [
  { label: "Overall fit", getValue: (p) => p.overallScore },
  { label: "Interest match", getValue: (p) => p.breakdown.interestFit },
  { label: "Strength match", getValue: (p) => p.breakdown.strengthFit },
  { label: "Values fit", getValue: (p) => p.breakdown.valuesFit },
  { label: "Subject match", getValue: (p) => p.breakdown.subjectFit },
  { label: "Your reaction", getValue: (p) => p.breakdown.clusterReactionFit },
  { label: "Education fit", getValue: (p) => p.breakdown.educationFit },
  { label: "Feasibility", getValue: (p) => p.breakdown.feasibilityFit },
];

/** Mobile-friendly stacked comparison — one card per career with all dimensions */
export function CompareTable({ paths }: CompareTableProps) {
  const tokens = useTokens();

  if (paths.length === 0) return null;

  // Find the best score for each dimension to highlight winners
  const bestScores = DIMENSIONS.map((dim) => ({
    dim,
    best: Math.max(...paths.map((p) => dim.getValue(p))),
  }));

  return (
    <View style={{ gap: 16 }}>
      {paths.map((path, pathIndex) => (
        <View
          key={path.careerPathId}
          style={{
            backgroundColor: tokens.colors.surface.secondary,
            borderRadius: 16,
            borderWidth: 2,
            borderColor: pathIndex === 0 ? tokens.colors.accent.DEFAULT : tokens.colors.border.DEFAULT,
            padding: 16,
            gap: 14,
          }}
        >
          {/* Career header */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{
              width: 32, height: 32, borderRadius: 16,
              backgroundColor: pathIndex === 0 ? tokens.colors.accent.DEFAULT : tokens.colors.surface.elevated,
              alignItems: "center", justifyContent: "center",
              marginRight: 10,
            }}>
              <Text style={{
                fontSize: 14, fontWeight: "700",
                color: pathIndex === 0 ? "#FFFFFF" : tokens.colors.text.muted,
              }}>
                {pathIndex + 1}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{
                fontSize: tokens.typography.titleSize,
                fontWeight: tokens.typography.titleWeight,
                color: tokens.colors.text.primary,
              }}>
                {path.title}
              </Text>
              <Text style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.text.secondary }}>
                {path.domain} · {path.overallScore}% overall
              </Text>
            </View>
          </View>

          {/* Score dimensions */}
          {DIMENSIONS.map((dim, dimIndex) => {
            const value = dim.getValue(path);
            const isBest = paths.length > 1 && value === bestScores[dimIndex]?.best && value > 0;
            const barColor = value >= 70 ? tokens.colors.teal : value >= 50 ? tokens.colors.gold : tokens.colors.error;

            return (
              <View key={dim.label} style={{ gap: 4 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                  <Text style={{
                    fontSize: tokens.typography.captionSize,
                    color: tokens.colors.text.secondary,
                  }}>
                    {dim.label}
                  </Text>
                  <Text style={{
                    fontSize: tokens.typography.captionSize,
                    fontWeight: isBest ? "700" : "500",
                    color: isBest ? barColor : tokens.colors.text.primary,
                  }}>
                    {value}%{isBest ? " ★" : ""}
                  </Text>
                </View>
                <View style={{
                  height: 6, borderRadius: 3,
                  backgroundColor: tokens.colors.surface.elevated,
                  overflow: "hidden",
                }}>
                  <View style={{
                    height: "100%",
                    width: `${Math.min(100, value)}%`,
                    backgroundColor: barColor,
                    borderRadius: 3,
                  }} />
                </View>
              </View>
            );
          })}

          {/* Study direction */}
          {path.explanation.suggestedFaculty && (
            <View style={{
              backgroundColor: tokens.colors.accent.muted,
              borderRadius: 10,
              padding: 10,
            }}>
              <Text style={{ fontSize: tokens.typography.captionSize, fontWeight: "600", color: tokens.colors.accent.DEFAULT }}>
                📚 Study direction
              </Text>
              <Text style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.text.primary, marginTop: 4 }}>
                {path.explanation.suggestedFaculty}
              </Text>
              {path.explanation.suggestedDegree && (
                <Text style={{ fontSize: 12, color: tokens.colors.text.secondary, marginTop: 2 }}>
                  {path.explanation.suggestedDegree}
                </Text>
              )}
            </View>
          )}

          {/* Key positives and negatives */}
          {path.explanation.topPositives.length > 0 && (
            <View style={{ gap: 4 }}>
              <Text style={{ fontSize: 12, fontWeight: "600", color: tokens.colors.teal }}>Why it fits:</Text>
              {path.explanation.topPositives.slice(0, 2).map((r, i) => (
                <Text key={i} style={{ fontSize: 12, color: tokens.colors.text.secondary }}>+ {r}</Text>
              ))}
            </View>
          )}
          {path.explanation.topNegatives.length > 0 && (
            <View style={{ gap: 4 }}>
              <Text style={{ fontSize: 12, fontWeight: "600", color: tokens.colors.gold }}>Watch out:</Text>
              {path.explanation.topNegatives.slice(0, 1).map((r, i) => (
                <Text key={i} style={{ fontSize: 12, color: tokens.colors.text.secondary }}>- {r}</Text>
              ))}
            </View>
          )}
        </View>
      ))}
    </View>
  );
}

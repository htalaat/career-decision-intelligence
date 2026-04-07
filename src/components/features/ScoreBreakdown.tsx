import React from "react";
import { View, Text } from "react-native";
import { useTokens } from "../../lib/theme/PersonaProvider";

interface ScoreBreakdownProps {
  interestFit: number;
  strengthFit: number;
  valuesFit: number;
  workstyleFit: number;
  goalsFit: number;
  feasibilityFit: number;
  educationFit?: number;
  countryFit?: number;
  clusterReactionFit?: number;
}

const DIMENSION_LABELS: Array<{ key: keyof ScoreBreakdownProps; label: string }> = [
  { key: "interestFit", label: "Interest fit" },
  { key: "strengthFit", label: "Strength fit" },
  { key: "valuesFit", label: "Values alignment" },
  { key: "workstyleFit", label: "Work-style fit" },
  { key: "goalsFit", label: "Goals alignment" },
  { key: "feasibilityFit", label: "Practical feasibility" },
  { key: "educationFit", label: "Education path fit" },
  { key: "countryFit", label: "Country/location fit" },
  { key: "clusterReactionFit", label: "Your reaction fit" },
];

/** Visual breakdown of the 8 scoring dimensions as horizontal bars */
export function ScoreBreakdown(props: ScoreBreakdownProps) {
  const tokens = useTokens();

  return (
    <View style={{ gap: 10 }}>
      <Text style={{ fontSize: tokens.typography.bodySize, fontWeight: "600", color: tokens.colors.text.primary }}>
        Score breakdown
      </Text>
      {DIMENSION_LABELS.map(({ key, label }) => {
        const value = props[key] ?? 0;
        const barColor = value >= 70
          ? tokens.colors.success
          : value >= 50
            ? tokens.colors.warning
            : tokens.colors.error;

        return (
          <View key={key} style={{ gap: 4 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.text.secondary }}>
                {label}
              </Text>
              <Text style={{ fontSize: tokens.typography.captionSize, fontWeight: "600", color: tokens.colors.text.primary }}>
                {value}%
              </Text>
            </View>
            <View style={{ height: 6, backgroundColor: tokens.colors.surface.elevated, borderRadius: 3, overflow: "hidden" }}>
              <View style={{ height: "100%", width: `${Math.min(100, value)}%`, backgroundColor: barColor, borderRadius: 3 }} />
            </View>
          </View>
        );
      })}
    </View>
  );
}

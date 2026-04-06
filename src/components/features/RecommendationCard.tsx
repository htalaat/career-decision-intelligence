import React from "react";
import { View, Text, Pressable } from "react-native";
import { Badge } from "../ui/Badge";
import { useTokens } from "../../lib/theme/PersonaProvider";

interface RecommendationCardProps {
  rank: number;
  title: string;
  domain: string;
  overallScore: number;
  topPositives: string[];
  topNegatives: string[];
  onPress?: () => void;
}

/** Extended recommendation card with rank, score, and top reasons */
export function RecommendationCard({
  rank,
  title,
  domain,
  overallScore,
  topPositives,
  topNegatives,
  onPress,
}: RecommendationCardProps) {
  const tokens = useTokens();

  const scoreVariant = overallScore >= 70 ? "success" : overallScore >= 50 ? "warning" : "error";

  return (
    <Pressable
      onPress={onPress}
      accessibilityLabel={`Rank ${rank}: ${title}, ${overallScore}% fit`}
      accessibilityRole="button"
      style={{
        backgroundColor: tokens.colors.surface.secondary,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: rank <= 3 ? tokens.colors.accent.DEFAULT + "40" : tokens.colors.border.DEFAULT,
        padding: tokens.spacing.md,
        gap: 12,
      }}
    >
      {/* Header */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
        <View style={{ flex: 1, gap: 4 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <View style={{
              width: 28,
              height: 28,
              borderRadius: 14,
              backgroundColor: rank <= 3 ? tokens.colors.accent.DEFAULT : tokens.colors.surface.elevated,
              alignItems: "center",
              justifyContent: "center",
            }}>
              <Text style={{ fontSize: 13, fontWeight: "700", color: rank <= 3 ? "#FFFFFF" : tokens.colors.text.muted }}>
                {rank}
              </Text>
            </View>
            <Text style={{ fontSize: tokens.typography.bodySize, fontWeight: "700", color: tokens.colors.text.primary, flex: 1 }}>
              {title}
            </Text>
          </View>
          <Text style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.text.muted, marginLeft: 36 }}>
            {domain}
          </Text>
        </View>
        <Badge label={`${overallScore}%`} variant={scoreVariant} />
      </View>

      {/* Why it fits */}
      {topPositives.length > 0 && (
        <View style={{ gap: 4 }}>
          <Text style={{ fontSize: tokens.typography.captionSize, fontWeight: "600", color: tokens.colors.success }}>
            Why it fits:
          </Text>
          {topPositives.slice(0, 2).map((reason, i) => (
            <Text key={i} style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.text.secondary, paddingLeft: 8 }}>
              + {reason}
            </Text>
          ))}
        </View>
      )}

      {/* Watch out */}
      {topNegatives.length > 0 && (
        <View style={{ gap: 4 }}>
          <Text style={{ fontSize: tokens.typography.captionSize, fontWeight: "600", color: tokens.colors.warning }}>
            Watch out:
          </Text>
          {topNegatives.slice(0, 1).map((reason, i) => (
            <Text key={i} style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.text.secondary, paddingLeft: 8 }}>
              - {reason}
            </Text>
          ))}
        </View>
      )}
    </Pressable>
  );
}

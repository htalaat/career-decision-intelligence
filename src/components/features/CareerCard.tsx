import React from "react";
import { View, Text, Pressable } from "react-native";
import { Badge } from "../ui/Badge";
import { useTokens } from "../../lib/theme/PersonaProvider";

interface CareerCardProps {
  title: string;
  domain: string;
  summary: string;
  fitScore?: number;
  confidenceScore?: number;
  isShortlisted?: boolean;
  onPress?: () => void;
  onToggleShortlist?: () => void;
}

/** Career path preview card with fit score and shortlist toggle */
export function CareerCard({
  title,
  domain,
  summary,
  fitScore,
  confidenceScore,
  isShortlisted = false,
  onPress,
  onToggleShortlist,
}: CareerCardProps) {
  const tokens = useTokens();

  const fitVariant = fitScore != null
    ? fitScore >= 70 ? "success" : fitScore >= 50 ? "warning" : "error"
    : "default";

  return (
    <Pressable
      onPress={onPress}
      accessibilityLabel={`${title} in ${domain}`}
      accessibilityRole="button"
      style={{
        backgroundColor: tokens.colors.surface.secondary,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: tokens.colors.border.DEFAULT,
        padding: tokens.spacing.md,
        gap: 12,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
        <View style={{ flex: 1, gap: 4 }}>
          <Text style={{ fontSize: tokens.typography.bodySize, fontWeight: "700", color: tokens.colors.text.primary }}>
            {title}
          </Text>
          <Text style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.text.muted }}>
            {domain}
          </Text>
        </View>
        {fitScore != null && (
          <Badge label={`${fitScore}% fit`} variant={fitVariant} />
        )}
      </View>

      <Text
        style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.text.secondary, lineHeight: tokens.typography.captionSize * 1.5 }}
        numberOfLines={2}
      >
        {summary}
      </Text>

      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        {confidenceScore != null && (
          <Text style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.text.muted }}>
            Confidence: {Math.round(confidenceScore * 100)}%
          </Text>
        )}
        {onToggleShortlist && (
          <Pressable
            onPress={(e) => { e.stopPropagation?.(); onToggleShortlist(); }}
            accessibilityLabel={isShortlisted ? "Remove from shortlist" : "Add to shortlist"}
            accessibilityRole="button"
            style={{
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 8,
              backgroundColor: isShortlisted ? tokens.colors.accent.DEFAULT + "20" : tokens.colors.surface.elevated,
            }}
          >
            <Text style={{
              fontSize: tokens.typography.captionSize,
              fontWeight: "600",
              color: isShortlisted ? tokens.colors.accent.DEFAULT : tokens.colors.text.secondary,
            }}>
              {isShortlisted ? "Shortlisted" : "Shortlist"}
            </Text>
          </Pressable>
        )}
      </View>
    </Pressable>
  );
}

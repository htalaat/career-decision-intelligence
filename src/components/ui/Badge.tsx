import React from "react";
import { View, Text } from "react-native";
import { useTokens } from "../../lib/theme/PersonaProvider";

type BadgeVariant = "default" | "success" | "warning" | "error" | "accent";

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
}

/** Status badge */
export function Badge({ label, variant = "default" }: BadgeProps) {
  const tokens = useTokens();

  const bgMap: Record<BadgeVariant, string> = {
    default: tokens.colors.surface.elevated,
    success: tokens.colors.teal + "22",
    warning: tokens.colors.gold + "33",
    error: tokens.colors.error + "22",
    accent: tokens.colors.accent.muted,
  };

  const textColorMap: Record<BadgeVariant, string> = {
    default: tokens.colors.text.primary,
    success: "#00A8A4",
    warning: "#9A7A00",
    error: tokens.colors.error,
    accent: tokens.colors.accent.DEFAULT,
  };

  return (
    <View
      style={{
        backgroundColor: bgMap[variant],
        borderRadius: tokens.borderRadius.full,
        paddingHorizontal: 12,
        paddingVertical: 4,
        alignSelf: "flex-start",
      }}
    >
      <Text style={{ fontSize: tokens.typography.captionSize, fontWeight: "500", color: textColorMap[variant] }}>{label}</Text>
    </View>
  );
}

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
    default: "bg-surface-elevated",
    success: "bg-success/20",
    warning: "bg-warning/20",
    error: "bg-error/20",
    accent: "bg-accent/20",
  };

  const textMap: Record<BadgeVariant, string> = {
    default: "text-text-secondary",
    success: "text-success",
    warning: "text-warning",
    error: "text-error",
    accent: "text-accent",
  };

  return (
    <View className={`${bgMap[variant]} rounded-full px-3 py-1 self-start`}>
      <Text className={`${textMap[variant]} font-medium`} style={{ fontSize: tokens.typography.captionSize }}>{label}</Text>
    </View>
  );
}

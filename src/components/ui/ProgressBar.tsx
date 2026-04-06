import React from "react";
import { View, Text } from "react-native";
import { useTokens } from "../../lib/theme/PersonaProvider";

interface ProgressBarProps {
  percent: number;
  label?: string;
  showPercent?: boolean;
}

/** Horizontal progress bar */
export function ProgressBar({ percent, label, showPercent = true }: ProgressBarProps) {
  const tokens = useTokens();
  const clamped = Math.min(100, Math.max(0, percent));

  return (
    <View className="gap-1">
      {(label || showPercent) && (
        <View className="flex-row justify-between">
          {label && <Text className="text-text-secondary" style={{ fontSize: tokens.typography.captionSize }}>{label}</Text>}
          {showPercent && <Text className="text-text-muted" style={{ fontSize: tokens.typography.captionSize }}>{Math.round(clamped)}%</Text>}
        </View>
      )}
      <View className="h-2 bg-surface-elevated rounded-full overflow-hidden">
        <View className="h-full bg-accent rounded-full" style={{ width: `${clamped}%` }} />
      </View>
    </View>
  );
}

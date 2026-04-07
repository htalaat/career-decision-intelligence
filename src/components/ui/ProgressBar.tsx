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
          {label && <Text style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.text.secondary }}>{label}</Text>}
          {showPercent && <Text style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.text.muted }}>{Math.round(clamped)}%</Text>}
        </View>
      )}
      <View className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: tokens.colors.surface.elevated }}>
        <View className="h-full rounded-full" style={{ width: `${clamped}%`, backgroundColor: tokens.colors.accent.DEFAULT }} />
      </View>
    </View>
  );
}

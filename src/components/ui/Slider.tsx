import React from "react";
import { View, Text } from "react-native";
import { useTokens } from "../../lib/theme/PersonaProvider";

interface SliderProps {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

/** Labeled slider for priority weighting */
export function Slider({ label, value, onValueChange, min = 0, max = 100, step = 5 }: SliderProps) {
  const tokens = useTokens();
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <View className="gap-2">
      <View className="flex-row justify-between items-center">
        <Text className="text-text-primary font-medium" style={{ fontSize: tokens.typography.bodySize }}>{label}</Text>
        <Text className="text-accent font-semibold" style={{ fontSize: tokens.typography.bodySize }}>{value}</Text>
      </View>
      <View className="h-3 bg-surface-elevated rounded-full overflow-hidden">
        <View className="h-full bg-accent rounded-full" style={{ width: `${percent}%` }} />
      </View>
      <View className="flex-row justify-between">
        <Text className="text-text-muted" style={{ fontSize: tokens.typography.captionSize }}>Low priority</Text>
        <Text className="text-text-muted" style={{ fontSize: tokens.typography.captionSize }}>High priority</Text>
      </View>
    </View>
  );
}

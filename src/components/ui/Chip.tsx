import React from "react";
import { Pressable, Text } from "react-native";
import { useTokens } from "../../lib/theme/PersonaProvider";

interface ChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

/** Selectable tag chip */
export function Chip({ label, selected, onPress }: ChipProps) {
  const tokens = useTokens();

  return (
    <Pressable
      onPress={onPress}
      accessibilityLabel={`${label}, ${selected ? "selected" : "not selected"}`}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: selected }}
      className={`rounded-full px-4 py-2 border ${selected ? "bg-accent border-accent" : "bg-surface-elevated border-border"}`}
      style={{ minHeight: tokens.touchTarget.min }}
    >
      <Text
        className={selected ? "text-white font-semibold" : "text-text-secondary"}
        style={{ fontSize: tokens.typography.bodySize }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

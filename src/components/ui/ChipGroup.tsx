import React from "react";
import { View, Text } from "react-native";
import { Chip } from "./Chip";
import { useTokens } from "../../lib/theme/PersonaProvider";

interface ChipGroupProps {
  options: Array<{ key: string; label: string }>;
  selected: string[];
  onToggle: (key: string) => void;
  min?: number;
  max?: number;
  error?: string;
}

/** Multi-select chip container with min/max enforcement */
export function ChipGroup({ options, selected, onToggle, min = 0, max = Infinity, error }: ChipGroupProps) {
  const tokens = useTokens();

  const handleToggle = (key: string) => {
    if (selected.includes(key)) {
      onToggle(key);
    } else if (selected.length < max) {
      onToggle(key);
    }
  };

  return (
    <View className="gap-2">
      <View className="flex-row flex-wrap gap-2">
        {options.map((option) => (
          <Chip key={option.key} label={option.label} selected={selected.includes(option.key)} onPress={() => handleToggle(option.key)} />
        ))}
      </View>
      {min > 0 && (
        <Text style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.text.muted }}>
          Select {min}–{max === Infinity ? "any number" : max}
        </Text>
      )}
      {error && (
        <Text style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.error, fontWeight: "500" }}>{error}</Text>
      )}
    </View>
  );
}

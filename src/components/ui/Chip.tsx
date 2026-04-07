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
      style={({ pressed }) => ({
        minHeight: tokens.touchTarget.min,
        borderRadius: tokens.borderRadius.full,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: selected ? tokens.colors.accent.DEFAULT : tokens.colors.surface.elevated,
        borderColor: selected ? tokens.colors.accent.DEFAULT : tokens.colors.border.DEFAULT,
        opacity: pressed ? 0.85 : 1,
        transform: [{ scale: pressed ? 0.97 : 1 }],
      })}
    >
      <Text
        style={{
          fontSize: tokens.typography.bodySize,
          fontWeight: selected ? "600" : "400",
          color: selected ? tokens.colors.text.primary : tokens.colors.text.secondary,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

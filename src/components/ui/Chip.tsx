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
        minHeight: 52,
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderWidth: selected ? 0 : 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: selected ? tokens.colors.accent.DEFAULT : tokens.colors.surface.secondary,
        borderColor: tokens.colors.border.DEFAULT,
        opacity: pressed ? 0.85 : 1,
        transform: [{ scale: pressed ? 0.97 : 1 }],
      })}
    >
      <Text
        style={{
          fontSize: tokens.typography.bodySize,
          fontWeight: selected ? "600" : "400",
          color: selected ? tokens.colors.text.inverse : tokens.colors.text.primary,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

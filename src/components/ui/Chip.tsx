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
        minHeight: 48,
        borderRadius: 24,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: selected ? tokens.colors.accent.muted : tokens.colors.surface.secondary,
        borderColor: selected ? tokens.colors.accent.DEFAULT : tokens.colors.border.DEFAULT,
        opacity: pressed ? 0.85 : 1,
        transform: [{ scale: pressed ? 0.97 : 1 }],
      })}
    >
      <Text
        style={{
          fontSize: tokens.typography.bodySize,
          fontWeight: selected ? "700" : "400",
          color: selected ? tokens.colors.accent.DEFAULT : tokens.colors.text.primary,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

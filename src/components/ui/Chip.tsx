import React from "react";
import { Pressable, Text, View } from "react-native";
import { useTokens } from "../../lib/theme/PersonaProvider";

interface ChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

/** Selectable card with checkbox — full-width, mobile-friendly */
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
        borderRadius: 14,
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderWidth: 2,
        flexDirection: "row" as const,
        alignItems: "center" as const,
        backgroundColor: selected ? tokens.colors.accent.muted : tokens.colors.surface.secondary,
        borderColor: selected ? tokens.colors.accent.DEFAULT : tokens.colors.border.DEFAULT,
        opacity: pressed ? 0.9 : 1,
      })}
    >
      {/* Checkbox circle */}
      <View style={{
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: selected ? tokens.colors.accent.DEFAULT : tokens.colors.border.DEFAULT,
        backgroundColor: selected ? tokens.colors.accent.DEFAULT : "transparent",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
      }}>
        {selected && (
          <Text style={{ color: "#FFFFFF", fontSize: 14, fontWeight: "700" }}>✓</Text>
        )}
      </View>
      {/* Label text */}
      <Text
        style={{
          fontSize: tokens.typography.bodySize,
          fontWeight: selected ? "600" : "400",
          color: selected ? tokens.colors.accent.DEFAULT : tokens.colors.text.primary,
          flex: 1,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

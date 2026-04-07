import React from "react";
import { Pressable, Text, View } from "react-native";
import { useTokens } from "../../lib/theme/PersonaProvider";

interface ChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

/** Selectable pill chip — full-width card style for mobile clarity */
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
        paddingHorizontal: 18,
        paddingVertical: 14,
        borderWidth: 2,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        backgroundColor: selected ? tokens.colors.accent.muted : tokens.colors.surface.secondary,
        borderColor: selected ? tokens.colors.accent.DEFAULT : tokens.colors.border.DEFAULT,
        opacity: pressed ? 0.9 : 1,
        transform: [{ scale: pressed ? 0.98 : 1 }],
      })}
    >
      {/* Selection indicator circle */}
      <View style={{
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: selected ? tokens.colors.accent.DEFAULT : tokens.colors.border.DEFAULT,
        backgroundColor: selected ? tokens.colors.accent.DEFAULT : "transparent",
        alignItems: "center",
        justifyContent: "center",
      }}>
        {selected && (
          <Text style={{ color: tokens.colors.text.inverse, fontSize: 14, fontWeight: "700" }}>✓</Text>
        )}
      </View>
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

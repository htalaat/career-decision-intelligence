import React from "react";
import { Pressable, Text, View } from "react-native";
import { useTokens } from "../../lib/theme/PersonaProvider";

interface ChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

/** Selectable card with checkbox on the left, text on the right — same line */
export function Chip({ label, selected, onPress }: ChipProps) {
  const tokens = useTokens();

  return (
    <Pressable
      onPress={onPress}
      accessibilityLabel={`${label}, ${selected ? "selected" : "not selected"}`}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: selected }}
    >
      <View style={{
        minHeight: 52,
        borderRadius: 14,
        paddingLeft: 14,
        paddingRight: 16,
        paddingTop: 14,
        paddingBottom: 14,
        borderWidth: 2,
        display: "flex" as never,
        flexDirection: "row" as never,
        alignItems: "center" as never,
        backgroundColor: selected ? tokens.colors.accent.muted : tokens.colors.surface.secondary,
        borderColor: selected ? tokens.colors.accent.DEFAULT : tokens.colors.border.DEFAULT,
      }}>
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
          flexShrink: 0,
        }}>
          {selected && (
            <Text style={{ color: "#FFFFFF", fontSize: 14, fontWeight: "700", lineHeight: 16 }}>✓</Text>
          )}
        </View>
        {/* Label */}
        <Text style={{
          fontSize: tokens.typography.bodySize,
          fontWeight: selected ? "600" : "400",
          color: selected ? tokens.colors.accent.DEFAULT : tokens.colors.text.primary,
          flexShrink: 1,
        }}>
          {label}
        </Text>
      </View>
    </Pressable>
  );
}

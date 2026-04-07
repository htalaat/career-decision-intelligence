import React from "react";
import { View, Text, Pressable } from "react-native";
import { useTokens } from "../../lib/theme/PersonaProvider";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  options: SelectOption[];
  value: string | null;
  onSelect: (value: string) => void;
  error?: string;
}

/** Single-select option group — card style with radio indicator next to text */
export function Select({ label, options, value, onSelect, error }: SelectProps) {
  const tokens = useTokens();

  return (
    <View style={{ gap: 10 }}>
      <Text style={{ fontSize: tokens.typography.captionSize, fontWeight: "500", color: tokens.colors.text.secondary }}>
        {label}
      </Text>
      <View style={{ gap: 8 }}>
        {options.map((option) => {
          const isSelected = value === option.value;
          return (
            <Pressable
              key={option.value}
              onPress={() => onSelect(option.value)}
              accessibilityLabel={option.label}
              accessibilityRole="radio"
              accessibilityState={{ selected: isSelected }}
            >
              <View style={{
                minHeight: tokens.touchTarget.min,
                borderRadius: 14,
                borderWidth: 2,
                paddingLeft: 14,
                paddingRight: 16,
                paddingTop: 14,
                paddingBottom: 14,
                display: "flex" as never,
                flexDirection: "row" as never,
                alignItems: "center" as never,
                borderColor: isSelected ? tokens.colors.accent.DEFAULT : tokens.colors.border.DEFAULT,
                backgroundColor: isSelected ? tokens.colors.accent.muted : tokens.colors.surface.secondary,
              }}>
                {/* Radio circle */}
                <View style={{
                  width: 22,
                  height: 22,
                  borderRadius: 11,
                  borderWidth: 2,
                  borderColor: isSelected ? tokens.colors.accent.DEFAULT : tokens.colors.border.DEFAULT,
                  backgroundColor: isSelected ? tokens.colors.accent.DEFAULT : "transparent",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 12,
                  flexShrink: 0,
                }}>
                  {isSelected && (
                    <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "#FFFFFF" }} />
                  )}
                </View>
                {/* Label */}
                <Text style={{
                  fontSize: tokens.typography.bodySize,
                  fontWeight: isSelected ? "600" : "400",
                  color: isSelected ? tokens.colors.accent.DEFAULT : tokens.colors.text.primary,
                  flexShrink: 1,
                }}>
                  {option.label}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
      {error && (
        <Text style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.error, fontWeight: "500" }}>
          {error}
        </Text>
      )}
    </View>
  );
}

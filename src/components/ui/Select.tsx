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

/** Single-select option group — card style with radio indicator */
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
              style={({ pressed }) => ({
                minHeight: tokens.touchTarget.min,
                borderRadius: 14,
                borderWidth: 2,
                paddingHorizontal: 16,
                paddingVertical: 14,
                flexDirection: "row" as const,
                alignItems: "center" as const,
                borderColor: isSelected ? tokens.colors.accent.DEFAULT : tokens.colors.border.DEFAULT,
                backgroundColor: isSelected ? tokens.colors.accent.muted : tokens.colors.surface.secondary,
                opacity: pressed ? 0.9 : 1,
              })}
            >
              {/* Radio indicator */}
              <View style={{
                width: 22,
                height: 22,
                borderRadius: 11,
                marginRight: 12,
                borderWidth: 2,
                borderColor: isSelected ? tokens.colors.accent.DEFAULT : tokens.colors.border.DEFAULT,
                backgroundColor: isSelected ? tokens.colors.accent.DEFAULT : "transparent",
                alignItems: "center",
                justifyContent: "center",
              }}>
                {isSelected && (
                  <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: tokens.colors.text.inverse }} />
                )}
              </View>
              <Text
                style={{
                  fontSize: tokens.typography.bodySize,
                  fontWeight: isSelected ? "600" : "400",
                  color: isSelected ? tokens.colors.accent.DEFAULT : tokens.colors.text.primary,
                  flex: 1,
                }}
              >
                {option.label}
              </Text>
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

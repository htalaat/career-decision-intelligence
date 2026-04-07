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

/** Single-select option group rendered as tappable cards */
export function Select({ label, options, value, onSelect, error }: SelectProps) {
  const tokens = useTokens();

  return (
    <View className="gap-2">
      <Text style={{ fontSize: tokens.typography.captionSize, fontWeight: "500", color: tokens.colors.text.secondary }}>{label}</Text>
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
              style={{
                minHeight: tokens.touchTarget.min,
                borderRadius: tokens.borderRadius.md,
                borderWidth: 1,
                paddingHorizontal: 16,
                paddingVertical: 12,
                justifyContent: "center",
                borderColor: isSelected ? tokens.colors.accent.DEFAULT : tokens.colors.border.DEFAULT,
                backgroundColor: isSelected ? tokens.colors.accent.DEFAULT + "15" : tokens.colors.surface.elevated,
              }}
            >
              <Text
                style={{
                  fontSize: tokens.typography.bodySize,
                  fontWeight: isSelected ? "600" : "400",
                  color: isSelected ? tokens.colors.accent.DEFAULT : tokens.colors.text.primary,
                }}
              >
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
      {error && (
        <Text style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.error }}>{error}</Text>
      )}
    </View>
  );
}

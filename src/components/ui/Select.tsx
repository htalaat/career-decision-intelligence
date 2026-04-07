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
      <Text className="font-medium" style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.text.secondary }}>{label}</Text>
      <View className="gap-2">
        {options.map((option) => (
          <Pressable
            key={option.value}
            onPress={() => onSelect(option.value)}
            accessibilityLabel={option.label}
            accessibilityRole="radio"
            accessibilityState={{ selected: value === option.value }}
            className={`rounded-xl border px-4 py-3 ${value === option.value ? "border-accent" : "border-border"}`}
            style={{ minHeight: tokens.touchTarget.min, backgroundColor: value === option.value ? tokens.colors.accent.light : tokens.colors.surface.elevated }}
          >
            <Text
              className={value === option.value ? "font-semibold" : undefined}
              style={{ fontSize: tokens.typography.bodySize, color: value === option.value ? tokens.colors.accent.DEFAULT : tokens.colors.text.primary }}
            >
              {option.label}
            </Text>
          </Pressable>
        ))}
      </View>
      {error && (
        <Text style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.error }}>{error}</Text>
      )}
    </View>
  );
}

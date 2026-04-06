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
      <Text className="text-text-secondary font-medium" style={{ fontSize: tokens.typography.captionSize }}>{label}</Text>
      <View className="gap-2">
        {options.map((option) => (
          <Pressable
            key={option.value}
            onPress={() => onSelect(option.value)}
            accessibilityLabel={option.label}
            accessibilityRole="radio"
            accessibilityState={{ selected: value === option.value }}
            className={`rounded-xl border px-4 py-3 ${value === option.value ? "bg-accent/10 border-accent" : "bg-surface-elevated border-border"}`}
            style={{ minHeight: tokens.touchTarget.min }}
          >
            <Text
              className={value === option.value ? "text-accent font-semibold" : "text-text-primary"}
              style={{ fontSize: tokens.typography.bodySize }}
            >
              {option.label}
            </Text>
          </Pressable>
        ))}
      </View>
      {error && (
        <Text className="text-error" style={{ fontSize: tokens.typography.captionSize }}>{error}</Text>
      )}
    </View>
  );
}

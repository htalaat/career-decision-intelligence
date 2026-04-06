import React from "react";
import { View, Text, TextInput, type TextInputProps } from "react-native";
import { useTokens } from "../../lib/theme/PersonaProvider";

interface InputProps extends Omit<TextInputProps, "style"> {
  label: string;
  error?: string;
  helper?: string;
}

/** Text input with label, error, and helper text */
export function Input({ label, error, helper, ...inputProps }: InputProps) {
  const tokens = useTokens();

  return (
    <View className="gap-1.5">
      <Text className="text-text-secondary font-medium" style={{ fontSize: tokens.typography.captionSize }}>
        {label}
      </Text>
      <TextInput
        className="bg-surface-elevated border border-border rounded-xl px-4 py-3 text-text-primary"
        style={{ fontSize: tokens.typography.bodySize, minHeight: tokens.touchTarget.min }}
        placeholderTextColor={tokens.colors.text.muted}
        accessibilityLabel={label}
        {...inputProps}
      />
      {error && (
        <Text className="text-error" style={{ fontSize: tokens.typography.captionSize }}>{error}</Text>
      )}
      {helper && !error && (
        <Text className="text-text-muted" style={{ fontSize: tokens.typography.captionSize }}>{helper}</Text>
      )}
    </View>
  );
}

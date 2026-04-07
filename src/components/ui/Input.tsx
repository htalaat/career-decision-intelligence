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
      <Text style={{ fontSize: tokens.typography.captionSize, fontWeight: "500", color: tokens.colors.text.secondary }}>
        {label}
      </Text>
      <TextInput
        style={{
          fontSize: tokens.typography.bodySize,
          minHeight: tokens.touchTarget.min,
          borderRadius: tokens.borderRadius.md,
          borderWidth: 1,
          borderColor: tokens.colors.border.DEFAULT,
          paddingHorizontal: 16,
          paddingVertical: 12,
          backgroundColor: tokens.colors.surface.elevated,
          color: tokens.colors.text.primary,
        }}
        placeholderTextColor={tokens.colors.text.muted}
        accessibilityLabel={label}
        {...inputProps}
      />
      {error && (
        <Text style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.error }}>{error}</Text>
      )}
      {helper && !error && (
        <Text style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.text.muted }}>{helper}</Text>
      )}
    </View>
  );
}

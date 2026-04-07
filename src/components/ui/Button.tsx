import React from "react";
import { Pressable, Text, ActivityIndicator } from "react-native";
import { useTokens } from "../../lib/theme/PersonaProvider";

type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  accessibilityLabel?: string;
}

/** Primary action button with persona-aware sizing */
export function Button({ label, onPress, variant = "primary", disabled = false, loading = false, accessibilityLabel }: ButtonProps) {
  const tokens = useTokens();

  const bgMap: Record<ButtonVariant, string> = {
    primary: tokens.colors.accent.DEFAULT,
    secondary: tokens.colors.surface.elevated,
    ghost: "transparent",
    destructive: tokens.colors.error,
  };

  const textColorMap: Record<ButtonVariant, string> = {
    primary: tokens.colors.text.primary,
    secondary: tokens.colors.text.primary,
    ghost: tokens.colors.accent.DEFAULT,
    destructive: tokens.colors.text.primary,
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityRole="button"
      className={`items-center justify-center ${disabled ? "opacity-50" : "active:opacity-80"}`}
      style={{
        minHeight: tokens.touchTarget.min,
        borderRadius: tokens.borderRadius.md,
        paddingVertical: 16,
        paddingHorizontal: 32,
        backgroundColor: bgMap[variant],
      }}
    >
      {loading ? (
        <ActivityIndicator color={tokens.colors.text.primary} />
      ) : (
        <Text style={{ fontSize: tokens.typography.bodySize, fontWeight: "700", color: textColorMap[variant] }}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}

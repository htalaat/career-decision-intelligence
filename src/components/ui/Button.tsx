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
    secondary: tokens.colors.surface.secondary,
    ghost: "transparent",
    destructive: tokens.colors.error,
  };

  const textColorMap: Record<ButtonVariant, string> = {
    primary: tokens.colors.text.inverse,
    secondary: tokens.colors.accent.DEFAULT,
    ghost: tokens.colors.accent.DEFAULT,
    destructive: tokens.colors.text.inverse,
  };

  const borderMap: Record<ButtonVariant, string | undefined> = {
    primary: undefined,
    secondary: tokens.colors.border.DEFAULT,
    ghost: undefined,
    destructive: undefined,
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
        borderWidth: borderMap[variant] ? 1 : 0,
        borderColor: borderMap[variant],
      }}
    >
      {loading ? (
        <ActivityIndicator color={variant === "primary" || variant === "destructive" ? tokens.colors.text.inverse : tokens.colors.accent.DEFAULT} />
      ) : (
        <Text style={{ fontSize: tokens.typography.bodySize, fontWeight: "700", color: textColorMap[variant] }}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}

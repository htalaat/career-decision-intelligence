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
    primary: "bg-accent",
    secondary: "bg-surface-elevated",
    ghost: "bg-transparent",
    destructive: "bg-error",
  };

  const textMap: Record<ButtonVariant, string> = {
    primary: "text-white",
    secondary: "text-text-primary",
    ghost: "text-accent",
    destructive: "text-white",
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityRole="button"
      className={`items-center justify-center rounded-xl py-4 px-6 ${bgMap[variant]} ${disabled ? "opacity-50" : "active:opacity-80"}`}
      style={{ minHeight: tokens.touchTarget.min }}
    >
      {loading ? (
        <ActivityIndicator color={tokens.colors.text.primary} />
      ) : (
        <Text className={`font-semibold ${textMap[variant]}`} style={{ fontSize: tokens.typography.bodySize }}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}

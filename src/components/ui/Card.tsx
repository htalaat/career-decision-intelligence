import React from "react";
import { Pressable, View } from "react-native";
import { useTokens } from "../../lib/theme/PersonaProvider";

interface CardProps {
  children: React.ReactNode;
  elevated?: boolean;
  onPress?: () => void;
  accessibilityLabel?: string;
}

/** Container card with persona-aware spacing */
export function Card({ children, elevated = false, onPress, accessibilityLabel }: CardProps) {
  const tokens = useTokens();
  const content = (
    <View
      style={{
        padding: tokens.spacing.md,
        borderRadius: tokens.borderRadius.lg,
        borderWidth: 1,
        borderColor: tokens.colors.border.DEFAULT,
        backgroundColor: elevated ? tokens.colors.surface.elevated : tokens.colors.surface.secondary,
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
      }}
    >
      {children}
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} accessibilityLabel={accessibilityLabel} accessibilityRole="button" className="active:opacity-90">
        {content}
      </Pressable>
    );
  }

  return content;
}

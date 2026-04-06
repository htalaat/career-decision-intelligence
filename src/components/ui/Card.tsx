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
  const bg = elevated ? "bg-surface-elevated" : "bg-surface-secondary";

  const content = (
    <View className={`${bg} rounded-2xl border border-border`} style={{ padding: tokens.spacing.md }}>
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

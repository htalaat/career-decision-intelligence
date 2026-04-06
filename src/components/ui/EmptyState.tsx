import React from "react";
import { View, Text } from "react-native";
import { Button } from "./Button";
import { useTokens } from "../../lib/theme/PersonaProvider";

interface EmptyStateProps {
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

/** Empty state with optional call-to-action */
export function EmptyState({ title, message, actionLabel, onAction }: EmptyStateProps) {
  const tokens = useTokens();

  return (
    <View className="flex-1 items-center justify-center px-8 gap-4">
      <Text className="text-text-primary font-semibold text-center" style={{ fontSize: tokens.typography.titleSize }}>{title}</Text>
      <Text className="text-text-secondary text-center" style={{ fontSize: tokens.typography.bodySize }}>{message}</Text>
      {actionLabel && onAction && <Button label={actionLabel} onPress={onAction} />}
    </View>
  );
}

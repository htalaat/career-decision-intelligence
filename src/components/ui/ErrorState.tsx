import React from "react";
import { View, Text } from "react-native";
import { Button } from "./Button";
import { useTokens } from "../../lib/theme/PersonaProvider";

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

/** Error state with retry button */
export function ErrorState({ message, onRetry }: ErrorStateProps) {
  const tokens = useTokens();

  return (
    <View className="flex-1 items-center justify-center px-8 gap-4">
      <Text className="font-semibold text-center" style={{ fontSize: tokens.typography.titleSize, color: tokens.colors.error }}>Something went wrong</Text>
      <Text className="text-center" style={{ fontSize: tokens.typography.bodySize, color: tokens.colors.text.secondary }}>{message}</Text>
      {onRetry && <Button label="Try again" onPress={onRetry} variant="secondary" />}
    </View>
  );
}

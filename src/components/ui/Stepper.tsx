import React from "react";
import { View, Text } from "react-native";
import { useTokens } from "../../lib/theme/PersonaProvider";

interface StepperProps {
  currentStep: number;
  totalSteps: number;
  stepLabel?: string;
}

/** Onboarding progress indicator */
export function Stepper({ currentStep, totalSteps, stepLabel }: StepperProps) {
  const tokens = useTokens();
  const percent = (currentStep / totalSteps) * 100;

  return (
    <View className="gap-2">
      <View className="flex-row justify-between items-center">
        <Text className="text-text-secondary font-medium" style={{ fontSize: tokens.typography.captionSize }}>
          Step {currentStep} of {totalSteps}
        </Text>
        {stepLabel && (
          <Text className="text-text-muted" style={{ fontSize: tokens.typography.captionSize }}>{stepLabel}</Text>
        )}
      </View>
      <View className="h-1.5 bg-surface-elevated rounded-full overflow-hidden">
        <View className="h-full bg-accent rounded-full" style={{ width: `${percent}%` }} />
      </View>
    </View>
  );
}

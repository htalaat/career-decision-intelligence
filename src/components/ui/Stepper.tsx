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
    <View style={{ gap: 8 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ fontSize: tokens.typography.captionSize, fontWeight: "500", color: tokens.colors.text.secondary }}>
          Step {currentStep} of {totalSteps}
        </Text>
        {stepLabel && (
          <Text style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.text.muted }}>
            {stepLabel}
          </Text>
        )}
      </View>
      <View style={{ height: 8, backgroundColor: tokens.colors.surface.elevated, borderRadius: tokens.borderRadius.full, overflow: "hidden" }}>
        <View
          style={{
            height: "100%",
            width: `${percent}%`,
            backgroundColor: tokens.colors.accent.DEFAULT,
            borderRadius: tokens.borderRadius.full,
          }}
        />
      </View>
    </View>
  );
}

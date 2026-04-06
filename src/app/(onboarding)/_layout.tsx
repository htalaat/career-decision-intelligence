import React from "react";
import { View } from "react-native";
import { Stack } from "expo-router";
import { Stepper } from "../../components/ui/Stepper";
import { useOnboardingStore } from "../../stores/onboardingStore";
import { ONBOARDING_STEPS } from "../../lib/utils/constants";
import { useTokens } from "../../lib/theme/PersonaProvider";

/** Onboarding layout: stepper progress bar at top */
export default function OnboardingLayout() {
  const tokens = useTokens();
  const currentStep = useOnboardingStore((s) => s.currentStep);
  const stepLabel = ONBOARDING_STEPS[currentStep - 1]?.label;

  return (
    <View className="flex-1" style={{ backgroundColor: tokens.colors.surface.DEFAULT }}>
      <View className="pt-12 px-5 pb-4">
        <Stepper currentStep={currentStep} totalSteps={10} stepLabel={stepLabel} />
      </View>
      <View className="flex-1 px-5 pb-8">
        <Stack screenOptions={{ headerShown: false }} />
      </View>
    </View>
  );
}

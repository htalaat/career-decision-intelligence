import React from "react";
import { View } from "react-native";
import { Stack } from "expo-router";
import { Stepper } from "../../components/ui/Stepper";
import { useOnboardingStore } from "../../stores/onboardingStore";
import { ONBOARDING_STEPS } from "../../lib/utils/constants";
import { useTokens } from "../../lib/theme/PersonaProvider";

/** Onboarding layout: stepper progress bar at top, dark background */
export default function OnboardingLayout() {
  const tokens = useTokens();
  const currentStep = useOnboardingStore((s) => s.currentStep);
  const stepLabel = ONBOARDING_STEPS[currentStep - 1]?.label;

  return (
    <View style={{ flex: 1, backgroundColor: tokens.colors.surface.DEFAULT }}>
      <View style={{ paddingTop: 48, paddingHorizontal: 20, paddingBottom: 16 }}>
        <Stepper currentStep={currentStep} totalSteps={10} stepLabel={stepLabel} />
      </View>
      <View style={{ flex: 1, paddingHorizontal: 20, paddingBottom: 32 }}>
        <Stack screenOptions={{ headerShown: false }} />
      </View>
    </View>
  );
}

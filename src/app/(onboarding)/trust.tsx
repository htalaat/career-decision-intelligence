import React from "react";
import { useRouter } from "expo-router";
import { OnboardingQuestion } from "../../components/features/OnboardingQuestion";
import { TrustNotice } from "../../components/features/TrustNotice";
import { useOnboardingStore } from "../../stores/onboardingStore";

/** Step 2: Privacy and trust notice */
export default function TrustScreen() {
  const router = useRouter();
  const { nextStep, prevStep } = useOnboardingStore();

  return (
    <OnboardingQuestion
      question="Before we begin"
      hint="Please read how we handle your information."
      onNext={() => { nextStep(); router.push("/(onboarding)/stage"); }}
      onBack={() => { prevStep(); router.back(); }}
      nextLabel="I understand, let's go"
    >
      <TrustNotice />
    </OnboardingQuestion>
  );
}

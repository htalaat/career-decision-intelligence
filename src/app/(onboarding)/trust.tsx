import React from "react";
import { useRouter } from "expo-router";
import { OnboardingQuestion } from "../../components/features/OnboardingQuestion";
import { TrustNotice } from "../../components/features/TrustNotice";
import { useOnboardingStore } from "../../stores/onboardingStore";
import { useLogConsent } from "../../lib/hooks/useConsent";

/** Step 2: Privacy and trust notice — logs consent on accept */
export default function TrustScreen() {
  const router = useRouter();
  const { nextStep, prevStep } = useOnboardingStore();
  const logConsent = useLogConsent();

  const handleNext = () => {
    // Log privacy consent
    logConsent.mutate({ type: "privacy_notice", version: "1.0", granted: true });
    nextStep();
    router.push("/(onboarding)/stage");
  };

  return (
    <OnboardingQuestion
      question="Before we begin"
      hint="Please read how we handle your information."
      onNext={handleNext}
      onBack={() => { prevStep(); router.back(); }}
      nextLabel="I understand, let's go"
    >
      <TrustNotice />
    </OnboardingQuestion>
  );
}

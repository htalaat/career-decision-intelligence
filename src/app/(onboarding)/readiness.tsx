import React, { useState } from "react";
import { useRouter } from "expo-router";
import { OnboardingQuestion } from "../../components/features/OnboardingQuestion";
import { Select } from "../../components/ui/Select";
import { useOnboardingStore } from "../../stores/onboardingStore";
import { READINESS_OPTIONS } from "../../lib/utils/constants";

/** Step 12: How ready are you to make a decision? */
export default function ReadinessScreen() {
  const router = useRouter();
  const { setAnswer, nextStep, prevStep } = useOnboardingStore();
  const [readiness, setReadiness] = useState<string | null>(null);

  const handleNext = () => {
    setAnswer("decision_readiness", readiness);
    nextStep();
    router.push("/(onboarding)/summary" as never);
  };

  return (
    <OnboardingQuestion
      question="How ready are you to decide?"
      hint="There's no wrong answer. This helps us calibrate how much guidance to give you."
      onNext={handleNext}
      onBack={() => { prevStep(); router.back(); }}
      nextDisabled={!readiness}
    >
      <Select
        label="Your decision stage"
        options={[...READINESS_OPTIONS]}
        value={readiness}
        onSelect={setReadiness}
      />
    </OnboardingQuestion>
  );
}

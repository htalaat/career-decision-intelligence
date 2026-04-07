import React, { useState } from "react";
import { ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { OnboardingQuestion } from "../../components/features/OnboardingQuestion";
import { Select } from "../../components/ui/Select";
import { useOnboardingStore } from "../../stores/onboardingStore";
import { STUDY_DURATION_OPTIONS } from "../../lib/utils/constants";

const RISK_OPTIONS = [
  { value: "safe", label: "I like safe, predictable paths" },
  { value: "moderate", label: "I'm open to some risk" },
  { value: "high", label: "I'm comfortable with uncertainty" },
  { value: "figure_out_later", label: "I'll figure this out later" },
] as const;

/** Step 12: How long can you study? */
export default function DurationScreen() {
  const router = useRouter();
  const { setAnswer, nextStep, prevStep } = useOnboardingStore();
  const [duration, setDuration] = useState<string | null>(null);
  const [risk, setRisk] = useState<string | null>(null);

  const handleNext = () => {
    const maxYears = duration === "flexible" ? null : duration ? Number(duration) : null;
    setAnswer("max_study_years", maxYears);
    setAnswer("risk_tolerance", risk);
    nextStep();
    router.push("/(onboarding)/summary" as never);
  };

  return (
    <OnboardingQuestion
      question="How long can you study?"
      hint="There's no perfect answer. Just pick what feels realistic right now."
      onNext={handleNext}
      onBack={() => { prevStep(); router.back(); }}
      nextDisabled={!duration}
    >
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 20 }}>
        <Select
          label="How long are you willing to study?"
          options={[...STUDY_DURATION_OPTIONS]}
          value={duration}
          onSelect={setDuration}
        />
        <Select
          label="How do you feel about risk?"
          options={[...RISK_OPTIONS]}
          value={risk}
          onSelect={setRisk}
        />
      </ScrollView>
    </OnboardingQuestion>
  );
}

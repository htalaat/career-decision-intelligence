import React, { useState } from "react";
import { useRouter } from "expo-router";
import { OnboardingQuestion } from "../../components/features/OnboardingQuestion";
import { ChipGroup } from "../../components/ui/ChipGroup";
import { useOnboardingStore } from "../../stores/onboardingStore";
import { INTEREST_TRAITS } from "../../lib/utils/constants";

/** Step 4: Interest selection */
export default function InterestsScreen() {
  const router = useRouter();
  const { setAnswer, nextStep, prevStep } = useOnboardingStore();
  const [selected, setSelected] = useState<string[]>([]);

  const handleToggle = (key: string) => {
    setSelected((prev) => prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]);
  };

  return (
    <OnboardingQuestion
      question="What do you enjoy doing?"
      hint="Pick the activities that genuinely interest you."
      onNext={() => { setAnswer("interests", selected); nextStep(); router.push("/(onboarding)/strengths"); }}
      onBack={() => { prevStep(); router.back(); }}
      nextDisabled={selected.length < 3}
    >
      <ChipGroup options={[...INTEREST_TRAITS]} selected={selected} onToggle={handleToggle} min={3} max={8} error={selected.length > 0 && selected.length < 3 ? "Select at least 3" : undefined} />
    </OnboardingQuestion>
  );
}

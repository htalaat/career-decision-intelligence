import React, { useState } from "react";
import { useRouter } from "expo-router";
import { OnboardingQuestion } from "../../components/features/OnboardingQuestion";
import { ChipGroup } from "../../components/ui/ChipGroup";
import { useOnboardingStore } from "../../stores/onboardingStore";
import { WORKSTYLE_OPTIONS } from "../../lib/utils/constants";

/** Step 7: Work-style preferences */
export default function WorkstyleScreen() {
  const router = useRouter();
  const { setAnswer, nextStep, prevStep } = useOnboardingStore();
  const [selected, setSelected] = useState<string[]>([]);

  const handleToggle = (key: string) => {
    setSelected((prev) => prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]);
  };

  return (
    <OnboardingQuestion
      question="How do you prefer to work?"
      hint="Think about your ideal work environment and style."
      onNext={() => { setAnswer("workstyle", selected); nextStep(); router.push("/(onboarding)/constraints"); }}
      onBack={() => { prevStep(); router.back(); }}
      nextDisabled={selected.length < 2}
    >
      <ChipGroup options={[...WORKSTYLE_OPTIONS]} selected={selected} onToggle={handleToggle} min={2} max={5} />
    </OnboardingQuestion>
  );
}

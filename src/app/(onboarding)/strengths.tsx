import React, { useState } from "react";
import { useRouter } from "expo-router";
import { OnboardingQuestion } from "../../components/features/OnboardingQuestion";
import { ChipGroup } from "../../components/ui/ChipGroup";
import { useOnboardingStore } from "../../stores/onboardingStore";
import { STRENGTH_TRAITS } from "../../lib/utils/constants";

/** Step 5: What are you good at? */
export default function StrengthsScreen() {
  const router = useRouter();
  const { setAnswer, nextStep, prevStep } = useOnboardingStore();
  const [selected, setSelected] = useState<string[]>([]);

  const handleToggle = (key: string) => {
    setSelected((prev) => prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]);
  };

  return (
    <OnboardingQuestion
      question="What are you good at?"
      hint="What do other people say you're good at? You don't have to agree with all of them."
      onNext={() => { setAnswer("strengths", selected); nextStep(); router.push("/(onboarding)/values" as never); }}
      onBack={() => { prevStep(); router.back(); }}
      nextDisabled={selected.length < 3}
    >
      <ChipGroup options={[...STRENGTH_TRAITS]} selected={selected} onToggle={handleToggle} min={3} max={8} />
    </OnboardingQuestion>
  );
}

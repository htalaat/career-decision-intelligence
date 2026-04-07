import React, { useState } from "react";
import { useRouter } from "expo-router";
import { OnboardingQuestion } from "../../components/features/OnboardingQuestion";
import { ChipGroup } from "../../components/ui/ChipGroup";
import { useOnboardingStore } from "../../stores/onboardingStore";
import { VALUE_OPTIONS } from "../../lib/utils/constants";

/** Step 6: If your future job could only guarantee 3 things */
export default function ValuesScreen() {
  const router = useRouter();
  const { setAnswer, nextStep, prevStep } = useOnboardingStore();
  const [selected, setSelected] = useState<string[]>([]);

  const handleToggle = (key: string) => {
    setSelected((prev) => prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]);
  };

  return (
    <OnboardingQuestion
      question="If your future job could only guarantee 3 things, what would they be?"
      hint="These might change \u2014 that's okay. Pick what matters today."
      onNext={() => { setAnswer("values", selected); nextStep(); router.push("/(onboarding)/workstyle" as never); }}
      onBack={() => { prevStep(); router.back(); }}
      nextDisabled={selected.length < 3}
    >
      <ChipGroup options={[...VALUE_OPTIONS]} selected={selected} onToggle={handleToggle} min={3} max={6} />
    </OnboardingQuestion>
  );
}

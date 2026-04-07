import React, { useState } from "react";
import { ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { OnboardingQuestion } from "../../components/features/OnboardingQuestion";
import { Select } from "../../components/ui/Select";
import { useOnboardingStore } from "../../stores/onboardingStore";

const BUDGET_OPTIONS = [
  { value: "tight", label: "Pretty tight \u2014 cost matters a lot" },
  { value: "moderate", label: "Somewhere in the middle" },
  { value: "comfortable", label: "Pretty comfortable \u2014 cost isn't a big worry" },
  { value: "not_thought", label: "I haven't thought about this yet" },
] as const;

const FAMILY_OPTIONS = [
  { value: "none", label: "They let me decide" },
  { value: "some_input", label: "They have opinions but it's my call" },
  { value: "significant", label: "They have strong expectations" },
  { value: "deciding", label: "They're mostly making this decision" },
  { value: "not_sure", label: "I'm not sure yet" },
] as const;

/** Step 11: Let's be real about money and family */
export default function MoneyScreen() {
  const router = useRouter();
  const { setAnswer, nextStep, prevStep } = useOnboardingStore();
  const [budget, setBudget] = useState<string | null>(null);
  const [family, setFamily] = useState<string | null>(null);

  const handleNext = () => {
    setAnswer("financial_level", budget);
    setAnswer("family_expectation", family);
    nextStep();
    router.push("/(onboarding)/duration" as never);
  };

  return (
    <OnboardingQuestion
      question="Let's be real about money and family"
      hint="This is just between us. It helps us suggest paths that actually fit your life."
      onNext={handleNext}
      onBack={() => { prevStep(); router.back(); }}
      nextDisabled={!budget}
    >
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 20 }}>
        <Select
          label="How's the budget situation?"
          options={[...BUDGET_OPTIONS]}
          value={budget}
          onSelect={setBudget}
        />
        <Select
          label="How much say does your family have?"
          options={[...FAMILY_OPTIONS]}
          value={family}
          onSelect={setFamily}
        />
      </ScrollView>
    </OnboardingQuestion>
  );
}

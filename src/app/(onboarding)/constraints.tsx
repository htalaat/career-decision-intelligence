import React, { useState } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { OnboardingQuestion } from "../../components/features/OnboardingQuestion";
import { Select } from "../../components/ui/Select";
import { useOnboardingStore } from "../../stores/onboardingStore";

const FINANCIAL_OPTIONS = [
  { value: "low", label: "Tight budget — cost matters a lot" },
  { value: "medium", label: "Moderate — some flexibility" },
  { value: "high", label: "Comfortable — cost is less of a concern" },
  { value: "flexible", label: "Fully flexible" },
];

const FAMILY_OPTIONS = [
  { value: "none", label: "No family pressure" },
  { value: "low", label: "Some input but my choice" },
  { value: "medium", label: "Significant family expectations" },
  { value: "high", label: "Family has strong opinions on my path" },
];

const RISK_OPTIONS = [
  { value: "low", label: "I prefer safe, predictable paths" },
  { value: "medium", label: "I'm open to moderate risk" },
  { value: "high", label: "I'm comfortable with high uncertainty" },
];

/** Step 8: Practical constraints */
export default function ConstraintsScreen() {
  const router = useRouter();
  const { setAnswer, nextStep, prevStep } = useOnboardingStore();
  const [financial, setFinancial] = useState<string | null>(null);
  const [family, setFamily] = useState<string | null>(null);
  const [risk, setRisk] = useState<string | null>(null);

  return (
    <OnboardingQuestion
      question="What are your practical constraints?"
      hint="These help us avoid recommending paths that don't fit your reality."
      onNext={() => {
        setAnswer("constraints", { financial_level: financial, family_expectation: family, risk_tolerance: risk });
        nextStep();
        router.push("/(onboarding)/goals");
      }}
      onBack={() => { prevStep(); router.back(); }}
      nextDisabled={!financial || !family || !risk}
    >
      <View className="gap-6">
        <Select label="Financial situation" options={FINANCIAL_OPTIONS} value={financial} onSelect={setFinancial} />
        <Select label="Family expectations" options={FAMILY_OPTIONS} value={family} onSelect={setFamily} />
        <Select label="Risk tolerance" options={RISK_OPTIONS} value={risk} onSelect={setRisk} />
      </View>
    </OnboardingQuestion>
  );
}

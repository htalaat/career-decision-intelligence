import React, { useState } from "react";
import { ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { OnboardingQuestion } from "../../components/features/OnboardingQuestion";
import { Slider } from "../../components/ui/Slider";
import { useOnboardingStore } from "../../stores/onboardingStore";

/** Step 9: Priority weighting */
export default function GoalsScreen() {
  const router = useRouter();
  const { setAnswer, nextStep, prevStep } = useOnboardingStore();
  const [weights, setWeights] = useState({
    income: 50, stability: 50, flexibility: 50, prestige: 50,
    creativity: 50, impact: 50, study_duration: 50, risk: 50,
  });

  const update = (key: string, value: number) => {
    setWeights((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <OnboardingQuestion
      question="What matters most in your decision?"
      hint="Adjust the sliders to show your priorities. Higher = matters more."
      onNext={() => { setAnswer("weights", weights); nextStep(); router.push("/(onboarding)/readiness" as never); }}
      onBack={() => { prevStep(); router.back(); }}
    >
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 20 }}>
        <Slider label="Income potential" value={weights.income} onValueChange={(v) => update("income", v)} />
        <Slider label="Job stability" value={weights.stability} onValueChange={(v) => update("stability", v)} />
        <Slider label="Flexibility" value={weights.flexibility} onValueChange={(v) => update("flexibility", v)} />
        <Slider label="Prestige" value={weights.prestige} onValueChange={(v) => update("prestige", v)} />
        <Slider label="Creativity" value={weights.creativity} onValueChange={(v) => update("creativity", v)} />
        <Slider label="Social impact" value={weights.impact} onValueChange={(v) => update("impact", v)} />
        <Slider label="Study duration tolerance" value={weights.study_duration} onValueChange={(v) => update("study_duration", v)} />
        <Slider label="Risk comfort" value={weights.risk} onValueChange={(v) => update("risk", v)} />
      </ScrollView>
    </OnboardingQuestion>
  );
}

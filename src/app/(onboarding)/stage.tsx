import React, { useState } from "react";
import { useRouter } from "expo-router";
import { OnboardingQuestion } from "../../components/features/OnboardingQuestion";
import { Select } from "../../components/ui/Select";
import { useOnboardingStore } from "../../stores/onboardingStore";
import { STAGE_OPTIONS } from "../../lib/utils/constants";

/** Step 3: Current life stage */
export default function StageScreen() {
  const router = useRouter();
  const { setAnswer, nextStep, prevStep } = useOnboardingStore();
  const [stage, setStage] = useState<string | null>(null);

  return (
    <OnboardingQuestion
      question="Where are you right now?"
      hint="This helps us tailor the paths we suggest."
      onNext={() => { if (stage) { setAnswer("current_stage", stage); nextStep(); router.push("/(onboarding)/interests"); } }}
      onBack={() => { prevStep(); router.back(); }}
      nextDisabled={!stage}
    >
      <Select label="Your current stage" options={[...STAGE_OPTIONS]} value={stage} onSelect={setStage} />
    </OnboardingQuestion>
  );
}

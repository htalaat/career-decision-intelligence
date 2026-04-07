import React, { useState } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { OnboardingQuestion } from "../../components/features/OnboardingQuestion";
import { Input } from "../../components/ui/Input";
import { useOnboardingStore } from "../../stores/onboardingStore";

/** Step 2: Capture first name and optional preferred name */
export default function WelcomeScreen() {
  const router = useRouter();
  const { setAnswer, nextStep, prevStep } = useOnboardingStore();
  const [firstName, setFirstName] = useState("");
  const [preferredName, setPreferredName] = useState("");

  const handleNext = () => {
    setAnswer("first_name", firstName.trim());
    if (preferredName.trim()) {
      setAnswer("preferred_name", preferredName.trim());
    }
    nextStep();
    router.push("/(onboarding)/school-system" as never);
  };

  return (
    <OnboardingQuestion
      question="What should we call you?"
      hint="This helps us personalize your experience."
      onNext={handleNext}
      onBack={() => { prevStep(); router.back(); }}
      nextDisabled={!firstName.trim()}
    >
      <View style={{ gap: 16 }}>
        <Input label="First name" placeholder="Your first name" value={firstName} onChangeText={setFirstName} autoFocus />
        <Input label="Preferred nickname (optional)" placeholder="What friends call you" value={preferredName} onChangeText={setPreferredName} helper="Leave blank to use your first name" />
      </View>
    </OnboardingQuestion>
  );
}

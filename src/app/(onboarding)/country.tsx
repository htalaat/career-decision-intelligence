import React, { useState } from "react";
import { ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { OnboardingQuestion } from "../../components/features/OnboardingQuestion";
import { Select } from "../../components/ui/Select";
import { useOnboardingStore } from "../../stores/onboardingStore";
import { COUNTRIES, RELOCATION_OPTIONS } from "../../lib/utils/constants";

const RELOCATION_WITH_UNSURE = [
  ...RELOCATION_OPTIONS,
  { value: "not_sure", label: "I don't know yet" },
] as const;

/** Step 10: Where in the world? */
export default function CountryScreen() {
  const router = useRouter();
  const { setAnswer, nextStep, prevStep } = useOnboardingStore();
  const [country, setCountry] = useState<string | null>(null);
  const [relocation, setRelocation] = useState<string | null>(null);

  const countryOptions = COUNTRIES.map((c) => ({ value: c.code, label: c.name }));

  const handleNext = () => {
    setAnswer("country", country);
    setAnswer("relocation_willingness", relocation);
    nextStep();
    router.push("/(onboarding)/money" as never);
  };

  return (
    <OnboardingQuestion
      question="Where in the world?"
      hint="This helps us find options that actually work for where you are."
      onNext={handleNext}
      onBack={() => { prevStep(); router.back(); }}
      nextDisabled={!country}
    >
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 20 }}>
        <Select
          label="What country are you in?"
          options={countryOptions}
          value={country}
          onSelect={setCountry}
        />
        <Select
          label="Would you be open to studying somewhere else?"
          options={[...RELOCATION_WITH_UNSURE]}
          value={relocation}
          onSelect={setRelocation}
        />
      </ScrollView>
    </OnboardingQuestion>
  );
}

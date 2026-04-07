import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { OnboardingQuestion } from "../../components/features/OnboardingQuestion";
import { SearchableSelect } from "../../components/ui/SearchableSelect";
import { Select } from "../../components/ui/Select";
import { useOnboardingStore } from "../../stores/onboardingStore";
import { COUNTRIES, RELOCATION_OPTIONS } from "../../lib/utils/constants";

/** Step: Where in the world are you? */
export default function CountryScreen() {
  const router = useRouter();
  const { setAnswer, nextStep, prevStep } = useOnboardingStore();
  const [country, setCountry] = useState<string | null>(null);
  const [relocation, setRelocation] = useState<string | null>(null);

  const countryOptions = COUNTRIES.map((c) => ({ value: c.code, label: c.name }));
  const pinnedCountries = [
    { value: "not_sure", label: "🤷 I don't know yet — that's okay" },
  ];

  const handleNext = () => {
    setAnswer("country", country);
    setAnswer("relocation_willingness", relocation);
    nextStep();
    router.push("/(onboarding)/money" as never);
  };

  return (
    <OnboardingQuestion
      question="Where in the world are you?"
      hint="This helps us suggest study paths and career options that make sense for your location."
      onNext={handleNext}
      onBack={() => { prevStep(); router.back(); }}
      nextDisabled={!country}
    >
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 20 }}>
        <SearchableSelect
          label="Your country"
          options={countryOptions}
          value={country}
          onSelect={setCountry}
          placeholder="Type your country name..."
          pinnedOptions={pinnedCountries}
        />

        {country && country !== "not_sure" && (
          <Select
            label="Would you be open to studying somewhere else?"
            options={[...RELOCATION_OPTIONS]}
            value={relocation}
            onSelect={setRelocation}
          />
        )}
      </ScrollView>
    </OnboardingQuestion>
  );
}

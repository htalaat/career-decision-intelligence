import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { OnboardingQuestion } from "../../components/features/OnboardingQuestion";
import { Select } from "../../components/ui/Select";
import { Input } from "../../components/ui/Input";
import { useOnboardingStore } from "../../stores/onboardingStore";
import { COUNTRIES, RELOCATION_OPTIONS, STUDY_COUNTRY_PREFERENCE } from "../../lib/utils/constants";

/** Step 5: Country, city, relocation, study country preference */
export default function LocationScreen() {
  const router = useRouter();
  const { setAnswer, nextStep, prevStep } = useOnboardingStore();
  const [country, setCountry] = useState<string | null>(null);
  const [cityRegion, setCityRegion] = useState("");
  const [relocation, setRelocation] = useState<string | null>(null);
  const [studyCountryPref, setStudyCountryPref] = useState<string | null>(null);

  const countryOptions = COUNTRIES.map((c) => ({ value: c.code, label: c.name }));

  const handleNext = () => {
    setAnswer("country", country);
    setAnswer("city_region", cityRegion.trim() || null);
    setAnswer("relocation_willingness", relocation);
    setAnswer("study_country_preference", studyCountryPref);
    nextStep();
    router.push("/(onboarding)/interests" as never);
  };

  return (
    <OnboardingQuestion
      question="Where are you based?"
      hint="Your location affects study options, career availability, and practical feasibility."
      onNext={handleNext}
      onBack={() => { prevStep(); router.back(); }}
      nextDisabled={!country || !relocation}
    >
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 20 }}>
        <Select
          label="Country"
          options={countryOptions}
          value={country}
          onSelect={setCountry}
        />
        <Input
          label="City or region (optional)"
          placeholder="e.g. Cairo, Dubai, London"
          value={cityRegion}
          onChangeText={setCityRegion}
        />
        <Select
          label="Would you relocate for study or work?"
          options={[...RELOCATION_OPTIONS]}
          value={relocation}
          onSelect={setRelocation}
        />
        <Select
          label="Where would you prefer to study?"
          options={[...STUDY_COUNTRY_PREFERENCE]}
          value={studyCountryPref}
          onSelect={setStudyCountryPref}
        />
      </ScrollView>
    </OnboardingQuestion>
  );
}

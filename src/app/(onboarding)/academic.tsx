import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { OnboardingQuestion } from "../../components/features/OnboardingQuestion";
import { Input } from "../../components/ui/Input";
import { Select } from "../../components/ui/Select";
import { useOnboardingStore } from "../../stores/onboardingStore";
import { FACULTY_CLUSTERS, INTENDED_FIELDS } from "../../lib/utils/constants";

/** Step 4: Academic context — school, faculty, intended field */
export default function AcademicScreen() {
  const router = useRouter();
  const { setAnswer, nextStep, prevStep, answers } = useOnboardingStore();
  const stage = answers.current_stage as string;
  const [school, setSchool] = useState("");
  const [faculty, setFaculty] = useState<string | null>(null);
  const [intendedField, setIntendedField] = useState<string | null>(null);

  const showSchool = stage !== "high_school";

  const handleNext = () => {
    setAnswer("current_school", school.trim() || null);
    setAnswer("current_faculty", faculty);
    setAnswer("intended_field", intendedField);
    nextStep();
    router.push("/(onboarding)/location" as never);
  };

  return (
    <OnboardingQuestion
      question="Tell us about your academic situation"
      hint="This helps us suggest relevant study directions and career paths."
      onNext={handleNext}
      onBack={() => { prevStep(); router.back(); }}
      nextDisabled={!intendedField}
    >
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 20 }}>
        {showSchool && (
          <Input
            label="School or university name (optional)"
            placeholder="e.g. Cairo University"
            value={school}
            onChangeText={setSchool}
            helper="Leave blank if not enrolled yet"
          />
        )}
        <Select
          label="Current or most recent faculty / area of study"
          options={FACULTY_CLUSTERS.map((c) => ({ value: c.key, label: c.label }))}
          value={faculty}
          onSelect={setFaculty}
        />
        <Select
          label="What field do you want to study or work in?"
          options={INTENDED_FIELDS.map((c) => ({ value: c.key, label: c.label }))}
          value={intendedField}
          onSelect={setIntendedField}
        />
      </ScrollView>
    </OnboardingQuestion>
  );
}

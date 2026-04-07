import React, { useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { OnboardingQuestion } from "../../components/features/OnboardingQuestion";
import { useOnboardingStore } from "../../stores/onboardingStore";
import { useTokens } from "../../lib/theme/PersonaProvider";
import { CURRICULUM_LEVELS, COUNTRIES } from "../../lib/utils/constants";

/** Step 4: What level are you at? (depends on school system) */
export default function CurriculumScreen() {
  const router = useRouter();
  const tokens = useTokens();
  const { answers, setAnswer, nextStep, prevStep } = useOnboardingStore();
  const schoolSystem = answers.school_system as string;
  const [level, setLevel] = useState<string | null>(null);
  const [nationalCountry, setNationalCountry] = useState<string | null>(null);

  const isNational = schoolSystem === "national";
  const levels = isNational ? [] : (CURRICULUM_LEVELS as Record<string, ReadonlyArray<{ value: string; label: string; helper: string }>>)[schoolSystem] ?? [];

  const questionText = isNational
    ? "Which country's school system are you in?"
    : "What level are you at right now?";

  const handleNext = () => {
    if (isNational) {
      setAnswer("curriculum_country", nationalCountry);
      setAnswer("curriculum_level", "national");
    } else {
      setAnswer("curriculum_level", level);
    }
    nextStep();
    router.push("/(onboarding)/subjects" as never);
  };

  const canContinue = isNational ? !!nationalCountry : !!level;

  return (
    <OnboardingQuestion
      question={questionText}
      hint={isNational ? "We'll tailor things to your country's system." : "This helps us suggest the right subjects and paths."}
      onNext={handleNext}
      onBack={() => { prevStep(); router.back(); }}
      nextDisabled={!canContinue}
    >
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
        {isNational ? (
          // Country selector for national curriculum
          COUNTRIES.slice(0, 15).map((country) => {
            const isSelected = nationalCountry === country.code;
            return (
              <Pressable
                key={country.code}
                onPress={() => setNationalCountry(country.code)}
                accessibilityLabel={country.name}
                accessibilityRole="radio"
                style={{
                  backgroundColor: isSelected ? tokens.colors.accent.muted : tokens.colors.surface.secondary,
                  borderRadius: tokens.borderRadius.md,
                  borderWidth: 2,
                  borderColor: isSelected ? tokens.colors.accent.DEFAULT : tokens.colors.border.DEFAULT,
                  padding: 14,
                  minHeight: tokens.touchTarget.min,
                }}
              >
                <Text style={{
                  fontSize: tokens.typography.bodySize,
                  fontWeight: isSelected ? "700" : "500",
                  color: isSelected ? tokens.colors.accent.DEFAULT : tokens.colors.text.primary,
                }}>
                  {country.name}
                </Text>
              </Pressable>
            );
          })
        ) : (
          // Level options for the selected system
          levels.map((opt) => {
            const isSelected = level === opt.value;
            return (
              <Pressable
                key={opt.value}
                onPress={() => setLevel(opt.value)}
                accessibilityLabel={opt.label}
                accessibilityRole="radio"
                style={{
                  backgroundColor: isSelected ? tokens.colors.accent.muted : tokens.colors.surface.secondary,
                  borderRadius: tokens.borderRadius.lg,
                  borderWidth: 2,
                  borderColor: isSelected ? tokens.colors.accent.DEFAULT : tokens.colors.border.DEFAULT,
                  padding: 16,
                  minHeight: tokens.touchTarget.min,
                }}
              >
                <Text style={{
                  fontSize: tokens.typography.bodySize,
                  fontWeight: isSelected ? "700" : "500",
                  color: isSelected ? tokens.colors.accent.DEFAULT : tokens.colors.text.primary,
                }}>
                  {opt.label}
                </Text>
                <Text style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.text.secondary, marginTop: 2 }}>
                  {opt.helper}
                </Text>
              </Pressable>
            );
          })
        )}
      </ScrollView>
    </OnboardingQuestion>
  );
}

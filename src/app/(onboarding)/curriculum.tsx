import React, { useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { OnboardingQuestion } from "../../components/features/OnboardingQuestion";
import { useOnboardingStore } from "../../stores/onboardingStore";
import { useTokens } from "../../lib/theme/PersonaProvider";
import { CURRICULUM_LEVELS } from "../../lib/utils/constants";

/** Step 4: What level are you at? (depends on school system) */
export default function CurriculumScreen() {
  const router = useRouter();
  const tokens = useTokens();
  const { answers, setAnswer, nextStep, prevStep } = useOnboardingStore();
  const schoolSystem = answers.school_system as string;
  const [level, setLevel] = useState<string | null>(null);

  const isNational = schoolSystem === "national";
  const levels = isNational
    ? []
    : (CURRICULUM_LEVELS as Record<string, ReadonlyArray<{ value: string; label: string; helper: string }>>)[schoolSystem] ?? [];

  // For national curriculum, skip this screen — just save and go to subjects
  if (isNational) {
    const handleNationalNext = () => {
      setAnswer("curriculum_level", "national");
      nextStep();
      router.push("/(onboarding)/subjects" as never);
    };

    return (
      <OnboardingQuestion
        question="Got it — you're in a national curriculum"
        hint="We'll ask about your country later. For now, let's look at your subjects."
        onNext={handleNationalNext}
        onBack={() => { prevStep(); router.back(); }}
        nextLabel="Continue to subjects →"
      >
        <View style={{
          backgroundColor: tokens.colors.surface.secondary,
          borderRadius: tokens.borderRadius.lg,
          padding: 20,
          gap: 8,
          borderWidth: 1,
          borderColor: tokens.colors.border.DEFAULT,
        }}>
          <Text style={{ fontSize: 32, textAlign: "center" }}>📚</Text>
          <Text style={{
            fontSize: tokens.typography.bodySize,
            color: tokens.colors.text.secondary,
            textAlign: "center",
            lineHeight: tokens.typography.bodySize * 1.5,
          }}>
            Your country's curriculum may have different subject names.
            Just pick the closest matches on the next screen.
          </Text>
        </View>
      </OnboardingQuestion>
    );
  }

  const handleNext = () => {
    setAnswer("curriculum_level", level);
    nextStep();
    router.push("/(onboarding)/subjects" as never);
  };

  return (
    <OnboardingQuestion
      question="What level are you at right now?"
      hint="This helps us suggest the right subjects and paths."
      onNext={handleNext}
      onBack={() => { prevStep(); router.back(); }}
      nextDisabled={!level}
    >
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
        {levels.map((opt) => {
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
        })}
      </ScrollView>
    </OnboardingQuestion>
  );
}

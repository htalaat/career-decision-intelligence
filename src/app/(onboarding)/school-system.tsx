import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { OnboardingQuestion } from "../../components/features/OnboardingQuestion";
import { useOnboardingStore } from "../../stores/onboardingStore";
import { useTokens } from "../../lib/theme/PersonaProvider";
import { SCHOOL_SYSTEMS } from "../../lib/utils/constants";

/** Step 3: What kind of school are you in? */
export default function SchoolSystemScreen() {
  const router = useRouter();
  const tokens = useTokens();
  const { setAnswer, nextStep, prevStep } = useOnboardingStore();
  const [selected, setSelected] = useState<string | null>(null);

  const handleNext = () => {
    if (!selected) return;
    setAnswer("school_system", selected);
    setAnswer("current_stage", "high_school");
    nextStep();
    // Skip curriculum for "other" and "not_sure"
    if (selected === "other" || selected === "not_sure") {
      router.push("/(onboarding)/subjects" as never);
    } else if (selected === "national") {
      // For national curriculum, ask country first (but we'll handle in curriculum screen)
      router.push("/(onboarding)/curriculum" as never);
    } else {
      router.push("/(onboarding)/curriculum" as never);
    }
  };

  return (
    <OnboardingQuestion
      question="What kind of school are you in?"
      hint="This helps us understand your academic background."
      onNext={handleNext}
      onBack={() => { prevStep(); router.back(); }}
      nextDisabled={!selected}
    >
      <View style={{ gap: 10 }}>
        {SCHOOL_SYSTEMS.map((system) => {
          const isSelected = selected === system.value;
          return (
            <Pressable
              key={system.value}
              onPress={() => setSelected(system.value)}
              accessibilityLabel={system.label}
              accessibilityRole="radio"
              accessibilityState={{ selected: isSelected }}
            >
              <View style={{
                backgroundColor: isSelected ? tokens.colors.accent.muted : tokens.colors.surface.secondary,
                borderRadius: tokens.borderRadius.lg,
                borderWidth: 2,
                borderColor: isSelected ? tokens.colors.accent.DEFAULT : tokens.colors.border.DEFAULT,
                paddingLeft: 14,
                paddingRight: 16,
                paddingTop: 14,
                paddingBottom: 14,
                display: "flex" as never,
                flexDirection: "row" as never,
                alignItems: "center" as never,
                minHeight: tokens.touchTarget.min,
              }}>
              <Text style={{ fontSize: 24, marginRight: 12 }}>{system.emoji}</Text>
              <View style={{ flex: 1 }}>
                <Text style={{
                  fontSize: tokens.typography.bodySize,
                  fontWeight: isSelected ? "700" : "500",
                  color: isSelected ? tokens.colors.accent.DEFAULT : tokens.colors.text.primary,
                }}>
                  {system.label}
                </Text>
                {system.helper ? (
                  <Text style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.text.secondary, marginTop: 2 }}>
                    {system.helper}
                  </Text>
                ) : null}
              </View>
              </View>
            </Pressable>
          );
        })}
      </View>
    </OnboardingQuestion>
  );
}

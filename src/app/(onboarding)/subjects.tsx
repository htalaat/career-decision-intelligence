import React, { useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { OnboardingQuestion } from "../../components/features/OnboardingQuestion";
import { useOnboardingStore } from "../../stores/onboardingStore";
import { useTokens } from "../../lib/theme/PersonaProvider";
import { SUBJECT_CATEGORIES } from "../../lib/utils/constants";

/** Step 5: Which subjects are you taking? */
export default function SubjectsScreen() {
  const router = useRouter();
  const tokens = useTokens();
  const { setAnswer, nextStep, prevStep } = useOnboardingStore();
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSubject = (key: string) => {
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  const handleNext = () => {
    setAnswer("current_subjects", selected);
    nextStep();
    router.push("/(onboarding)/subject-feelings" as never);
  };

  return (
    <OnboardingQuestion
      question="Which subjects are you taking?"
      hint="Pick all the subjects you're currently studying. Don't worry if you're not sure about all of them."
      onNext={handleNext}
      onBack={() => { prevStep(); router.back(); }}
      nextDisabled={selected.length < 2}
    >
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 28 }}>
        {SUBJECT_CATEGORIES.map((category) => (
          <View key={category.category} style={{ gap: 12 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <Text style={{ fontSize: 18 }}>{category.emoji}</Text>
              <Text style={{
                fontSize: tokens.typography.bodySize,
                fontWeight: "600",
                color: tokens.colors.text.primary,
              }}>
                {category.category}
              </Text>
            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
              {category.subjects.map((subject) => {
                const isSelected = selected.includes(subject.key);
                return (
                  <Pressable
                    key={subject.key}
                    onPress={() => toggleSubject(subject.key)}
                    accessibilityLabel={`${subject.label}, ${isSelected ? "selected" : "not selected"}`}
                    accessibilityRole="checkbox"
                    style={({ pressed }) => ({
                      paddingHorizontal: 18,
                      paddingVertical: 12,
                      borderRadius: 22,
                      backgroundColor: isSelected ? tokens.colors.accent.muted : tokens.colors.surface.secondary,
                      borderWidth: 2,
                      borderColor: isSelected ? tokens.colors.accent.DEFAULT : tokens.colors.border.DEFAULT,
                      opacity: pressed ? 0.85 : 1,
                      transform: [{ scale: pressed ? 0.97 : 1 }],
                      minHeight: 44,
                    })}
                  >
                    <Text style={{
                      fontSize: tokens.typography.captionSize,
                      fontWeight: isSelected ? "700" : "400",
                      color: isSelected ? tokens.colors.accent.DEFAULT : tokens.colors.text.primary,
                    }}>
                      {subject.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        ))}

        <Text style={{
          fontSize: tokens.typography.captionSize,
          color: tokens.colors.text.muted,
          textAlign: "center",
          paddingTop: 8,
        }}>
          {selected.length} subject{selected.length !== 1 ? "s" : ""} selected
        </Text>
      </ScrollView>
    </OnboardingQuestion>
  );
}

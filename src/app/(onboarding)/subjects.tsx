import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
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
      <View style={{ gap: 28 }}>
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
            <View style={{ gap: 6 }}>
              {category.subjects.map((subject) => {
                const isSelected = selected.includes(subject.key);
                return (
                  <Pressable
                    key={subject.key}
                    onPress={() => toggleSubject(subject.key)}
                    accessibilityLabel={`${subject.label}, ${isSelected ? "selected" : "not selected"}`}
                    accessibilityRole="checkbox"
                  >
                    <View style={{
                      paddingLeft: 14,
                      paddingRight: 16,
                      paddingTop: 14,
                      paddingBottom: 14,
                      borderRadius: 14,
                      backgroundColor: isSelected ? tokens.colors.accent.muted : tokens.colors.surface.secondary,
                      borderWidth: 2,
                      borderColor: isSelected ? tokens.colors.accent.DEFAULT : tokens.colors.border.DEFAULT,
                      minHeight: 48,
                      display: "flex" as never,
                      flexDirection: "row" as never,
                      alignItems: "center" as never,
                    }}>
                      <View style={{
                        width: 22,
                        height: 22,
                        borderRadius: 11,
                        borderWidth: 2,
                        borderColor: isSelected ? tokens.colors.accent.DEFAULT : tokens.colors.border.DEFAULT,
                        backgroundColor: isSelected ? tokens.colors.accent.DEFAULT : "transparent",
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: 12,
                        flexShrink: 0,
                      }}>
                        {isSelected && (
                          <Text style={{ color: "#FFFFFF", fontSize: 12, fontWeight: "700" }}>✓</Text>
                        )}
                      </View>
                      <Text style={{
                        fontSize: tokens.typography.bodySize,
                        fontWeight: isSelected ? "600" : "400",
                        color: isSelected ? tokens.colors.accent.DEFAULT : tokens.colors.text.primary,
                        flexShrink: 1,
                      }}>
                        {subject.label}
                      </Text>
                    </View>
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
      </View>
    </OnboardingQuestion>
  );
}

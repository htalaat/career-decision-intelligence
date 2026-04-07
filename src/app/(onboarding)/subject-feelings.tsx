import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { OnboardingQuestion } from "../../components/features/OnboardingQuestion";
import { ClusterPreview } from "../../components/features/ClusterPreview";
import { useOnboardingStore } from "../../stores/onboardingStore";
import { useTokens } from "../../lib/theme/PersonaProvider";

type Feeling = "enjoy" | "good_at" | "dislike" | null;

/** Step 6: How do you feel about each subject? */
export default function SubjectFeelingsScreen() {
  const router = useRouter();
  const tokens = useTokens();
  const { answers, setAnswer, nextStep, prevStep } = useOnboardingStore();
  const subjects = (answers.current_subjects as string[]) ?? [];
  const [feelings, setFeelings] = useState<Record<string, Feeling>>({});

  const setFeeling = (subject: string, feeling: Feeling) => {
    setFeelings((prev) => ({
      ...prev,
      [subject]: prev[subject] === feeling ? null : feeling,
    }));
  };

  const ratedCount = Object.values(feelings).filter(Boolean).length;

  const handleNext = () => {
    const enjoyed = Object.entries(feelings).filter(([, f]) => f === "enjoy").map(([k]) => k);
    const goodAt = Object.entries(feelings).filter(([, f]) => f === "good_at").map(([k]) => k);
    const disliked = Object.entries(feelings).filter(([, f]) => f === "dislike").map(([k]) => k);
    setAnswer("subjects_enjoyed", enjoyed);
    setAnswer("subjects_good_at", goodAt);
    setAnswer("subjects_disliked", disliked);
    nextStep();
    router.push("/(onboarding)/interests" as never);
  };

  const feelingOptions: Array<{ value: Feeling; label: string; emoji: string; color: string }> = [
    { value: "enjoy", label: "I enjoy this", emoji: "💚", color: tokens.colors.success },
    { value: "good_at", label: "I'm good at this", emoji: "💪", color: tokens.colors.accent.DEFAULT },
    { value: "dislike", label: "Not for me", emoji: "👎", color: tokens.colors.error },
  ];

  const formatSubjectLabel = (key: string): string => {
    return key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <OnboardingQuestion
      question="How do you feel about each subject?"
      hint="Tap to tell us how you feel. You can pick one feeling per subject, or skip ones you're unsure about."
      onNext={handleNext}
      onBack={() => { prevStep(); router.back(); }}
      nextDisabled={ratedCount < 2}
    >
      <View style={{ gap: 16 }}>
        {subjects.map((subject) => {
          const current = feelings[subject] ?? null;
          return (
            <View
              key={subject}
              style={{
                backgroundColor: tokens.colors.surface.secondary,
                borderRadius: tokens.borderRadius.lg,
                borderWidth: 1,
                borderColor: tokens.colors.border.DEFAULT,
                padding: 14,
                gap: 10,
              }}
            >
              <Text style={{
                fontSize: tokens.typography.bodySize,
                fontWeight: "600",
                color: tokens.colors.text.primary,
              }}>
                {formatSubjectLabel(subject)}
              </Text>
              <View style={{ flexDirection: "row", gap: 8 }}>
                {feelingOptions.map((opt) => {
                  const isSelected = current === opt.value;
                  return (
                    <Pressable
                      key={opt.value}
                      onPress={() => setFeeling(subject, opt.value)}
                      accessibilityLabel={`${opt.label} for ${formatSubjectLabel(subject)}`}
                      accessibilityRole="radio"
                      style={({ pressed }) => ({
                        flex: 1,
                        paddingVertical: 8,
                        borderRadius: tokens.borderRadius.md,
                        backgroundColor: isSelected ? opt.color + "20" : tokens.colors.surface.elevated,
                        borderWidth: 2,
                        borderColor: isSelected ? opt.color : "transparent",
                        alignItems: "center",
                        opacity: pressed ? 0.85 : 1,
                      })}
                    >
                      <Text style={{ fontSize: 16 }}>{opt.emoji}</Text>
                      <Text style={{
                        fontSize: 11,
                        fontWeight: isSelected ? "600" : "400",
                        color: isSelected ? opt.color : tokens.colors.text.secondary,
                        textAlign: "center",
                      }}>
                        {opt.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          );
        })}

        {ratedCount >= 2 && (
          <ClusterPreview
            partialProfile={{
              subjectsEnjoyed: Object.entries(feelings).filter(([, f]) => f === "enjoy").map(([k]) => k),
              subjectsGoodAt: Object.entries(feelings).filter(([, f]) => f === "good_at").map(([k]) => k),
              subjectsDisliked: Object.entries(feelings).filter(([, f]) => f === "dislike").map(([k]) => k),
              currentSubjects: subjects,
            }}
          />
        )}
      </View>
    </OnboardingQuestion>
  );
}

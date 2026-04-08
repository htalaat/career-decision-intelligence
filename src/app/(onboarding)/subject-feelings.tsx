import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { OnboardingQuestion } from "../../components/features/OnboardingQuestion";
import { ClusterPreview } from "../../components/features/ClusterPreview";
import { useOnboardingStore } from "../../stores/onboardingStore";
import { useTokens } from "../../lib/theme/PersonaProvider";

type Feeling = "enjoy" | "good_at" | "dislike" | null;

/** Step 6: How do you feel about each subject? — clean row layout */
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

  const formatLabel = (key: string): string =>
    key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const buttons: Array<{ value: Feeling; emoji: string; tip: string; color: string }> = [
    { value: "enjoy", emoji: "💚", tip: "Enjoy", color: tokens.colors.success },
    { value: "good_at", emoji: "💪", tip: "Strong", color: tokens.colors.accent.DEFAULT },
    { value: "dislike", emoji: "👎", tip: "Dislike", color: tokens.colors.error },
  ];

  return (
    <OnboardingQuestion
      question="How do you feel about your subjects?"
      hint="Tap one reaction per subject. Skip any you're unsure about."
      onNext={handleNext}
      onBack={() => { prevStep(); router.back(); }}
      nextDisabled={ratedCount < 2}
    >
      <View style={{ gap: 6 }}>
        {/* Legend */}
        <View style={{
          display: "flex" as never,
          flexDirection: "row" as never,
          justifyContent: "flex-end" as never,
          marginBottom: 4,
        }}>
          {buttons.map((b) => (
            <View key={b.value} style={{
              display: "flex" as never,
              flexDirection: "row" as never,
              alignItems: "center" as never,
              marginLeft: 12,
            }}>
              <Text style={{ fontSize: 14 }}>{b.emoji}</Text>
              <Text style={{ fontSize: 11, color: tokens.colors.text.muted, marginLeft: 3 }}>{b.tip}</Text>
            </View>
          ))}
        </View>

        {/* Subject rows */}
        {subjects.map((subject) => {
          const current = feelings[subject] ?? null;
          return (
            <View
              key={subject}
              style={{
                backgroundColor: tokens.colors.surface.secondary,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: current ? (
                  current === "enjoy" ? tokens.colors.success + "40" :
                  current === "good_at" ? tokens.colors.accent.DEFAULT + "40" :
                  tokens.colors.error + "40"
                ) : tokens.colors.border.DEFAULT,
                paddingLeft: 14,
                paddingRight: 8,
                paddingTop: 10,
                paddingBottom: 10,
                display: "flex" as never,
                flexDirection: "row" as never,
                alignItems: "center" as never,
                minHeight: 52,
              }}
            >
              {/* Subject name */}
              <Text style={{
                fontSize: tokens.typography.bodySize,
                fontWeight: current ? "600" : "400",
                color: tokens.colors.text.primary,
                flex: 1,
                marginRight: 8,
              }}>
                {formatLabel(subject)}
              </Text>

              {/* 3 reaction buttons */}
              {buttons.map((btn) => {
                const isActive = current === btn.value;
                return (
                  <Pressable
                    key={btn.value}
                    onPress={() => setFeeling(subject, btn.value)}
                    accessibilityLabel={`${btn.tip} ${formatLabel(subject)}`}
                    accessibilityRole="radio"
                  >
                    <View style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      backgroundColor: isActive ? btn.color + "25" : "transparent",
                      borderWidth: isActive ? 2 : 0,
                      borderColor: isActive ? btn.color : "transparent",
                      alignItems: "center",
                      justifyContent: "center",
                      marginLeft: 4,
                    }}>
                      <Text style={{ fontSize: isActive ? 20 : 16, opacity: isActive ? 1 : 0.5 }}>
                        {btn.emoji}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          );
        })}

        {/* Early cluster preview */}
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

        <Text style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.text.muted, textAlign: "center" }}>
          {ratedCount} of {subjects.length} rated
        </Text>
      </View>
    </OnboardingQuestion>
  );
}

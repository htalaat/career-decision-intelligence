import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Button } from "../../components/ui/Button";
import { ProfileSummaryCard } from "../../components/features/ProfileSummaryCard";
import { UserGreeting } from "../../components/features/UserGreeting";
import { useOnboardingStore } from "../../stores/onboardingStore";
import { useSaveOnboarding } from "../../lib/hooks/useProfile";
import { useRunRecommendations, buildEngineProfile, buildEngineCareerPaths } from "../../lib/hooks/useRecommendations";
import { useCareerPaths } from "../../lib/hooks/useCareerPaths";
import { useAuthStore } from "../../stores/authStore";
import { showSuccessToast, showErrorToast } from "../../components/ui/Toast";
import { useTokens } from "../../lib/theme/PersonaProvider";
import { INTEREST_TRAITS, STRENGTH_TRAITS, VALUE_OPTIONS, WORKSTYLE_OPTIONS } from "../../lib/utils/constants";

function lookupLabels(keys: string[], options: ReadonlyArray<{ key: string; label: string }>) {
  return keys.map((k) => options.find((o) => o.key === k)?.label ?? k);
}

/** Step 10: Profile summary — saves profile, runs engine, generates recommendations */
export default function SummaryScreen() {
  const router = useRouter();
  const tokens = useTokens();
  const { answers, prevStep } = useOnboardingStore();
  const saveOnboarding = useSaveOnboarding();
  const runRecommendations = useRunRecommendations();
  const { data: careerData } = useCareerPaths();
  const userId = useAuthStore((s) => s.user?.id);
  const [isGenerating, setIsGenerating] = useState(false);

  const name = (answers.preferred_name as string) || (answers.first_name as string) || "there";
  const interests = (answers.interests as string[]) ?? [];
  const strengths = (answers.strengths as string[]) ?? [];
  const values = (answers.values as string[]) ?? [];
  const workstyle = (answers.workstyle as string[]) ?? [];

  const summaryItems = [
    { label: "Interests", values: lookupLabels(interests, [...INTEREST_TRAITS]) },
    { label: "Strengths", values: lookupLabels(strengths, [...STRENGTH_TRAITS]) },
    { label: "Values", values: lookupLabels(values, [...VALUE_OPTIONS]) },
    { label: "Work style", values: lookupLabels(workstyle, [...WORKSTYLE_OPTIONS]) },
  ].filter((item) => item.values.length > 0);

  const handleComplete = async () => {
    if (!userId) return;
    setIsGenerating(true);

    try {
      // Step 1: Save profile to Supabase
      await saveOnboarding.mutateAsync(answers);

      // Step 2: Build engine inputs from saved profile
      const engineProfile = await buildEngineProfile(userId);
      const enginePaths = buildEngineCareerPaths(
        careerData?.paths ?? [],
        careerData?.mappings ?? [],
      );

      // Step 3: Run the deterministic engine and save results
      await runRecommendations.mutateAsync({
        engineProfile,
        careerPaths: enginePaths,
      });

      showSuccessToast("Recommendations ready!");
      router.replace("/(tabs)");
    } catch {
      showErrorToast("Something went wrong", "Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ gap: 24 }} showsVerticalScrollIndicator={false}>
        <UserGreeting name={name} />
        <Text style={{ fontSize: tokens.typography.bodySize, color: tokens.colors.text.secondary, lineHeight: tokens.typography.bodySize * 1.5 }}>
          Here's what you told us. Review your profile and generate your career recommendations.
        </Text>
        <ProfileSummaryCard items={summaryItems} />
      </ScrollView>
      <View style={{ gap: 12, paddingTop: 16 }}>
        <Button
          label={isGenerating ? "Generating recommendations..." : "Generate my recommendations"}
          onPress={handleComplete}
          loading={isGenerating}
          disabled={isGenerating}
        />
        <Button
          label="Go back and edit"
          variant="ghost"
          onPress={() => { prevStep(); router.back(); }}
          disabled={isGenerating}
        />
      </View>
    </View>
  );
}

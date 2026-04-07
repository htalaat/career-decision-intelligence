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
import {
  INTEREST_TRAITS, STRENGTH_TRAITS, VALUE_OPTIONS, WORKSTYLE_OPTIONS,
  COUNTRIES, FACULTY_CLUSTERS, INTENDED_FIELDS, RELOCATION_OPTIONS,
  READINESS_OPTIONS, STUDY_DURATION_OPTIONS, STAGE_OPTIONS,
} from "../../lib/utils/constants";

function lookupLabels(keys: string[], options: ReadonlyArray<{ key: string; label: string }>) {
  return keys.map((k) => options.find((o) => o.key === k)?.label ?? k);
}

function lookupValue(value: string | null, options: ReadonlyArray<{ value: string; label: string }>): string {
  if (!value) return "—";
  return options.find((o) => o.value === value)?.label ?? value;
}

function lookupCountry(code: string | null): string {
  if (!code) return "—";
  return COUNTRIES.find((c) => c.code === code)?.name ?? code;
}

/** Step 13: Full profile summary — shows ALL captured data, then generates recommendations */
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
  const constraints = (answers.constraints as Record<string, string | number | null>) ?? {};

  const summaryItems = [
    // Identity & stage
    { label: "Life stage", values: [lookupValue(answers.current_stage as string, [...STAGE_OPTIONS])] },
    // Academic context
    ...(answers.current_school ? [{ label: "School/University", values: [answers.current_school as string] }] : []),
    ...(answers.current_faculty ? [{ label: "Faculty/Area", values: [FACULTY_CLUSTERS.find((f) => f.key === answers.current_faculty)?.label ?? (answers.current_faculty as string)] }] : []),
    ...(answers.intended_field ? [{ label: "Intended field", values: [INTENDED_FIELDS.find((f) => f.key === answers.intended_field)?.label ?? (answers.intended_field as string)] }] : []),
    // Location
    ...(answers.country ? [{ label: "Country", values: [lookupCountry(answers.country as string)] }] : []),
    ...(answers.city_region ? [{ label: "City/Region", values: [answers.city_region as string] }] : []),
    ...(answers.relocation_willingness ? [{ label: "Relocation", values: [lookupValue(answers.relocation_willingness as string, [...RELOCATION_OPTIONS])] }] : []),
    // Interests, strengths, values, workstyle
    { label: "Interests", values: lookupLabels(interests, [...INTEREST_TRAITS]) },
    { label: "Strengths", values: lookupLabels(strengths, [...STRENGTH_TRAITS]) },
    { label: "Values", values: lookupLabels(values, [...VALUE_OPTIONS]) },
    { label: "Work style", values: lookupLabels(workstyle, [...WORKSTYLE_OPTIONS]) },
    // Constraints
    ...(constraints.financial_level ? [{ label: "Budget", values: [constraints.financial_level as string] }] : []),
    ...(constraints.family_expectation ? [{ label: "Family expectations", values: [constraints.family_expectation as string] }] : []),
    ...(constraints.risk_tolerance ? [{ label: "Risk tolerance", values: [constraints.risk_tolerance as string] }] : []),
    ...(constraints.max_study_years != null ? [{ label: "Max study duration", values: [`${constraints.max_study_years} years`] }] : []),
    // Readiness
    ...(answers.decision_readiness ? [{ label: "Decision readiness", values: [lookupValue(answers.decision_readiness as string, [...READINESS_OPTIONS])] }] : []),
  ].filter((item) => item.values.length > 0 && item.values[0] !== "—");

  const handleComplete = async () => {
    if (!userId) return;
    setIsGenerating(true);

    try {
      await saveOnboarding.mutateAsync(answers);

      const engineProfile = await buildEngineProfile(userId);
      const enginePaths = buildEngineCareerPaths(
        careerData?.paths ?? [],
        careerData?.mappings ?? [],
        careerData?.studyDirections ?? [],
      );

      await runRecommendations.mutateAsync({
        engineProfile,
        careerPaths: enginePaths,
      });

      showSuccessToast("Recommendations ready!");
      router.replace("/(tabs)" as never);
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
          Here's everything you told us. Review your profile and generate your career recommendations.
        </Text>
        <ProfileSummaryCard items={summaryItems} />
      </ScrollView>
      <View style={{ gap: 12, paddingTop: 16 }}>
        <Button
          label={isGenerating ? "Analyzing your profile..." : "Generate my recommendations"}
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

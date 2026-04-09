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
  COUNTRIES, RELOCATION_OPTIONS, READINESS_OPTIONS, STAGE_OPTIONS,
  SCHOOL_SYSTEMS, CURRICULUM_LEVELS, SUBJECT_CATEGORIES,
  BUDGET_OPTIONS, FAMILY_OPTIONS, RISK_OPTIONS,
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

/** Resolve subject keys to labels from SUBJECT_CATEGORIES flat list */
function lookupSubjectLabels(keys: string[]): string[] {
  const flat = SUBJECT_CATEGORIES.flatMap((cat) => [...cat.subjects]);
  return keys.map((k) => flat.find((s) => s.key === k)?.label ?? k);
}

/** Resolve curriculum level value to label — checks all system arrays */
function lookupCurriculumLevel(level: string | null): string {
  if (!level) return "—";
  const allLevels = [
    ...CURRICULUM_LEVELS.british,
    ...CURRICULUM_LEVELS.ib,
    ...CURRICULUM_LEVELS.american,
  ] as ReadonlyArray<{ value: string; label: string }>;
  return allLevels.find((l) => l.value === level)?.label ?? level;
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

  const summaryItems = [
    // Identity & stage
    { label: "Life stage", values: [lookupValue(answers.current_stage as string, [...STAGE_OPTIONS])] },
    // Discovery
    { label: "Interests", values: lookupLabels(interests, [...INTEREST_TRAITS]) },
    { label: "Strengths", values: lookupLabels(strengths, [...STRENGTH_TRAITS]) },
    { label: "Values", values: lookupLabels(values, [...VALUE_OPTIONS]) },
    { label: "Work vibes", values: lookupLabels(workstyle, [...WORKSTYLE_OPTIONS]) },
    // High school — school system & curriculum
    ...(answers.school_system ? [{
      label: "School system",
      values: [SCHOOL_SYSTEMS.find((s) => s.value === (answers.school_system as string))?.label ?? (answers.school_system as string)],
    }] : []),
    ...(answers.curriculum_level ? [{ label: "Curriculum level", values: [lookupCurriculumLevel(answers.curriculum_level as string)] }] : []),
    ...(answers.curriculum_country ? [{ label: "Curriculum country", values: [lookupCountry(answers.curriculum_country as string)] }] : []),
    // Subjects
    ...((answers.current_subjects as string[] | undefined)?.length ? [{
      label: "Subjects taken",
      values: lookupSubjectLabels(answers.current_subjects as string[]),
    }] : []),
    ...((answers.subjects_enjoyed as string[] | undefined)?.length ? [{
      label: "Subjects enjoyed",
      values: lookupSubjectLabels(answers.subjects_enjoyed as string[]),
    }] : []),
    ...((answers.subjects_good_at as string[] | undefined)?.length ? [{
      label: "Subjects I'm good at",
      values: lookupSubjectLabels(answers.subjects_good_at as string[]),
    }] : []),
    ...((answers.subjects_disliked as string[] | undefined)?.length ? [{
      label: "Subjects disliked",
      values: lookupSubjectLabels(answers.subjects_disliked as string[]),
    }] : []),
    // Readiness
    ...(answers.decision_readiness ? [{ label: "Decision readiness", values: [lookupValue(answers.decision_readiness as string, [...READINESS_OPTIONS])] }] : []),
    // Practical — from separate screens
    ...(answers.country ? [{ label: "Country", values: [lookupCountry(answers.country as string)] }] : []),
    ...(answers.relocation_willingness ? [{ label: "Open to relocating", values: [lookupValue(answers.relocation_willingness as string, [...RELOCATION_OPTIONS])] }] : []),
    ...(answers.financial_level ? [{ label: "Budget", values: [lookupValue(answers.financial_level as string, [...BUDGET_OPTIONS])] }] : []),
    ...(answers.family_expectation ? [{ label: "Family expectations", values: [lookupValue(answers.family_expectation as string, [...FAMILY_OPTIONS])] }] : []),
    ...(answers.risk_tolerance ? [{ label: "Risk tolerance", values: [lookupValue(answers.risk_tolerance as string, [...RISK_OPTIONS])] }] : []),
    ...(answers.max_study_years != null ? [{ label: "Max study duration", values: [`${answers.max_study_years} years`] }] : []),
  ].filter((item) => item.values.length > 0 && item.values[0] !== "—");

  const isCareerDataReady = !!(careerData?.paths?.length);

  const handleComplete = async () => {
    if (!userId) {
      showErrorToast("Session expired", "Please sign in again to continue.");
      return;
    }
    if (!isCareerDataReady) {
      showErrorToast("Still loading", "Career data is loading — please try again in a moment.");
      return;
    }
    setIsGenerating(true);

    try {
      // Step 1: Save onboarding answers to Supabase
      console.log("[Generate] Step 1: Saving onboarding answers...", Object.keys(answers));
      await saveOnboarding.mutateAsync(answers);
      console.log("[Generate] Step 1 complete: answers saved");

      // Step 2: Build engine profile from saved data
      console.log("[Generate] Step 2: Building engine profile...");
      const engineProfile = await buildEngineProfile(userId);
      console.log("[Generate] Step 2 complete:", {
        interests: engineProfile.interests.length,
        strengths: engineProfile.strengths.length,
        values: engineProfile.values.length,
        constraints: engineProfile.constraints,
      });

      // Step 3: Build career paths for scoring
      console.log("[Generate] Step 3: Building career paths...", {
        paths: careerData.paths?.length,
        mappings: careerData.mappings?.length,
        studyDirections: careerData.studyDirections?.length,
      });
      const enginePaths = buildEngineCareerPaths(
        careerData.paths,
        careerData.mappings ?? [],
        careerData.studyDirections ?? [],
      );

      if (enginePaths.length === 0) {
        throw new Error("No career paths available for scoring");
      }
      console.log("[Generate] Step 3 complete:", enginePaths.length, "career paths");

      // Step 4: Run scoring engine + save results
      console.log("[Generate] Step 4: Running recommendation engine...");
      await runRecommendations.mutateAsync({
        engineProfile,
        careerPaths: enginePaths,
      });
      console.log("[Generate] Step 4 complete: recommendations saved");

      showSuccessToast("Recommendations ready!");
      router.replace("/" as never);
    } catch (err) {
      console.error("[Generate] FAILED:", err);
      const message = err instanceof Error ? err.message : String(err);
      showErrorToast("Generation failed", message);
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
          label={isGenerating ? "Analyzing your profile..." : !isCareerDataReady ? "Loading career data..." : "Generate my recommendations"}
          onPress={handleComplete}
          loading={isGenerating || !isCareerDataReady}
          disabled={isGenerating || !isCareerDataReady}
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

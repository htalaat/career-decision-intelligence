import React from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { Button } from "../../components/ui/Button";
import { ProfileSummaryCard } from "../../components/features/ProfileSummaryCard";
import { UserGreeting } from "../../components/features/UserGreeting";
import { useOnboardingStore } from "../../stores/onboardingStore";
import { useSaveOnboarding } from "../../lib/hooks/useProfile";
import { showSuccessToast, showErrorToast } from "../../components/ui/Toast";
import { useTokens } from "../../lib/theme/PersonaProvider";
import { INTEREST_TRAITS, STRENGTH_TRAITS, VALUE_OPTIONS, WORKSTYLE_OPTIONS } from "../../lib/utils/constants";

function lookupLabels(keys: string[], options: ReadonlyArray<{ key: string; label: string }>) {
  return keys.map((k) => options.find((o) => o.key === k)?.label ?? k);
}

/** Step 10: Profile summary review — saves to Supabase on completion */
export default function SummaryScreen() {
  const router = useRouter();
  const tokens = useTokens();
  const { answers, prevStep } = useOnboardingStore();
  const saveOnboarding = useSaveOnboarding();

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
    try {
      await saveOnboarding.mutateAsync(answers);
      showSuccessToast("Profile saved!");
      router.replace("/(tabs)");
    } catch {
      showErrorToast("Failed to save", "Please try again.");
    }
  };

  return (
    <View className="flex-1 justify-between">
      <View className="gap-6 flex-1">
        <UserGreeting name={name} />
        <Text className="text-text-secondary" style={{ fontSize: tokens.typography.bodySize }}>
          Here's what you told us. Review your profile and generate your career recommendations.
        </Text>
        <ProfileSummaryCard items={summaryItems} />
      </View>
      <View className="gap-3 pt-4">
        <Button label="Generate my recommendations" onPress={handleComplete} loading={saveOnboarding.isPending} />
        <Button label="Go back and edit" variant="ghost" onPress={() => { prevStep(); router.back(); }} />
      </View>
    </View>
  );
}

import { Redirect } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { useAuthStore } from "../stores/authStore";
import { useProfile } from "../lib/hooks/useProfile";

/** Entry point: redirect based on auth and onboarding state */
export default function Index() {
  const { isLoading: authLoading, isAuthenticated } = useAuthStore();
  const { data, isLoading: profileLoading } = useProfile();

  if (authLoading || (isAuthenticated && profileLoading)) {
    return (
      <View className="flex-1 items-center justify-center bg-surface">
        <ActivityIndicator color="#6C5CE7" size="large" />
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href="/(public)/landing" />;
  }

  if (!data?.profile.onboarding_completed) {
    return <Redirect href={"/(onboarding)/splash" as never} />;
  }

  return <Redirect href="/(tabs)" />;
}

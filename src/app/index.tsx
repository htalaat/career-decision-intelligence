import { Redirect } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { useAuthStore } from "../stores/authStore";
import { useProfile } from "../lib/hooks/useProfile";

/** Entry point: auto-authenticates anonymously, then routes based on onboarding state */
export default function Index() {
  const { isLoading: authLoading, isAuthenticated } = useAuthStore();
  const { data, isLoading: profileLoading } = useProfile();

  // Show spinner while auth initializes (anonymous sign-in) or profile loads
  if (authLoading || (isAuthenticated && profileLoading)) {
    return (
      <View className="flex-1 items-center justify-center bg-surface">
        <ActivityIndicator color="#6C5CE7" size="large" />
      </View>
    );
  }

  // If anonymous sign-in failed, still go to onboarding (will show error on generate)
  if (!isAuthenticated) {
    return <Redirect href={"/(onboarding)/splash" as never} />;
  }

  if (!data?.profile.onboarding_completed) {
    return <Redirect href={"/(onboarding)/splash" as never} />;
  }

  return <Redirect href={"/(tabs)/discover" as never} />;
}

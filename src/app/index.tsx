import { Redirect } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { useAuthStore } from "../stores/authStore";

/** Entry point: redirect based on auth state */
export default function Index() {
  const { isLoading, isAuthenticated } = useAuthStore();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-surface">
        <ActivityIndicator color="#4F8CFF" size="large" />
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href="/(public)/landing" />;
  }

  return <Redirect href="/(tabs)" />;
}

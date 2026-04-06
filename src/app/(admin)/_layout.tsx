import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Stack, Redirect } from "expo-router";
import { useProfile } from "../../lib/hooks/useProfile";
import { useTokens } from "../../lib/theme/PersonaProvider";

/** Admin layout: blocks access if user is not admin */
export default function AdminLayout() {
  const tokens = useTokens();
  const { data, isLoading } = useProfile();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: tokens.colors.surface.DEFAULT }}>
        <ActivityIndicator color={tokens.colors.accent.DEFAULT} size="large" />
      </View>
    );
  }

  if (data?.profile?.role !== "admin") {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: tokens.colors.surface.DEFAULT },
      }}
    />
  );
}

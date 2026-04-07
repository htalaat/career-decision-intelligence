import { Tabs } from "expo-router";
import { useTokens } from "../../lib/theme/PersonaProvider";

/** Mobile-first bottom tab bar — 4 tabs */
export default function TabsLayout() {
  const tokens = useTokens();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: tokens.colors.surface.secondary,
          borderTopColor: tokens.colors.border.DEFAULT,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 4,
        },
        tabBarActiveTintColor: tokens.colors.accent.DEFAULT,
        tabBarInactiveTintColor: tokens.colors.text.muted,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen name="discover" options={{ title: "Discover" }} />
      <Tabs.Screen name="compare" options={{ title: "Compare" }} />
      <Tabs.Screen name="plan" options={{ title: "Plan" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}

import { Tabs } from "expo-router";
import { useTokens } from "../../lib/theme/PersonaProvider";

/** Main app tab bar */
export default function TabsLayout() {
  const tokens = useTokens();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: tokens.colors.surface.secondary,
          borderTopColor: tokens.colors.border.DEFAULT,
        },
        tabBarActiveTintColor: tokens.colors.accent.DEFAULT,
        tabBarInactiveTintColor: tokens.colors.text.muted,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="explore" options={{ title: "Explore" }} />
    </Tabs>
  );
}

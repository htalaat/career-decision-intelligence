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
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
    </Tabs>
  );
}

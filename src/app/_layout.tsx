import React, { useEffect } from "react";
import { Platform } from "react-native";
import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "burnt/web";
import { PersonaProvider } from "../lib/theme/PersonaProvider";
import { useAuthStore } from "../stores/authStore";
import "../global.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 5 * 60 * 1000, retry: 1 },
  },
});

/** Root layout: providers, auth initialization */
export default function RootLayout() {
  const initialize = useAuthStore((s) => s.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <QueryClientProvider client={queryClient}>
      <PersonaProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#F7F8FC" },
          }}
        />
        {Platform.OS === "web" && <Toaster />}
      </PersonaProvider>
    </QueryClientProvider>
  );
}

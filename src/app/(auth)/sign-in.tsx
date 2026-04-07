import React, { useState } from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { Screen } from "../../components/ui/Screen";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { useTokens } from "../../lib/theme/PersonaProvider";
import { signInWithMagicLink } from "../../lib/supabase/auth";
import { showErrorToast } from "../../components/ui/Toast";
import { z } from "zod";

const emailSchema = z.string().email("Please enter a valid email address");

/** Magic link sign-in screen */
export default function SignInScreen() {
  const router = useRouter();
  const tokens = useTokens();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    const result = emailSchema.safeParse(email.trim());
    if (!result.success) {
      setError(result.error.errors[0]?.message ?? "Invalid email");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await signInWithMagicLink(result.data);
      router.push("/(auth)/verify");
    } catch {
      showErrorToast("Sign in failed", "Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen scroll padded>
      <View className="flex-1 justify-center gap-8 py-12">
        <View className="gap-2">
          <Text className="font-bold" style={{ fontSize: tokens.typography.headingSize, color: tokens.colors.text.primary }}>
            Sign in
          </Text>
          <Text style={{ fontSize: tokens.typography.bodySize, color: tokens.colors.text.secondary }}>
            We'll send you a secure link. No password needed.
          </Text>
        </View>
        <View className="gap-4">
          <Input
            label="Email address"
            placeholder="you@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            error={error}
          />
          <Button label="Send magic link" onPress={handleSignIn} loading={loading} disabled={!email.trim()} />
        </View>
      </View>
    </Screen>
  );
}

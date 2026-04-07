import React from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Screen } from "../../components/ui/Screen";
import { Button } from "../../components/ui/Button";
import { FadeIn } from "../../components/ui/FadeIn";
import { useTokens } from "../../lib/theme/PersonaProvider";

/** Landing page — youth-facing, warm, inviting */
export default function LandingScreen() {
  const router = useRouter();
  const tokens = useTokens();

  return (
    <Screen padded>
      <View style={{ flex: 1, justifyContent: "center", gap: 40 }}>
        {/* Hero */}
        <FadeIn>
          <View style={{ alignItems: "center", gap: 20 }}>
            <Text style={{ fontSize: 56 }}>🧭</Text>
            <Text style={{
              fontSize: 36,
              fontWeight: "800",
              color: tokens.colors.text.primary,
              textAlign: "center",
              lineHeight: 44,
            }}>
              Figure out{"\n"}what fits you
            </Text>
            <Text style={{
              fontSize: tokens.typography.bodySize,
              color: tokens.colors.text.secondary,
              textAlign: "center",
              lineHeight: tokens.typography.bodySize * 1.6,
              maxWidth: 320,
            }}>
              A few honest questions. No tests.{"\n"}
              Your direction, on your terms.
            </Text>
          </View>
        </FadeIn>

        {/* Feature pills */}
        <FadeIn delay={200}>
          <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 8 }}>
            {[
              { emoji: "✨", label: "Discover your direction" },
              { emoji: "📊", label: "Compare your options" },
              { emoji: "🎯", label: "Make a decision" },
              { emoji: "📋", label: "Get your action plan" },
            ].map((item) => (
              <View
                key={item.label}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                  paddingHorizontal: 14,
                  paddingVertical: 8,
                  borderRadius: tokens.borderRadius.full,
                  backgroundColor: tokens.colors.surface.elevated,
                }}
              >
                <Text style={{ fontSize: 14 }}>{item.emoji}</Text>
                <Text style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.text.secondary }}>
                  {item.label}
                </Text>
              </View>
            ))}
          </View>
        </FadeIn>

        {/* CTA */}
        <FadeIn delay={400}>
          <View style={{ gap: 12 }}>
            <Button
              label="Let's go →"
              onPress={() => router.push("/(auth)/sign-in" as never)}
            />
            <Pressable
              onPress={() => router.push("/(auth)/sign-in" as never)}
              accessibilityLabel="Sign in to existing account"
              accessibilityRole="button"
              style={{ alignItems: "center", paddingVertical: 12 }}
            >
              <Text style={{ fontSize: tokens.typography.bodySize, color: tokens.colors.accent.light }}>
                I already have an account
              </Text>
            </Pressable>
          </View>
        </FadeIn>
      </View>

      {/* Trust footer */}
      <View style={{ alignItems: "center", paddingBottom: 8 }}>
        <Text style={{ fontSize: 12, color: tokens.colors.text.muted, textAlign: "center" }}>
          🔒 Your data is private. No sharing. Delete anytime.
        </Text>
      </View>
    </Screen>
  );
}

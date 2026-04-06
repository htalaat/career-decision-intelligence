import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Pressable, Alert, Platform } from "react-native";
import { useRouter } from "expo-router";
import { Screen } from "../../components/ui/Screen";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Badge } from "../../components/ui/Badge";
import { useTokens } from "../../lib/theme/PersonaProvider";
import { useProfile } from "../../lib/hooks/useProfile";
import { useExportData, useDeleteAccount, useUpdateName, useConsentHistory } from "../../lib/hooks/usePrivacy";
import { signOut } from "../../lib/supabase/auth";
import { showSuccessToast, showErrorToast } from "../../components/ui/Toast";

/** Account settings: name, privacy controls, data export, account deletion */
export default function AccountScreen() {
  const router = useRouter();
  const tokens = useTokens();
  const { data: profileData } = useProfile();
  const { data: consents } = useConsentHistory();
  const exportData = useExportData();
  const deleteAccount = useDeleteAccount();
  const updateName = useUpdateName();

  const [firstName, setFirstName] = useState("");
  const [preferredName, setPreferredName] = useState("");
  const [editingName, setEditingName] = useState(false);
  const [showConsents, setShowConsents] = useState(false);

  // Populate name fields from profile
  useEffect(() => {
    if (profileData?.profile) {
      setFirstName(profileData.profile.first_name ?? "");
      setPreferredName(profileData.profile.preferred_name ?? "");
    }
  }, [profileData]);

  const handleSaveName = async () => {
    try {
      await updateName.mutateAsync({
        firstName: firstName.trim(),
        preferredName: preferredName.trim() || null,
      });
      setEditingName(false);
      showSuccessToast("Name updated");
    } catch {
      showErrorToast("Failed to update name");
    }
  };

  const handleExport = async () => {
    try {
      const data = await exportData.mutateAsync();
      // On web, download as JSON file
      if (Platform.OS === "web") {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `career-decision-export-${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
      }
      showSuccessToast("Data exported");
    } catch {
      showErrorToast("Export failed");
    }
  };

  const handleDelete = () => {
    const doDelete = async () => {
      try {
        await deleteAccount.mutateAsync();
        showSuccessToast("Account deleted");
        router.replace("/(public)/landing");
      } catch {
        showErrorToast("Deletion failed", "Please try again.");
      }
    };

    if (Platform.OS === "web") {
      if (window.confirm("Are you sure? This will permanently delete all your data. This cannot be undone.")) {
        doDelete();
      }
    } else {
      Alert.alert(
        "Delete account",
        "This will permanently delete all your data. This cannot be undone.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Delete", style: "destructive", onPress: doDelete },
        ],
      );
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace("/(public)/landing");
    } catch {
      showErrorToast("Sign out failed");
    }
  };

  const displayName = profileData?.profile?.preferred_name || profileData?.profile?.first_name || "";
  const email = profileData?.profile?.email ?? "";

  return (
    <Screen scroll padded>
      <View style={{ gap: 24, paddingTop: 16 }}>
        <Text style={{ fontSize: tokens.typography.headingSize, fontWeight: "700", color: tokens.colors.text.primary }}>
          Account
        </Text>

        {/* Profile info */}
        <View style={{
          backgroundColor: tokens.colors.surface.secondary,
          borderRadius: 16,
          borderWidth: 1,
          borderColor: tokens.colors.border.DEFAULT,
          padding: tokens.spacing.md,
          gap: 12,
        }}>
          <Text style={{ fontSize: tokens.typography.titleSize, fontWeight: "600", color: tokens.colors.text.primary }}>
            Profile
          </Text>

          {editingName ? (
            <View style={{ gap: 12 }}>
              <Input label="First name" value={firstName} onChangeText={setFirstName} />
              <Input label="Preferred name (optional)" value={preferredName} onChangeText={setPreferredName} />
              <View style={{ flexDirection: "row", gap: 8 }}>
                <View style={{ flex: 1 }}>
                  <Button label="Save" onPress={handleSaveName} loading={updateName.isPending} />
                </View>
                <View style={{ flex: 1 }}>
                  <Button label="Cancel" variant="ghost" onPress={() => setEditingName(false)} />
                </View>
              </View>
            </View>
          ) : (
            <View style={{ gap: 8 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <View>
                  <Text style={{ fontSize: tokens.typography.bodySize, color: tokens.colors.text.primary }}>
                    {displayName || "No name set"}
                  </Text>
                  <Text style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.text.muted }}>
                    {email}
                  </Text>
                </View>
                <Button label="Edit" variant="ghost" onPress={() => setEditingName(true)} />
              </View>
            </View>
          )}
        </View>

        {/* Privacy & Data */}
        <View style={{
          backgroundColor: tokens.colors.surface.secondary,
          borderRadius: 16,
          borderWidth: 1,
          borderColor: tokens.colors.border.DEFAULT,
          padding: tokens.spacing.md,
          gap: 12,
        }}>
          <Text style={{ fontSize: tokens.typography.titleSize, fontWeight: "600", color: tokens.colors.text.primary }}>
            Privacy & Data
          </Text>

          <Text style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.text.secondary }}>
            Your data is private. You can export everything or delete your account at any time.
          </Text>

          <Button label="Export my data" variant="secondary" onPress={handleExport} loading={exportData.isPending} />

          {/* Consent history */}
          <Pressable
            onPress={() => setShowConsents(!showConsents)}
            style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 8 }}
          >
            <Text style={{ fontSize: tokens.typography.bodySize, color: tokens.colors.text.primary }}>
              Consent history
            </Text>
            <Text style={{ fontSize: 18, color: tokens.colors.text.muted }}>
              {showConsents ? "−" : "+"}
            </Text>
          </Pressable>

          {showConsents && (
            <View style={{ gap: 6 }}>
              {(consents ?? []).length === 0 ? (
                <Text style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.text.muted }}>
                  No consent records yet.
                </Text>
              ) : (
                (consents ?? []).map((c: Record<string, unknown>) => (
                  <View
                    key={c.id as string}
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingVertical: 4,
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.text.primary }}>
                        {c.consent_type as string} (v{c.consent_version as string})
                      </Text>
                      <Text style={{ fontSize: 11, color: tokens.colors.text.muted }}>
                        {new Date(c.created_at as string).toLocaleDateString()}
                      </Text>
                    </View>
                    <Badge label={c.granted ? "Granted" : "Revoked"} variant={c.granted ? "success" : "error"} />
                  </View>
                ))
              )}
            </View>
          )}
        </View>

        {/* Danger zone */}
        <View style={{
          backgroundColor: tokens.colors.surface.secondary,
          borderRadius: 16,
          borderWidth: 1,
          borderColor: tokens.colors.error + "40",
          padding: tokens.spacing.md,
          gap: 12,
        }}>
          <Text style={{ fontSize: tokens.typography.titleSize, fontWeight: "600", color: tokens.colors.error }}>
            Danger zone
          </Text>
          <Text style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.text.secondary }}>
            Deleting your account permanently removes all data including your profile, recommendations, decisions, and action plans.
          </Text>
          <Button
            label="Delete my account"
            variant="destructive"
            onPress={handleDelete}
            loading={deleteAccount.isPending}
          />
        </View>

        {/* Sign out */}
        <Button label="Sign out" variant="secondary" onPress={handleSignOut} />
      </View>
    </Screen>
  );
}

import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Pressable, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { Screen } from "../components/ui/Screen";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { ChipGroup } from "../components/ui/ChipGroup";
import { Slider } from "../components/ui/Slider";
import { useTokens } from "../lib/theme/PersonaProvider";
import { useProfile, useProfileAnswers, useUpdateProfile } from "../lib/hooks/useProfile";
import { useRunRecommendations, buildEngineProfile, buildEngineCareerPaths } from "../lib/hooks/useRecommendations";
import { useCareerPaths } from "../lib/hooks/useCareerPaths";
import { useAuthStore } from "../stores/authStore";
import { showSuccessToast, showErrorToast } from "../components/ui/Toast";
import {
  STAGE_OPTIONS, FACULTY_CLUSTERS, INTENDED_FIELDS, COUNTRIES,
  RELOCATION_OPTIONS, INTEREST_TRAITS, STRENGTH_TRAITS,
  VALUE_OPTIONS, WORKSTYLE_OPTIONS, READINESS_OPTIONS,
} from "../lib/utils/constants";

/** Edit profile: change answers and optionally re-run recommendations */
export default function EditProfileScreen() {
  const router = useRouter();
  const tokens = useTokens();
  const userId = useAuthStore((s) => s.user?.id);
  const { data: profileData } = useProfile();
  const { data: answerData, isLoading } = useProfileAnswers();
  const { data: careerData } = useCareerPaths();
  const updateProfile = useUpdateProfile();
  const runRecommendations = useRunRecommendations();
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Editable state
  const [stage, setStage] = useState<string | null>(null);
  const [faculty, setFaculty] = useState<string | null>(null);
  const [intendedField, setIntendedField] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);
  const [relocation, setRelocation] = useState<string | null>(null);
  const [readiness, setReadiness] = useState<string | null>(null);
  const [interests, setInterests] = useState<string[]>([]);
  const [strengths, setStrengths] = useState<string[]>([]);
  const [values, setValues] = useState<string[]>([]);
  const [workstyle, setWorkstyle] = useState<string[]>([]);
  const [weights, setWeights] = useState({
    income: 50, stability: 50, flexibility: 50, prestige: 50,
    creativity: 50, impact: 50, study_duration: 50, risk: 50,
  });

  // Load current values
  useEffect(() => {
    if (profileData?.studentProfile) {
      const sp = profileData.studentProfile;
      setStage(sp.current_stage as string ?? null);
      setFaculty(sp.current_faculty as string ?? null);
      setIntendedField(sp.intended_field as string ?? null);
      setCountry(sp.country as string ?? null);
      setRelocation(sp.relocation_willingness as string ?? null);
      setReadiness(sp.decision_readiness as string ?? null);
    }
    if (answerData) {
      setInterests((answerData.answers.interests as string[]) ?? []);
      setStrengths((answerData.answers.strengths as string[]) ?? []);
      setValues((answerData.answers.values as string[]) ?? []);
      setWorkstyle((answerData.answers.workstyle as string[]) ?? []);
      if (answerData.weights) {
        setWeights({
          income: answerData.weights.income as number ?? 50,
          stability: answerData.weights.stability as number ?? 50,
          flexibility: answerData.weights.flexibility as number ?? 50,
          prestige: answerData.weights.prestige as number ?? 50,
          creativity: answerData.weights.creativity as number ?? 50,
          impact: answerData.weights.impact as number ?? 50,
          study_duration: answerData.weights.study_duration as number ?? 50,
          risk: answerData.weights.risk as number ?? 50,
        });
      }
    }
  }, [profileData, answerData]);

  const handleSave = async (rerun: boolean) => {
    if (!answerData || !userId) return;
    setSaving(true);
    try {
      await updateProfile.mutateAsync({
        profileId: answerData.profileId,
        updates: { interests, strengths, values, workstyle },
        studentProfileUpdates: {
          current_stage: stage,
          current_faculty: faculty,
          intended_field: intendedField,
          country,
          relocation_willingness: relocation,
          decision_readiness: readiness,
        },
        weightUpdates: weights,
      });

      if (rerun) {
        const engineProfile = await buildEngineProfile(userId);
        const enginePaths = buildEngineCareerPaths(
          careerData?.paths ?? [],
          careerData?.mappings ?? [],
          careerData?.studyDirections ?? [],
        );
        await runRecommendations.mutateAsync({ engineProfile, careerPaths: enginePaths });
        showSuccessToast("Profile updated & recommendations regenerated!");
      } else {
        showSuccessToast("Profile updated!");
      }
      router.back();
    } catch {
      showErrorToast("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  const toggleChip = (list: string[], setList: (v: string[]) => void, key: string) => {
    setList(list.includes(key) ? list.filter((k) => k !== key) : [...list, key]);
  };

  const sections = [
    { key: "stage", label: "Life Stage & Academic" },
    { key: "location", label: "Country & Location" },
    { key: "traits", label: "Interests, Strengths, Values" },
    { key: "workstyle", label: "Work Style" },
    { key: "priorities", label: "Priority Weights" },
  ];

  if (isLoading) {
    return (
      <Screen padded>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator color={tokens.colors.accent.DEFAULT} size="large" />
        </View>
      </Screen>
    );
  }

  return (
    <Screen scroll padded>
      <View style={{ gap: 20, paddingTop: 8 }}>
        <Pressable onPress={() => router.back()} accessibilityLabel="Go back" accessibilityRole="button">
          <Text style={{ fontSize: tokens.typography.bodySize, color: tokens.colors.accent.DEFAULT }}>← Back</Text>
        </Pressable>

        <View style={{ gap: 4 }}>
          <Text style={{ fontSize: tokens.typography.headingSize, fontWeight: "700", color: tokens.colors.text.primary }}>
            Edit your profile
          </Text>
          <Text style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.text.muted }}>
            Change any answers. Your previous answers are preserved in history.
          </Text>
        </View>

        {/* Collapsible sections */}
        {sections.map((section) => (
          <View key={section.key} style={{
            backgroundColor: tokens.colors.surface.secondary,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: activeSection === section.key ? tokens.colors.accent.DEFAULT : tokens.colors.border.DEFAULT,
            overflow: "hidden",
          }}>
            <Pressable
              onPress={() => setActiveSection(activeSection === section.key ? null : section.key)}
              style={{ padding: tokens.spacing.md, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
            >
              <Text style={{ fontSize: tokens.typography.bodySize, fontWeight: "600", color: tokens.colors.text.primary }}>
                {section.label}
              </Text>
              <Text style={{ fontSize: 18, color: tokens.colors.text.muted }}>
                {activeSection === section.key ? "−" : "+"}
              </Text>
            </Pressable>

            {activeSection === section.key && (
              <View style={{ padding: tokens.spacing.md, paddingTop: 0, gap: 16 }}>
                {section.key === "stage" && (
                  <>
                    <Select label="Life stage" options={[...STAGE_OPTIONS]} value={stage} onSelect={setStage} />
                    <Select label="Faculty" options={FACULTY_CLUSTERS.map((f) => ({ value: f.key, label: f.label }))} value={faculty} onSelect={setFaculty} />
                    <Select label="Intended field" options={INTENDED_FIELDS.map((f) => ({ value: f.key, label: f.label }))} value={intendedField} onSelect={setIntendedField} />
                  </>
                )}
                {section.key === "location" && (
                  <>
                    <Select label="Country" options={COUNTRIES.map((c) => ({ value: c.code, label: c.name }))} value={country} onSelect={setCountry} />
                    <Select label="Relocation" options={[...RELOCATION_OPTIONS]} value={relocation} onSelect={setRelocation} />
                    <Select label="Decision readiness" options={[...READINESS_OPTIONS]} value={readiness} onSelect={setReadiness} />
                  </>
                )}
                {section.key === "traits" && (
                  <>
                    <Text style={{ fontSize: tokens.typography.captionSize, fontWeight: "600", color: tokens.colors.text.secondary }}>Interests</Text>
                    <ChipGroup options={[...INTEREST_TRAITS]} selected={interests} onToggle={(k) => toggleChip(interests, setInterests, k)} min={3} max={8} />
                    <Text style={{ fontSize: tokens.typography.captionSize, fontWeight: "600", color: tokens.colors.text.secondary, marginTop: 8 }}>Strengths</Text>
                    <ChipGroup options={[...STRENGTH_TRAITS]} selected={strengths} onToggle={(k) => toggleChip(strengths, setStrengths, k)} min={3} max={8} />
                    <Text style={{ fontSize: tokens.typography.captionSize, fontWeight: "600", color: tokens.colors.text.secondary, marginTop: 8 }}>Values</Text>
                    <ChipGroup options={[...VALUE_OPTIONS]} selected={values} onToggle={(k) => toggleChip(values, setValues, k)} min={3} max={6} />
                  </>
                )}
                {section.key === "workstyle" && (
                  <ChipGroup options={[...WORKSTYLE_OPTIONS]} selected={workstyle} onToggle={(k) => toggleChip(workstyle, setWorkstyle, k)} min={2} max={5} />
                )}
                {section.key === "priorities" && (
                  <ScrollView contentContainerStyle={{ gap: 14 }}>
                    <Slider label="Income potential" value={weights.income} onValueChange={(v) => setWeights((w) => ({ ...w, income: v }))} />
                    <Slider label="Job stability" value={weights.stability} onValueChange={(v) => setWeights((w) => ({ ...w, stability: v }))} />
                    <Slider label="Flexibility" value={weights.flexibility} onValueChange={(v) => setWeights((w) => ({ ...w, flexibility: v }))} />
                    <Slider label="Prestige" value={weights.prestige} onValueChange={(v) => setWeights((w) => ({ ...w, prestige: v }))} />
                    <Slider label="Creativity" value={weights.creativity} onValueChange={(v) => setWeights((w) => ({ ...w, creativity: v }))} />
                    <Slider label="Social impact" value={weights.impact} onValueChange={(v) => setWeights((w) => ({ ...w, impact: v }))} />
                    <Slider label="Study duration" value={weights.study_duration} onValueChange={(v) => setWeights((w) => ({ ...w, study_duration: v }))} />
                    <Slider label="Risk comfort" value={weights.risk} onValueChange={(v) => setWeights((w) => ({ ...w, risk: v }))} />
                  </ScrollView>
                )}
              </View>
            )}
          </View>
        ))}

        {/* Action buttons */}
        <View style={{ gap: 12 }}>
          <Button
            label="Save & re-run recommendations"
            onPress={() => handleSave(true)}
            loading={saving}
            disabled={saving}
          />
          <Button
            label="Save changes only"
            variant="secondary"
            onPress={() => handleSave(false)}
            loading={saving}
            disabled={saving}
          />
        </View>
      </View>
    </Screen>
  );
}

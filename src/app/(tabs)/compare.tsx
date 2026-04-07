import React, { useState, useMemo, useCallback } from "react";
import { View, Text, ActivityIndicator, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Screen } from "../../components/ui/Screen";
import { Button } from "../../components/ui/Button";
import { EmptyState } from "../../components/ui/EmptyState";
import { WeightAdjuster } from "../../components/features/WeightAdjuster";
import { CompareTable } from "../../components/features/CompareTable";
import { useTokens } from "../../lib/theme/PersonaProvider";
import { useCareerPaths } from "../../lib/hooks/useCareerPaths";
import { useLatestRecommendation, buildEngineCareerPaths } from "../../lib/hooks/useRecommendations";
import { useShortlist } from "../../lib/hooks/useShortlist";
import { useSaveCompareScenario, useCompareScenarios } from "../../lib/hooks/useCompareScenarios";
import { useCompareStore } from "../../stores/compareStore";
import { useRecommendationStore } from "../../stores/recommendationStore";
import { generateRecommendations } from "../../lib/engine/rank";
import type { EngineProfile } from "../../lib/engine/types";
import { showSuccessToast } from "../../components/ui/Toast";

const DEFAULT_WEIGHTS = {
  income: 50, stability: 50, flexibility: 50, prestige: 50,
  creativity: 50, impact: 50, study_duration: 50, risk: 50,
};

/** Compare screen: select paths, adjust weights, see live re-ranking */
export default function CompareScreen() {
  const router = useRouter();
  const tokens = useTokens();
  const { data: careerData, isLoading: careersLoading } = useCareerPaths();
  const { data: recData } = useLatestRecommendation();
  const shortlistedIds = useRecommendationStore((s) => s.shortlistedIds);
  const { selectedPathIds, customWeights, togglePath, clearSelection, setCustomWeights } = useCompareStore();
  const saveScenario = useSaveCompareScenario();
  const { data: savedScenarios } = useCompareScenarios();
  const [showWeights, setShowWeights] = useState(false);

  useShortlist(); // sync shortlist

  const paths = careerData?.paths ?? [];
  const mappings = careerData?.mappings ?? [];
  const currentWeights = customWeights ?? DEFAULT_WEIGHTS;

  // Build score map: re-run engine with custom weights if adjusted
  const compareResults = useMemo(() => {
    if (selectedPathIds.length < 2 || !recData?.run) return null;

    const profileSnapshot = recData.run.profile_snapshot as unknown as EngineProfile;
    const profileWithWeights: EngineProfile = {
      ...profileSnapshot,
      weights: currentWeights as EngineProfile["weights"],
    };

    const enginePaths = buildEngineCareerPaths(paths, mappings, careerData?.studyDirections ?? [])
      .filter((p) => selectedPathIds.includes(p.id));

    const result = generateRecommendations(profileWithWeights, enginePaths);
    return result.scoredPaths;
  }, [selectedPathIds, currentWeights, recData, paths, mappings]);

  const handleWeightChange = useCallback((key: string, value: number) => {
    setCustomWeights({ ...currentWeights, [key]: value });
  }, [currentWeights, setCustomWeights]);

  const handleReset = useCallback(() => {
    setCustomWeights(null);
  }, [setCustomWeights]);

  const handleSave = useCallback(async () => {
    if (!compareResults) return;
    await saveScenario.mutateAsync({
      title: `Comparison: ${compareResults.map((r) => r.title).join(" vs ")}`,
      selectedPathIds,
      customWeights: customWeights,
      resultSnapshot: { scoredPaths: compareResults } as unknown as Record<string, unknown>,
    });
    showSuccessToast("Comparison saved!");
  }, [compareResults, selectedPathIds, customWeights, saveScenario]);

  // Get original scores from recommendation run for shortlisted paths
  const originalScoreMap = useMemo(() => {
    const map = new Map<string, number>();
    for (const item of recData?.items ?? []) {
      map.set(item.career_path_id as string, Number(item.overall_score));
    }
    return map;
  }, [recData]);

  if (careersLoading) {
    return (
      <Screen padded>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator color={tokens.colors.accent.DEFAULT} size="large" />
        </View>
      </Screen>
    );
  }

  // Selection phase: pick paths to compare
  if (selectedPathIds.length < 2) {
    const selectablePaths = shortlistedIds.length > 0
      ? paths.filter((p: Record<string, unknown>) => shortlistedIds.includes(p.id as string))
      : paths.slice(0, 10);

    return (
      <Screen scroll padded>
        <View style={{ gap: 16, paddingTop: 16 }}>
          <Text style={{ fontSize: tokens.typography.headingSize, fontWeight: "700", color: tokens.colors.text.primary }}>
            Compare careers
          </Text>
          <Text style={{ fontSize: tokens.typography.bodySize, color: tokens.colors.text.secondary }}>
            Select 2–5 career paths to compare side by side.
            {shortlistedIds.length > 0 ? " Showing your shortlisted paths." : ""}
          </Text>

          {/* Saved scenarios */}
          {savedScenarios && savedScenarios.length > 0 && (
            <View style={{ gap: 8 }}>
              <Text style={{ fontSize: tokens.typography.bodySize, fontWeight: "600", color: tokens.colors.text.primary }}>
                Saved comparisons
              </Text>
              {savedScenarios.map((scenario: Record<string, unknown>) => (
                <Pressable
                  key={scenario.id as string}
                  onPress={() => {
                    // Load the scenario's paths into the compare store
                    const pathIds = (scenario.selected_path_ids as string[]) ?? [];
                    for (const pid of pathIds) {
                      if (!selectedPathIds.includes(pid)) togglePath(pid);
                    }
                    if (scenario.custom_weights) {
                      setCustomWeights(scenario.custom_weights as Record<string, number>);
                    }
                  }}
                  style={{
                    backgroundColor: tokens.colors.surface.secondary,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: tokens.colors.border.DEFAULT,
                    padding: 12,
                    gap: 4,
                  }}
                >
                  <Text style={{ fontSize: tokens.typography.bodySize, fontWeight: "500", color: tokens.colors.text.primary }}>
                    {scenario.title as string}
                  </Text>
                  <Text style={{ fontSize: 11, color: tokens.colors.text.muted }}>
                    {(scenario.selected_path_ids as string[])?.length ?? 0} paths compared • {new Date(scenario.created_at as string).toLocaleDateString()}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}

          {selectedPathIds.length > 0 && (
            <Text style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.accent.DEFAULT }}>
              {selectedPathIds.length} selected — {selectedPathIds.length < 2 ? "select at least 2" : "ready to compare"}
            </Text>
          )}

          <View style={{ gap: 8 }}>
            {selectablePaths.map((p: Record<string, unknown>) => {
              const isSelected = selectedPathIds.includes(p.id as string);
              return (
                <Pressable
                  key={p.id as string}
                  onPress={() => togglePath(p.id as string)}
                  accessibilityLabel={`${isSelected ? "Deselect" : "Select"} ${p.title as string}`}
                  accessibilityRole="checkbox"
                  style={{
                    backgroundColor: isSelected ? tokens.colors.accent.DEFAULT + "15" : tokens.colors.surface.secondary,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: isSelected ? tokens.colors.accent.DEFAULT : tokens.colors.border.DEFAULT,
                    padding: tokens.spacing.md,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View style={{ flex: 1, gap: 2 }}>
                    <Text style={{ fontSize: tokens.typography.bodySize, fontWeight: "600", color: tokens.colors.text.primary }}>
                      {p.title as string}
                    </Text>
                    <Text style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.text.muted }}>
                      {p.domain as string}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                    {originalScoreMap.has(p.id as string) && (
                      <Text style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.text.muted }}>
                        {originalScoreMap.get(p.id as string)}%
                      </Text>
                    )}
                    <View style={{
                      width: 24, height: 24, borderRadius: 12,
                      backgroundColor: isSelected ? tokens.colors.accent.DEFAULT : tokens.colors.surface.elevated,
                      alignItems: "center", justifyContent: "center",
                    }}>
                      {isSelected && <Text style={{ color: "#FFFFFF", fontSize: 14, fontWeight: "700" }}>✓</Text>}
                    </View>
                  </View>
                </Pressable>
              );
            })}
          </View>

          {selectablePaths.length === 0 && (
            <EmptyState
              title="No paths to compare"
              message="Shortlist some career paths first from the Explore tab."
              actionLabel="Go to Explore"
              onAction={() => router.push("/(tabs)/explore")}
            />
          )}
        </View>
      </Screen>
    );
  }

  // Comparison phase: true side-by-side table
  return (
    <Screen scroll padded>
      <View style={{ gap: 20, paddingTop: 16 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text style={{ fontSize: tokens.typography.headingSize, fontWeight: "700", color: tokens.colors.text.primary }}>
            Comparison
          </Text>
          <Button label="New" variant="ghost" onPress={clearSelection} />
        </View>

        <Text style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.text.muted }}>
          Comparing {compareResults?.length ?? 0} paths side by side. Scroll right to see all columns.
        </Text>

        {/* Side-by-side comparison table */}
        {compareResults && compareResults.length > 0 && (
          <CompareTable paths={compareResults} />
        )}

        {/* Weight adjuster toggle */}
        <Button
          label={showWeights ? "Hide weight adjustment" : "Adjust priorities to see ranking change"}
          variant="secondary"
          onPress={() => setShowWeights(!showWeights)}
        />

        {showWeights && (
          <WeightAdjuster
            weights={currentWeights as Record<string, number> & { income: number; stability: number; flexibility: number; prestige: number; creativity: number; impact: number; study_duration: number; risk: number }}
            onWeightChange={handleWeightChange}
            onReset={handleReset}
          />
        )}

        {/* Save scenario */}
        <Button
          label="Save this comparison"
          onPress={handleSave}
          loading={saveScenario.isPending}
        />

        <Button
          label="Ready to decide? →"
          variant="ghost"
          onPress={() => router.push("/(tabs)/decisions" as never)}
        />
      </View>
    </Screen>
  );
}

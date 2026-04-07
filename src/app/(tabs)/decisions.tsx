import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { Screen } from "../../components/ui/Screen";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { EmptyState } from "../../components/ui/EmptyState";
import { useTokens } from "../../lib/theme/PersonaProvider";
import { useCareerPaths } from "../../lib/hooks/useCareerPaths";
import { useLatestRecommendation } from "../../lib/hooks/useRecommendations";
import { useDecisions, useCreateDecision, useCreateActionPlan, generateActionPlanTemplate } from "../../lib/hooks/useDecisions";
import { useShortlist } from "../../lib/hooks/useShortlist";
import { Input } from "../../components/ui/Input";
import { useRecommendationStore } from "../../stores/recommendationStore";
import { showSuccessToast, showErrorToast } from "../../components/ui/Toast";

type DecisionStatus = "exploring" | "leaning" | "decided" | "rejected";

/** Decision board: pick a career path, set status, generate action plan */
export default function DecisionsScreen() {
  const router = useRouter();
  const tokens = useTokens();
  const { data: careerData } = useCareerPaths();
  const { data: recData } = useLatestRecommendation();
  const { data: decisions, isLoading } = useDecisions();
  const shortlistedIds = useRecommendationStore((s) => s.shortlistedIds);
  const createDecision = useCreateDecision();
  const createActionPlan = useCreateActionPlan();
  const [selectedPathId, setSelectedPathId] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<DecisionStatus>("exploring");
  const [notes, setNotes] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  useShortlist();

  const pathMap = new Map(
    (careerData?.paths ?? []).map((p: Record<string, unknown>) => [p.id as string, p]),
  );

  const scoreMap = new Map(
    (recData?.items ?? []).map((item: Record<string, unknown>) => [
      item.career_path_id as string,
      Number(item.overall_score),
    ]),
  );

  // Paths to choose from: shortlisted or top recommendations
  const choosablePaths = shortlistedIds.length > 0
    ? shortlistedIds.map((id) => pathMap.get(id)).filter(Boolean)
    : (recData?.items ?? []).slice(0, 5).map((item: Record<string, unknown>) => pathMap.get(item.career_path_id as string)).filter(Boolean);

  const handleCreateDecision = async () => {
    if (!selectedPathId) return;
    setIsCreating(true);

    try {
      const career = pathMap.get(selectedPathId);
      const recItem = (recData?.items ?? []).find(
        (item: Record<string, unknown>) => item.career_path_id === selectedPathId,
      );
      const explanation = (recItem?.explanation as Record<string, unknown>) ?? {};

      // Create decision snapshot
      const decision = await createDecision.mutateAsync({
        chosenCareerPathId: selectedPathId,
        status: selectedStatus === "rejected" ? "exploring" : selectedStatus as "exploring" | "leaning" | "decided",
        summary: {
          careerTitle: (career?.title as string) ?? "Unknown",
          domain: (career?.domain as string) ?? "",
          score: recItem ? Number(recItem.overall_score) : null,
          topPositives: (explanation.topPositives as string[]) ?? [],
          topNegatives: (explanation.topNegatives as string[]) ?? [],
          studyDirection: explanation.studyDirection ?? null,
          suggestedFaculty: explanation.suggestedFaculty ?? null,
          whatMayBlock: (explanation.whatMayBlock as string[]) ?? [],
          validationQuestions: (explanation.validationQuestions as string[]) ?? [],
          notes: notes.trim() || null,
          isRejected: selectedStatus === "rejected",
          status: selectedStatus,
        },
      });

      // Generate career-specific action plan (skip for rejected)
      if (selectedStatus !== "rejected") {
        const planTemplate = generateActionPlanTemplate(
          (career?.title as string) ?? "this career",
          (career?.education_path as string) ?? null,
          {
            suggestedFaculty: explanation.suggestedFaculty as string | null,
            suggestedDegree: explanation.suggestedDegree as string | null,
            whatToStudy: explanation.whatToStudy as string | null,
            validationQuestions: (explanation.validationQuestions as string[]) ?? [],
            whatMayBlock: (explanation.whatMayBlock as string[]) ?? [],
            topPositives: (explanation.topPositives as string[]) ?? [],
            countryConsiderations: explanation.countryConsiderations as string | null,
          },
        );
        await createActionPlan.mutateAsync({
          decisionId: decision.id,
          plan: planTemplate,
        });
      }

      showSuccessToast("Decision recorded with action plan!");
      setSelectedPathId(null);
      setNotes("");
      router.push(`/action-plan/${decision.id}`);
    } catch {
      showErrorToast("Failed to save decision", "Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  const statusOptions: Array<{ value: string; label: string; description: string }> = [
    { value: "exploring", label: "Still exploring", description: "Gathering information, not committed" },
    { value: "leaning", label: "Leaning toward this", description: "Strong interest, want to validate" },
    { value: "decided", label: "Decided", description: "Ready to commit and take action" },
    { value: "rejected", label: "Not for me", description: "Ruled out after consideration" },
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
      <View style={{ gap: 24, paddingTop: 16 }}>
        <Text style={{ fontSize: tokens.typography.headingSize, fontWeight: "700", color: tokens.colors.text.primary }}>
          Decisions
        </Text>

        {/* Past decisions */}
        {(decisions ?? []).length > 0 && (
          <View style={{ gap: 12 }}>
            <Text style={{ fontSize: tokens.typography.titleSize, fontWeight: "600", color: tokens.colors.text.primary }}>
              Your decisions
            </Text>
            {(decisions ?? []).map((d: Record<string, unknown>) => {
              const summary = (d.summary as Record<string, unknown>) ?? {};
              const isRejected = (summary as Record<string, unknown>).isRejected === true;
              const statusVariant = isRejected ? "error" : d.status === "decided" ? "success" : d.status === "leaning" ? "warning" : "default";
              const statusLabel = isRejected ? "rejected" : d.status as string;
              return (
                <Pressable
                  key={d.id as string}
                  onPress={() => router.push(`/action-plan/${d.id as string}`)}
                  style={{
                    backgroundColor: tokens.colors.surface.secondary,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: tokens.colors.border.DEFAULT,
                    padding: tokens.spacing.md,
                    gap: 8,
                  }}
                >
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ fontSize: tokens.typography.bodySize, fontWeight: "600", color: tokens.colors.text.primary, flex: 1 }}>
                      {summary.careerTitle as string}
                    </Text>
                    <Badge label={statusLabel} variant={statusVariant} />
                  </View>
                  <Text style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.text.muted }}>
                    {summary.domain as string} • Score: {summary.score != null ? `${summary.score}%` : "N/A"}
                  </Text>
                  {(summary.notes as string) && (
                    <Text style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.text.secondary, fontStyle: "italic" }}>
                      "{summary.notes as string}"
                    </Text>
                  )}
                </Pressable>
              );
            })}
          </View>
        )}

        {/* New decision section */}
        <View style={{ gap: 12 }}>
          <Text style={{ fontSize: tokens.typography.titleSize, fontWeight: "600", color: tokens.colors.text.primary }}>
            Make a new decision
          </Text>
          <Text style={{ fontSize: tokens.typography.bodySize, color: tokens.colors.text.secondary }}>
            Choose a career path and record where you stand.
          </Text>

          {choosablePaths.length === 0 ? (
            <EmptyState
              title="No paths to decide on"
              message="Generate recommendations first, then shortlist paths you're interested in."
              actionLabel="Go to Explore"
              onAction={() => router.push("/(tabs)/explore")}
            />
          ) : (
            <>
              {/* Path selection */}
              <View style={{ gap: 8 }}>
                <Text style={{ fontSize: tokens.typography.captionSize, fontWeight: "600", color: tokens.colors.text.muted }}>
                  Choose a path
                </Text>
                {choosablePaths.map((p) => {
                  if (!p) return null;
                  const career = p as Record<string, unknown>;
                  const isSelected = selectedPathId === (career.id as string);
                  return (
                    <Pressable
                      key={career.id as string}
                      onPress={() => setSelectedPathId(career.id as string)}
                      style={{
                        backgroundColor: isSelected ? tokens.colors.accent.DEFAULT + "15" : tokens.colors.surface.secondary,
                        borderRadius: 12,
                        borderWidth: 1,
                        borderColor: isSelected ? tokens.colors.accent.DEFAULT : tokens.colors.border.DEFAULT,
                        padding: 12,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: tokens.typography.bodySize, fontWeight: "600", color: tokens.colors.text.primary }}>
                          {career.title as string}
                        </Text>
                        <Text style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.text.muted }}>
                          {career.domain as string}
                        </Text>
                      </View>
                      {scoreMap.has(career.id as string) && (
                        <Text style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.accent.DEFAULT }}>
                          {scoreMap.get(career.id as string)}% fit
                        </Text>
                      )}
                    </Pressable>
                  );
                })}
              </View>

              {/* Status selection */}
              {selectedPathId && (
                <View style={{ gap: 8 }}>
                  <Text style={{ fontSize: tokens.typography.captionSize, fontWeight: "600", color: tokens.colors.text.muted }}>
                    How do you feel about this path?
                  </Text>
                  {statusOptions.map((opt) => (
                    <Pressable
                      key={opt.value}
                      onPress={() => setSelectedStatus(opt.value as DecisionStatus)}
                      style={{
                        backgroundColor: selectedStatus === opt.value ? tokens.colors.accent.DEFAULT + "15" : tokens.colors.surface.secondary,
                        borderRadius: 12,
                        borderWidth: 1,
                        borderColor: selectedStatus === opt.value ? tokens.colors.accent.DEFAULT : tokens.colors.border.DEFAULT,
                        padding: 12,
                      }}
                    >
                      <Text style={{ fontSize: tokens.typography.bodySize, fontWeight: "600", color: tokens.colors.text.primary }}>
                        {opt.label}
                      </Text>
                      <Text style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.text.muted }}>
                        {opt.description}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              )}

              {/* Notes */}
              {selectedPathId && (
                <Input
                  label="Notes (optional)"
                  placeholder="Any thoughts, concerns, or things to remember..."
                  value={notes}
                  onChangeText={setNotes}
                  helper="Personal notes about this decision"
                />
              )}

              {/* Submit */}
              {selectedPathId && (
                <Button
                  label={isCreating ? "Saving decision..." : "Record decision & generate action plan"}
                  onPress={handleCreateDecision}
                  loading={isCreating}
                  disabled={isCreating}
                />
              )}
            </>
          )}
        </View>
      </View>
    </Screen>
  );
}

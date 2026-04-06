import React, { useMemo } from "react";
import { View, Text, ScrollView, Pressable, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Screen } from "../../components/ui/Screen";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { ErrorState } from "../../components/ui/ErrorState";
import { useTokens } from "../../lib/theme/PersonaProvider";
import { useActionPlan, useUpdateActionPlan } from "../../lib/hooks/useDecisions";
import { showSuccessToast } from "../../components/ui/Toast";

interface Task {
  id: string;
  text: string;
  done: boolean;
}

interface Milestone {
  period: string;
  tasks: Task[];
}

/** Action plan screen with 7/30/90-day checklist */
export default function ActionPlanScreen() {
  const { id: decisionId } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const tokens = useTokens();
  const { data: planData, isLoading } = useActionPlan(decisionId ?? null);
  const updatePlan = useUpdateActionPlan();

  const plan = planData?.plan as Record<string, unknown> | undefined;
  const milestones = (plan?.milestones as Milestone[]) ?? [];
  const careerTitle = (plan?.careerTitle as string) ?? "Your career";

  const progress = useMemo(() => {
    const allTasks = milestones.flatMap((m) => m.tasks);
    if (allTasks.length === 0) return 0;
    const done = allTasks.filter((t) => t.done).length;
    return Math.round((done / allTasks.length) * 100);
  }, [milestones]);

  const handleToggleTask = async (milestoneIndex: number, taskId: string) => {
    if (!planData || !plan) return;

    const updatedMilestones = milestones.map((m, mi) => {
      if (mi !== milestoneIndex) return m;
      return {
        ...m,
        tasks: m.tasks.map((t) =>
          t.id === taskId ? { ...t, done: !t.done } : t,
        ),
      };
    });

    const updatedPlan = { ...plan, milestones: updatedMilestones };

    await updatePlan.mutateAsync({
      planId: planData.id as string,
      plan: updatedPlan,
      decisionId: decisionId ?? "",
    });
  };

  if (isLoading) {
    return (
      <Screen padded>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator color={tokens.colors.accent.DEFAULT} size="large" />
        </View>
      </Screen>
    );
  }

  if (!planData) {
    return (
      <Screen padded>
        <ErrorState message="No action plan found for this decision" />
      </Screen>
    );
  }

  return (
    <Screen scroll padded>
      <View style={{ gap: 20, paddingTop: 8 }}>
        {/* Back */}
        <Pressable onPress={() => router.back()} accessibilityLabel="Go back" accessibilityRole="button">
          <Text style={{ fontSize: tokens.typography.bodySize, color: tokens.colors.accent.DEFAULT }}>
            ← Back
          </Text>
        </Pressable>

        {/* Header */}
        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: tokens.typography.headingSize, fontWeight: "700", color: tokens.colors.text.primary }}>
            Action plan
          </Text>
          <Text style={{ fontSize: tokens.typography.bodySize, color: tokens.colors.text.secondary }}>
            Your roadmap for exploring {careerTitle}
          </Text>
        </View>

        {/* Progress bar */}
        <View style={{ gap: 6 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.text.secondary }}>
              Progress
            </Text>
            <Text style={{ fontSize: tokens.typography.captionSize, fontWeight: "600", color: tokens.colors.accent.DEFAULT }}>
              {progress}%
            </Text>
          </View>
          <View style={{ height: 8, backgroundColor: tokens.colors.surface.elevated, borderRadius: 4, overflow: "hidden" }}>
            <View style={{
              height: "100%",
              width: `${progress}%`,
              backgroundColor: progress >= 100 ? tokens.colors.success : tokens.colors.accent.DEFAULT,
              borderRadius: 4,
            }} />
          </View>
        </View>

        {/* Milestones */}
        {milestones.map((milestone, mi) => {
          const milestoneDone = milestone.tasks.filter((t) => t.done).length;
          const milestoneTotal = milestone.tasks.length;

          return (
            <View key={milestone.period} style={{ gap: 12 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ fontSize: tokens.typography.titleSize, fontWeight: "600", color: tokens.colors.text.primary }}>
                  {milestone.period}
                </Text>
                <Badge
                  label={`${milestoneDone}/${milestoneTotal}`}
                  variant={milestoneDone === milestoneTotal ? "success" : "default"}
                />
              </View>

              <View style={{ gap: 6 }}>
                {milestone.tasks.map((task) => (
                  <Pressable
                    key={task.id}
                    onPress={() => handleToggleTask(mi, task.id)}
                    accessibilityLabel={`${task.done ? "Completed" : "Not completed"}: ${task.text}`}
                    accessibilityRole="checkbox"
                    style={{
                      backgroundColor: tokens.colors.surface.secondary,
                      borderRadius: 10,
                      padding: 12,
                      flexDirection: "row",
                      alignItems: "flex-start",
                      gap: 10,
                    }}
                  >
                    <View style={{
                      width: 22,
                      height: 22,
                      borderRadius: 6,
                      borderWidth: 2,
                      borderColor: task.done ? tokens.colors.success : tokens.colors.border.DEFAULT,
                      backgroundColor: task.done ? tokens.colors.success : "transparent",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 1,
                    }}>
                      {task.done && (
                        <Text style={{ color: "#FFFFFF", fontSize: 13, fontWeight: "700" }}>✓</Text>
                      )}
                    </View>
                    <Text style={{
                      flex: 1,
                      fontSize: tokens.typography.bodySize,
                      color: task.done ? tokens.colors.text.muted : tokens.colors.text.primary,
                      textDecorationLine: task.done ? "line-through" : "none",
                      lineHeight: tokens.typography.bodySize * 1.4,
                    }}>
                      {task.text}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          );
        })}

        <Button
          label="Back to decisions"
          variant="secondary"
          onPress={() => router.push("/(tabs)/decisions")}
        />
      </View>
    </Screen>
  );
}

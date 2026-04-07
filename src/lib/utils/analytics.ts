import { supabase } from "../supabase/client";

interface AnalyticsEvent {
  event: string;
  properties?: Record<string, unknown>;
}

const IS_DEV = process.env.EXPO_PUBLIC_DEMO_MODE === "true" || __DEV__;

/**
 * Lightweight analytics logger.
 * Logs events to console in dev, and to a Supabase function/table in production.
 * Non-blocking — failures are silently swallowed.
 */
export function trackEvent(event: string, properties?: Record<string, unknown>) {
  const payload: AnalyticsEvent = { event, properties };

  if (IS_DEV) {
    console.log("[analytics]", event, properties ?? "");
    return;
  }

  // Fire and forget — don't await, don't block UI
  try {
    supabase.from("analytics_events").insert({
      event_name: event,
      properties: properties ?? {},
      created_at: new Date().toISOString(),
    }).then(() => {});
  } catch {
    // Silently ignore — analytics should never break the app
  }
}

// Pre-defined event names for consistency
export const EVENTS = {
  // Onboarding
  ONBOARDING_STEP_COMPLETED: "onboarding_step_completed",
  ONBOARDING_COMPLETED: "onboarding_completed",
  ONBOARDING_DROPPED: "onboarding_dropped",

  // Recommendations
  RECOMMENDATIONS_GENERATED: "recommendations_generated",
  RECOMMENDATIONS_RERUN: "recommendations_rerun",

  // Compare
  COMPARE_STARTED: "compare_started",
  COMPARE_SCENARIO_SAVED: "compare_scenario_saved",
  COMPARE_SCENARIO_LOADED: "compare_scenario_loaded",
  COMPARE_WEIGHTS_ADJUSTED: "compare_weights_adjusted",

  // Decisions
  DECISION_CREATED: "decision_created",
  DECISION_STATUS_SET: "decision_status_set",
  ACTION_PLAN_TASK_TOGGLED: "action_plan_task_toggled",

  // Profile
  PROFILE_EDITED: "profile_edited",
  PROFILE_RERUN: "profile_rerun",

  // Shortlist
  SHORTLIST_ADDED: "shortlist_added",
  SHORTLIST_REMOVED: "shortlist_removed",

  // Career detail
  CAREER_DETAIL_VIEWED: "career_detail_viewed",

  // Account
  DATA_EXPORTED: "data_exported",
  ACCOUNT_DELETED: "account_deleted",
} as const;

import type { EngineProfile } from "./types";

/**
 * Compute a confidence score (0-1) based on profile completeness.
 * More complete profiles produce higher-confidence recommendations.
 */
export function computeConfidence(profile: EngineProfile): number {
  let filled = 0;
  let total = 0;

  // Interests (need at least 3)
  total++;
  if (profile.interests.length >= 3) filled++;

  // Strengths (need at least 3)
  total++;
  if (profile.strengths.length >= 3) filled++;

  // Values (need at least 3)
  total++;
  if (profile.values.length >= 3) filled++;

  // Workstyle (need at least 2)
  total++;
  if (profile.workstyle.length >= 2) filled++;

  // Weights (at least one non-default)
  total++;
  const w = profile.weights;
  const hasCustomWeights = [w.income, w.stability, w.flexibility, w.prestige, w.creativity, w.impact, w.study_duration, w.risk]
    .some((v) => v !== 50);
  if (hasCustomWeights) filled++;

  // Constraints (at least financial and risk)
  total++;
  if (profile.constraints.financial_level && profile.constraints.risk_tolerance) filled++;

  // Stage
  total++;
  if (profile.current_stage) filled++;

  return Math.round((filled / total) * 100) / 100;
}

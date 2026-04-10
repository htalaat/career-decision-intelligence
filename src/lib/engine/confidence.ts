import type { EngineProfile } from "./types";
import { CONFIDENCE } from "../config/scoring";

/**
 * Compute a confidence score (0-1) based on profile completeness.
 * More complete profiles produce higher-confidence recommendations.
 */
export function computeConfidence(profile: EngineProfile): number {
  let filled = 0;
  let total = 0;

  // Interests (need at least 3)
  total++;
  if (profile.interests.length >= CONFIDENCE.minInterests) filled++;

  // Strengths (need at least 3)
  total++;
  if (profile.strengths.length >= CONFIDENCE.minStrengths) filled++;

  // Values (need at least 3)
  total++;
  if (profile.values.length >= CONFIDENCE.minValues) filled++;

  // Workstyle (need at least 2)
  total++;
  if (profile.workstyle.length >= CONFIDENCE.minWorkstyle) filled++;

  // Weights (at least one non-default)
  total++;
  const w = profile.weights;
  const hasCustomWeights = [w.income, w.stability, w.flexibility, w.prestige, w.creativity, w.impact, w.study_duration, w.risk]
    .some((v) => v !== CONFIDENCE.defaultWeight);
  if (hasCustomWeights) filled++;

  // Constraints (at least financial and risk)
  total++;
  if (profile.constraints.financial_level && profile.constraints.risk_tolerance) filled++;

  // Stage
  total++;
  if (profile.current_stage) filled++;

  // Country
  total++;
  if (profile.country) filled++;

  // Academic context (faculty or intended field)
  total++;
  if (profile.current_faculty || profile.intended_field) filled++;

  // Decision readiness
  total++;
  if (profile.decision_readiness) filled++;

  // Subjects
  total++;
  if (profile.currentSubjects.length >= CONFIDENCE.minSubjects) filled++;

  // Subject feelings
  total++;
  if (profile.subjectsEnjoyed.length > 0 || profile.subjectsGoodAt.length > 0) filled++;

  return Math.round((filled / total) * 100) / 100;
}

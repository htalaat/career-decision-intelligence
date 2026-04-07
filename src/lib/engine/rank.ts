import type { EngineProfile, EngineCareerPath, RecommendationResult, ScoredPath } from "./types";
import { computeScore } from "./score";
import { computePenalties, totalPenalty } from "./penalties";
import { computeConfidence } from "./confidence";
import { generateExplanation } from "./explain";

const SCORING_MODEL_VERSION = "v2";

/** Weight distribution for 8 scoring dimensions */
const DIMENSION_WEIGHTS = {
  interestFit: 0.20,
  strengthFit: 0.15,
  valuesFit: 0.15,
  workstyleFit: 0.08,
  goalsFit: 0.12,
  feasibilityFit: 0.10,
  educationFit: 0.12,
  countryFit: 0.08,
};

/**
 * Run the full recommendation engine.
 * Takes a student profile and a list of career paths,
 * returns all paths scored, explained, and ranked.
 */
export function generateRecommendations(
  profile: EngineProfile,
  careerPaths: EngineCareerPath[],
): RecommendationResult {
  const confidence = computeConfidence(profile);

  const scored: ScoredPath[] = careerPaths.map((career) => {
    const breakdown = computeScore(profile, career);
    const penalties = computePenalties(profile, career);

    // Weighted overall score across 8 dimensions
    const rawScore =
      breakdown.interestFit * DIMENSION_WEIGHTS.interestFit +
      breakdown.strengthFit * DIMENSION_WEIGHTS.strengthFit +
      breakdown.valuesFit * DIMENSION_WEIGHTS.valuesFit +
      breakdown.workstyleFit * DIMENSION_WEIGHTS.workstyleFit +
      breakdown.goalsFit * DIMENSION_WEIGHTS.goalsFit +
      breakdown.feasibilityFit * DIMENSION_WEIGHTS.feasibilityFit +
      breakdown.educationFit * DIMENSION_WEIGHTS.educationFit +
      breakdown.countryFit * DIMENSION_WEIGHTS.countryFit;

    // Apply penalties
    const penaltyTotal = totalPenalty(penalties);
    const overallScore = Math.max(0, Math.min(100, Math.round(rawScore - penaltyTotal)));

    const explanation = generateExplanation(profile, career, breakdown, penalties);

    return {
      careerPathId: career.id,
      slug: career.slug,
      title: career.title,
      domain: career.domain,
      summary: career.summary,
      overallScore,
      confidenceScore: confidence,
      breakdown,
      penalties,
      explanation,
      rank: 0, // set after sorting
    };
  });

  // Sort by overall score descending
  scored.sort((a, b) => b.overallScore - a.overallScore);

  // Assign ranks (1-based)
  scored.forEach((s, i) => {
    s.rank = i + 1;
  });

  return {
    scoredPaths: scored,
    scoringModelVersion: SCORING_MODEL_VERSION,
    profileSnapshot: profile,
  };
}

/**
 * Single source of truth for ALL scoring weights, thresholds, bonuses,
 * and penalty parameters used by the recommendation engine.
 *
 * Engine files import from here instead of using inline numeric literals.
 * Changing a value here changes it everywhere.
 */

/** Current scoring model version tag */
export const SCORING_VERSION = "v2" as const;

/** Weight distribution for the 10 scoring dimensions (must sum to 1.0) */
export const DIMENSION_WEIGHTS = {
  interestFit: 0.14,
  strengthFit: 0.11,
  valuesFit: 0.11,
  workstyleFit: 0.06,
  goalsFit: 0.08,
  feasibilityFit: 0.07,
  educationFit: 0.08,
  countryFit: 0.06,
  clusterReactionFit: 0.14,
  subjectFit: 0.15,
} as const;

// ---------------------------------------------------------------------------
// score.ts parameters
// ---------------------------------------------------------------------------

/** Thresholds for computeTraitOverlap */
export const TRAIT_OVERLAP = {
  /** Score when the student has no traits selected */
  neutralScore: 50,
  /** Score when no traits overlap with the career */
  noOverlapScore: 30,
  /** Maximum bonus awarded for high coverage ratio */
  coverageBonusMax: 20,
} as const;

/** Thresholds for computeGoalsFit */
export const GOALS_FIT = {
  /** Returned when total goal-weight is 0 */
  defaultScore: 50,
} as const;

/** Thresholds for computeFeasibility */
export const FEASIBILITY = {
  /** Starting score before adjustments */
  baseline: 70,
  /** Bonus when career duration fits within student max */
  durationMatchBonus: 15,
  /** Points deducted per year of overshoot */
  durationOvershootPenaltyPerYear: 10,
  /** Duration threshold (years) that triggers the low-budget penalty */
  lowBudgetDurationThreshold: 4,
  /** Penalty when financial_level=low and duration exceeds threshold */
  lowBudgetLongDurationPenalty: 15,
} as const;

/** Thresholds for computeEducationFit */
export const EDUCATION_FIT = {
  /** No study-direction data available */
  noDataScore: 60,
  /** Student is undecided */
  undecidedScore: 55,
  /** Direct field-of-study match */
  primaryMatchScore: 90,
  /** Faculty-cluster match */
  clusterMatchScore: 70,
  /** No match at all */
  noMatchScore: 40,
} as const;

/** Thresholds for computeCountryFit */
export const COUNTRY_FIT = {
  /** No country provided */
  noCountryScore: 60,
  /** Starting score before adjustments */
  baseline: 70,
  /** Bonus for global domain when relocation=no */
  globalDomainBonus: 10,
  /** Bonus for international/flexible relocation */
  internationalBonus: 15,
  /** Bonus when career has country-specific notes */
  countryNotesBonus: 5,
} as const;

/** Thresholds and reaction score map for computeClusterReactionFit */
export const CLUSTER_REACTION_FIT = {
  /** No reactions recorded */
  noReactionsScore: 60,
  /** Default best-score before scanning reactions */
  defaultBestScore: 60,
  /** Scores for each reaction type */
  reactionScores: {
    feels_like_me: 90,
    explore: 72,
    surprised: 76,
    not_for_me: 35,
    not_sure: 58,
  },
} as const;

/** Income-potential mapping */
export const INCOME_POTENTIAL_MAP = {
  very_high: 95,
  high: 75,
  medium: 55,
  low: 35,
  default: 50,
} as const;

/** Stability scoring parameters */
export const STABILITY = {
  base: 50,
  domainBonus: 25,
  tagBonus: 10,
} as const;

/** Flexibility scoring parameters */
export const FLEXIBILITY = {
  base: 40,
  perMatchBonus: 15,
} as const;

/** Prestige scoring parameters */
export const PRESTIGE = {
  base: 50,
  veryHighIncomeBonus: 20,
  highIncomeBonus: 10,
  domainBonus: 15,
} as const;

/** Creativity scoring parameters */
export const CREATIVITY = {
  base: 30,
  perTagScore: 20,
  mappingMultiplier: 40,
} as const;

/** Impact scoring parameters */
export const IMPACT = {
  base: 30,
  perTagScore: 20,
  mappingMultiplier: 40,
} as const;

/** Duration-fit scoring parameters */
export const DURATION_FIT = {
  noDataScore: 60,
  fitsScore: 90,
  perYearOvershootPenalty: 20,
  minScore: 20,
} as const;

/** Risk-fit scoring map */
export const RISK_FIT = {
  high_risky: 85,
  high_safe: 60,
  high_other: 70,
  medium: 70,
  low_safe: 85,
  low_risky: 40,
  low_other: 60,
  default: 60,
} as const;

/** Thresholds for computeSubjectFit */
export const SUBJECT_FIT = {
  /** No subject data at all */
  noSubjectsScore: 55,
  /** Starting score */
  baseScore: 50,
  /** Bonus per enjoyed subject that maps to the career domain */
  enjoyedMatchBonus: 15,
  /** Bonus per good-at subject that maps to the career domain */
  goodAtMatchBonus: 12,
  /** Penalty per disliked subject that maps to the career domain */
  dislikedMatchPenalty: 15,
  /** Bonus when any subject signals are present */
  anySignalsBonus: 5,
} as const;

// ---------------------------------------------------------------------------
// penalties.ts parameters
// ---------------------------------------------------------------------------

/** Penalty severity values and thresholds */
export const PENALTIES = {
  duration: {
    /** Maximum severity cap */
    maxSeverity: 20,
    /** Severity points per year of overshoot */
    severityPerYear: 8,
  },
  financial: {
    /** Fixed severity for financial mismatch */
    severity: 10,
    /** Duration threshold (years) that triggers this penalty */
    durationThreshold: 4,
  },
  risk: {
    /** Fixed severity for risk mismatch */
    severity: 12,
  },
  familyExpectation: {
    /** Fixed severity for family expectation mismatch */
    severity: 8,
  },
} as const;

// ---------------------------------------------------------------------------
// confidence.ts parameters
// ---------------------------------------------------------------------------

/** Minimum counts for confidence checks */
export const CONFIDENCE = {
  minInterests: 3,
  minStrengths: 3,
  minValues: 3,
  minWorkstyle: 2,
  /** Default weight value — non-custom if all weights equal this */
  defaultWeight: 50,
  minSubjects: 3,
} as const;

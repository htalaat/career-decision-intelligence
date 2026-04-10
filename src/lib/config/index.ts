/**
 * Central config index — re-exports all configuration modules.
 * Import from here for convenience, or from individual modules for tree-shaking.
 */

// --- Mappings ---
export {
  MAPPINGS_VERSION,
  SUBJECT_TO_DOMAINS,
  DOMAIN_TO_CLUSTERS,
  GLOBAL_DOMAINS,
  STABLE_DOMAINS,
  PRESTIGE_DOMAINS,
  RISKY_DOMAINS,
  SAFE_DOMAINS,
  PENALTY_RISKY_DOMAINS,
  CONVENTIONAL_DOMAINS,
  STABLE_TAGS,
  FLEX_TAGS,
  CREATIVE_TAGS,
  IMPACT_TAGS,
} from "./mappings";

// --- Scoring ---
export {
  SCORING_VERSION,
  DIMENSION_WEIGHTS,
  TRAIT_OVERLAP,
  GOALS_FIT,
  FEASIBILITY,
  EDUCATION_FIT,
  COUNTRY_FIT,
  CLUSTER_REACTION_FIT,
  INCOME_POTENTIAL_MAP,
  STABILITY,
  FLEXIBILITY,
  PRESTIGE,
  CREATIVITY,
  IMPACT,
  DURATION_FIT,
  RISK_FIT,
  SUBJECT_FIT,
  PENALTIES,
  CONFIDENCE,
} from "./scoring";

// --- Content ---
export {
  CONTENT_VERSION,
  EXPLANATION_TEMPLATES,
  ACTION_PLAN_TEMPLATES,
  FACULTY_LABEL_MAP,
} from "./content";

// --- Onboarding ---
export {
  ONBOARDING_VERSION,
  ONBOARDING_STEPS,
  TOTAL_ONBOARDING_STEPS,
} from "./onboarding";

// --- Options (screens typically import from options.ts directly) ---
export * from "./options";

// --- Combined config fingerprint ---
import { SCORING_VERSION } from "./scoring";
import { CONTENT_VERSION } from "./content";
import { ONBOARDING_VERSION } from "./onboarding";
import { MAPPINGS_VERSION } from "./mappings";

/** Combined config version for audit trail */
export const CONFIG_VERSION = `scoring:${SCORING_VERSION}|content:${CONTENT_VERSION}|onboarding:${ONBOARDING_VERSION}|mappings:${MAPPINGS_VERSION}` as const;

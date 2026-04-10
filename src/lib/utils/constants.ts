// Re-export all options for backward compatibility
export {
  STAGE_OPTIONS,
  INTEREST_TRAITS,
  STRENGTH_TRAITS,
  VALUE_OPTIONS,
  WORKSTYLE_OPTIONS,
  READINESS_OPTIONS,
  DIRECTION_CLUSTERS,
  CLUSTER_REACTIONS,
  FACULTY_CLUSTERS,
  INTENDED_FIELDS,
  COUNTRIES,
  RELOCATION_OPTIONS,
  BUDGET_OPTIONS,
  FAMILY_OPTIONS,
  RISK_OPTIONS,
  STUDY_DURATION_OPTIONS,
  STUDY_COUNTRY_PREFERENCE,
  SCHOOL_SYSTEMS,
  CURRICULUM_LEVELS,
  SUBJECT_CATEGORIES,
} from "../config/options";

// Re-export onboarding flow config for backward compatibility
export {
  ONBOARDING_STEPS,
  TOTAL_ONBOARDING_STEPS,
} from "../config/onboarding";

/** "Not sure" options that can be added to chip groups */
export const UNCERTAINTY_CHIP = { key: "not_sure_yet", label: "I'm not sure yet \ud83e\udd37" } as const;

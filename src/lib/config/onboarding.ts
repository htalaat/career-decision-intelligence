/** Onboarding flow version identifier — high-school flow variant */
export const ONBOARDING_VERSION = "hs-v1" as const;

/** Onboarding step definitions in display order — 15 steps, high-school-only flow */
export const ONBOARDING_STEPS = [
  { key: "splash", label: "Intro", path: "/(onboarding)/splash" },
  { key: "welcome", label: "Name", path: "/(onboarding)/welcome" },
  { key: "school_system", label: "School", path: "/(onboarding)/school-system" },
  { key: "curriculum", label: "Level", path: "/(onboarding)/curriculum" },
  { key: "subjects", label: "Subjects", path: "/(onboarding)/subjects" },
  { key: "subject_feelings", label: "Feelings", path: "/(onboarding)/subject-feelings" },
  { key: "interests", label: "Interests", path: "/(onboarding)/interests" },
  { key: "strengths", label: "Strengths", path: "/(onboarding)/strengths" },
  { key: "values", label: "Values", path: "/(onboarding)/values" },
  { key: "workstyle", label: "Work style", path: "/(onboarding)/workstyle" },
  { key: "readiness", label: "Ready?", path: "/(onboarding)/readiness" },
  { key: "clusters", label: "Directions", path: "/(onboarding)/clusters" },
  { key: "country", label: "Location", path: "/(onboarding)/country" },
  { key: "money", label: "Budget", path: "/(onboarding)/money" },
  { key: "summary", label: "Summary", path: "/(onboarding)/summary" },
] as const;

/** Total number of onboarding steps */
export const TOTAL_ONBOARDING_STEPS = ONBOARDING_STEPS.length;

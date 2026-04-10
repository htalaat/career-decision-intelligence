// ============================================================
// mappings.ts — Single source of truth for shared mapping data
// used across the career-decision engine.
// ============================================================

// -----------------------------------------------------------
// 1. Subject-to-Domain mapping
// -----------------------------------------------------------

/** Maps school subjects to the career domains they are most relevant to. */
export const SUBJECT_TO_DOMAINS: Readonly<Record<string, readonly string[]>> = {
  physics: ["Engineering", "Technology"],
  chemistry: ["Healthcare", "Engineering"],
  biology: ["Healthcare"],
  environmental_science: ["Engineering"],
  computer_science: ["Technology"],
  math: ["Technology", "Finance", "Engineering"],
  further_math: ["Technology", "Finance", "Engineering"],
  statistics: ["Finance", "Technology"],
  english: ["Media/Comms", "Education", "Law/Policy"],
  arabic: ["Media/Comms", "Education"],
  french: ["Media/Comms", "Education"],
  spanish: ["Media/Comms", "Education"],
  german: ["Media/Comms", "Education"],
  other_language: ["Media/Comms", "Education"],
  history: ["Law/Policy", "Education"],
  geography: ["Engineering", "Education"],
  economics: ["Finance", "Business"],
  psychology: ["Healthcare", "Education"],
  sociology: ["Education", "Law/Policy"],
  political_science: ["Law/Policy"],
  philosophy: ["Law/Policy", "Education"],
  business_studies: ["Business", "Entrepreneurship"],
  accounting: ["Finance"],
  art: ["Design"],
  music: ["Media/Comms"],
  drama: ["Media/Comms"],
  design_tech: ["Design", "Engineering"],
  media_studies: ["Media/Comms", "Design"],
} as const;

// -----------------------------------------------------------
// 2. Domain-to-Cluster mapping
// -----------------------------------------------------------

/** Maps career domains to their relevant direction cluster keys. */
export const DOMAIN_TO_CLUSTERS: Readonly<Record<string, readonly string[]>> = {
  "Technology": ["tech_solving", "science_research"],
  "Business": ["business_money", "startup_create"],
  "Finance": ["business_money"],
  "Design": ["design_create"],
  "Healthcare": ["health_care", "science_research"],
  "Law/Policy": ["law_justice"],
  "Media/Comms": ["media_stories"],
  "Engineering": ["engineering_build", "science_research"],
  "Education": ["science_research"],
  "Entrepreneurship": ["startup_create", "business_money"],
} as const;

// -----------------------------------------------------------
// 3. Domain categories
// -----------------------------------------------------------

/** Domains that are accessible regardless of geographic location. */
export const GLOBAL_DOMAINS: readonly string[] = [
  "Technology",
  "Entrepreneurship",
] as const;

/** Domains associated with high job-market stability. */
export const STABLE_DOMAINS: readonly string[] = [
  "Healthcare",
  "Finance",
  "Engineering",
  "Law/Policy",
] as const;

/** Domains associated with social prestige or high earning potential. */
export const PRESTIGE_DOMAINS: readonly string[] = [
  "Law/Policy",
  "Finance",
  "Healthcare",
  "Technology",
] as const;

/**
 * Domains with higher career outcome uncertainty (score.ts definition).
 * Includes Design, unlike the penalty variant.
 */
export const RISKY_DOMAINS: readonly string[] = [
  "Entrepreneurship",
  "Media/Comms",
  "Design",
] as const;

/** Domains considered low-risk / safe career choices. */
export const SAFE_DOMAINS: readonly string[] = [
  "Healthcare",
  "Finance",
  "Engineering",
  "Law/Policy",
] as const;

/**
 * Domains with higher uncertainty used specifically in penalty calculation.
 * Narrower than RISKY_DOMAINS (excludes Design).
 */
export const PENALTY_RISKY_DOMAINS: readonly string[] = [
  "Entrepreneurship",
  "Media/Comms",
] as const;

/** Domains considered conventional/traditional by families and society. */
export const CONVENTIONAL_DOMAINS: readonly string[] = [
  "Healthcare",
  "Engineering",
  "Finance",
  "Law/Policy",
  "Business",
] as const;

// -----------------------------------------------------------
// 4. Tag categories
// -----------------------------------------------------------

/** Career tags that signal job-market stability. */
export const STABLE_TAGS: readonly string[] = [
  "stability",
  "organizational",
] as const;

/** Career tags that signal work-schedule flexibility or autonomy. */
export const FLEX_TAGS: readonly string[] = [
  "remote",
  "flexible_hours",
  "autonomy",
  "entrepreneurial",
] as const;

/** Career tags that signal creative or artistic work. */
export const CREATIVE_TAGS: readonly string[] = [
  "creative",
  "artistic",
  "innovative",
] as const;

/** Career tags that signal social impact or helping others. */
export const IMPACT_TAGS: readonly string[] = [
  "advocacy",
  "helping_others",
  "teaching",
  "social",
] as const;

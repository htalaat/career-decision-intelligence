/** Onboarding step definitions in display order */
export const ONBOARDING_STEPS = [
  { key: "welcome", label: "Welcome", path: "/(onboarding)/welcome" },
  { key: "trust", label: "Privacy", path: "/(onboarding)/trust" },
  { key: "stage", label: "Stage", path: "/(onboarding)/stage" },
  { key: "interests", label: "Interests", path: "/(onboarding)/interests" },
  { key: "strengths", label: "Strengths", path: "/(onboarding)/strengths" },
  { key: "values", label: "Values", path: "/(onboarding)/values" },
  { key: "workstyle", label: "Work style", path: "/(onboarding)/workstyle" },
  { key: "constraints", label: "Constraints", path: "/(onboarding)/constraints" },
  { key: "goals", label: "Priorities", path: "/(onboarding)/goals" },
  { key: "summary", label: "Summary", path: "/(onboarding)/summary" },
] as const;

export const TOTAL_ONBOARDING_STEPS = ONBOARDING_STEPS.length;

/** Interest trait options for onboarding */
export const INTEREST_TRAITS = [
  { key: "analytical", label: "Analyzing data and patterns" },
  { key: "creative", label: "Creating and designing" },
  { key: "social", label: "Working with people" },
  { key: "technical", label: "Building and coding" },
  { key: "leadership", label: "Leading teams" },
  { key: "research", label: "Research and discovery" },
  { key: "hands_on", label: "Hands-on practical work" },
  { key: "strategic", label: "Strategic planning" },
  { key: "writing", label: "Writing and communication" },
  { key: "teaching", label: "Teaching and mentoring" },
  { key: "problem_solving", label: "Solving complex problems" },
  { key: "entrepreneurial", label: "Starting new ventures" },
  { key: "scientific", label: "Scientific inquiry" },
  { key: "artistic", label: "Artistic expression" },
  { key: "organizational", label: "Organizing and managing" },
  { key: "advocacy", label: "Advocacy and social impact" },
] as const;

/** Strength trait options for onboarding */
export const STRENGTH_TRAITS = [
  { key: "problem_solving", label: "Problem solving" },
  { key: "communication", label: "Communication" },
  { key: "quantitative", label: "Numbers and data" },
  { key: "writing", label: "Writing" },
  { key: "teamwork", label: "Teamwork" },
  { key: "attention_to_detail", label: "Attention to detail" },
  { key: "adaptability", label: "Adaptability" },
  { key: "technical_skill", label: "Technical skills" },
  { key: "creativity", label: "Creative thinking" },
  { key: "leadership", label: "Leadership" },
  { key: "time_management", label: "Time management" },
  { key: "critical_thinking", label: "Critical thinking" },
  { key: "empathy", label: "Empathy" },
  { key: "negotiation", label: "Negotiation" },
  { key: "public_speaking", label: "Public speaking" },
  { key: "resilience", label: "Resilience under pressure" },
] as const;

/** Value options for onboarding */
export const VALUE_OPTIONS = [
  { key: "autonomy", label: "Independence and autonomy" },
  { key: "stability", label: "Job stability and security" },
  { key: "helping_others", label: "Helping others" },
  { key: "innovation", label: "Innovation and new ideas" },
  { key: "recognition", label: "Recognition and prestige" },
  { key: "work_life_balance", label: "Work-life balance" },
  { key: "financial_reward", label: "Financial reward" },
  { key: "intellectual_challenge", label: "Intellectual challenge" },
  { key: "community", label: "Community and belonging" },
  { key: "growth", label: "Personal growth" },
  { key: "legacy", label: "Leaving a legacy" },
  { key: "variety", label: "Variety in daily work" },
] as const;

/** Work-style options for onboarding */
export const WORKSTYLE_OPTIONS = [
  { key: "remote", label: "Remote / work from anywhere" },
  { key: "office", label: "Office-based team environment" },
  { key: "hybrid", label: "Hybrid mix" },
  { key: "solo", label: "Independent solo work" },
  { key: "collaborative", label: "Highly collaborative" },
  { key: "structured", label: "Structured and predictable" },
  { key: "dynamic", label: "Fast-paced and dynamic" },
  { key: "outdoor", label: "Outdoor or field-based" },
  { key: "travel", label: "Travel-heavy" },
  { key: "flexible_hours", label: "Flexible hours" },
] as const;

/** Life stage options */
export const STAGE_OPTIONS = [
  { value: "high_school", label: "High school student" },
  { value: "university", label: "University / college student" },
  { value: "recent_graduate", label: "Recent graduate" },
  { value: "career_changer", label: "Considering a career change" },
] as const;

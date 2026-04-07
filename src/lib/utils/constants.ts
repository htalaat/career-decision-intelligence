/** Onboarding step definitions in display order — expanded to 13 steps */
export const ONBOARDING_STEPS = [
  { key: "welcome", label: "Welcome", path: "/(onboarding)/welcome" },
  { key: "trust", label: "Privacy", path: "/(onboarding)/trust" },
  { key: "stage", label: "Stage", path: "/(onboarding)/stage" },
  { key: "academic", label: "Academic", path: "/(onboarding)/academic" },
  { key: "location", label: "Location", path: "/(onboarding)/location" },
  { key: "interests", label: "Interests", path: "/(onboarding)/interests" },
  { key: "strengths", label: "Strengths", path: "/(onboarding)/strengths" },
  { key: "values", label: "Values", path: "/(onboarding)/values" },
  { key: "workstyle", label: "Work style", path: "/(onboarding)/workstyle" },
  { key: "constraints", label: "Constraints", path: "/(onboarding)/constraints" },
  { key: "goals", label: "Priorities", path: "/(onboarding)/goals" },
  { key: "readiness", label: "Readiness", path: "/(onboarding)/readiness" },
  { key: "summary", label: "Summary", path: "/(onboarding)/summary" },
] as const;

export const TOTAL_ONBOARDING_STEPS = ONBOARDING_STEPS.length;

/** Life stage options */
export const STAGE_OPTIONS = [
  { value: "high_school", label: "High school student" },
  { value: "university", label: "University / college student" },
  { value: "recent_graduate", label: "Recent graduate" },
  { value: "career_changer", label: "Considering a career change" },
] as const;

/** Faculty cluster options — broad academic groupings */
export const FACULTY_CLUSTERS = [
  { key: "engineering_technology", label: "Engineering & Technology" },
  { key: "computer_science_it", label: "Computer Science & IT" },
  { key: "business_management", label: "Business & Management" },
  { key: "finance_economics", label: "Finance & Economics" },
  { key: "medicine_health", label: "Medicine & Health Sciences" },
  { key: "law_political_science", label: "Law & Political Science" },
  { key: "natural_sciences", label: "Natural Sciences (Biology, Chemistry, Physics)" },
  { key: "social_sciences", label: "Social Sciences & Psychology" },
  { key: "arts_design", label: "Arts, Design & Architecture" },
  { key: "media_communications", label: "Media & Communications" },
  { key: "education", label: "Education & Teaching" },
  { key: "humanities_languages", label: "Humanities & Languages" },
  { key: "environmental_agriculture", label: "Environmental Science & Agriculture" },
  { key: "undecided", label: "Haven't decided yet" },
] as const;

/** Intended field options — more specific than faculty clusters */
export const INTENDED_FIELDS = [
  { key: "software_engineering", label: "Software Engineering" },
  { key: "data_science_ai", label: "Data Science / AI" },
  { key: "cybersecurity", label: "Cybersecurity" },
  { key: "mechanical_engineering", label: "Mechanical Engineering" },
  { key: "civil_engineering", label: "Civil Engineering" },
  { key: "electrical_engineering", label: "Electrical Engineering" },
  { key: "medicine", label: "Medicine" },
  { key: "nursing", label: "Nursing" },
  { key: "pharmacy", label: "Pharmacy" },
  { key: "dentistry", label: "Dentistry" },
  { key: "accounting", label: "Accounting" },
  { key: "finance", label: "Finance" },
  { key: "marketing", label: "Marketing" },
  { key: "management", label: "Management / MBA track" },
  { key: "law", label: "Law" },
  { key: "psychology", label: "Psychology" },
  { key: "architecture", label: "Architecture" },
  { key: "graphic_design", label: "Graphic / Visual Design" },
  { key: "ux_design", label: "UX / Product Design" },
  { key: "journalism", label: "Journalism" },
  { key: "education_teaching", label: "Education / Teaching" },
  { key: "environmental_science", label: "Environmental Science" },
  { key: "economics", label: "Economics" },
  { key: "political_science", label: "Political Science" },
  { key: "biology", label: "Biology" },
  { key: "chemistry", label: "Chemistry" },
  { key: "physics", label: "Physics" },
  { key: "mathematics", label: "Mathematics" },
  { key: "other", label: "Other" },
  { key: "undecided", label: "Haven't decided yet" },
] as const;

/** Country options — focused set for prototype */
export const COUNTRIES = [
  { code: "EG", name: "Egypt" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "JO", name: "Jordan" },
  { code: "LB", name: "Lebanon" },
  { code: "KW", name: "Kuwait" },
  { code: "QA", name: "Qatar" },
  { code: "BH", name: "Bahrain" },
  { code: "OM", name: "Oman" },
  { code: "IQ", name: "Iraq" },
  { code: "MA", name: "Morocco" },
  { code: "TN", name: "Tunisia" },
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "CA", name: "Canada" },
  { code: "AU", name: "Australia" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "NL", name: "Netherlands" },
  { code: "MY", name: "Malaysia" },
  { code: "TR", name: "Turkey" },
  { code: "IN", name: "India" },
  { code: "PK", name: "Pakistan" },
  { code: "NG", name: "Nigeria" },
  { code: "KE", name: "Kenya" },
  { code: "ZA", name: "South Africa" },
  { code: "OTHER", name: "Other" },
] as const;

/** Relocation willingness options */
export const RELOCATION_OPTIONS = [
  { value: "no", label: "I want to stay where I am" },
  { value: "within_country", label: "I'd move within my country" },
  { value: "international", label: "I'm open to studying or working abroad" },
  { value: "flexible", label: "Fully flexible — wherever the best opportunity is" },
] as const;

/** Study duration tolerance options */
export const STUDY_DURATION_OPTIONS = [
  { value: "1", label: "1 year or less (certificate / bootcamp)" },
  { value: "2", label: "Up to 2 years (diploma / associate)" },
  { value: "3", label: "Up to 3 years" },
  { value: "4", label: "Up to 4 years (bachelor's degree)" },
  { value: "5", label: "Up to 5 years" },
  { value: "6", label: "Up to 6 years (bachelor's + master's)" },
  { value: "8", label: "Up to 8+ years (medicine / doctorate)" },
  { value: "flexible", label: "Duration doesn't matter to me" },
] as const;

/** Decision readiness options */
export const READINESS_OPTIONS = [
  { value: "exploring", label: "Just exploring — I have no idea what I want" },
  { value: "narrowing", label: "I have some ideas but need to narrow down" },
  { value: "validating", label: "I think I know what I want but need to validate" },
  { value: "ready_to_decide", label: "I'm ready to make a decision, I just need structure" },
] as const;

/** Target study country preference */
export const STUDY_COUNTRY_PREFERENCE = [
  { value: "home", label: "I prefer to study in my home country" },
  { value: "nearby", label: "I'd consider nearby countries" },
  { value: "international", label: "I'm open to studying internationally" },
  { value: "specific", label: "I have a specific country in mind" },
] as const;

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

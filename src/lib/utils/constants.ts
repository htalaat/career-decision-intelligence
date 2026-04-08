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

export const TOTAL_ONBOARDING_STEPS = ONBOARDING_STEPS.length;

/** Life stage options */
export const STAGE_OPTIONS = [
  { value: "high_school", label: "I'm in high school" },
  { value: "university", label: "I'm at university or college" },
  { value: "recent_graduate", label: "I just graduated" },
  { value: "career_changer", label: "I'm thinking about changing direction" },
] as const;

/** Interest trait options for onboarding — teen-friendly language */
export const INTEREST_TRAITS = [
  { key: "analytical", label: "Figuring out what numbers and data mean" },
  { key: "creative", label: "Making things look and feel amazing" },
  { key: "social", label: "Being around people and helping them" },
  { key: "technical", label: "Building apps, websites, or tech stuff" },
  { key: "leadership", label: "Taking charge and organizing people" },
  { key: "research", label: "Digging deep to find out how things work" },
  { key: "hands_on", label: "Working with your hands or building real things" },
  { key: "strategic", label: "Thinking about the big picture and making plans" },
  { key: "writing", label: "Expressing ideas through writing or speaking" },
  { key: "teaching", label: "Helping others learn and grow" },
  { key: "problem_solving", label: "Working through tough problems step by step" },
  { key: "entrepreneurial", label: "Coming up with ideas and making them real" },
  { key: "scientific", label: "Running experiments and testing ideas" },
  { key: "artistic", label: "Creating art, music, or visual content" },
  { key: "organizational", label: "Keeping things running smoothly" },
  { key: "advocacy", label: "Standing up for causes you believe in" },
] as const;

/** Strength trait options for onboarding — teen-friendly language */
export const STRENGTH_TRAITS = [
  { key: "problem_solving", label: "Finding solutions when things get stuck" },
  { key: "communication", label: "Explaining things so people actually get it" },
  { key: "quantitative", label: "Being comfortable with math and numbers" },
  { key: "writing", label: "Writing clearly and persuasively" },
  { key: "teamwork", label: "Working well in groups" },
  { key: "attention_to_detail", label: "Catching the small stuff others miss" },
  { key: "adaptability", label: "Rolling with changes easily" },
  { key: "technical_skill", label: "Picking up tech and tools quickly" },
  { key: "creativity", label: "Coming up with ideas others don't think of" },
  { key: "leadership", label: "Getting people to follow your lead" },
  { key: "time_management", label: "Getting things done on time" },
  { key: "critical_thinking", label: "Questioning things and thinking independently" },
  { key: "empathy", label: "Understanding how others feel" },
  { key: "negotiation", label: "Getting people to agree or compromise" },
  { key: "public_speaking", label: "Speaking confidently in front of others" },
  { key: "resilience", label: "Bouncing back when things don't work out" },
] as const;

/** Value options for onboarding — teen-friendly language */
export const VALUE_OPTIONS = [
  { key: "autonomy", label: "Freedom to do things my own way" },
  { key: "stability", label: "Knowing my job is safe and steady" },
  { key: "helping_others", label: "Making a real difference in people's lives" },
  { key: "innovation", label: "Working on things that haven't been done before" },
  { key: "recognition", label: "Being respected for what I do" },
  { key: "work_life_balance", label: "Having time for life outside of work" },
  { key: "financial_reward", label: "Earning good money" },
  { key: "intellectual_challenge", label: "Always learning and growing" },
  { key: "community", label: "Being part of a team or community" },
  { key: "growth", label: "Becoming a better version of myself" },
  { key: "legacy", label: "Building something that lasts" },
  { key: "variety", label: "Every day being different" },
] as const;

/** Work-style options for onboarding — teen-friendly language */
export const WORKSTYLE_OPTIONS = [
  { key: "remote", label: "Working from anywhere I want" },
  { key: "office", label: "Going to an office with a team" },
  { key: "hybrid", label: "Mix of home and office" },
  { key: "solo", label: "Working mostly on my own" },
  { key: "collaborative", label: "Brainstorming and building with others" },
  { key: "structured", label: "Knowing exactly what to expect each day" },
  { key: "dynamic", label: "Fast-paced with lots going on" },
  { key: "outdoor", label: "Being outside, not stuck at a desk" },
  { key: "travel", label: "Traveling to different places for work" },
  { key: "flexible_hours", label: "Setting my own schedule" },
] as const;

/** Decision readiness options */
export const READINESS_OPTIONS = [
  { value: "exploring", label: "Just exploring \u2014 I have no idea yet \ud83e\udd37" },
  { value: "narrowing", label: "I have some ideas but need to narrow down \ud83e\udd14" },
  { value: "validating", label: "I think I know but want to make sure \u2705" },
  { value: "ready_to_decide", label: "I'm ready to decide, just need structure \ud83c\udfaf" },
] as const;

/** Direction clusters \u2014 broad groupings shown before specific careers */
export const DIRECTION_CLUSTERS = [
  { key: "tech_solving", label: "Technology & Problem Solving", emoji: "\ud83d\udcbb", color: "#6C5CE7", domains: ["Technology"] },
  { key: "business_money", label: "Business, Finance & Strategy", emoji: "\ud83d\udcca", color: "#0984E3", domains: ["Business", "Finance"] },
  { key: "design_create", label: "Design & Creative Work", emoji: "\ud83c\udfa8", color: "#FD79A8", domains: ["Design"] },
  { key: "health_care", label: "Health & Helping People", emoji: "\ud83c\udfe5", color: "#00CEC9", domains: ["Healthcare"] },
  { key: "law_justice", label: "Law, Justice & Public Policy", emoji: "\u2696\ufe0f", color: "#E17055", domains: ["Law/Policy"] },
  { key: "media_stories", label: "Media, Content & Communication", emoji: "\ud83d\udcf1", color: "#FDCB6E", domains: ["Media/Comms"] },
  { key: "engineering_build", label: "Engineering & Building Systems", emoji: "\ud83d\udd27", color: "#00B894", domains: ["Engineering"] },
  { key: "science_research", label: "Science & Research", emoji: "\ud83d\udd2c", color: "#A29BFE", domains: ["Healthcare", "Engineering", "Education", "Technology"] },
  { key: "startup_create", label: "Starting & Growing Businesses", emoji: "\ud83d\ude80", color: "#FF6348", domains: ["Entrepreneurship", "Business"] },
] as const;

/** Cluster reaction options */
export const CLUSTER_REACTIONS = [
  { value: "feels_like_me", label: "This feels like me", emoji: "\ud83d\udcaa" },
  { value: "explore", label: "I want to explore this", emoji: "\ud83d\udd0d" },
  { value: "surprised", label: "This surprised me", emoji: "\ud83d\ude2e" },
  { value: "not_for_me", label: "Not for me", emoji: "\ud83d\udc4b" },
  { value: "not_sure", label: "I'm not sure yet", emoji: "\ud83e\udd37" },
] as const;

/** "Not sure" options that can be added to chip groups */
export const UNCERTAINTY_CHIP = { key: "not_sure_yet", label: "I'm not sure yet \ud83e\udd37" } as const;

/** Faculty cluster options \u2014 broad academic groupings */
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

/** Intended field options \u2014 more specific than faculty clusters */
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

/** Country options — comprehensive list, priority countries first */
export const COUNTRIES = [
  // Priority countries (most relevant for target users)
  { code: "EG", name: "Egypt" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "GB", name: "United Kingdom" },
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "DE", name: "Germany" },
  // Middle East & North Africa
  { code: "JO", name: "Jordan" },
  { code: "LB", name: "Lebanon" },
  { code: "KW", name: "Kuwait" },
  { code: "QA", name: "Qatar" },
  { code: "BH", name: "Bahrain" },
  { code: "OM", name: "Oman" },
  { code: "IQ", name: "Iraq" },
  { code: "YE", name: "Yemen" },
  { code: "SY", name: "Syria" },
  { code: "PS", name: "Palestine" },
  { code: "MA", name: "Morocco" },
  { code: "TN", name: "Tunisia" },
  { code: "DZ", name: "Algeria" },
  { code: "LY", name: "Libya" },
  { code: "SD", name: "Sudan" },
  // Europe
  { code: "FR", name: "France" },
  { code: "NL", name: "Netherlands" },
  { code: "IT", name: "Italy" },
  { code: "ES", name: "Spain" },
  { code: "SE", name: "Sweden" },
  { code: "NO", name: "Norway" },
  { code: "DK", name: "Denmark" },
  { code: "FI", name: "Finland" },
  { code: "CH", name: "Switzerland" },
  { code: "AT", name: "Austria" },
  { code: "BE", name: "Belgium" },
  { code: "PT", name: "Portugal" },
  { code: "PL", name: "Poland" },
  { code: "CZ", name: "Czech Republic" },
  { code: "HU", name: "Hungary" },
  { code: "RO", name: "Romania" },
  { code: "GR", name: "Greece" },
  { code: "IE", name: "Ireland" },
  { code: "RU", name: "Russia" },
  { code: "UA", name: "Ukraine" },
  { code: "TR", name: "Turkey" },
  // Asia Pacific
  { code: "IN", name: "India" },
  { code: "CN", name: "China" },
  { code: "JP", name: "Japan" },
  { code: "KR", name: "South Korea" },
  { code: "AU", name: "Australia" },
  { code: "NZ", name: "New Zealand" },
  { code: "SG", name: "Singapore" },
  { code: "MY", name: "Malaysia" },
  { code: "ID", name: "Indonesia" },
  { code: "PH", name: "Philippines" },
  { code: "TH", name: "Thailand" },
  { code: "VN", name: "Vietnam" },
  { code: "PK", name: "Pakistan" },
  { code: "BD", name: "Bangladesh" },
  { code: "LK", name: "Sri Lanka" },
  { code: "NP", name: "Nepal" },
  { code: "AF", name: "Afghanistan" },
  { code: "IR", name: "Iran" },
  { code: "KZ", name: "Kazakhstan" },
  { code: "UZ", name: "Uzbekistan" },
  { code: "HK", name: "Hong Kong" },
  { code: "TW", name: "Taiwan" },
  // Americas
  { code: "MX", name: "Mexico" },
  { code: "BR", name: "Brazil" },
  { code: "AR", name: "Argentina" },
  { code: "CO", name: "Colombia" },
  { code: "CL", name: "Chile" },
  { code: "PE", name: "Peru" },
  { code: "VE", name: "Venezuela" },
  { code: "EC", name: "Ecuador" },
  { code: "UY", name: "Uruguay" },
  { code: "BO", name: "Bolivia" },
  { code: "PY", name: "Paraguay" },
  // Africa (sub-Saharan)
  { code: "NG", name: "Nigeria" },
  { code: "KE", name: "Kenya" },
  { code: "ZA", name: "South Africa" },
  { code: "GH", name: "Ghana" },
  { code: "ET", name: "Ethiopia" },
  { code: "TZ", name: "Tanzania" },
  { code: "UG", name: "Uganda" },
  { code: "RW", name: "Rwanda" },
  { code: "SN", name: "Senegal" },
  { code: "CI", name: "Ivory Coast" },
  { code: "CM", name: "Cameroon" },
  { code: "ZM", name: "Zambia" },
  { code: "ZW", name: "Zimbabwe" },
  { code: "MZ", name: "Mozambique" },
  { code: "MG", name: "Madagascar" },
  // Other
  { code: "OTHER", name: "Other" },
] as const;

/** Relocation willingness options */
export const RELOCATION_OPTIONS = [
  { value: "no", label: "I want to stay where I am" },
  { value: "within_country", label: "I'd move within my country" },
  { value: "international", label: "I'm open to studying or working abroad" },
  { value: "flexible", label: "Fully flexible \u2014 wherever the best opportunity is" },
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

/** Target study country preference */
export const STUDY_COUNTRY_PREFERENCE = [
  { value: "home", label: "I prefer to study in my home country" },
  { value: "nearby", label: "I'd consider nearby countries" },
  { value: "international", label: "I'm open to studying internationally" },
  { value: "specific", label: "I have a specific country in mind" },
] as const;

/** School system options for high-school users */
export const SCHOOL_SYSTEMS = [
  { value: "british", label: "British / Cambridge", emoji: "🇬🇧", helper: "IGCSE, AS Level, A Level" },
  { value: "ib", label: "IB (International Baccalaureate)", emoji: "🌍", helper: "MYP or Diploma Programme" },
  { value: "american", label: "American", emoji: "🇺🇸", helper: "High school, AP, Honors" },
  { value: "national", label: "National curriculum", emoji: "📚", helper: "Your country's school system" },
  { value: "other", label: "Other / homeschool", emoji: "🏠", helper: "" },
  { value: "not_sure", label: "I'm not sure", emoji: "🤷", helper: "That's okay — we'll figure it out" },
] as const;

/** Curriculum level options — shown based on school system selection */
export const CURRICULUM_LEVELS = {
  british: [
    { value: "gcse", label: "GCSE / IGCSE", helper: "Usually ages 14-16" },
    { value: "as_level", label: "AS Level", helper: "Usually age 17" },
    { value: "a_level", label: "A Level", helper: "Usually age 17-18" },
  ],
  ib: [
    { value: "myp", label: "MYP (Middle Years Programme)", helper: "Usually ages 11-16" },
    { value: "dp", label: "Diploma Programme (DP)", helper: "Usually ages 16-19" },
  ],
  american: [
    { value: "regular", label: "Regular classes", helper: "Standard high school courses" },
    { value: "honors", label: "Honors classes", helper: "Advanced but not AP" },
    { value: "ap", label: "AP (Advanced Placement)", helper: "College-level courses" },
  ],
} as const;

/** Subject options grouped by category — for high school students */
export const SUBJECT_CATEGORIES = [
  {
    category: "Sciences",
    emoji: "🔬",
    subjects: [
      { key: "physics", label: "Physics" },
      { key: "chemistry", label: "Chemistry" },
      { key: "biology", label: "Biology" },
      { key: "environmental_science", label: "Environmental Science" },
      { key: "computer_science", label: "Computer Science" },
    ],
  },
  {
    category: "Mathematics",
    emoji: "📐",
    subjects: [
      { key: "math", label: "Mathematics" },
      { key: "further_math", label: "Further / Advanced Math" },
      { key: "statistics", label: "Statistics" },
    ],
  },
  {
    category: "Languages & Literature",
    emoji: "📖",
    subjects: [
      { key: "english", label: "English" },
      { key: "arabic", label: "Arabic" },
      { key: "french", label: "French" },
      { key: "spanish", label: "Spanish" },
      { key: "german", label: "German" },
      { key: "other_language", label: "Other language" },
    ],
  },
  {
    category: "Humanities & Social Sciences",
    emoji: "🌍",
    subjects: [
      { key: "history", label: "History" },
      { key: "geography", label: "Geography" },
      { key: "economics", label: "Economics" },
      { key: "psychology", label: "Psychology" },
      { key: "sociology", label: "Sociology" },
      { key: "political_science", label: "Politics / Government" },
      { key: "philosophy", label: "Philosophy" },
    ],
  },
  {
    category: "Business & Finance",
    emoji: "💼",
    subjects: [
      { key: "business_studies", label: "Business Studies" },
      { key: "accounting", label: "Accounting" },
    ],
  },
  {
    category: "Arts & Design",
    emoji: "🎨",
    subjects: [
      { key: "art", label: "Art & Design" },
      { key: "music", label: "Music" },
      { key: "drama", label: "Drama / Theatre" },
      { key: "design_tech", label: "Design & Technology" },
      { key: "media_studies", label: "Media Studies" },
    ],
  },
] as const;

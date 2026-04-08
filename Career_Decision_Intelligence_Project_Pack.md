# Career Decision Intelligence — Project Pack
Version: v0.1
Date: 2026-04-06
Prepared by: ChatGPT
Governing standard: CRAFT App Factory Canon V3.1
Project mode: Prototype leading to Pilot
Primary build target: Responsive web application (desktop + mobile web), architected for later native packaging
Primary implementation target for Claude Code: Next.js + TypeScript + Tailwind + componentized decision engine + Supabase/Postgres

---

## 0. Why this document exists

This document consolidates the prior Career Decision Intelligence work into a clean builder-ready pack that can be handed to Claude Code or a human developer. It intentionally resets from the earlier long brainstorm thread and excludes the final mixed section that the user flagged as unreliable.

Where prior discussion was incomplete, this pack makes explicit implementation decisions so development can start. Those decisions are marked as **assumed for build** and can be revised later without breaking the core product.

---

## 1. One-line product definition

A secure career decision platform that helps a student move from uncertainty to a structured, defensible career decision through guided self-discovery, option comparison, fit scoring, and action planning.

---

## 2. Executive summary

The product is not a generic job board and not a chatbot-first guidance tool. It is a decision system.

Its core value is to turn messy, emotional, fragmented career thinking into a structured process:
- understand who the student is
- capture goals, constraints, and preferences
- evaluate paths in a consistent framework
- compare options side by side
- reveal trade-offs clearly
- produce a decision and next-step plan

The product should be built **AI-optional, not AI-dependent**. The first implementation should work deterministically using structured inputs, transparent logic, and explainable scoring. AI can be layered later for coaching, summarization, or conversational guidance, but the foundation should remain usable even with AI disabled.

---

## 3. Product thesis

### 3.1 Problem
Students often choose majors, paths, internships, certifications, or career directions with:
- incomplete self-understanding
- inconsistent advice
- family/social pressure
- fragmented information
- no disciplined comparison method
- no retained decision record

Most existing tools are weak because they do one of four things:
- dump generic personality tests
- dump occupation data
- offer vague mentoring
- simulate intelligence through chat without decision rigor

### 3.2 Why this matters
A poor decision can cost years of time, money, confidence, and momentum. The product should help users make choices they can explain, trust, revisit, and improve over time.

### 3.3 Strategic differentiation
The differentiation is not “more AI.”
The differentiation is:
- decision architecture over content dumping
- structure over hype
- transparency over black-box recommendations
- security and trust by design
- student-centered journey with explainable outcomes
- optional persona adaptation without compromising core logic

### 3.4 Product philosophy
- Start with guided structure, not open-ended chat.
- Keep all recommendations explainable.
- Do not require AI for the product to be useful.
- Design for trust, clarity, and repeatability.
- Keep sensitive data minimized and controllable.
- Make the product feel calm, premium, and credible.

---

## 4. Target users and actors

## 4.1 Primary user
### Student / early-career decision maker
A user trying to decide among majors, professions, tracks, industries, or next educational/career moves.

Common states:
- “I do not know what fits me.”
- “I have too many options.”
- “I know what I like, but I do not know what it leads to.”
- “I am torn between security, prestige, money, passion, and ability.”
- “I need clarity before choosing a path.”

## 4.2 Secondary users
### Parent or sponsor
May influence the decision. Should not control the student experience by default. Possible later role.

### Counselor / advisor
Could review a student’s decision map and action plan in later versions.

### Platform admin
Manages content, pathways, taxonomy, and guardrails.

---

## 5. Core jobs to be done

The platform should help the student:
1. Understand themselves in a structured way.
2. Surface what matters most in their decision.
3. Explore plausible career/education paths.
4. Compare options against personal priorities and constraints.
5. See why one path ranks above another.
6. Save, revisit, and refine the decision over time.
7. Leave with a next-step roadmap.

---

## 6. Product principles

1. **Secure by default**  
   Minimize personal data, encrypt sensitive fields, clear consent, export/delete controls.

2. **Deterministic first**  
   All core flows must function without AI.

3. **Explainable recommendations**  
   Every ranking or score must be traceable to visible inputs and rules.

4. **Progressive disclosure**  
   Ask only what is needed at each step.

5. **Respect emotional reality**  
   Career decisions are not purely rational; the UX should acknowledge uncertainty.

6. **Conversation tone without chatbot dependency**  
   The product can feel warm and human, but must not depend on a chat UI.

7. **No fake certainty**  
   Present confidence ranges, trade-offs, and assumptions.

---

## 7. Assumed build decisions

These are explicit assumptions made now so development can start.

### 7.1 Build target
**Assumed for build:** responsive web app first.

Reason:
- fastest to prototype
- easiest secure distribution
- easy review and iteration
- later can be wrapped as native if needed

### 7.2 Authentication
**Assumed for build:** email magic link or passwordless auth.

Reason:
- low friction
- avoids overbuilding identity early
- suitable for student onboarding

### 7.3 AI posture
**Assumed for build:** AI disabled in MVP core path.  
Optional AI hooks may be scaffolded but off by default.

### 7.4 Recommendation engine
**Assumed for build:** rules + weighted scoring engine using structured profile inputs, preferences, constraints, and career metadata.

### 7.5 Data source strategy
**Assumed for build:** curated internal data model with mock/seed career options for prototype. No live third-party career API in first build.

---

## 8. In scope / out of scope

## 8.1 In scope for MVP
- secure user onboarding
- first-name / preferred name capture
- guided student profile creation
- preference and priority capture
- constraints capture
- values/interests/strengths workflow
- career path library with seeded options
- fit scoring engine
- option comparison workspace
- explanation layer showing why scores were assigned
- decision summary
- action plan output
- dashboard with saved progress
- admin content management for careers/taxonomy (basic)

## 8.2 Out of scope for MVP
- live university admissions integration
- live labor market feeds
- psychometric certification-grade testing
- mentor marketplace
- parent portal
- counselor collaboration workspace
- native mobile app
- multilingual support
- fully conversational AI coach
- payments/subscriptions
- enterprise B2B dashboard

---

## 9. User experience shape

The product should feel like:
- a premium guided assessment studio
- a private decision workspace
- a calm strategy tool
- not a noisy edtech portal
- not a social network
- not a generic chatbot

Visual tone:
- clean
- premium
- modern
- high trust
- emotionally calm
- focused

---

## 10. Core end-to-end workflow

## 10.1 Workflow A — first-time onboarding
1. Landing / welcome
2. Explain what the product does in plain language
3. Ask: “What should we call you?” with:
   - first name
   - preferred nickname (optional)
4. Create account / sign in
5. Show privacy and trust notice
6. Start profile setup

## 10.2 Workflow B — build the self profile
1. Capture current stage:
   - high school
   - university
   - recent graduate
   - career changer
2. Capture academic context
3. Capture interests
4. Capture strengths / self-rated abilities
5. Capture work-style preferences
6. Capture values
7. Capture constraints:
   - finances
   - location
   - family pressure
   - study length tolerance
   - risk tolerance
8. Capture goals:
   - income
   - stability
   - prestige
   - impact
   - creativity
   - flexibility
9. Save and compute decision profile

## 10.3 Workflow C — explore paths
1. Present recommended paths
2. Let user filter by domain, duration, income potential, fit type, etc.
3. Show each option as structured card:
   - title
   - category
   - why it fits
   - watch-outs
   - key requirement
   - confidence indicator
4. Save shortlisted options

## 10.4 Workflow D — compare options
1. Select 2–5 options
2. Show side-by-side comparison table
3. Show category-level scoring:
   - interest fit
   - strength fit
   - values alignment
   - lifestyle fit
   - risk profile fit
   - practical feasibility
4. Show trade-offs
5. Let user adjust weights and see ranking update

## 10.5 Workflow E — decision board
1. User selects a preferred path
2. System generates:
   - reasons for fit
   - major risks
   - unresolved questions
   - next actions
3. User can mark:
   - decided
   - leaning
   - still exploring
4. Save timestamped decision snapshot

## 10.6 Workflow F — action plan
1. Generate action plan
2. Break into:
   - next 7 days
   - next 30 days
   - next 90 days
3. Track progress with checklist

---

## 11. Screen map

1. Landing / marketing shell
2. Sign in / sign up
3. Welcome / name capture
4. Privacy / trust notice
5. Onboarding stepper
6. Interests screen
7. Strengths screen
8. Values screen
9. Work-style preferences screen
10. Constraints screen
11. Goals / priorities weighting screen
12. Profile summary screen
13. Recommendations dashboard
14. Career option detail screen
15. Compare options screen
16. Decision board screen
17. Action plan screen
18. Saved decisions history screen
19. Account / privacy controls
20. Admin taxonomy / content console

---

## 12. Functional modules

## 12.1 Identity and access
- auth
- session management
- onboarding status
- role flag

## 12.2 Profile engine
- student profile entity
- profile completion state
- answer versioning
- recalculation trigger

## 12.3 Decision engine
- weighted scoring
- rank generation
- explanation generation
- constraint penalties
- confidence metadata

## 12.4 Content library
- career paths
- tags
- domains
- education requirements
- traits
- constraints compatibility
- seeded narrative explanations

## 12.5 Compare and decide
- shortlist
- compare board
- weight adjustments
- scenario save

## 12.6 Action planning
- recommendations to actions
- milestones
- task status

## 12.7 Trust and privacy
- consent logging
- export
- delete account
- data retention controls

## 12.8 Admin
- manage taxonomy
- manage path records
- manage scoring mappings
- seed/update content

---

## 13. Business rules

1. A user cannot receive final ranked recommendations until minimum onboarding completion threshold is met.
2. Preferred name is optional, but first name or equivalent display name is required.
3. The system must preserve the user’s original answers and recalculation history.
4. Every score shown to the user must map to stored inputs and scoring rules.
5. Constraints may reduce ranking but should not silently remove options unless explicitly blocked.
6. The system should show “why recommended” and “what to validate” for every top option.
7. Users may revisit and reweight priorities without deleting prior scenarios.
8. Any AI-generated text, if later enabled, must be labeled and non-authoritative.
9. Sensitive data collection must be minimized. No unnecessary demographic capture in MVP.
10. Admin changes to scoring logic must be versioned.

---

## 14. Data model (logical)

## 14.1 Core entities

### User
- id
- email
- first_name
- preferred_name
- role
- created_at
- last_active_at

### StudentProfile
- id
- user_id
- current_stage
- academic_context
- summary_status
- completion_percent
- latest_version

### ProfileAnswer
- id
- profile_id
- question_key
- answer_value_json
- version
- created_at

### PreferenceWeights
- id
- profile_id
- income_weight
- stability_weight
- flexibility_weight
- prestige_weight
- creativity_weight
- impact_weight
- study_duration_weight
- risk_weight

### ConstraintSet
- id
- profile_id
- financial_constraint_level
- location_constraint
- family_expectation_level
- max_study_duration
- risk_tolerance
- notes

### CareerPath
- id
- slug
- title
- domain
- summary
- education_path
- typical_duration
- tags
- metadata_json
- active

### CareerTraitMapping
- id
- career_path_id
- trait_key
- weight
- rationale

### RecommendationRun
- id
- profile_id
- scoring_model_version
- run_type
- created_at

### RecommendationItem
- id
- recommendation_run_id
- career_path_id
- overall_score
- confidence_score
- explanation_json
- penalties_json
- rank

### ShortlistItem
- id
- user_id
- career_path_id
- created_at

### ComparisonScenario
- id
- user_id
- title
- selected_path_ids_json
- custom_weights_json
- result_snapshot_json
- created_at

### DecisionSnapshot
- id
- user_id
- chosen_career_path_id
- status
- summary_json
- created_at

### ActionPlan
- id
- decision_snapshot_id
- plan_json
- created_at

### ConsentLog
- id
- user_id
- consent_type
- consent_version
- created_at

### AdminAuditLog
- id
- actor_user_id
- object_type
- object_id
- action
- payload_json
- created_at

---

## 15. Decision engine design

## 15.1 Engine objective
Produce a ranked list of plausible paths based on explicit user inputs and transparent rules.

## 15.2 Inputs
- interest indicators
- strengths
- values
- work preferences
- decision weights
- constraints
- stage context

## 15.3 Outputs
- ranked options
- score breakdown
- penalties / conflicts
- confidence / completeness signal
- narrative explanation

## 15.4 Example scoring structure
Overall score = weighted composite of:
- interest fit: 25%
- strength fit: 20%
- values alignment: 20%
- work-style fit: 10%
- goals alignment: 15%
- practical feasibility: 10%

Then apply penalties:
- duration mismatch
- financial mismatch
- location mismatch
- low-confidence due to incomplete inputs

## 15.5 Explainability requirement
For each recommendation item, store:
- top positive drivers
- top negative drivers
- missing information
- recommended validation questions

---

## 16. Architecture

## 16.1 Recommended stack
**Frontend**
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Hook Form + Zod
- Zustand or TanStack Query where useful

**Backend**
- Supabase Auth
- Postgres
- Row-level security
- Supabase storage only if needed for exports later
- Edge functions only where needed

**Why this stack**
- fast prototype speed
- secure auth and database
- good developer ergonomics
- easy deployment
- easy auditability

## 16.2 High-level architecture
1. Client renders onboarding, dashboard, comparison, and decision flows.
2. Auth secures user session.
3. Profile answers stored in Postgres.
4. Deterministic decision engine runs server-side through application service layer.
5. Results stored as immutable recommendation runs.
6. UI reads structured results and explanation payloads.
7. Admin console manages path library and scoring mappings.

## 16.3 Application layers
### Presentation layer
Pages, forms, dashboards, comparisons, account settings

### Domain layer
Profile logic, scoring logic, recommendation service, scenario comparison, decision summary

### Data layer
Repositories for users, profiles, career paths, scoring rules, runs, decisions

### Security layer
Auth, RLS, audit logs, consent, export/delete workflows

## 16.4 Security requirements
- row-level security on user-owned records
- no client direct write bypass
- server-side validation for all score recalculations
- encrypt secrets outside repo
- strict admin roles
- privacy policy and data controls visible in app
- avoid storing unnecessary sensitive categories
- audit admin scoring changes

## 16.5 Performance targets
Prototype targets:
- onboarding step save under 500 ms perceived response on typical broadband
- recommendation generation under 2 seconds for seeded dataset
- comparison screen load under 1 second for cached scenario

---

## 17. API / service contract (logical)

## 17.1 Auth
- POST /auth/sign-in
- POST /auth/sign-out
- GET /me

## 17.2 Profile
- GET /profile
- POST /profile/start
- PATCH /profile/answers
- PATCH /profile/weights
- PATCH /profile/constraints
- GET /profile/summary

## 17.3 Recommendations
- POST /recommendations/run
- GET /recommendations/latest
- GET /recommendations/:runId

## 17.4 Shortlist / compare
- POST /shortlist
- DELETE /shortlist/:id
- POST /compare/scenarios
- GET /compare/scenarios/:id

## 17.5 Decision
- POST /decision/snapshot
- GET /decision/history
- POST /decision/:id/action-plan

## 17.6 Privacy
- GET /privacy/export
- POST /privacy/delete-request
- GET /consents

## 17.7 Admin
- GET /admin/career-paths
- POST /admin/career-paths
- PATCH /admin/career-paths/:id
- GET /admin/scoring-rules
- PATCH /admin/scoring-rules/:id

---

## 18. UX requirements

1. Use a stepper for onboarding.
2. Keep one primary action per screen.
3. Always show progress during profile creation.
4. Use plain language, not psych jargon.
5. Every recommendation card needs:
   - fit reason
   - caution
   - confidence
   - learn more
6. Comparison must feel analytical, not decorative.
7. Decision board must reduce anxiety, not amplify it.
8. Privacy controls must be accessible from account settings at all times.
9. Use the user’s preferred name after onboarding.

---

## 19. Suggested design system direction

- Neutral premium palette
- Calm background, strong readable contrast
- Card-based layout
- Large spacing, low clutter
- Strong information hierarchy
- Accessible forms
- Light motion only where useful
- Charts/tables should communicate trade-offs clearly
- No childish career-test aesthetics

Suggested emotional benchmark:
- “serious but supportive”
- “private strategy room”
- “premium guidance, not internet quiz”

---

## 20. Seed content needed for prototype

1. 25–40 career paths
2. path taxonomy by domain
3. trait-to-career mapping table
4. sample explanations
5. onboarding question bank
6. priority weighting definitions
7. action-plan templates

Suggested initial domains:
- technology
- finance
- healthcare
- design
- business/management
- law/policy
- education
- media/communications
- entrepreneurship
- engineering

---

## 21. MVP build phases

## Phase 1 — foundation
- app shell
- auth
- onboarding stepper
- profile entities
- seed data
- admin seed import path

## Phase 2 — core intelligence
- deterministic scoring engine
- recommendation results
- explanation payloads
- shortlist

## Phase 3 — decision workflow
- compare screen
- weight adjustment
- decision board
- action plan

## Phase 4 — trust hardening
- account settings
- export/delete controls
- admin audit trail
- copy polish
- QA pass

---

## 22. Demo flow / wow moments

### Wow moment 1
A student completes the guided profile and receives a ranked set of paths that feel tailored and explainable.

### Wow moment 2
The compare screen shows how changing what matters most changes the ranking, making trade-offs visible instead of hidden.

### Wow moment 3
The decision board produces a credible “why this path / what to validate next” summary with an action plan.

---

## 23. Open questions

These should not block the build but must remain visible:
1. Should the first public version support only students, or also career changers?
2. Should path data stay fully curated in-house or later integrate external datasets?
3. Is the first distribution B2C direct-to-student, school partnership, or counselor-led?
4. Should onboarding include family influence explicitly in MVP?
5. Should action plans be editable manually by users from day one?
6. What level of analytics should admins see in pilot mode?
7. When AI is introduced later, where should it be allowed and where must it stay prohibited?

---

## 24. Risks and mitigations

### Risk 1 — Product feels like a quiz
Mitigation: keep the outcome anchored in comparison, trade-offs, and action planning, not test labels.

### Risk 2 — Recommendation trust is weak
Mitigation: expose scoring factors and rationale clearly.

### Risk 3 — Overcollection of personal data
Mitigation: minimize fields, use explicit consent, and provide deletion/export.

### Risk 4 — AI pressure derails clarity
Mitigation: preserve deterministic core and treat AI as assistive only.

### Risk 5 — Seed data quality is too thin
Mitigation: start with a limited but well-authored set of career paths rather than a huge shallow dataset.

---

## 25. What Claude Code should build first

1. Project scaffold and design system foundation
2. Auth + onboarding flow with preferred-name capture
3. Profile data model + seed question bank
4. Seed career library + scoring mappings
5. Deterministic recommendation engine
6. Recommendation dashboard + detail pages
7. Compare experience
8. Decision board + action plan
9. Privacy controls + admin console basics

---

## 26. Builder notes

- The user explicitly wanted a clean restart from the long prior thread.
- The final mixed section from the previous conversation should not be treated as authoritative.
- Build the platform as secure, premium, structured, and non-hype.
- Do not force chatbot UX into the core path.
- Treat AI as optional.
- Preserve explainability everywhere.

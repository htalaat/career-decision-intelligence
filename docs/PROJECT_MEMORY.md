# PROJECT_MEMORY — Career Decision Intelligence

## Last Session
Date: 2026-04-05
Status: Batch 3+4 — Searchable country input + complete light-theme pass

## Batch 3+4 — Searchable Country + Light Theme Pass (2026-04-05)
- src/lib/utils/constants.ts — COUNTRIES expanded from 27 to 100+ entries; priority countries (EG, SA, AE, GB, US, CA, DE) sorted first; full MENA, Europe, Asia Pacific, Americas, and sub-Saharan Africa coverage
- src/components/ui/SearchableSelect.tsx — NEW: type-to-filter searchable dropdown with pinned options, selected indicator, "Change" affordance, 20-result cap, "No matches" empty state
- src/app/(onboarding)/country.tsx — replaced basic Select with SearchableSelect; added "I don't know yet" pinned option; relocation dropdown only shows after country selected
- Light theme pass: all 16 files audited — no hardcoded dark hex values found, no text.inverse misuse found
- TrustNotice.tsx — replaced className gap/layout with inline style props (gap: 16, gap: 12)
- ProfileSummaryCard.tsx — replaced className flex/gap with inline style props
- All other files (compare, decisions, account, explore, career detail, action-plan, edit-profile, recommendation, CareerCard, RecommendationCard, CompareTable, ExplainBlock, FilterBar, WeightAdjuster) already using tokens correctly
- TypeScript check: PASS (0 errors)
- Git commit: d5019b5

## Batch 3 Cluster System (2026-04-05)
- src/lib/engine/types.ts — added clusterReactions to EngineProfile, clusterReactionFit to ScoreBreakdown
- src/lib/engine/score.ts — added computeClusterReactionFit (domain-to-cluster mapping, 5 reaction types)
- src/lib/engine/rank.ts — added clusterReactionFit to DIMENSION_WEIGHTS (0.15), redistributed weights across 9 dimensions
- src/lib/engine/explain.ts — cluster reaction references in topPositives/topNegatives
- src/lib/hooks/useRecommendations.ts — clusterReactions populated from answer map
- src/components/features/ScoreBreakdown.tsx — added "Your reaction fit" dimension bar
- src/app/(onboarding)/clusters.tsx — NEW: direction cluster reveal screen (top 6 clusters, 5 reaction options per cluster, min 3 required)
- src/app/(onboarding)/readiness.tsx — updated routing: readiness -> clusters -> country
- TypeScript check: PASS (0 errors)

## Previous Session

## Batch 3 (2026-04-05) — Study Direction Seed Corrections
- supabase/seed/seed_study_directions.sql — 74 INSERT statements covering all 30 careers (1–3 directions each); correct slugs matched to seed_career_paths.sql (fintech-product-manager, health-informatics-specialist, venture-capital-analyst)
- supabase/seed/seed_country_context.sql — 10 country rows: EG, SA, AE, US, GB, CA, DE, AU, MY, TR with education_system_notes, cost_level, visa_complexity
- assets/mock-data/study-directions.json — full JSON mirror of both seed tables for offline/demo use
- TypeScript check: PASS (0 errors)
- Git: commit c5202d5 on master

## Previous Session
Date: 2026-04-06
Status: ALL 4 PHASES COMPLETE — MVP DONE

## Completed Phases
- Phase 1 — Foundation (DONE)
- Phase 2 — Core Intelligence (DONE)
- Phase 3 — Decision Workflow (DONE)
- Phase 4 — Trust Hardening & Admin (DONE)

## Phase 4 — What Was Built

### Privacy Hooks
- usePrivacy.ts — useExportData (full GDPR export), useDeleteAccount (cascade + sign out), useUpdateName, useConsentHistory
- Trust screen updated to log consent on accept

### Account Screen (tabs/account.tsx)
- Profile section: view/edit name and preferred name
- Privacy section: export data (downloads JSON on web), consent history viewer
- Danger zone: delete account with confirmation dialog
- Sign out button

### Admin Console (5 screens, role-gated)
- (admin)/_layout.tsx — blocks non-admin access, redirects to tabs
- (admin)/index.tsx — dashboard with links to management screens
- (admin)/career-paths.tsx — all paths grouped by domain, tappable
- (admin)/scoring.tsx — trait mappings grouped by trait, sorted by weight
- (admin)/audit.tsx — admin audit log viewer (last 100 entries)

### Tab Bar
- 5 tabs: Home | Explore | Compare | Decide | Account

## Complete File Counts
- 88 TypeScript/TSX source files
- 32 screens (2 public, 2 auth, 11 onboarding, 5 tabs, 4 detail/modal, 5 admin, 3 route groups)
- 15 UI primitives
- 11 feature components
- 10 hooks
- 5 stores
- 6 engine modules
- 6 type files
- 3 SQL migrations + 2 SQL seed files
- 14 Supabase tables with 38 RLS policies

## The Complete User Journey
1. Landing page → Sign in (magic link)
2. 10-step guided onboarding (name, privacy, stage, interests, strengths, values, workstyle, constraints, priorities, summary)
3. Deterministic engine scores 30 career paths across 6 dimensions
4. Dashboard shows top ranked recommendations with explanations
5. Explore all paths, filter by domain, shortlist favorites
6. Compare 2-5 paths side-by-side, adjust priorities for live re-ranking
7. Make a decision, set status (exploring/leaning/decided)
8. Get 7/30/90-day action plan with checkable tasks
9. Account settings: edit name, export data, view consents, delete account
10. Admin console: manage careers, view scoring rules, audit trail

## Known Issues
- NativeWind className colors unreliable on web — using inline styles
- Slider uses HTML range input on web (native fallback visual-only)
- Career path detail editor (admin) not yet implemented (view-only)

## Future Work
- AI coaching layer (optional, non-authoritative)
- Push notifications
- iOS/Android app store submission
- Parent/counselor portal
- External career data APIs
- Multilingual support
- Payments/subscriptions

## Build Notes
- Type-check: PASS (0 errors) — 2026-04-06
- Git: 31 commits on master
- Lint: not yet run

# PROJECT_MEMORY — Career Decision Intelligence

## Last Session
Date: 2026-04-06
Status: Phase 2 COMPLETE

## Current Phase
Phase 1 — Foundation (DONE)
Phase 2 — Core Intelligence (DONE)

## Phase 2 — What Was Built

### Decision Engine (src/lib/engine/)
- types.ts — EngineProfile, EngineCareerPath, ScoreBreakdown, Penalty, Explanation, ScoredPath, RecommendationResult
- score.ts — 6-dimension scoring (interest, strength, values, workstyle, goals, feasibility) with trait overlap computation
- penalties.ts — constraint-based penalties (duration, financial, risk, family expectation)
- confidence.ts — profile completeness score (0-1)
- explain.ts — human-readable explanations with positives, negatives, missing info, validation questions
- rank.ts — main entry: generateRecommendations() ties scoring + penalties + confidence + explanations

### Feature Components (5 new)
- CareerCard — path preview with fit score badge and shortlist toggle
- RecommendationCard — ranked card with top reasons and cautions
- ScoreBreakdown — 6-dimension horizontal bar chart
- ExplainBlock — collapsible "Why this score" panel
- FilterBar — horizontal scrolling domain filter pills

### Hooks and Stores
- useRecommendations.ts — useLatestRecommendation, useRunRecommendations, buildEngineProfile, buildEngineCareerPaths
- useShortlist.ts — useShortlist, useAddToShortlist, useRemoveFromShortlist
- recommendationStore.ts — latestRunId, shortlistedIds

### Screens (4 new/updated)
- Dashboard (tabs/index.tsx) — greeting, top 5 recommendations, empty state
- Explore (tabs/explore.tsx) — browse all 30 paths, domain filter, fit scores, shortlist
- Career Detail (career/[id].tsx) — full detail with ScoreBreakdown, ExplainBlock, shortlist
- Recommendation Results (recommendation/[runId].tsx) — all paths ranked

### Wiring
- Summary screen now: saves profile → builds engine inputs → runs engine → saves results → navigates to dashboard
- Dashboard shows top recommendations from latest run
- Explore shows fit scores from latest run
- Career detail shows full score breakdown and explanation

## File Counts
- 73 TypeScript/TSX source files
- 24 screens
- 15 UI primitives
- 9 feature components
- 6 hooks
- 3 stores
- 6 engine modules
- 6 type files

## Known Issues
- NativeWind className colors unreliable on web — using inline styles for all colors/text
- Slider uses HTML range input on web (native fallback is visual-only)

## Next Phase
Phase 3 — Decision Workflow
- Compare screen (2-5 paths side-by-side)
- WeightAdjuster with live re-ranking
- Decision board (pick path, set status)
- Action plan (7/30/90 day) with checklist
- Decision history

## Build Notes
- Type-check: PASS (0 errors) — 2026-04-06
- Git: 17 commits on master
- Lint: not yet run

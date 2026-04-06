# CLAUDE.md — Career Decision Intelligence
# READ THIS FIRST at the start of every session.
# Session state is in docs/PROJECT_MEMORY.md

## Project: Career Decision Intelligence
## Company Standards: CRAFT V3.1
## Mode: Prototype leading to Pilot

## What This App Does
A secure career decision platform that helps students move from uncertainty to a structured career decision through guided self-discovery, option comparison, fit scoring, and action planning.

## Stack

| Layer | Technology |
|-------|-----------|
| Mobile/Web | React Native + Expo SDK 52+ |
| Navigation | Expo Router v4 |
| Styling | NativeWind v4 |
| State (client) | Zustand |
| State (server) | TanStack Query v5 |
| Auth | Supabase Auth (magic link) |
| Database | Supabase Postgres + RLS |
| Forms | React Hook Form + Zod |
| Animation | Reanimated + Moti |

## Coding Standards

- TypeScript strict — NO any
- NativeWind classes only — NO StyleSheet
- useTokens() for all styling values
- Zod schemas before any data write
- One component per file
- JSDoc on all exported functions

## Key Decisions

| Decision | Choice |
|----------|--------|
| Platform | Web-first, then iOS/Android from same codebase |
| Auth | Supabase Auth magic link (not Clerk) |
| AI | Disabled in MVP, hooks scaffolded but off |
| Engine | Pure TypeScript, deterministic, client-side |
| Data | Curated seed data, no external APIs |

## Session State
See docs/PROJECT_MEMORY.md

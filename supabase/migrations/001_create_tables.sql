-- Career Decision Intelligence — Table Definitions

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  first_name text,
  preferred_name text,
  role text not null default 'student' check (role in ('student', 'admin')),
  onboarding_completed boolean not null default false,
  created_at timestamptz not null default now(),
  last_active_at timestamptz not null default now()
);

create table public.student_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  current_stage text check (current_stage in ('high_school', 'university', 'recent_graduate', 'career_changer')),
  academic_context text,
  completion_percent integer not null default 0,
  latest_version integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id)
);

create table public.profile_answers (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.student_profiles(id) on delete cascade,
  question_key text not null,
  answer_value jsonb not null,
  version integer not null default 1,
  created_at timestamptz not null default now()
);

create table public.preference_weights (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.student_profiles(id) on delete cascade,
  income integer not null default 50 check (income between 0 and 100),
  stability integer not null default 50 check (stability between 0 and 100),
  flexibility integer not null default 50 check (flexibility between 0 and 100),
  prestige integer not null default 50 check (prestige between 0 and 100),
  creativity integer not null default 50 check (creativity between 0 and 100),
  impact integer not null default 50 check (impact between 0 and 100),
  study_duration integer not null default 50 check (study_duration between 0 and 100),
  risk integer not null default 50 check (risk between 0 and 100),
  created_at timestamptz not null default now(),
  unique(profile_id)
);

create table public.constraint_sets (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.student_profiles(id) on delete cascade,
  financial_level text check (financial_level in ('low', 'medium', 'high', 'flexible')),
  location_constraint text,
  family_expectation text check (family_expectation in ('none', 'low', 'medium', 'high')),
  max_study_years integer,
  risk_tolerance text check (risk_tolerance in ('low', 'medium', 'high')),
  notes text,
  created_at timestamptz not null default now(),
  unique(profile_id)
);

create table public.career_paths (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  domain text not null,
  summary text not null,
  education_path text,
  typical_duration_years integer,
  income_potential text check (income_potential in ('low', 'medium', 'high', 'very_high')),
  tags text[] not null default '{}',
  metadata jsonb not null default '{}',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.career_trait_mappings (
  id uuid primary key default gen_random_uuid(),
  career_path_id uuid not null references public.career_paths(id) on delete cascade,
  trait_key text not null,
  weight numeric(3,2) not null check (weight between 0 and 1),
  rationale text,
  unique(career_path_id, trait_key)
);

create table public.recommendation_runs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  profile_snapshot jsonb not null,
  scoring_model_version text not null default 'v1',
  created_at timestamptz not null default now()
);

create table public.recommendation_items (
  id uuid primary key default gen_random_uuid(),
  run_id uuid not null references public.recommendation_runs(id) on delete cascade,
  career_path_id uuid not null references public.career_paths(id),
  overall_score numeric(5,2) not null,
  confidence_score numeric(3,2) not null check (confidence_score between 0 and 1),
  interest_fit numeric(5,2) not null default 0,
  strength_fit numeric(5,2) not null default 0,
  values_fit numeric(5,2) not null default 0,
  workstyle_fit numeric(5,2) not null default 0,
  goals_fit numeric(5,2) not null default 0,
  feasibility_fit numeric(5,2) not null default 0,
  penalties jsonb not null default '{}',
  explanation jsonb not null default '{}',
  rank integer not null
);

create table public.shortlist_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  career_path_id uuid not null references public.career_paths(id),
  created_at timestamptz not null default now(),
  unique(user_id, career_path_id)
);

create table public.comparison_scenarios (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null default 'Untitled comparison',
  selected_path_ids uuid[] not null,
  custom_weights jsonb,
  result_snapshot jsonb not null,
  created_at timestamptz not null default now()
);

create table public.decision_snapshots (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  chosen_career_path_id uuid references public.career_paths(id),
  status text not null check (status in ('exploring', 'leaning', 'decided')),
  summary jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create table public.action_plans (
  id uuid primary key default gen_random_uuid(),
  decision_id uuid not null references public.decision_snapshots(id) on delete cascade,
  plan jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.consent_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  consent_type text not null,
  consent_version text not null,
  granted boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.admin_audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid not null references public.profiles(id),
  object_type text not null,
  object_id uuid,
  action text not null,
  payload jsonb,
  created_at timestamptz not null default now()
);

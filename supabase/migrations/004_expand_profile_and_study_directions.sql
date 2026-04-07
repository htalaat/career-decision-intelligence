-- Batch 1: Expand student profile + add study directions table

-- Expand student_profiles with country, academic, and readiness context
alter table public.student_profiles
  add column if not exists country text,
  add column if not exists city_region text,
  add column if not exists current_school text,
  add column if not exists current_faculty text,
  add column if not exists intended_field text,
  add column if not exists relocation_willingness text check (relocation_willingness in ('no', 'within_country', 'international', 'flexible')),
  add column if not exists decision_readiness text check (decision_readiness in ('exploring', 'narrowing', 'validating', 'ready_to_decide'));

-- Study directions: structured education-to-career mappings
create table if not exists public.study_directions (
  id uuid primary key default gen_random_uuid(),
  career_path_id uuid not null references public.career_paths(id) on delete cascade,
  faculty_cluster text not null,
  degree_type text not null check (degree_type in ('bachelor', 'master', 'doctorate', 'diploma', 'certificate', 'bootcamp')),
  field_of_study text not null,
  country_notes text,
  prerequisites text,
  typical_duration_years integer,
  relevance_level text not null default 'primary' check (relevance_level in ('primary', 'secondary', 'alternative')),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Country study context: country-level metadata for study considerations
create table if not exists public.country_study_context (
  id uuid primary key default gen_random_uuid(),
  country_code text not null,
  country_name text not null,
  education_system_notes text,
  typical_bachelor_years integer default 4,
  typical_master_years integer default 2,
  cost_level text check (cost_level in ('low', 'medium', 'high', 'very_high')),
  language_of_instruction text,
  visa_complexity text check (visa_complexity in ('none', 'easy', 'moderate', 'complex')),
  active boolean not null default true,
  unique(country_code)
);

-- RLS for new tables
alter table public.study_directions enable row level security;
alter table public.country_study_context enable row level security;

-- Public read for study directions and country context
create policy "Public read study directions" on public.study_directions for select using (active = true);
create policy "Admin manage study directions" on public.study_directions for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

create policy "Public read country context" on public.country_study_context for select using (active = true);
create policy "Admin manage country context" on public.country_study_context for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Add new score columns to recommendation_items
alter table public.recommendation_items
  add column if not exists education_fit numeric(5,2) not null default 0,
  add column if not exists country_fit numeric(5,2) not null default 0;

-- Indexes
create index if not exists idx_study_directions_career on public.study_directions(career_path_id) where active = true;
create index if not exists idx_country_context_code on public.country_study_context(country_code);

-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.student_profiles enable row level security;
alter table public.profile_answers enable row level security;
alter table public.preference_weights enable row level security;
alter table public.constraint_sets enable row level security;
alter table public.career_paths enable row level security;
alter table public.career_trait_mappings enable row level security;
alter table public.recommendation_runs enable row level security;
alter table public.recommendation_items enable row level security;
alter table public.shortlist_items enable row level security;
alter table public.comparison_scenarios enable row level security;
alter table public.decision_snapshots enable row level security;
alter table public.action_plans enable row level security;
alter table public.consent_logs enable row level security;
alter table public.admin_audit_logs enable row level security;

-- profiles
create policy "Users read own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users insert own profile" on public.profiles for insert with check (auth.uid() = id);

-- student_profiles
create policy "Users read own student profile" on public.student_profiles for select using (auth.uid() = user_id);
create policy "Users insert own student profile" on public.student_profiles for insert with check (auth.uid() = user_id);
create policy "Users update own student profile" on public.student_profiles for update using (auth.uid() = user_id);

-- profile_answers
create policy "Users read own answers" on public.profile_answers for select using (profile_id in (select id from public.student_profiles where user_id = auth.uid()));
create policy "Users insert own answers" on public.profile_answers for insert with check (profile_id in (select id from public.student_profiles where user_id = auth.uid()));

-- preference_weights
create policy "Users read own weights" on public.preference_weights for select using (profile_id in (select id from public.student_profiles where user_id = auth.uid()));
create policy "Users upsert own weights" on public.preference_weights for insert with check (profile_id in (select id from public.student_profiles where user_id = auth.uid()));
create policy "Users update own weights" on public.preference_weights for update using (profile_id in (select id from public.student_profiles where user_id = auth.uid()));

-- constraint_sets
create policy "Users read own constraints" on public.constraint_sets for select using (profile_id in (select id from public.student_profiles where user_id = auth.uid()));
create policy "Users upsert own constraints" on public.constraint_sets for insert with check (profile_id in (select id from public.student_profiles where user_id = auth.uid()));
create policy "Users update own constraints" on public.constraint_sets for update using (profile_id in (select id from public.student_profiles where user_id = auth.uid()));

-- career_paths (public read, admin write)
create policy "Public read active career paths" on public.career_paths for select using (active = true);
create policy "Admin insert career paths" on public.career_paths for insert with check (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
create policy "Admin update career paths" on public.career_paths for update using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- career_trait_mappings (public read, admin write)
create policy "Public read trait mappings" on public.career_trait_mappings for select using (true);
create policy "Admin insert trait mappings" on public.career_trait_mappings for insert with check (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
create policy "Admin update trait mappings" on public.career_trait_mappings for update using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- recommendation_runs
create policy "Users read own runs" on public.recommendation_runs for select using (auth.uid() = user_id);
create policy "Users insert own runs" on public.recommendation_runs for insert with check (auth.uid() = user_id);

-- recommendation_items
create policy "Users read own recommendation items" on public.recommendation_items for select using (run_id in (select id from public.recommendation_runs where user_id = auth.uid()));
create policy "Users insert own recommendation items" on public.recommendation_items for insert with check (run_id in (select id from public.recommendation_runs where user_id = auth.uid()));

-- shortlist_items
create policy "Users read own shortlist" on public.shortlist_items for select using (auth.uid() = user_id);
create policy "Users insert own shortlist" on public.shortlist_items for insert with check (auth.uid() = user_id);
create policy "Users delete own shortlist" on public.shortlist_items for delete using (auth.uid() = user_id);

-- comparison_scenarios
create policy "Users read own scenarios" on public.comparison_scenarios for select using (auth.uid() = user_id);
create policy "Users insert own scenarios" on public.comparison_scenarios for insert with check (auth.uid() = user_id);

-- decision_snapshots
create policy "Users read own decisions" on public.decision_snapshots for select using (auth.uid() = user_id);
create policy "Users insert own decisions" on public.decision_snapshots for insert with check (auth.uid() = user_id);

-- action_plans
create policy "Users read own plans" on public.action_plans for select using (decision_id in (select id from public.decision_snapshots where user_id = auth.uid()));
create policy "Users insert own plans" on public.action_plans for insert with check (decision_id in (select id from public.decision_snapshots where user_id = auth.uid()));
create policy "Users update own plans" on public.action_plans for update using (decision_id in (select id from public.decision_snapshots where user_id = auth.uid()));

-- consent_logs
create policy "Users read own consents" on public.consent_logs for select using (auth.uid() = user_id);
create policy "Users insert own consents" on public.consent_logs for insert with check (auth.uid() = user_id);

-- admin_audit_logs
create policy "Admin read audit logs" on public.admin_audit_logs for select using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
create policy "Admin insert audit logs" on public.admin_audit_logs for insert with check (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- Auto-create profile row on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);

  insert into public.student_profiles (user_id)
  values (new.id);

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

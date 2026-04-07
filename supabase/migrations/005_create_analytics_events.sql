-- Analytics events table for lightweight product instrumentation

create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  event_name text not null,
  properties jsonb not null default '{}',
  created_at timestamptz not null default now()
);

alter table public.analytics_events enable row level security;

-- Any authenticated user can log events
create policy "Anyone can insert analytics" on public.analytics_events
  for insert with check (true);

-- Only admins can read analytics
create policy "Admin read analytics" on public.analytics_events
  for select using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

create index if not exists idx_analytics_event on public.analytics_events(event_name, created_at desc);

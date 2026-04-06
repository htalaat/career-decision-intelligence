create index idx_profile_answers_profile on public.profile_answers(profile_id, question_key);
create index idx_career_paths_domain on public.career_paths(domain) where active = true;
create index idx_career_trait_mappings_career on public.career_trait_mappings(career_path_id);
create index idx_recommendation_items_run on public.recommendation_items(run_id, rank);
create index idx_shortlist_user on public.shortlist_items(user_id);
create index idx_decisions_user on public.decision_snapshots(user_id, created_at desc);

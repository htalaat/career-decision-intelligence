-- Allow users to delete their own profile answers (needed for re-onboarding upsert)
CREATE POLICY "Users delete own answers" ON public.profile_answers
  FOR DELETE USING (
    profile_id IN (SELECT id FROM public.student_profiles WHERE user_id = auth.uid())
  );

-- Add index for the delete+insert pattern
CREATE INDEX IF NOT EXISTS idx_profile_answers_key
  ON public.profile_answers(profile_id, question_key, version);

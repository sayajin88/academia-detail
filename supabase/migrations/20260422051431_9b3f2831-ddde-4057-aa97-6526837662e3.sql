ALTER TABLE public.contact_submissions
ADD COLUMN IF NOT EXISTS followup_attempts integer NOT NULL DEFAULT 0;
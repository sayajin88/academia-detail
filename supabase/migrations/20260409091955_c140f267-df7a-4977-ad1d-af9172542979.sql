
ALTER TABLE public.contact_submissions
  ADD COLUMN IF NOT EXISTS dossier_email_sent boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS dossier_opened boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS dossier_opened_at timestamptz,
  ADD COLUMN IF NOT EXISTS followup_email_sent boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS followup_email_sent_at timestamptz,
  ADD COLUMN IF NOT EXISTS tracking_token text UNIQUE;

ALTER TABLE public.contact_submissions
ADD COLUMN IF NOT EXISTS dossier_clicked_at timestamp with time zone;
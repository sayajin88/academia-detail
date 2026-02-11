
-- Add new columns
ALTER TABLE public.detailer_profiles
  ADD COLUMN IF NOT EXISTS profile_type text NOT NULL DEFAULT 'detailer',
  ADD COLUMN IF NOT EXISTS owner_photo_url text,
  ADD COLUMN IF NOT EXISTS skills text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS years_experience integer,
  ADD COLUMN IF NOT EXISTS specialty text;

-- Drop old constraint first
ALTER TABLE public.detailer_profiles DROP CONSTRAINT IF EXISTS detailer_profiles_level_badge_check;

-- Update existing data
UPDATE public.detailer_profiles SET level_badge = 'elite_detailer' WHERE level_badge = 'master';
UPDATE public.detailer_profiles SET level_badge = 'master_detailer' WHERE level_badge = 'certified';
UPDATE public.detailer_profiles SET level_badge = 'certified_pro' WHERE level_badge = 'member';

-- Add new constraint
ALTER TABLE public.detailer_profiles ADD CONSTRAINT detailer_profiles_level_badge_check
  CHECK (level_badge IN ('certified_pro', 'master_detailer', 'elite_detailer'));

-- New field in applications
ALTER TABLE public.directory_applications
  ADD COLUMN IF NOT EXISTS profile_type text NOT NULL DEFAULT 'detailer';

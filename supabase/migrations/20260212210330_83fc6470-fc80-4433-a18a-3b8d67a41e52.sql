
-- Add new columns to directory_applications for the enhanced form
ALTER TABLE public.directory_applications
  ADD COLUMN IF NOT EXISTS logo_url text,
  ADD COLUMN IF NOT EXISTS portfolio_url text,
  ADD COLUMN IF NOT EXISTS brands text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS has_insurance boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS value_proposition text,
  ADD COLUMN IF NOT EXISTS gallery_urls text[] DEFAULT '{}';

-- Create storage bucket for directory application uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('directory-uploads', 'directory-uploads', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone to upload to directory-uploads bucket
CREATE POLICY "Anyone can upload directory files"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'directory-uploads');

-- Allow public read access
CREATE POLICY "Public can view directory files"
ON storage.objects FOR SELECT
USING (bucket_id = 'directory-uploads');

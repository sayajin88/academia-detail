
-- Create detailer_profiles table
CREATE TABLE public.detailer_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  business_name text NOT NULL,
  slug text UNIQUE NOT NULL,
  owner_name text NOT NULL,
  email text NOT NULL,
  phone text,
  city text NOT NULL,
  province text NOT NULL,
  zip_code text,
  address text,
  latitude double precision,
  longitude double precision,
  services text[] DEFAULT '{}',
  level_badge text NOT NULL DEFAULT 'member'
    CHECK (level_badge IN ('member', 'certified', 'master')),
  is_verified boolean DEFAULT false,
  is_published boolean DEFAULT false,
  whatsapp_number text,
  website_url text,
  instagram_handle text,
  description text,
  featured_image_url text
);

ALTER TABLE public.detailer_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published detailer profiles"
  ON public.detailer_profiles FOR SELECT
  USING (is_published = true);

-- Create portfolio_images table
CREATE TABLE public.portfolio_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  detailer_id uuid REFERENCES public.detailer_profiles(id)
    ON DELETE CASCADE NOT NULL,
  before_image_url text,
  after_image_url text,
  title text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.portfolio_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view portfolio images"
  ON public.portfolio_images FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.detailer_profiles
      WHERE id = detailer_id AND is_published = true
    )
  );

-- Create directory_applications table
CREATE TABLE public.directory_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  business_name text NOT NULL,
  owner_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  city text NOT NULL,
  province text NOT NULL,
  services text[] DEFAULT '{}',
  experience_level text,
  has_taken_course boolean DEFAULT false,
  course_name text,
  message text,
  status text NOT NULL DEFAULT 'pending'
);

ALTER TABLE public.directory_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can apply to directory"
  ON public.directory_applications FOR INSERT
  WITH CHECK (true);

-- Storage bucket for portfolio images
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio', 'portfolio', true);

CREATE POLICY "Public can read portfolio files"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'portfolio');

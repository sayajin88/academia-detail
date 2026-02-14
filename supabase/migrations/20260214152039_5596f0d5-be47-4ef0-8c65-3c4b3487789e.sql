
-- Create blog_posts table
CREATE TABLE public.blog_posts (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  excerpt text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'detailing',
  author_name text NOT NULL DEFAULT 'Daniel López',
  author_role text NOT NULL DEFAULT 'CEO y Formador Principal',
  author_image text,
  published_at date NOT NULL DEFAULT CURRENT_DATE,
  reading_time text NOT NULL DEFAULT '5 min',
  image_url text,
  image_alt text NOT NULL DEFAULT '',
  featured boolean NOT NULL DEFAULT false,
  tags text[] NOT NULL DEFAULT '{}',
  sections jsonb NOT NULL DEFAULT '[]'::jsonb,
  related_slugs text[] NOT NULL DEFAULT '{}',
  status text NOT NULL DEFAULT 'draft',
  seo_score integer,
  readability_score integer,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  created_by uuid
);

-- Enable RLS
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Admins can do everything
CREATE POLICY "Admins can select blog posts"
ON public.blog_posts FOR SELECT
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert blog posts"
ON public.blog_posts FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update blog posts"
ON public.blog_posts FOR UPDATE
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete blog posts"
ON public.blog_posts FOR DELETE
USING (has_role(auth.uid(), 'admin'));

-- Public can read published posts
CREATE POLICY "Public can read published blog posts"
ON public.blog_posts FOR SELECT
USING (status = 'published');

-- Trigger for updated_at
CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create blog-images storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('blog-images', 'blog-images', true);

-- Storage policies for blog-images
CREATE POLICY "Anyone can view blog images"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog-images');

CREATE POLICY "Admins can upload blog images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'blog-images' AND has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update blog images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'blog-images' AND has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete blog images"
ON storage.objects FOR DELETE
USING (bucket_id = 'blog-images' AND has_role(auth.uid(), 'admin'));

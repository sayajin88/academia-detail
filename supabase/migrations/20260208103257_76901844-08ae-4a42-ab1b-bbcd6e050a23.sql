
-- Create table for blog newsletter subscribers
CREATE TABLE public.blog_newsletter_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.blog_newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public newsletter signup)
CREATE POLICY "Anyone can subscribe to blog newsletter"
ON public.blog_newsletter_subscribers
FOR INSERT
WITH CHECK (true);

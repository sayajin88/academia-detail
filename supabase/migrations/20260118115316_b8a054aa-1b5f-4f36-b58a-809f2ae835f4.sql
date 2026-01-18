-- Create table for coming soon subscribers
CREATE TABLE public.coming_soon_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT,
  formation_slug TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  notified BOOLEAN DEFAULT false
);

-- Enable RLS
ALTER TABLE public.coming_soon_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public form)
CREATE POLICY "Anyone can subscribe to coming soon notifications" 
ON public.coming_soon_subscribers 
FOR INSERT 
WITH CHECK (true);

-- Create index for faster lookups
CREATE INDEX idx_coming_soon_formation ON public.coming_soon_subscribers(formation_slug);
CREATE INDEX idx_coming_soon_email ON public.coming_soon_subscribers(email);
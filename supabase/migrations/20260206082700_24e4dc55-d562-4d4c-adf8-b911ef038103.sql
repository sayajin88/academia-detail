
-- Create table for contact form submissions
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  nombre TEXT NOT NULL,
  apellidos TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT NOT NULL,
  experiencia TEXT NOT NULL,
  centro_propio TEXT NOT NULL,
  inversion TEXT NOT NULL,
  tipo_formacion TEXT NOT NULL,
  mensaje TEXT,
  acepto_privacidad BOOLEAN NOT NULL DEFAULT false
);

-- Enable Row Level Security
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow public INSERT (anyone can submit the contact form without login)
CREATE POLICY "Anyone can submit contact form"
ON public.contact_submissions
FOR INSERT
WITH CHECK (true);

-- No SELECT/UPDATE/DELETE policies = data only accessible via backend/service role

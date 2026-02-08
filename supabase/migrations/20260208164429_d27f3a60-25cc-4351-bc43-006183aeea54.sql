
-- Create table for Up Detail pre-registrations (coming soon interest list)
CREATE TABLE public.up_detail_preregistrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add unique constraint on email to prevent duplicates
ALTER TABLE public.up_detail_preregistrations ADD CONSTRAINT up_detail_preregistrations_email_unique UNIQUE (email);

-- Enable Row Level Security
ALTER TABLE public.up_detail_preregistrations ENABLE ROW LEVEL SECURITY;

-- Allow anyone to subscribe (public form, no auth required)
CREATE POLICY "Anyone can pre-register for Up Detail"
ON public.up_detail_preregistrations
FOR INSERT
WITH CHECK (true);

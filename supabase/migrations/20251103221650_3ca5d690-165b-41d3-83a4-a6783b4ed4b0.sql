-- Fix RLS to allow public inserts if we continue using client-side insert (kept as safety)
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can register for event" ON public.registrations;
CREATE POLICY "Anyone can register for event"
ON public.registrations
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Keep existing SELECT policy as-is
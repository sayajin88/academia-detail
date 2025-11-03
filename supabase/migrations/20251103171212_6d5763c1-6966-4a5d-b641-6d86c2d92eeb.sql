-- Drop the restrictive policy and create a proper permissive one
DROP POLICY IF EXISTS "Anyone can register for event" ON public.registrations;

-- Create a permissive INSERT policy that allows anyone to register
CREATE POLICY "Anyone can register for event" 
ON public.registrations
FOR INSERT 
TO public
WITH CHECK (true);

-- Verify the SELECT policy is also correct
DROP POLICY IF EXISTS "Users can view their own registration" ON public.registrations;

CREATE POLICY "Users can view their own registration" 
ON public.registrations
FOR SELECT
TO public
USING (email = (auth.jwt() ->> 'email'::text));
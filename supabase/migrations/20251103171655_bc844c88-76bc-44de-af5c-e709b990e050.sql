-- Make INSERT explicitly allowed for anon role
DROP POLICY IF EXISTS "Anyone can register for event" ON public.registrations;
CREATE POLICY "Anyone can register for event"
ON public.registrations
FOR INSERT
TO anon
WITH CHECK (true);

-- Keep SELECT restricted; we won't rely on selecting inserted rows
DROP POLICY IF EXISTS "Users can view their own registration" ON public.registrations;
CREATE POLICY "Users can view their own registration"
ON public.registrations
FOR SELECT
TO authenticated
USING (email = (auth.jwt() ->> 'email'));

-- Add contact status tracking columns
ALTER TABLE public.contact_submissions 
  ADD COLUMN contact_status text NOT NULL DEFAULT 'pendiente',
  ADD COLUMN contacted_at timestamptz,
  ADD COLUMN admin_notes text;

-- Allow admins to update contact submissions (change status, add notes)
CREATE POLICY "Admins can update contact submissions"
  ON public.contact_submissions
  FOR UPDATE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::text))
  WITH CHECK (has_role(auth.uid(), 'admin'::text));

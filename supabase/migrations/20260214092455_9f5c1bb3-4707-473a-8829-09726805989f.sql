-- Allow admins to delete detailer profiles
CREATE POLICY "Admins can delete detailer profiles"
  ON public.detailer_profiles FOR DELETE
  USING (has_role(auth.uid(), 'admin'));

-- Allow admins to select all detailer profiles (including unpublished)
CREATE POLICY "Admins can view all detailer profiles"
  ON public.detailer_profiles FOR SELECT
  USING (has_role(auth.uid(), 'admin'));
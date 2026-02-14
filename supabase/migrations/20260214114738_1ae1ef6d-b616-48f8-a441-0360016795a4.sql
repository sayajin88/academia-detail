
-- Politica INSERT para admins en portfolio_images
CREATE POLICY "Admins can insert portfolio images"
ON portfolio_images FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Politica DELETE para admins en portfolio_images
CREATE POLICY "Admins can delete portfolio images"
ON portfolio_images FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'));

-- Politica SELECT para admins (ver todas, no solo publicadas)
CREATE POLICY "Admins can view all portfolio images"
ON portfolio_images FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'));

-- Fix function search_path security warning
CREATE OR REPLACE FUNCTION public.set_reservation_expiration()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.reservation_expires_at IS NULL THEN
    NEW.reservation_expires_at := NEW.created_at + INTERVAL '7 days';
  END IF;
  RETURN NEW;
END;
$$;
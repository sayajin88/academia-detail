-- Add new columns to registrations table for pre-registration flow
ALTER TABLE public.registrations 
ADD COLUMN reservation_expires_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN payment_link_sent_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN reminder_sent BOOLEAN DEFAULT false,
ADD COLUMN notes TEXT;

-- Update payment_status enum to include expired and cancelled states
ALTER TYPE payment_status ADD VALUE IF NOT EXISTS 'expired';
ALTER TYPE payment_status ADD VALUE IF NOT EXISTS 'cancelled';

-- Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_registrations_payment_status ON public.registrations(payment_status);
CREATE INDEX IF NOT EXISTS idx_registrations_reservation_expires ON public.registrations(reservation_expires_at);

-- Create function to automatically set reservation expiration (7 days from creation)
CREATE OR REPLACE FUNCTION public.set_reservation_expiration()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.reservation_expires_at IS NULL THEN
    NEW.reservation_expires_at := NEW.created_at + INTERVAL '7 days';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to set reservation expiration on insert
DROP TRIGGER IF EXISTS trigger_set_reservation_expiration ON public.registrations;
CREATE TRIGGER trigger_set_reservation_expiration
  BEFORE INSERT ON public.registrations
  FOR EACH ROW
  EXECUTE FUNCTION public.set_reservation_expiration();
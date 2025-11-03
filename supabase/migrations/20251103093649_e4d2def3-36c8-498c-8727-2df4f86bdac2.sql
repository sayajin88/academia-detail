-- Crear enum para el estado de pago
CREATE TYPE public.payment_status AS ENUM ('pending', 'completed', 'cancelled');

-- Crear tabla de registros para el evento UP DETAIL
CREATE TABLE public.registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  event_date DATE NOT NULL DEFAULT CURRENT_DATE,
  payment_status public.payment_status NOT NULL DEFAULT 'pending',
  accept_terms BOOLEAN NOT NULL DEFAULT false,
  accept_marketing BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar Row Level Security
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Política para permitir INSERT público (para que cualquiera pueda registrarse)
CREATE POLICY "Anyone can register for event"
ON public.registrations
FOR INSERT
WITH CHECK (true);

-- Política para SELECT: solo los propios usuarios pueden ver su registro
CREATE POLICY "Users can view their own registration"
ON public.registrations
FOR SELECT
USING (email = auth.jwt()->>'email');

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Trigger para actualizar updated_at
CREATE TRIGGER update_registrations_updated_at
BEFORE UPDATE ON public.registrations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Índice para búsquedas por email
CREATE INDEX idx_registrations_email ON public.registrations(email);

-- Índice para búsquedas por estado de pago
CREATE INDEX idx_registrations_payment_status ON public.registrations(payment_status);
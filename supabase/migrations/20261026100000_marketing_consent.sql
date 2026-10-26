-- Casilla «Quiero recibir novedades» (26-10-2026): opcional y sin marcar en los tres formularios.
-- Se guarda aquí y se envía a Core Detail con el resto del formulario; allí el contacto solo queda
-- suscrito a los newsletters si la casilla venía marcada.

ALTER TABLE public.contact_submissions ADD COLUMN IF NOT EXISTS marketing_consent boolean NOT NULL DEFAULT false;
ALTER TABLE public.coming_soon_subscribers ADD COLUMN IF NOT EXISTS marketing_consent boolean NOT NULL DEFAULT false;
ALTER TABLE public.up_detail_preregistrations ADD COLUMN IF NOT EXISTS marketing_consent boolean NOT NULL DEFAULT false;

CREATE OR REPLACE FUNCTION public.core_detail_training_payload(tbl text, r jsonb)
RETURNS jsonb
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT CASE tbl
    WHEN 'contact_submissions' THEN jsonb_build_object(
      'form', 'contacto',
      'external_id', r->>'id',
      'submitted_at', r->>'created_at',
      'first_name', r->>'nombre',
      'last_name', r->>'apellidos',
      'email', r->>'email',
      'phone', r->>'telefono',
      'course', CASE r->>'tipo_formacion'
        WHEN 'detailing' THEN 'Curso de detailing profesional'
        WHEN 'wrapping' THEN 'Curso de car wrapping'
        WHEN 'ppf' THEN 'Curso de PPF'
        WHEN 'carrera_completa' THEN 'Carrera Detailing'
        WHEN 'jornada_zero' THEN 'Jornada Zero'
        WHEN 'up_detail' THEN 'Up Detail'
        WHEN 'restauracion' THEN 'Curso de restauración'
        WHEN 'negocio' THEN 'Montar un negocio'
        WHEN 'general' THEN 'Consulta general'
        ELSE r->>'tipo_formacion' END,
      'experience', CASE r->>'experiencia'
        WHEN 'sin_experiencia' THEN 'Empieza desde cero'
        WHEN 'con_experiencia' THEN 'Ya tiene experiencia'
        ELSE r->>'experiencia' END,
      'has_workshop', CASE r->>'centro_propio'
        WHEN 'si' THEN 'Sí, ya tiene centro o taller'
        WHEN 'no' THEN 'Todavía no'
        ELSE r->>'centro_propio' END,
      'budget', CASE r->>'inversion'
        WHEN 'hasta_500' THEN 'Hasta 500 €'
        WHEN '500_2000' THEN '500 – 2.000 €'
        WHEN '2000_5000' THEN '2.000 – 5.000 €'
        WHEN 'mas_5000' THEN 'Más de 5.000 €'
        ELSE r->>'inversion' END,
      'message', r->>'mensaje')
    WHEN 'coming_soon_subscribers' THEN jsonb_build_object(
      'form', 'lista_espera',
      'external_id', r->>'id',
      'submitted_at', r->>'created_at',
      'name', r->>'name',
      'email', r->>'email',
      'course', CASE r->>'formation_slug'
        WHEN 'curso-restauracion-vehiculos' THEN 'Curso de restauración (lista de espera)'
        ELSE coalesce(r->>'formation_slug', 'Lista de espera') END)
    WHEN 'up_detail_preregistrations' THEN jsonb_build_object(
      'form', 'up_detail',
      'external_id', r->>'id',
      'submitted_at', r->>'created_at',
      'name', r->>'name',
      'email', r->>'email',
      'course', 'Up Detail (aviso de la próxima edición)')
  END || jsonb_build_object(
    'source', 'academiadetail.com',
    'marketing_consent', coalesce((r->>'marketing_consent')::boolean, false));
$$;

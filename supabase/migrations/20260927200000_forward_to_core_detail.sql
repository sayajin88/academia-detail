-- Envía cada formulario de la web a Core Detail (bandeja «Solicitudes de formación»), 27-09-2026.
-- contact_submissions (contacto e inscripción), coming_soon_subscribers (lista de espera de un curso)
-- y up_detail_preregistrations (aviso de Up Detail).
--
-- El envío lo hace la propia base de datos con pg_net (asíncrono): el formulario nunca espera ni
-- falla por Core Detail. La clave compartida se guarda en Vault con el nombre
-- «core_detail_training_webhook_secret»; mientras no exista, no se envía nada.

CREATE EXTENSION IF NOT EXISTS pg_net;

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
  END || jsonb_build_object('source', 'academiadetail.com');
$$;

-- Envía una fila. Devuelve el id de la petición de pg_net, o null si no hay clave configurada.
CREATE OR REPLACE FUNCTION public.forward_training_row(tbl text, r jsonb, p_backfill boolean DEFAULT false)
RETURNS bigint
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  v_secret text;
  v_request_id bigint;
BEGIN
  SELECT decrypted_secret INTO v_secret
  FROM vault.decrypted_secrets
  WHERE name = 'core_detail_training_webhook_secret'
  LIMIT 1;

  IF v_secret IS NULL OR v_secret = '' THEN
    RETURN NULL;
  END IF;

  SELECT net.http_post(
    url := 'https://luvzzlveejmihzzunyqn.supabase.co/functions/v1/receive-training-request',
    -- backfill = true: Core Detail la guarda sin enviar aviso push (volcado inicial)
    body := public.core_detail_training_payload(tbl, r) || jsonb_build_object('backfill', p_backfill),
    headers := jsonb_build_object('Content-Type', 'application/json', 'Authorization', 'Bearer ' || v_secret),
    timeout_milliseconds := 8000
  ) INTO v_request_id;

  RETURN v_request_id;
END;
$$;

REVOKE ALL ON FUNCTION public.forward_training_row(text, jsonb, boolean) FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE FUNCTION public.forward_training_request_trigger()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
BEGIN
  BEGIN
    PERFORM public.forward_training_row(TG_TABLE_NAME, to_jsonb(NEW));
  EXCEPTION WHEN OTHERS THEN
    -- Nunca bloquear el formulario por un fallo del envío
    RAISE WARNING 'forward_training_row falló: %', SQLERRM;
  END;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS forward_to_core_detail ON public.contact_submissions;
CREATE TRIGGER forward_to_core_detail AFTER INSERT ON public.contact_submissions
  FOR EACH ROW EXECUTE FUNCTION public.forward_training_request_trigger();

DROP TRIGGER IF EXISTS forward_to_core_detail ON public.coming_soon_subscribers;
CREATE TRIGGER forward_to_core_detail AFTER INSERT ON public.coming_soon_subscribers
  FOR EACH ROW EXECUTE FUNCTION public.forward_training_request_trigger();

DROP TRIGGER IF EXISTS forward_to_core_detail ON public.up_detail_preregistrations;
CREATE TRIGGER forward_to_core_detail AFTER INSERT ON public.up_detail_preregistrations
  FOR EACH ROW EXECUTE FUNCTION public.forward_training_request_trigger();

-- Envío de lo que ya había (se ejecuta a mano una vez configurada la clave):
--   select public.forward_all_training_requests();
-- Core Detail descarta los duplicados, así que se puede repetir sin problema.
CREATE OR REPLACE FUNCTION public.forward_all_training_requests()
RETURNS int
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  v_count int := 0;
  r record;
BEGIN
  FOR r IN SELECT to_jsonb(t) AS j FROM public.contact_submissions t ORDER BY created_at LOOP
    IF public.forward_training_row('contact_submissions', r.j, true) IS NOT NULL THEN v_count := v_count + 1; END IF;
  END LOOP;
  FOR r IN SELECT to_jsonb(t) AS j FROM public.coming_soon_subscribers t ORDER BY created_at LOOP
    IF public.forward_training_row('coming_soon_subscribers', r.j, true) IS NOT NULL THEN v_count := v_count + 1; END IF;
  END LOOP;
  FOR r IN SELECT to_jsonb(t) AS j FROM public.up_detail_preregistrations t ORDER BY created_at LOOP
    IF public.forward_training_row('up_detail_preregistrations', r.j, true) IS NOT NULL THEN v_count := v_count + 1; END IF;
  END LOOP;
  RETURN v_count;
END;
$$;

REVOKE ALL ON FUNCTION public.forward_all_training_requests() FROM PUBLIC, anon, authenticated;

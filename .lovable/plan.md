

## Plan: Flujo de emails post-inscripción con dossier, tracking y seguimiento

### Resumen

Crear un flujo automatizado de 3 pasos tras el envío del formulario:
1. Email de confirmación con enlace al dossier PDF
2. Tracking de apertura de emails visible en el panel admin
3. Email de seguimiento automático a los 2 días

---

### Cambios técnicos

**1. Migración de base de datos — Nuevas columnas en `contact_submissions`**

Añadir columnas para el tracking:
- `dossier_email_sent` (boolean, default false)
- `dossier_opened` (boolean, default false)
- `dossier_opened_at` (timestamptz, nullable)
- `followup_email_sent` (boolean, default false)
- `followup_email_sent_at` (timestamptz, nullable)
- `tracking_token` (text, unique) — token UUID para el pixel de tracking

---

**2. Edge Function: `track-email-open/index.ts`** (nueva)

Endpoint que devuelve un pixel GIF 1x1 transparente. Cuando el email se abre, el cliente de correo carga la imagen y el servidor registra la apertura:
- Recibe `?token=UUID` como query param
- Actualiza `dossier_opened = true` y `dossier_opened_at = now()` en `contact_submissions`
- Devuelve un GIF 1x1 transparente (content-type: image/gif)

---

**3. Actualizar `send-contact-email/index.ts`** — Email de confirmación con dossier

Modificar el email al cliente para incluir:
- Enlace destacado al dossier PDF en Google Drive
- Pixel de tracking invisible (imagen que apunta a `track-email-open?token=XXX`)
- Generar y guardar un `tracking_token` único por submission
- Copy persuasivo centrado en el valor del programa

**Copy del email de confirmación:**
- Asunto: "Tu Programa Formativo está listo para descargar 📋"
- CTA principal: botón "Descargar Programa Formativo Completo" → enlace Google Drive
- Mensaje que refuerza la decisión, menciona exclusividad y próximos pasos

---

**4. Edge Function: `send-followup-email/index.ts`** (nueva)

Email de seguimiento que se envía a los 2 días:
- Consulta `contact_submissions` donde `created_at < now() - 2 days` AND `followup_email_sent = false`
- Envía email personalizado por alumno
- Marca `followup_email_sent = true`

**Copy del email de seguimiento:**
- Asunto: "¿Has podido revisar el programa, [nombre]?"
- Tono cercano, preguntando si tiene dudas
- Recordatorio de financiación con ViaBill (sin intereses)
- CTA: "Reserva tu plaza" → enlace a /contacto o WhatsApp

---

**5. Cron job con pg_cron** — Disparo automático del follow-up

Programar un cron job diario que invoque `send-followup-email` para procesar los leads pendientes de seguimiento (submissions de hace 2+ días sin follow-up enviado).

---

**6. Panel Admin (`AdminContacts.tsx`)** — Indicadores de tracking

Añadir al listado y al modal de detalle:
- Icono/badge que indique si el dossier fue abierto (ojo abierto/cerrado)
- Timestamp de apertura
- Indicador de si el follow-up fue enviado
- Nueva KPI card: "Dossier abierto" con porcentaje

---

### Archivos afectados

| Archivo | Acción |
|---|---|
| `contact_submissions` (migración) | Añadir 5 columnas de tracking |
| `supabase/functions/send-contact-email/index.ts` | Actualizar email cliente con dossier + pixel |
| `supabase/functions/track-email-open/index.ts` | Crear (pixel tracking) |
| `supabase/functions/send-followup-email/index.ts` | Crear (email seguimiento) |
| `supabase/config.toml` | Registrar nuevas functions con verify_jwt = false |
| `src/pages/AdminContacts.tsx` | Añadir indicadores de tracking |
| pg_cron (SQL insert) | Programar cron diario para follow-ups |


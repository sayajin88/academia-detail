

## Mejoras al dashboard `/admin/contacts` y verificación de tracking

### Objetivo
Mostrar de forma clara y siempre visible cuándo se envió el email de seguimiento (followup automático a 2 días), su estado real de entrega, y el estado de apertura del dossier — todo cruzado con `email_send_log` para reflejar la realidad, no solo los flags de la tabla.

---

### 1. Nueva columna "Comunicación" en la tabla (sustituye a "Tracking")

Mostrar tres "chips" en cada fila, siempre visibles (no condicionados a `dossier_email_sent`):

```text
[Dossier ✓ 18 abr · Abierto 19 abr] [Followup ✓ 20 abr] 
```

- **Dossier**: estado de envío (sent / pending / failed) + fecha · estado de apertura + fecha si aplica.
- **Followup**: estado de envío (sent / pending / failed / no enviado) + fecha de envío automático.
- Cada chip es un tooltip con la fecha completa (ej. "Enviado el 20 abr 2026, 09:18").
- Iconografía: `Send` enviado, `Eye/EyeOff` abierto/no abierto, `AlertTriangle` falló, `Clock` pendiente.

### 2. Modal de detalle — bloque "Historial de comunicación" rediseñado

Sustituyo el grid actual por una **timeline vertical** que siempre se muestra, con tres eventos:

```text
●  Dossier enviado          20 abr 2026 · 09:18    ✓ Entregado
│
●  Dossier abierto          20 abr 2026 · 09:54    👁 visto
│
●  Email de seguimiento     22 abr 2026 · 08:00    ✓ Entregado (auto)
```

- Cada evento muestra: icono de estado, etiqueta, fecha/hora exacta, badge de estado real (entregado / fallido / pendiente / no enviado).
- Si el followup no se ha enviado: línea gris con texto "Programado automáticamente para el [fecha+2días]".
- Si está fallido en `email_send_log` → badge rojo "Fallo de entrega" con tooltip del error.

### 3. Cruce con `email_send_log` (fuente de verdad real)

Añadir una segunda query React Query que trae los últimos estados (deduplicados por `message_id`) de `email_send_log` filtrados por `template_name IN ('contact-confirmation', 'contact-followup')` y por `recipient_email IN (emails de los leads visibles)`.

Los chips de la tabla y la timeline del modal usan esta fuente para el badge "entregado / fallido / pendiente". Los flags y timestamps de `contact_submissions` se usan solo para "intento de envío" y para apertura.

### 4. Verificación del tracking de apertura (`track-email-open`)

La revisión muestra que el sistema **funciona correctamente**:
- El píxel 1×1 GIF se inserta en la plantilla `contact-confirmation.tsx` con la URL `https://…/functions/v1/track-email-open?token=<uuid>`.
- La edge function actualiza `dossier_opened=true` y `dossier_opened_at` cuando el cliente carga el píxel.
- Datos reales en BD: varios leads tienen `dossier_opened=true` con timestamp (ej. `vvmaximuss@gmail.com` abierto el 20 abr 09:04).

No hay cambios necesarios en `track-email-open`, pero añadiré:
- **Botón "Verificar pixel"** en el modal de detalle (admin-only): hace `fetch` a la URL del píxel con el token del lead y muestra "✓ Pixel responde correctamente" / error.
- Comentario en la plantilla aclarando que algunos clientes (Outlook, Apple Mail con Privacy Protection) bloquean píxeles → puede haber falsos negativos en "no abierto".

### 5. Verificación del tracking del dossier

El dossier es un PDF público en Supabase Storage al que se accede vía `<Button href="…/dossiers/programa-formativo-academia-detail.pdf">`. Actualmente **no hay tracking de clic** sobre el botón — solo de apertura del email.

Propongo (opcional, lo incluyo si me lo confirmas): redirigir el botón a una nueva edge function `track-dossier-click?token=<uuid>` que:
1. Marca un nuevo campo `dossier_clicked_at` en `contact_submissions` (requiere migración: 1 columna `timestamptz`).
2. Hace `302 redirect` al PDF real en Storage.

Así sabremos **abierto el email vs. clic real al PDF**, dos métricas distintas. Sin esto, "abierto" solo significa "el cliente cargó imágenes", no "vio el dossier".

---

### Archivos afectados

- `src/pages/AdminContacts.tsx` — nueva columna, nueva query a `email_send_log`, timeline en modal, botón de verificación.
- *(opcional, si apruebas tracking de clic)* nueva migración + nueva edge function `track-dossier-click` + actualizar `DOSSIER_URL` en `contact-confirmation.tsx` y `contact-followup.tsx` + `supabase/config.toml` con `verify_jwt = false`.

### Decisión que necesito de ti

¿Añado también el **tracking de clic en el botón del dossier** (punto 5) o dejo solo el píxel de apertura del email que ya funciona?


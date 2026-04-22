

## Diagnóstico del error en el email de seguimiento

### Causa raíz
Los 8 fallos en `email_send_log` con `status='dlq'` muestran exactamente el mismo error:

> **"Emails disabled for this project"**

Todos ocurrieron entre el **10 y el 16 de abril**. A partir del **20 de abril**, los envíos vuelven a funcionar correctamente (`status='sent'`). Esto significa que **Lovable Emails estuvo desactivado** durante esa ventana — alguien lo apagó (o se desactivó tras una actualización), y la cron job de `send-followup-email` siguió encolando emails que el dispatcher rechazaba.

El dominio `notify.academiadetail.com` está **verificado y activo** ahora mismo, por eso los envíos posteriores funcionan.

### Problemas detectados

1. **8 leads quedaron sin recibir el email de seguimiento** (todos los del bloque 10–16 abr). En el modal de detalle de `/admin/contacts` aparecen como "Fallo de entrega" pero no se hizo nada para reintentarlos.
2. **`followup_email_sent_at` se marcó igualmente** en esos leads, así que la cron job nunca volverá a reintentarlos automáticamente — están bloqueados en estado fallido permanente.
3. **No hay alerta visible** cuando Lovable Emails se desactiva: la cron sigue ejecutándose, los timestamps se marcan, y solo se ve el problema mirando logs manualmente.

---

## Solución propuesta

### 1. Reintentar los 8 leads fallidos (one-shot)
Resetear `followup_email_sent_at = NULL` en `contact_submissions` para los emails del listado fallido (verificando que el email actual de Lovable está activo). En el siguiente ciclo de la cron job (`send-followup-email` corre cada día a las 08:00), se reenviarán automáticamente.

Leads afectados: `dlopez@escaladetail.com`, `test@viabill.com`, `jdaniellv@hotmail.com`, `pedrocarbila23@gmail.com`, `estefanrodriguez91989@gmail.com`, `gjc@nordvikrentals.com`, `camperwashcarivr@gmail.com`, `mohaaa09@icloud.com`.

### 2. Hacer la cron robusta ante fallos futuros (`send-followup-email/index.ts`)

Modifico la lógica para que **NO marque `followup_email_sent_at`** si la invocación a `send-transactional-email` devuelve error o si la respuesta indica `emails_disabled`. Cambios concretos:

- Capturar la respuesta de `supabase.functions.invoke()` y comprobar `error` y el body.
- Si hay error → **no actualizar el timestamp**, log explícito "follow-up failed for X, will retry next cycle", continuar con el siguiente lead.
- Si éxito → actualizar `followup_email_sent_at` como hasta ahora.
- Añadir un **límite de reintentos** mediante un nuevo campo `followup_attempts` (integer, default 0) que se incrementa en cada intento fallido — al llegar a 5 se marca como definitivamente fallido para no martillear el sistema.

### 3. Indicador visible en el dashboard cuando Lovable Emails está caído

En la cabecera de `/admin/contacts`, añadir un **banner rojo** que aparece sólo si en las últimas 24h hay ≥1 entrada en `email_send_log` con `error_message ILIKE '%emails disabled%'`. Mensaje:

> ⚠️ Lovable Emails está desactivado. Los envíos automáticos están fallando. Reactívalo en Cloud → Emails.

Así el problema se ve a simple vista en el dashboard, no hay que ir a buscar logs.

### 4. Re-deploy
Tras los cambios en `send-followup-email/index.ts`, redesplegar la edge function.

---

### Archivos afectados

- **Migración SQL**: añadir columna `followup_attempts integer NOT NULL DEFAULT 0` a `contact_submissions` + reset de `followup_email_sent_at = NULL` para los 8 leads fallidos.
- **`supabase/functions/send-followup-email/index.ts`**: lógica de detección de fallos, no marcar timestamp si falla, incrementar contador de intentos, frenar tras 5 intentos.
- **`src/pages/AdminContacts.tsx`**: nuevo banner de aviso cuando Lovable Emails parece estar desactivado (query a `email_send_log` por error_message reciente).
- **Re-deploy**: `send-followup-email`.

### Lo que NO hago
- No toco `track-email-open` ni `track-dossier-click` (funcionan bien).
- No toco las plantillas de email (el problema no era de contenido, era de infraestructura).
- No reactivo Lovable Emails desde aquí (ya está activo según `check_email_domain_status`).


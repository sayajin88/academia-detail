
## Diagnóstico encontrado

He revisado la configuración, los logs y el flujo de código del envío de emails/dossieres. Ahora mismo hay dos problemas claros:

1. **La infraestructura de email no está activa**
   - El dominio de envío sigue en estado **Pending**.
   - Los últimos envíos terminan en `dlq` con el error **“Emails disabled for this project”**.
   - Esto significa que los correos se encolan, pero **no salen realmente**.

2. **El código marca correos como “enviados” demasiado pronto**
   - `send-contact-email` marca `dossier_email_sent = true` antes de que el envío real ocurra.
   - `send-followup-email` marca `followup_email_sent = true` justo después de encolar.
   - `src/pages/AdminContacts.tsx` también marca el dossier como enviado tras encolar el email.
   - Resultado: el panel muestra “enviado” aunque el correo nunca llegó.

Además, he detectado un tercer problema secundario:
- El sistema de apertura de dossier (`track-email-open`) existe, pero **no está insertado en las plantillas actuales**, así que el tracking visual de aperturas no es fiable.

## Qué haría para corregirlo

### 1. Corregir la infraestructura de email
Objetivo: asegurar que el proyecto puede enviar correos de verdad.

- Revisar el estado real del dominio configurado para este proyecto.
- Revalidar la configuración de emails del proyecto y comprobar si el envío está desactivado a nivel de proyecto.
- Rehabilitar la infraestructura de emails si está desactivada.
- Verificar que el procesador de cola y la configuración de envío estén operativos.
- Confirmar con logs recientes que los estados pasan de `pending` a `sent` y dejan de caer en `dlq`.

### 2. Corregir la lógica de estado “enviado”
Objetivo: que el admin vea el estado real y no un falso positivo.

Archivos a corregir:
- `supabase/functions/send-contact-email/index.ts`
- `supabase/functions/send-followup-email/index.ts`
- `src/pages/AdminContacts.tsx`

Cambios propuestos:
- Dejar de usar `dossier_email_sent = true` y `followup_email_sent = true` inmediatamente tras encolar.
- Introducir una separación clara entre:
  - **intentado / en cola**
  - **enviado realmente**
  - **fallido**
- Hacer que el panel admin no trate “encolado” como “entregado”.
- Evitar actualizar por email cuando se pueda identificar el lead exacto por `id`.

### 3. Hacer consistente el flujo de dossier desde frontend y backend
Objetivo: unificar el comportamiento de envío.

- Revisar que el envío desde formulario y el reenvío desde admin usen la misma lógica y mismo criterio de estado.
- Ajustar el envío masivo para que no marque el dossier como enviado si el sistema de correo está caído o deshabilitado.
- Mejorar el mensaje mostrado al admin para distinguir:
  - “solicitado”
  - “encolado”
  - “entregado”
  - “fallido”

### 4. Arreglar el tracking de apertura del dossier
Objetivo: que los indicadores de apertura del panel vuelvan a tener sentido.

- Añadir el píxel de tracking a las plantillas que envían el dossier.
- Conectar correctamente el `tracking_token` con el email que contiene el dossier.
- Asegurar que el panel admin solo muestre métricas de apertura cuando el tracking esté realmente activo.

### 5. Verificar el sistema completo end-to-end
Objetivo: comprobar el flujo real tras la corrección.

Haré estas comprobaciones:
- envío desde formulario público
- notificación al admin
- envío del dossier al lead
- reenvío manual desde `/admin/contacts`
- envío de follow-up automático
- revisión de `email_send_log` para confirmar `sent` reales
- comprobación de que ya no aparecen falsos “enviado”

## Resultado esperado

Después de aplicar este plan:
- los emails volverán a salir realmente
- el admin dejará de ver estados falsos
- el envío de dossier y follow-up será coherente
- el tracking de apertura volverá a reflejar algo real
- podremos identificar si un lead recibió el dossier, si quedó en cola o si falló

## Detalles técnicos relevantes

- Estado actual del dominio de envío: **Pending**
- Estado observado en logs recientes: **32 envíos en `dlq`**
- Error dominante: **Emails disabled for this project**
- Tabla de supresión: sin bloqueos recientes, así que **no es un problema de suppression**
- Código que hoy genera falsos positivos:
  - `supabase/functions/send-contact-email/index.ts`
  - `supabase/functions/send-followup-email/index.ts`
  - `src/pages/AdminContacts.tsx`

## Archivos previstos

- `supabase/functions/send-contact-email/index.ts`
- `supabase/functions/send-followup-email/index.ts`
- `supabase/functions/_shared/transactional-email-templates/contact-confirmation.tsx`
- `src/pages/AdminContacts.tsx`

Si al implementar veo que hace falta guardar estados más precisos de entrega, también propondré una pequeña ampliación del modelo de datos para reflejar mejor el estado real del email.

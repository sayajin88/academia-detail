# Pausar envío automático del dossier

## Contexto
Actualmente cada vez que un alumno/contacto rellena el formulario, la Edge Function `send-contact-email` dispara dos emails:
1. Notificación al admin (`admin-new-lead`).
2. Confirmación al cliente (`contact-confirmation`) que incluye el botón de descarga del dossier PDF.

Además, a los 2 días, `send-followup-email` envía el email de seguimiento (`contact-followup`) que también enlaza al dossier. El admin puede reenviar el dossier manualmente desde `/admin/contacts`.

## Objetivo
Paralizar temporalmente todo envío del dossier mientras se revisa y mejora el PDF, sin romper el resto del flujo (notificación al admin, registro en base de datos, webhook n8n).

## Cambios propuestos

### 1. Edge Function `send-contact-email`
- Comentar/saltar la invocación del template `contact-confirmation` (el email con el dossier).
- Mantener la notificación al admin (`admin-new-lead`).
- Dejar de grabar `dossier_email_sent_at` mientras el envío está pausado.
- Añadir un log y comentario explícito: "DOSSIER PAUSADO - reactivar cuando el PDF esté actualizado".

### 2. Edge Function `send-followup-email`
- Añadir una guarda inicial que devuelva `sent: 0` sin procesar nada mientras el dossier esté pausado, ya que el seguimiento depende de `dossier_email_sent_at` y referencia el dossier.
- Dejar el código existente intacto para poder reactivarlo fácilmente.

### 3. Plantillas de email
- En `contact-confirmation.tsx`: eliminar el botón de descarga del dossier y el texto que lo menciona, sustituyéndolo por un mensaje de bienvenida genérico.
- En `contact-followup.tsx`: eliminar el bloque "¿No encuentras el programa formativo?" y el enlace al dossier.
- De esta forma, si en el futuro se reactiva el envío, no se enviará el PDF desactualizado por error.

### 4. Panel de admin `/admin/contacts`
- Deshabilitar/ocultar el botón "Reenviar dossier por email".
- Deshabilitar/ocultar el botón de envío masivo "Enviar dossier a seleccionados".
- Añadir un aviso informativo tipo banner: "Envío de dossier temporalmente pausado. Se reactivará cuando se actualice el programa formativo."
- Mantener visibles los chips/estadísticas históricas de dossieres ya enviados.

## No se tocará
- El flujo de registro/contacto en base de datos.
- La notificación al admin de nuevo lead.
- El webhook a n8n.
- El tracking de apertura (`track-email-open`) ni el tracking de clics (`track-dossier-click`), que seguirán funcionando para envíos futuros cuando se reactiva.

## Reactivación futura
El plan deja el código comentado y estructurado para que, cuando el dossier esté listo, se pueda revertir en una sola pasada reactivando las invocaciones y restaurando los botones en las plantillas.



## Plan: Migrar emails a infraestructura Lovable Cloud para mejorar entregabilidad

### Problema actual

Los emails se envían mediante Resend SDK directamente, pero el dominio `notify.escaladetail.com` tiene los DNS delegados a Lovable Cloud (NS records apuntan a `ns3/ns4.lovable.cloud`). Resend no puede verificar esos registros DNS, así que los emails salen sin autenticación SPF/DKIM correcta → los proveedores (Gmail, Outlook) los marcan como spam.

### Solución

Migrar los 3 flujos de email existentes a la infraestructura integrada de Lovable Cloud, que ya tiene el dominio verificado con SPF, DKIM y DMARC configurados automáticamente.

---

### Paso 1 — Configurar infraestructura de email

Ejecutar las herramientas internas para crear:
- Colas de email con reintentos automáticos (pgmq)
- Tablas de log, supresión y unsubscribe
- Cron job para procesar la cola cada 5 segundos
- Edge Function `process-email-queue` (dispatcher)

### Paso 2 — Crear templates de email como componentes React Email

Crear 3 templates en `supabase/functions/_shared/transactional-email-templates/`:

| Template | Propósito |
|---|---|
| `contact-confirmation` | Email de confirmación con enlace al dossier PDF |
| `contact-followup` | Email de seguimiento a los 2 días |
| `admin-new-lead` | Notificación al admin de nuevo lead |

Cada template mantendrá el mismo copy persuasivo actual pero como componentes React Email con estilos inline.

### Paso 3 — Migrar `send-contact-email/index.ts`

- Eliminar import de Resend SDK
- Usar `supabase.functions.invoke('send-transactional-email', ...)` para enviar ambos emails (admin + cliente)
- Mantener la lógica de tracking pixel y token UUID
- Mantener la validación de campos existente

### Paso 4 — Migrar `send-followup-email/index.ts`

- Eliminar Resend SDK
- Usar `send-transactional-email` con el template `contact-followup`
- Mantener la lógica de consulta de leads pendientes

### Paso 5 — Migrar `send-registration-emails/index.ts`

- Misma migración: eliminar Resend, usar infraestructura integrada

### Paso 6 — Crear página de unsubscribe

- Nueva ruta `/unsubscribe` en la app
- Página con branding de Detail Park Academy
- Gestión automática de supresión de emails

---

### Beneficios de entregabilidad

- SPF, DKIM y DMARC configurados automáticamente en `notify.escaladetail.com`
- Reintentos automáticos con backoff en caso de rate-limit
- Gestión de bounces y quejas (supresión automática)
- Logs de envío con estado de cada email
- Cola duradera: los emails no se pierden si hay errores temporales

### Archivos afectados

| Archivo | Acción |
|---|---|
| `_shared/transactional-email-templates/*.tsx` | Crear 3 templates |
| `_shared/transactional-email-templates/registry.ts` | Registrar templates |
| `supabase/functions/send-contact-email/index.ts` | Reescribir sin Resend |
| `supabase/functions/send-followup-email/index.ts` | Reescribir sin Resend |
| `supabase/functions/send-registration-emails/index.ts` | Reescribir sin Resend |
| `src/pages/Unsubscribe.tsx` | Crear página de baja |
| `src/App.tsx` | Añadir ruta `/unsubscribe` |


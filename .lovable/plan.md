

## Plan: Emails de leads a info@academiadetail.com + Auditoría completa de Resend

### Por que no llegan los emails a info@academiadetail.com

El problema es exclusivamente de **tu servidor de correo**, no de Resend ni del codigo. Lo que ocurre:

1. Resend envia el email correctamente (confirmado en logs: IDs validos, sin errores)
2. El email llega al servidor que gestiona `info@academiadetail.com`
3. El servidor ve que el email dice venir de `@academiadetail.com` (mismo dominio)
4. Pero llega desde los servidores de Amazon SES (que usa Resend)
5. El servidor lo rechaza silenciosamente porque no reconoce a Amazon SES como remitente autorizado del dominio raiz

**Lo que necesitas configurar en tu proveedor de correo / DNS:**

Debes ir a tu panel de Cloudflare y anadir o modificar el registro **TXT SPF** del dominio raiz `academiadetail.com` (`@`):

- Si NO existe un registro SPF en el raiz, crea uno:
  `v=spf1 include:amazonses.com ~all`

- Si YA existe uno (por ejemplo para Google Workspace), anade `include:amazonses.com` dentro:
  `v=spf1 include:_spf.google.com include:amazonses.com ~all`

- El registro debe tener el **proxy de Cloudflare desactivado** (nube gris)

Ademas, si tu proveedor de correo tiene filtros antispam (ej: cPanel, Hostinger), busca una opcion para **permitir/whitelist** emails de `formacion@academiadetail.com` o del dominio `amazonses.com`.

### Cambios en el codigo (los hago yo)

#### 1. Destino del email admin: volver a info@academiadetail.com con backup a Gmail

Para que no pierdas ningun lead mientras configuras el DNS, implementare un **envio dual**: el email de notificacion se enviara tanto a `info@academiadetail.com` como a `academiadetail@gmail.com`. Cuando confirmes que los emails llegan a info@, eliminaremos el backup.

**Archivo**: `supabase/functions/send-contact-email/index.ts`

- Linea 5: Cambiar el fallback de `academiadetail@gmail.com` a `info@academiadetail.com`
- Anadir envio de copia de seguridad a `academiadetail@gmail.com`

#### 2. Auditoría completa de Resend - Hallazgos y correcciones

| Funcion | Hallazgo | Accion |
|---------|----------|--------|
| `send-contact-email` | Remitente `formacion@academiadetail.com` (correcto, dominio verificado) | Sin cambios |
| `send-contact-email` | Logging de errores mejorado (ya aplicado) | Sin cambios |
| `send-contact-email` | CORS headers completos | Sin cambios |
| `send-contact-email` | Validacion de campos robusta | Sin cambios |
| `send-registration-emails` | Usa `onboarding@resend.dev` como remitente | Cambiar a `formacion@academiadetail.com` para mejor marca |
| `send-registration-emails` | CORS headers incompletos (faltan headers de Supabase client) | Actualizar headers |
| `send-registration-emails` | No verifica errores de Resend en la respuesta | Anadir verificacion |
| `send-registration-emails` | Email admin usa `onboarding@resend.dev` | Mantener (va a Gmail, funciona) |
| Secrets | `RESEND_API_KEY` configurado | OK |
| Secrets | `ADMIN_EMAIL` configurado | OK |
| Secrets | `Stripe` configurado | OK |
| Config | Todas las funciones con `verify_jwt = false` | Correcto para endpoints publicos |

### Resumen de tareas

| Tarea | Quien |
|-------|-------|
| Cambiar destino admin email a `info@academiadetail.com` + backup Gmail | Lovable |
| Actualizar CORS headers en `send-registration-emails` | Lovable |
| Anadir verificacion de errores Resend en `send-registration-emails` | Lovable |
| Cambiar remitente cliente en `send-registration-emails` a dominio verificado | Lovable |
| Redesplegar y enviar test automatico | Lovable |
| Anadir `include:amazonses.com` al SPF raiz en Cloudflare | Tu |
| Verificar que el email llega a info@academiadetail.com | Tu |

### Seccion tecnica

**Cambio 1** - `supabase/functions/send-contact-email/index.ts`:

```typescript
// Linea 5: Destino principal
const adminEmail = Deno.env.get("ADMIN_EMAIL") || "info@academiadetail.com";
const backupEmail = "academiadetail@gmail.com";

// Linea 296-302: Envio al admin (destino principal + backup)
const adminEmailResponse = await resend.emails.send({
  from: "Detail Park Academy <formacion@academiadetail.com>",
  to: [adminEmail],
  cc: [backupEmail],  // Backup para no perder leads
  replyTo: email,
  subject: `Nuevo lead: ${formacionLabels[tipo_formacion] || tipo_formacion} - ${nombre} ${apellidos}`,
  html: generateAdminEmail(contactData),
});
```

**Cambio 2** - `supabase/functions/send-registration-emails/index.ts`:

```typescript
// CORS headers actualizados
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Remitente cliente: dominio verificado
from: "Detail Park <formacion@academiadetail.com>",

// Verificacion de errores Resend
if (clientEmailResponse.error) {
  console.error("Resend error sending client email:", JSON.stringify(clientEmailResponse.error));
} else {
  console.log("Client email sent successfully. ID:", clientEmailResponse.data?.id);
}
```


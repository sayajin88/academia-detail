

## Plan: Solucion definitiva para emails de leads y DNS

### Problema 1: El email a info@academiadetail.com no llega

**Diagnostico confirmado:** Resend envia el email correctamente (sin errores en logs). El problema ocurre DESPUES de Resend: el servidor de correo que gestiona `info@academiadetail.com` rechaza silenciosamente el email porque:
- Llega desde servidores externos (Amazon SES / Resend)
- Pero dice ser de `@academiadetail.com` (mismo dominio)
- El servidor lo interpreta como suplantacion (spoofing)

**Solucion: Cambiar el remitente del email admin**

En vez de enviar el email al admin desde `formacion@academiadetail.com`, usaremos `onboarding@resend.dev` (el dominio por defecto de Resend, que ya esta verificado y tiene todos los registros DNS correctos). Esto elimina el conflicto de "mismo dominio" por completo.

El email al **cliente** (lead) se mantiene con `formacion@academiadetail.com` porque va a un dominio externo (gmail, hotmail, etc.) y no tiene problemas.

**Archivo**: `supabase/functions/send-contact-email/index.ts`

| Linea | Cambio |
|-------|--------|
| 296-302 | Cambiar `from` del admin email a `Detail Park Academy <onboarding@resend.dev>` |

Esto es exactamente lo que ya usa la funcion `send-registration-emails` (que funciona correctamente).

### Problema 2: La web no carga (DNS)

El error de build `429 - Reduce your concurrent request rate` es **temporal** del servidor de despliegue (Cloudflare R2). No tiene que ver con tu codigo ni con DNS. Se resuelve automaticamente al reintentar el despliegue.

Sin embargo, si tu **dominio personalizado** `academiadetail.com` dejo de cargar la web, es posible que al modificar registros DNS en Cloudflare para intentar arreglar el email hayas alterado algun registro necesario para la web.

**Verificacion que debes hacer en Cloudflare:**

1. Confirma que el registro **A** para `@` (dominio raiz) apunta a `185.158.133.1` (IP de Lovable)
2. Confirma que el registro **A** para `www` apunta a `185.158.133.1`
3. Confirma que existe el registro **TXT** `_lovable` con el valor de verificacion
4. Estos registros deben tener el **proxy de Cloudflare activado o desactivado** segun como lo tenias originalmente

Si no recuerdas la configuracion original, puedes ir a Settings > Domains en tu proyecto de Lovable para ver las instrucciones exactas.

### Resumen de cambios

| Tarea | Quien | Detalle |
|-------|-------|---------|
| Cambiar remitente admin email a `onboarding@resend.dev` | Lovable | Evita conflicto de dominio |
| Mantener remitente cliente como `formacion@academiadetail.com` | Lovable | Sin cambios (funciona bien) |
| Redesplegar y enviar test automatico | Lovable | Verificar entrega |
| Verificar registros DNS A y TXT en Cloudflare | Tu | Para que el dominio personalizado cargue |

### Seccion tecnica

**Cambio en** `supabase/functions/send-contact-email/index.ts`:

```typescript
// Linea 296-302: Email admin
const adminEmailResponse = await resend.emails.send({
  from: "Detail Park Academy <onboarding@resend.dev>",  // Cambiado
  to: [adminEmail],
  replyTo: email,
  subject: `Nuevo lead: ${formacionLabels[tipo_formacion] || tipo_formacion} - ${nombre} ${apellidos}`,
  html: generateAdminEmail(contactData),
});
```

El email al cliente (linea 310-315) se mantiene sin cambios con `formacion@academiadetail.com`.

Tras el despliegue, enviare una prueba automatica para confirmar que el email llega a `info@academiadetail.com`.


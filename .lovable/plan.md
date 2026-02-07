

## Plan: Corregir la entrega de emails de leads a info@academiadetail.com

### Diagnostico

El email de confirmacion al lead llega correctamente, pero el email con la informacion del lead a `info@academiadetail.com` se queda en estado "Sent" y nunca llega. Esto ocurre porque:

1. El remitente es `noreply@academiadetail.com`, que Resend marca como problematico (alerta visible en su panel)
2. El email va del mismo dominio al mismo dominio (de `@academiadetail.com` a `@academiadetail.com`), y el servidor receptor lo interpreta como posible suplantacion al llegar desde servidores externos (Amazon SES)

### Cambios en el codigo (Parte 1 - la hago yo)

**Archivo**: `supabase/functions/send-contact-email/index.ts`

| Linea | Antes | Despues |
|-------|-------|---------|
| 297 | `from: "Detail Park Academy <noreply@academiadetail.com>"` | `from: "Detail Park Academy <formacion@academiadetail.com>"` |
| 307 | `from: "Detail Park Academy <noreply@academiadetail.com>"` | `from: "Detail Park Academy <formacion@academiadetail.com>"` |

Usar `formacion@` en vez de `noreply@` elimina la alerta de Resend y mejora la confianza del email.

Ademas, anadire logging mejorado para registrar errores especificos de Resend en caso de fallos futuros.

### Configuracion DNS (Parte 2 - la haces tu en Cloudflare)

Para que el servidor de correo de `info@academiadetail.com` acepte emails enviados desde Resend, el registro SPF del **dominio raiz** `academiadetail.com` debe autorizar a los servidores de Resend.

**Pasos en Cloudflare:**

1. Ve a tu panel de Cloudflare > DNS > Registros
2. Busca si ya existe un registro **TXT** en `@` (dominio raiz) con `v=spf1...`
3. Si **no existe**, crea uno nuevo:

```text
Tipo: TXT
Nombre: @
Contenido: v=spf1 include:amazonses.com ~all
```

4. Si **ya existe** un SPF (por ejemplo para Google Workspace), anade `include:amazonses.com` dentro del registro existente. Ejemplo:

```text
v=spf1 include:_spf.google.com include:amazonses.com ~all
```

5. Asegurate de que el **proxy de Cloudflare esta desactivado** (nube gris, solo DNS) para este registro

### Despliegue y verificacion

Tras aplicar ambos cambios:

1. Redesplegar la Edge Function con el nuevo remitente
2. Enviar una prueba automatica desde el endpoint
3. Verificar en los logs que Resend devuelve un ID sin errores
4. Confirmar contigo que el email ha llegado a `info@academiadetail.com`

### Resumen

| Tarea | Responsable |
|-------|-------------|
| Cambiar remitente de `noreply@` a `formacion@` en ambos emails | Lovable |
| Mejorar logging de errores de Resend | Lovable |
| Redesplegar y probar la Edge Function | Lovable |
| Anadir `include:amazonses.com` al SPF raiz en Cloudflare | Tu |


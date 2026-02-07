

## Plan: Cambiar el email de destino de leads a info@academiadetail.com

### Contexto

Actualmente los leads del formulario de contacto se envian a `info@detailpark.com` (configurado en el secreto `ADMIN_EMAIL` y como fallback en el codigo). El objetivo es cambiar el destino a `info@academiadetail.com`, que ya esta registrado en tu servidor.

### Cambios necesarios

#### 1. Actualizar el secreto ADMIN_EMAIL

Se actualizara el valor del secreto `ADMIN_EMAIL` de `info@detailpark.com` a `info@academiadetail.com`.

#### 2. Actualizar el fallback en el codigo

**Archivo**: `supabase/functions/send-contact-email/index.ts` (linea 5)

Cambiar la direccion de fallback para que sea consistente:

| Antes | Despues |
|-------|---------|
| `info@detailpark.com` | `info@academiadetail.com` |

#### 3. Redesplegar y probar

- Redesplegar la Edge Function con el cambio.
- Realizar una llamada de prueba al endpoint para verificar que el email se envia correctamente a `info@academiadetail.com`.
- Verificar el estado de respuesta (200 OK) y los logs de la funcion.

### Ventaja adicional

Al usar `info@academiadetail.com`, tanto el remitente (`noreply@academiadetail.com`) como el destinatario comparten el mismo dominio `academiadetail.com`. Esto deberia eliminar los problemas de spam que habia con `detailpark.com`, ya que el dominio `academiadetail.com` ya esta verificado en Resend.

### Seccion tecnica

**Archivo a modificar**: `supabase/functions/send-contact-email/index.ts`

**Cambio en linea 5**:
```typescript
// Antes
const adminEmail = Deno.env.get("ADMIN_EMAIL") || "info@detailpark.com";

// Despues
const adminEmail = Deno.env.get("ADMIN_EMAIL") || "info@academiadetail.com";
```

**Secreto a actualizar**: `ADMIN_EMAIL` -> `info@academiadetail.com`

**Prueba**: Llamada POST a la Edge Function con datos de prueba para confirmar entrega exitosa.




## Plan: Cambiar email de destino del admin a admin@detailpark.com

### Cambio necesario

Actualmente la edge function `send-contact-email` lee el email del admin desde la variable de entorno `ADMIN_EMAIL`:

```
const adminEmail = Deno.env.get("ADMIN_EMAIL") || "info@detailpark.es";
```

Solo hay que hacer **2 cosas**:

---

### PASO 1: Actualizar el secreto ADMIN_EMAIL

Cambiar el valor de la variable de entorno `ADMIN_EMAIL` en el backend a `admin@detailpark.com`. Esto se hara usando la herramienta de secretos.

### PASO 2: Actualizar el fallback en el codigo

Cambiar el fallback en la linea 5 de `supabase/functions/send-contact-email/index.ts`:

| Antes | Despues |
|-------|---------|
| `info@detailpark.es` | `admin@detailpark.com` |

Asi, aunque el secreto no este configurado por alguna razon, los emails siempre llegaran a la direccion correcta.

---

### Archivo a modificar

| Archivo | Cambio |
|---------|--------|
| `supabase/functions/send-contact-email/index.ts` | Cambiar fallback de `info@detailpark.es` a `admin@detailpark.com` (linea 5) |
| Secreto `ADMIN_EMAIL` | Actualizar valor a `admin@detailpark.com` |


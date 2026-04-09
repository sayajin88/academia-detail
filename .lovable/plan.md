

## Plan: Configurar Reply-To en todos los emails transaccionales

### Problema
Cuando un alumno responde a un email de confirmación o seguimiento, la respuesta no llega a `admin@detailpark.com` porque no hay cabecera Reply-To configurada.

### Solución
Añadir `reply_to: "admin@detailpark.com"` al payload de envío en `send-transactional-email/index.ts`. Esto aplica automáticamente a todos los templates (confirmación, seguimiento, etc.).

### Cambios

**1. `supabase/functions/send-transactional-email/index.ts`**
- Añadir constante `REPLY_TO = "admin@detailpark.com"`
- Incluir `reply_to` en el objeto payload que se encola (línea ~313-327)

**2. Redesplegar la función**
- Deploy de `send-transactional-email` para que el cambio surta efecto

### Resultado
Cualquier respuesta de un alumno a cualquier email enviado por el sistema llegará directamente a `admin@detailpark.com`.


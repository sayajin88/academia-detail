

## Plan: Notificar a admin@detailpark.com en cada nuevo lead

### Situación actual

- La edge function `send-contact-email` ya existe y envía emails bien formateados (admin + confirmación al cliente) vía Resend.
- El formulario activo (`EnrollmentWizard.tsx`) guarda en DB y envía al webhook de n8n, pero **nunca llama a `send-contact-email`**.
- La variable `ADMIN_EMAIL` en secrets está configurada (actualmente apunta a `info@academiadetail.com` por defecto).

### Cambios

#### 1. Actualizar `ADMIN_EMAIL` secret → `admin@detailpark.com`
Usar la herramienta de secrets para actualizar el valor a `admin@detailpark.com`.

#### 2. Añadir llamada a `send-contact-email` en `EnrollmentWizard.tsx`
Después del insert en DB (línea ~103), añadir una llamada a la edge function existente:

```typescript
// Después del DB insert, enviar emails
try {
  await supabase.functions.invoke("send-contact-email", {
    body: {
      nombre: data.nombre,
      apellidos: data.apellidos,
      email: data.email,
      telefono: data.telefono,
      experiencia: data.experiencia,
      centro_propio: data.centro_propio,
      inversion: data.inversion,
      tipo_formacion: data.tipo_formacion,
      mensaje: data.mensaje || "",
      source: "contact_page",
    },
  });
} catch (err) {
  console.error("Email send error:", err);
}
```

Esto reutiliza la edge function existente que ya:
- Envía email completo al admin con todos los campos formateados
- Envía confirmación al cliente
- Usa Resend con el dominio verificado `formacion@academiadetail.com`

### Archivos a modificar

| Archivo | Cambio |
|---|---|
| `src/components/contact/EnrollmentWizard.tsx` | Añadir invocación de `send-contact-email` tras el DB insert |
| Secret `ADMIN_EMAIL` | Actualizar valor a `admin@detailpark.com` |

### Sin cambios
- No se toca la edge function `send-contact-email` (ya funciona correctamente)
- No se elimina el webhook de n8n (sigue operativo en paralelo)


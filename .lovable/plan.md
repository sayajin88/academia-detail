

## Plan: Sincronizar Resend con el Formulario de Contacto

### PROBLEMAS DETECTADOS

Tras auditar todo el flujo de contacto, he encontrado **5 problemas criticos**:

1. **La edge function `send-contact-email` existe pero NUNCA se llama** - No hay ninguna referencia a ella en el codigo frontend. Tiene 0 logs de ejecucion.

2. **El formulario de contacto usa Formspree en vez de Resend** - `ContactForm.tsx` envia los datos via Formspree (ID: maqqevbn), no a traves de la edge function con Resend.

3. **El formulario de HomeCTA es falso** - El mini-formulario de la Home (`HomeCTA.tsx`) simula un envio con `setTimeout` pero no envia nada a ningun backend. Los leads se pierden.

4. **Desajuste de datos entre formulario y edge function** - El formulario envia campos de cualificacion de leads (experiencia, centro_propio, inversion, tipo_formacion) pero la edge function espera campos simples (name, email, phone, subject, message).

5. **Email incorrecto en 2 componentes** - `ContactSuccessModal.tsx` y `PsychologicalTriggers.tsx` usan `info@detailpark.com` en vez de `info@detailpark.es`.

6. **Resend usa dominio de pruebas** - El "from" es `onboarding@resend.dev` que solo puede enviar emails a la cuenta del propietario de Resend, no a clientes reales.

### FLUJO ACTUAL vs FLUJO DESEADO

```text
ACTUAL (roto):
ContactForm --> Formspree (email) + Supabase DB (backup)
HomeCTA     --> Nada (simulado)
Edge Fn     --> Resend (nunca se llama)

DESEADO (sincronizado):
ContactForm --> Supabase DB + Edge Function (Resend: admin + cliente)
HomeCTA     --> Supabase DB + Edge Function (Resend: admin + cliente)
```

---

### PASO 1: Reescribir la Edge Function `send-contact-email`

Actualizar para aceptar los campos completos de cualificacion de leads:

**Datos que recibira:**

| Campo | Tipo | Requerido |
|-------|------|-----------|
| nombre | string | Si |
| apellidos | string | Si |
| email | string | Si |
| telefono | string | Si |
| experiencia | string | Si |
| centro_propio | string | Si |
| inversion | string | Si |
| tipo_formacion | string | Si |
| mensaje | string | No |
| source | string | Si ("contact_page" o "home_cta") |

**Cambios en la funcion:**
- Adaptar la interfaz `ContactRequest` a los nuevos campos
- Actualizar las validaciones del servidor
- Reescribir el HTML del email al admin para incluir todos los campos de cualificacion (experiencia, centro, inversion, tipo de formacion) con badges de colores
- Reescribir el email de confirmacion al cliente
- Cambiar el `from` a un dominio verificado o mantener `onboarding@resend.dev` con nota de advertencia
- Cambiar `info@detailpark.com` a `info@detailpark.es` en el fallback de ADMIN_EMAIL

---

### PASO 2: Actualizar `ContactForm.tsx`

Reemplazar Formspree por la edge function de Resend:

- Eliminar la importacion de `@formspree/react`
- Eliminar `useFormspree("maqqevbn")` y toda la logica de `formspreeState`
- Crear estado propio para `isSubmitting` y manejo de errores
- En `onSubmit`:
  1. Guardar en `contact_submissions` (mantener)
  2. Llamar a la edge function `send-contact-email` via `supabase.functions.invoke()`
  3. Mostrar el modal de exito si ambas operaciones van bien
  4. Mostrar error si falla el envio de email

---

### PASO 3: Conectar `HomeCTA.tsx` al Backend

Reemplazar el `setTimeout` simulado por envio real:

- Importar `supabase` client
- En `handleSubmit`:
  1. Guardar en `contact_submissions` con valores por defecto para los campos de cualificacion que no tiene el mini-formulario (experiencia: "sin_especificar", etc.)
  2. Llamar a la edge function `send-contact-email` con `source: "home_cta"`
  3. Mantener el toast de exito
  4. Mostrar toast de error si falla

---

### PASO 4: Corregir Emails Incorrectos

| Archivo | Cambio |
|---------|--------|
| `src/components/contact/ContactSuccessModal.tsx` | `info@detailpark.com` a `info@detailpark.es` (2 ocurrencias) |
| `src/components/PsychologicalTriggers.tsx` | `garantia@detailpark.com` a `garantia@detailpark.es` |
| `supabase/functions/send-contact-email/index.ts` | Fallback `info@detailpark.com` a `info@detailpark.es` |

---

### PASO 5: Nota sobre Dominio de Resend

Actualmente el "from" usa `onboarding@resend.dev` que es el dominio de pruebas de Resend. Esto tiene limitaciones:
- Solo puede enviar emails a la direccion del propietario de la cuenta Resend
- Los emails de confirmacion al cliente NO se entregaran a direcciones externas

Para solucionarlo en el futuro, necesitaras verificar tu dominio propio en Resend (por ejemplo `noreply@detailpark.es`). Por ahora, la implementacion funcionara para recibir los leads en el email del admin, pero el email de confirmacion al cliente solo funcionara si verificas el dominio.

---

### RESUMEN DE ARCHIVOS A MODIFICAR

| Archivo | Cambio |
|---------|--------|
| `supabase/functions/send-contact-email/index.ts` | Reescribir para aceptar datos completos de cualificacion, corregir email fallback |
| `src/components/contact/ContactForm.tsx` | Reemplazar Formspree por edge function Resend, mantener guardado en DB |
| `src/components/home/HomeCTA.tsx` | Conectar al backend real (DB + edge function) |
| `src/components/contact/ContactSuccessModal.tsx` | Corregir email `detailpark.com` a `detailpark.es` |
| `src/components/PsychologicalTriggers.tsx` | Corregir email `detailpark.com` a `detailpark.es` |


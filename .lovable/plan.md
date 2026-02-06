

## Plan: Guardar Consultas del Formulario de Contacto en Base de Datos

### SITUACION ACTUAL

El formulario de contacto (`/contacto`) envia los datos **unicamente a Formspree** (servicio externo). No guarda nada en la base de datos. La tabla `registrations` es solo para inscripciones a la Jornada Cero (con pago Stripe), por eso no aparece nada ahi.

```text
FLUJO ACTUAL:
Usuario rellena formulario --> Formspree (externo) --> Email a academiadetail@gmail.com
                                                    (no queda registro en tu base de datos)
```

---

### SOLUCION PROPUESTA

Crear una tabla `contact_submissions` y guardar cada consulta en la base de datos, **ademas** de seguir enviandola a Formspree como hasta ahora.

```text
FLUJO NUEVO:
Usuario rellena formulario --> Formspree (externo) --> Email (como siempre)
                           --> Base de datos (NUEVO) --> Visible en tu backend
```

---

### PASO 1: Crear tabla `contact_submissions`

Nueva migracion SQL para crear la tabla con todos los campos del formulario:

| Columna | Tipo | Descripcion |
|---------|------|-------------|
| `id` | uuid (PK) | Identificador unico |
| `created_at` | timestamptz | Fecha de envio |
| `nombre` | text | Nombre del contacto |
| `apellidos` | text | Apellidos |
| `email` | text | Email |
| `telefono` | text | Telefono |
| `experiencia` | text | Nivel experiencia en detailing |
| `centro_propio` | text | Si tiene centro propio |
| `inversion` | text | Presupuesto de inversion |
| `tipo_formacion` | text | Tipo de formacion que le interesa |
| `mensaje` | text | Mensaje opcional |
| `acepto_privacidad` | boolean | Acepto politica privacidad |

**Politica RLS**: Permitir INSERT publico (para que cualquier visitante pueda enviar el formulario sin necesidad de login). No permitir SELECT/UPDATE/DELETE publico (los datos solo se ven desde el backend).

---

### PASO 2: Modificar `ContactForm.tsx`

Anadir una llamada a la base de datos **junto con** el envio a Formspree existente. El flujo sera:

1. Validar datos (ya existe)
2. **NUEVO**: Insertar en `contact_submissions` via Supabase client
3. Enviar a Formspree (ya existe)
4. Mostrar modal de exito (ya existe)

La insercion en base de datos sera **independiente** del envio a Formspree: si una falla, la otra sigue funcionando. Asi no se pierde ninguna consulta.

```text
// Pseudocodigo del cambio:
const onSubmit = async (data) => {
  // NUEVO: Guardar en base de datos
  await supabase.from('contact_submissions').insert({
    nombre: data.nombre,
    apellidos: data.apellidos,
    email: data.email,
    telefono: data.telefono,
    experiencia: data.experiencia,
    centro_propio: data.centro_propio,
    inversion: data.inversion,
    tipo_formacion: data.tipo_formacion,
    mensaje: data.mensaje,
    acepto_privacidad: data.acepto_privacidad,
  });

  // EXISTENTE: Enviar a Formspree
  await handleFormspreeSubmit(formData);
};
```

---

### ARCHIVOS A MODIFICAR / CREAR

| Archivo | Accion |
|---------|--------|
| Nueva migracion SQL | Crear tabla `contact_submissions` con RLS |
| `src/components/contact/ContactForm.tsx` | Anadir insert a base de datos junto al envio a Formspree |

---

### RESULTADO

- Cada consulta del formulario de contacto quedara guardada en la base de datos **y** se enviara por email via Formspree
- Podras ver todas las consultas desde tu backend
- Si Formspree falla, los datos seguiran en la base de datos como respaldo
- No se requiere autenticacion para enviar el formulario (es publico)


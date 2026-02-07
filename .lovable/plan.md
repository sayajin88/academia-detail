

# Sustituir Formularios "Solicita Informacion" por Banner CTA hacia Contacto + Renombrar "Contacto" a "Inscribirse"

## Resumen

Dos cambios principales:
1. **Eliminar el formulario de 3 campos** (nombre, email, telefono) que aparece en la seccion HomeCTA y sustituirlo por un banner/seccion visual atractivo que redirija directamente a la pagina de Contacto
2. **Renombrar "Contacto" a "Inscribirse"** en el menu de navegacion (desktop y movil)

---

## 1. Renombrar "Contacto" a "Inscribirse" en la Navegacion

### Archivo: `src/components/layout/Navbar.tsx`

- Cambiar el nombre en el array `navLinks`:
  - `{ name: 'Contacto', href: '/contacto', icon: Mail }` pasa a `{ name: 'Inscribirse', href: '/contacto', icon: Mail }`
- Esto afecta automaticamente tanto al menu desktop como al menu movil, ya que ambos iteran sobre `navLinks`

---

## 2. Sustituir HomeCTA: de formulario a banner visual

### Archivo: `src/components/home/HomeCTA.tsx`

**Eliminar**:
- Todo el estado del formulario (`formData`, `isSubmitting`, `handleSubmit`)
- La integracion con Supabase (insert a `contact_submissions` y llamada a edge function `send-contact-email`)
- Los 3 campos de Input (nombre, email, telefono) y el boton de envio
- Las importaciones de `Input`, `useState`, `toast`, `supabase`, `Loader2`, `Send`

**Sustituir por**:
- Un banner/seccion visual a pantalla completa sobre fondo burdeos (manteniendo el gradiente y decoraciones actuales)
- Layout centrado (en vez de 2 columnas) con:
  - Titulo llamativo: "¿Listo para Empezar tu Carrera en Detailing?" (se mantiene)
  - Subtitulo motivacional (se mantiene)
  - **Boton CTA principal grande** que enlaza a `/contacto` con texto "Inscribete Ahora" o "Reserva tu Plaza"
  - Boton secundario de WhatsApp para contacto directo
  - Informacion de contacto (telefono y email, se mantienen)
  - Stats o puntos de confianza opcionales (ej: "+500 alumnos formados", "Respuesta en 24h", "Sin compromiso")
- El componente sera mucho mas ligero al eliminar toda la logica de formulario

### Diseno del nuevo banner:
- Fondo: se mantiene el gradiente burdeos con las decoraciones actuales (pattern overlay, circulos decorativos)
- Layout: centrado, una sola columna
- Donde antes estaba el formulario (columna derecha), ahora habra una tarjeta glassmorphism con 3 puntos de confianza y el boton CTA
- El boton principal sera blanco sobre burdeos (alto contraste) con flecha animada

---

## 3. Paginas afectadas - Verificacion

- **Home** (`HomeCTA`): Es el unico lugar con formulario de 3 campos fuera de la pagina de Contacto. Se sustituye segun el punto 2.
- **FormationDetail** (`FormationCTA`): Ya redirige a `/contacto` con `onCTAClick` (no tiene formulario embebido). No necesita cambios.
- **CarreraDetailing**: Todos los CTAs ya redirigen a `/contacto`. No necesita cambios.
- **AboutUs**: El CTA ya enlaza a formaciones. No necesita cambios.
- **JornadaCero**: Tiene su propio sistema de registro (RegistrationModal). No se toca.
- **ContactForm** (`src/components/contact/ContactForm.tsx`): Es la pagina de destino. Se mantiene intacta con su formulario completo.

---

## Seccion Tecnica - Resumen

| Archivo | Cambio |
|---------|--------|
| `src/components/layout/Navbar.tsx` | Renombrar "Contacto" a "Inscribirse" en `navLinks` |
| `src/components/home/HomeCTA.tsx` | Eliminar formulario y logica Supabase. Sustituir por banner visual con CTA que redirige a `/contacto` |

### Sin cambios
- Pagina de Contacto y su formulario
- FormationCTA (ya redirige a contacto)
- CarreraDetailing (ya redirige a contacto)
- Footer (mantiene "Contacto" como titulo de seccion informativa, no es un enlace de navegacion)
- Backend / Edge Functions
- Rutas


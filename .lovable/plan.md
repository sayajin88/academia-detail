

# Transformar /contacto en Wizard de Inscripcion Interactivo

## Concepto

Reemplazar el formulario clasico por un **wizard multi-paso** con tarjetas visuales clicables en lugar de dropdowns aburridos. Cada paso ocupa la pantalla completa del formulario, con transiciones suaves, barra de progreso y un resumen final antes de enviar. La pagina pasa de "contacto generico" a "inscribete en nuestros cursos".

## Estructura del Wizard (4 pasos)

```text
Paso 1: "¿Qué formación te interesa?"
  → 6 tarjetas visuales con icono + titulo + breve descripcion
  → Detailing | Wrapping | PPF | Restauracion | Negocio | Carrera Completa

Paso 2: "Cuéntanos sobre ti"
  → Tarjetas grandes para experiencia (Soy nuevo / Tengo experiencia)
  → Tarjetas para centro propio (Sí / No)
  → Tarjetas para inversion (4 rangos)

Paso 3: "Tus datos de contacto"
  → Nombre, Apellidos, Email, Telefono
  → Mensaje opcional
  → Checkbox RGPD

Paso 4: "Resumen y envío"
  → Tarjeta resumen con todo lo seleccionado
  → Boton de enviar grande
```

## Componentes a Crear/Modificar

### Nuevo: `src/components/contact/EnrollmentWizard.tsx`
- Componente principal con estado del paso actual (1-4)
- Barra de progreso visual con numeros/iconos de cada paso
- Botones "Anterior" / "Siguiente" con validacion por paso
- Animacion de transicion entre pasos (slide o fade)
- Misma logica de submit (Supabase insert + edge function) del ContactForm actual

### Nuevo: `src/components/contact/wizard/StepFormacion.tsx`
- Grid de 6 tarjetas clicables (2x3 en desktop, 1 columna en movil)
- Cada tarjeta: icono relevante, titulo, descripcion corta, estado selected con borde primary

### Nuevo: `src/components/contact/wizard/StepPerfil.tsx`
- 3 sub-secciones con tarjetas clicables:
  - Experiencia: 2 tarjetas grandes
  - Centro propio: 2 tarjetas
  - Inversion: 4 tarjetas en grid

### Nuevo: `src/components/contact/wizard/StepDatos.tsx`
- Campos de texto: nombre, apellidos, email, telefono
- Textarea mensaje opcional
- Checkbox RGPD

### Nuevo: `src/components/contact/wizard/StepResumen.tsx`
- Tarjeta resumen con todas las selecciones
- Boton de envio final
- Indicador de paso completado

### Modificar: `src/components/contact/ContactHero.tsx`
- Cambiar titulo de "Contacta con Nosotros" a "Inscribete en Nuestras Formaciones"
- Cambiar descripcion acorde al enfoque de inscripcion
- Ajustar stats si procede

### Modificar: `src/pages/Contact.tsx`
- Reemplazar el layout de 2 columnas (formulario + info) por:
  1. Hero actualizado
  2. Wizard de inscripcion (ancho completo, centrado)
  3. Debajo: ContactInfo + GoogleReviews + ContactSchedule

## Detalles Tecnicos

- Se reutiliza el **mismo schema Zod** y la **misma logica de submit** (Supabase + edge function)
- Se mantiene react-hook-form pero con validacion parcial por paso
- Las tarjetas clicables usan `form.setValue()` para actualizar el campo correspondiente
- Barra de progreso con el componente Progress existente o custom con pasos numerados
- Sin nuevas dependencias
- Sin cambios en base de datos
- Sin cambios en edge functions
- ContactSuccessModal se reutiliza tal cual


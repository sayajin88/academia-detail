

## Plan: Validación visual en el paso "Perfil" del wizard

### Problema
Cuando el usuario pulsa "Siguiente" sin haber seleccionado una opción en cada sección (experiencia, centro propio, inversión), la validación de zod se dispara pero no hay feedback visual — las secciones sin seleccionar no muestran ningún aviso.

### Solución
Mostrar los errores de validación de `react-hook-form` directamente en cada sección de `StepPerfil`:

1. **`src/components/contact/wizard/StepPerfil.tsx`**:
   - Leer `form.formState.errors` para los campos `experiencia`, `centro_propio` e `inversion`.
   - Cuando un campo tiene error, mostrar debajo del título de la sección un texto rojo con el mensaje (ej. "Selecciona una opción").
   - Añadir un borde rojo sutil (`border-destructive/50`) al contenedor de opciones de esa sección para que sea visualmente claro cuál falta.
   - Aplicar una animación sutil de shake al grupo con error para llamar la atención.

### Archivos afectados
| Archivo | Cambio |
|---|---|
| `src/components/contact/wizard/StepPerfil.tsx` | Leer errores del form y mostrar indicadores visuales (texto rojo + borde) en secciones sin selección |


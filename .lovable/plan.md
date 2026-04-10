

## Fix: Eliminar el scroll automático en el wizard de inscripción

### Problema
En `EnrollmentWizard.tsx`, las funciones `handleNext` y `handleBack` ejecutan `window.scrollTo({ top: 0 })` cada vez que se cambia de paso, lo que desplaza la pantalla al inicio de la página y descoloca la vista del formulario.

### Solución
Reemplazar `window.scrollTo({ top: 0 })` por un scroll al propio contenedor del wizard usando `scrollIntoView`, de forma que el formulario se mantenga siempre visible en la misma posición relativa.

### Cambio en `src/components/contact/EnrollmentWizard.tsx`
- Añadir un `useRef` al contenedor principal del wizard
- En `handleNext` y `handleBack`, reemplazar `window.scrollTo(...)` por `wizardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })` — esto solo ajusta si el wizard queda fuera de vista, sin mover la pantalla innecesariamente.

### Archivos afectados
| Archivo | Cambio |
|---|---|
| `src/components/contact/EnrollmentWizard.tsx` | Ref + scrollIntoView en lugar de scrollTo(0) |


# Imágenes en la landing de Marketing Digital

Añadir soporte visual a `/marketing-digital-detailing`, que hoy es solo texto, iconos y gradientes.

## Qué se añade

1. **Hero — mockup visual**
   Columna derecha del hero con la ilustración del megáfono/móvil (`Grafico-Marketing-Digital.png`) sobre un halo granate, con animación flotante suave. En móvil se coloca debajo del titular.

2. **Sección "Servicios" — ilustración de redes sociales**
   La ilustración de estrategia en redes (`Como-crear-una-estrategia-...png`) como bloque lateral junto a la rejilla de servicios, con marco glassmorphism y borde granate para integrarla en la estética oscura.

3. **Sección "Proceso / Embudos" — ilustración inbound**
   La ilustración de inbound marketing (`La-evolucion-del-Marketing-Inbound...png`) acompañando los pasos del proceso.

4. **Prueba social real — fotos propias**
   Nueva franja "Así trabajamos con centros de detailing" con 3–4 fotos reales del proyecto ya existentes en el repositorio (formación, instalaciones, trabajo en taller), en rejilla con overlay oscuro y pie de foto. Esto aporta autenticidad frente a las ilustraciones genéricas.

## Nota de estilo

Las tres ilustraciones subidas son planas en azul/rojo y no coinciden con la paleta Charcoal + Garnet. Se integrarán con tratamiento de marca (fondo oscuro, halo granate, ligera reducción de saturación y mezcla) para que no rompan la línea visual. Las fotos reales se usan en el bloque de prueba social, donde encajan de forma natural.

## Detalles técnicos

- Las 3 imágenes subidas se suben con `lovable-assets create` desde `/mnt/user-uploads/` y se referencian mediante sus `.asset.json` en `src/assets/marketing/`; no se copian binarios al repositorio.
- Las fotos reales se importan desde `src/assets` con imports ES existentes.
- Archivos a editar: `MarketingHero.tsx`, `MarketingSections.tsx`, y `MarketingDigital.tsx` (nueva franja de prueba social).
- `loading="lazy"` en todo salvo la imagen del hero (`eager`), `alt` descriptivo en español para SEO/accesibilidad.
- Espaciado `py-16 md:py-24` y animaciones con `AnimatedSection` como en el resto de la página.

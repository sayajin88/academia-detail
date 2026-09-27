# Sistema de diseño de academiadetail.com

Reglas comunes a todas las páginas. Si algo no encaja, se amplía el sistema aquí; no se inventan estilos por página.

## Colores (tokens en `src/index.css`)

| Uso | Token / clase | Valor |
|---|---|---|
| Fondo | `bg-background` | #1A1A1F |
| Superficie (tarjetas, secciones alternas) | `bg-card` | #212126 |
| Bordes | `border-border` | |
| Texto principal | `text-foreground` | casi blanco |
| Texto secundario | `text-muted-foreground` | gris claro (AA) |
| **Acento para texto** (palabras destacadas, enlaces, antetítulos, iconos) | `text-brand` | #E07A88 (6:1) |
| **Burdeos** solo como relleno (botones, bandas, fondos suaves `bg-primary/15`) | `bg-primary` | #8B2332 |
| Dorado solo para estrellas de valoración | `text-gold` / `fill-gold` | |
| Verde solo para WhatsApp | `#25D366` | |

Prohibido: `text-primary` (burdeos como texto, contraste 2:1), texto con degradado (`bg-clip-text`), violeta, azul, ámbar, iconos de colores variados, brillos y halos animados.

## Tipografía

- Bebas Neue (`h1`, `h2`, `font-heading`) solo en titulares y cifras grandes (24 px o más). En mayúsculas.
- Open Sans para todo lo demás. `h3`–`h6` son Open Sans 700 en minúscula normal.
- Escala: `.ds-h1` (40/56/64 px), `.ds-h2` (32/44 px), `.ds-h3` (20/22 px), texto 15-17 px, pequeño 13-14 px.
- Antetítulo: `.ds-eyebrow` (12 px, mayúsculas, espaciado, color acento).
- Entradilla: `.ds-lead`. Texto largo a un máximo de ~66 caracteres (`max-w-prose` o `ds-narrow`).

## Espaciado y anchos

- Sección: `.ds-section` (64 px móvil / 96 px escritorio) o `.ds-section-sm` (48/64). Nada más.
- Contenedor: `.ds-container` (1200 px) o `.ds-narrow` (720 px, textos largos).
- Separación entre tarjetas: `gap-4`–`gap-6`. Tarjeta: `.ds-card` + `p-5 md:p-6`.
- Secciones alternas `bg-background` / `bg-card` para separar sin líneas decorativas.

## Componentes (`src/components/ds/`)

- `Section`, `SectionHeader` — toda sección empieza así (antetítulo + H2 + entradilla).
- `FaqList` — preguntas frecuentes (acordeón). Máximo ~8-10 preguntas.
- `StudentReviews` — opiniones reales de alumnos en Google (fuente: `src/data/site.ts`).
- `CtaBand` — bloque final de contacto (burdeos). Uno por página, al final.
- `BrandStrip` — logos de marcas en blanco.
- `Img` — foto responsive: `import foto from '@/assets/x.jpg?w=480;960;1440&format=webp&as=picture'`.
- `WhatsAppIcon`.
- Cursos: `src/components/course/*` (hero, qué aprenderás, temario, precio, formador, vídeos, lista de espera, FAQ).
- Cabecera, pie y botón flotante de WhatsApp: `MainLayout` (todas las páginas públicas lo usan).

## Datos

- Cifras, contacto y opiniones: **solo** en `src/data/site.ts` (`SITE`, `STATS`, `NEXT_EDITION`, `STUDENT_REVIEWS`).
- Cursos: `src/data/formationDetails.ts`. Precios siempre `formatPrice(n)` + « + IVA».
- Fechas: mientras no haya fechas reales, «Próximamente» (`NEXT_EDITION`).

## Honestidad (no negociable)

Nada de plazas o espectadores inventados, contadores aleatorios, cuentas atrás, precios tachados que no existieron, porcentajes de descuento, cifras de ingresos o ROI no demostrables, testimonios inventados ni marcado `aggregateRating`/`Review` inventado.

## Rendimiento

- La foto principal de cada página: `priority` (eager + fetchpriority high). El resto, lazy.
- Secciones por debajo de la primera pantalla: `lazy()` + `Suspense`.
- Sin vídeos de fondo ni iframes hasta que el usuario pulse (vídeos de YouTube con miniatura).
- Sin animaciones de entrada que dejen contenido invisible (`opacity-0` a la espera de scroll).

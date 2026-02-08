

# Plan: Diferenciar Jornada Zero y Up Detail

## Concepto

Se crearan **3 paginas** para separar correctamente los dos formatos de jornada intensiva:

1. **Pagina Hub** (`/curso-detailing-iniciacion`) - Pagina selector donde el visitante elige entre Jornada Zero o Up Detail
2. **Landing Jornada Zero** (`/jornada-zero-detailing`) - Refactorizada desde la actual, enfocada en el equipo Detail Park
3. **Landing Up Detail** (`/up-detail-evento`) - Nueva landing enfocada en la colaboracion con expertos externos

```text
               /curso-detailing-iniciacion (Hub)
                     /              \
                    /                \
   /jornada-zero-detailing     /up-detail-evento
   (Detail Park Team)         (Expertos Invitados)
   Daniel Lopez               Leandro, Federica, etc.
   97 euros + IVA              97 euros + IVA
   Fecha: 17 Ene 2026         Proximamente
```

## Por que paginas separadas (y no tabs)

- **SEO**: Cada formato ataca keywords distintas (iniciacion vs masterclass colaborativa)
- **Mantenimiento**: El archivo actual ya tiene 920 lineas; duplicar contenido en tabs crearia un archivo inmanejable
- **Conversion**: Cada landing tiene su propio funnel optimizado con Stripe, sin distracciones
- **Compartibilidad**: Cada evento se puede compartir con su propia URL en redes sociales

---

## Pagina 1: Hub Selector (`/curso-detailing-iniciacion`)

Pagina limpia y directa que presenta ambas opciones:

- **Hero corto** con titulo "Jornadas Intensivas de Detailing" y subtitulo explicando los dos formatos
- **Dos tarjetas lado a lado** (vertical en movil):
  - **Jornada Zero**: Icono, descripcion corta, precio (97 euros + IVA), fecha, CTA "Ver Jornada Zero", imagen de Daniel/equipo
  - **Up Detail**: Icono, descripcion corta, precio (97 euros + IVA), estado "Proximamente", avatares de expertos invitados, CTA "Ver Up Detail"
- **Seccion inferior** con FAQ breve: diferencia entre ambos formatos
- Usa `MainLayout` (consistente con el resto del sitio)
- Navegacion estandar, sin navbar custom

### Archivo: `src/pages/JornadasIntensivas.tsx` (nuevo, ~200 lineas)

---

## Pagina 2: Landing Jornada Zero (`/jornada-zero-detailing`)

Refactorizacion de la actual `JornadaCero.tsx`:

- Se mantiene **todo el contenido actual** (hero, itinerario, pricing, testimonios, FAQ, bonuses, footer custom)
- Se corrige la **inconsistencia de precio**: el hero dice 97 euros pero el modal de registro muestra 199 euros. Se unifica a **97 euros + IVA** en todo el flujo
- Se anade un banner/enlace sutil al hub para que el visitante pueda descubrir el formato Up Detail
- Misma estructura standalone (sin MainLayout), con su propia nav y footer

### Archivo: `src/pages/JornadaCero.tsx` (modificado)
### Archivo: `src/components/RegistrationModal.tsx` (corregido precio a 97 euros)

---

## Pagina 3: Landing Up Detail (`/up-detail-evento`)

Nueva landing page con estructura similar a Jornada Zero pero enfocada en la colaboracion:

### Contenido principal:
- **Hero**: Titulo "Up Detail: Formacion con los Mejores Expertos del Pais", video/imagen de fondo, badge "Proximamente"
- **Concepto diferenciador**: Seccion explicando que Up Detail reune a formadores reconocidos a nivel nacional e internacional en una jornada colaborativa
- **Perfiles de Expertos Invitados**:
  - Daniel Lopez (Detail Park) - imagen existente `daniel-lopez-instructor.webp`
  - Leandro (Academy Pro Detailing) - imagenes existentes `leandro-curso-detailing.jpg` y `leandro-curso-detailing-2.jpg`
  - Federica "la_detailher" - imagenes existentes `federica-curso-detailing.jpg` y `federica-curso-detailing-2.jpg`
  - Espacio para "Mas expertos por confirmar"
- **Que aprenderas**: Grid con los beneficios de aprender de multiples perspectivas profesionales
- **Precio**: 97 euros + IVA (mismo que Jornada Zero)
- **Estado**: "Proximamente - Deja tu email para ser el primero en enterarte"
- **CTA principal**: Como la fecha no esta definida, el CTA principal sera un formulario de pre-registro (email + nombre) para notificar cuando se abra la inscripcion, en vez del checkout de Stripe
- **Galeria**: Fotos reales de Leandro y Federica en los cursos
- **Testimonios y trust signals**: Reutilizados de los componentes existentes
- **Footer custom**: Similar al de Jornada Zero

### Archivo: `src/pages/UpDetail.tsx` (nuevo, ~500-600 lineas)

---

## Cambios en el Routing (`App.tsx`)

```text
Rutas nuevas:
  /curso-detailing-iniciacion  ->  JornadasIntensivas (hub)
  /jornada-zero-detailing      ->  JornadaCero (landing actual refactorizada)
  /up-detail-evento             ->  UpDetail (nueva landing)

Redirects actualizados:
  /jornada-cero  ->  /curso-detailing-iniciacion (hub) [ya existe, sin cambios]
```

---

## Cambios en Navegacion

- **Boton "Soy nuevo" del navbar**: Sigue apuntando a `/curso-detailing-iniciacion` (hub) -- sin cambios
- **`JornadaZeroSection.tsx`** (componente reutilizable en Home y cursos): Actualizar el CTA para que lleve al hub `/curso-detailing-iniciacion`
- **`SoyNuevoButton.tsx`**: Ya esta desactivado (eliminado del MainLayout), no requiere cambios

---

## Correccion de Inconsistencia de Precio

Actualmente el hero de Jornada Zero dice **97 euros + IVA** pero el `RegistrationModal.tsx` muestra **199 euros + IVA** con un "80% dto" sobre 999 euros. Segun la memoria del proyecto, el precio correcto es **97 euros + IVA**. Se corregira el modal para reflejar el precio real.

---

## Pre-registro Up Detail (base de datos)

Como Up Detail no tiene fecha aun, en vez del checkout de Stripe se necesita una tabla para guardar pre-registros de interesados:

- **Tabla nueva**: `up_detail_preregistrations` con campos: id, email, name, created_at
- **RLS**: Politica de INSERT publico (sin autenticacion requerida, es un formulario de interes)
- No requiere edge function, se inserta directamente desde el cliente

---

## SEO y Metadata

- **Hub**: Title "Jornadas Intensivas de Detailing 2026 | Jornada Zero y Up Detail | Academia Detail"
- **Jornada Zero**: Se mantiene el SEO actual
- **Up Detail**: Title "Up Detail - Jornada con Expertos de Detailing | Proximamente | Academia Detail"
- Actualizar `sitemap.xml` con las nuevas URLs
- Anadir schema de Event para Up Detail con status "EventPostponed" hasta que haya fecha

---

## Resumen de archivos

| Accion | Archivo |
|---|---|
| Nuevo | `src/pages/JornadasIntensivas.tsx` (hub selector) |
| Nuevo | `src/pages/UpDetail.tsx` (landing Up Detail) |
| Modificado | `src/pages/JornadaCero.tsx` (enlace al hub, banner Up Detail) |
| Modificado | `src/components/RegistrationModal.tsx` (corregir precio a 97 euros) |
| Modificado | `src/App.tsx` (nuevas rutas) |
| Modificado | `src/utils/seoConfig.ts` (SEO para nuevas paginas) |
| Modificado | `public/sitemap.xml` (nuevas URLs) |
| DB Migration | Tabla `up_detail_preregistrations` |


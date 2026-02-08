

# Plan: Seccion de Resenas de Google de Detail Park

## Objetivo
Crear un componente reutilizable de resenas de Google para Detail Park, adaptado al estilo visual premium de la web (fondo oscuro, tarjetas glass, acentos burdeos), e insertarlo en todas las paginas de cursos, la carrera detailing, la jornada zero y la pagina de inicio.

## Diseno del componente

El componente original tiene un estilo claro (bg-slate-50, tarjetas blancas) que no encaja con la identidad visual actual. Se rediseñara para:

- Fondo oscuro coherente con el resto del sitio (bg-background o bg-card)
- Tarjetas con estilo `glass-card` y bordes `border-white/10`
- Estrellas en color `primary` (burdeos) en vez de amarillo
- Icono de Google junto a la puntuacion agregada
- Boton CTA adaptado al sistema de botones existente (variant `glass` o `outline`)
- Animaciones de entrada usando el componente `AnimatedSection` existente
- Titulo con `SectionHeading` para mantener consistencia

### Datos de las resenas
Se conservaran exactamente los 3 testimonios proporcionados, la puntuacion 4.8, las 218 resenas y la direccion. El enlace externo a Google tambien se mantiene.

## Ubicacion en las paginas

La seccion se insertara justo antes del FAQ en cada pagina, ya que funciona como prueba social que refuerza la decision antes de las preguntas frecuentes:

| Pagina | Archivo | Posicion |
|--------|---------|----------|
| Home | `src/pages/Home.tsx` | Antes de `HomeFAQ`, despues de `SuccessStoriesLogos` |
| Curso Detailing / PPF / Wrapping / Restauracion | `src/pages/FormationDetail.tsx` | Antes de `FormationFAQ` |
| Carrera Detailing | `src/pages/CarreraDetailing.tsx` | Antes de `CarreraFAQ` |
| Jornada Zero | `src/pages/JornadaCero.tsx` | Antes de la seccion de FAQ existente |

## Detalle tecnico

### Archivos a crear
1. **`src/components/shared/GoogleReviews.tsx`** -- Componente reutilizable

   Caracteristicas:
   - Usa `SectionHeading` con badge "Resenas Google" y titulo "Lo Que Opinan de Detail Park"
   - Grid de 3 columnas (1 en movil) con tarjetas glass
   - Cabecera con puntuacion 4.8, icono de Google (SVG inline o texto), 5 estrellas, y contador "(218 resenas)"
   - Direccion con icono `MapPin`
   - Boton "Ver todas las resenas en Google" con enlace externo
   - Animaciones con `AnimatedSection` y `StaggeredContainer`
   - Estrellas usando el componente `Star` de lucide-react
   - Totalmente responsive

### Archivos a modificar
2. **`src/pages/Home.tsx`** -- Anadir lazy import y `<GoogleReviews />` antes de `HomeFAQ`
3. **`src/pages/FormationDetail.tsx`** -- Importar y anadir `<GoogleReviews />` antes de `FormationFAQ`
4. **`src/pages/CarreraDetailing.tsx`** -- Importar y anadir `<GoogleReviews />` antes de `CarreraFAQ`
5. **`src/pages/JornadaCero.tsx`** -- Importar y anadir `<GoogleReviews />` antes de la seccion de FAQ

### Estructura del componente

```text
+------------------------------------------------------+
|  [Badge: Resenas Google]                             |
|  Titulo: Lo Que Opinan de Detail Park                |
|  Subtitulo: Resenas verificadas en Google Maps       |
|                                                      |
|  [Google icon]  4.8  *****  (218 resenas)            |
|  [MapPin] C. Metalurgias, 13, 03008 Alicante         |
|                                                      |
|  +----------------+ +----------------+ +------------+|
|  | *****          | | *****          | | *****      ||
|  | "Increible..." | | "El mejor..."  | | "Trato..." ||
|  | Alejandro M.   | | Beatriz S.     | | Carlos T.  ||
|  | Hace 1 semana  | | Hace 1 mes     | | Hace 2 m.  ||
|  +----------------+ +----------------+ +------------+|
|                                                      |
|  [Ver todas las resenas en Google ->]                |
+------------------------------------------------------+
```

### Estilos aplicados
- Seccion: `py-20 md:py-28 bg-background`
- Tarjetas: `bg-card border border-border hover:border-primary/30 rounded-2xl p-6`
- Estrellas: `fill-primary text-primary` (burdeos, coherente con TestimonialsSection)
- Boton: variant `outline` con borde `border-primary/30` y texto `text-primary`
- Texto de resena: `text-foreground/80 italic`
- Autor: `font-semibold text-foreground`
- Fecha: `text-xs text-muted-foreground`

### Resultado esperado
- Componente reutilizable que aparece en 4+ paginas
- Diseno coherente con la identidad visual premium del sitio
- Prueba social adicional con resenas reales de Google
- Enlace externo para ver mas resenas
- Animaciones suaves al hacer scroll


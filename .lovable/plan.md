

# Plan de Mejora de Core Web Vitals

## Analisis del estado actual

Tras revisar todo el codigo del proyecto, he identificado los siguientes problemas que afectan directamente a las 3 metricas de Core Web Vitals (LCP, INP/FID, CLS):

### Problemas encontrados

| Problema | Metrica afectada | Severidad |
|---|---|---|
| Todas las paginas se importan de forma sincrona en App.tsx (12 paginas) | LCP, FID | Alta |
| YouTube IFrame API se carga inmediatamente en el hero (script externo de 500KB+) | LCP, TBT | Alta |
| Vite genera sourcemaps en produccion (`sourcemap: true`) | LCP (tamanio bundle) | Alta |
| No hay code splitting por rutas (todo se descarga en el bundle inicial) | LCP, FID | Alta |
| `scroll-behavior: smooth` en CSS causa jank en scroll | INP | Media |
| Decoraciones blur-3xl (19 archivos) consumen GPU innecesariamente | INP, TBT | Media |
| Animated gradient orbs con `animate-pulse` en el hero | INP, TBT | Media |
| BrandLogosBar inyecta CSS de animacion inline en cada render | CLS, TBT | Baja |
| Navbar tiene animacion de entrada con delay de 100ms + multiple ResizeObservers | INP | Media |
| `loading: lazy` como propiedad CSS en img (linea 383 de index.css) no tiene efecto | - | Info |
| Google Fonts se carga como preload con JS onload hack (funciona pero puede fallar) | LCP | Baja |

---

## Cambios planificados

### 1. Code splitting por rutas en App.tsx (LCP, FID - Impacto Alto)

Actualmente todas las paginas se importan de forma sincrona:

```text
import Home from "./pages/Home";
import JornadasIntensivas from "./pages/JornadasIntensivas";
import JornadaCero from "./pages/JornadaCero";
... (12 paginas mas)
```

Esto significa que el navegador descarga TODO el codigo de todas las paginas antes de renderizar una sola.

**Cambio**: Usar `React.lazy()` para todas las paginas excepto Home (que es la landing principal):

```text
const JornadasIntensivas = lazy(() => import("./pages/JornadasIntensivas"));
const JornadaCero = lazy(() => import("./pages/JornadaCero"));
const UpDetail = lazy(() => import("./pages/UpDetail"));
...
```

Envolver Routes en un `<Suspense>` con un fallback minimo (spinner o skeleton).

### 2. Desactivar sourcemaps en produccion (LCP - Impacto Alto)

En `vite.config.ts`, la linea `sourcemap: true` genera archivos `.map` para produccion, lo que:
- Aumenta el tiempo de build
- Genera archivos extra que pueden cargarse innecesariamente

**Cambio**: Cambiar a `sourcemap: false` o `sourcemap: 'hidden'` (genera el map pero no lo referencia en el JS).

### 3. Diferir la carga del YouTube IFrame API (LCP, TBT - Impacto Alto)

Actualmente en `HomeHero.tsx`, el script de YouTube (`https://www.youtube.com/iframe_api`) se carga inmediatamente al montar el componente. Esto bloquea el hilo principal durante el periodo critico del LCP.

**Cambio**: Diferir la carga del player hasta que el usuario haya visto el hero (usar `IntersectionObserver` o un `setTimeout` de 3-5 segundos). El fallback de imagen ya esta bien implementado, solo hace falta retrasar la carga del script.

### 4. Reducir blur-3xl en decoraciones (INP, TBT - Impacto Medio)

Hay 19 archivos usando `blur-3xl` y `blur-2xl` para decoraciones de fondo. Cada uno crea una capa de composicion GPU costosa. En movil, esto impacta directamente el tiempo de respuesta a interacciones (INP).

**Cambio**: 
- Ocultar decoraciones blur en movil usando la clase `hidden md:block` (ya se hace en HomeHero pero no en otros componentes)
- Reducir la intensidad del blur donde sea posible (de `blur-3xl` a `blur-xl`)
- Aplicar `will-change: transform` o `contain: paint` a estos elementos para optimizar la composicion

Archivos principales afectados: `InstructorSection.tsx`, `MontamosTuCentro.tsx`, `HomeCTA.tsx`, `CompetitiveComparison.tsx`

### 5. Eliminar CSS invalido `loading: lazy` (Limpieza)

En `index.css` linea 383:

```css
img {
  loading: lazy; /* <-- Esto NO es una propiedad CSS valida */
}
```

`loading` es un atributo HTML, no una propiedad CSS. Esta linea no tiene efecto y debe eliminarse.

### 6. Optimizar Navbar para reducir INP (INP - Impacto Medio)

La Navbar tiene:
- Un `setTimeout` de 100ms para animacion de entrada
- Un ResizeObserver (`updatePill`) que recalcula posiciones en cada resize
- Multiples transiciones con delays encadenados

**Cambio**: 
- Eliminar el delay de 100ms del estado `isLoaded` (usar CSS `@starting-style` o simplemente iniciar visible)
- Usar `requestAnimationFrame` para el calculo del pill en lugar de forzar layout sincrono
- Reducir el numero de elementos con `transition-delay` individual

### 7. Optimizar la animacion de BrandLogosBar (CLS, TBT - Impacto Bajo)

La barra de logos inyecta un bloque `<style>` con `@keyframes` en cada render. Esto fuerza un recalculo de estilos innecesario.

**Cambio**: Mover la animacion a `index.css` como un keyframe estatico y usar una variable CSS para la duracion.

### 8. Preconnect optimizado para Google Fonts (LCP - Impacto Bajo)

El `index.html` ya tiene preconnects a fonts.googleapis.com, pero la tecnica de `onload="this.onload=null;this.rel='stylesheet'"` puede fallar si JS esta deshabilitado o delayed.

**Cambio**: Usar `<link rel="preload" as="style">` con `media="print"` y `onload="this.media='all'"` que es mas robusto. Ademas, considerar self-hosting las fuentes para eliminar la dependencia de terceros.

---

## Resumen de archivos a modificar

| Archivo | Cambio | Metrica |
|---|---|---|
| `src/App.tsx` | Code splitting con React.lazy() para todas las paginas excepto Home | LCP, FID |
| `vite.config.ts` | Desactivar sourcemaps en produccion | LCP |
| `src/components/home/HomeHero.tsx` | Diferir carga de YouTube API 3-5 segundos | LCP, TBT |
| `src/index.css` | Eliminar `loading: lazy` invalido; anadir clase utilitaria `gpu-decoration` | INP |
| `src/components/home/InstructorSection.tsx` | Ocultar blur-3xl en movil | INP |
| `src/components/home/MontamosTuCentro.tsx` | Ocultar blur-3xl en movil | INP |
| `src/components/home/HomeCTA.tsx` | Ocultar blur-3xl en movil | INP |
| `src/components/shared/BrandLogosBar.tsx` | Mover keyframes a CSS estatico | TBT |
| `src/components/layout/Navbar.tsx` | Eliminar delay de isLoaded; optimizar pill | INP |
| `index.html` | Mejorar tecnica de carga de fonts | LCP |

---

## Resultado esperado

- **LCP**: Reduccion significativa al cargar solo el codigo de la pagina visitada (code splitting) y diferir YouTube
- **INP**: Mejora al eliminar blurs costosos en movil y reducir trabajo del hilo principal
- **CLS**: Mejora menor al estabilizar las animaciones de la navbar y logos
- **TBT (Total Blocking Time)**: Reduccion al diferir scripts de terceros y eliminar sourcemaps

Estas mejoras son acumulativas: cada optimizacion individual suma para una puntuacion general mejor en PageSpeed Insights.


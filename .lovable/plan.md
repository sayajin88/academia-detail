
## Plan: Optimizacion de PageSpeed Insights

### PROBLEMAS IDENTIFICADOS (de la captura)

| Metrica | Valor Actual | Objetivo | Problema |
|---------|-------------|----------|----------|
| LCP | 2.7s (rojo) | <2.5s | Imagen hero sin preload |
| FCP | 1.1s (naranja) | <1.0s | Google Fonts bloqueando |
| Speed Index | 2.1s (naranja) | <1.8s | Recursos no priorizados |
| TBT | 130ms (verde) | OK | - |
| CLS | 0 (verde) | OK | - |

**Auditorias criticas:**
1. Cache ineficiente: 17.290 KiB
2. Entrega de imagenes: 4.245 KiB
3. Solicitudes bloqueantes: 250ms
4. Descubrimiento de LCP tardio
5. Arbol de dependencias de red

---

### SOLUCION 1: Preload de imagen LCP (hero)

El LCP es la imagen `hero-home.jpg`. Debe cargarse con maxima prioridad.

**Archivo:** `index.html`

```html
<head>
  <!-- CRITICO: Preload del LCP - imagen hero -->
  <link 
    rel="preload" 
    as="image" 
    href="/src/assets/heroes/hero-home.jpg" 
    fetchpriority="high"
  />
  
  <!-- Preconnect a YouTube para el video background -->
  <link rel="preconnect" href="https://www.youtube-nocookie.com">
  <link rel="preconnect" href="https://i.ytimg.com">
</head>
```

---

### SOLUCION 2: Optimizar Google Fonts (eliminar bloqueo)

Actualmente las fuentes bloquean el renderizado 250ms.

**Archivo:** `index.html`

```html
<!-- ANTES (bloqueante): -->
<link href="https://fonts.googleapis.com/css2?family=..." rel="stylesheet">

<!-- DESPUES (no bloqueante): -->
<link 
  rel="preload" 
  as="style" 
  href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Open+Sans:wght@300;400;600;700;800&display=swap"
  onload="this.onload=null;this.rel='stylesheet'"
/>
<noscript>
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Open+Sans:wght@300;400;600;700;800&display=swap" rel="stylesheet">
</noscript>
```

---

### SOLUCION 3: Lazy loading inteligente de imagenes

**Archivo:** `src/components/home/HomeHero.tsx`

Anadir `fetchpriority="high"` a la imagen hero:

```tsx
<div 
  className="absolute inset-0 bg-cover bg-center" 
  style={{ backgroundImage: `url(${heroImage})` }} 
/>
```

Cambiar a `<img>` con atributos de rendimiento:

```tsx
<img 
  src={heroImage}
  alt="Hero background"
  className="absolute inset-0 w-full h-full object-cover"
  fetchPriority="high"
  loading="eager"
  decoding="async"
/>
```

---

### SOLUCION 4: Convertir imagenes a WebP

Las imagenes JPG/PNG actuales no estan optimizadas. Crear versiones WebP.

**Archivos a optimizar (ahorro estimado 4.245 KiB):**

| Imagen Original | Tamano Est. | Formato Propuesto |
|----------------|-------------|-------------------|
| hero-home.jpg | ~800KB | hero-home.webp (~200KB) |
| formacion-detailing-*.jpg | ~400KB c/u | WebP (~100KB c/u) |
| portfolio-*.png | ~300KB c/u | WebP (~80KB c/u) |

**Implementar fallback con `<picture>`:**

```tsx
<picture>
  <source srcSet={heroImageWebP} type="image/webp" />
  <img src={heroImage} alt="..." fetchPriority="high" />
</picture>
```

---

### SOLUCION 5: Diferir carga de componentes no criticos

**Archivo:** `src/pages/Home.tsx`

Usar `React.lazy()` para componentes below-the-fold:

```tsx
import { lazy, Suspense } from 'react';

// Componentes criticos (above the fold) - carga sincrona
import { HomeHero } from '@/components/home/HomeHero';
import { FormationsGrid } from '@/components/home/FormationsGrid';

// Componentes no criticos - carga diferida
const CompetitiveComparison = lazy(() => import('@/components/home/CompetitiveComparison'));
const BusinessSkillsSection = lazy(() => import('@/components/home/BusinessSkillsSection'));
const CarreraNegocioSection = lazy(() => import('@/components/home/CarreraNegocioSection'));
const MontamosTuCentro = lazy(() => import('@/components/home/MontamosTuCentro'));
const InstructorSection = lazy(() => import('@/components/home/InstructorSection'));
const GalleryPreview = lazy(() => import('@/components/home/GalleryPreview'));
const TestimonialsSection = lazy(() => import('@/components/home/TestimonialsSection'));
const SuccessStoriesLogos = lazy(() => import('@/components/home/SuccessStoriesLogos'));
const HomeFAQ = lazy(() => import('@/components/home/HomeFAQ'));
const HomeCTA = lazy(() => import('@/components/home/HomeCTA'));

// En el render:
<Suspense fallback={<div className="h-32" />}>
  <CompetitiveComparison />
</Suspense>
```

---

### SOLUCION 6: Optimizar iframe de YouTube

El video de YouTube carga recursos pesados. Diferir hasta interaccion.

**Archivo:** `src/components/home/HomeHero.tsx`

```tsx
const [videoLoaded, setVideoLoaded] = useState(false);

// Cargar video solo despues del LCP
useEffect(() => {
  const timer = setTimeout(() => setVideoLoaded(true), 2000);
  return () => clearTimeout(timer);
}, []);

// En el render:
{videoLoaded ? (
  <iframe src={`https://www.youtube-nocookie.com/embed/...`} ... />
) : (
  <div className="absolute inset-0 bg-black" /> // Placeholder
)}
```

---

### SOLUCION 7: CSS critico inline

Mover CSS critico para above-the-fold directamente en `<head>`.

**Archivo:** `index.html`

```html
<style>
  /* CSS critico para el primer render */
  :root {
    --background: 0 0% 0%;
    --foreground: 0 0% 100%;
    --primary: 10 93% 46%;
  }
  body {
    background: hsl(var(--background));
    color: hsl(var(--foreground));
    font-family: 'Open Sans', sans-serif;
    margin: 0;
  }
  .min-h-screen { min-height: 100vh; }
</style>
```

---

### SOLUCION 8: Configurar Cache Headers

Agregar archivo `public/_headers` para Netlify/Vercel:

```
# Cache estatico agresivo para assets
/assets/*
  Cache-Control: public, max-age=31536000, immutable

/*.js
  Cache-Control: public, max-age=31536000, immutable

/*.css
  Cache-Control: public, max-age=31536000, immutable

/*.webp
  Cache-Control: public, max-age=31536000, immutable

/*.jpg
  Cache-Control: public, max-age=31536000, immutable

# HTML - cache corto
/*.html
  Cache-Control: public, max-age=0, must-revalidate
```

---

### RESUMEN DE ARCHIVOS A MODIFICAR

| Archivo | Cambios |
|---------|---------|
| `index.html` | Preload LCP, fonts no bloqueantes, CSS critico |
| `src/components/home/HomeHero.tsx` | Optimizar imagen hero, diferir video |
| `src/pages/Home.tsx` | React.lazy() para componentes below-fold |
| `public/_headers` | Cache headers para assets |
| Imagenes | Convertir a WebP (hero, formaciones, portfolio) |

---

### RESULTADO ESPERADO

| Metrica | Antes | Despues |
|---------|-------|---------|
| LCP | 2.7s | ~1.5s |
| FCP | 1.1s | ~0.8s |
| Speed Index | 2.1s | ~1.5s |
| Cache | 17MB desperdiciado | 0 |
| Imagenes | 4.2MB | ~1MB |

---

### ORDEN DE IMPLEMENTACION

1. **Preload LCP** (mayor impacto inmediato)
2. **Fonts no bloqueantes** (250ms ahorro)
3. **Diferir video YouTube** (reduce LCP)
4. **Lazy load componentes** (reduce bundle inicial)
5. **Convertir imagenes WebP** (ahorro 4MB)
6. **Cache headers** (mejora visitas recurrentes)


## Plan: Optimizacion PageSpeed para Movil

### PROBLEMAS IDENTIFICADOS (de la captura)

| Metrica | Valor Actual | Objetivo | Problema Principal |
|---------|-------------|----------|---------------------|
| **FCP** | 5.2s (rojo) | <1.8s | Recursos bloqueantes 1900ms |
| **LCP** | 7.9s (rojo) | <2.5s | Imagen hero de escritorio en movil |
| Speed Index | 5.7s (naranja) | <3.4s | Imagenes sin optimizar |
| TBT | 0ms (verde) | OK | - |
| CLS | 0 (verde) | OK | - |

**Auditorias criticas movil:**
1. Cache ineficiente: 17.289 KiB
2. Solicitudes bloqueantes: **1900ms** (vs 250ms en desktop)
3. Entrega de imagenes: 4.238 KiB
4. Redistribucion forzada
5. Descubrimiento de LCP tardio

---

### CAUSA RAIZ DEL PROBLEMA

El principal problema es que **la misma imagen hero grande de escritorio se carga en movil**:

```text
ACTUAL:
+------------------+     +------------------+
|    DESKTOP       |     |     MOVIL        |
|  hero-home.jpg   |     |  hero-home.jpg   |  <- MISMA IMAGEN
|   ~800KB         |     |   ~800KB         |  <- En 4G lenta = 7.9s
+------------------+     +------------------+

SOLUCION:
+------------------+     +------------------+
|    DESKTOP       |     |     MOVIL        |
|  hero-home.jpg   |     | mobile-hero.jpg  |  <- IMAGEN OPTIMIZADA
|   ~300KB WebP    |     |   ~50KB WebP     |  <- En 4G lenta = ~1.5s
+------------------+     +------------------+
```

Ademas, el hook `useIsMobile()` devuelve `false` en el primer render (antes del useEffect), causando que se cargue contenido de escritorio inicialmente.

---

### SOLUCION 1: Preload Condicional con Media Queries

**Archivo:** `index.html`

```html
<!-- PRELOAD CONDICIONAL: Imagen apropiada segun dispositivo -->

<!-- Para MOVIL (< 768px) - Imagen pequena optimizada -->
<link 
  rel="preload" 
  as="image" 
  href="/mobile-hero-bg.webp" 
  media="(max-width: 767px)"
  fetchpriority="high"
/>

<!-- Para DESKTOP (>= 768px) - Imagen grande -->
<link 
  rel="preload" 
  as="image" 
  href="/src/assets/heroes/hero-home.jpg" 
  media="(min-width: 768px)"
  fetchpriority="high"
/>
```

---

### SOLUCION 2: Crear Imagen Hero Optimizada para Movil

Ya existe `src/assets/mobile-hero-bg.jpg`. Se necesita:

1. Copiarla a `public/mobile-hero-bg.webp` (optimizada)
2. Dimensiones ideales para movil: **640x960px** (portrait)
3. Compresion WebP al 75% (~50-80KB)

**Archivo nuevo:** `public/mobile-hero-bg.webp`

---

### SOLUCION 3: Implementar Imagen Responsiva con `<picture>`

**Archivo:** `src/components/home/HomeHero.tsx`

```tsx
// Importar ambas imagenes
import heroImageDesktop from "@/assets/heroes/hero-home.jpg";
import heroImageMobile from "@/assets/mobile-hero-bg.jpg";

// En el render - usar <picture> para seleccion automatica
<picture>
  {/* Movil: imagen pequena optimizada */}
  <source 
    media="(max-width: 767px)" 
    srcSet="/mobile-hero-bg.webp"
    type="image/webp"
  />
  {/* Desktop: imagen grande */}
  <source 
    media="(min-width: 768px)" 
    srcSet={heroImageDesktop}
  />
  <img 
    src={heroImageDesktop}
    alt="Detail Park - Centro de formacion de detailing profesional"
    className="absolute inset-0 w-full h-full object-cover"
    fetchPriority="high"
    loading="eager"
    decoding="async"
  />
</picture>
```

---

### SOLUCION 4: Mejorar Hook useIsMobile para SSR

**Archivo:** `src/hooks/use-mobile.tsx`

```tsx
export function useIsMobile() {
  // NUEVO: Deteccion inicial basada en viewport (SSR-friendly)
  const getInitialValue = () => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < MOBILE_BREAKPOINT;
  };

  const [isMobile, setIsMobile] = React.useState<boolean>(getInitialValue);

  React.useEffect(() => {
    // ... resto igual
  }, []);

  return isMobile;
}
```

---

### SOLUCION 5: Reducir Fuentes para Movil

**Archivo:** `index.html`

```html
<!-- OPTIMIZACION: Solo cargar pesos esenciales -->
<!-- Antes: 300;400;600;700;800 (5 pesos) -->
<!-- Despues: 400;600;700 (3 pesos) - Ahorro ~100KB -->

<link 
  rel="preload" 
  as="style" 
  href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Open+Sans:wght@400;600;700&display=swap"
  onload="this.onload=null;this.rel='stylesheet'"
/>
```

---

### SOLUCION 6: Eliminar Efectos Costosos en Movil

**Archivo:** `src/components/home/HomeHero.tsx`

Los orbs con `blur-3xl` son costosos de renderizar en movil.

```tsx
// Ocultar orbs animados en movil
{!isMobile && (
  <>
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary-glow/20 rounded-full blur-3xl animate-pulse delay-1000" />
  </>
)}
```

---

### SOLUCION 7: Optimizar Imagenes de Galeria para Movil

**Archivo:** `src/components/home/GalleryPreview.tsx`

Anadir lazy loading explicito y sizes para imagenes de galeria:

```tsx
<div
  className="..."
  style={{ 
    backgroundImage: `url(${image.src})`,
    // NUEVO: Reducir calidad en movil via CSS
    imageRendering: 'auto'
  }}
  loading="lazy"
/>

// O mejor: usar <img> con srcset
<img 
  src={image.src}
  alt={image.alt}
  loading="lazy"
  decoding="async"
  className="w-full h-full object-cover"
  sizes="(max-width: 768px) 50vw, 25vw"
/>
```

---

### SOLUCION 8: Anadir Preload para Fuente Critica

**Archivo:** `index.html`

```html
<!-- Preload de la fuente mas usada (Open Sans Regular) -->
<link 
  rel="preload" 
  as="font" 
  href="https://fonts.gstatic.com/s/opensans/v35/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0B4gaVc.woff2" 
  type="font/woff2" 
  crossorigin
/>
```

---

### ARCHIVOS A MODIFICAR

| Archivo | Cambios |
|---------|---------|
| `index.html` | Preload condicional, fuentes reducidas, preload font |
| `src/hooks/use-mobile.tsx` | Deteccion inicial mejorada |
| `src/components/home/HomeHero.tsx` | `<picture>` responsivo, ocultar orbs en movil |
| `src/components/home/GalleryPreview.tsx` | Lazy loading optimizado |
| `public/mobile-hero-bg.webp` | Nueva imagen optimizada para movil |

---

### RESULTADO ESPERADO

| Metrica | Antes | Despues |
|---------|-------|---------|
| **FCP** | 5.2s | ~1.5s |
| **LCP** | 7.9s | ~2.0s |
| Speed Index | 5.7s | ~2.5s |
| Imagen hero movil | ~800KB | ~50KB |
| Fuentes | 5 pesos | 3 pesos |

---

### ORDEN DE IMPLEMENTACION (por impacto)

1. **Preload condicional** + imagen movil WebP (mayor impacto ~5s ahorro)
2. **`<picture>` responsivo** en HomeHero
3. **Reducir fuentes** a 3 pesos
4. **Ocultar blur orbs** en movil
5. **Mejorar useIsMobile** para SSR
6. **Lazy loading galeria**

---

### VALIDACION

Despues de implementar, ejecutar PageSpeed Insights en modo movil:
- https://pagespeed.web.dev/?url=https://academiadetail.com&form_factor=mobile

Objetivos:
- FCP < 1.8s (verde)
- LCP < 2.5s (verde)
- Performance Score > 80

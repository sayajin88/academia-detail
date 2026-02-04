
## Plan: Optimizacion Avanzada de Velocidad Movil

### PROBLEMAS IDENTIFICADOS (de las capturas)

| Problema | Archivo | Peso Actual | Peso Ideal | Ahorro |
|----------|---------|-------------|------------|--------|
| **Imagen hero movil GIGANTE** | mobile-hero-bg.jpg | 6513 KiB | ~100 KiB | 6400 KiB |
| Imagenes formations sobredimensionadas | curso-*.jpg, evento-*.jpg | ~7000 KiB | ~1000 KiB | 6000 KiB |
| Logo sin width/height | detail-park-logo-white.png | 41.7 KiB | ~5 KiB | 36 KiB |
| Sin cache en assets | Todos | 17.531 KiB | 0 | N/A |
| CSS bloqueante | index-*.css | 22.1 KiB | - | 150ms |

**Impacto total estimado: ~10 MB de ahorro + mejora de LCP**

---

### SOLUCION 1: Imagen Hero Movil Optimizada (MAYOR IMPACTO)

El archivo `public/mobile-hero-bg.jpg` pesa 6.5MB - esto es CRITICO.

**Problema**: La imagen es de 1577x2832px pero se muestra en pantallas de max 414px de ancho.

**Solucion**:
1. Redimensionar a 640x960px (suficiente para retina 2x en movil)
2. Convertir a WebP con compresion 75%
3. Resultado esperado: ~50-80 KiB

**Archivo:** `public/mobile-hero-bg.jpg` → reemplazar con version optimizada

**Nota**: Esto requiere que el usuario proporcione una imagen optimizada o que usemos un servicio externo.

---

### SOLUCION 2: Imagenes Responsivas con srcset en FormationsGrid

Las imagenes de formations son muy grandes para movil:
- formacion-detailing-juan-daniel.jpg: 1280x1600 → se muestra en 322x483
- curso-wrapping-formacion.jpg: 726x909 → se muestra en 384x403
- evento-limpieza-interior.jpg: 1027x1282 → se muestra en 603x403

**Archivo:** `src/components/home/FormationsGrid.tsx`

```tsx
<img
  src={formation.image}
  alt={formation.shortTitle}
  className="..."
  loading="lazy"
  decoding="async"
  // NUEVO: Dimensiones explicitas para evitar CLS
  width={400}
  height={533}
  // NUEVO: srcset para servir imagenes mas pequenas en movil
  srcSet={`${formation.image} 400w`}
  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 400px"
/>
```

---

### SOLUCION 3: Dimensiones Explicitas en Logo (Evitar CLS)

PageSpeed reporta que el logo no tiene width/height explicitos.

**Archivo:** `src/components/layout/Navbar.tsx`

```tsx
// En el logo principal (linea ~127)
<img 
  src={logo} 
  alt="Detail Park" 
  className="h-7 md:h-10 w-auto transition-transform duration-300 group-hover:scale-105"
  // NUEVO: Dimensiones explicitas
  width={229}
  height={70}
/>

// En el logo del menu movil (linea ~328)
<img 
  src={logo} 
  alt="Detail Park" 
  className="h-8 w-auto"
  // NUEVO: Dimensiones explicitas
  width={229}
  height={70}
/>
```

---

### SOLUCION 4: Lazy Loading Agresivo para Imagenes Below-the-Fold

Las imagenes de GalleryPreview y otras secciones cargan demasiado pronto.

**Archivo:** `src/components/home/GalleryPreview.tsx`

Ya tiene lazy loading pero podemos mejorar con `loading="lazy"` nativo del browser:

```tsx
<img 
  src={image.src}
  alt={image.alt}
  loading="lazy"
  decoding="async"
  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
  // NUEVO: sizes para indicar tamano real
  sizes="(max-width: 768px) 50vw, 25vw"
  width={400}
  height={300}
/>
```

---

### SOLUCION 5: Preload Condicional Mejorado

El preload actual apunta a una imagen de 6.5MB. Debemos asegurar que solo se precargue en el dispositivo correcto.

**Archivo:** `index.html`

```html
<!-- MOVIL: Solo precargar si es movil Y la imagen es pequena -->
<link 
  rel="preload" 
  as="image" 
  href="/mobile-hero-bg.jpg" 
  media="(max-width: 767px)"
  fetchpriority="high"
  type="image/jpeg"
/>
```

---

### SOLUCION 6: Eliminar Render-Blocking CSS (150ms)

El CSS principal bloquea el renderizado 450ms.

**Opciones**:
1. Inline CSS critico en index.html (ya implementado parcialmente)
2. Usar `media="print"` con onload hack para CSS no critico

**Archivo:** `index.html`

El CSS critico ya esta inline. El problema es que Vite genera un bundle CSS grande. Podemos mejorar:

```html
<!-- El CSS ya esta siendo precargado de forma no bloqueante -->
<!-- Asegurar que el CSS critico inline cubre above-the-fold -->
<style>
  /* Añadir estilos del hero y navbar al CSS critico */
  .min-h-\\[90vh\\] { min-height: 90vh; }
  .bg-gradient-to-b { background-image: linear-gradient(to bottom, var(--tw-gradient-stops)); }
  /* ... mas estilos criticos del hero */
</style>
```

---

### SOLUCION 7: Optimizar Redistribucion Forzada (Reflows)

Los reflows vienen de JavaScript accediendo a propiedades geometricas. El principal culpable es el hook `useIsMobile` y el efecto del navbar.

**Archivo:** `src/hooks/use-mobile.tsx`

```tsx
// Usar matchMedia en lugar de window.innerWidth para evitar reflows
const getInitialMobileState = (): boolean => {
  if (typeof window === 'undefined') return false;
  // matchMedia no causa reflow, innerWidth si
  return window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`).matches;
};
```

---

### ARCHIVOS A MODIFICAR

| Archivo | Cambio |
|---------|--------|
| `public/mobile-hero-bg.jpg` | Reemplazar con imagen optimizada (~100KB) |
| `src/components/home/FormationsGrid.tsx` | Añadir width/height y sizes explicitos |
| `src/components/layout/Navbar.tsx` | Añadir width/height al logo |
| `src/components/home/GalleryPreview.tsx` | Añadir width/height y sizes |
| `src/hooks/use-mobile.tsx` | Usar matchMedia para evitar reflows |
| `index.html` | Expandir CSS critico inline |

---

### RESULTADO ESPERADO

| Metrica | Antes | Despues |
|---------|-------|---------|
| **Peso imagenes** | 17.4 MB | ~2 MB |
| **LCP** | 7.9s | ~2.5s |
| **FCP** | 5.2s | ~1.5s |
| **CLS** | Warnings | 0 |
| **Reflows** | 70ms | ~10ms |

---

### ACCIONES MANUALES REQUERIDAS (Usuario)

1. **CRITICO**: Comprimir `mobile-hero-bg.jpg` usando una herramienta como:
   - https://squoosh.app (Google)
   - https://tinypng.com
   - Dimensiones recomendadas: 640x960px
   - Formato: WebP o JPEG optimizado
   - Calidad: 70-80%
   - Peso objetivo: <100 KiB

2. **Opcional**: Crear versiones WebP de las imagenes principales:
   - formacion-detailing-juan-daniel.webp
   - curso-wrapping-formacion.webp
   - curso-ppf-formacion.webp
   - evento-limpieza-interior.webp

---

### ORDEN DE IMPLEMENTACION

1. **Dimensiones explicitas** (logo, formations, gallery) - Elimina warnings CLS
2. **Optimizar uso de matchMedia** - Reduce reflows
3. **Expandir CSS critico** - Reduce tiempo bloqueante
4. **Usuario comprime imagen hero** - Mayor impacto en LCP

---

### NOTA SOBRE CACHE

Los headers de cache (`public/_headers`) estan configurados correctamente, pero Lovable usa un sistema de hosting diferente a Netlify. El cache se maneja a nivel de CDN por Lovable, por lo que no podemos controlarlo desde el codigo.

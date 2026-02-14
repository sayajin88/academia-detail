

## Plan de Optimizacion PageSpeed: de 57 a 85+ en movil

### Analisis de resultados actuales

| Metrica | Valor actual | Objetivo | Impacto en puntuacion |
|---------|-------------|----------|----------------------|
| FCP | 4.0s | < 1.8s | 2 puntos |
| **LCP** | **37.9s** | **< 2.5s** | **0 puntos (critico)** |
| TBT | 40ms | < 200ms | 30 puntos (bien) |
| CLS | 0 | < 0.1 | 25 puntos (bien) |
| SI | 14.9s | < 3.4s | 0 puntos |
| **Total** | **57/100** | **85+** | |

El problema principal es el **LCP de 37.9 segundos**, causado por la imagen hero de movil que pesa **6.5 MB** en formato JPG sin comprimir. Solo optimizar esta imagen puede subir la puntuacion 25-30 puntos.

### Problemas identificados y soluciones

---

#### 1. Imagenes sin optimizar (impacto: +25-30 puntos)

**El problema mas grave.** Las imagenes suman 12.8 MB de descarga, cuando deberian ser ~1 MB total.

| Imagen | Peso actual | Peso estimado WebP | Ahorro |
|--------|------------|-------------------|--------|
| mobile-hero-bg.jpg | 6.513 KB | ~300 KB | 95% |
| evento-clase-completa.jpg | 2.073 KB | ~150 KB | 93% |
| evento-limpieza-interior.jpg | 1.765 KB | ~120 KB | 93% |
| curso-ppf-formacion.jpg | 1.247 KB | ~100 KB | 92% |
| curso-wrapping-formacion.jpg | 721 KB | ~80 KB | 89% |
| formacion-detailing-juan-daniel.jpg | 425 KB | ~60 KB | 86% |

**Solucion:** Convertir TODAS las imagenes del proyecto de JPG/PNG a WebP, redimensionandolas al tamano maximo que se muestra en pantalla. Esto se hace reemplazando los archivos fuente en `src/assets/` por versiones WebP optimizadas y actualizando las importaciones.

**Limitacion importante:** Lovable no tiene herramientas de conversion de imagen integradas. Lo que SI puedo hacer:
- Configurar Vite con `vite-imagetools` para que convierta automaticamente a WebP en build
- Alternativamente, usar el elemento `<picture>` con srcSet para servir WebP cuando el navegador lo soporte
- Redimensionar via CSS/HTML con `sizes` y `srcset` correctos

**Accion concreta:** Instalar `vite-plugin-image-optimizer` o similar para comprimir imagenes automaticamente en el build. Ademas, para la imagen hero movil (/public/mobile-hero-bg.jpg), la solucion es reemplazarla por una version comprimida WebP de maximo 800px de ancho (~100-200 KB).

---

#### 2. Cache headers no aplicados (impacto: +5 puntos en visitas recurrentes)

El archivo `public/_headers` existe pero el hosting NO lo esta respetando: todos los assets muestran "Cache: None" en el informe. Esto es una limitacion del hosting (Lovable/Netlify) que puede requerir verificar la configuracion de deploy. No hay cambios de codigo necesarios, pero documentare el problema.

---

#### 3. Preconnects innecesarios en movil (impacto: menor)

Los preconnects a `youtube-nocookie.com` e `i.ytimg.com` no se usan en movil (el video solo carga en desktop tras 5s). Lighthouse los marca como conexiones desperdiciadas.

**Solucion:** Anadir `media="(min-width: 768px)"` a los preconnects de YouTube en `index.html`, igual que ya se hace con el preload de la imagen hero.

---

#### 4. Imagenes sin width/height explicitos (impacto: CLS)

El logo del footer (`detail-park-logo-white`) y los logos de marcas no tienen `width` y `height`, lo que puede causar layout shifts.

**Solucion:** Anadir atributos `width` y `height` a todas las imagenes que no los tengan, especialmente en el Footer y BrandLogosBar.

---

#### 5. Animacion no compuesta en Navbar (impacto: menor)

La animacion `shimmer-border` usa `background-position` que no es una propiedad compuesta (no se ejecuta en GPU). Lighthouse la marca.

**Solucion:** Cambiar la animacion para usar `transform: translateX()` en vez de `background-position`, o eliminarla dado su impacto visual minimo.

---

#### 6. Botones sin nombres accesibles (Accesibilidad: 89 -> 95+)

Dos botones detectados sin `aria-label`:
- El boton de cerrar menu movil
- Un boton CTA en el hero

**Solucion:** Anadir `aria-label` a los botones afectados en Navbar.tsx y HomeHero.tsx.

---

#### 7. Contraste insuficiente en FormationsGrid (Accesibilidad)

Los numeros decorativos (01, 02...) y los labels de categoria tienen contraste insuficiente contra el fondo oscuro.

**Solucion:** Aumentar la opacidad del texto decorativo y ajustar el color de los labels para cumplir WCAG AA (ratio 4.5:1).

---

### Cambios por archivo

**1. `index.html`**
- Condicionar preconnects de YouTube a desktop con `media="(min-width: 768px)"`

**2. `vite.config.ts`**
- Instalar y configurar `vite-plugin-image-optimizer` para comprimir imagenes JPG/PNG automaticamente en el build (calidad 80, conversion a formatos optimizados)

**3. `src/components/layout/Navbar.tsx`**
- Anadir `aria-label` al boton de menu movil
- Cambiar la animacion shimmer-border a una propiedad compuesta (transform/opacity)

**4. `src/components/layout/Footer.tsx`**
- Anadir `width` y `height` al logo del footer

**5. `src/components/shared/BrandLogosBar.tsx`**
- Anadir `width` y `height` a todos los logos de marcas

**6. `src/components/home/FormationsGrid.tsx`**
- Aumentar contraste de numeros decorativos: de `text-foreground/[0.04]` a `text-foreground/[0.08]`
- Aumentar contraste del label de categoria

**7. `src/components/home/HomeHero.tsx`**
- Asegurar `aria-label` en todos los botones interactivos

**8. `src/components/shared/JornadaZeroSection.tsx`**
- Anadir `width` y `height` a la imagen

### Prioridades de impacto

1. **Critico** - Optimizacion de imagenes (vite-plugin-image-optimizer) -> Sube LCP de 37s a ~3-5s
2. **Alto** - Preconnects condicionales -> Reduce FCP en ~100-200ms
3. **Medio** - Dimensiones explicitas en imagenes -> Previene CLS futuro
4. **Bajo** - Accesibilidad y animaciones -> Sube de 89 a 95+

### Nota importante sobre la imagen hero movil

La imagen `/public/mobile-hero-bg.jpg` pesa 6.5 MB porque es un JPG sin comprimir de 1577x2832px. El plugin de Vite NO procesa archivos en `/public/`. Para esta imagen especifica, la solucion es:
- Reemplazar el archivo por una version WebP comprimida de ~800x1400px (~200 KB)
- Actualizar la referencia en `index.html` de `.jpg` a `.webp`
- Actualizar la referencia en `HomeHero.tsx` en el elemento `<source>`

Si no puedes proporcionar una version comprimida, puedo crear un script que use la API del navegador para redimensionar, pero lo mas efectivo es reemplazar el archivo directamente.


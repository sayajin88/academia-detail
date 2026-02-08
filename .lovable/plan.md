

# Auditoria Completa y Optimizacion de Rendimiento + Mobile

## Hallazgos de la Auditoria

### Problemas Detectados

**1. Bug activo: Claves React duplicadas en el Footer**
- La consola muestra un warning: `Encountered two children with the same key: /politica-privacidad`
- Causa: En `Footer.tsx`, tanto "Politica de Privacidad" como "Aviso Legal" comparten el mismo `href` (`/politica-privacidad`), y se usa `link.href` como `key` en el `map`

**2. Clase CSS `scrollbar-hide` no definida**
- `UpDetail.tsx` usa la clase `scrollbar-hide` en el scroll horizontal de Shorts, pero no esta definida en `index.css` ni en `tailwind.config.ts`
- Los scrollbars visibles rompen la estetica en mobile

**3. Clase CSS `safe-area-bottom` no definida**
- `UpDetail.tsx` usa `safe-area-bottom` en el CTA sticky mobile, pero no existe en ningun archivo CSS
- En iPhones con notch, el boton queda tapado por la barra del sistema

**4. JornadaCero: iframe de YouTube siempre cargado en desktop**
- En `JornadaCero.tsx` linea 177, hay un `<iframe>` de YouTube como fondo que se carga inmediatamente sin facade pattern
- Esto anade ~800KB de JavaScript de YouTube al peso inicial de la pagina
- Contrasta con el patron de facade (thumbnail + clic) usado en el resto de la web

**5. VideoTestimonials: Sin facade pattern optimizado**
- El componente `VideoTestimonials.tsx` usa thumbnails como fondo CSS con `background-image` en vez de `<img>` con `loading="lazy"`
- Las thumbnails de YouTube solicitan `maxresdefault.jpg` (pesadas) en vez de `hqdefault.jpg`
- Al reproducir, carga el iframe directamente sin el componente `YouTubeEmbed` reutilizable

**6. AboutUs: No usa lazy loading para secciones below-the-fold**
- A diferencia de `Home.tsx` que usa `React.lazy()` + `Suspense` para todas las secciones, `AboutUs.tsx` importa todos los componentes de forma sincrona
- Esto incluye `AboutVideoChannel` con 12 thumbnails de YouTube

**7. AnimatedSection: Listener de resize sin debounce**
- El componente `AnimatedSection.tsx` (linea 72) anade un event listener de `resize` con `window.innerWidth` en cada instancia
- En una pagina con 20+ secciones animadas, esto causa multiples reflows en cada resize

**8. JornadaCero: Pagina de 925 lineas sin code-splitting**
- Toda la pagina JornadaCero es un componente monolitico de 925 lineas sin ningun lazy loading
- Incluye multiples componentes pesados (VideoTestimonials, GoogleReviews, etc.)

**9. UpDetail: Imagen hero sin `loading="eager"` ni `fetchPriority`**
- La imagen hero de UpDetail (`evento-instructor-explicando.jpg`) no tiene atributos de prioridad
- Al no estar en el MainLayout (no tiene Navbar global), pierde la oportunidad de preload

**10. Footer links: touch targets insuficientes en mobile**
- Los links del Footer en el componente global (`Footer.tsx`) no tienen `min-height: 44px`
- Esto afecta a todas las paginas que usan MainLayout

---

## Plan de Optimizacion

### Fase 1: Bugs criticos y CSS faltante

**Archivo: `src/components/layout/Footer.tsx`**
- Cambiar el `key` de los legalLinks para usar `link.name` en vez de `link.href`, eliminando el warning de React
- Anadir `min-h-[44px] flex items-center` a todos los links de navegacion para cumplir WCAG touch targets

**Archivo: `src/index.css`**
- Anadir la utilidad `.scrollbar-hide` con las propiedades:
  - `-ms-overflow-style: none` (IE/Edge)
  - `scrollbar-width: none` (Firefox)
  - `::-webkit-scrollbar { display: none }` (Chrome/Safari)
- Anadir la utilidad `.safe-area-bottom` con `padding-bottom: env(safe-area-inset-bottom)`

### Fase 2: Rendimiento de carga (LCP/TTI)

**Archivo: `src/pages/AboutUs.tsx`**
- Convertir `AboutVideoChannel`, `AboutGallerySection`, `JornadaZeroSection` y el CTA final a `React.lazy()` + `Suspense`, siguiendo el mismo patron de `Home.tsx`
- Solo `AboutHero`, `AboutHistory` y `AboutPhilosophy` quedan como carga sincrona (above-the-fold)

**Archivo: `src/pages/JornadaCero.tsx`**
- Reemplazar el iframe de YouTube background (linea 177) por el patron de YouTube IFrame API ya implementado en `HomeHero.tsx`, que solo inicializa el player tras una condicion (scroll o delay)
- Alternativa mas simple: cargar el iframe con `loading="lazy"` y un `setTimeout` de 3 segundos para no bloquear el LCP

**Archivo: `src/components/VideoTestimonials.tsx`**
- Cambiar los thumbnails de `maxresdefault.jpg` a `hqdefault.jpg` (reduce peso de ~150KB a ~20KB por thumbnail)
- Reemplazar `background-image` CSS por `<img loading="lazy">` para que el navegador gestione la carga diferida
- Usar el componente `YouTubeEmbed` para la reproduccion en vez de iframes directos

**Archivo: `src/pages/UpDetail.tsx`**
- Anadir `fetchPriority="high"` y `loading="eager"` a la imagen hero
- Las imagenes de la galeria y expertos ya tienen `loading="lazy"` (correcto)

### Fase 3: Optimizacion mobile

**Archivo: `src/components/shared/AnimatedSection.tsx`**
- Reemplazar el listener de `resize` con `window.innerWidth` por `window.matchMedia`, consistente con el patron de `useIsMobile`
- Esto elimina reflows forzados en cada resize en todas las paginas

**Archivo: `src/components/layout/Footer.tsx`**
- Asegurar que todos los links tienen touch targets de 44px minimo en mobile
- Anadir espaciado vertical entre items del footer para mejor accesibilidad tactil

**Archivo: `src/pages/UpDetail.tsx`**
- En la seccion de Shorts mobile, ajustar el ancho de cada card a `w-[220px]` para que se vea parcialmente la siguiente card (affordance de scroll)
- Anadir indicadores visuales de scroll (dots o fade lateral)

**Archivo: `src/pages/JornadaCero.tsx`**
- La pagina ya tiene buenas optimizaciones mobile (touch targets, tipografia responsiva)
- Verificar que el sticky CTA de `StickyFloatingCTA` no se solape con el sticky banner superior

### Fase 4: Consistencia entre paginas

**Todos los archivos de pagina**
- Verificar que todas las paginas con MainLayout tienen la estructura correcta de `pt-16 md:pt-20` para no solaparse con el Navbar
- UpDetail y JornadaCero usan su propio layout (sin MainLayout), lo cual es correcto para landings independientes

---

## Resumen de archivos afectados

| Archivo | Cambios |
|---------|---------|
| `src/index.css` | Anadir `.scrollbar-hide` y `.safe-area-bottom` |
| `src/components/layout/Footer.tsx` | Fix key duplicada, touch targets 44px |
| `src/pages/AboutUs.tsx` | Lazy loading de secciones below-the-fold |
| `src/pages/JornadaCero.tsx` | Defer iframe YouTube background |
| `src/components/VideoTestimonials.tsx` | Optimizar thumbnails, usar img lazy, reutilizar YouTubeEmbed |
| `src/components/shared/AnimatedSection.tsx` | matchMedia en vez de innerWidth para evitar reflows |
| `src/pages/UpDetail.tsx` | fetchPriority hero, mejorar scroll affordance mobile |

---

## Impacto esperado

- **LCP**: Mejora significativa en JornadaCero (eliminar iframe YouTube inmediato) y AboutUs (lazy loading)
- **TTI**: Reduccion de JavaScript inicial en todas las paginas con lazy loading
- **CLS**: Cero regresion, las imagenes ya tienen dimensiones implicitas
- **Mobile UX**: Touch targets correctos, scroll horizontal con affordance, safe areas en iPhone, scrollbar oculto en carruseles
- **Bugs resueltos**: Warning de React eliminado, clases CSS faltantes anadidas


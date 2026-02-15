

# Auditoria Tecnica UX - Academia Detail

## Resumen Ejecutivo

Tras revisar en profundidad toda la aplicacion, he identificado **23 hallazgos** organizados en 5 categorias. El sitio tiene una base solida en rendimiento y mobile-first, pero presenta fricciones de UX que impactan conversion y accesibilidad.

---

## 1. ACCESIBILIDAD (A11y)

### Hallazgos

**[A1] Contraste insuficiente en texto secundario**
- `--muted-foreground: 210 5% 78%` sobre `--background: 240 10% 11%` da un ratio de aprox 8.5:1 (correcto)
- Pero `text-foreground/50` y `text-white/60` usados extensivamente en heroes, footer y cards caen por debajo de WCAG AA (4.5:1). Ejemplo: `text-xs text-white/60` en ContactHero stats, footer, y precios

**[A2] Focus states invisibles**
- Los links del navbar desktop (`text-[13px]`) no tienen un `:focus-visible` con outline visible. Solo usan `hover:bg-white/5` pero no hay anillo de foco
- Los botones del footer social tienen `min-w-[48px] min-h-[48px]` (bien) pero sin focus ring explicito
- El boton de scroll indicator en HomeHero no tiene focus ring

**[A3] ARIA incompleto en dropdowns**
- Los dropdowns de Formaciones/Herramientas en Navbar usan `onMouseEnter/onMouseLeave` pero no tienen `aria-expanded`, `aria-haspopup`, ni `role="menu"` en el panel desplegable
- Los items del dropdown no tienen `role="menuitem"`
- El menu movil no atrapa el foco (focus trap) cuando esta abierto

**[A4] Skip navigation ausente**
- No existe un enlace "Saltar al contenido" para usuarios de teclado/lector de pantalla

**[A5] Imagenes decorativas sin aria-hidden**
- Los gradient orbs en HomeHero y los decorative circles en ContactSuccessModal no tienen `aria-hidden="true"`

---

## 2. JERARQUIA VISUAL Y LAYOUT

### Hallazgos

**[V1] Inconsistencia en padding de secciones**
- Home: las secciones alternan entre `py-20 md:py-28`, `py-16 md:py-24`, y `py-12 md:py-16` sin un patron claro
- ContactForm: `py-12 md:py-16` mientras las secciones de Home usan `py-20 md:py-28`
- Propuesta: estandarizar a 2 niveles: `py-16 md:py-24` (normal) y `py-20 md:py-28` (hero/destacado)

**[V2] CTA principal compite con CTA secundario en HomeHero**
- "Solicitar Informacion" (variant="hero") y "Ver Formaciones" (variant="glass") tienen trato visual similar en peso; el glass button puede distraer del CTA principal
- En mobile, ambos CTAs son `w-full` lo que reduce la jerarquia visual

**[V3] StickyFloatingCTA y LiveChat compiten por atencion**
- El StickyFloatingCTA ocupa la esquina inferior derecha (desktop) y toda la barra inferior (mobile)
- El LiveChat ocupa la esquina inferior izquierda
- Ambos son fixed y crean ruido visual simultaneo

**[V4] ExitIntentPopup con oferta incoherente**
- Muestra "Oferta Exclusiva -40%" con precio de "199 + IVA" (tachado 599) pero no enlaza a ninguna pagina ni tiene accion real. El boton "APROVECHAR OFERTA AHORA" no tiene `onClick` ni `href`

**[V5] Duplicacion de preload en index.html**
- El `<link rel="preload">` para hero-home.jpg aparece duplicado (lineas 19-25 y 26-33)

**[V6] CSS critico en index.html desalineado del theme real**
- El CSS inline usa `--primary: 10 93% 46%` (rojo) pero el theme real es `--primary: 348 60% 34%` (burdeos). Esto causa un flash de color incorrecto durante la carga

---

## 3. USABILIDAD MOVIL

### Hallazgos

**[M1] Touch targets correctos en general (bien implementado)**
- El CSS global ya aplica `min-height: 44px` a buttons y links en mobile
- Los footer links usan `min-h-[44px]`
- Los mobile menu items usan `min-h-[52px]`

**[M2] Inputs del formulario de contacto sin inputmode**
- El campo de telefono usa `type="tel"` (correcto) pero no tiene `inputMode="tel"` como refuerzo
- El campo de email usa `type="email"` (correcto)
- Ninguno de los inputs tiene `autoComplete` para autorellenado rapido

**[M3] Mobile menu footer CTA oculto por StickyFloatingCTA**
- Cuando el menu movil esta abierto, el CTA fijo del menu ("¿Eres Nuevo?") en `absolute bottom-0` puede quedar tapado por el StickyFloatingCTA que tambien esta en `fixed bottom-0`

**[M4] Stats del HomeHero ocultan 3 de 6 items en mobile**
- Los stats con `index >= 3` tienen `hidden sm:block`, perdiendo informacion relevante sin indicacion visual de que hay mas datos

**[M5] Horizontal scroll en categorias del blog sin indicador**
- Las categorias del blog usan scroll horizontal en mobile pero no hay indicador visual de que se puede hacer scroll (fade gradient o flecha)

---

## 4. FEEDBACK DEL SISTEMA

### Hallazgos

**[F1] ContactForm: estados de carga y error correctos (bien implementado)**
- Usa Loader2 spinner durante envio
- Muestra toast de error si falla el edge function
- ContactSuccessModal bien implementado con acciones claras

**[F2] RegistrationModal: console.log en produccion**
- Multiples `console.log` con emojis en el flujo de checkout (lineas 50-58). Estos deben eliminarse para produccion

**[F3] PageFallback demasiado minimo**
- El fallback de Suspense es solo `<div className="min-h-screen bg-background" />` -- una pantalla completamente negra sin indicacion de carga
- Propuesta: agregar un skeleton shimmer o al menos el logo centrado con un spinner

**[F4] FormationsGrid sin estados de carga**
- Las imagenes de formaciones usan `loading="lazy"` pero no tienen placeholder/blur-up ni skeleton mientras cargan

**[F5] StickyFloatingCTA muestra "12 plazas" sin validacion**
- Si la query a `registrations` falla, muestra el fallback de 12 plazas, lo cual puede ser incorrecto
- No hay loading state mientras se fetch el conteo

---

## 5. RENDIMIENTO PERCIBIDO (LCP)

### Hallazgos

**[P1] YouTube API diferida correctamente (bien implementado)**
- HomeHero difiere la carga del YouTube API 5 segundos, con fallback de imagen estatica
- La imagen hero tiene `fetchPriority="high"` y `loading="eager"`

**[P2] Code splitting bien implementado**
- Todas las paginas (excepto Home) son lazy-loaded
- Los componentes below-the-fold de Home son lazy-loaded con Suspense

**[P3] OptimizedHero carga iframe YouTube SIN diferir**
- A diferencia de HomeHero, el componente OptimizedHero carga un iframe de YouTube directamente sin diferir, bloqueando potencialmente el LCP. Sin embargo, este componente no parece estar en uso actualmente en las rutas principales

**[P4] Google Fonts carga no-bloqueante (bien)**
- Usa el truco de `media="print"` con `onload="this.media='all'"` para no bloquear el render

**[P5] App.css no utilizado**
- `src/App.css` contiene estilos legacy de Vite (`.logo`, `.card`, `.read-the-docs`) que no se usan. Son 40 lineas de CSS muerto

---

## Plan de Accion

### Quick Wins (impacto inmediato, bajo esfuerzo)

| # | Mejora | Archivo(s) | Impacto |
|---|--------|-----------|---------|
| 1 | Subir opacidad de textos de `white/60` a `white/70` y de `foreground/50` a `foreground/60` en heroes, stats y footer | ContactHero, HomeHero, Footer, FormationsGrid | A11y - Contraste |
| 2 | Agregar `focus-visible:ring-2 focus-visible:ring-ring` a nav links desktop y footer social links | Navbar, Footer | A11y - Focus |
| 3 | Agregar `aria-expanded`, `aria-haspopup="true"` a botones dropdown del navbar | Navbar | A11y - ARIA |
| 4 | Agregar skip-nav link `<a href="#main" class="sr-only focus:not-sr-only">Saltar al contenido</a>` | MainLayout | A11y - Navegacion |
| 5 | Corregir CSS critico inline: cambiar `--primary: 10 93% 46%` a `--primary: 348 60% 34%` | index.html | Visual - Flash color |
| 6 | Eliminar preload duplicado de hero-home.jpg | index.html | Rendimiento |
| 7 | Agregar `autoComplete` a inputs del ContactForm (`given-name`, `family-name`, `email`, `tel`) | ContactForm | Mobile UX |
| 8 | Eliminar `console.log` del RegistrationModal | RegistrationModal | Produccion |
| 9 | Eliminar App.css (CSS muerto) o limpiar su contenido | App.css | Rendimiento |
| 10 | Agregar `aria-hidden="true"` a elementos decorativos (gradient orbs, circles) | HomeHero, ContactSuccessModal | A11y |

### Mejoras Estructurales (mayor esfuerzo, alto impacto)

| # | Mejora | Archivo(s) | Impacto |
|---|--------|-----------|---------|
| 11 | Implementar focus trap en menu movil (cuando esta abierto, Tab debe circular dentro del panel) | Navbar | A11y critico |
| 12 | Mejorar PageFallback con logo centrado + skeleton shimmer en lugar de pantalla negra vacia | App.tsx | Feedback UX |
| 13 | Estandarizar padding de secciones a 2 niveles: `py-16 md:py-24` (normal) y `py-20 md:py-28` (destacado) | Multiples componentes | Consistencia visual |
| 14 | Resolver conflicto StickyFloatingCTA vs LiveChat vs menu movil CTA -- usar un unico CTA flotante contextual | StickyFloatingCTA, LiveChat | Mobile UX |
| 15 | Corregir ExitIntentPopup: conectar el CTA a una accion real o eliminar el componente si no esta en uso | ExitIntentPopup | UX / Conversion |
| 16 | Agregar fade gradient o indicador visual de scroll horizontal en categorias del blog en mobile | BlogCategories | Mobile UX |
| 17 | Agregar blur-up placeholders o skeleton shimmer a imagenes de FormationsGrid mientras cargan | FormationsGrid | Rendimiento percibido |

### Detalle tecnico de cambios

**Archivos a modificar:**
- `index.html` -- Corregir CSS critico, eliminar preload duplicado
- `src/components/layout/MainLayout.tsx` -- Agregar skip-nav link
- `src/components/layout/Navbar.tsx` -- ARIA attrs en dropdowns, focus-visible en links, focus trap en menu movil
- `src/components/layout/Footer.tsx` -- focus-visible en social links, subir opacidad textos
- `src/components/home/HomeHero.tsx` -- aria-hidden en decorativos, subir opacidad textos
- `src/components/contact/ContactHero.tsx` -- Subir opacidad de textos
- `src/components/contact/ContactForm.tsx` -- Agregar autoComplete a inputs
- `src/components/RegistrationModal.tsx` -- Eliminar console.logs
- `src/App.tsx` -- Mejorar PageFallback con skeleton
- `src/App.css` -- Limpiar CSS muerto
- `src/components/home/FormationsGrid.tsx` -- Subir opacidad textos
- `src/components/blog/BlogCategories.tsx` -- Indicador scroll mobile

**No se requieren cambios en la base de datos ni en edge functions.**


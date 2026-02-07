

# Reestructuracion Visual Completa - Academia Detail

## Resumen

Rediseno completo de la identidad visual del sitio web para mejorar legibilidad, sofisticacion y coherencia con el sector de automocion premium. Los tres ejes principales:

1. **Paleta de colores**: Fondos gris oscuro (en vez de negro puro), rojo burdeos como acento principal
2. **Iconografia**: Iconos mas relacionados con automocion profesional
3. **Estructura visual**: Tarjetas, espaciados y tipografia optimizados para legibilidad

---

## 1. Nueva Paleta de Colores

### Antes vs Despues

| Elemento | Antes | Despues |
|----------|-------|---------|
| Fondo principal | `#000000` (negro puro) | `#1a1a1f` (gris carbon) |
| Fondo card | `#0d0d0d` (casi negro) | `#222228` (gris oscuro calido) |
| Fondo muted | `#53565A` | `#2a2a32` (gris medio oscuro) |
| Color primario | `#E52B09` (rojo vivido) | `#8B2332` (burdeos/granate) |
| Primary glow | `#E84726` | `#A63046` (burdeos claro) |
| Primary dark | `#B72207` | `#6B1A26` (burdeos profundo) |
| Texto muted | 70% luminosidad | 75% luminosidad (mas legible) |
| Bordes | 34% luminosidad | 38% luminosidad (mas visibles) |

El resultado: fondos mas suaves que no cansan la vista, con un rojo burdeos mas elegante y profesional que transmite automocion premium.

### Archivo: `src/index.css`

Cambios en las variables CSS `:root`:
- `--background`: de `0 0% 0%` a `240 10% 11%` (gris carbon con toque azulado frio)
- `--card`: de `0 0% 5%` a `240 8% 14%` (gris oscuro para tarjetas)
- `--muted`: de `214 4% 34%` a `240 6% 18%` (gris intermedio)
- `--muted-foreground`: de `210 3% 70%` a `210 5% 75%` (texto secundario mas legible)
- `--primary`: de `10 93% 46%` a `348 60% 34%` (rojo burdeos)
- `--primary-glow`: a `348 55% 42%` (burdeos luminoso)
- `--primary-dark`: a `348 65% 28%` (burdeos profundo)
- `--border`: de `214 4% 34%` a `240 6% 22%` (bordes mas visibles)
- `--popover` y `--sidebar`: ajustados en consonancia
- Gradientes y sombras actualizados para reflejar el nuevo burdeos

Tambien se actualizaran el theme `.dark` y los gradientes/shadows para usar los nuevos valores burdeos.

---

## 2. Iconografia Automotive

Reemplazar iconos genericos de Lucide por otros mas representativos del sector automotriz en todos los componentes.

### Cambios de iconos por componente

**Navbar** (`src/components/layout/Navbar.tsx`):
- `Sparkles` (detailing) -> `Car` (mas claro para "cursos de coches")
- `Palette` (wrapping) -> mantener (ya es correcto)
- `Shield` (PPF) -> `ShieldCheck` (mas profesional)
- `Wrench` (restauracion) -> mantener
- `Crown` (carrera) -> `GraduationCap` (ya usado en movil, unificar)

**FormationsGrid** (`src/components/home/FormationsGrid.tsx`):
- `Sparkles` -> `Car` en el iconMap para detailing
- Mantener `Palette`, `Shield`, `Wrench`

**HomeHero** (`src/components/home/HomeHero.tsx`):
- `Wrench` badge -> `Gauge` (mas automotive/premium)
- Emoji del badge: quitar emoji de texto, usar solo icono Lucide

**BusinessSkillsSection** (`src/components/home/BusinessSkillsSection.tsx`):
- `Briefcase` badge -> `Fuel` o `CarFront` (contexto automocion)
- Los iconos de los modulos de negocio se mantienen (son conceptuales)

**CompetitiveComparison** (`src/components/home/CompetitiveComparison.tsx`):
- `Building` -> `Warehouse` (taller/instalaciones)
- `Car` -> mantener
- `Brain` -> mantener
- `Scale` -> mantener
- `User` -> `UserCheck`
- `Target` -> mantener
- `Users` -> `Handshake`

**CarreraNegocioSection** (`src/components/home/CarreraNegocioSection.tsx`):
- `BookOpen` (Aprende) -> `Car` (contexto auto)
- `Wrench` (Practica) -> mantener
- `Award` (Certifica) -> mantener
- `Building2` (Emprende) -> `Store` (centro propio)

**InstructorSection** (`src/components/home/InstructorSection.tsx`):
- `Car` -> mantener
- `Calendar` -> mantener
- Anadir contexto de "vehiculos trabajados" con icono `CarFront`

**JornadaZeroSection** (`src/components/shared/JornadaZeroSection.tsx`):
- `Clock` -> mantener
- `ShieldCheck` -> mantener
- `Wrench` -> `Gauge` (instrumento automotive)

**MontamosTuCentro** (`src/components/home/MontamosTuCentro.tsx`):
- `Building` -> `Store` (mas apropiado para "centro propio")
- `Rocket` -> `Gauge` (inicio del negocio, mas automotive)

---

## 3. Mejoras de Estructura Visual y Legibilidad

### 3a. Tarjetas y contenedores

**Archivo: `src/index.css`**
- `.glass-card`: fondo mas opaco con mejor contraste (`rgba(30, 30, 38, 0.8)` en vez de transparente oscuro)
- `.glass-intense`: borde burdeos sutil en vez de rojo puro
- Aumentar `border-radius` base de tarjetas de `0.5rem` a `0.75rem` para aspecto mas moderno
- Sombras mas suaves y difusas (menos agresivas)

### 3b. Tipografia

**Archivo: `src/index.css`**
- Aumentar `line-height` del body de `1.6` a `1.7` para mejor legibilidad
- Texto de parrafos: `text-foreground/80` como minimo (no usar `/60` o `/70` directamente)
- Los headings mantienen Bebas Neue pero con `letter-spacing: 0.04em` (ligeramente reducido para mejor legibilidad)

### 3c. Seccion SectionHeading

**Archivo: `src/components/shared/SectionHeading.tsx`**
- Badge: cambiar de `bg-primary/15 text-[#ff5533]` a usar variables CSS (`text-primary` puro) para que se adapte automaticamente al nuevo burdeos
- Subtitulo: usar `text-muted-foreground` sin opacidad extra

### 3d. Espaciado entre secciones

**Archivo: varias paginas**
- Secciones alternas con fondos `bg-background` y `bg-card` para crear ritmo visual claro (ya se hace parcialmente, unificar patron)
- Anadir separadores sutiles (`border-t border-border/50`) entre secciones cuando comparten el mismo fondo

### 3e. Testimonios

**Archivo: `src/components/home/TestimonialsSection.tsx`**
- Badge de formacion: cambiar `text-[#ff5533] bg-primary/15` a `text-primary bg-primary/10` (automatico con nueva paleta)

### 3f. SuccessStoriesLogos

**Archivo: `src/components/home/SuccessStoriesLogos.tsx`**
- Tipo de negocio: cambiar `text-[#ff5533]` a `text-primary` (automatico)

### 3g. MontamosTuCentro

**Archivo: `src/components/home/MontamosTuCentro.tsx`**
- Badge "Paso X": cambiar `text-[#ff5533] bg-primary/15` a `text-primary bg-primary/10`

### 3h. Botones

**Archivo: `src/components/ui/button.tsx`**
- Variante `hero`: reducir `hover:scale-110` a `hover:scale-105` (menos agresivo, mas elegante)
- Variante `cta`: reducir `hover:scale-105` a `hover:scale-[1.02]`
- Quitar `uppercase` de las variantes hero/cta/funnel (el uppercase con Bebas Neue en botones puede ser excesivo)

### 3i. Formularios

**Archivo: `src/components/contact/ContactForm.tsx`**
- Los inputs ya tienen buen tamano (h-12) - solo se beneficiaran del nuevo fondo de card mas claro

**Archivo: `src/components/home/HomeCTA.tsx`**
- Inputs sobre fondo primary: se beneficiaran automaticamente del nuevo burdeos (mejor contraste)

---

## 4. Gradient Text y Efectos Glow

**Archivo: `src/index.css`**
- `.gradient-text`: actualizar `drop-shadow` al nuevo burdeos
- Glow effects: reducir intensidad general un 30% para aspecto mas sofisticado
- `pulse-glow`, `glow-pulse`: usar valores burdeos
- `text-glow-pulse`: reducir intensidad del text-shadow

---

## Seccion Tecnica - Resumen de Archivos

| Archivo | Tipo de cambio |
|---------|---------------|
| `src/index.css` | **Principal**: toda la paleta de colores, gradientes, sombras, glassmorphism, gradient-text, glows |
| `tailwind.config.ts` | Sin cambios (usa variables CSS, se adapta automaticamente) |
| `src/components/ui/button.tsx` | Reducir scale en hover, quitar uppercase de hero/cta/funnel |
| `src/components/shared/SectionHeading.tsx` | Cambiar color hardcodeado `#ff5533` a `text-primary` |
| `src/components/home/HomeHero.tsx` | Icono `Wrench` -> `Gauge`, quitar emoji de texto |
| `src/components/home/FormationsGrid.tsx` | Icono detailing `Sparkles` -> `Car` |
| `src/components/home/CompetitiveComparison.tsx` | Iconos: `Building`->`Warehouse`, `User`->`UserCheck`, `Users`->`Handshake` |
| `src/components/home/BusinessSkillsSection.tsx` | Icono badge `Briefcase`->`Fuel` |
| `src/components/home/CarreraNegocioSection.tsx` | Iconos: `BookOpen`->`Car`, `Building2`->`Store` |
| `src/components/home/MontamosTuCentro.tsx` | Iconos: `Building`->`Store`, `Rocket`->`Gauge`; color hardcodeado a `text-primary` |
| `src/components/home/TestimonialsSection.tsx` | Color hardcodeado `#ff5533` a `text-primary` |
| `src/components/home/SuccessStoriesLogos.tsx` | Color hardcodeado `#ff5533` a `text-primary` |
| `src/components/shared/JornadaZeroSection.tsx` | Icono `Wrench`->`Gauge` |
| `src/components/layout/Navbar.tsx` | Iconos: `Sparkles`->`Car`, `Crown`->`GraduationCap` |

### Sin cambios

- **Imagenes**: No se tocan
- **Contenidos/textos**: No se tocan
- **Backend/Edge Functions**: No se tocan
- **Rutas/navegacion**: No se tocan
- **tailwind.config.ts**: No necesita cambios (usa variables CSS)


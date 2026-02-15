

# Reestructuracion SEO Tecnica: Datos Estructurados, Semantica HTML5 y Metadatos

## Estado actual

El sitio ya tiene una base SEO solida:
- Componente `SEO.tsx` con OG, Twitter Cards, canonical, hreflang y JSON-LD
- `seoConfig.ts` con +1000 lineas de esquemas (Course, FAQ, LocalBusiness, VideoObject, BreadcrumbList, WebPage)
- Auto-generacion de breadcrumbs por URL
- `SectionHeading` con soporte `titleAs="h1"` vs `h2`

Sin embargo, existen gaps significativos que esta reestructuracion corregira.

---

## Fase 1: Datos Estructurados JSON-LD

### 1.1 Esquema WebSite con SearchAction (Home)

El esquema WebSite actual es basico (`name` + `url`). Se enriquecera con `SearchAction` para habilitar el Sitelinks Search Box en Google:

```json
{
  "@type": "WebSite",
  "name": "Academia Detail",
  "url": "https://academiadetail.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://academiadetail.com/blog?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
```

**Archivo**: `src/utils/seoConfig.ts` (lineas ~565-570)

### 1.2 Blog listing: esquema CollectionPage

La pagina `/blog` usa un esquema `Blog` pero le falta el `CollectionPage` wrapper que Google recomienda para listados. Se anadira:

```json
{
  "@type": "CollectionPage",
  "name": "Blog de Detailing Profesional",
  "url": "https://academiadetail.com/blog",
  "mainEntity": { "@type": "Blog", ... }
}
```

**Archivo**: `src/pages/Blog.tsx` (lineas ~75-95)

### 1.3 Blog posts: enriquecer BlogPosting

El esquema `BlogPosting` en `BlogPost.tsx` ya es bueno pero le faltan:
- `dateModified` (actualmente copia `datePublished`, se usara un campo real si existe)
- `speakable` para voice search
- `isPartOf` apuntando al Blog padre

**Archivo**: `src/pages/BlogPost.tsx` (lineas ~53-77)

### 1.4 Jornada Zero: esquema completo faltante

La pagina `/jornada-zero-detailing` usa `seoConfig.jornadaCero` que ya tiene Course + Event. Sin embargo, la pagina `JornadaCero.tsx` es una landing independiente con su propio layout (no usa MainLayout/Navbar standard). Los esquemas ya estan correctamente configurados en seoConfig - no requiere cambios de datos estructurados.

### 1.5 Directorio: esquema ItemList

La pagina `/centros-detailing-espana` usa Helmet manual pero no tiene esquema `ItemList` para los perfiles. Se anadira uno dinamico basado en los detailers cargados.

**Archivo**: `src/pages/Directory.tsx` (lineas ~95+)

### 1.6 Calculadora de Dilucion: esquema SoftwareApplication

Como herramienta interactiva, la calculadora se beneficiara del esquema `SoftwareApplication` / `WebApplication`:

```json
{
  "@type": "WebApplication",
  "name": "Calculadora de Dilucion Detailing",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Web",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" }
}
```

**Archivo**: `src/utils/seoConfig.ts` (seccion `calculadoraDilucion`)

---

## Fase 2: Semantica HTML5 y Jerarquia de Encabezados

### 2.1 Auditoria de H1 por pagina

| Pagina | H1 actual | Estado |
|--------|-----------|--------|
| Home (`/`) | "Cursos de Detailing, Pulido y Tratamiento Ceramico en Espana" | OK |
| Blog (`/blog`) | "Blog de Detailing Profesional" | OK |
| BlogPost (`/blog/:slug`) | `post.title` | OK |
| FormationDetail | Dentro de `FormationHero` | Verificar |
| CarreraDetailing | Dentro de `CarreraHero` | Verificar |
| JornadaCero | "Jornada Zero: Tu Primera Inmersion..." | OK |
| Contact | Dentro de `ContactHero` | Verificar |
| Glossary | Dentro del componente | Verificar |
| Directory | Dentro de `DirectoryHero` | Verificar |
| AboutUs | Dentro de `AboutHero` | Verificar |

**Accion**: Verificar todos los heroes y asegurar que cada uno contenga exactamente un `<h1>` con la keyword principal. Auditar que `SectionHeading` siempre use `titleAs="h2"` (su default) en las secciones internas.

**Archivos a verificar/ajustar**: 
- `src/components/formation/FormationHero.tsx`
- `src/components/carrera/CarreraHero.tsx`
- `src/components/contact/ContactHero.tsx`
- `src/components/about/AboutHero.tsx`
- `src/components/directory/DirectoryHero.tsx`
- `src/pages/Glossary.tsx`

### 2.2 Corregir saltos de jerarquia h1 -> h3

En `JornadaCero.tsx` (linea 229): usa `<h3>` directamente dentro de una section donde no hay `<h2>` previo. Multiples secciones saltan de h1 a h3 sin h2 intermedio.

En la seccion "Solution" (linea 276): `<h3>` seguido de `<h2>` -- inversion de jerarquia.

**Accion**: Reestructurar los encabezados de JornadaCero para seguir orden h1 > h2 > h3 descendente sin saltos.

**Archivo**: `src/pages/JornadaCero.tsx` (multiples secciones)

### 2.3 Etiquetas semanticas HTML5

**MainLayout.tsx** - Ya tiene `<main>`, `<nav>` (via Navbar) y `<footer>`. Correcto.

**Secciones de contenido**: La mayoria de componentes ya usan `<section>`. Verificar que bloques independientes (testimonios, cards de formacion) usen `<article>` donde corresponda.

**Cambios especificos**:
- `TestimonialsSection.tsx`: Los testimonios ya usan `<article>`. OK.
- `FormationsGrid.tsx`: Cada card de formacion es un `<div>` -- cambiar a `<article>` ya que es contenido independiente.
- `BlogCardOverlay.tsx`: Verificar que use `<article>`.

**Archivos**: 
- `src/components/home/FormationsGrid.tsx`

### 2.4 Divs con onClick que deberian ser button/a

**JornadaCero.tsx**: Los "steps" (linea 304) son `<div>` informativos sin onClick -- correcto, no requieren cambio.

**Busqueda global**: Revisar si hay `<div onClick=...>` o `<span onClick=...>` que deberian ser `<button>` para accesibilidad y rastreo. Los componentes principales (Navbar, Footer, CTAs) ya usan `<Button>` y `<Link>`.

---

## Fase 3: Metadatos Avanzados y Open Graph

### 3.1 Longitud de Meta Title y Description

Auditoria de titulos actuales vs limites recomendados:

| Pagina | Title (chars) | Estado |
|--------|--------------|--------|
| Home | 66 chars | Ligeramente largo (max 60). Recortar |
| JornadaCero | 69 chars | Largo. Recortar |
| CarreraDetailing | 65 chars | Ligeramente largo. Recortar |
| Contact | 60 chars | OK |
| Blog | 63 chars | Ligeramente largo |
| Glossary | 67 chars | Largo |

**Accion**: Recortar titulos a <= 60 caracteres manteniendo keywords principales y CTAs. Verificar descriptions <= 155 chars.

**Archivo**: `src/utils/seoConfig.ts` (todas las secciones de titulo)

### 3.2 Open Graph y Twitter Cards

Ya estan implementados en `SEO.tsx` con:
- `og:title`, `og:description`, `og:image`, `og:type`, `og:locale`
- `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
- Dimensiones de imagen (`og:image:width/height`)

**Gap encontrado**: La pagina `/blog` y `/blog/:slug` configuran OG manualmente via Helmet en lugar de usar el componente `SEO`. Esto crea duplicacion y riesgo de inconsistencia.

**Accion**: Migrar Blog.tsx y BlogPost.tsx para usar el componente `<SEO>` centralizado en lugar de Helmet directo. Esto asegura consistencia en hreflang, canonical, OG y Twitter Cards.

**Archivos**: 
- `src/pages/Blog.tsx` (lineas 99-111 -> reemplazar por `<SEO>`)
- `src/pages/BlogPost.tsx` (lineas 100-120 -> reemplazar por `<SEO>`)

### 3.3 Canonical dinamico

`SEO.tsx` ya genera canonical dinamico basado en `url` o `canonical` prop. Las paginas que usan Helmet directo (Blog, BlogPost) duplican esta logica. La migracion a `<SEO>` resolvera esto.

### 3.4 index.html: Limpiar meta duplicados

`index.html` tiene meta OG y Twitter hardcodeados (lineas 111-131) que React Helmet sobreescribe de todos modos. Estos deben mantenerse como fallback para crawlers que no ejecutan JS, pero se actualizaran para ser consistentes con los valores reales.

**Archivo**: `index.html` (lineas 110-131)

---

## Resumen de archivos a modificar

| Archivo | Cambios |
|---------|---------|
| `src/utils/seoConfig.ts` | WebSite con SearchAction, CalculadoraDilucion con WebApplication, recortar titles a 60 chars |
| `src/pages/Blog.tsx` | Migrar de Helmet directo a componente `<SEO>`, anadir CollectionPage schema |
| `src/pages/BlogPost.tsx` | Migrar a `<SEO>`, enriquecer BlogPosting con speakable e isPartOf |
| `src/pages/Directory.tsx` | Anadir ItemList schema dinamico |
| `src/pages/JornadaCero.tsx` | Corregir jerarquia h1>h2>h3 (eliminar saltos de nivel) |
| `src/components/home/FormationsGrid.tsx` | Cambiar wrapper div de cards a `<article>` |
| `src/components/formation/FormationHero.tsx` | Verificar h1 unico |
| `src/components/carrera/CarreraHero.tsx` | Verificar h1 unico |
| `src/components/contact/ContactHero.tsx` | Verificar h1 unico |
| `src/components/about/AboutHero.tsx` | Verificar h1 unico |
| `src/components/directory/DirectoryHero.tsx` | Verificar h1 unico |
| `index.html` | Actualizar meta fallback OG/Twitter para consistencia |

**No se modifica ningun estilo visual, color, tipografia ni layout. Todos los cambios son "bajo el capo".**


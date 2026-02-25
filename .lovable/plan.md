

# Analisis SEO Completo y Plan de Mejoras

## Estado Actual: Lo Que Funciona Bien

La web tiene una base SEO solida con muchos aspectos bien implementados:

- Schemas JSON-LD avanzados (Course, FAQPage, LocalBusiness, VideoObject, BreadcrumbList, EducationalOccupationalProgram)
- Hreflang para mercado hispanohablante
- Meta tags con emojis estrategicos para CTR (estrellas, check, fuego)
- Sitemap Index modular (4 sitemaps: paginas, blog, glosario, directorio)
- robots.txt con bloqueo de bots IA y crawl-delay para bots SEO
- Canonicals correctos en todas las paginas
- Redirects 301 de URLs antiguas a nuevas
- Critical CSS inline + preload del LCP en index.html
- noindex dinamico en paginas de directorio vacias
- Lazy loading con code-splitting por ruta
- OG fallback en index.html para crawlers sin JS
- Breadcrumbs automaticos con schema y componente visual

---

## Problemas Detectados y Mejoras Propuestas

### 1. Pagina 404 sin SEO ni meta "noindex"

**Problema**: La pagina `NotFound.tsx` no tiene componente `<SEO>` ni `<meta name="robots" content="noindex">`. Los bots podrian indexar paginas 404, generando URLs basura en las SERPs.

**Solucion**: Anadir `<SEO>` con titulo descriptivo y `<meta name="robots" content="noindex, nofollow">` via Helmet.

---

### 2. Falta el Glosario en el sitemap de paginas

**Problema**: `sitemap-pages.xml` no incluye `/glosario-detailing`. Aunque los terminos individuales estan en el sitemap dinamico de glossary, la pagina principal del glosario no aparece en ningun sitemap.

**Solucion**: Anadir entrada para `/glosario-detailing` en `sitemap-pages.xml`.

---

### 3. Blog index no esta en el sitemap de paginas

**Problema**: `/blog` no aparece en `sitemap-pages.xml`. Los posts individuales estan en el sitemap dinamico, pero la pagina hub `/blog` no.

**Solucion**: Anadir entrada para `/blog` en `sitemap-pages.xml`.

---

### 4. Falta la Jornada Zero en el footer

**Problema**: El footer lista las formaciones principales pero no incluye "Jornada Zero" ni "Jornadas Intensivas", que son paginas con prioridad 0.9 en el sitemap. Esto reduce el internal linking hacia esas paginas.

**Solucion**: Anadir "Jornada Zero" al bloque de enlaces de formacion en el Footer.

---

### 5. Directorio y herramientas ausentes del footer

**Problema**: El footer no incluye enlaces al Directorio (`/centros-detailing-espana`) ni a la Calculadora de Dilucion. Estas herramientas son assets SEO clave (link magnets).

**Solucion**: Anadir ambos al bloque de quickLinks del Footer.

---

### 6. Jornadas Intensivas Hub sin entrada en sitemap

**Problema**: La pagina hub `/curso-detailing-iniciacion` tiene prioridad 0.9 en el sitemap pero las subpaginas `/jornada-zero-detailing` y `/up-detail-evento` si estan incluidas. Verificado: la hub SI esta en el sitemap. Sin embargo, faltan los eventos (Jornada Zero y Up Detail) en los quickLinks del footer para reforzar el enlazado interno.

---

### 7. Falta schema "Blog" en la pagina /blog

**Problema**: La pagina `/blog` usa `<SEO>` directamente con Helmet inline, pero no incluye un schema `CollectionPage` o `Blog` especifico. Esto desaprovecha la oportunidad de rich snippets para la pagina hub del blog.

**Solucion**: Anadir schema `Blog` o `CollectionPage` en la pagina `/blog`.

---

### 8. lastmod desactualizado en sitemaps

**Problema**: Todos los `lastmod` del `sitemap-pages.xml` y `sitemap.xml` estan en febrero 2026, pero se han hecho cambios significativos recientemente (pricing tables, blog posts nuevos). Los lastmod estaticos no reflejan los cambios reales.

**Solucion**: Actualizar `lastmod` en `sitemap-pages.xml` para reflejar la fecha actual (2026-02-25) en las paginas modificadas recientemente (cursos, blog, home).

---

### 9. Meta description del Directorio falta en SEO component

**Problema**: La pagina `Directory.tsx` usa `<Helmet>` directo en vez de `<SEO>`, perdiendo los schemas automaticos (LocalBusiness, breadcrumbs, hreflang). No tiene schema `ItemList` para los detailers listados.

**Solucion**: Migrar a `<SEO>` con seoConfig dedicado y anadir schema `ItemList` dinamico.

---

### 10. Imagenes alt="" vacias en admin (menor impacto)

**Problema**: Las imagenes del admin (`AdminProfileEditModal`) tienen `alt=""`. Impacto SEO nulo (admin no es publico), pero es buena practica corregirlo. **Prioridad baja**, no se implementara.

---

## Plan de Implementacion (Ordenado por Impacto SEO)

### Paso 1: NotFound.tsx - Anadir noindex
Anadir `<SEO>` con meta noindex para evitar indexacion de paginas 404.

### Paso 2: sitemap-pages.xml - Completar paginas faltantes
Anadir `/glosario-detailing`, `/blog` y actualizar fechas `lastmod`.

### Paso 3: Footer.tsx - Ampliar internal linking
Anadir al footer: Jornada Zero, Directorio, Calculadora de Dilucion.

### Paso 4: Blog.tsx - Anadir schema Blog/CollectionPage
Migrar el Helmet inline a `<SEO>` con schemas adecuados desde seoConfig.

### Paso 5: Directory.tsx - Migrar a SEO component
Migrar de Helmet directo a `<SEO>` con schema `ItemList` dinamico.

### Paso 6: sitemap.xml - Actualizar lastmod del index
Sincronizar las fechas del sitemap index principal.

---

## Detalles Tecnicos

### Archivos a modificar:
1. `src/pages/NotFound.tsx` - Anadir `<SEO>` + noindex
2. `public/sitemap-pages.xml` - Anadir 2 URLs + actualizar lastmod
3. `public/sitemap.xml` - Actualizar lastmod
4. `src/components/layout/Footer.tsx` - Ampliar quickLinks y formationLinks
5. `src/pages/Blog.tsx` o `src/utils/seoConfig.ts` - Anadir seoConfig.blog con schema
6. `src/pages/Directory.tsx` - Migrar Helmet a `<SEO>` con schemas

### Sin nuevas dependencias requeridas
### Sin cambios en base de datos
### Sin cambios en edge functions


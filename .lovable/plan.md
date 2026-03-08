

# Auditoría SEO Completa — Academia Detail

## Estado General: Muy Bueno (8/10)

La implementación SEO es avanzada y bien estructurada. Hay esquemas JSON-LD ricos, hreflang, breadcrumbs automáticos, sitemaps modulares, y buenas prácticas de rendimiento. A continuación detallo los hallazgos organizados por prioridad.

---

## PROBLEMAS DETECTADOS

### 1. Email Inconsistente en Esquemas (Alta Prioridad)
- En `seoConfig.ts` línea 29: `info@academiadetail.com`
- En `seoConfig.ts` línea 923 (ContactPage schema): `info@detailpark.es`
- En `SEO.tsx` (localBusinessSchema): `info@academiadetail.com`
- **Acción:** Unificar a `info@academiadetail.com` en todos los esquemas.

### 2. Rating Inconsistente entre index.html y Helmet (Media Prioridad)
- `index.html` OG title dice `★4.8`
- `seoConfig.ts` home title dice `★4.9`
- `localBusinessSchema` en SEO.tsx dice `ratingValue: "4.8"` con 218 reseñas
- `seoConfig.ts` organizationSchemaComplete dice `ratingValue: "4.8"` con 218 reseñas
- Los cursos individuales dicen `4.9` con diferente número de reseñas
- **Acción:** Decidir si la nota global es 4.8 o 4.9 y unificar en título del home y en index.html.

### 3. Sitemap con URLs de Supabase Expuestas (Media Prioridad)
- `sitemap.xml` contiene directamente `ncsatssbhqicptmivmqk.supabase.co/functions/v1/...` como URLs de sub-sitemaps.
- Esto no afecta el funcionamiento, pero expone la infraestructura.
- **Acción:** Considerar crear un proxy o edge function bajo el dominio propio (ej: `academiadetail.com/sitemap-blog.xml`).

### 4. Galería Eliminada — Redirección sin Página Propia (Baja Prioridad)
- `/galeria` y `/galeria-detailing` redirigen a `/quienes-somos`.
- El sitemap-pages.xml NO las lista (correcto).
- No hay problema, pero si había backlinks externos a `/galeria` se beneficiarían de un redirect 301 a nivel servidor en lugar de client-side.

### 5. Falta `lastmod` Dinámico en Sitemaps (Baja Prioridad)
- `sitemap-pages.xml` tiene fechas hardcoded (`2026-02-25`).
- **Acción:** Actualizar las fechas cuando haya cambios reales en el contenido.

### 6. Canonical Duplicado: index.html + Helmet (Informativo)
- `index.html` línea 131 tiene canonical hardcoded a `https://academiadetail.com/`.
- React Helmet lo sobrescribe por página, así que no hay conflicto real. Pero crawlers que no ejecutan JS verán siempre el canonical del home.
- **No requiere acción** — los bots principales ejecutan JS.

---

## ESTADO DE ENLACES INTERNOS

### Rutas Activas vs Sitemap

| Página | Ruta | En Sitemap | SEO Config | Estado |
|--------|------|-----------|------------|--------|
| Home | `/` | ✅ | ✅ | OK |
| Jornadas Intensivas | `/curso-detailing-iniciacion` | ✅ | ✅ | OK |
| Jornada Zero | `/jornada-zero-detailing` | ✅ | ✅ | OK |
| Up Detail | `/up-detail-evento` | ✅ | ✅ | OK |
| Carrera Detailing | `/formacion-profesional-detailing` | ✅ | ✅ | OK |
| Curso Detailing | `/curso-detailing-profesional` | ✅ | ✅ | OK |
| Curso Wrapping | `/curso-vinilado-vehiculos` | ✅ | ✅ | OK |
| Curso PPF | `/curso-ppf-proteccion-pintura` | ✅ | ✅ | OK |
| Curso Restauración | `/curso-restauracion-vehiculos` | ✅ | ✅ | OK |
| Quiénes Somos | `/quienes-somos` | ✅ | ✅ | OK |
| Contacto | `/contacto` | ✅ | ✅ | OK |
| Blog | `/blog` | ✅ | ✅ (dinámico) | OK |
| Glosario | `/glosario-detailing` | ✅ | ✅ | OK |
| Directorio | `/centros-detailing-espana` | ✅ | ✅ | OK |
| Directorio Únete | `/centros-detailing-espana/unete` | ✅ | ⚠️ Parcial | Falta schema rico |
| Calculadora | `/calculadora-dilucion-detailing` | ✅ | ✅ | OK |
| Política Privacidad | `/politica-privacidad` | ✅ | — | OK (no necesita) |

### Redirects 301 (Client-Side) — Todos Correctos
- `/jornada-cero` → `/curso-detailing-iniciacion`
- `/carrera-detailing` → `/formacion-profesional-detailing`
- `/formacion/detailing` → `/curso-detailing-profesional`
- `/formacion/wrapping` → `/curso-vinilado-vehiculos`
- `/formacion/ppf` → `/curso-ppf-proteccion-pintura`
- `/formacion/restauracion` → `/curso-restauracion-vehiculos`
- `/galeria` → `/quienes-somos`
- `/directorio` → `/centros-detailing-espana`

---

## LO QUE ESTÁ BIEN IMPLEMENTADO

1. **Esquemas JSON-LD ricos** — Course, FAQPage, BreadcrumbList, VideoObject, LocalBusiness, EducationalOccupationalProgram, BlogPosting, DefinedTermSet, ContactPage, AboutPage, WebSite con SearchAction.
2. **Hreflang** para mercados hispanohablantes (ES, MX, AR, CO, CL, PE + x-default).
3. **Sitemaps modulares** (4 sub-sitemaps: pages, blog, glossary, directory).
4. **robots.txt** permitiendo bots de IA (GPTBot, Perplexity, Claude, etc.) — excelente para GEO.
5. **404 con noindex** — correcto.
6. **Breadcrumbs automáticos** en SEO.tsx + breadcrumbs visuales con PageBreadcrumbs.
7. **Preloads y preconnects** en index.html para rendimiento.
8. **Fonts no bloqueantes** (media=print trick).
9. **CSS crítico inline** para above-the-fold.
10. **Lazy loading** de componentes below-the-fold.

---

## CAMBIOS PROPUESTOS

### Cambio 1: Unificar email en ContactPage schema
**Archivo:** `src/utils/seoConfig.ts` línea 923
**Cambio:** `info@detailpark.es` → `info@academiadetail.com`

### Cambio 2: Unificar rating en index.html
**Archivo:** `index.html` líneas 117, 126
**Cambio:** `★4.8` → `★4.9` (para coincidir con el title generado por Helmet)

### Cambio 3: Actualizar `lastmod` en sitemap.xml y sitemap-pages.xml
**Archivo:** `public/sitemap.xml`, `public/sitemap-pages.xml`
**Cambio:** Actualizar fechas de `2026-02-25` a `2026-03-08` (fecha actual).

Son 3 cambios pequeños y concretos. El resto del SEO está en muy buen estado.


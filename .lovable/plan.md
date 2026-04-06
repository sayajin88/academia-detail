

## Plan: Actualizar sitemap.xml y robots.txt

### Cambios necesarios

#### 1. `public/robots.txt` — Añadir rutas faltantes

Faltan estas rutas y directivas:
- Landing pages de ciudades: `Allow: /curso-detailing-madrid`, etc.
- Página `/gracias` y `/mapa-del-sitio`
- Bloquear `/admin/` (ruta de admin que existe en el proyecto)
- Bloquear parámetros de búsqueda duplicados: `Disallow: /*?s=` y `Disallow: /*?q=`
- Mover `Allow: /centros-detailing-espana/unete` dentro de la sección de directorio (actualmente está desordenado, aparece después del Sitemap)

#### 2. `public/sitemap.xml` — Añadir sub-sitemaps dinámicos

El sitemap index solo referencia `sitemap-pages.xml`. Faltan los 3 sub-sitemaps servidos por edge functions:
- `sitemap-blog.xml` (proxy de `blog-sitemap`)
- `sitemap-glossary.xml` (proxy de `glossary-sitemap`)
- `sitemap-directory.xml` (proxy de `directory-sitemap`)

#### 3. `public/sitemap-pages.xml` — Añadir páginas faltantes

Falta la página `/gracias` (priority 0.2, noindex en SEO pero presente para tracking).

Realmente `/gracias` no debería estar en el sitemap ya que es una página de conversión sin valor SEO. No la añadimos.

Sin cambios adicionales necesarios — las ciudades y mapa del sitio ya están incluidos.

### Archivos a modificar

| Archivo | Cambio |
|---|---|
| `public/robots.txt` | Añadir ciudades, bloquear `/admin/` y parámetros de query, reordenar directivas |
| `public/sitemap.xml` | Añadir los 3 sub-sitemaps (blog, glosario, directorio) |


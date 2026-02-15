

# Reestructuracion del Mapa de Sitemaps

## Problema

Tras los cambios recientes (rutas dinamicas del glosario, migracion SEO, nuevos esquemas JSON-LD), el sitemap esta desactualizado y le faltan URLs criticas:

- Las nuevas paginas individuales de cada termino del glosario (`/glosario-detailing/:slug`) no aparecen en ningun sitemap -- Google no las conoce
- Los 26 articulos del blog estan hardcodeados en `sitemap-pages.xml` en vez de usar el Edge Function `blog-urls` que ya existe
- No hay un sitemap separado para el glosario (potencialmente 100+ terminos)
- Las fechas `lastmod` no reflejan los cambios realizados

## Solucion: Arquitectura de Sitemaps modular

Pasar de 2 sitemaps a 4, organizados por tipo de contenido:

```text
sitemap.xml (Sitemap Index)
  |-- sitemap-pages.xml        (paginas estaticas: home, cursos, legal, herramientas)
  |-- sitemap-blog.xml         (nuevo - Edge Function que genera URLs del blog)
  |-- sitemap-glossary.xml     (nuevo - Edge Function que genera URLs del glosario)
  |-- directory-sitemap        (existente - Edge Function para detailers)
```

## Cambios por archivo

### 1. `public/sitemap.xml` -- Actualizar Sitemap Index

Agregar las 2 nuevas entradas (blog y glosario) y actualizar fechas:

- Anadir `sitemap-blog` apuntando al nuevo Edge Function
- Anadir `sitemap-glossary` apuntando al nuevo Edge Function
- Actualizar `lastmod` a fecha actual

### 2. `public/sitemap-pages.xml` -- Limpiar

- **Eliminar** todas las URLs de blog (las 26 entradas de `/blog/...`), ya que se moveran al nuevo sitemap de blog
- **Mantener** las paginas estaticas: home, cursos, eventos, herramientas, directorio index, legal
- Actualizar `lastmod` a `2026-02-15` en las paginas que fueron modificadas

### 3. Crear Edge Function `supabase/functions/glossary-sitemap/index.ts`

Genera dinamicamente un sitemap XML con todas las URLs de terminos del glosario:

- Importa la lista de terminos y la funcion `generateSlug` desde los datos
- Genera una URL por cada termino: `https://academiadetail.com/glosario-detailing/{slug}`
- Incluye la URL indice `/glosario-detailing` con prioridad 0.8
- Cada termino individual con prioridad 0.6 y changefreq monthly

Como los datos del glosario estan en el frontend (no en base de datos), el Edge Function incluira la lista de slugs directamente para evitar dependencias.

### 4. Crear Edge Function `supabase/functions/blog-sitemap/index.ts`

Genera dinamicamente un sitemap XML con todas las URLs del blog:

- Reutiliza la misma lista de articulos que ya tiene `blog-urls/index.ts`
- Formato XML sitemap en vez de JSON
- Incluye la URL indice `/blog` con prioridad 0.8
- Cada articulo con prioridad 0.7 y su `lastmod` real

### 5. `public/robots.txt` -- Anadir rutas del glosario

- Agregar `Allow: /glosario-detailing/` para las paginas individuales de terminos
- Agregar `Allow: /centros-detailing-espana/` para las subrutas del directorio

## Resumen de archivos

| Archivo | Accion |
|---------|--------|
| `public/sitemap.xml` | Modificar: anadir 2 sitemaps al indice |
| `public/sitemap-pages.xml` | Modificar: eliminar URLs de blog, actualizar fechas |
| `supabase/functions/glossary-sitemap/index.ts` | Crear: Edge Function sitemap del glosario |
| `supabase/functions/blog-sitemap/index.ts` | Crear: Edge Function sitemap del blog |
| `public/robots.txt` | Modificar: anadir Allow para rutas nuevas |

## Resultado

- Google descubrira automaticamente las 100+ paginas de terminos del glosario
- Los articulos del blog se gestionan desde un unico punto (Edge Function) en vez de hardcodearlos
- La arquitectura de sitemaps escala sin necesidad de editar archivos estaticos al anadir contenido
- Cada tipo de contenido tiene su propio sitemap, facilitando el diagnostico en Google Search Console


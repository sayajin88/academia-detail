

# Plan: Rediseno visual de la pagina principal del Blog

## Objetivo
Transformar el layout del blog para que siga el estilo "bento grid" de la imagen de referencia, con tarjetas de imagen a pantalla completa con titulo superpuesto, y reemplazar el `BlogNewsletter` por un banner CTA potente de inscripcion a cursos.

## Cambios visuales principales

### 1. Nuevo estilo de tarjeta "overlay" para los articulos
Las tarjetas actuales tienen la imagen arriba y el texto abajo en un fondo `bg-card`. El nuevo diseno muestra la imagen como fondo completo de la tarjeta con el titulo, categoria y metadata superpuestos en la parte inferior con un degradado oscuro. Esto crea un aspecto mucho mas visual e impactante.

```text
Tarjeta actual:                 Tarjeta nueva:
+------------------+            +------------------+
| [imagen]         |            |                  |
|                  |            |   [imagen fondo] |
+------------------+            |                  |
| Titulo           |            | CATEGORIA        |
| Extracto...      |            | TITULO BOLD      |
| Fecha            |            | TITULO BOLD      |
+------------------+            +------------------+
                                  5 min - 12 Ene 2026
```

### 2. Bento grid para la zona hero/featured
En la parte superior (en vez del hero actual + grid uniforme), se creara un layout tipo bento con:
- Columna izquierda grande: articulo destacado (featured) a gran tamano
- Columna derecha: 2-3 tarjetas mas pequenas apiladas (un "highlight" de curso, un articulo secundario, una cita/tip de la semana)

```text
Desktop layout:
+---------------------------+  +-------------+
|                           |  | Curso de    |
|  ARTICULO DESTACADO       |  | Detailing   |
|  (imagen grande,          |  | [CTA]       |
|   titulo superpuesto)     |  +-------------+
|                           |  +-------------+
|  TENDENCIA                |  | PPF o       |
|  "Titulo largo..."        |  | Wrapping?   |
|  Leer Reportaje ->        |  +-------------+
+---------------------------+  +-------------+
                               | Tip semana  |
                               +-------------+
```

### 3. Banner CTA de inscripcion (reemplaza BlogNewsletter inline)
En vez del formulario de newsletter, se insertara un banner rojo/burdeos con:
- Lado izquierdo: titulo "Formarte como Detailer Profesional", subtitulo con propuesta de valor, badges de confianza ("Sello Detail Park", "+500 alumnos formados")
- Lado derecho: boton CTA grande "Inscribirme Ahora" que enlaza a `/contacto`
- Sin formulario de inputs, solo el CTA directo

### 4. Seccion "Ultimos Articulos" con grid overlay
Debajo del banner CTA, la seccion de articulos paginados usa el nuevo estilo de tarjeta overlay en un grid de 4 columnas (desktop), 2 (tablet), 1 (movil). Encabezado con "Knowledge Base" badge y titulo "Ultimos Articulos" + filtros de categoria e icono de filtro.

## Detalle tecnico

### Archivos a crear

1. **`src/components/blog/BlogBentoHero.tsx`** -- Layout bento de la zona superior
   - Recibe el `featuredPost` y muestra el articulo destacado en la columna grande
   - Columna derecha con:
     - Tarjeta de promocion del "Curso de Detailing Profesional" (datos de `formations.ts`) con CTA "Ver Detalles"
     - Tarjeta secundaria con el 2do articulo mas reciente (imagen overlay)
     - Tarjeta de "Tip de la Semana" con cita inspiracional sobre detailing
   - Responsive: en movil se apilan verticalmente

2. **`src/components/blog/BlogCardOverlay.tsx`** -- Nueva tarjeta estilo overlay
   - Imagen como fondo completo
   - Degradado oscuro en la parte inferior
   - Categoria en badge de color sobre la imagen
   - Titulo en bold blanco superpuesto
   - Metadata (tiempo lectura + fecha) debajo de la tarjeta
   - Hover: zoom suave de la imagen + elevacion
   - Se usara tanto en el bento hero como en el grid principal

3. **`src/components/blog/BlogCTABanner.tsx`** -- Banner CTA de inscripcion
   - Fondo `bg-primary` (burdeos) con patron decorativo sutil
   - Layout en 2 columnas (texto izquierda, CTA derecha)
   - Titulo: "Formarte como Detailer Profesional"
   - Subtitulo: "Aprende la metodologia exacta para dominar el detailing y montar tu propio negocio. Formacion 80% practica con certificacion."
   - Trust badges: "Sello de Calidad Detail Park" + "+500 Alumnos Formados"
   - Boton: `<Link to="/contacto">` con texto "Inscribirme Ahora" en estilo blanco sobre fondo primario
   - Responsive: apilado en movil

### Archivos a modificar

4. **`src/components/blog/BlogGrid.tsx`** -- Actualizar grid
   - Usar `BlogCardOverlay` en vez de `BlogCard`
   - Cambiar grid a 4 columnas en desktop (`lg:grid-cols-4`)
   - Reemplazar `BlogNewsletter` por `BlogCTABanner`
   - Mantener la misma logica de filas y animaciones

5. **`src/pages/Blog.tsx`** -- Reestructurar layout
   - Sustituir el bloque de `BlogHero` por `BlogBentoHero`
   - Mover los filtros (categorias + busqueda) debajo del bento, junto al titulo "Ultimos Articulos" con badge "Knowledge Base"
   - Mantener paginacion existente
   - Mantener todo el SEO (Helmet, schema, canonical)

### Archivos que NO se tocan
- `src/data/blogPosts.ts` -- datos intactos
- `src/data/blogPostsNew.ts` -- datos intactos
- `src/data/blogPostsBusiness.ts` -- datos intactos
- `src/components/blog/BlogCard.tsx` -- se mantiene (se usa en `BlogRelatedPosts`)
- `src/components/blog/BlogNewsletter.tsx` -- se mantiene (se usa en `BlogPost.tsx` individual)

### Estilos clave

- **Tarjeta overlay**: `aspect-[3/4]` (vertical) en grid principal, imagen `object-cover` como fondo, `bg-gradient-to-t from-black/80 via-black/30 to-transparent` para legibilidad del texto
- **Titulo overlay**: `font-bold text-white uppercase text-lg leading-tight`, fuente Bebas Neue para impacto visual
- **Metadata**: fuera de la tarjeta, debajo, en `text-xs text-muted-foreground` con icono de reloj
- **Banner CTA**: `bg-primary rounded-2xl p-8 md:p-12`, boton blanco con texto burdeos
- **Bento grid**: `grid-cols-1 lg:grid-cols-3 gap-4`, columna izquierda `lg:col-span-2 lg:row-span-2`
- **Grid articulos**: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6`

### Resultado esperado
- Blog con aspecto visual moderno tipo editorial/magazine
- Layout bento en la zona hero con contenido variado (articulo destacado + promo curso + articulo secundario + tip)
- Tarjetas overlay de imagen completa con titulos superpuestos
- Banner CTA potente para redirigir trafico a inscripcion
- Grid de 4 columnas para los articulos paginados
- Totalmente responsive (1 col movil, 2 col tablet, 4 col desktop)
- Sin cambios en el contenido de los articulos




# Plan: Rediseno visual de la plantilla de articulos del Blog

## Objetivo
Transformar el layout de la pagina individual de cada articulo (`BlogPost.tsx`) para que siga el estilo editorial premium de la imagen de referencia: hero full-width inmersivo, secciones numeradas (01, 02, 03...), sidebar con tarjeta de curso y barra de progreso de lectura, y seccion CTA final potente con estadisticas y testimonial.

## Cambios visuales principales

### 1. Hero rediseñado (mas grande e inmersivo)
El hero actual tiene una imagen de 340-440px con un degradado suave. El nuevo hero sera mas grande (~500px en desktop) con:
- Imagen de fondo a pantalla completa con degradado oscuro potente
- Badges de categoria + tiempo de lectura superpuestos en la esquina superior izquierda
- Titulo grande y bold superpuesto en la parte inferior
- Avatar del autor con nombre, rol y fecha debajo del titulo
- Sin padding top extra del MainLayout (el hero empieza desde la zona del navbar)

```text
+--------------------------------------------------+
|  [imagen de fondo a pantalla completa]            |
|                                                   |
|  CATEGORIA   8 MIN READ                          |
|                                                   |
|                                                   |
|  Titulo del Articulo                              |
|  Grande y Bold                                    |
|                                                   |
|  [avatar] Nombre Autor                            |
|           Rol · 12 Enero 2026                     |
+--------------------------------------------------+
```

### 2. Layout del cuerpo: eliminar columna TOC izquierda
Actualmente hay 3 columnas (TOC | contenido | sidebar). Se simplificara a 2 columnas:
- **Columna principal** (izquierda): contenido del articulo con secciones numeradas
- **Sidebar** (derecha): tarjeta de curso + widget de progreso de lectura (sticky)

```text
+-------------------------------+  +------------------+
| 01. Titulo Seccion 1          |  | [imagen curso]   |
|                               |  | Curso Detailing  |
| Parrafo de contenido...       |  | Profesional      |
| Parrafo de contenido...       |  |                  |
|                               |  | Descripcion...   |
| 02. Titulo Seccion 2          |  |                  |
|                               |  | Precio           |
| Parrafo de contenido...       |  | [CTA Button]     |
|                               |  |                  |
|                               |  | Beneficio 1      |
|                               |  | Beneficio 2      |
|                               |  +------------------+
|                               |  +------------------+
|                               |  | Progreso Lectura |
|                               |  | ████████░░  46%  |
|                               |  | ~4 min restantes |
|                               |  +------------------+
+-------------------------------+
```

### 3. Secciones numeradas decorativas
Cada seccion del contenido tendra un numero decorativo en color primario antes del titulo:
- Formato: `01.` `02.` `03.` en color burdeos (primary)
- Numero en font-weight bold, tamano similar al titulo
- Titulo en la misma linea o justo al lado
- Se mantiene el estilo de separador entre secciones

### 4. Sidebar mejorada con 2 widgets
La sidebar actual solo tiene el CTA card. Se anadira:

**Widget 1 - Tarjeta de curso (ya existe, se mejora):**
- Imagen del curso en la parte superior de la tarjeta
- Nombre del curso con estrellas de valoracion
- Descripcion breve
- Precio con descuento tachado (si lo hay)
- Boton CTA rojo "Empezar a Aprender"
- Beneficios con iconos (acceso a todas las lecciones, certificacion)

**Widget 2 - Progreso de lectura (nuevo):**
- Barra de progreso visual con porcentaje
- Tiempo estimado restante ("~4 min restantes")
- Se actualiza en tiempo real al hacer scroll
- Integrado con el `readProgress` que ya existe en BlogPost

### 5. Seccion CTA final (reemplaza BlogNewsletter)
Al final del articulo, se renderizara una seccion tipo "Ready to Master the Craft?" con:
- Fondo oscuro diferenciado
- Titulo grande: "¿Listo para Dominar el Detailing?"
- Subtitulo con propuesta de valor
- 2 botones CTA: "Inscribirme en Formacion" + "Ver Todos los Cursos"
- Estadisticas: "+500 Alumnos" / "98% Satisfaccion" / "24/7 Soporte"
- Imagen lateral de un coche real (reutilizando un asset existente)
- Cita testimonial de un alumno debajo de la imagen

### 6. Tags y share buttons se mantienen
Los tags y botones de compartir se mantienen como estan, pero se reposicionan ligeramente para encajar en el nuevo layout de 2 columnas.

## Detalle tecnico

### Archivos a crear

1. **`src/components/blog/BlogReadingProgress.tsx`** -- Widget de progreso de lectura para sidebar
   - Recibe `progress` (0-100) y `readingTime` (string como "15 min")
   - Calcula tiempo restante estimado basandose en el porcentaje
   - Renderiza barra de progreso con color primario
   - Porcentaje numerico y texto de tiempo restante
   - Estilo: tarjeta `bg-card border border-border rounded-xl p-5`

2. **`src/components/blog/BlogPostCTA.tsx`** -- Seccion CTA final del articulo
   - Fondo `bg-muted/30` con borde sutil
   - Layout en 2 columnas (texto/CTAs izquierda, imagen/testimonial derecha)
   - Titulo: "¿Listo para Dominar el Detailing?"
   - Subtitulo: breve propuesta de valor de Academia Detail
   - 2 botones: primario "Inscribirme en Formacion" (enlaza a `/contacto`) y outline "Ver Todos los Cursos" (enlaza a la home, seccion cursos)
   - Estadisticas en fila: "+500 Alumnos" / "98% Satisfaccion" / "24/7 Soporte"
   - Imagen lateral reutilizando un asset existente (ej. `portfolio-ferrari.png`)
   - Cita testimonial en formato blockquote con nombre y rol
   - Responsive: apilado en movil

### Archivos a modificar

3. **`src/components/blog/BlogArticleContent.tsx`** -- Secciones numeradas
   - Anadir numero decorativo antes de cada titulo de seccion (`01.`, `02.`, etc.)
   - El numero se renderiza en color `text-primary` con `font-bold`
   - Formato: `<span className="text-primary font-bold mr-2">01.</span>` antes del texto del H2
   - Mantener todo lo demas (tablas, links, separadores, drop caps)

4. **`src/components/blog/BlogSidebar.tsx`** -- Mejorar con imagen y progreso
   - Anadir imagen del curso de detailing en la parte superior de la tarjeta
   - Anadir linea de valoracion con estrellas (5 estrellas + "(492 reviews)")
   - Anadir beneficios con iconos de check: "Acceso a Todas las Lecciones", "Certificacion Oficial Academia Detail"
   - Recibir nueva prop `readProgress` (number) para pasarla al widget de lectura
   - Importar y renderizar `BlogReadingProgress` debajo de la tarjeta de curso

5. **`src/pages/BlogPost.tsx`** -- Reestructurar layout
   - **Hero**: Redesenar para que sea mas grande e inmersivo, con avatar del autor
   - **Layout**: Eliminar la columna del TOC izquierdo. Pasar a 2 columnas (contenido + sidebar)
   - **Sidebar**: Pasar `readProgress` al `BlogSidebar`
   - **CTA final**: Reemplazar `BlogNewsletter` por `BlogPostCTA`
   - **Tags y share**: Mantener posicion actual
   - **Related posts**: Mantener al final como estan

### Archivos que NO se tocan
- `src/data/blogPosts.ts` -- no se cambian datos ni contenidos
- `src/data/blogPostsNew.ts` / `src/data/blogPostsBusiness.ts` -- intactos
- `src/components/blog/BlogTableOfContents.tsx` -- se mantiene el archivo pero ya no se usa en BlogPost (se puede conservar por si se necesita en el futuro)
- `src/components/blog/BlogNewsletter.tsx` -- se mantiene (puede usarse en otros contextos)
- `src/components/blog/BlogCard.tsx` -- se mantiene para related posts
- `src/components/blog/BlogRelatedPosts.tsx` -- sin cambios
- `src/components/blog/BlogShareButtons.tsx` -- sin cambios

### Estilos clave

- **Hero**: `min-h-[420px] md:min-h-[500px]`, degradado `bg-gradient-to-t from-background via-background/70 to-transparent`, titulo `text-3xl md:text-5xl font-bold text-white`
- **Numero de seccion**: `text-primary font-bold text-xl md:text-2xl` inline con el titulo
- **Sidebar curso card**: imagen `aspect-[16/10] rounded-t-xl`, estrellas en amarillo `text-yellow-400`, precio con tachado
- **Reading progress widget**: barra `h-2 bg-primary/20 rounded-full` con fill `bg-primary`, porcentaje en bold
- **CTA final**: fondo `bg-card/50 border border-border rounded-2xl p-8 md:p-12`, estadisticas en grid de 3 columnas
- **Layout 2 columnas**: `flex gap-8 lg:gap-12`, contenido `flex-1 min-w-0`, sidebar `hidden lg:block w-80 flex-shrink-0`

### Resultado esperado
- Plantilla de articulo con aspecto editorial premium tipo plataforma de cursos
- Hero full-width inmersivo con badges, titulo grande y avatar de autor
- Secciones numeradas (01, 02, 03...) para mejor organizacion visual
- Sidebar con tarjeta de curso enriquecida (imagen, estrellas, precio) y widget de progreso de lectura en tiempo real
- CTA final potente con estadisticas y testimonial (reemplaza newsletter)
- Layout de 2 columnas limpio (sin TOC lateral)
- Totalmente responsive (1 columna en movil, sidebar se mueve al final)
- Sin cambios en el contenido de ningun articulo


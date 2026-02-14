

## Migrar todos los articulos estaticos al modulo de blog del admin

### Objetivo

Insertar los 26 articulos de blog existentes (actualmente definidos en archivos TypeScript estaticos) en la tabla `blog_posts` de la base de datos, con estado `published`, para que aparezcan en el listado del panel admin y se puedan editar, modificar y eliminar. Ademas, cada articulo tendra una puntuacion SEO calculada previamente.

---

### Que se hara

**1. Insercion masiva de los 26 articulos en la base de datos**

Se creara una edge function temporal (`seed-blog-posts`) que:

- Recibe una llamada POST con el array completo de articulos
- Inserta cada uno en la tabla `blog_posts` con todos sus campos: slug, title, excerpt, category, author_name, author_role, published_at, reading_time, image_alt, featured, tags, sections (JSONB), related_slugs, status = 'published'
- Las imagenes (`image_url`) se dejaran como referencia a las rutas locales del proyecto (ya que son assets importados, se usara un mapeo de slug a ruta de imagen publica o se dejara null para articulos existentes que usan assets locales)

**2. Calculo de SEO score para cada articulo**

Se creara una logica de scoring SEO basica (sin IA, determinista) que evalua cada articulo segun estos criterios:

| Criterio | Puntos | Descripcion |
|----------|--------|-------------|
| Titulo contiene keyword principal | 10 | Si el titulo incluye alguna de las tags |
| Excerpt tiene longitud optima (120-160 chars) | 10 | Meta description ideal |
| Tiene al menos 4 secciones | 10 | Profundidad del contenido |
| Tiene al menos 5 tags | 10 | Cobertura de keywords |
| Secciones tienen enlaces internos | 15 | Internal linking |
| Al menos una seccion tiene tabla | 10 | Contenido enriquecido |
| Titulo < 65 caracteres | 5 | Longitud SEO optima |
| Excerpt no esta vacio | 5 | Tiene meta description |
| Tiene related slugs | 10 | Malla de contenido |
| Tiene image alt descriptivo | 5 | SEO de imagenes |
| Contenido total > 1500 palabras | 10 | Long-form content |

Score maximo: 100. Se calculara para cada articulo y se guardara en el campo `seo_score`.

**3. Script de seed en el frontend (pagina admin temporal o accion en BlogPostList)**

Se anadira un boton "Importar articulos estaticos" en el `BlogPostList.tsx` que:
- Importa los 26 articulos del archivo `blogPosts.ts`
- Calcula el SEO score de cada uno
- Los inserta en la base de datos mediante `supabase.from('blog_posts').upsert()`
- Muestra un toast de exito/error
- El boton solo aparece si no hay articulos en la base de datos (para evitar duplicados)

**4. Ajuste del hook `useBlogPosts` para priorizar DB**

- Si hay articulos en la base de datos, se usaran esos como fuente principal
- Los articulos estaticos solo se muestran como fallback si no estan en la DB

---

### Detalle tecnico

**Archivos modificados:**

- `src/components/admin/blog/BlogPostList.tsx` — Anadir boton de importacion con logica de seed y scoring SEO
- `src/hooks/useBlogPosts.ts` — Sin cambios (ya tiene la logica de merge correcta)

**Logica del boton "Importar articulos":**

```text
1. Verificar que la tabla blog_posts esta vacia (query count)
2. Importar blogPosts desde src/data/blogPosts.ts
3. Para cada post:
   a. Calcular seo_score con la funcion determinista
   b. Mapear campos: slug, title, excerpt, category, author_name, author_role, 
      published_at, reading_time, image_alt, featured, tags, sections, 
      related_slugs, status='published', seo_score
   c. image_url = null (se mantienen los assets locales via el merge del hook)
4. Insertar todo con upsert (on conflict slug)
5. Invalidar query cache
6. Mostrar toast con resultado
```

**No se necesitan migraciones SQL** — la tabla ya existe con el esquema correcto.

**No se necesitan edge functions nuevas** — la insercion se hace directamente desde el cliente admin (protegido por RLS de admin).

### Resultado esperado

- Los 26 articulos apareceran en la tabla del admin con titulo, categoria, estado, fecha y puntuacion SEO
- Se podran editar, modificar estado (publicado/borrador) y eliminar desde el panel
- La puntuacion SEO sera visible como un numero de color (verde > 70, amarillo 40-70, rojo < 40)


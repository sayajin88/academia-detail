

## Modulo de Gestion de Blog en el Panel de Admin

### Resumen

Crear un sistema completo de redaccion y gestion de articulos de blog desde el panel de administracion, con asistencia de IA para SEO, legibilidad, fact-checking y generacion de contenido. Los articulos se almacenaran en la base de datos y se renderizaran usando la misma plantilla visual que los articulos actuales.

---

### Arquitectura General

El sistema se compone de 4 capas:

1. **Base de datos**: tabla `blog_posts` que almacena articulos con el mismo esquema que `BlogPost`
2. **Panel admin**: pagina `/admin/blog` con listado, editor y herramientas de IA
3. **Edge function**: `blog-ai-assistant` que conecta con Lovable AI para las funciones inteligentes
4. **Frontend publico**: el blog actual (`Blog.tsx`, `BlogPost.tsx`) lee tanto de datos estaticos como de la base de datos

---

### 1. Base de datos

**Nueva tabla `blog_posts`:**

| Columna | Tipo | Descripcion |
|---------|------|-------------|
| id | uuid (PK) | Identificador unico |
| slug | text (unique) | URL del articulo |
| title | text | Titulo |
| excerpt | text | Extracto / meta description |
| category | text | detailing, ppf, wrapping, negocios |
| author_name | text | Nombre del autor |
| author_role | text | Cargo del autor |
| author_image | text | URL imagen del autor |
| published_at | date | Fecha de publicacion |
| reading_time | text | Tiempo estimado de lectura |
| image_url | text | URL imagen principal |
| image_alt | text | Alt text de la imagen |
| featured | boolean | Articulo destacado |
| tags | text[] | Array de etiquetas |
| sections | jsonb | Array de BlogSection (id, title, content, links, table) |
| related_slugs | text[] | Slugs de articulos relacionados |
| status | text | draft, published |
| seo_score | integer | Puntuacion SEO calculada por IA |
| readability_score | integer | Puntuacion de legibilidad |
| created_at | timestamptz | Fecha de creacion |
| updated_at | timestamptz | Ultima modificacion |
| created_by | uuid | Usuario que creo el articulo |

**RLS**: Solo usuarios con rol `admin` pueden leer/escribir. Las filas con `status = 'published'` son legibles por `anon` (para el frontend publico).

**Storage bucket**: `blog-images` para subir fotos del articulo.

---

### 2. Edge Function: `blog-ai-assistant`

Una unica edge function que recibe un `action` y delega a Lovable AI (google/gemini-3-flash-preview):

| Accion | Entrada | Salida |
|--------|---------|--------|
| `generate-outline` | Titulo + categoria + keywords | Array de secciones (id, title, descripcion breve) |
| `write-section` | Titulo seccion + contexto articulo + keywords | Contenido de la seccion con enlaces `[[texto]]` |
| `seo-analysis` | Titulo + excerpt + sections + tags | Score 0-100 + lista de mejoras concretas |
| `readability-analysis` | Contenido completo | Score 0-100 + sugerencias (frases largas, pasiva, tecnicismos) |
| `suggest-keywords` | Titulo + categoria | Lista de keywords + sugerencias de enlaces internos a rutas existentes |
| `fact-check` | Contenido de una seccion | Lista de afirmaciones verificables + nivel de confianza |
| `suggest-meta` | Titulo + contenido | Meta title, meta description, og:title, og:description optimizados |
| `improve-section` | Contenido seccion + instruccion | Seccion reescrita |

Cada accion incluye en el system prompt el contexto de Academia Detail, las rutas internas de la web, y las directrices de estilo.

---

### 3. Panel Admin: `/admin/blog`

**3.1. Listado de articulos**
- Tabla con columnas: titulo, categoria, estado (borrador/publicado), fecha, score SEO
- Botones: Nuevo articulo, Editar, Eliminar, Cambiar estado
- Filtros por estado y categoria

**3.2. Editor de articulo (modal o pagina completa)**

El editor se organiza en pestanas:

**Pestana "Contenido":**
- Campos basicos: titulo, slug (auto-generado), excerpt, categoria, tags, fecha publicacion
- Editor de secciones: lista ordenable de secciones, cada una con titulo y editor de texto
- Boton "Generar Outline con IA" que crea la estructura de secciones automaticamente
- Boton "Escribir seccion con IA" en cada seccion individual
- Boton "Mejorar seccion" para reescribir con instrucciones

**Pestana "SEO":**
- Analisis SEO on-page: muestra score + checklist de mejoras
- Sugerencia de keywords y enlaces internos
- Preview de como se veria en Google (titulo + meta description + URL)
- Analisis SEO off-page: sugerencias de link building, slugs relacionados

**Pestana "Legibilidad":**
- Score de legibilidad (0-100)
- Indicadores: longitud media de frase, uso de voz pasiva, nivel de tecnicismo
- Sugerencias especificas de mejora por seccion

**Pestana "Multimedia":**
- Subida de imagen principal (con campo alt text)
- Subida de imagen de autor
- Galeria de imagenes disponibles en el proyecto
- Sugerencias de imagenes basadas en el contenido

**Pestana "Verificacion":**
- Fact-checking automatizado seccion por seccion
- Lista de afirmaciones con nivel de confianza (alto/medio/bajo)
- Preview del articulo renderizado con la plantilla real

**Pestana "Publicar":**
- Resumen final: titulo, excerpt, tags, imagen, scores
- Selector de estado: borrador / publicado
- Selector de articulo destacado
- Selector de articulos relacionados
- Boton "Guardar borrador" y "Publicar"

---

### 4. Integracion con el frontend publico

- Crear un hook `useBlogPosts()` que combine los posts estaticos (`blogPosts` del archivo TS) con los posts de la base de datos con `status = 'published'`
- Ordenar todos por `publishedAt` descendente
- `BlogPost.tsx` intentara primero buscar en los datos estaticos, y si no encuentra, hara query a la base de datos
- Esto permite una transicion gradual sin romper los articulos existentes

---

### 5. Navegacion admin

- Anadir entrada "Blog" en el `navItems` de `AdminLayout.tsx`
- Anadir ruta `/admin/blog` en `App.tsx`

---

### Detalle tecnico de archivos

**Nuevos archivos:**
- `supabase/functions/blog-ai-assistant/index.ts` — Edge function con logica de IA
- `src/pages/AdminBlog.tsx` — Pagina principal del modulo
- `src/components/admin/blog/BlogPostEditor.tsx` — Editor completo con pestanas
- `src/components/admin/blog/BlogPostList.tsx` — Tabla de listado
- `src/components/admin/blog/BlogSEOPanel.tsx` — Pestana de analisis SEO
- `src/components/admin/blog/BlogReadabilityPanel.tsx` — Pestana de legibilidad
- `src/components/admin/blog/BlogMediaPanel.tsx` — Pestana de multimedia
- `src/components/admin/blog/BlogFactCheckPanel.tsx` — Pestana de verificacion
- `src/components/admin/blog/BlogSectionEditor.tsx` — Editor individual de seccion
- `src/components/admin/blog/BlogAIActions.tsx` — Botones y modales de acciones IA
- `src/components/admin/blog/BlogPublishPanel.tsx` — Pestana de publicacion
- `src/components/admin/blog/BlogGooglePreview.tsx` — Preview tipo SERP
- `src/hooks/useBlogPosts.ts` — Hook que combina datos estaticos + DB

**Archivos modificados:**
- `src/components/admin/AdminLayout.tsx` — Anadir nav item "Blog"
- `src/App.tsx` — Anadir ruta `/admin/blog`
- `src/pages/Blog.tsx` — Usar `useBlogPosts()` en lugar de importar directamente
- `src/pages/BlogPost.tsx` — Buscar tambien en la base de datos

**Migracion SQL:**
- Crear tabla `blog_posts`
- Crear bucket `blog-images`
- Crear politicas RLS


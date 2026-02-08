

## Blog de Alta Conversion para Academia Detail

### Resumen

Se creara un sistema de blog completo con dos paginas principales: un listado de articulos con hero destacado, filtros por categoria y buscador, y una pagina de articulo individual con indice flotante, sidebar con CTA y articulos relacionados. Ademas, se incluira un formulario de suscripcion a la newsletter integrado en el grid del blog, con los suscriptores almacenados en la base de datos.

### Estructura de Paginas

```text
/blog                    --> Listado de articulos (BlogIndex)
/blog/:slug              --> Articulo individual (BlogPost)
```

### Diseno Visual

La estetica seguira el sistema de diseno existente: fondo carbon (#1a1a1f), tarjetas en gris oscuro (#222228), acentos burdeos (#8B2332), tipografia Bebas Neue para titulos y Open Sans para cuerpo. Las tarjetas del blog usaran el mismo patron de bordes con hover en burdeos y glassmorphism.

**Pagina de Listado (BlogIndex):**
- Hero grande con articulo destacado (imagen a pantalla parcial con overlay y titulo)
- Barra de categorias (Detailing, PPF, Wrapping, Negocios) con filtro activo en burdeos
- Barra de busqueda con icono
- Grid responsivo: 3 columnas en desktop, 2 en tablet, 1 en movil
- Formulario de newsletter insertado como tarjeta especial entre los articulos del grid
- Paginacion o carga infinita

**Pagina de Articulo (BlogPost):**
- Hero con imagen de cabecera del articulo
- Layout de 2 columnas en desktop: contenido principal (70%) + sidebar fija (30%)
- Indice de contenidos (TOC) flotante que sigue el scroll, resaltando la seccion activa
- Sidebar con CTA de inscripcion a cursos (sticky)
- Tipografia optimizada para lectura larga: interlineado generoso, ancho maximo de texto ~720px
- Botones de compartir en redes (Twitter/X, LinkedIn, WhatsApp, copiar enlace)
- Seccion de articulos relacionados al final (3 tarjetas)
- Breadcrumbs con schema JSON-LD (sin visual, solo SEO, siguiendo el patron existente)

### Contenido Inicial del Blog

Se incluiran 6 articulos de ejemplo con contenido real y optimizado para SEO:

1. **"Como Montar un Negocio de Detailing Rentable en 2026"** (Negocios) - Destacado
2. **"Guia Completa de Pulido de Coches: Tecnicas Profesionales"** (Detailing)
3. **"PPF vs Ceramico: Cual Protege Mejor tu Vehiculo"** (PPF)
4. **"Car Wrapping: Todo lo que Necesitas Saber Antes de Vinilar"** (Wrapping)
5. **"5 Errores que Cometen los Detailers Principiantes"** (Detailing)
6. **"Cuanto Gana un Detailer Profesional en Espana"** (Negocios)

Cada articulo tendra: titulo, slug, categoria, fecha, imagen, excerpt, tiempo de lectura, contenido completo estructurado en secciones con subtitulos, autor (Daniel Lopez), y tags de articulos relacionados.

### Base de Datos

Se creara una tabla `blog_newsletter_subscribers` para almacenar las suscripciones a la newsletter:

```text
blog_newsletter_subscribers
- id (uuid, PK)
- email (text, unique, not null)
- name (text, nullable)
- created_at (timestamptz)
```

Con politica RLS que permita inserciones publicas (INSERT) pero no lectura ni modificacion anonima (solo lectura para servicio).

### Optimizacion SEO

- Etiquetas semanticas HTML5: `<article>`, `<section>`, `<aside>`, `<header>`, `<nav>`, `<time>`
- Schema JSON-LD automatico por articulo: BlogPosting con author, datePublished, image, publisher
- Schema BreadcrumbList automatico (ya existe el patron en SEO.tsx)
- Meta descriptions unicas por articulo con palabras clave
- Open Graph y Twitter Cards con imagen del articulo
- URLs limpias: `/blog/como-montar-negocio-detailing`
- Canonical URLs
- Imagenes con alt text optimizado

### Navegacion

- Se anadira enlace "Blog" en el Navbar (desktop y movil)
- Se anadira enlace "Blog" en el Footer
- Breadcrumbs SEO en pagina de articulo

### Seccion Tecnica

**Archivos nuevos (16 archivos):**

- `src/data/blogPosts.ts` - Datos estaticos de los articulos con contenido completo estructurado por secciones
- `src/pages/Blog.tsx` - Pagina principal del blog con lazy loading de componentes below-fold
- `src/pages/BlogPost.tsx` - Pagina de articulo individual con layout de 2 columnas
- `src/components/blog/BlogHero.tsx` - Hero del articulo destacado con imagen de fondo y overlay
- `src/components/blog/BlogGrid.tsx` - Grid responsivo de tarjetas con slot para newsletter
- `src/components/blog/BlogCard.tsx` - Tarjeta individual de post (imagen, titulo, excerpt, categoria, fecha, tiempo de lectura)
- `src/components/blog/BlogSearch.tsx` - Input de busqueda con icono de lupa y debounce
- `src/components/blog/BlogCategories.tsx` - Pills/chips de categorias con estado activo en burdeos
- `src/components/blog/BlogNewsletter.tsx` - Formulario de suscripcion con campo email y nombre, validacion con zod, guardado en base de datos
- `src/components/blog/BlogSidebar.tsx` - Sidebar sticky con CTA de inscripcion a cursos, info de contacto y links a formaciones
- `src/components/blog/BlogTableOfContents.tsx` - TOC flotante/sticky que detecta la seccion visible con IntersectionObserver y resalta el item activo
- `src/components/blog/BlogShareButtons.tsx` - Botones de compartir en WhatsApp, Twitter/X, LinkedIn y copiar enlace
- `src/components/blog/BlogRelatedPosts.tsx` - Grid de 3 articulos relacionados basados en categoria
- `src/components/blog/BlogArticleContent.tsx` - Renderizador del contenido del articulo con tipografia optimizada para lectura (max-w-prose, interlineado 1.8, parrafos espaciados)

**Archivos modificados (4 archivos):**

- `src/App.tsx` - Nuevas rutas `/blog` y `/blog/:slug`
- `src/components/layout/Navbar.tsx` - Nuevo enlace "Blog" en navegacion desktop y movil
- `src/components/layout/Footer.tsx` - Nuevo enlace "Blog" en la seccion de links
- `src/utils/seoConfig.ts` - Nueva entrada `blog` y funcion `generateBlogPostSchema` para schema BlogPosting

**Migracion de base de datos:**

- Crear tabla `blog_newsletter_subscribers` con columnas `id`, `email` (unique), `name`, `created_at`
- Politica RLS: permitir INSERT anonimo, denegar SELECT/UPDATE/DELETE anonimo

**Patron del contenido de articulos (blogPosts.ts):**

Cada articulo seguira esta interfaz:

```text
BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  category: 'detailing' | 'ppf' | 'wrapping' | 'negocios'
  author: { name, role, image }
  publishedAt: string (ISO date)
  readingTime: string
  image: string (URL de imagen)
  imageAlt: string
  featured: boolean
  tags: string[]
  sections: Array<{
    id: string (anchor para TOC)
    title: string
    content: string (texto con formato)
  }>
  relatedSlugs: string[]
}
```

**Detalles de implementacion clave:**

- BlogTableOfContents usa `IntersectionObserver` para detectar que seccion esta visible y resaltarla en el indice, con posicion `sticky top-24` en desktop y oculto en movil
- BlogSidebar es `sticky top-24` en desktop, se mueve al final del articulo en movil
- BlogSearch implementa debounce de 300ms para filtrar articulos por titulo y contenido
- BlogNewsletter valida email con zod, guarda en Supabase con manejo de duplicados (upsert), y muestra toast de confirmacion
- BlogArticleContent usa `prose` styles personalizados (no Tailwind Typography plugin) con tipografia optimizada: `text-lg leading-[1.8] text-muted-foreground` para parrafos, titulos de seccion en `text-2xl font-bold text-foreground`
- Cada seccion del articulo tiene un `id` que genera automaticamente anclas para el TOC
- Las imagenes de los articulos se referenciaran como URLs de los assets existentes o imagenes de stock optimizadas

**Orden de implementacion:**

1. Migracion de base de datos (tabla newsletter)
2. Datos de articulos (`blogPosts.ts`)
3. Componentes atomicos: BlogCard, BlogSearch, BlogCategories, BlogShareButtons
4. Componentes compuestos: BlogHero, BlogGrid, BlogNewsletter, BlogSidebar, BlogTableOfContents, BlogRelatedPosts, BlogArticleContent
5. Paginas: Blog.tsx, BlogPost.tsx
6. Rutas en App.tsx
7. Navegacion: Navbar + Footer
8. SEO config


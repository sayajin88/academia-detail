

# Plan de Optimizacion SEO del Blog (Lighthouse 100/100)

Mantenemos la arquitectura actual con archivos estaticos. Nos centramos en las 4 categorias de Lighthouse: Rendimiento, Accesibilidad, Buenas Practicas y SEO.

---

## 1. Accesibilidad (A11y)

### 1.1 Etiquetas `aria-label` y roles faltantes

**Blog.tsx**: Anadir `role="search"` al contenedor de busqueda. Anadir `aria-label` al input de busqueda en `BlogSearch.tsx`.

**BlogNewsletter.tsx**: Anadir `aria-label` a los inputs de nombre y email (actualmente solo tienen `placeholder`, que no es suficiente para lectores de pantalla).

**BlogPagination.tsx**: Anadir `aria-label="Paginacion del blog"` al `<nav>` y `aria-current="page"` al boton de pagina activa.

**BlogShareButtons.tsx**: Los botones de compartir ya tienen `aria-label` -- correcto. Verificar que el area tactil sea >= 44x44px (actualmente `p-2` = 32px, necesita `p-2.5` o `min-w-[44px] min-h-[44px]`).

### 1.2 Jerarquia de encabezados (H1 -> H2 -> H3)

**Blog.tsx (indice)**: Actualmente hay un `<h2>` ("Ultimos Articulos") pero no hay `<h1>`. Anadir un `<h1>` como titulo principal de la pagina del blog (puede ser visualmente discreto pero debe existir para SEO y accesibilidad).

**BlogPostPage.tsx**: El `<h1>` del titulo del post es correcto. Los `<h2>` de las secciones son correctos. El `<h3>` de "Articulos relacionados" es correcto. OK.

**BlogSidebar.tsx**: Tiene un `<h4>` para "Curso Detailing Profesional" -- OK como sidebar secundario.

### 1.3 Contraste de colores

Revisar que los badges de categoria (`text-blue-400`, `text-emerald-400`, etc.) tengan ratio de contraste >= 4.5:1 contra su fondo. Los tonos `*-400` sobre fondos `*-500/20` pueden no cumplir WCAG AA. Ajustar a `*-300` si es necesario.

### 1.4 Areas tactiles minimas (44x44px)

- **BlogShareButtons**: Aumentar padding de `p-2` (32px) a `min-w-[44px] min-h-[44px]`
- **BlogCategories**: Los botones de filtro tienen `px-4 py-2` -- verificar que la altura total sea >= 44px
- **BlogPagination**: Los botones ya tienen `px-4 py-2` -- anadir `min-h-[44px]`

---

## 2. SEO Tecnico

### 2.1 Breadcrumbs visibles en el blog

**Blog.tsx**: Anadir el componente `PageBreadcrumbs` (ya existe en `src/components/shared/PageBreadcrumbs.tsx`) con la ruta `[{label: 'Blog'}]`.

**BlogPostPage.tsx**: Anadir `PageBreadcrumbs` con la ruta `[{label: 'Blog', href: '/blog'}, {label: post.title}]`. Ya tiene el schema `BreadcrumbList` en JSON-LD pero no tiene el componente visual.

### 2.2 Datos estructurados adicionales

**BlogPostPage.tsx**: Anadir schema `Person` para el autor (E-E-A-T):
```
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Daniel Lopez",
  "jobTitle": "CEO y Formador Principal",
  "worksFor": {"@type": "Organization", "name": "Academia Detail"},
  "sameAs": ["https://www.instagram.com/danidetailoficial/"]
}
```

### 2.3 Etiqueta `lang` en el documento

Verificar que `index.html` tiene `<html lang="es">`. Si no lo tiene, anadirlo (critico para Lighthouse SEO).

### 2.4 Meta robots

Anadir `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">` en las paginas del blog para maximizar la visibilidad en SERPs.

### 2.5 Sitemap dinamico (edge function)

Crear una edge function `blog-urls` que devuelva la lista de URLs del blog en formato sitemap XML, leyendo los slugs de los datos estaticos. Alternativamente, mantener el sitemap estatico actual pero asegurarse de que todos los 26 articulos esten incluidos (verificar que no falta ninguno).

---

## 3. HTML Semantico

### 3.1 Estructura del blog index (Blog.tsx)

Envolver el contenido principal en `<main>` (ya lo hace MainLayout) y usar `<section>` para el grid de articulos. Anadir `aria-label` a las secciones principales.

### 3.2 Estructura del post (BlogPostPage.tsx)

- Ya usa `<article>` y `<header>` correctamente
- **BlogSidebar.tsx**: Ya usa `<aside>` -- correcto
- Anadir `<time datetime="...">` en las tarjetas de BlogCardOverlay (actualmente muestra la fecha pero sin la etiqueta semantica `<time>`)

### 3.3 BlogCardOverlay.tsx

Las tarjetas ya usan `<article>` -- correcto. Anadir `<time datetime>` a la fecha mostrada debajo de la tarjeta.

---

## 4. Rendimiento

### 4.1 Imagen LCP del hero del post

En `BlogPostPage.tsx`, la imagen del hero es el LCP candidate. Actualmente NO tiene `loading="lazy"` (correcto, no debe tenerlo) pero tampoco tiene `fetchpriority="high"`. Anadirlo para priorizar la descarga:
```html
<img fetchpriority="high" src={post.image} alt={post.imageAlt} ... />
```

### 4.2 Lazy loading explicito en imagenes secundarias

- `BlogBentoHero.tsx`: La imagen principal del featured post deberia tener `fetchpriority="high"` (es el LCP de la pagina de blog). La imagen secundaria ya tiene `loading="lazy"`.
- `BlogCardOverlay.tsx`: Ya tiene `loading="lazy"` -- correcto.
- `BlogCard.tsx`: Ya tiene `loading="lazy"` -- correcto.
- `BlogSidebar.tsx`: La imagen del curso no tiene `loading="lazy"`. Anadirlo.
- `BlogPostCTA.tsx`: La imagen del Ferrari no tiene `loading="lazy"`. Anadirlo.

### 4.3 Dimensiones explicitas en imagenes

Para prevenir CLS, las imagenes deben tener `width` y `height` explícitos o estar contenidas en contenedores con `aspect-ratio` fijo. Revisar:
- `BlogBentoHero.tsx`: Usa `min-h-[360px]` con `object-cover` -- aceptable pero no ideal. El contenedor ya tiene dimensiones.
- `BlogCardOverlay.tsx`: Usa `aspect-[3/4]` -- correcto, previene CLS.

---

## 5. Buenas Practicas

### 5.1 Links externos con `rel="noopener noreferrer"`

Revisar todos los links externos (`target="_blank"`) para asegurar que tienen `rel="noopener noreferrer"`. Los de `BlogShareButtons.tsx` ya lo tienen. Verificar `BlogSidebar.tsx` (WhatsApp link ya lo tiene).

### 5.2 Formularios con `autocomplete`

**BlogNewsletter.tsx**: Anadir `autocomplete="email"` al input de email y `autocomplete="name"` al input de nombre.

**BlogSearch.tsx**: Anadir `autocomplete="off"` al input de busqueda (es busqueda, no datos personales).

---

## Resumen de archivos a modificar

| Archivo | Cambios |
|---|---|
| `src/pages/Blog.tsx` | Anadir H1, breadcrumbs visibles, meta robots |
| `src/pages/BlogPost.tsx` | Breadcrumbs visibles, fetchpriority en hero img, schema Person, meta robots |
| `src/components/blog/BlogSearch.tsx` | aria-label, autocomplete, role |
| `src/components/blog/BlogShareButtons.tsx` | Aumentar area tactil a 44px |
| `src/components/blog/BlogPagination.tsx` | aria-label nav, aria-current, min-height 44px |
| `src/components/blog/BlogNewsletter.tsx` | aria-label inputs, autocomplete |
| `src/components/blog/BlogCategories.tsx` | Verificar area tactil 44px |
| `src/components/blog/BlogCardOverlay.tsx` | Anadir `<time datetime>` |
| `src/components/blog/BlogCard.tsx` | Anadir `<time datetime>` |
| `src/components/blog/BlogBentoHero.tsx` | fetchpriority="high" en imagen principal |
| `src/components/blog/BlogSidebar.tsx` | loading="lazy" en imagen |
| `src/components/blog/BlogPostCTA.tsx` | loading="lazy" en imagen |
| `src/components/blog/BlogArticleContent.tsx` | Sin cambios (jerarquia H2 correcta) |
| `index.html` | Verificar lang="es" |

---

## Resultado esperado

- **Rendimiento**: Mejora en LCP al priorizar imagen del hero; prevencion de CLS con dimensiones explicitas
- **Accesibilidad**: 100/100 con aria-labels, roles, contraste, areas tactiles y jerarquia de encabezados
- **Buenas Practicas**: 100/100 con autocomplete, rel attributes y formularios correctos
- **SEO**: 100/100 con H1, breadcrumbs, meta robots, canonical, schemas completos y sitemap actualizado


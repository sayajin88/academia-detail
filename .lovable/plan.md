

# Rutas Dinamicas para Terminos del Glosario

## Objetivo

Crear una pagina individual por cada termino del glosario en `/glosario-detailing/[slug]`, con contenido enriquecido (definicion, proceso, herramientas, FAQ), esquema JSON-LD `DefinedTerm` y un componente de cursos relacionados basado en palabras clave.

---

## Arquitectura

Cada termino del glosario generara un slug a partir de su nombre (ej. "Ceramic Coating" -> `ceramic-coating`). La pagina mostrara contenido estructurado derivado de los datos existentes del termino, enriquecido con secciones contextuales.

```text
/glosario-detailing                -> Listado (ya existe)
/glosario-detailing/:slug          -> Pagina individual del termino (NUEVO)
```

---

## Cambios por archivo

### 1. Ampliar el modelo de datos (`src/data/glossaryData.ts`)

- Anadir una funcion `generateSlug(term: string): string` que normalice el nombre a slug URL-safe (minusculas, sin acentos, guiones)
- Anadir una funcion `getTermBySlug(slug: string): GlossaryTerm | undefined` para buscar un termino por slug
- Anadir campos opcionales enriquecidos a la interfaz `GlossaryTerm`:
  - `relatedProcess?: string` -- Descripcion del proceso donde se aplica el termino
  - `tools?: string[]` -- Herramientas necesarias relacionadas
  - `faq?: { question: string; answer: string }[]` -- Preguntas frecuentes

Como los datos existentes no tienen estos campos, se generaran automaticamente en la pagina a partir de la categoria y la definicion del termino (logica contextual, no IA).

### 2. Crear pagina de termino (`src/pages/GlossaryTerm.tsx`)

Layout de la pagina individual:

- **Hero compacto**: Nombre del termino como `<h1>`, badge de categoria, breadcrumb
- **Seccion 1 - Definicion**: La definicion completa del termino en un bloque destacado con icono
- **Seccion 2 - Proceso Relacionado**: Texto contextual generado segun la categoria del termino (ej. si es "exterior" -> proceso de correccion de pintura; si es "protecciones" -> proceso de proteccion)
- **Seccion 3 - Herramientas Necesarias**: Lista de herramientas asociadas a la categoria (ej. "tecnicas" -> pulidora, pads, compound)
- **Seccion 4 - FAQ**: 3 preguntas frecuentes auto-generadas basadas en el termino y su categoria
- **Seccion 5 - Cursos Relacionados**: Componente que muestra cursos segun reglas de keywords:
  - Si el termino o definicion contiene "pintura", "barniz", "pulido", "correccion", "ceramico" -> Detailing Pro
  - Si contiene "vinilo", "wrapping", "wrap", "vinyl" -> Car Wrapping
  - Si contiene "PPF", "proteccion", "lamina", "film" -> Curso PPF
  - Si contiene "restaur" -> Curso Restauracion
  - Fallback: Detailing Pro (curso mas general)
- **Seccion 6 - Terminos Relacionados**: Grid de 4-6 terminos de la misma categoria con links a sus paginas individuales
- **Navegacion**: Link "Volver al Glosario" y breadcrumbs

### 3. Crear componente de cursos relacionados (`src/components/glossary/GlossaryRelatedCourses.tsx`)

- Recibe el termino como prop
- Aplica la logica de matching de keywords descrita arriba
- Muestra 1-2 cards de curso con imagen, titulo, duracion y CTA "Ver curso"
- Usa los datos de `src/data/formations.ts`

### 4. Crear componente de FAQ del termino (`src/components/glossary/GlossaryTermFAQ.tsx`)

- Genera 3 preguntas frecuentes basadas en el termino:
  1. "Que es [termino] en detailing?"
  2. "Como se aplica/usa [termino]?" (segun categoria)
  3. "Que herramientas se necesitan para [termino]?" (segun categoria)
- Las respuestas se derivan de la definicion existente
- Incluye schema `FAQPage` JSON-LD inyectado via el componente SEO

### 5. Actualizar las cards del glosario (`src/components/glossary/GlossaryTermCard.tsx`)

- Convertir cada card en un `<Link>` a `/glosario-detailing/[slug]`
- Mantener el diseno visual actual intacto

### 6. Registrar la ruta (`src/App.tsx`)

- Anadir la ruta lazy-loaded:
  ```
  const GlossaryTerm = lazy(() => import("./pages/GlossaryTerm"));
  ```
  ```
  <Route path="/glosario-detailing/:slug" element={<GlossaryTerm />} />
  ```

### 7. JSON-LD DefinedTerm (`src/pages/GlossaryTerm.tsx`)

Cada pagina inyectara un esquema `DefinedTerm` dinamico:

```json
{
  "@context": "https://schema.org",
  "@type": "DefinedTerm",
  "name": "Ceramic Coating",
  "description": "Proteccion de larga duracion basada en nanotecnologia...",
  "inDefinedTermSet": {
    "@type": "DefinedTermSet",
    "name": "Glosario de Detailing Profesional",
    "url": "https://academiadetail.com/glosario-detailing"
  },
  "url": "https://academiadetail.com/glosario-detailing/ceramic-coating"
}
```

Ademas se incluira el esquema `FAQPage` con las preguntas generadas.

### 8. SEO Config (`src/utils/seoConfig.ts`)

- Anadir entrada al `URL_NAME_MAP` en `SEO.tsx` para que los breadcrumbs funcionen correctamente con la nueva ruta

---

## Archivos a crear

| Archivo | Descripcion |
|---------|-------------|
| `src/pages/GlossaryTerm.tsx` | Pagina individual del termino con todas las secciones |
| `src/components/glossary/GlossaryRelatedCourses.tsx` | Componente de cursos relacionados por keywords |
| `src/components/glossary/GlossaryTermFAQ.tsx` | Componente FAQ con schema JSON-LD |

## Archivos a modificar

| Archivo | Cambios |
|---------|---------|
| `src/data/glossaryData.ts` | Funciones `generateSlug()` y `getTermBySlug()` |
| `src/components/glossary/GlossaryTermCard.tsx` | Envolver card en Link a la pagina del termino |
| `src/App.tsx` | Registrar nueva ruta `/glosario-detailing/:slug` |
| `src/components/SEO.tsx` | Anadir entrada en `URL_NAME_MAP` |

---

## Restricciones

- No se modifican estilos, colores ni layout existente
- Se reutilizan los componentes de UI existentes (cards, badges, accordion para FAQ)
- El contenido de "proceso relacionado", "herramientas" y "FAQ" se genera contextualmente a partir de la categoria y definicion, sin necesidad de IA ni datos externos
- La pagina usa `MainLayout` para mantener navbar y footer consistentes
- Si el slug no coincide con ningun termino, se redirige a `/glosario-detailing`


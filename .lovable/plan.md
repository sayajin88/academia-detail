
## Implementacion de 10 Nuevos Articulos + Sistema de Enlaces y Generacion de Imagenes IA

### Resumen

Se anadiran 10 nuevos articulos optimizados para SEO al blog existente, se ampliara la interfaz `BlogPost` con soporte para enlaces internos/externos con atributos `rel` configurables, se generaran imagenes con IA para los articulos, y se mejorara el renderizador de contenido (`BlogArticleContent`) para soportar enlaces y HTML enriquecido dentro de los parrafos.

### Cambios en la Arquitectura de Datos

La interfaz `BlogSection` actual solo soporta texto plano en el campo `content`. Para habilitar enlaces internos y externos, se ampliara el sistema de la siguiente manera:

**Nueva interfaz `BlogLink`:**
```text
BlogLink {
  text: string        // Texto del enlace visible
  href: string        // URL del enlace (interna o externa)
  rel?: 'follow' | 'nofollow'  // Atributo rel del enlace (default: follow)
  external?: boolean  // Si abre en nueva pestana (default: false)
}
```

**Ampliacion de `BlogSection`:**
```text
BlogSection {
  id: string
  title: string
  content: string
  links?: BlogLink[]  // Array de enlaces que se aplican dentro del content
}
```

**Mecanismo de insercion de enlaces:** El campo `content` contendra marcadores de texto delimitados con doble corchete, por ejemplo: `[[curso de detailing]]`. El renderizador (`BlogArticleContent`) buscara coincidencias con el array `links` por el campo `text` y los reemplazara por elementos `<a>` con los atributos correspondientes (`rel`, `target`).

### Estrategia de Enlazado

Cada articulo incluira:
- **Enlaces internos** a las paginas de cursos de academiadetail.com (rel="follow"):
  - `/curso-detailing-profesional`
  - `/curso-vinilado-vehiculos`
  - `/curso-ppf-proteccion-pintura`
  - `/curso-restauracion-vehiculos`
  - `/formacion-profesional-detailing`
  - `/curso-detailing-iniciacion`
  - `/contacto`

- **Enlaces externos de autoridad** hacia `www.detailpark.com` (rel="follow"):
  - `https://www.detailpark.es` como enlace principal

- **Enlaces nofollow** para fuentes externas genericas cuando se referencien marcas o recursos de terceros

### Listado de los 10 Articulos Nuevos

Los articulos se numeraran del 7 al 16 (continuando los 6 existentes):

| # | Slug | Titulo SEO (H1) | Categoria | Lectura |
|---|------|-----------------|-----------|---------|
| 7 | `como-ser-detailer-profesional-guia-formacion` | Como ser Detailer Profesional: Guia Completa de Formacion y Salida Laboral | detailing | 15 min |
| 8 | `que-es-ppf-paint-protection-film` | Que es el PPF (Paint Protection Film) y por que es el futuro de la proteccion automotriz | ppf | 12 min |
| 9 | `tecnicas-pulido-principiante-experto` | Tecnicas de Pulido en 3 Pasos: De Principiante a Detallador Experto | detailing | 10 min |
| 10 | `car-wrapping-vs-pintura-mejor-opcion` | Car Wrapping o Pintar el Coche: Cual es la mejor opcion en 2026 | wrapping | 9 min |
| 11 | `como-montar-centro-detailing-inversion` | Como montar un centro de Detailing: Inversion, Herramientas y Rentabilidad | negocios | 14 min |
| 12 | `limpieza-restauracion-cuero-alcantara` | Limpieza y Restauracion de Cuero y Alcantara: Secretos del Detailing de Interior | detailing | 11 min |
| 13 | `tratamiento-ceramico-ceramic-coating-guia` | Tratamiento Ceramico (Ceramic Coating): Guia de Aplicacion y Mantenimiento | detailing | 12 min |
| 14 | `errores-detailer-principiante-como-evitarlos` | Los 7 errores que todo Detailer principiante comete (y como evitarlos) | detailing | 8 min |
| 15 | `kit-esencial-detailing-herramientas` | Kit esencial de Detailing: Las mejores herramientas para empezar con exito | detailing | 10 min |
| 16 | `salida-laboral-car-wrapping-sueldo` | Salida laboral en Car Wrapping: Cuanto gana un instalador profesional | wrapping | 9 min |

Nota: Los slugs estan limpios (sin preposiciones innecesarias, sin caracteres especiales, sin tildes).

### Generacion de Imagenes con IA

Se generaran 10 imagenes unicas usando la API de IA de imagenes (modelo `google/gemini-2.5-flash-image`) a traves de una funcion backend temporal. Las imagenes seran realistas y mostraran:

1. **Articulo 7** (Guia Formacion): Taller limpio con alumno recibiendo certificado
2. **Articulo 8** (PPF): Primer plano de instalacion PPF en capo de coche de lujo
3. **Articulo 9** (Pulido): Pulidora en accion sobre carroceria negra con reflejo perfecto
4. **Articulo 10** (Wrapping vs Pintura): Coche a medio vinilar mostrando dos colores
5. **Articulo 11** (Montar Centro): Vista panoramica de un taller de detailing moderno
6. **Articulo 12** (Cuero/Alcantara): Primer plano de restauracion de asiento de cuero
7. **Articulo 13** (Ceramico): Aplicacion de coating ceramico con efecto hidrofobico
8. **Articulo 14** (Errores): Herramientas de detailing con x roja sobre las incorrectas
9. **Articulo 15** (Kit Herramientas): Organizacion profesional de kit de detailing
10. **Articulo 16** (Wrapping Salida Laboral): Instalador profesional de vinilo trabajando

Las imagenes se guardaran como archivos en `src/assets/blog/` con nombres descriptivos.

**Proceso:**
1. Crear funcion edge temporal `generate-blog-images`
2. Generar cada imagen con prompt detallado y guardarla como base64
3. Convertir a archivo y guardarlo en el proyecto
4. Eliminar la funcion temporal

**Alternativa de fallback:** Si las imagenes IA no son suficientemente buenas, se reutilizaran las imagenes existentes del portfolio y formacion que mejor encajen con cada articulo.

### Meta-descripciones SEO (max 155 caracteres)

Cada articulo tendra una meta-description optimizada con emojis y power words, siguiendo el patron del proyecto:

1. "Descubre como convertirte en detailer profesional. Formacion, salida laboral y certificacion. La guia mas completa de 2026."
2. "Que es el PPF y por que es el futuro de la proteccion automotriz. Tecnologia, costes y formacion profesional. Descubrelo ahora."
3. "Aprende tecnicas de pulido profesional en 3 pasos. De principiante a experto con las mejores pulidoras y productos del mercado."
4. "Car Wrapping vs Pintura: ventajas, costes y durabilidad. Descubre cual es la mejor opcion para cambiar el color de tu coche en 2026."
5. "Guia completa para montar un centro de detailing. Inversion, herramientas, rentabilidad y plan de negocio desde cero."
6. "Secretos de la limpieza y restauracion de cuero y alcantara. Tecnicas profesionales para interiores premium de vehiculos."
7. "Guia completa sobre tratamiento ceramico. Aplicacion, mantenimiento y por que necesitas formacion para hacerlo bien."
8. "Los 7 errores fatales de los detailers principiantes y como evitarlos. Aprende de los fallos mas comunes del sector."
9. "Kit esencial de detailing: pulidoras, productos y herramientas para empezar. Guia de compra profesional actualizada a 2026."
10. "Cuanto gana un instalador de car wrapping. Salida laboral, sueldos y como formarte profesionalmente."

### Contenido de los Articulos

Cada articulo tendra entre 4 y 7 secciones (H2) con contenido profesional, tecnico y actualizado a 2026. El articulo 7 (Guia Maestra) sera el mas extenso con 7 secciones y sera marcado como `featured: false` (el actual destacado de negocios se mantiene).

Todos los articulos incluiran:
- Menciones naturales a los cursos de Academia Detail con enlaces internos
- Al menos 1 enlace externo a `www.detailpark.es`
- Tags SEO relevantes
- `relatedSlugs` cruzados con los articulos existentes y nuevos
- `imageAlt` optimizado con keywords

### Seccion Tecnica

**Archivos nuevos (11 archivos):**

- `src/assets/blog/` (directorio) - 10 imagenes generadas por IA, una por articulo
- `supabase/functions/generate-blog-images/index.ts` - Funcion temporal para generar imagenes con IA (se eliminara despues de usarla)

**Archivos modificados (2 archivos):**

- `src/data/blogPosts.ts`:
  - Ampliar la interfaz `BlogSection` con campo opcional `links?: BlogLink[]`
  - Anadir nueva interfaz `BlogLink` con campos `text`, `href`, `rel`, `external`
  - Anadir los 10 nuevos articulos al array `blogPosts` con contenido completo
  - Importar las 10 nuevas imagenes desde `@/assets/blog/`
  - Actualizar `relatedSlugs` de los articulos existentes para cruzarlos con los nuevos

- `src/components/blog/BlogArticleContent.tsx`:
  - Modificar el renderizador de parrafos para detectar marcadores `[[texto]]` en el content
  - Reemplazar los marcadores por componentes `<a>` o `<Link>` (segun sea interno o externo) con los atributos `rel` y `target` configurados desde el array `links`
  - Los enlaces internos usaran `<Link>` de react-router-dom para navegacion SPA
  - Los enlaces externos usaran `<a>` con `target="_blank"` y `rel="noopener noreferrer nofollow"` o `rel="noopener noreferrer"` segun la configuracion
  - Los enlaces tendran estilo visual: `text-primary underline decoration-primary/30 hover:decoration-primary`

**Estructura de cada articulo nuevo (ejemplo Articulo 7):**

```text
{
  id: '7',
  slug: 'como-ser-detailer-profesional-guia-formacion',
  title: 'Como ser Detailer Profesional: Guia Completa de Formacion y Salida Laboral',
  excerpt: 'Descubre como convertirte en detailer...',
  category: 'detailing',
  author: defaultAuthor,
  publishedAt: '2026-02-05',
  readingTime: '15 min',
  image: blogGuiaFormacion, // importado desde @/assets/blog/
  imageAlt: 'Formacion profesional de detailing...',
  featured: false,
  tags: ['formacion', 'salida laboral', 'certificacion', 'carrera'],
  sections: [
    {
      id: 'que-hace-detailer-profesional',
      title: 'Que hace un Detailer Profesional',
      content: 'Un detailer profesional es mucho mas que... En [[Academia Detail]] formamos...',
      links: [
        { text: 'Academia Detail', href: '/curso-detailing-profesional', rel: 'follow' },
        { text: 'Detail Park', href: 'https://www.detailpark.es', rel: 'follow', external: true }
      ]
    },
    // ... mas secciones
  ],
  relatedSlugs: ['guia-completa-pulido-coches-profesional', 'cuanto-gana-detailer-profesional-espana']
}
```

**Orden de implementacion:**

1. Crear funcion edge `generate-blog-images` para generar las 10 imagenes con IA
2. Ejecutar la generacion y guardar las imagenes en `src/assets/blog/`
3. Eliminar la funcion temporal
4. Ampliar las interfaces `BlogSection` y anadir `BlogLink` en `blogPosts.ts`
5. Modificar `BlogArticleContent.tsx` para renderizar enlaces con marcadores `[[]]`
6. Anadir los 10 articulos al array `blogPosts` con contenido completo, enlaces y referencias cruzadas
7. Actualizar `relatedSlugs` de los 6 articulos existentes para enlazar a los nuevos
8. Verificar paginacion (16 articulos = 3 paginas con POSTS_PER_PAGE = 6, descontando el featured)

**Nota sobre Core Web Vitals:**
- Las imagenes se cargaran con `loading="lazy"` (ya implementado en BlogCard)
- Las imagenes del hero usaran dimensiones optimizadas
- No se anaden dependencias nuevas - todo se implementa con React, react-router-dom y las herramientas existentes

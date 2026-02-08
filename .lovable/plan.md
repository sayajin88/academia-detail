

# Plan: Integrar fotos reales en la web para mayor autenticidad

## Objetivo
Reemplazar imagenes generadas por IA en articulos del blog y secciones de formacion por las 9 fotos reales subidas, mejorando la autenticidad y confianza de la web.

## Imagenes subidas y su uso propuesto

| Foto | Contenido | Destino |
|------|-----------|---------|
| `Daniel_Curso_Detailing_1.jpg` | Daniel ensenando a alumna a pulir (1 a 1) | Blog: "Guia formacion detailer" (sustituye `blog-guia-formacion-detailer.jpg`) |
| `Daniel_Curso_Detailing_2.jpg` | Daniel guiando alumno con pulidora DeWalt | Blog: "Tecnicas de pulido" (sustituye `blog-tecnicas-pulido.jpg`) |
| `Daniel_Curso_Detailing_3.jpg` | Daniel explicando a grupo de alumnos | Blog: "Errores detailer principiante" (sustituye `blog-errores-detailer.jpg`) |
| `Almna_Curso_Detailing.jpg` | Alumna con pulidora, primer plano | Blog: "Kit esencial detailing herramientas" (sustituye `blog-kit-herramientas.jpg`) |
| `Alumnos_Curso_detailing_2.jpg` | Alumnos sentados en clase teorica | Blog: "Montar centro detailing" (sustituye `blog-montar-centro-detailing.jpg`) |
| `Alumnos_Instalacone_Curso_detailing.jpg` | Grupo grande en instalaciones Detail Park | Galeria de formacion detailing en `FormationGallery.tsx` (nueva imagen adicional) |
| `Alumnos_prácticas_Detailing.jpg` | Grupo alrededor de un descapotable | Galeria de formacion detailing en `FormationGallery.tsx` (nueva imagen adicional) |
| `Certificados_Grupal_Curso_Detailing.jpg` | Foto grupal con certificados | Seccion de testimonios `TestimonialsSection.tsx` -- nueva imagen para uno de los testimonios; y Blog: "Salida laboral car wrapping" (sustituye `blog-salida-laboral-wrapping.jpg`) |
| `Curso_detailing_4.jpg` | Detalle manos con pad de lana | Blog: "Restauracion cuero alcantara" (sustituye `blog-restauracion-cuero.jpg`) |

## Pasos de implementacion

### Paso 1: Copiar las 9 imagenes al proyecto
Copiar todas las fotos a `src/assets/` con nombres descriptivos:
- `daniel-curso-detailing-1.jpg`
- `daniel-curso-detailing-2.jpg`
- `daniel-curso-detailing-3.jpg`
- `alumna-curso-detailing.jpg`
- `alumnos-curso-detailing-2.jpg`
- `alumnos-instalaciones-curso-detailing.jpg`
- `alumnos-practicas-detailing.jpg`
- `certificados-grupal-curso-detailing.jpg`
- `curso-detailing-4.jpg`

### Paso 2: Actualizar imagenes del blog (6 articulos)
Modificar `src/data/blogPostsNew.ts`:
- Articulo 7 (`como-ser-detailer-profesional-guia-formacion`): cambiar imagen a `daniel-curso-detailing-1.jpg` y actualizar imageAlt
- Articulo 9 (`tecnicas-pulido-principiante-experto`): cambiar imagen a `daniel-curso-detailing-2.jpg`
- Articulo 14 (`errores-detailer-principiante-como-evitarlos`): cambiar imagen a `daniel-curso-detailing-3.jpg`
- Articulo 15 (`kit-esencial-detailing-herramientas`): cambiar imagen a `alumna-curso-detailing.jpg`
- Articulo 12 (`limpieza-restauracion-cuero-alcantara`): cambiar imagen a `curso-detailing-4.jpg`
- Articulo 16 (`salida-laboral-car-wrapping-sueldo`): cambiar imagen a `certificados-grupal-curso-detailing.jpg`

Modificar `src/data/blogPostsNew.ts` (imports y asignaciones):
- Reemplazar imports de las imagenes AI por los nuevos imports
- Actualizar los campos `imageAlt` con descripciones SEO-friendly de las fotos reales

Modificar `src/data/blogPosts.ts`:
- Articulo 11 (`como-montar-centro-detailing-inversion`): cambiar imagen a `alumnos-curso-detailing-2.jpg`

### Paso 3: Anadir fotos a la galeria de formacion detailing
Modificar `src/components/formation/FormationGallery.tsx`:
- Importar las 2 nuevas imagenes (`alumnos-instalaciones-curso-detailing.jpg` y `alumnos-practicas-detailing.jpg`)
- Anadir 2 nuevas entradas al array `detailingGalleryItems` con titulos y descripciones apropiadas

### Paso 4: Actualizar alt-texts SEO
Todos los nuevos `imageAlt` seguiran el patron existente con keywords estrategicas:
- Incluir "curso detailing", "formacion profesional", "Academia Detail"
- Ser descriptivos del contenido real de la foto
- Mantener el formato consistente con el resto del sitio

## Detalle tecnico

### Archivos a modificar
1. `src/data/blogPostsNew.ts` -- 6 cambios de imagen + imports
2. `src/data/blogPosts.ts` -- 1 cambio de imagen (articulo montar-centro, usa import de blogPostsNew reexportado, se cambiara en blogPostsNew)
3. `src/components/formation/FormationGallery.tsx` -- 2 nuevas imagenes en galeria detailing

### Nota sobre el archivo .heic
El archivo `Certificados_Grupal_Curso_Detailing_2.heic` no se puede usar directamente en web (formato de Apple). Solo se usara la version `.jpg` del mismo grupo de fotos.

### Resultado esperado
- 7 articulos del blog mostraran fotos reales de la academia en lugar de imagenes generadas
- La galeria de formacion detailing tendra 9 fotos en lugar de 7
- Mayor autenticidad y confianza en toda la web
- SEO mejorado con alt-texts que describen contenido real


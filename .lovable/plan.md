
# Plan: Sustituir imagenes stock/IA por fotografias autenticas en 4 articulos del blog

## Articulos a cambiar (visibles en la captura)

Los 4 articulos que aparecen en la zona "Ultimos Articulos" del grid del blog usan imagenes de stock o generadas por IA. Se sustituiran por fotografias reales de los cursos y actividades de Academia Detail.

### Cambios concretos

| Articulo | Imagen actual (stock) | Nueva imagen (autentica) | Razon |
|---|---|---|---|
| Guia Completa de Pulido de Coches | `before-after-detailing.jpg` | `evento-practica-pulidora-real.jpg` | Foto real de alumno practicando con pulidora, directamente relacionada con tecnicas de pulido |
| PPF vs Ceramico | `curso-ppf-new.jpg` | `curso-ppf-formacion.jpg` | Foto real de la formacion de PPF en las instalaciones de Academia Detail |
| Car Wrapping: Todo lo que Necesitas Saber | `curso-wrapping-new.jpg` | `curso-wrapping-formacion.jpg` | Foto real del curso de wrapping con alumnos en accion |
| 5 Errores que Cometen los Detailers Principiantes | `detailing-tools.jpg` | `alumnos-practicas-detailing.jpg` | Foto real de alumnos practicando, refuerza el mensaje de aprender correctamente para evitar errores |

### Detalle tecnico

**Archivo a modificar:** `src/data/blogPosts.ts`

1. **Imports** (lineas 1-6): Sustituir los 4 imports de imagenes stock por los nuevos assets autenticos:
   - `beforeAfterDetailing` pasara de `before-after-detailing.jpg` a `evento-practica-pulidora-real.jpg`
   - `cursoPpf` pasara de `curso-ppf-new.jpg` a `curso-ppf-formacion.jpg`
   - `cursoWrapping` pasara de `curso-wrapping-new.jpg` a `curso-wrapping-formacion.jpg`
   - `detailingTools` pasara de `detailing-tools.jpg` a `alumnos-practicas-detailing.jpg`

2. **Alt texts SEO** (lineas 186-188, 222-224, 260-262, 296-298): Actualizar los textos alternativos de cada articulo para que describan las nuevas fotografias reales con keywords SEO:
   - Pulido: "Alumno practicando tecnicas de pulido profesional con pulidora en curso de detailing de Academia Detail"
   - PPF: "Formacion profesional de instalacion de PPF paint protection film en Academia Detail"
   - Wrapping: "Alumnos del curso de car wrapping aprendiendo tecnicas de vinilado profesional en Academia Detail"
   - Errores: "Alumnos en practicas de detailing profesional aprendiendo a evitar errores comunes en Academia Detail"

### Archivos que NO se tocan
- `src/data/blogPostsNew.ts` - sin cambios, ya usa fotos autenticas
- `src/data/blogPostsBusiness.ts` - sin cambios, ya usa fotos autenticas
- Ningun componente de blog cambia, solo los datos

### Resultado esperado
- Las 4 tarjetas del grid usaran fotografias reales de alumnos y cursos
- Mayor coherencia visual con la estrategia de autenticidad del sitio
- Alt texts optimizados para SEO con keywords relevantes

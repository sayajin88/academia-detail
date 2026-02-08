

# Seccion de Videos de YouTube en "Quienes Somos"

## Objetivo

Crear una seccion visual moderna dentro de la pagina "Quienes Somos" que muestre 12 videos del canal de YouTube de Detail Park para aumentar la autoridad de la academia. La seccion incluira un enlace al canal completo.

---

## Diseno Visual: "Galeria de Videos"

La seccion tendra un diseno tipo **galeria multimedia dinamica** con las siguientes caracteristicas:

### Layout principal
- **Titulo con badge**: "Nuestro Canal de YouTube" con subtitulo orientado a autoridad ("Mas de 12 videos mostrando nuestro trabajo real en el taller")
- **Video destacado grande**: El primer video ocupa un area prominente (16:9, ancho completo en movil, 60% en desktop)
- **Grid de miniaturas**: Los 11 videos restantes en un grid compacto de 2 columnas en movil, 3 en tablet, 4 en desktop
- Cada miniatura usa el componente `YouTubeEmbed` existente con facade pattern (carga perezosa)
- **CTA al canal**: Boton "Ver mas videos en YouTube" con icono de YouTube, enlazando al canal

### Interaccion
- Al hacer clic en cualquier miniatura, se reproduce el video in-place usando el YouTubeEmbed existente
- Las miniaturas tendran hover con escala y overlay con icono de play (ya incluido en YouTubeEmbed)

### Movil
- El video destacado ocupa ancho completo
- Las miniaturas se muestran en grid de 2 columnas para mantener buena visibilidad
- El boton del canal es full-width y prominente

---

## Ubicacion en la pagina

Se colocara **despues de la seccion de galeria de trabajos (AboutGallerySection) y antes de JornadaZeroSection**, ya que los videos refuerzan la autoridad mostrada en la galeria de trabajos y crean una transicion natural hacia el CTA de formacion.

```text
AboutHero
AboutHistory
AboutPhilosophy
AboutTeam
AboutStats
AboutGallerySection
>>> NUEVA: AboutVideoChannel <<<
JornadaZeroSection
CTA Final
```

---

## SEO y Autoridad

### Schema VideoObject
Se generara un array de schemas `VideoObject` para los 12 videos, con:
- `name`: Titulo descriptivo con keywords de detailing
- `thumbnailUrl`: Thumbnail de YouTube
- `contentUrl`: URL del video
- `uploadDate`: Fecha aproximada
- `publisher`: Academia Detail / Detail Park

### Schema ItemList (Carrusel de videos)
Un schema `ItemList` que agrupe los videos para que Google pueda mostrarlos como carrusel en resultados de busqueda.

### Atributos SEO en el componente
- Heading H2 con keywords: "Videos de Detailing Profesional en Nuestro Taller"
- Textos ALT descriptivos en cada miniatura
- Enlaces `follow` al canal de YouTube para reforzar el sameAs del Organization schema existente

### Actualizacion del SEO config
Se anadiran los schemas VideoObject e ItemList al array de schemas de la pagina aboutUs en `seoConfig.ts`.

---

## Videos con titulos descriptivos para SEO

| # | Video ID | Titulo SEO propuesto |
|---|----------|---------------------|
| 1 | lgHS6CO2G2s | Detailing profesional en taller real |
| 2 | TtPs7WPVLzE | Proceso de pulido y correccion de pintura |
| 3 | ByRhg2kYD-A | Tratamiento ceramico en vehiculo de alta gama |
| 4 | G3AU2913_vw | Lavado profesional y descontaminacion |
| 5 | thUgGa5ULkI | Trabajo real en Detail Park Alicante |
| 6 | kp_yZNZnUwo | Proteccion de pintura y acabado perfecto |
| 7 | zr_FFDz06Fc | Restauracion y detailing de vehiculos |
| 8 | iMatPTngV0g | Tecnicas avanzadas de detailing |
| 9 | U3K4VsFlY8E | Interior detailing profesional |
| 10 | L14vIkJWgKw | Resultados reales de nuestro taller |
| 11 | eFfzwvhGNcU | Preparacion de vehiculos premium |
| 12 | sqK6qkTWynk | Detail Park - Trabajo diario en el taller |

---

## Archivos afectados

| Archivo | Accion | Detalle |
|---------|--------|---------|
| `src/components/about/AboutVideoChannel.tsx` | Nuevo | Componente de la seccion de videos con grid + video destacado + CTA canal |
| `src/pages/AboutUs.tsx` | Modificado | Importar y colocar AboutVideoChannel entre AboutGallerySection y JornadaZeroSection |
| `src/utils/seoConfig.ts` | Modificado | Anadir schemas VideoObject e ItemList al bloque aboutUs |

---

## Detalles tecnicos

### Componente `AboutVideoChannel.tsx`
- Usa `YouTubeEmbed` existente de `@/components/shared/YouTubeEmbed`
- Usa `AnimatedSection` y `SectionHeading` existentes
- El primer video se muestra en un contenedor mas grande con borde y sombra
- Grid responsive: `grid-cols-2 md:grid-cols-3 lg:grid-cols-4`
- Boton de canal usa icono de YouTube (SVG inline o icono de lucide `ExternalLink`)
- Fondo alternado con el patron visual existente (bg-muted/20 o bg-gradient)
- Las animaciones usan stagger para que los videos aparezcan secuencialmente

### Patron de rendimiento
- Todos los videos usan facade pattern (thumbnail hasta click) via YouTubeEmbed
- Las imagenes de thumbnail se cargan con `loading="lazy"`
- No se carga ningun iframe de YouTube hasta que el usuario hace clic


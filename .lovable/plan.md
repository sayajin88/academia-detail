

## Seccion "Nuestro Equipo" en la pagina Quienes Somos

### Resumen
Se creara una nueva seccion de equipo en la pagina `/quienes-somos` que presente a Sergio Felipe y Gerardo Espinosa como miembros del equipo e instructores de Detail Park. La seccion se ubicara entre la filosofia (`AboutPhilosophy`) y las estadisticas (`AboutStats`), ya que encaja naturalmente despues de explicar "lo que nos hace diferentes" y antes de los numeros.

### Estructura visual

La seccion mostrara dos tarjetas de perfil en un grid de 2 columnas (desktop) o apiladas (movil). Cada tarjeta incluira:
- Foto del miembro con aspect ratio vertical (4:5) y bordes redondeados
- Nombre y rol/titulo
- Descripcion de su experiencia y especialidad
- 2-3 tags/badges con sus areas de expertis
- Sutil borde con hover en burdeos, siguiendo el patron de las tarjetas de la seccion de filosofia

### Contenido de cada perfil

**Sergio Felipe** - Instructor & Gestor de Centro
- Experto en detailing con amplia experiencia practica
- Especialista en metodologia y gestion de centros de detailing
- Expertis en atencion al cliente y operaciones de negocio
- Tags: Detailing, Gestion de Centro, Atencion al Cliente

**Gerardo Espinosa** - Especialista en Wrapping & PPF
- Referente en rotulacion, wrapping y PPF (Paint Protection Film)
- Reconocido como uno de los profesionales con mas expertis del sector
- Apasionado del detalle y la perfeccion en cada instalacion
- Tags: Wrapping, PPF, Rotulacion

### Seccion tecnica

**Archivos nuevos:**
- `src/assets/sergio-felipe.jpg` - foto de Sergio (copiada desde upload)
- `src/assets/gerardo-espinosa.jpg` - foto de Gerardo (copiada desde upload)
- `src/components/about/AboutTeam.tsx` - nuevo componente de la seccion de equipo

**Archivos modificados:**
- `src/pages/AboutUs.tsx` - importar y colocar `<AboutTeam />` entre `<AboutPhilosophy />` y `<AboutStats />`

**Patron de diseno del componente `AboutTeam.tsx`:**
- Usara `SectionHeading` con badge "Nuestro Equipo", titulo "Los Profesionales que Te Forman" y subtitulo descriptivo
- Grid `md:grid-cols-2` con gap de 8
- Cada tarjeta: `bg-card border border-border/50 rounded-2xl` con hover `hover:border-primary/30`
- Imagenes con `aspect-[4/5] rounded-xl object-cover`
- Tags/badges con `bg-primary/10 text-primary rounded-full px-3 py-1 text-xs`
- Animaciones con `AnimatedSection` (delay escalonado)
- Alt texts optimizados para SEO: "Sergio Felipe - Instructor de detailing y gestion de centros en Academia Detail" y "Gerardo Espinosa - Especialista en wrapping y PPF en Academia Detail"

**Posicion en la pagina (AboutUs.tsx):**

```text
AboutHero
Detail Park Logo
AboutHistory
AboutPhilosophy
--> AboutTeam (NUEVA SECCION) <--
AboutStats
AboutGallerySection
JornadaZeroSection
CTA Section
```


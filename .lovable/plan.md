

## Plan: Incrustar Reels/Posts de Instagram @danidetailoficial en la Home

### COMO FUNCIONA

Instagram ofrece un sistema de embed nativo gratuito. Cada post o reel publico tiene un codigo HTML (un `blockquote`) que, combinado con el script `embed.js` de Instagram, se renderiza como un reproductor interactivo completo dentro de tu web.

No se necesita API key, ni servicio externo, ni cuenta de desarrollador.

```text
FLUJO:
1. Se carga el componente con las URLs de los posts/reels
2. Se insertan los blockquotes de Instagram
3. Se carga el script embed.js de Instagram
4. Instagram procesa los blockquotes y los convierte en embeds interactivos
```

---

### UBICACION EN LA HOME

La seccion se colocara entre **GalleryPreview** (galeria de fotos de formacion) y **TestimonialsSection** (testimonios de alumnos). Es el punto ideal porque:
- Despues de ver las fotos del taller, ven contenido real y dinamico en video
- Antes de los testimonios, refuerza la prueba social con contenido de redes

```text
ORDEN DE SECCIONES EN HOME:
  HomeHero
  FormationsGrid
  CompetitiveComparison
  BusinessSkillsSection
  CarreraNegocioSection
  MontamosTuCentro
  InstructorSection
  GalleryPreview
  >>> NUEVA: InstagramFeed <<<
  TestimonialsSection
  SuccessStoriesLogos
  HomeFAQ
  HomeCTA
```

---

### PASO 1: Crear componente `InstagramFeed.tsx`

Nuevo archivo: `src/components/home/InstagramFeed.tsx`

El componente:
- Contiene un array de URLs de posts/reels de @danidetailoficial (configurables)
- Usa `useEffect` para cargar el script `https://www.instagram.com/embed.js` una sola vez
- Llama a `window.instgrm.Embeds.process()` para renderizar los embeds
- Muestra los embeds en un grid responsive (1 columna en movil, 3 en desktop)
- Usa carga diferida: el script solo se inyecta cuando la seccion entra en viewport (IntersectionObserver), para no afectar al rendimiento de carga inicial
- Incluye un boton de "Seguir en Instagram" con enlace al perfil

**Estructura visual:**

```text
+--------------------------------------------------+
|  [badge] Siguenos en Instagram                    |
|  Contenido Real de Nuestro Dia a Dia              |
|  Mira lo que hacemos en @danidetailoficial        |
|                                                    |
|  +------------+  +------------+  +------------+   |
|  | Reel/Post  |  | Reel/Post  |  | Reel/Post  |   |
|  | embed 1    |  | embed 2    |  | embed 3    |   |
|  | (instagram |  | (instagram |  | (instagram |   |
|  |  player)   |  |  player)   |  |  player)   |   |
|  +------------+  +------------+  +------------+   |
|                                                    |
|        [Seguir @danidetailoficial]                 |
+--------------------------------------------------+
```

**Detalles tecnicos del componente:**

- Se usara un `ref` con `IntersectionObserver` para detectar cuando la seccion es visible
- El script de Instagram se cargara solo una vez (se verifica si ya existe en el DOM)
- Se llamara a `window.instgrm.Embeds.process()` despues de cargar el script y cada vez que cambien los embeds
- Los reels/posts se mostraran en iframes gestionados por Instagram (aspect ratio vertical ~9:16 para reels)
- Fallback: si el embed no carga, se muestra un enlace directo al post

**URLs iniciales** (se podran cambiar facilmente editando el array):
- Se necesitaran 3 URLs de posts o reels de @danidetailoficial
- Formato: `https://www.instagram.com/reel/CODIGO/` o `https://www.instagram.com/p/CODIGO/`

---

### PASO 2: Anadir seccion a `Home.tsx`

- Importar `InstagramFeed` con `lazy()` como el resto de secciones below-the-fold
- Colocarlo entre `GalleryPreview` y `TestimonialsSection`
- Envuelto en `Suspense` con el mismo `SectionSkeleton` que las demas secciones

---

### PASO 3: Rendimiento y privacidad

Siguiendo el patron de facade que ya usamos para YouTube:
- El script de Instagram NO se carga al inicio de la pagina
- Solo se carga cuando el usuario hace scroll y la seccion entra en el viewport
- Esto evita cookies y scripts innecesarios en la carga inicial
- Skeleton/placeholder visible mientras carga

---

### ARCHIVOS A CREAR / MODIFICAR

| Archivo | Accion |
|---------|--------|
| `src/components/home/InstagramFeed.tsx` | CREAR - Nuevo componente con embeds de Instagram |
| `src/pages/Home.tsx` | MODIFICAR - Anadir lazy import e insertar entre GalleryPreview y TestimonialsSection |

---

### NOTA IMPORTANTE

Para completar la implementacion necesitare que me proporciones 3 URLs de posts o reels especificos de @danidetailoficial que quieras mostrar. Si no los tienes a mano, puedo poner URLs de ejemplo y luego los cambias facilmente.


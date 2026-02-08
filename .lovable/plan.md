

## Mejoras del Blog: Paginacion, Verificacion y Diseno Dinamico

### Resumen

Se implementaran cuatro mejoras principales en el blog: (1) un sistema de paginacion completo con botones de pagina anterior/siguiente y numeros de pagina, (2) correccion de problemas visuales detectados en la verificacion del blog, (3) mejoras de diseno visual para hacer el blog mas dinamico y premium, y (4) animaciones de entrada en los componentes del blog.

### Problemas detectados en la verificacion

Tras revisar el blog tanto en desktop (1920x1080) como en movil (390x844), se han identificado las siguientes areas de mejora:

1. **Blog Index**: El grid funciona correctamente pero la newsletter se inserta dentro del mismo `div` que la tarjeta, causando un layout irregular. Necesita un slot propio a ancho completo.
2. **Pagina de articulo**: El hero del articulo tiene la imagen cortada y poco espacio visual. El TOC funciona correctamente con IntersectionObserver.
3. **Falta de paginacion**: Sin paginacion, todos los posts se muestran a la vez.
4. **Diseno estatico**: Falta dinamismo visual - no hay animaciones de entrada, los cards son planos y el hero del blog index podria ser mas impactante.

### Cambios planificados

#### 1. Sistema de paginacion

Se anadira paginacion al blog index con:
- 6 posts por pagina (configurable)
- Botones "Anterior" y "Siguiente" en espanol
- Numeros de pagina con ellipsis para rangos largos
- La pagina activa resaltada con el color primario (burdeos)
- Scroll al inicio del grid al cambiar de pagina
- Se usa el componente `pagination.tsx` existente como base pero con estilos personalizados
- La paginacion se oculta cuando hay busqueda activa (muestra todos los resultados filtrados)

#### 2. Mejoras visuales del Blog Grid

- **BlogCard mejorado**: Anadir efecto de hover mas sofisticado con linea de acento burdeos en el borde inferior, sombra con glow sutil, y transicion de elevacion. Anadir etiqueta de tiempo de lectura sobre la imagen.
- **BlogHero mejorado**: Anadir un gradiente animado sutil en el fondo, badges con iconos, y efecto parallax ligero en la imagen de fondo.
- **BlogGrid mejorado**: La newsletter se posiciona como un elemento a ancho completo entre filas del grid en lugar de dentro de una celda individual.

#### 3. Mejoras en la pagina de articulo individual

- **Hero del articulo**: Aumentar la altura del hero, anadir un efecto de parallax sutil y mejorar la transicion del gradiente.
- **Barra de progreso de lectura**: Anadir una barra de progreso en la parte superior que muestre cuanto del articulo se ha leido (sticky, delgada, color primario).
- **BlogArticleContent**: Anadir separadores visuales entre secciones (linea decorativa sutil).
- **Tipografia**: Mejorar los drop caps en el primer parrafo de cada seccion.

#### 4. Animaciones de entrada

- Usar el componente `AnimatedSection` existente para anadir animaciones fade-up a:
  - Las tarjetas del grid (con stagger entre ellas)
  - El hero del blog
  - Los filtros de categoria
  - Las secciones del articulo individual
  - Los articulos relacionados

### Seccion tecnica

**Archivos modificados (6 archivos):**

- `src/pages/Blog.tsx`:
  - Anadir estado de pagina actual (`currentPage`)
  - Calcular posts paginados a partir de los filtrados
  - Calcular total de paginas
  - Resetear a pagina 1 al cambiar filtro o busqueda
  - Pasar props de paginacion al nuevo componente `BlogPagination`
  - Scroll al grid al cambiar de pagina
  - Envolver secciones con `AnimatedSection`

- `src/components/blog/BlogGrid.tsx`:
  - Reestructurar el grid para que la newsletter se inserte como fila a ancho completo entre las filas 1 y 2 del grid (despues de los primeros 3 posts)
  - Envolver cada card con `AnimatedSection` con stagger para efecto cascada
  - Pasar props de paginacion

- `src/components/blog/BlogCard.tsx`:
  - Anadir linea de acento inferior con color de categoria al hacer hover
  - Mejorar sombras de hover con glow del color primario
  - Anadir badge de tiempo de lectura flotante sobre la imagen
  - Anadir efecto de transform elevacion en hover (`hover:-translate-y-1`)

- `src/components/blog/BlogHero.tsx`:
  - Anadir efecto de gradiente animado sutil como decoracion
  - Mejorar el contraste del overlay
  - Anadir decoracion con linea vertical de acento junto al titulo

- `src/pages/BlogPost.tsx`:
  - Anadir barra de progreso de lectura (scroll progress bar) en la parte superior, sticky bajo el navbar
  - Mejorar el hero del articulo con mas altura y mejor transicion
  - Envolver secciones con animaciones

- `src/components/blog/BlogArticleContent.tsx`:
  - Anadir separador decorativo entre secciones (linea con gradiente burdeos)
  - Mejorar la primera letra del primer parrafo de cada seccion (drop cap visual sutil)
  - Envolver cada seccion con `AnimatedSection`

**Archivos nuevos (1 archivo):**

- `src/components/blog/BlogPagination.tsx`:
  - Componente de paginacion personalizado que usa los primitivos de `pagination.tsx`
  - Props: `currentPage`, `totalPages`, `onPageChange`
  - Muestra: boton Anterior, numeros de pagina (con ellipsis si hay mas de 5 paginas), boton Siguiente
  - Estilos: pagina activa en burdeos, botones con bordes y hover sutil
  - Textos en espanol ("Anterior", "Siguiente")
  - Oculto automaticamente si hay 1 sola pagina

**Detalles de implementacion:**

- La paginacion se controla con un estado `currentPage` en `Blog.tsx`. Los posts filtrados se cortan con `slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE)`.
- Al cambiar de categoria, buscar, o cambiar pagina, se resetea la pagina a 1 (excepto en cambio de pagina).
- La barra de progreso de lectura usa un `useEffect` con listener de scroll que calcula el porcentaje del articulo visible y actualiza el ancho de una barra `fixed` en la parte superior.
- Las animaciones usan el `AnimatedSection` existente con variante `fade-up` y stagger de 100ms entre cards para efecto cascada suave.
- Los drop caps se implementan con CSS `first-letter` en el primer parrafo de cada seccion, con tamanho de fuente mayor y color primario.


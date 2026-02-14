

## Mejora visual y estructural del editor de articulos del blog

### Problema actual

El editor actual es funcional pero visualmente plano: campos sueltos sin agrupacion logica, sin iconografia contextual, sin indicadores de progreso, y el formulario carece de jerarquia visual clara. La pestana de contenido es un formulario generico sin personalidad.

---

### Mejoras propuestas

**1. Reestructuracion del layout principal (BlogPostEditor.tsx)**

- Cabecera mejorada con estado del articulo visible (badge de borrador/publicado), boton de guardado rapido siempre visible, y contador de palabras totales
- Sidebar lateral derecha (layout 2/3 + 1/3) en la pestana de contenido con un resumen en tiempo real: palabra count, numero de secciones, puntuaciones SEO/legibilidad, estado, y preview de la imagen
- Pestanas con iconos junto al texto (FileText, Search, BookOpen, Image, ShieldCheck, Send)
- Barra de progreso de completitud del articulo (titulo, excerpt, imagen, secciones, tags) en la parte superior

**2. Pestana Contenido: agrupacion en cards tematicas**

- Card "Informacion basica": titulo + slug + excerpt en una card con borde e icono de cabecera
- Card "Metadatos": categoria, fecha, tiempo lectura, autor agrupados con icono Settings
- Card "Etiquetas": tags con estilo mejorado, badges con colores por categoria, input con autocompletado de tags existentes
- Card "Secciones": cada seccion en un acordeon colapsable (en lugar de cards fijas) con indicador de palabras, barra de progreso por seccion, y preview del contenido resumido cuando esta colapsado
- Seccion vacia: estado empty state con ilustracion y CTA para generar outline o anadir manualmente

**3. Mejora del BlogSectionEditor**

- Diseno de acordeon colapsable: cabecera muestra titulo + word count + botones de accion, contenido se expande
- Barra de herramientas de la seccion con iconos: mover arriba/abajo, duplicar seccion, eliminar
- Indicador visual de longitud del contenido (barra de progreso)
- Vista previa del contenido renderizado (toggle entre edicion y preview)
- Area de textarea con altura auto-ajustable
- Numeracion visual mas prominente (circulo con numero)

**4. Mejora de BlogMediaPanel**

- Zona de drag & drop para subir imagenes con borde punteado e icono
- Preview de la imagen principal mas grande con overlay para cambiar
- Galeria de imagenes recientes del bucket para reutilizar

**5. Mejora de BlogPublishPanel**

- Checklist visual de preparacion para publicar (tiene titulo, tiene imagen, tiene excerpt, tiene secciones, etc.) con iconos verdes/rojos
- Scores en circulos de progreso animados
- Seccion de articulos relacionados con busqueda inline

**6. Pestanas SEO, Legibilidad, Verificacion**

- Estado inicial con empty state descriptivo antes de ejecutar el analisis
- Resultados con cards con bordes coloreados segun severidad
- Animacion suave al cargar resultados

---

### Detalle tecnico de archivos

**Archivos modificados:**

- `src/components/admin/blog/BlogPostEditor.tsx` - Layout con sidebar, barra de progreso, iconos en pestanas, guardado rapido, word count
- `src/components/admin/blog/BlogSectionEditor.tsx` - Diseno de acordeon colapsable, word count, numeracion visual, preview toggle, altura auto-ajustable
- `src/components/admin/blog/BlogMediaPanel.tsx` - Zona drag & drop, preview mejorado
- `src/components/admin/blog/BlogPublishPanel.tsx` - Checklist visual, scores circulares
- `src/components/admin/blog/BlogSEOPanel.tsx` - Empty state, mejor estructura visual
- `src/components/admin/blog/BlogReadabilityPanel.tsx` - Empty state, cards coloreadas
- `src/components/admin/blog/BlogFactCheckPanel.tsx` - Empty state, indicadores mejorados

**No se requieren cambios en la base de datos ni nuevas edge functions.**

---

### Resultado esperado

Un editor de articulos con aspecto profesional tipo CMS moderno (similar a WordPress Gutenberg o Notion), con jerarquia visual clara, agrupacion logica de campos, feedback visual constante sobre el estado del articulo, y una experiencia de escritura mas fluida y agradable.


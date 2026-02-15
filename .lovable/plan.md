

## Rediseno completo de la pagina /blog

### Problemas actuales identificados

1. **Cards con aspecto 3:4 (portrait)**: Ocupan demasiado espacio vertical, especialmente en movil donde se apilan y generan un scroll excesivo
2. **Filtros desalineados**: Las categorias y el buscador estan en la zona derecha, desconectados del heading, y en movil se apilan de forma desordenada (categorias envuelven en 2 filas)
3. **Cards sin excerpt visible**: Solo muestran titulo sobre la imagen, perdiendo contexto y reduciendo el interes del usuario para hacer clic
4. **CTA Banner demasiado grande**: Rompe el ritmo de lectura entre las filas de articulos
5. **Paginacion generica**: Funcional pero sin personalidad
6. **Mobile**: La bento hero ocupa toda la pantalla, los filtros requieren mucho scroll para alcanzarlos

---

### Propuesta de rediseno

**1. Nuevo diseno de card (BlogCardOverlay -> BlogCardRedesigned)**

Cambiar de cards portrait (3:4) a un diseno horizontal/compacto:
- En desktop: grid de 3 columnas (en lugar de 4) con cards que tienen imagen en la parte superior (aspect 16:9) y debajo el contenido (categoria badge, titulo, excerpt truncado a 2 lineas, metadata con autor + fecha + tiempo de lectura)
- En mobile: cards a 1 columna, con imagen 16:9 seguida del contenido
- Efecto hover: sutil elevacion con sombra y borde primario, la imagen hace un ligero zoom
- La metadata incluye avatar pequeno del autor (circulo 24px) junto al nombre

**2. Filtros rediseñados: barra sticky horizontal**

- Reemplazar la disposicion actual por una barra compacta que contenga: categorias como pestanas horizontales + buscador integrado, todo en una sola linea
- En desktop: barra con fondo card/glassmorphism, bordes redondeados, categorias como tabs underline (no pills), buscador a la derecha con icono
- En mobile: categorias en un scroll horizontal (overflow-x-auto) sin wrap, buscador como icono que se expande al tocar
- La barra sera sticky (sticky top con offset del navbar) para que los filtros esten siempre accesibles al hacer scroll

**3. Grid layout mejorado**

- Desktop: 3 columnas (en lugar de 4) para dar mas respiracion a cada card
- Tablet (sm): 2 columnas
- Mobile: 1 columna
- Espaciado entre cards: gap-6 en desktop, gap-4 en mobile
- Eliminar el CTA banner entre filas; moverlo al final de la pagina, antes de la paginacion, con un diseno mas compacto

**4. Bento Hero simplificado**

- Mantener la estructura de hero pero reducir la altura minima en mobile (de 360px a 280px)
- Eliminar la card de "Curso de Detailing" del bento hero (distrae del contenido del blog) y mostrar solo el articulo destacado + el secundario en una disposicion 2/3 + 1/3
- En mobile: solo el articulo destacado, sin la card secundaria

**5. Seccion de heading + conteo**

- Mostrar un contador de articulos junto al titulo "Ultimos Articulos": "25 articulos"
- Indicador de filtro activo con opcion de "limpiar filtros"

**6. Paginacion mejorada**

- Mantener la funcionalidad actual pero con estilo mas compacto
- Indicador de "Pagina X de Y" centrado

---

### Detalle tecnico

**Archivos a crear:**
- Ninguno nuevo (se reutilizan los existentes)

**Archivos a modificar:**

| Archivo | Cambios |
|---------|---------|
| `src/components/blog/BlogCardOverlay.tsx` | Rediseno completo: imagen 16:9 arriba, contenido debajo con excerpt, avatar autor, metadata. Eliminar variante `tall` |
| `src/components/blog/BlogGrid.tsx` | Grid de 3 columnas, CTA banner al final, no entre filas |
| `src/components/blog/BlogCategories.tsx` | Tabs con underline en lugar de pills, scroll horizontal en mobile |
| `src/components/blog/BlogSearch.tsx` | Icono colapsable en mobile, integrado en la barra de filtros |
| `src/components/blog/BlogBentoHero.tsx` | Eliminar card de curso, reducir alturas en mobile, layout 2/3 + 1/3 solo con articulos |
| `src/components/blog/BlogCTABanner.tsx` | Version mas compacta, horizontal, menos padding |
| `src/components/blog/BlogPagination.tsx` | Anadir indicador "Pagina X de Y" |
| `src/pages/Blog.tsx` | Barra de filtros sticky, contador de articulos, boton limpiar filtros |

**No se requieren cambios en la base de datos ni en edge functions.**

### Resultado esperado

- Blog con aspecto editorial moderno, limpio y profesional
- Cards con mas informacion visible (excerpt + autor) para aumentar el CTR
- Filtros siempre accesibles gracias al sticky bar
- Experiencia mobile optimizada con scroll horizontal de categorias y cards de 1 columna con imagen horizontal
- Mejor ritmo de lectura sin el CTA banner interrumpiendo las filas


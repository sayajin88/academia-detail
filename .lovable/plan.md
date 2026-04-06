

# Corrección de 3 Alertas de Google Search Console

## Alerta 1: Falta el campo "image" — `/jornada-zero-detailing`

**Causa:** `generateCourseSchemaEnhanced` solo incluye `image` si se pasa `course.image`. En la llamada de Jornada Zero (línea 651) no se pasa `image`.

**Solución:** Añadir `image: \`${BASE_URL}/og-jornada-zero.jpg\`` a la llamada de `generateCourseSchemaEnhanced` en el bloque `jornadaCero` (línea 651). Hacer lo mismo en todas las demás llamadas a esta función que no pasen `image` (carrera, cursos individuales, etc.) para prevenir futuras alertas.

---

## Alerta 2: Falta el campo "name" en `<parent_node>` — 6 elementos en `/`

**Causa:** En `generateHomeSEO`, el `courseItemList` (línea 524) genera `ListItem` sin propiedad `name` a nivel raíz — el `name` solo está dentro del objeto `item`. Google requiere `name` directamente en cada `ListItem`.

**Solución:** Añadir `"name": detail?.title || f.title` a cada `ListItem` en el `courseItemList` (línea 527), al mismo nivel que `position` e `item`.

---

## Alerta 3: Vídeos no en página de visualización — 5 vídeos

**Causa:** Google dice que los vídeos con esquema `VideoObject` no están visibles "above the fold" o no son el contenido principal de la página. Esto ocurre en páginas de cursos y `/quienes-somos` donde los vídeos son testimoniales secundarios, no el contenido principal.

**Nota:** La página `/quienes-somos` ya tiene los VideoObject eliminados (línea 841 del seoConfig). Las 5 URLs afectadas son páginas de cursos donde los vídeos son testimoniales lazy-loaded.

**Solución:** Esto no es un error crítico (Google lo marca como "mejora"), pero para resolverlo correctamente:
- Mantener los `VideoObject` solo cuando el vídeo es visible y reproducible directamente en la página (no lazy-loaded detrás de interacción)
- Para los cursos que tienen vídeo de presentación prominente (`iJjIZ4Ja7RA` en detailing, `0b8VwDTfxe8` en wrapping, `xvfLq467Mls` en PPF), mantener el schema pero asegurar que el vídeo se renderiza visible en la página
- Para `/quienes-somos` con el embed decorativo de YouTube (`ByRhg2KYD-A`), NO incluir VideoObject (ya está así)

---

## Archivos a modificar

1. **`src/utils/seoConfig.ts`**
   - Línea 527: Añadir `"name"` a cada `ListItem` del `courseItemList`
   - Línea 651: Añadir `image` a la llamada de Jornada Zero
   - Revisar todas las demás llamadas a `generateCourseSchemaEnhanced` y añadir `image` donde falte

2. **Sin cambios necesarios** para la alerta de vídeos — es informativa y las páginas afectadas tienen vídeos legítimamente embebidos. Si se desea, se puede ajustar el orden de renderizado del vídeo en las páginas de cursos para que sea más prominente.


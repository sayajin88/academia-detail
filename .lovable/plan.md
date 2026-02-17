

# Rediseño de Tarjetas de Formaciones en Home

## Cambios solicitados

1. **Ocultar precios** de los 4 cursos para incentivar el clic hacia cada landing
2. **Mejorar el atractivo visual** de las tarjetas

## Cambios en `src/components/home/FormationsGrid.tsx`

### Ocultar precios
Eliminar todo el bloque de precio (lineas 128-150) que muestra "Desde €X + IVA" y reemplazarlo por informacion que invite al clic:
- Mostrar la **duracion** del curso con icono de reloj
- Mostrar la **proxima fecha** disponible (si existe) con un icono de calendario
- Para "Proximamente", mantener la etiqueta actual

### Mejoras visuales

1. **CTA mas prominente**: Cambiar el boton outline actual por un boton solido con fondo `bg-primary` y texto claro, mas grande y con efecto hover mas llamativo. Incluir texto "Descubre el Programa" en lugar de "Ver Detalles".

2. **Linea de acento granate** en el borde inferior de la imagen (una franja decorativa de 3-4px con gradiente primary) para reforzar la identidad visual.

3. **Hover mas dinamico en la imagen**: Ademas del scale actual, anadir un overlay con gradiente sutil que revele un texto "Ver programa" centrado al hacer hover (solo en desktop).

4. **Badges mejorados**: Anadir un badge de duracion junto al badge de alumnos certificados en la esquina de la imagen, con icono de reloj y fondo semitransparente.

5. **Separador decorativo** entre la descripcion y los highlights: una linea fina con gradiente que aporte estructura visual.

## Archivo a modificar

| Archivo | Cambio |
|---------|--------|
| `src/components/home/FormationsGrid.tsx` | Eliminar precios, mejorar CTA, anadir elementos visuales decorativos |

## Lo que NO cambia

- La estructura alternada (imagen izquierda/derecha) se mantiene
- Los datos de `formations.ts` no se modifican
- El numero decorativo grande se mantiene
- La caja "Lo que aprenderas" se mantiene
- Los badges de alumnos certificados y "Proximamente" se mantienen


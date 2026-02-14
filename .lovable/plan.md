

## Rediseñar filtros del Directorio: mover debajo del mapa y compactar

### Problema actual
Los filtros ocupan demasiado espacio vertical arriba del mapa (3 filas de chips) y crean una zona visualmente pesada que aleja al usuario del contenido principal.

### Solucion propuesta
Mover los filtros debajo del mapa y presentarlos en una barra compacta horizontal tipo toolbar, agrupando todo en una sola fila con secciones colapsables.

### Cambios

**1. Redisenar `DirectoryFilters.tsx`** - Layout compacto tipo toolbar:
- Una sola fila horizontal con los 3 grupos de filtros separados por divisores verticales
- Tipo (Todos/Detailers/Centros) y Nivel (Todos/Elite/Master/Certificado) en la misma linea
- Los servicios se muestran en un boton desplegable "Servicios" que abre un popover con los chips
- Fondo card con borde, bordes redondeados, padding interno (aspecto de barra de herramientas)
- En movil: los filtros de tipo y nivel se muestran en fila, y servicios en un acordeon/popover

**2. Reorganizar `Directory.tsx`** - Nuevo orden de elementos:
- Hero (busqueda)
- Toggle de vista (Ambos/Mapa/Grid) alineado a la derecha, solo
- Mapa (si visible)
- Barra de filtros compacta (debajo del mapa, encima del grid)
- Grid de tarjetas
- Banner de unirse

Esto situa los filtros en una posicion mas logica: el usuario primero ve el mapa general y luego filtra para afinar resultados en el grid.

### Detalles tecnicos

**Archivos modificados:**
- `src/components/directory/DirectoryFilters.tsx` -- redisenar a toolbar compacta con popover de servicios
- `src/pages/Directory.tsx` -- reordenar: toggle vista arriba solo, filtros entre mapa y grid

**Estructura de la toolbar de filtros:**
```text
+------------------------------------------------------------------+
| [Todos] [Detailers] [Centros]  |  [Todos] [Elite] [Master] [Pro]  |  [Servicios v]  |
+------------------------------------------------------------------+
```

- En desktop: todo en una fila con separadores `|`
- En movil: tipo y nivel en filas apiladas, servicios en boton desplegable
- El popover de servicios muestra los 8 chips actuales en un dropdown al hacer clic
- Se usa el componente Popover de Radix existente para el dropdown de servicios
- Indicador visual: si hay servicios seleccionados se muestra un badge con el contador

**No hay cambios en base de datos ni en otros archivos.**


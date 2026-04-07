

## Plan: Mejora visual y funcional de /admin/contacts

### 1. Toggle de estado ya existe — pero mejorarlo

El toggle desde el listado ya funciona (el badge es clickable). Sin embargo, no es obvio visualmente que se puede hacer clic. Cambios:
- Añadir un **checkbox/switch visual** o un icono de toggle más claro en lugar del badge clickable actual
- Añadir feedback visual (animación sutil) al cambiar estado

### 2. Formato de inversión — fallback sin guiones bajos

Actualmente si el valor no está en `inversionLabels`, se muestra el raw con `_`. Añadir una función `formatInversion` que como fallback reemplace `_` por espacios y capitalice. Además, mostrar con un icono de euro para mayor claridad visual.

### 3. Mejoras visuales y estructurales

**Header mejorado:**
- Añadir icono y mejor jerarquía visual en el título
- KPI cards en la parte superior (total, pendientes, contactados) con colores e iconos, reemplazando el texto plano actual

**Filtros más compactos:**
- Unificar status tabs y formation tabs en una sola barra de filtros más limpia
- Mover búsqueda al lado derecho de la barra de filtros

**Tabla mejorada:**
- Añadir avatar/iniciales del contacto en la columna de nombre
- Columna de inversión con badge coloreado según rango
- Hover states más marcados en las filas
- Indicador visual de "tiene notas" (icono pequeño) junto al nombre

**Modal de detalle:**
- Mejor separación visual de secciones
- Sección de contacto más prominente con botones más grandes

### Archivo a modificar

| Archivo | Cambio |
|---|---|
| `src/pages/AdminContacts.tsx` | Rediseño visual completo: KPI cards, tabla mejorada, formato inversión, toggle más claro |


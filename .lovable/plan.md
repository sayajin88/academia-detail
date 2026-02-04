

## Plan: Rediseño de Tarjetas de Cursos

### CAMBIOS SOLICITADOS

1. **Renombrar títulos de cursos** - Añadir "Curso de" al principio
2. **Nueva disposición visual** - Tarjetas más grandes y visibles

---

### CAMBIO 1: Actualizar Nombres de Cursos

**Archivo:** `src/data/formations.ts`

| Actual | Nuevo |
|--------|-------|
| `shortTitle: 'Detailing'` | `shortTitle: 'Curso de Detailing'` |
| `shortTitle: 'Wrapping'` | `shortTitle: 'Curso de Wrapping'` |
| `shortTitle: 'PPF'` | `shortTitle: 'Curso de PPF'` |
| `shortTitle: 'Restauración'` | `shortTitle: 'Curso de Restauración'` |

---

### CAMBIO 2: Nueva Disposición Visual

Propongo cambiar de 4 columnas pequeñas a **2 columnas más grandes en desktop**, manteniendo 1 columna en móvil. Esto hará las tarjetas mucho más prominentes y visibles.

**Archivo:** `src/components/home/FormationsGrid.tsx`

**Cambios principales:**

```
ANTES (actual):
+-------+-------+-------+-------+
| Card  | Card  | Card  | Card  |
| small | small | small | small |
+-------+-------+-------+-------+

DESPUÉS (propuesto):
+---------------+---------------+
|               |               |
|   Card Big    |   Card Big    |
|               |               |
+---------------+---------------+
|               |               |
|   Card Big    |   Card Big    |
|               |               |
+---------------+---------------+
```

**Especificaciones del nuevo diseño:**

1. **Grid**: `grid-cols-1 md:grid-cols-2` (1 columna móvil, 2 columnas desktop)
2. **Aspect ratio**: `aspect-[16/10]` (más horizontal y grande)
3. **Tamaño de imagen**: Mayor área visible de la foto
4. **Tipografía**: Títulos más grandes (`text-2xl md:text-3xl`)
5. **Padding**: Más espacio interno para respirar
6. **Descripción**: Visible en todos los tamaños (actualmente oculta en móvil)
7. **Gap**: Mayor separación entre tarjetas (`gap-6 md:gap-8`)

---

### ARCHIVOS A MODIFICAR

| Archivo | Cambio |
|---------|--------|
| `src/data/formations.ts` | Renombrar `shortTitle` de cada curso |
| `src/components/home/FormationsGrid.tsx` | Nueva estructura de grid y tarjetas más grandes |

---

### RESULTADO VISUAL ESPERADO

- **Desktop**: 2 tarjetas por fila, mucho más grandes y prominentes
- **Tablet**: 2 tarjetas por fila con tamaño intermedio
- **Móvil**: 1 tarjeta por fila, ocupando todo el ancho

Las tarjetas serán aproximadamente el doble de grandes, con más espacio para mostrar la descripción y los badges de forma clara.


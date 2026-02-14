
## Arreglar el modal de edicion que queda detras del mapa

### Problema

El mapa de Leaflet usa z-index altos internamente (entre 400-800). Cuando se abre el modal de editar/crear perfil, queda parcialmente oculto detras del mapa como se ve en la captura.

### Solucion

Añadir una clase de z-index alto al `DialogContent` en `src/pages/AdminProfiles.tsx` (linea 312) para que el overlay y el contenido del modal aparezcan siempre por encima del mapa.

**Cambio:** Añadir `z-[9999]` al `DialogContent` para forzar que el modal quede por encima de cualquier capa de Leaflet.

**Archivo:** `src/pages/AdminProfiles.tsx`, linea 312

```
// Antes
<DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">

// Despues
<DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto z-[9999]">
```

Esto es un cambio de una sola linea que resuelve el conflicto de capas sin afectar nada mas.

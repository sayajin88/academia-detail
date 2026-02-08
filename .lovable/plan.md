

# Correccion del Logo Recortado en Mobile

## Problema

El logo "ACADEMIA DETAIL - By Detail Park" se ve recortado en ambos lados en pantallas moviles. La causa es la restriccion `max-w-[170px]` aplicada en el ultimo cambio, que es demasiado estrecha para contener el logo completo a una altura de `h-8` (32px). El logo tiene una proporcion natural de 229x70px, por lo que a 32px de alto necesita ~105px de ancho, pero el `max-w-[170px]` combinado con el `object-fit` por defecto esta causando un recorte visual.

En realidad, el problema es mas sutil: la imagen se renderiza con `w-auto`, por lo que a `h-8` (32px) el ancho calculado seria ~105px, que cabe en 170px. Sin embargo, el contenedor padre (la barra de navegacion glass) tiene `px-3` (12px de padding a cada lado) y el boton hamburguesa compite por el espacio, dejando poco margen.

La solucion correcta es:

1. **Eliminar `max-w-[170px]`** - Esta restriccion esta causando el recorte. Con `h-8 w-auto`, el logo ya se dimensiona correctamente de forma proporcional
2. **Asegurar que el contenedor del logo no recorta** - Verificar que el wrapper del logo no tenga overflow oculto
3. **Reducir ligeramente la altura si es necesario** - Si el logo sigue siendo demasiado ancho, reducir a `h-7` en vez de usar max-width

## Cambio propuesto

**Archivo: `src/components/layout/Navbar.tsx` (linea 131)**

Cambiar:
```
className="h-8 md:h-12 w-auto max-w-[170px] md:max-w-none transition-transform duration-300 group-hover:scale-105 brightness-0 invert"
```

Por:
```
className="h-7 sm:h-8 md:h-12 w-auto transition-transform duration-300 group-hover:scale-105 brightness-0 invert"
```

Esto:
- Elimina `max-w-[170px]` que esta causando el recorte
- Usa `h-7` (28px) en pantallas muy pequenas (320px) y `h-8` (32px) a partir de `sm` (640px), garantizando que el logo cabe incluso en los dispositivos mas estrechos
- Mantiene `h-12` en desktop sin cambios
- El ancho se calcula automaticamente con `w-auto` manteniendo la proporcion

## Archivo afectado

| Archivo | Cambio |
|---------|--------|
| `src/components/layout/Navbar.tsx` | Eliminar max-w-[170px], ajustar altura responsiva h-7/sm:h-8/md:h-12 |




## Plan: Corregir Embeds de Instagram con iFrames Directos

### PROBLEMA

El componente `InstagramFeed.tsx` todavia usa el metodo antiguo (`blockquote` + `embed.js`) que produce el error "Es posible que el enlace este danado". Necesitamos reemplazarlo por iframes directos que funcionan de forma fiable.

El enlace del perfil (`https://www.instagram.com/danidetailoficial/`) ya esta configurado correctamente.

### SOLUCION

Reescribir el componente para usar **iframes directos** en lugar de blockquotes. Cada reel se cargara con la URL:

```text
https://www.instagram.com/reel/{ID}/embed/
```

### CAMBIOS EN `src/components/home/InstagramFeed.tsx`

1. **Eliminar** la declaracion global de `window.instgrm` (ya no se necesita)
2. **Eliminar** toda la logica de carga del script `embed.js` (funciones `loadScript`, estado `scriptLoaded`, `useCallback`)
3. **Eliminar** los elementos `blockquote` y reemplazarlos por `iframe`
4. **Mantener** el `IntersectionObserver` para carga diferida (el iframe solo se renderiza cuando la seccion es visible)
5. **Mantener** el skeleton de carga mientras no es visible
6. **Mantener** el boton "Seguir @danidetailoficial" con el enlace correcto
7. **Mantener** las mismas 3 URLs de reels configuradas

**Estructura del iframe por cada reel:**

```text
<iframe
  src="https://www.instagram.com/reel/{id}/embed/"
  className="w-full rounded-xl border border-border"
  style={{ minHeight: 580 }}
  frameBorder="0"
  scrolling="no"
  allow="encrypted-media"
  loading="lazy"
/>
```

### ARCHIVOS A MODIFICAR

| Archivo | Cambio |
|---------|--------|
| `src/components/home/InstagramFeed.tsx` | Reemplazar blockquote + embed.js por iframes directos. Simplificar logica del componente. |

No se necesitan cambios en ningun otro archivo. `Home.tsx` ya tiene el componente importado correctamente.

### RESULTADO

- Los reels se mostraran correctamente tanto en el preview como en produccion
- No se cargara ningun script externo de Instagram
- Se mantiene la carga diferida para no afectar al rendimiento
- El boton sigue apuntando a `https://www.instagram.com/danidetailoficial/`


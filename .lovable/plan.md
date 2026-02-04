
## Plan: Corrección de Errores de PageSpeed

### PROBLEMAS IDENTIFICADOS

| Problema | Causa | Impacto |
|----------|-------|---------|
| **Cookie de YouTube** | El iframe carga cookies de terceros aunque use `youtube-nocookie.com` | Advertencia en DevTools, posibles problemas de privacidad |
| **Sin Source Maps** | Vite no genera sourcemaps en producción | Dificulta debugging en producción |

---

### SOLUCIÓN 1: Implementar YouTube Facade (Lite YouTube)

El problema de cookies ocurre porque el iframe de YouTube se carga automáticamente. La solución es usar un patrón "facade" que muestra una imagen de preview y solo carga el iframe cuando el usuario interactúa.

**Archivo:** `src/components/home/HomeHero.tsx`

```tsx
// Estado para controlar la carga del video
const [videoInteracted, setVideoInteracted] = useState(false);

// En lugar de cargar el iframe automáticamente con setTimeout,
// mostrar una imagen de preview de YouTube y cargar el iframe
// solo cuando el usuario hace click o después de un tiempo mayor

{!isMobile && (
  <div className="absolute inset-0 overflow-hidden">
    {videoInteracted ? (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&...`}
        // ... resto de props
      />
    ) : (
      <button 
        onClick={() => setVideoInteracted(true)}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg)` }}
        aria-label="Reproducir video de fondo"
      >
        {/* El video no carga hasta que el usuario interactúa o hace scroll */}
      </button>
    )}
  </div>
)}
```

**Alternativa más simple**: Aumentar el delay de carga del video y usar un observer para cargar solo cuando sea visible/scroll:

```tsx
// Usar IntersectionObserver para cargar video solo cuando es visible
useEffect(() => {
  if (isMobile) return;
  
  const timer = setTimeout(() => {
    setVideoLoaded(true);
  }, 5000); // Aumentar delay a 5s para evitar problemas iniciales
  
  return () => clearTimeout(timer);
}, [isMobile]);
```

---

### SOLUCIÓN 2: Habilitar Source Maps en Producción

**Archivo:** `vite.config.ts`

```typescript
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    // Habilitar source maps para debugging en producción
    sourcemap: true,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
```

---

### ARCHIVOS A MODIFICAR

| Archivo | Cambio |
|---------|--------|
| `vite.config.ts` | Añadir `build: { sourcemap: true }` |
| `src/components/home/HomeHero.tsx` | Implementar YouTube facade o aumentar delay de carga |

---

### RESULTADO ESPERADO

- **Cookies**: Eliminación del warning de cookies de YouTube al no cargar el iframe automáticamente
- **Source Maps**: Los archivos `.js.map` estarán disponibles en producción para debugging

---

### NOTAS TÉCNICAS

1. **YouTube Facade**: Esta es la solución recomendada por Google para evitar problemas de cookies y mejorar performance. En lugar de cargar el iframe pesado de YouTube, se muestra una imagen de preview (thumbnail) y solo se carga el video real cuando el usuario interactúa.

2. **Source Maps**: Habilitar sourcemaps aumenta ligeramente el tiempo de build pero no afecta el rendimiento del usuario final ya que los browsers solo descargan los mapas cuando se abren DevTools.

3. **Consideración de privacidad**: Aunque `youtube-nocookie.com` reduce las cookies, no las elimina completamente. La facade es la única forma de eliminar todas las cookies de YouTube hasta que el usuario decida ver el video.

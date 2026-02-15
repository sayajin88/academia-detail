
# Correccion de Errores de Video en Google Search Console

## Problemas detectados (3 errores)

### Error 1: "uploadDate" falta la zona horaria
### Error 2: "uploadDate" no es valido
**Causa raiz**: El esquema `VideoObject` genera fechas como `"2025-03-15"` (solo fecha). Google requiere formato ISO 8601 completo con zona horaria: `"2025-03-15T00:00:00+00:00"`.

**Solucion**: Modificar la funcion `generateVideoObjectSchema` en `src/utils/seoConfig.ts` para transformar automaticamente cualquier fecha recibida al formato completo con timezone. Si recibe `"2025-03-15"`, lo convierte a `"2025-03-15T00:00:00+00:00"`.

Esto corrige los 8+8 = 16 elementos afectados de golpe, ya que todas las fechas pasan por esta unica funcion.

### Error 3: "El video no esta en una pagina de visualizacion"
**Causa raiz**: Google detecta esquemas `VideoObject` en paginas donde el video no es visible directamente (por ejemplo, el hero de `/quienes-somos` usa un iframe de fondo en modo mute/autoplay/sin controles, que Google no considera una "pagina de visualizacion"). Tambien puede ocurrir cuando el video esta tras un click (lazy-loaded) y el bot no puede verlo.

**Solucion**:
- Eliminar los esquemas `VideoObject` de la pagina `/quienes-somos` (About), ya que el video del hero es decorativo (fondo, sin controles, mute)
- Asegurar que las paginas que SI tienen esquemas de video tambien tengan el iframe/embed visible o referenciable por el bot

---

## Cambios por archivo

### 1. `src/utils/seoConfig.ts`

**Cambio A** -- Corregir formato `uploadDate` (linea 322):

Transformar la fecha para que siempre incluya timezone:
```typescript
// Antes:
"uploadDate": video.uploadDate || "2025-06-01",

// Despues:
"uploadDate": formatUploadDate(video.uploadDate || "2025-06-01"),
```

Anadir funcion helper:
```typescript
const formatUploadDate = (date: string): string => {
  // Si ya tiene timezone (contiene T y +/-), devolver tal cual
  if (date.includes('T') && (date.includes('+') || date.includes('Z'))) return date;
  // Si solo es fecha YYYY-MM-DD, anadir hora y timezone
  return `${date}T00:00:00+00:00`;
};
```

**Cambio B** -- Eliminar esquemas VideoObject de la pagina "quienes-somos":

En la seccion de SEO de About/quienes-somos, eliminar los `generateVideoObjectSchemas([...])` que referencian los videos del canal de YouTube usados como fondo decorativo. Estos videos no son contenido principal de la pagina y Google los rechaza.

### 2. Sin cambios en otros archivos

Los demas archivos (componentes de video) no necesitan cambios, ya que el problema es exclusivamente del schema JSON-LD, no de la implementacion visual.

---

## Resumen

| Archivo | Cambio |
|---------|--------|
| `src/utils/seoConfig.ts` | Anadir `formatUploadDate()` helper + aplicar en `generateVideoObjectSchema` + eliminar VideoObject schemas de la pagina About |

## Validacion post-implementacion

Despues de publicar los cambios, deberas pulsar "Validar Correccion" en cada uno de los 3 informes de errores en Search Console. Google re-rastreara las URLs afectadas y confirmara si los errores se han resuelto (normalmente en 3-7 dias).

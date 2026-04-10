

## Auditoría SEO: Conexión academiadetail.com ↔ Ficha Google "Detail Park"

### Estado actual — Lo que ya está bien

La base es sólida. Los schemas JSON-LD ya usan `"name": "Detail Park - Academia Detail"` con `alternateName` que incluye ambas marcas, la dirección y teléfono coinciden con la ficha de Google, `sameAs` apunta a Google Maps, y el `aggregateRating` refleja las 218 reseñas reales.

### Problemas detectados y correcciones propuestas

**1. URL de Google Maps genérica → Place ID específico**
El `sameAs` y `hasMap` usan `https://www.google.com/maps/place/Detail+Park/` que es ambiguo. Debe cambiarse por la URL con Place ID o CID real de la ficha para que Google haga el match exacto. Necesito buscar el Place ID real de "Detail Park Alicante" para usar `https://www.google.com/maps/place/?q=place_id:ChIJ...`.

**2. Falta `@id` en el schema LocalBusiness**
Sin un `@id` consistente, Google no puede conectar las distintas menciones del negocio entre schemas. Hay que añadir `"@id": "https://academiadetail.com/#local-business"` al `localBusinessSchema` (en SEO.tsx) y `organizationSchemaComplete` (en seoConfig.ts), y referenciar este `@id` desde los schemas de cursos, eventos, etc.

**3. Número de reseñas desactualizado**
La ficha muestra 218 reseñas. Verificar que el `reviewCount` en todos los schemas sea coherente (actualmente lo es, pero conviene centralizar la constante para actualizarlo fácilmente).

**4. `og:site_name` inconsistente**
En `index.html` dice `"Detail Park - Academia Detail"` pero en `SEO.tsx` dice `"Academia Detail - Formación Detailing España"`. Deben unificarse a `"Detail Park - Academia Detail"` para reforzar la conexión con la ficha.

**5. Horarios de sábado ausentes en seoConfig.ts**
El `organizationSchemaComplete` en `seoConfig.ts` solo tiene horarios L-V. El de `SEO.tsx` sí incluye sábados (09:00-14:00). Hay que sincronizarlos.

**6. Verificación externa: URL del sitio web en la ficha de Google**
Desde la ficha de Google Business Profile (que tú gestionas), el campo "Sitio web" debe apuntar a `https://academiadetail.com` (no a detailpark.com). Esto es lo más importante para que Google vincule ambas entidades. Esto es una acción manual tuya en el panel de GBP.

### Cambios técnicos

| Archivo | Cambio |
|---|---|
| `src/components/SEO.tsx` | Añadir `@id` al `localBusinessSchema`. Actualizar `sameAs`/`hasMap` con Place ID real. Unificar `og:site_name` a `"Detail Park - Academia Detail"` |
| `src/utils/seoConfig.ts` | Añadir `@id` al `organizationSchemaComplete`. Sincronizar horarios sábado. Actualizar `sameAs`/`hasMap` con Place ID. Centralizar constantes (reviewCount, ratingValue) |
| `index.html` | Ya está correcto (`og:site_name` = `"Detail Park - Academia Detail"`) |

### Acción manual requerida (fuera del código)

- **Google Business Profile**: Verificar que el campo "Sitio web" de la ficha apunte a `https://academiadetail.com`
- **Google Business Profile**: Verificar que el nombre de la ficha sea exactamente `Detail Park - Academia Detail` o al menos `Detail Park` (que ya coincide con `alternateName`)

### Paso previo: buscar el Place ID real

Antes de implementar, buscaré el Google Place ID exacto de "Detail Park" en Alicante para usar la URL canónica en `sameAs` y `hasMap`.




# Heredar Autoridad de Google Business Profile y Maximizar CTR

## Problema

Los esquemas JSON-LD de la web no coinciden exactamente con la ficha de Google Business Profile (GBP) de "Detail Park". Google necesita senales claras de que la web y la ficha fisica son la misma entidad para transferir la autoridad (estrellas, resenas, Knowledge Panel).

## Diferencias detectadas entre la web y la ficha GBP

| Campo | Web actual | Ficha GBP | Accion |
|-------|-----------|-----------|--------|
| `name` | "Academia Detail" | "Detail Park - Academia Detail" | Alinear con GBP |
| `sameAs` | Falta detailpark.com | Incluye `http://www.detailpark.com/` | Anadir |
| `sameAs` TikTok | `@detailpark` | `@detail_park` | Anadir ambas variantes |
| `sameAs` Facebook | `/detailpark` | `/detailparkoficial` | Anadir variante |
| FAQs solicitadas | No existen | 3 preguntas nuevas | Anadir al principio |

## Cambios por archivo

### 1. `src/utils/seoConfig.ts` -- Schema Organization

- Cambiar `name` a `"Detail Park - Academia Detail"` (coincide exactamente con GBP)
- Anadir `"http://www.detailpark.com/"` y `"https://www.tiktok.com/@detail_park"` y `"https://facebook.com/detailparkoficial"` al array `sameAs`
- Mantener los perfiles existentes (no eliminar, solo anadir)

### 2. `src/components/SEO.tsx` -- Schema LocalBusiness

- Cambiar `name` a `"Detail Park - Academia Detail"` para coherencia
- Actualizar `sameAs` con las mismas URLs del GBP
- Mantener `alternateName` con las variantes para no perder busquedas por nombre alternativo

### 3. `src/components/home/HomeFAQ.tsx` -- Nuevas FAQs

Reemplazar las 3 primeras FAQs actuales (que son similares pero con texto diferente) por las 3 solicitadas con el texto exacto del usuario:

- "¿Los cursos son en Alicante?" (nueva, refuerza SEO local)
- "¿Es formacion practica?" (reemplaza la similar existente)
- "¿Incluye diploma?" (reemplaza la similar existente)

Esto mejora el CTR porque las preguntas con intencion local ("Alicante") refuerzan la conexion con la ficha GBP.

## Nota sobre el rating

La ficha GBP indica 5.0 con 150 resenas, pero la web actualmente muestra 4.9 con 174 resenas. Se mantendra el valor actual de la web (4.9/174) porque:
- Bajar el reviewCount de 174 a 150 seria un retroceso
- Google reconcilia ambos valores automaticamente; no es necesario que coincidan exactamente
- El 4.9 es mas creible que un 5.0 perfecto en schemas web

## Archivos a modificar

| Archivo | Cambio |
|---------|--------|
| `src/utils/seoConfig.ts` | Actualizar `name` y `sameAs` en organizationSchemaComplete |
| `src/components/SEO.tsx` | Actualizar `name` y `sameAs` en localBusinessSchema |
| `src/components/home/HomeFAQ.tsx` | Reemplazar las 3 primeras FAQs por las solicitadas |


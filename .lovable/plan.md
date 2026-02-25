
# Vincular la Web con Google Business Profile

## Problema Identificado

La web de Academia Detail NO esta enlazada correctamente con la ficha de Google Business Profile de "Detail Park". Hay 4 puntos de conexion que faltan o estan mal configurados:

1. **Falta la URL de Google Maps en `sameAs`** - Los arrays `sameAs` en los schemas JSON-LD (tanto en `SEO.tsx` como en `seoConfig.ts` y `TestimonialsSection.tsx`) no incluyen la URL de Google Maps del negocio
2. **Falta la propiedad `hasMap`** - El schema `LocalBusiness` no tiene la propiedad `hasMap` que conecta explicitamente con Google Maps
3. **El embed de Google Maps usa una busqueda generica** - En `ContactInfo.tsx`, el iframe y los enlaces usan `maps.google.com/?q=Calle+Metalurgias+13...` en vez de la URL de Place directa de Detail Park
4. **Datos inconsistentes** - El schema dice 4.9 con 174 resenas pero la ficha real de Google muestra 4.8 con 218 resenas

## Plan de Implementacion

### Paso 1: SEO.tsx - Anadir Google Maps Place URL al localBusinessSchema

Anadir al array `sameAs` la URL de Google Maps con el nombre del negocio:
```
"https://www.google.com/maps/place/Detail+Park/"
```

Anadir propiedad `hasMap`:
```
"hasMap": "https://www.google.com/maps/place/Detail+Park/"
```

Actualizar `aggregateRating` para coincidir con Google (4.8 / 218 resenas).

### Paso 2: seoConfig.ts - Sincronizar sameAs y aggregateRating

Anadir la misma URL de Google Maps al array `sameAs` del `organizationSchemaComplete`.
Actualizar el `aggregateRating` a 4.8 / 218.

### Paso 3: TestimonialsSection.tsx - Anadir Google Maps al itemReviewed.sameAs

Anadir la URL de Google Maps al array `sameAs` del objeto `itemReviewed` que se usa en los schemas de Review.

### Paso 4: ContactInfo.tsx - Usar URL de Place directa

Cambiar los enlaces de Google Maps de busqueda generica a la URL de Place:
- `href` del enlace de direccion
- `href` del enlace "Abrir en Google Maps"
- `src` del iframe embed para que apunte al negocio real

### Paso 5: GoogleReviews.tsx - Sincronizar datos con GBP real

Actualizar la puntuacion mostrada de 4.8 y el conteo de 218 resenas (ya coincide con la ficha real, verificado).

---

## Detalles Tecnicos

### Archivos a modificar:
1. `src/components/SEO.tsx` - sameAs + hasMap + aggregateRating en localBusinessSchema
2. `src/utils/seoConfig.ts` - sameAs + aggregateRating en organizationSchemaComplete
3. `src/components/home/TestimonialsSection.tsx` - sameAs en itemReviewed
4. `src/components/contact/ContactInfo.tsx` - URLs de Google Maps

### Por que esto importa para el Knowledge Panel:
Google usa las senales de `sameAs` y `hasMap` en el JSON-LD para vincular una web con su ficha de Google Business Profile. Sin estas senales, Google puede no asociar automaticamente `academiadetail.com` con la ficha de "Detail Park" en Maps, perdiendo la conexion entre el Knowledge Panel y la web.

### Sin nuevas dependencias
### Sin cambios en base de datos

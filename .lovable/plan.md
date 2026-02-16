

# Mejoras SEO de Efecto Inmediato

## 1. Sincronizar fallbacks de index.html con los metadatos actuales

El archivo `index.html` contiene metadatos de respaldo que los crawlers sin JavaScript (y algunas plataformas sociales) leen directamente. Actualmente estan desactualizados:

**Archivo**: `index.html`

| Campo | Valor actual | Valor correcto |
|-------|-------------|----------------|
| og:title | "Cursos Detailing Profesional 2026 \| Alicante ★4.9" | "Cursos Detailing Profesional 2026 \| Certificacion y Practica Real ★4.9" |
| og:description | "+170 alumnos certificados" | "+174 alumnos certificados" |
| twitter:title | Mismo error | Mismo fix |
| twitter:description | Mismo error | Mismo fix |
| og:site_name | "Academia Detail" | "Detail Park - Academia Detail" |

---

## 2. Unificar nombre en esquemas WebSite y WebPage

En `src/utils/seoConfig.ts`, los esquemas WebSite y WebPage todavia usan "Academia Detail" en lugar de "Detail Park - Academia Detail". Google necesita coherencia total para asociar la web con la ficha GBP.

**Archivo**: `src/utils/seoConfig.ts`

Cambios en las siguientes referencias:
- WebSite schema `name` en `generateHomeSEO()` (linea 575): "Academia Detail" -> "Detail Park - Academia Detail"
- WebSite schema en `seoConfig.home` (linea 614): misma correccion
- `generateCourseSchemaEnhanced` provider name (linea 274): "Academia Detail" -> "Detail Park - Academia Detail"
- `generateWebPageSchema` mainEntity name (linea 453): misma correccion
- Todas las referencias de provider/seller `"name": "Academia Detail"` -> `"Detail Park - Academia Detail"` para coherencia completa con GBP

---

## 3. Corregir fecha de evento pasado (Jornada Zero)

El schema `EducationEvent` de Jornada Zero tiene `startDate: "2026-01-17"` que ya paso. Google penaliza eventos con fechas pasadas mostrandolos como "Evento finalizado" o directamente no indexandolos.

**Archivo**: `src/utils/seoConfig.ts`

Actualizar las fechas del evento a la proxima edicion disponible (o eliminar el EventSchema si no hay fecha confirmada y dejar solo el CourseSchema).

---

## 4. Eliminar inyeccion duplicada de FAQPage schema

`HomeFAQ.tsx` inyecta su propio schema `FAQPage` via Helmet (linea 107-118), pero la pagina Home YA recibe schemas desde `generateHomeSEO()`. Esto puede crear dos bloques `FAQPage` en la misma pagina, lo que Google marca como "Duplicate schema" en Rich Results Test.

**Archivo**: `src/components/home/HomeFAQ.tsx`

Solucion: Integrar las FAQs del componente en el schema principal de Home via `generateHomeSEO()`, y eliminar la inyeccion duplicada de Helmet en `HomeFAQ.tsx`.

**Archivo**: `src/utils/seoConfig.ts`

Anadir `generateFAQSchema(homeFaqs)` al array de schemas de `generateHomeSEO()`, importando las FAQs desde `HomeFAQ.tsx` (o extrayendolas a un archivo de datos compartido).

---

## 5. Anadir schema `Review` individual para reforzar aggregateRating

Google valora mas un `aggregateRating` cuando va acompanado de al menos 1-2 reviews individuales con autor, fecha y texto. Actualmente solo hay `aggregateRating` sin reviews reales.

**Archivo**: `src/components/SEO.tsx`

Anadir 2-3 reviews reales al `localBusinessSchema`:
```
"review": [
  {
    "@type": "Review",
    "author": { "@type": "Person", "name": "Nombre Alumno" },
    "datePublished": "2025-XX-XX",
    "reviewBody": "Texto real de la resena",
    "reviewRating": { "@type": "Rating", "ratingValue": "5" }
  }
]
```

---

## Resumen de archivos a modificar

| Archivo | Cambio |
|---------|--------|
| `index.html` | Actualizar og:title, og:description, twitter:title, twitter:description, og:site_name |
| `src/utils/seoConfig.ts` | Unificar nombre a "Detail Park - Academia Detail" en WebSite/WebPage/provider schemas + corregir fecha evento Jornada Zero + integrar FAQs de Home |
| `src/components/SEO.tsx` | Anadir reviews individuales al localBusinessSchema |
| `src/components/home/HomeFAQ.tsx` | Eliminar inyeccion duplicada de FAQPage schema via Helmet |

## Impacto esperado

- **Coherencia GBP**: Google reconcilia web + ficha fisica = Knowledge Panel + estrellas
- **FAQs limpias**: Sin duplicados, mayor probabilidad de rich snippet FAQ
- **Evento actualizado**: Evita penalizacion por fecha pasada
- **Reviews reales**: Refuerzan la credibilidad del aggregateRating ante Google


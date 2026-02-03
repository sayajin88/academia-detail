

## Plan: Corrección de Errores de Schema.org en Google Search Console

### PROBLEMA IDENTIFICADO

Google Search Console detecta 2 errores críticos por cada reseña:
1. **"Elemento sin nombre"** - Falta el campo `name` en cada Review
2. **"Varias reseñas sin aggregateRating"** - Las reseñas no incluyen el `itemReviewed` con `aggregateRating`

---

### CAUSA RAÍZ

El schema actual en `TestimonialsSection.tsx` tiene la estructura:

```json
{
  "@type": "EducationalOrganization",
  "name": "Academia Detailing - Detail Park",
  "review": [
    {
      "@type": "Review",
      "author": {...},
      "reviewRating": {...},
      "reviewBody": "..."
    }
  ],
  "aggregateRating": {...}
}
```

El problema es que cada `Review` individual necesita su propio `itemReviewed` que especifique QUE esta siendo resenado, incluyendo el `name` y `aggregateRating`.

---

### SOLUCION: Reestructurar el Schema

Cada Review debe incluir `itemReviewed`:

```json
{
  "@type": "Review",
  "itemReviewed": {
    "@type": "EducationalOrganization",
    "name": "Academia Detail",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "6",
      "bestRating": "5",
      "worstRating": "1"
    }
  },
  "author": {...},
  "reviewRating": {...},
  "reviewBody": "..."
}
```

---

### CAMBIO TECNICO

**Archivo:** `src/components/home/TestimonialsSection.tsx`

**Schema Actual (lineas 90-122):**
```typescript
const reviewsSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Academia Detailing - Detail Park",
  "url": "https://academiadetail.com",
  "review": testimonials.map((t) => ({
    "@type": "Review",
    "author": {...},
    "reviewRating": {...},
    "reviewBody": t.text,
    "datePublished": t.date
  })),
  "aggregateRating": {...}
};
```

**Schema Corregido:**
```typescript
// Objeto reutilizable para itemReviewed
const itemReviewed = {
  "@type": "EducationalOrganization",
  "name": "Academia Detail",
  "url": "https://academiadetail.com",
  "image": "https://academiadetail.com/og-image.png",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": averageRating,
    "reviewCount": String(testimonials.length),
    "bestRating": "5",
    "worstRating": "1"
  }
};

// Array de Reviews individuales, cada una con itemReviewed
const reviewsSchema = testimonials.map((t) => ({
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": itemReviewed,
  "author": {
    "@type": "Person",
    "name": t.name
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": t.rating,
    "bestRating": 5,
    "worstRating": 1
  },
  "reviewBody": t.text,
  "datePublished": t.date
}));
```

---

### CAMBIOS EN HELMET

Actualmente se inyecta un solo script JSON-LD. Tras el cambio, se inyectaran multiples scripts (uno por Review):

```tsx
<Helmet>
  {reviewsSchema.map((review, index) => (
    <script key={index} type="application/ld+json">
      {JSON.stringify(review)}
    </script>
  ))}
</Helmet>
```

---

### ARCHIVO A MODIFICAR

| Archivo | Cambio |
|---------|--------|
| `src/components/home/TestimonialsSection.tsx` | Reestructurar schema para incluir `itemReviewed` en cada Review |

---

### VALIDACION POST-IMPLEMENTACION

1. **Publicar los cambios** en produccion
2. **Validar con Rich Results Test**: https://search.google.com/test/rich-results
3. **Re-indexar en Search Console**: 
   - Ir a URL Inspection
   - Ingresar `https://academiadetail.com`
   - Solicitar indexacion
4. **Esperar 24-48 horas** para que Google procese los cambios

---

### RESULTADO ESPERADO

Antes:
- 6 errores de "Elemento sin nombre"
- 6 errores de "Varias resenas sin aggregateRating"

Despues:
- 0 errores
- 6 Reviews validas con rich snippets potenciales


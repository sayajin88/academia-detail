

## Plan: Mejora Integral de Rich Snippets y Presencia en Google

### ANALISIS DEL ESTADO ACTUAL

**Ya implementado:**
- Schema Course con AggregateRating (parcialmente)
- Schema LocalBusiness/EducationalOrganization
- Schema FAQ en paginas de formacion
- Schema BreadcrumbList basico
- Open Graph y Twitter Cards basicos

**Problemas detectados:**
1. Los breadcrumbs no se muestran visualmente (memory indica que fueron removidos)
2. Meta descriptions no tienen CTAs agresivos
3. Falta schema Organization con sameAs para perfiles sociales en todas las paginas
4. Open Graph images no tienen dimensiones especificadas
5. Faltan meta tags de precios para rich snippets de productos

---

### CAMBIOS PROPUESTOS

#### 1. Mejorar Meta Titles con Power Words y CTAs

| Pagina | Actual | Propuesto |
|--------|--------|-----------|
| Home | "Cursos de Detailing y Pulido de Coches \| Escuela de Detailing Espana" | "Cursos de Detailing Profesional 2026 \| 100% Practico en Alicante \| ★4.9" |
| Detailing | "Certificacion Profesional de Detailing \| Curso Intensivo en Espana" | "Curso de Pulido y Ceramico [4 Dias] \| Certificacion + Bolsa Empleo \| ★4.9" |
| Carrera | "Como Montar un Lavadero de Coches \| Formacion Completa Detailing" | "Monta Tu Centro de Detailing \| Formacion Completa 1 Mes \| Desde 9.997€" |
| Jornada Zero | "Jornada Zero Detailing ▷ Prueba el Oficio en un Taller Real" | "Jornada Zero Detailing [97€] \| Prueba Antes de Invertir \| Solo 10 Plazas" |

---

#### 2. Meta Descriptions con CTAs Comerciales

**Archivo:** `src/utils/seoConfig.ts`

```typescript
// Ejemplo Home:
description: "✅ Cursos de detailing 100% practicos en taller real de Alicante. Pulido, tratamiento ceramico, PPF y wrapping. ⭐ +170 alumnos certificados. ➤ Reserva tu plaza ahora - Grupos de max 3 personas."

// Ejemplo Curso Detailing:
description: "Domina el pulido profesional y tratamiento ceramico en 4 dias intensivos. ✅ Certificacion oficial + Bolsa de empleo. ⭐ Valoracion 4.9/5. ➤ ¡Solo 3 plazas por curso!"

// Ejemplo Carrera:
description: "🔥 Programa completo para montar tu lavadero de coches: 4 certificaciones + modulo de negocio exclusivo. Inversion desde 9.997€. ➤ Solicita info sin compromiso."
```

---

#### 3. Schema Organization Centralizado con sameAs

**Archivo:** `src/utils/seoConfig.ts` - Nuevo schema consolidado

```typescript
export const organizationSchemaComplete = {
  "@context": "https://schema.org",
  "@type": ["Organization", "EducationalOrganization", "LocalBusiness"],
  "name": "Academia Detail",
  "alternateName": ["Detail Park", "Academia Detailing"],
  "url": "https://academiadetail.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://academiadetail.com/og-image.png",
    "width": 1200,
    "height": 630
  },
  "image": "https://academiadetail.com/og-image.png",
  "description": "Centro de formacion en detailing profesional...",
  "telephone": "+34 622 773 555",
  "email": "info@detailpark.es",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Calle Metalurgias, 13",
    "addressLocality": "Alicante",
    "addressRegion": "Comunidad Valenciana",
    "postalCode": "03008",
    "addressCountry": "ES"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 38.3452,
    "longitude": -0.4892
  },
  "sameAs": [
    "https://www.instagram.com/detailparkoficial/",
    "https://www.instagram.com/danidetailoficial/",
    "https://www.youtube.com/@detailpark",
    "https://www.facebook.com/detailpark",
    "https://www.tiktok.com/@detailpark"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "170",
    "bestRating": "5",
    "worstRating": "1"
  },
  "priceRange": "€€",
  "openingHoursSpecification": [...],
  "areaServed": {
    "@type": "Country",
    "name": "Spain"
  }
};
```

---

#### 4. Schema Course Mejorado con Offers y Instructor

**Archivo:** `src/utils/seoConfig.ts`

```typescript
export const generateCourseSchemaEnhanced = (course) => ({
  "@context": "https://schema.org",
  "@type": "Course",
  "name": course.name,
  "description": course.description,
  "provider": organizationSchemaComplete,
  "offers": {
    "@type": "Offer",
    "price": course.price,
    "priceCurrency": "EUR",
    "availability": "https://schema.org/LimitedAvailability",
    "validFrom": "2025-01-01",
    "priceValidUntil": "2026-12-31",
    "url": course.url,
    "itemCondition": "https://schema.org/NewCondition",
    "seller": {
      "@type": "Organization",
      "name": "Academia Detail"
    }
  },
  "hasCourseInstance": {
    "@type": "CourseInstance",
    "courseMode": "onsite",
    "courseSchedule": {
      "@type": "Schedule",
      "repeatFrequency": "P1M",
      "repeatCount": 12
    },
    "duration": course.duration,
    "inLanguage": "es",
    "location": {
      "@type": "Place",
      "name": "Academia Detail - Taller Real",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Calle Metalurgias, 13",
        "addressLocality": "Alicante",
        "postalCode": "03008",
        "addressCountry": "ES"
      }
    },
    "instructor": {
      "@type": "Person",
      "name": "Daniel Lopez",
      "jobTitle": "CEO y Formador Principal",
      "description": "Detailer profesional con mas de 15 anos de experiencia"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": course.rating.value,
    "reviewCount": course.rating.count,
    "bestRating": "5",
    "worstRating": "1"
  },
  "educationalCredentialAwarded": "Certificado Profesional Academia Detail",
  "occupationalCredentialAwarded": {
    "@type": "EducationalOccupationalCredential",
    "credentialCategory": "certificate",
    "name": "Certificado de Detailing Profesional"
  }
});
```

---

#### 5. Open Graph Mejorado con Dimensiones

**Archivo:** `src/components/SEO.tsx`

```typescript
// Anadir meta tags OG con dimensiones explicitas
<meta property="og:image" content={image} />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:type" content="image/png" />
<meta property="og:image:alt" content={`${title} - Academia Detail`} />

// Product meta tags para cursos (ayuda con rich snippets)
{type === 'product' && (
  <>
    <meta property="product:price:amount" content={price} />
    <meta property="product:price:currency" content="EUR" />
    <meta property="product:availability" content="in stock" />
  </>
)}
```

---

#### 6. Breadcrumbs Schema en TODAS las Paginas

Aunque los breadcrumbs visuales estan removidos, el schema debe estar presente para que Google muestre la jerarquia en SERPs.

**Archivo:** `src/components/SEO.tsx`

```typescript
// Generar BreadcrumbList automaticamente basado en la URL
const generateAutoBreadcrumbs = (url: string, title: string) => {
  const segments = url.split('/').filter(Boolean);
  const items = [{ name: "Inicio", item: BASE_URL }];
  
  if (segments.length > 0) {
    // Mapeo de URLs a nombres legibles
    const nameMap = {
      'curso-detailing-profesional': 'Curso Detailing',
      'curso-vinilado-vehiculos': 'Curso Wrapping',
      'formacion-profesional-detailing': 'Carrera Detailing',
      // ...
    };
    
    let path = '';
    segments.forEach((segment, i) => {
      path += `/${segment}`;
      items.push({
        name: nameMap[segment] || title,
        item: `${BASE_URL}${path}`
      });
    });
  }
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      "item": item.item
    }))
  };
};
```

---

#### 7. WebPage Schema con speakable para Voice Search

**Archivo:** `src/utils/seoConfig.ts`

```typescript
export const generateWebPageSchema = (page: {
  name: string;
  description: string;
  url: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": page.name,
  "description": page.description,
  "url": `${BASE_URL}${page.url}`,
  "isPartOf": {
    "@type": "WebSite",
    "name": "Academia Detail",
    "url": BASE_URL
  },
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": ["h1", ".hero-description"]
  },
  "mainEntity": {
    "@type": "EducationalOrganization",
    "name": "Academia Detail"
  }
});
```

---

### ARCHIVOS A MODIFICAR

| Archivo | Cambios |
|---------|---------|
| `src/utils/seoConfig.ts` | Meta titles/descriptions mejorados, schemas consolidados |
| `src/components/SEO.tsx` | OG dimensions, auto-breadcrumbs, product meta tags |
| `src/pages/Home.tsx` | Schema WebSite actualizado |
| `src/pages/FormationDetail.tsx` | Schema Course mejorado |
| `src/pages/CarreraDetailing.tsx` | Schema Course premium |
| `src/pages/JornadaCero.tsx` | Schema Event + Course |
| `src/pages/Contact.tsx` | Schema ContactPage mejorado |
| `src/pages/AboutUs.tsx` | Schema AboutPage + Organization |

---

### RESULTADO ESPERADO EN GOOGLE

**ANTES (snippet basico):**
```
Academia Detailing | Cursos Profesionales
academiadetail.com
Centro de formacion lider en detailing profesional...
```

**DESPUES (rich snippet enriquecido):**
```
Cursos de Detailing Profesional 2026 | 100% Practico | ★4.9
academiadetail.com > Cursos > Detailing
★★★★★ Valoracion: 4.9 - 170 resenas - Precio: Desde 2.997€
✅ Cursos 100% practicos en taller real de Alicante. Pulido, tratamiento 
ceramico, PPF y wrapping. +170 alumnos certificados. ➤ Reserva tu plaza...
```

---

### VALIDACION POST-IMPLEMENTACION

1. Publicar los cambios
2. Validar con Rich Results Test: https://search.google.com/test/rich-results
3. Validar Schema: https://validator.schema.org/
4. Solicitar reindexacion en Search Console para cada URL:
   - https://academiadetail.com/
   - https://academiadetail.com/curso-detailing-profesional
   - https://academiadetail.com/formacion-profesional-detailing
   - https://academiadetail.com/curso-detailing-iniciacion
5. Esperar 2-7 dias para ver cambios en SERPs


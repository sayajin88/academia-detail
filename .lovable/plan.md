

## Plan: SERPs Enriquecidas para academiadetail.com

### QUE TIENE LA COMPETENCIA

En la captura del competidor (Instituto Detailing) se ven **sitelinks** bajo el resultado principal:
- "Curso de Detailing en Madrid" (enlace a subpagina)
- "Ver valoracion en video" (enlace a seccion de video)
- "Ver presentacion en video" (enlace a seccion de video)
- "5 Estrellas en Google" (enlace a resenas)

Estos sitelinks los genera Google automaticamente, pero se pueden influenciar con Schema.org y estructura web correcta.

### QUE TIENE YA academiadetail.com

La web ya implementa un buen conjunto de schemas:
- LocalBusiness + EducationalOrganization
- Course con Offers (precio, disponibilidad)
- FAQPage en paginas de cursos y home
- Review individuales con itemReviewed
- BreadcrumbList auto-generado
- WebSite con SearchAction
- WebPage con Speakable
- Open Graph completo
- Hreflang multi-region

### QUE FALTA PARA CONSEGUIR SERPs ENRIQUECIDAS COMO LA COMPETENCIA

---

### PASO 1: Schema SiteNavigationElement (Sitelinks)

Los sitelinks del competidor aparecen porque Google entiende la estructura de navegacion. Necesitamos anadir un schema `SiteNavigationElement` en la pagina principal.

**Archivo:** `src/utils/seoConfig.ts`

Anadir un nuevo schema al array de la home:

```text
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    {
      "@type": "SiteNavigationElement",
      "position": 1,
      "name": "Curso de Detailing Profesional",
      "description": "Pulido, correccion y ceramicos en 4 dias",
      "url": "https://academiadetail.com/curso-detailing-profesional"
    },
    {
      "@type": "SiteNavigationElement",
      "position": 2,
      "name": "Curso de Car Wrapping",
      "description": "Vinilado profesional de vehiculos",
      "url": "https://academiadetail.com/curso-vinilado-vehiculos"
    },
    ...mas enlaces
  ]
}
```

Esto indica explicitamente a Google cuales son las subpaginas mas importantes del sitio.

---

### PASO 2: Schema VideoObject (Rich Snippets de Video)

El competidor tiene "Ver valoracion en video" y "Ver presentacion en video" como sitelinks. Esto se logra con schemas `VideoObject` en las paginas que contienen testimonios en video.

**Archivos a modificar:**
- `src/components/formation/FormationVideoTestimonials.tsx`
- `src/pages/JornadaCero.tsx`
- `src/pages/CarreraDetailing.tsx`

Para cada video de YouTube incrustado, anadir:

```text
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Testimonio alumno - Curso Detailing",
  "description": "Experiencia real de un alumno graduado",
  "thumbnailUrl": "https://i.ytimg.com/vi/{VIDEO_ID}/maxresdefault.jpg",
  "uploadDate": "2025-06-01",
  "contentUrl": "https://www.youtube.com/watch?v={VIDEO_ID}",
  "embedUrl": "https://www.youtube.com/embed/{VIDEO_ID}",
  "duration": "PT3M",
  "publisher": {
    "@type": "Organization",
    "name": "Academia Detail"
  }
}
```

Esto permite que Google muestre miniaturas de video junto al resultado y puede generar sitelinks tipo "Ver testimonio en video".

---

### PASO 3: Schema ItemList para Cursos (Carrusel en Google)

Anadir un `ItemList` de cursos en la Home para que Google pueda mostrar un carrusel de cursos directamente en los resultados de busqueda.

**Archivo:** `src/utils/seoConfig.ts` (schema de la home)

```text
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Course",
        "name": "Curso de Detailing Profesional",
        "url": "https://academiadetail.com/curso-detailing-profesional",
        "description": "...",
        "provider": { "@type": "Organization", "name": "Academia Detail" },
        "offers": { "@type": "Offer", "price": "2997", "priceCurrency": "EUR" }
      }
    },
    ... mas cursos
  ]
}
```

---

### PASO 4: Secciones con Anclajes Nombrados (Anchor Links)

Google genera sitelinks como "Ver valoracion en video" cuando detecta secciones claramente identificables dentro de una pagina. Necesitamos anadir `id` a las secciones clave.

**Archivos a modificar:**
- `src/components/formation/FormationVideoTestimonials.tsx` - anadir `id="testimonios-video"`
- `src/components/formation/FormationPricing.tsx` - anadir `id="precios"`
- `src/components/formation/FormationFAQ.tsx` - anadir `id="preguntas-frecuentes"`
- `src/components/formation/FormationCertification.tsx` - anadir `id="certificacion"`
- `src/components/home/TestimonialsSection.tsx` - anadir `id="opiniones"`
- `src/components/home/HomeFAQ.tsx` - anadir `id="faq"`

Tambien necesitamos anadir links internos (anclas) en la pagina que apunten a estas secciones. Esto ayuda a Google a identificarlas como "secciones de interes" y mostrarlas como sitelinks.

---

### PASO 5: Schema AggregateRating Mejorado (Estrellas en SERP)

El competidor muestra "5 Estrellas en Google" como sitelink, lo que sugiere que tiene reviews de Google My Business vinculadas. Nosotros ya tenemos `AggregateRating` en los schemas, pero podemos mejorarlo:

**Archivo:** `src/utils/seoConfig.ts`

Asegurarnos de que el schema `Course` en cada pagina de formacion incluye un `aggregateRating` con datos completos y que el `LocalBusiness` tambien lo tiene. Ya esta implementado, pero verificaremos que todos los valores sean consistentes y reales.

Ademas, mover las reviews reales (actualmente solo como texto en el componente) a un schema `Review` en las paginas de cursos individuales, no solo en la home.

---

### PASO 6: Schema EducationalOccupationalProgram (Para Carrera Detailing)

Para la pagina de "Carrera Detailing" (programa completo de 1 mes), anadir un schema mas especifico que `Course`:

**Archivo:** `src/utils/seoConfig.ts` (config de carreraDetailing)

```text
{
  "@context": "https://schema.org",
  "@type": "EducationalOccupationalProgram",
  "name": "Formacion Profesional Detailing",
  "description": "Programa completo de 1 mes...",
  "timeToComplete": "P30D",
  "occupationalCredentialAwarded": {
    "@type": "EducationalOccupationalCredential",
    "credentialCategory": "certificate",
    "name": "4 Certificaciones Profesionales"
  },
  "programPrerequisites": "Sin experiencia previa necesaria",
  "numberOfCredits": { "@type": "StructuredValue", "value": 4 },
  "offers": { ... },
  "provider": { ... }
}
```

---

### PASO 7: Mejorar el Sitemap con Fechas Reales

El sitemap actual tiene `lastmod: 2026-01-18` para todas las paginas. Google valora los sitemaps con fechas de modificacion reales y diferenciadas.

**Archivo:** `public/sitemap.xml`

Actualizar con fechas mas recientes y diferenciadas, anadir la pagina de galeria (ahora quienes-somos) si no esta.

---

### RESUMEN DE ARCHIVOS A MODIFICAR

| Archivo | Cambio |
|---------|--------|
| `src/utils/seoConfig.ts` | Anadir SiteNavigationElement, ItemList de cursos, VideoObject generator, EducationalOccupationalProgram |
| `src/components/formation/FormationVideoTestimonials.tsx` | Anadir schema VideoObject para cada video + id="testimonios-video" |
| `src/components/formation/FormationPricing.tsx` | Anadir id="precios" al section |
| `src/components/formation/FormationFAQ.tsx` | Anadir id="preguntas-frecuentes" al section |
| `src/components/formation/FormationCertification.tsx` | Anadir id="certificacion" al section |
| `src/components/home/TestimonialsSection.tsx` | Anadir id="opiniones" al section + reviews schema en cursos |
| `src/components/home/HomeFAQ.tsx` | Anadir id="faq" al section |
| `src/pages/CarreraDetailing.tsx` | Incluir VideoObject schemas |
| `public/sitemap.xml` | Actualizar fechas lastmod |

### NOTA IMPORTANTE

Los sitelinks de Google son **algoritmicos**: no se pueden forzar, solo influenciar. Los cambios propuestos maximizan las probabilidades de que Google los muestre, pero el resultado depende de:
1. La autoridad del dominio (backlinks, antiguedad)
2. El trafico real al sitio
3. El CTR en los resultados de busqueda
4. La indexacion correcta de todas las paginas

Tras implementar los cambios, hay que esperar entre 2 y 6 semanas para ver resultados en Google Search Console.


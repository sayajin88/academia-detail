import { localBusinessSchema } from '@/components/SEO';

const BASE_URL = 'https://academiadetail.com';

// Enhanced Course Schema Generator with AggregateRating and improved Offers
export const generateCourseSchema = (course: {
  name: string;
  description: string;
  price: number;
  duration?: string;
  url: string;
  image?: string;
  rating?: { value: string; count: string };
}) => ({
  "@context": "https://schema.org",
  "@type": "Course",
  "name": course.name,
  "description": course.description,
  "provider": {
    "@type": "EducationalOrganization",
    "name": "Academia Detail",
    "description": "Formación en taller 100% real con visión empresarial",
    "url": BASE_URL,
    "logo": `${BASE_URL}/og-image.png`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Calle Metalurgias, 13",
      "addressLocality": "Alicante",
      "postalCode": "03008",
      "addressCountry": "ES"
    }
  },
  "offers": {
    "@type": "Offer",
    "price": course.price,
    "priceCurrency": "EUR",
    "availability": "https://schema.org/InStock",
    "priceValidUntil": "2026-12-31",
    "itemCondition": "https://schema.org/NewCondition",
    "url": `${BASE_URL}${course.url}`
  },
  "hasCourseInstance": {
    "@type": "CourseInstance",
    "courseMode": "onsite",
    "duration": course.duration || "P5D",
    "inLanguage": "es",
    "courseWorkload": "PT40H"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": course.rating?.value || "4.9",
    "reviewCount": course.rating?.count || "50",
    "bestRating": "5",
    "worstRating": "1"
  },
  "coursePrerequisites": "Sin experiencia previa necesaria",
  "educationalCredentialAwarded": "Certificado Academia Detail",
  "teaches": [
    `Técnicas profesionales de ${course.name}`,
    "Gestión de clientes y presupuestos",
    "Visión de negocio y rentabilidad"
  ],
  ...(course.image && { "image": course.image })
});

// Event Schema Generator
export const generateEventSchema = (event: {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  price: number;
  location?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "EducationEvent",
  "name": event.name,
  "description": event.description,
  "startDate": event.startDate,
  "endDate": event.endDate,
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "location": {
    "@type": "Place",
    "name": event.location || "Academia Detail - Taller 100% Real",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Calle Metalurgias, 13",
      "addressLocality": "Alicante",
      "postalCode": "03008",
      "addressCountry": "ES"
    }
  },
  "organizer": {
    "@type": "Organization",
    "name": "Academia Detail",
    "url": BASE_URL
  },
  "offers": {
    "@type": "Offer",
    "price": event.price,
    "priceCurrency": "EUR",
    "availability": "https://schema.org/LimitedAvailability",
    "validFrom": "2025-01-01",
    "priceValidUntil": "2026-12-31"
  }
});

// FAQ Schema Generator
export const generateFAQSchema = (faqs: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

// BreadcrumbList Schema Generator
export const generateBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": `${BASE_URL}${item.url}`
  }))
});

// EducationalOrganization Schema for homepage
export const educationalOrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Academia Detail",
  "alternateName": "Detail Park - Taller y Academia",
  "slogan": "No enseñamos a lavar coches, formamos empresarios del Detailing",
  "url": BASE_URL,
  "logo": `${BASE_URL}/og-image.png`,
  "description": "El ÚNICO centro de formación en detailing que opera en un taller 100% real con clientes de alta gama. Aprende técnica Y negocio desde el día 1.",
  "foundingDate": "2017",
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
  "telephone": "+34 622 773 555",
  "email": "info@detailpark.es",
  "sameAs": [
    "https://www.instagram.com/detailparkoficial/",
    "https://www.instagram.com/danidetailoficial/",
    "https://www.youtube.com/@detailpark"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "127",
    "bestRating": "5"
  },
  "knowsAbout": [
    "Detailing Profesional",
    "Gestión de Negocio Detailing",
    "PPF Installation",
    "Car Wrapping",
    "Presupuestación de Servicios",
    "Captación de Clientes VIP",
    "Cálculo de Márgenes",
    "Escalado de Negocios"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Cursos de Detailing Profesional",
    "itemListElement": [
      {
        "@type": "Course",
        "name": "Curso Detailing Profesional",
        "description": "Formación completa en lavado, descontaminación, pulido y protección cerámica"
      },
      {
        "@type": "Course",
        "name": "Curso Car Wrapping",
        "description": "Instalación profesional de vinilo y cambio de color"
      },
      {
        "@type": "Course",
        "name": "Curso PPF",
        "description": "Instalación de Paint Protection Film en vehículos de alta gama"
      },
      {
        "@type": "Course",
        "name": "Curso Restauración",
        "description": "Técnicas avanzadas de restauración de vehículos clásicos y dañados"
      }
    ]
  }
};

// Slug mapping from old to new
const slugMapping: Record<string, string> = {
  'detailing': 'curso-detailing-profesional',
  'wrapping': 'curso-vinilado-vehiculos',
  'ppf': 'curso-ppf-proteccion-pintura',
  'restauracion': 'curso-restauracion-vehiculos',
  // New slugs map to themselves
  'curso-detailing-profesional': 'curso-detailing-profesional',
  'curso-vinilado-vehiculos': 'curso-vinilado-vehiculos',
  'curso-ppf-proteccion-pintura': 'curso-ppf-proteccion-pintura',
  'curso-restauracion-vehiculos': 'curso-restauracion-vehiculos',
};

// Normalize slug (handles both old and new formats)
const normalizeSlug = (slug: string): string => {
  return slugMapping[slug] || slug;
};

// SEO Configuration for each page
export const seoConfig = {
  home: {
    title: "Academia Detail ▷ Único Centro con Taller Real y Mente de Empresario",
    description: "✅ Olvida las aulas vacías. Aprende Detailing y Gestión de Negocio en un taller 100% operativo. ⭐ Domina el pulido, PPF y Wrapping con visión de rentabilidad.",
    keywords: "curso detailing taller real, formación detailing empresario, academia detailing profesional, aprender detailing con clientes reales, montar negocio detailing, taller operativo detailing, centro formación detailing España",
    url: "/",
    schema: [
      localBusinessSchema,
      educationalOrganizationSchema,
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Academia Detail",
        "url": BASE_URL,
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${BASE_URL}/buscar?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      },
      generateBreadcrumbSchema([
        { name: "Inicio", url: "/" }
      ])
    ]
  },

  jornadaCero: {
    title: "Jornada Zero Detailing ▷ Prueba el Oficio en un Taller Real",
    description: "🚀 Tu primer contacto con el detailing profesional por muy poco. Accede a herramientas de élite, toca máquinas reales y descubre si tienes mente de empresario. 🛠️",
    keywords: "jornada zero detailing, probar detailing barato, experiencia detailing inmersión, curso detailing económico, primer contacto detailing profesional, prueba antes de invertir detailing",
    url: "/curso-detailing-iniciacion",
    schema: [
      localBusinessSchema,
      {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": "Jornada Zero - Experiencia de Inmersión Detailing",
        "description": "Tu primer contacto con el detailing profesional en un taller 100% real. 1 día de experiencia práctica para descubrir si tienes mentalidad de empresario.",
        "provider": {
          "@type": "EducationalOrganization",
          "name": "Academia Detail",
          "url": BASE_URL
        },
        "offers": {
          "@type": "Offer",
          "price": "97",
          "priceCurrency": "EUR",
          "availability": "https://schema.org/LimitedAvailability",
          "priceValidUntil": "2026-12-31"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "50",
          "bestRating": "5"
        },
        "hasCourseInstance": {
          "@type": "CourseInstance",
          "courseMode": "onsite",
          "duration": "P1D",
          "inLanguage": "es"
        }
      },
      generateEventSchema({
        name: "Jornada Zero - Experiencia de Inmersión Detailing",
        description: "Tu primer contacto con el detailing profesional. 1 día de experiencia práctica en taller real con herramientas profesionales.",
        startDate: "2026-01-17T10:00:00+01:00",
        endDate: "2026-01-17T18:00:00+01:00",
        price: 97,
        location: "Academia Detail - Taller 100% Real"
      }),
      generateBreadcrumbSchema([
        { name: "Inicio", url: "/" },
        { name: "Jornada Zero Detailing", url: "/curso-detailing-iniciacion" }
      ])
    ]
  },

  carreraDetailing: {
    title: "Formación Profesional Detailing ▷ Taller Real + Mentalidad Empresario",
    description: "🔥 El único programa donde aprendes técnica Y negocio. 4 certificaciones + módulo empresarial en taller 100% operativo. ➤ Clientes reales desde el día 1.",
    keywords: "formación profesional detailing, montar centro detailing, emprender detailing, abrir taller detailing, negocio detailing rentable, ser empresario detailing, carrera detailing completa, formación completa detailing con negocio",
    url: "/formacion-profesional-detailing",
    schema: [
      localBusinessSchema,
      generateCourseSchema({
        name: "Formación Profesional Detailing - Monta tu Centro de Detailing",
        description: "Programa premium de formación profesional en detailing. Formación intensiva con 4 certificaciones profesionales: Detailing, Wrapping, PPF y Restauración, más módulo de negocio exclusivo.",
        price: 9997,
        duration: "P30D",
        url: "/formacion-profesional-detailing",
        rating: { value: "4.9", count: "89" }
      }),
      generateBreadcrumbSchema([
        { name: "Inicio", url: "/" },
        { name: "Formación Profesional Detailing", url: "/formacion-profesional-detailing" }
      ])
    ]
  },

  aboutUs: {
    title: "Quiénes Somos | Academia Detail | Taller Real desde 2017",
    description: "✅ Conoce la historia de Academia Detail. Fundada en 2017, somos el único centro de formación en detailing que vive del taller, no de la formación. +7 años de experiencia real.",
    keywords: "quienes somos academia detailing, historia detail park, centro formacion detailing españa, escuela detailing alicante, curso detailing profesional taller real",
    url: "/quienes-somos",
    schema: [
      localBusinessSchema,
      {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "name": "Quiénes Somos - Academia Detail",
        "description": "Historia y filosofía de Academia Detail. Fundada en 2017, somos el único centro de formación donde vivimos del detailing profesional.",
        "url": `${BASE_URL}/quienes-somos`,
        "mainEntity": {
          "@type": "Organization",
          "name": "Academia Detail",
          "foundingDate": "2017",
          "founder": {
            "@type": "Person",
            "name": "Juan Daniel"
          },
          "description": "Centro de formación en detailing profesional potenciado por un taller activo de detailing de alta gama."
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "ImageGallery",
        "name": "Galería de Trabajos de Detailing Profesional",
        "description": "Portfolio de trabajos profesionales de detailing, wrapping, PPF y restauración realizados en vehículos de alta gama.",
        "url": `${BASE_URL}/quienes-somos`
      },
      generateBreadcrumbSchema([
        { name: "Inicio", url: "/" },
        { name: "Quiénes Somos", url: "/quienes-somos" }
      ])
    ]
  },

  contact: {
    title: "Contacto | Academia Detail Alicante | Reserva tu Plaza",
    description: "✅ Contacta con Academia Detail en Alicante. Información sobre cursos de detailing en taller real, wrapping, PPF y restauración. ➤ Reserva tu plaza ahora.",
    keywords: "academia detailing Alicante, cursos detailing Valencia, formación detailing España, contacto academia detailing, reservar curso detailing taller real",
    url: "/contacto",
    schema: [
      localBusinessSchema,
      {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contacto Academia Detail - Alicante",
        "description": "Página de contacto de Academia Detail para información sobre cursos de detailing profesional en Alicante y Valencia.",
        "url": `${BASE_URL}/contacto`
      },
      generateBreadcrumbSchema([
        { name: "Inicio", url: "/" },
        { name: "Contacto", url: "/contacto" }
      ])
    ]
  },

  // Formation pages SEO config generator
  getFormationSEO: (slug: string, formation: {
    title: string;
    description: string;
    price: number;
    duration: string;
    faqs: { question: string; answer: string }[];
  }) => {
    // Normalize the slug to handle both old and new formats
    const normalizedSlug = normalizeSlug(slug);
    
    const formationKeywords: Record<string, string> = {
      'curso-detailing-profesional': "curso detailing profesional taller real, aprender detailing con clientes, curso detailing desde cero, formación pulido profesional, curso pulido coche certificado, corrección pintura negocio",
      'curso-vinilado-vehiculos': "curso vinilado vehículos profesional, curso car wrapping negocio, rotulación coches formación, forrado vehículos curso, wrap coche taller real, cambio color coche rentable",
      'curso-ppf-proteccion-pintura': "curso PPF taller real, curso protección pintura profesional, PPF instalador certificado España, proteger pintura coche negocio, film transparente formación práctica",
      'curso-restauracion-vehiculos': "curso restauración vehículos profesional, restaurar coches clásicos negocio, curso chapa y pintura, reparar pintura coche formación taller real"
    };

    const formationTitles: Record<string, string> = {
      'curso-detailing-profesional': "Detailing Profesional 【 Taller Real 】 Academia Detail",
      'curso-vinilado-vehiculos': "Car Wrapping Profesional 【 Taller Real 】 Academia Detail",
      'curso-ppf-proteccion-pintura': "PPF Protección Pintura 【 Taller Real 】 Academia Detail",
      'curso-restauracion-vehiculos': "Restauración Vehículos 【 Taller Real 】 Academia Detail"
    };

    const formationDescriptions: Record<string, string> = {
      'curso-detailing-profesional': "🚀 Especialízate en Detailing Profesional. No solo técnica: aprende a presupuestar, gestionar clientes y escalar tu negocio. ➤ Prácticas reales en taller operativo.",
      'curso-vinilado-vehiculos': "🚀 Especialízate en Car Wrapping. No solo técnica: aprende a presupuestar, gestionar clientes y escalar tu negocio. ➤ Prácticas reales en taller operativo.",
      'curso-ppf-proteccion-pintura': "🚀 Especialízate en PPF (Paint Protection Film). No solo técnica: aprende a presupuestar, gestionar clientes y escalar tu negocio. ➤ Prácticas reales.",
      'curso-restauracion-vehiculos': "🚀 Especialízate en Restauración de Vehículos. No solo técnica: aprende a presupuestar, gestionar clientes y escalar tu negocio. ➤ Prácticas reales."
    };

    const formationNames: Record<string, string> = {
      'curso-detailing-profesional': "Curso Detailing Profesional",
      'curso-vinilado-vehiculos': "Curso Car Wrapping Profesional",
      'curso-ppf-proteccion-pintura': "Curso PPF Protección Pintura",
      'curso-restauracion-vehiculos': "Curso Restauración Vehículos"
    };

    // Course ratings data
    const courseRatings: Record<string, { value: string; count: string }> = {
      'curso-detailing-profesional': { value: "4.9", count: "127" },
      'curso-vinilado-vehiculos': { value: "4.8", count: "89" },
      'curso-ppf-proteccion-pintura': { value: "4.9", count: "67" },
      'curso-restauracion-vehiculos': { value: "4.7", count: "45" }
    };

    return {
      title: formationTitles[normalizedSlug] || `${formation.title} Profesional 【 Taller Real 】 Academia Detail`,
      description: formationDescriptions[normalizedSlug] || `🚀 Especialízate en ${formation.title}. No solo técnica: aprende a presupuestar, gestionar clientes y escalar tu negocio. ➤ Prácticas reales.`,
      keywords: formationKeywords[normalizedSlug] || "curso detailing profesional taller real, formación automotriz con negocio",
      url: `/${normalizedSlug}`,
      schema: [
        localBusinessSchema,
        generateCourseSchema({
          name: formationNames[normalizedSlug] || formation.title,
          description: formationDescriptions[normalizedSlug] || formation.description,
          price: formation.price,
          duration: formation.duration,
          url: `/${normalizedSlug}`,
          rating: courseRatings[normalizedSlug]
        }),
        generateFAQSchema(formation.faqs.slice(0, 5)),
        generateBreadcrumbSchema([
          { name: "Inicio", url: "/" },
          { name: "Formaciones", url: "/#formaciones" },
          { name: formationNames[normalizedSlug] || formation.title, url: `/${normalizedSlug}` }
        ])
      ]
    };
  }
};

export default seoConfig;
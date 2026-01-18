import { localBusinessSchema } from '@/components/SEO';

const BASE_URL = 'https://detailing-ignition-landing.lovable.app';

// Course Schema Generator
export const generateCourseSchema = (course: {
  name: string;
  description: string;
  price: number;
  duration?: string;
  url: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Course",
  "name": course.name,
  "description": course.description,
  "provider": {
    "@type": "Organization",
    "name": "Detail Park Academy",
    "sameAs": BASE_URL
  },
  "offers": {
    "@type": "Offer",
    "price": course.price,
    "priceCurrency": "EUR",
    "availability": "https://schema.org/InStock",
    "url": `${BASE_URL}${course.url}`
  },
  ...(course.duration && { "timeRequired": course.duration })
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
    "name": event.location || "Detail Park",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "ES"
    }
  },
  "organizer": {
    "@type": "Organization",
    "name": "Detail Park Academy",
    "url": BASE_URL
  },
  "offers": {
    "@type": "Offer",
    "price": event.price,
    "priceCurrency": "EUR",
    "availability": "https://schema.org/LimitedAvailability",
    "validFrom": "2025-01-01"
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
    title: "Cursos Detailing España | Aprende Detailing Profesional | Detail Park Academy",
    description: "Academia de detailing profesional en España. Cursos de detailing, car wrapping, PPF y restauración. Aprende detailing desde cero y monta tu centro de detailing. ¡Reserva ya!",
    keywords: "cursos detailing España, aprender detailing, montar centro detailing, escuela detailing España, curso detailing profesional, academia detailing Alicante, formación detailing, car wrapping curso, PPF formación",
    url: "/",
    schema: [
      localBusinessSchema,
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Detail Park Academy",
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
    title: "Curso Detailing Iniciación 1 Día | Aprende Detailing desde Cero | Detail Park",
    description: "Curso de detailing iniciación intensivo de 1 día. Aprende detailing profesional con práctica real. Solo 10 plazas. Incluye comida y materiales. ¡Ideal para probar antes de invertir!",
    keywords: "curso detailing iniciación, curso detailing 1 día, aprender detailing desde cero, primera experiencia detailing, evento detailing, taller detailing intensivo, formación detailing práctica, curso detailing principiantes",
    url: "/curso-detailing-iniciacion",
    schema: [
      localBusinessSchema,
      generateEventSchema({
        name: "Curso Detailing Iniciación - Aprende desde Cero en 1 Día",
        description: "Curso de detailing intensivo de 1 día para principiantes. Aprende técnicas de lavado, descontaminación y pulido con práctica real en taller profesional.",
        startDate: "2026-01-17T10:00:00+01:00",
        endDate: "2026-01-17T18:00:00+01:00",
        price: 97,
        location: "Detail Park Academy"
      }),
      generateBreadcrumbSchema([
        { name: "Inicio", url: "/" },
        { name: "Curso Detailing Iniciación", url: "/curso-detailing-iniciacion" }
      ])
    ]
  },

  carreraDetailing: {
    title: "Formación Profesional Detailing | Monta tu Centro de Detailing | Detail Park",
    description: "Programa premium de formación profesional en detailing. 4 certificaciones en 1 mes: Detailing, Wrapping, PPF y Restauración. Formación completa para emprender en detailing.",
    keywords: "formación profesional detailing, montar centro detailing, emprender detailing, abrir taller detailing, negocio detailing, ser empresario detailing, carrera detailing, formación completa detailing, certificación detailing España",
    url: "/formacion-profesional-detailing",
    schema: [
      localBusinessSchema,
      generateCourseSchema({
        name: "Formación Profesional Detailing - Monta tu Centro de Detailing",
        description: "Programa premium de formación profesional en detailing. Formación intensiva con 4 certificaciones profesionales: Detailing, Wrapping, PPF y Restauración, más módulo de negocio.",
        price: 4997,
        duration: "P30D",
        url: "/formacion-profesional-detailing"
      }),
      generateBreadcrumbSchema([
        { name: "Inicio", url: "/" },
        { name: "Formación Profesional Detailing", url: "/formacion-profesional-detailing" }
      ])
    ]
  },

  aboutUs: {
    title: "Quiénes Somos | Academia Detail by Detail Park | Desde 2017",
    description: "Conoce la historia de Detail Park y Academia Detail. Fundada en 2017 por Juan Daniel, somos el único centro de formación en detailing que vive del taller, no de la formación. +7 años de experiencia real.",
    keywords: "quienes somos detail park, academia detail historia, juan daniel fundador, centro formacion detailing españa, escuela detailing alicante, curso detailing profesional, detail park historia",
    url: "/quienes-somos",
    schema: [
      localBusinessSchema,
      {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "name": "Quiénes Somos - Academia Detail by Detail Park",
        "description": "Historia y filosofía de Detail Park y Academia Detail. Fundada en 2017, somos el único centro de formación donde vivimos del detailing profesional.",
        "url": `${BASE_URL}/quienes-somos`,
        "mainEntity": {
          "@type": "Organization",
          "name": "Detail Park Academy",
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
        "description": "Portfolio de trabajos profesionales de detailing, wrapping, PPF y restauración realizados por Detail Park en vehículos de alta gama.",
        "url": `${BASE_URL}/quienes-somos`
      },
      generateBreadcrumbSchema([
        { name: "Inicio", url: "/" },
        { name: "Quiénes Somos", url: "/quienes-somos" }
      ])
    ]
  },

  contact: {
    title: "Contacto | Academia Detailing Alicante | Detail Park",
    description: "Contacta con Detail Park Academy en Alicante. Información sobre cursos de detailing, wrapping, PPF y restauración. Reserva tu plaza en cursos de formación profesional.",
    keywords: "academia detailing Alicante, cursos detailing Valencia, formación detailing España, contacto detail park, reservar curso detailing, información cursos detailing",
    url: "/contacto",
    schema: [
      localBusinessSchema,
      {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contacto Detail Park Academy - Academia Detailing Alicante",
        "description": "Página de contacto de Detail Park Academy para información sobre cursos de detailing profesional en Alicante y Valencia.",
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
      'curso-detailing-profesional': "curso detailing profesional, aprender detailing, curso detailing desde cero, formación pulido profesional, curso pulido coche certificado, corrección pintura, protección cerámica curso",
      'curso-vinilado-vehiculos': "curso vinilado vehículos, curso car wrapping, rotulación coches formación, forrado vehículos curso, wrap coche profesional, cambio color coche, instalador vinilo certificado",
      'curso-ppf-proteccion-pintura': "curso PPF, curso protección pintura, PPF instalador certificado España, proteger pintura coche curso, film transparente formación, paint protection film curso",
      'curso-restauracion-vehiculos': "curso restauración vehículos, restaurar coches clásicos curso, curso chapa y pintura, reparar pintura coche formación, restauración coches dañados"
    };

    const formationTitles: Record<string, string> = {
      'curso-detailing-profesional': "Curso Detailing Profesional | Aprende Pulido y Corrección de Pintura",
      'curso-vinilado-vehiculos': "Curso Vinilado Vehículos | Formación Car Wrapping Certificada",
      'curso-ppf-proteccion-pintura': "Curso PPF Protección Pintura | Paint Protection Film Certificado",
      'curso-restauracion-vehiculos': "Curso Restauración Vehículos | Coches Clásicos y Dañados"
    };

    const formationDescriptions: Record<string, string> = {
      'curso-detailing-profesional': "Curso de detailing profesional 100% práctico. Aprende detailing desde cero: lavado, descontaminación, pulido y protección cerámica. Certificado oficial.",
      'curso-vinilado-vehiculos': "Curso de vinilado de vehículos profesional. Aprende instalación de vinilo, rotulación vehículos y cambio de color. Formación práctica con certificado.",
      'curso-ppf-proteccion-pintura': "Curso de PPF (Paint Protection Film) profesional. Aprende instalación de lámina de protección de pintura en vehículos de alta gama. Certificación oficial España.",
      'curso-restauracion-vehiculos': "Curso de restauración de vehículos profesional. Aprende a restaurar coches clásicos y dañados. Técnicas de chapa, pintura y acabado. Certificado."
    };

    const formationNames: Record<string, string> = {
      'curso-detailing-profesional': "Curso Detailing Profesional",
      'curso-vinilado-vehiculos': "Curso Vinilado Vehículos",
      'curso-ppf-proteccion-pintura': "Curso PPF Protección Pintura",
      'curso-restauracion-vehiculos': "Curso Restauración Vehículos"
    };

    return {
      title: `${formationTitles[normalizedSlug] || formation.title} | Detail Park`,
      description: formationDescriptions[normalizedSlug] || formation.description.substring(0, 155) + "...",
      keywords: formationKeywords[normalizedSlug] || "curso detailing profesional, formación automotriz",
      url: `/${normalizedSlug}`,
      schema: [
        localBusinessSchema,
        generateCourseSchema({
          name: formationNames[normalizedSlug] || formation.title,
          description: formationDescriptions[normalizedSlug] || formation.description,
          price: formation.price,
          duration: formation.duration,
          url: `/${normalizedSlug}`
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

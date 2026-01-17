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
    title: "Curso Detailing 1 Día | Iniciación Detailing Profesional | Detail Park",
    description: "Curso de detailing intensivo de 1 día. Aprende detailing profesional con práctica real. Solo 10 plazas. Incluye comida y materiales. ¡Ideal para probar antes de invertir!",
    keywords: "curso detailing 1 día, iniciación detailing, aprender detailing rápido, primera experiencia detailing, evento detailing, jornada detailing, taller detailing intensivo, formación detailing práctica",
    url: "/jornada-cero",
    schema: [
      localBusinessSchema,
      generateEventSchema({
        name: "Curso Detailing 1 Día - Iniciación Profesional",
        description: "Curso de detailing intensivo de 1 día. Aprende técnicas de lavado, descontaminación y pulido con práctica real en taller profesional.",
        startDate: "2026-01-17T10:00:00+01:00",
        endDate: "2026-01-17T18:00:00+01:00",
        price: 97,
        location: "Detail Park Academy"
      }),
      generateBreadcrumbSchema([
        { name: "Inicio", url: "/" },
        { name: "Curso Detailing 1 Día", url: "/jornada-cero" }
      ])
    ]
  },

  carreraDetailing: {
    title: "Montar Centro Detailing | Formación Completa + 4 Certificaciones | Detail Park",
    description: "Programa premium para montar tu centro de detailing. 4 certificaciones en 1 mes: Detailing, Wrapping, PPF y Restauración. Formación completa para emprender en detailing.",
    keywords: "montar centro detailing, emprender detailing, abrir taller detailing, negocio detailing, ser empresario detailing, carrera detailing, formación completa detailing, certificación detailing España",
    url: "/carrera-detailing",
    schema: [
      localBusinessSchema,
      generateCourseSchema({
        name: "Carrera Detailing - Montar Centro de Detailing Profesional",
        description: "Programa premium para montar tu centro de detailing. Formación intensiva con 4 certificaciones profesionales: Detailing, Wrapping, PPF y Restauración, más módulo de negocio.",
        price: 4997,
        duration: "P30D",
        url: "/carrera-detailing"
      }),
      generateBreadcrumbSchema([
        { name: "Inicio", url: "/" },
        { name: "Montar Centro Detailing", url: "/carrera-detailing" }
      ])
    ]
  },

  gallery: {
    title: "Galería Detailing | Trabajos Profesionales Antes y Después | Detail Park",
    description: "Portfolio de trabajos de detailing profesional. Resultados de wrapping, PPF, pulido y restauración en Ferrari, Lamborghini, Porsche y más vehículos de alta gama.",
    keywords: "trabajos detailing profesional, fotos antes después detailing, resultados wrapping, ejemplos PPF, portfolio detailing, galería coches detailing, Ferrari detailing, Lamborghini wrapping",
    url: "/galeria",
    schema: [
      localBusinessSchema,
      {
        "@context": "https://schema.org",
        "@type": "ImageGallery",
        "name": "Galería de Trabajos de Detailing Profesional",
        "description": "Portfolio de trabajos profesionales de detailing, wrapping, PPF y restauración realizados por Detail Park Academy en vehículos de alta gama.",
        "url": `${BASE_URL}/galeria`
      },
      generateBreadcrumbSchema([
        { name: "Inicio", url: "/" },
        { name: "Galería Detailing", url: "/galeria" }
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
    const formationKeywords: Record<string, string> = {
      detailing: "curso detailing profesional, aprender detailing, curso detailing desde cero, formación pulido profesional, curso pulido coche certificado, corrección pintura, protección cerámica curso",
      wrapping: "curso car wrapping, curso vinilado vehículos, rotulación coches formación, forrado vehículos curso, wrap coche profesional, cambio color coche, instalador vinilo certificado",
      ppf: "curso PPF, curso lámina protectora coche, PPF instalador certificado España, proteger pintura coche curso, film transparente formación, paint protection film curso",
      restauracion: "curso restauración vehículos, restaurar coches clásicos curso, curso chapa y pintura, reparar pintura coche formación, restauración coches dañados"
    };

    const formationTitles: Record<string, string> = {
      detailing: "Curso Detailing Profesional | Aprende Pulido y Corrección de Pintura",
      wrapping: "Curso Car Wrapping | Formación Vinilado Vehículos Certificada",
      ppf: "Curso PPF | Paint Protection Film Certificado España",
      restauracion: "Curso Restauración Vehículos | Coches Clásicos y Dañados"
    };

    const formationDescriptions: Record<string, string> = {
      detailing: "Curso de detailing profesional 100% práctico. Aprende detailing desde cero: lavado, descontaminación, pulido y protección cerámica. Certificado oficial.",
      wrapping: "Curso de car wrapping profesional. Aprende instalación de vinilo, rotulación vehículos y cambio de color. Formación práctica con certificado.",
      ppf: "Curso de PPF (Paint Protection Film) profesional. Aprende instalación de lámina protectora en vehículos de alta gama. Certificación oficial España.",
      restauracion: "Curso de restauración de vehículos profesional. Aprende a restaurar coches clásicos y dañados. Técnicas de chapa, pintura y acabado. Certificado."
    };

    const formationNames: Record<string, string> = {
      detailing: "Curso Detailing Profesional",
      wrapping: "Curso Car Wrapping",
      ppf: "Curso PPF",
      restauracion: "Curso Restauración Vehículos"
    };

    return {
      title: `${formationTitles[slug] || formation.title} | Detail Park`,
      description: formationDescriptions[slug] || formation.description.substring(0, 155) + "...",
      keywords: formationKeywords[slug] || "curso detailing profesional, formación automotriz",
      url: `/formacion/${slug}`,
      schema: [
        localBusinessSchema,
        generateCourseSchema({
          name: formationNames[slug] || formation.title,
          description: formationDescriptions[slug] || formation.description,
          price: formation.price,
          duration: formation.duration,
          url: `/formacion/${slug}`
        }),
        generateFAQSchema(formation.faqs.slice(0, 5)),
        generateBreadcrumbSchema([
          { name: "Inicio", url: "/" },
          { name: "Formaciones", url: "/#formaciones" },
          { name: formationNames[slug] || formation.title, url: `/formacion/${slug}` }
        ])
      ]
    };
  }
};

export default seoConfig;

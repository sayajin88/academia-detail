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

// SEO Configuration for each page
export const seoConfig = {
  home: {
    title: "Detail Park Academy | Cursos de Detailing Profesional en España",
    description: "Academia de detailing profesional en España. Cursos de detailing, car wrapping, PPF y restauración. Formación 100% práctica en taller real. ¡Reserva tu plaza!",
    keywords: "cursos detailing España, formación detailing, academia detailing, curso pulido coches, car wrapping curso, PPF formación, restauración vehículos, detailing profesional",
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
      }
    ]
  },

  jornadaCero: {
    title: "La Jornada Cero | Evento Intensivo de Detailing - 1 Día | Detail Park",
    description: "Jornada intensiva de detailing profesional. Aprende lavado, descontaminación y pulido en 1 día. Solo 10 plazas. Incluye comida y materiales. ¡Reserva ahora!",
    keywords: "evento detailing, jornada detailing, taller detailing 1 día, curso intensivo detailing, iniciación detailing, La Jornada Cero, formación detailing práctica",
    url: "/jornada-cero",
    schema: [
      localBusinessSchema,
      generateEventSchema({
        name: "La Jornada Cero - Evento Intensivo de Detailing",
        description: "Jornada intensiva de detailing profesional. Aprende técnicas de lavado, descontaminación y pulido en 1 día con práctica real en taller.",
        startDate: "2026-01-17T10:00:00+01:00",
        endDate: "2026-01-17T18:00:00+01:00",
        price: 97,
        location: "Detail Park Academy"
      })
    ]
  },

  carreraDetailing: {
    title: "Carrera Detailing | Programa Completo de Formación Profesional | Detail Park",
    description: "Programa premium de 1 mes intensivo. 4 certificaciones: Detailing, Wrapping, PPF y Restauración. Solo 4 plazas por edición. Conviértete en empresario del detailing.",
    keywords: "carrera detailing, formación completa detailing, programa profesional detailing, certificación detailing España, máster detailing, emprender detailing",
    url: "/carrera-detailing",
    schema: [
      localBusinessSchema,
      generateCourseSchema({
        name: "Carrera Detailing - Programa Completo",
        description: "Programa premium de formación intensiva con 4 certificaciones profesionales. Incluye formación en detailing, wrapping, PPF y restauración más módulo de negocio.",
        price: 4997,
        duration: "P30D",
        url: "/carrera-detailing"
      })
    ]
  },

  gallery: {
    title: "Galería de Trabajos | Portfolio Detailing Profesional | Detail Park",
    description: "Explora nuestro portfolio de detailing profesional. Ferrari, Lamborghini, Porsche y más. Trabajos de detailing, wrapping, PPF y restauración realizados por Detail Park.",
    keywords: "portfolio detailing, galería coches detailing, trabajos wrapping, antes después detailing, fotos detailing profesional, Ferrari detailing, Lamborghini wrapping",
    url: "/galeria",
    schema: [
      localBusinessSchema,
      {
        "@context": "https://schema.org",
        "@type": "ImageGallery",
        "name": "Galería de Trabajos Detail Park",
        "description": "Portfolio de trabajos de detailing, wrapping, PPF y restauración realizados por Detail Park Academy.",
        "url": `${BASE_URL}/galeria`
      }
    ]
  },

  contact: {
    title: "Contacto | Detail Park Academy | Cursos Detailing España",
    description: "Contacta con Detail Park Academy. Resuelve tus dudas sobre cursos de detailing, wrapping, PPF y restauración. Teléfono, email y ubicación.",
    keywords: "contacto detail park, academia detailing contacto, cursos detailing información, reservar curso detailing, teléfono detail park",
    url: "/contacto",
    schema: [
      localBusinessSchema,
      {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contacto Detail Park Academy",
        "description": "Página de contacto de Detail Park Academy para información sobre cursos de detailing.",
        "url": `${BASE_URL}/contacto`
      }
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
      detailing: "curso detailing, formación detailing, pulido coche curso, corrección pintura, protección cerámica curso, curso lavado profesional",
      wrapping: "curso car wrapping, formación vinilado, rotulación vehículos curso, cambio color coche, instalador vinilo, curso vinilo coche",
      ppf: "curso PPF, formación paint protection film, protección pintura curso, PPF instalador, film protector coche, curso lámina protectora",
      restauracion: "curso restauración coches, formación restauración vehículos, restaurar coche clásico, reparación pintura, curso chapa y pintura"
    };

    return {
      title: `${formation.title} | Curso Profesional | Detail Park`,
      description: formation.description.substring(0, 155) + "...",
      keywords: formationKeywords[slug] || "curso detailing profesional, formación automotriz",
      url: `/formacion/${slug}`,
      schema: [
        localBusinessSchema,
        generateCourseSchema({
          name: formation.title,
          description: formation.description,
          price: formation.price,
          duration: formation.duration,
          url: `/formacion/${slug}`
        }),
        generateFAQSchema(formation.faqs.slice(0, 5))
      ]
    };
  }
};

export default seoConfig;

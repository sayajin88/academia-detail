import type { FormationModule, FormationInstructor, FormationLevel, FormationDetail } from '@/data/formationDetails';
import { localBusinessSchema } from '@/components/SEO';

const BASE_URL = 'https://academiadetail.com';

// ============================================
// ORGANIZATION SCHEMA COMPLETO CON SAMEAS
// ============================================
export const organizationSchemaComplete = {
  "@context": "https://schema.org",
  "@type": ["Organization", "EducationalOrganization", "LocalBusiness"],
  "name": "Academia Detail",
  "alternateName": ["Detail Park", "Academia Detailing", "Detail Park Academy"],
  "url": BASE_URL,
  "logo": {
    "@type": "ImageObject",
    "url": `${BASE_URL}/og-image.png`,
    "width": 1200,
    "height": 630
  },
  "image": `${BASE_URL}/og-image.png`,
  "description": "El ÚNICO centro de formación en detailing que opera en un taller 100% real con clientes de alta gama. Aprende técnica Y negocio desde el día 1.",
  "slogan": "No enseñamos a lavar coches, formamos empresarios del Detailing",
  "foundingDate": "2017",
  "telephone": "+34 622 773 555",
  "email": "info@academiadetail.com",
  "priceRange": "€€",
  "currenciesAccepted": "EUR",
  "paymentAccepted": "Efectivo, Tarjeta de Crédito, Transferencia Bancaria",
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
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "areaServed": {
    "@type": "Country",
    "name": "Spain"
  },
  "knowsAbout": [
    "Detailing Profesional",
    "Gestión de Negocio Detailing",
    "PPF Installation",
    "Car Wrapping",
    "Presupuestación de Servicios",
    "Captación de Clientes VIP"
  ]
};

// ============================================
// INSTRUCTOR SCHEMA REUTILIZABLE
// ============================================
export const instructorSchema = {
  "@type": "Person",
  "name": "Daniel López",
  "jobTitle": "CEO y Formador Principal",
  "description": "Detailer profesional con más de 15 años de experiencia en vehículos de alta gama",
  "image": `${BASE_URL}/daniel-lopez-instructor.webp`,
  "worksFor": {
    "@type": "Organization",
    "name": "Academia Detail"
  }
};

// ============================================
// HELPERS: Duration & Instructor
// ============================================
const parseDurationToISO = (duration: string): { iso: string; workload: string } => {
  const match = duration.match(/(\d+)(?:\s*-\s*(\d+))?/);
  if (!match) return { iso: 'P5D', workload: 'PT40H' };
  const maxDays = parseInt(match[2] || match[1]);
  return { iso: `P${maxDays}D`, workload: `PT${maxDays * 8}H` };
};

const generateInstructorSchema = (instructor?: FormationInstructor) => {
  if (!instructor) return instructorSchema;
  return {
    "@type": "Person" as const,
    "name": instructor.name,
    "jobTitle": instructor.role,
    "description": instructor.description,
    "worksFor": {
      "@type": "Organization" as const,
      "name": "Academia Detail"
    }
  };
};

// ============================================
// ENHANCED COURSE SCHEMA WITH OFFERS & INSTRUCTOR
// ============================================
export const generateCourseSchemaEnhanced = (course: {
  name: string;
  description: string;
  price: number;
  duration?: string;
  url: string;
  image?: string;
  rating?: { value: string; count: string };
  // Rich data from FormationDetail (all optional for backward compat)
  modules?: FormationModule[];
  whatYouLearn?: string[];
  forWho?: string[];
  instructor?: FormationInstructor;
  levels?: FormationLevel[];
  certificationTitle?: string;
  originalPrice?: number;
  comingSoon?: boolean;
  includes?: string[];
}) => {
  const { iso: durationISO, workload } = parseDurationToISO(course.duration || '5');
  const courseInstructor = generateInstructorSchema(course.instructor);

  // Build syllabusSections from modules
  const syllabusSections = course.modules?.map(mod => ({
    "@type": "Syllabus",
    "name": mod.title,
    "description": mod.topics.join(', ')
  }));

  // Build hasPart from modules
  const hasPart = course.modules?.map((mod, i) => ({
    "@type": "Course",
    "name": mod.title,
    "description": mod.topics.join('. '),
    "position": i + 1,
    "provider": { "@type": "Organization", "name": "Academia Detail" }
  }));

  // Build CourseInstance per level (or single default)
  const courseInstances = course.levels && course.levels.length > 0
    ? course.levels.map(level => ({
        "@type": "CourseInstance" as const,
        "name": level.title,
        "description": level.subtitle,
        "courseMode": "onsite",
        "duration": level.duration ? parseDurationToISO(level.duration).iso : durationISO,
        "inLanguage": "es",
        "courseWorkload": level.duration ? parseDurationToISO(level.duration).workload : workload,
        "instructor": courseInstructor,
        "maximumAttendeeCapacity": 3,
        "location": {
          "@type": "Place" as const,
          "name": "Academia Detail - Taller 100% Real",
          "address": {
            "@type": "PostalAddress" as const,
            "streetAddress": "Calle Metalurgias, 13",
            "addressLocality": "Alicante",
            "postalCode": "03008",
            "addressCountry": "ES"
          }
        },
        ...(level.price && {
          "offers": {
            "@type": "Offer" as const,
            "price": level.price,
            "priceCurrency": "EUR",
            "availability": "https://schema.org/LimitedAvailability"
          }
        })
      }))
    : [{
        "@type": "CourseInstance" as const,
        "courseMode": "onsite",
        "courseSchedule": {
          "@type": "Schedule" as const,
          "repeatFrequency": "P1M",
          "repeatCount": 12
        },
        "duration": durationISO,
        "inLanguage": "es",
        "courseWorkload": workload,
        "instructor": courseInstructor,
        "maximumAttendeeCapacity": 3,
        "location": {
          "@type": "Place" as const,
          "name": "Academia Detail - Taller 100% Real",
          "address": {
            "@type": "PostalAddress" as const,
            "streetAddress": "Calle Metalurgias, 13",
            "addressLocality": "Alicante",
            "postalCode": "03008",
            "addressCountry": "ES"
          }
        }
      }];

  // Build offers with priceSpecification
  const offers: Record<string, unknown> = {
    "@type": "Offer",
    "price": course.price,
    "priceCurrency": "EUR",
    "availability": course.comingSoon
      ? "https://schema.org/PreOrder"
      : "https://schema.org/LimitedAvailability",
    "validFrom": "2025-01-01",
    "priceValidUntil": "2026-12-31",
    "url": `${BASE_URL}${course.url}`,
    "seller": { "@type": "Organization", "name": "Academia Detail" }
  };

  if (course.originalPrice && course.originalPrice > course.price) {
    offers.priceSpecification = [
      {
        "@type": "UnitPriceSpecification",
        "priceType": "https://schema.org/SalePrice",
        "price": course.price,
        "priceCurrency": "EUR"
      },
      {
        "@type": "UnitPriceSpecification",
        "priceType": "https://schema.org/ListPrice",
        "price": course.originalPrice,
        "priceCurrency": "EUR"
      }
    ];
  }

  // Build teaches from real data or fallback
  const teaches = course.whatYouLearn && course.whatYouLearn.length > 0
    ? course.whatYouLearn
    : [
        `Técnicas profesionales de ${course.name}`,
        "Gestión de clientes y presupuestos",
        "Visión de negocio y rentabilidad"
      ];

  // Build credential
  const credential = {
    "@type": "EducationalOccupationalCredential",
    "credentialCategory": "certificate",
    "name": course.certificationTitle || "Certificado Profesional Academia Detail"
  };

  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": course.name,
    "description": course.description,
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Academia Detail",
      "url": BASE_URL,
      "logo": `${BASE_URL}/og-image.png`,
      "sameAs": organizationSchemaComplete.sameAs
    },
    "offers": offers,
    "hasCourseInstance": courseInstances,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": course.rating?.value || "4.9",
      "reviewCount": course.rating?.count || "50",
      "bestRating": "5",
      "worstRating": "1"
    },
    "coursePrerequisites": "Sin experiencia previa necesaria",
    "educationalCredentialAwarded": credential.name,
    "occupationalCredentialAwarded": credential,
    "teaches": teaches,
    ...(course.forWho && course.forWho.length > 0 && {
      "audience": {
        "@type": "EducationalAudience",
        "audienceType": course.forWho.join('; ')
      }
    }),
    ...(hasPart && hasPart.length > 0 && { "hasPart": hasPart }),
    ...(syllabusSections && syllabusSections.length > 0 && { "syllabusSections": syllabusSections }),
    ...(course.image && { "image": course.image }),
    "inLanguage": "es",
    "isAccessibleForFree": false
  };
};

// Legacy alias for backwards compatibility
export const generateCourseSchema = generateCourseSchemaEnhanced;

// ============================================
// VIDEO OBJECT SCHEMA GENERATOR (Rich Snippets de Video)
// ============================================
export const generateVideoObjectSchema = (video: {
  id: string;
  title: string;
  description?: string;
  name?: string;
  uploadDate?: string;
  duration?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": video.title,
  "description": video.description || `Testimonio de ${video.name || 'alumno'} sobre su experiencia en Academia Detail`,
  "thumbnailUrl": `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`,
  "uploadDate": video.uploadDate || "2025-06-01",
  "contentUrl": `https://www.youtube.com/watch?v=${video.id}`,
  "embedUrl": `https://www.youtube.com/embed/${video.id}`,
  "duration": video.duration || "PT3M",
  "publisher": {
    "@type": "Organization",
    "name": "Academia Detail",
    "logo": {
      "@type": "ImageObject",
      "url": `${BASE_URL}/og-image.png`
    }
  }
});

export const generateVideoObjectSchemas = (videos: {
  id: string;
  title: string;
  description?: string;
  name?: string;
  uploadDate?: string;
  duration?: string;
}[]) => videos.map(video => generateVideoObjectSchema(video));

// ============================================
// EVENT SCHEMA GENERATOR
// ============================================
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
  },
  "performer": instructorSchema
});

// ============================================
// FAQ SCHEMA GENERATOR
// ============================================
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

// ============================================
// BREADCRUMB SCHEMA GENERATOR
// ============================================
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

// ============================================
// WEBPAGE SCHEMA WITH SPEAKABLE (VOICE SEARCH)
// ============================================
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
    "cssSelector": ["h1", ".hero-description", ".section-heading"]
  },
  "mainEntity": {
    "@type": "EducationalOrganization",
    "name": "Academia Detail"
  }
});

// ============================================
// IMAGE OBJECT SCHEMA
// ============================================
export const generateImageObjectSchema = (image: {
  url: string;
  name: string;
  description: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "ImageObject",
  "contentUrl": image.url,
  "name": image.name,
  "description": image.description,
  "representativeOfPage": true,
  "creator": {
    "@type": "Organization",
    "name": "Academia Detail"
  }
});

// ============================================
// EDUCATIONAL ORGANIZATION SCHEMA (LEGACY)
// ============================================
export const educationalOrganizationSchema = organizationSchemaComplete;

// ============================================
// SLUG MAPPING
// ============================================
const slugMapping: Record<string, string> = {
  'detailing': 'curso-detailing-profesional',
  'wrapping': 'curso-vinilado-vehiculos',
  'ppf': 'curso-ppf-proteccion-pintura',
  'restauracion': 'curso-restauracion-vehiculos',
  'curso-detailing-profesional': 'curso-detailing-profesional',
  'curso-vinilado-vehiculos': 'curso-vinilado-vehiculos',
  'curso-ppf-proteccion-pintura': 'curso-ppf-proteccion-pintura',
  'curso-restauracion-vehiculos': 'curso-restauracion-vehiculos',
};

const normalizeSlug = (slug: string): string => {
  return slugMapping[slug] || slug;
};

// ============================================
// SEO CONFIG POR PÁGINA
// ============================================

// Dynamic home SEO generator - builds schemas from real formation data
export const generateHomeSEO = (formations: { id: string; title: string; shortTitle: string; description: string; href: string; alumnosCertificados?: number }[], details: Record<string, FormationDetail>) => {
  // Aggregate dynamic keywords from all course categories
  const categoryKeywords = Object.values(details).map(d => {
    const words = d.title.toLowerCase().split(/\s+/).filter(w => w.length > 3);
    return words.slice(0, 3).join(', ');
  }).join(', ');

  const totalAlumnos = formations.reduce((sum, f) => sum + (f.alumnosCertificados || 0), 0);

  // Build ItemList of courses dynamically from real data
  const courseItemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Cursos de Detailing Profesional",
    "numberOfItems": formations.length,
    "itemListElement": formations.map((f, i) => {
      const detail = details[f.id];
      return {
        "@type": "ListItem",
        "position": i + 1,
        "item": {
          "@type": "Course",
          "name": detail?.title || f.title,
          "url": `${BASE_URL}${f.href}`,
          "description": detail?.description || f.description,
          "provider": { "@type": "Organization", "name": "Academia Detail", "sameAs": BASE_URL },
          ...(detail && {
            "offers": {
              "@type": "Offer",
              "price": String(detail.price),
              "priceCurrency": "EUR",
              "availability": detail.comingSoon ? "https://schema.org/PreOrder" : "https://schema.org/LimitedAvailability"
            },
            ...(detail.modules && detail.modules.length > 0 && {
              "hasPart": detail.modules.map((mod, mi) => ({
                "@type": "Course",
                "name": mod.title,
                "position": mi + 1
              }))
            })
          })
        }
      };
    })
  };

  // Navigation schema from real formation slugs
  const navItems = [
    ...formations.map((f, i) => ({
      "@type": "ListItem" as const,
      "position": i + 1,
      "name": f.shortTitle || f.title,
      "url": `${BASE_URL}${f.href}`
    })),
    { "@type": "ListItem" as const, "position": formations.length + 1, "name": "Formación Profesional Completa", "url": `${BASE_URL}/formacion-profesional-detailing` },
    { "@type": "ListItem" as const, "position": formations.length + 2, "name": "Jornada Zero - Experiencia Inmersión", "url": `${BASE_URL}/curso-detailing-iniciacion` },
    { "@type": "ListItem" as const, "position": formations.length + 3, "name": "Contacto", "url": `${BASE_URL}/contacto` },
  ];

  return {
    title: "Cursos Detailing Profesional 2026 | Alicante ★4.9",
    description: `✅ Cursos de detailing 100% prácticos en taller real de Alicante. Pulido, tratamiento cerámico, PPF y wrapping. ⭐ +${totalAlumnos} alumnos certificados. ➤ Reserva tu plaza ahora - Grupos de máx 3 personas.`,
    keywords: `curso detailing, curso de pulido de coches, curso tratamiento cerámico, escuela de detailing, cómo montar negocio detailing, cómo montar lavadero de coches, formación detailing España, aprender detailing desde cero, ${categoryKeywords}`,
    url: "/",
    price: details['curso-detailing-profesional']?.price ? String(details['curso-detailing-profesional'].price) : "2997",
    schema: [
      localBusinessSchema,
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Academia Detail",
        "alternateName": "Detail Park Academy",
        "url": BASE_URL,
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${BASE_URL}/blog?q={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      },
      { "@context": "https://schema.org", "@type": "ItemList", "name": "Navegación Principal - Academia Detail", "itemListElement": navItems },
      courseItemList,
      generateWebPageSchema({
        name: "Cursos de Detailing Profesional en España",
        description: "Formación 100% práctica en taller real con visión de negocio",
        url: "/"
      }),
      generateBreadcrumbSchema([
        { name: "Inicio", url: "/" }
      ])
    ]
  };
};

export const seoConfig = {
  // Legacy static fallback - prefer generateHomeSEO()
  home: {
    title: "Cursos Detailing Profesional 2026 | Alicante ★4.9",
    description: "✅ Cursos de detailing 100% prácticos en taller real de Alicante. Pulido, cerámico, PPF y wrapping. ⭐ +170 alumnos certificados. ➤ Reserva tu plaza.",
    keywords: "curso detailing, curso de pulido de coches, curso tratamiento cerámico, escuela de detailing, cómo montar negocio detailing, cómo montar lavadero de coches, formación detailing España, aprender detailing desde cero, curso corrección pintura",
    url: "/",
    price: "2997",
    schema: [
      localBusinessSchema,
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Academia Detail",
        "alternateName": "Detail Park Academy",
        "url": BASE_URL,
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${BASE_URL}/blog?q={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      },
      generateWebPageSchema({
        name: "Cursos de Detailing Profesional en España",
        description: "Formación 100% práctica en taller real con visión de negocio",
        url: "/"
      }),
      generateBreadcrumbSchema([
        { name: "Inicio", url: "/" }
      ])
    ]
  },

  jornadaCero: {
    title: "Jornada Zero Detailing [97€] | Prueba Antes de Invertir",
    description: "🚀 Tu primer contacto con el detailing profesional por solo 97€. Accede a herramientas de élite, toca máquinas reales y descubre si tienes mente de empresario. ➤ ¡Plazas limitadas!",
    keywords: "jornada zero detailing, probar detailing barato, experiencia detailing inmersión, curso detailing económico, primer contacto detailing profesional, prueba antes de invertir detailing",
    url: "/jornada-zero-detailing",
    image: `${BASE_URL}/og-jornada-zero.jpg`,
    price: "97",
    schema: [
      localBusinessSchema,
      generateCourseSchemaEnhanced({
        name: "Jornada Zero - Experiencia de Inmersión Detailing",
        description: "Tu primer contacto con el detailing profesional en un taller 100% real. 1 día de experiencia práctica para descubrir si tienes mentalidad de empresario.",
        price: 97,
        duration: "P1D",
        url: "/jornada-zero-detailing",
        rating: { value: "4.9", count: "50" }
      }),
      generateEventSchema({
        name: "Jornada Zero - Experiencia de Inmersión Detailing",
        description: "Tu primer contacto con el detailing profesional. 1 día de experiencia práctica en taller real con herramientas profesionales.",
        startDate: "2026-01-17T10:00:00+01:00",
        endDate: "2026-01-17T18:00:00+01:00",
        price: 97,
        location: "Academia Detail - Taller 100% Real"
      }),
      generateWebPageSchema({
        name: "Jornada Zero Detailing",
        description: "Experiencia de inmersión de 1 día para probar el detailing profesional",
        url: "/jornada-zero-detailing"
      }),
      generateBreadcrumbSchema([
        { name: "Inicio", url: "/" },
        { name: "Jornadas Intensivas", url: "/curso-detailing-iniciacion" },
        { name: "Jornada Zero", url: "/jornada-zero-detailing" }
      ])
    ]
  },

  jornadasHub: {
    title: "Jornadas Intensivas de Detailing 2026 | Jornada Zero y Up Detail | Academia Detail",
    description: "🚀 Descubre el detailing en 1 día: Jornada Zero o Up Detail. Dos formatos, múltiples expertos, desde 97€ + IVA. ✅ Certificado incluido. ➤ Elige tu jornada.",
    keywords: "jornada detailing, curso detailing 1 dia, iniciacion detailing, experiencia detailing, up detail, jornada zero, formacion detailing barata",
    url: "/curso-detailing-iniciacion",
    image: `${BASE_URL}/og-jornada-zero.jpg`,
    price: "97",
    schema: [
      localBusinessSchema,
      generateWebPageSchema({
        name: "Jornadas Intensivas de Detailing",
        description: "Dos formatos de jornada intensiva para descubrir el detailing profesional",
        url: "/curso-detailing-iniciacion"
      }),
      generateBreadcrumbSchema([
        { name: "Inicio", url: "/" },
        { name: "Jornadas Intensivas", url: "/curso-detailing-iniciacion" }
      ])
    ]
  },

  upDetail: {
    title: "Up Detail - Jornada con Expertos de Detailing | Próximamente | Academia Detail",
    description: "🌟 Up Detail reúne a los mejores formadores de detailing del país en una jornada intensiva. 97€ + IVA. ✅ Múltiples expertos, certificado oficial. ➤ Reserva tu aviso.",
    keywords: "up detail, jornada detailing expertos, formacion detailing colaborativa, masterclass detailing, evento detailing profesional, formadores detailing españa",
    url: "/up-detail-evento",
    image: `${BASE_URL}/og-jornada-zero.jpg`,
    price: "97",
    schema: [
      localBusinessSchema,
      {
        "@context": "https://schema.org",
        "@type": "EducationEvent",
        "name": "Up Detail - Jornada con Expertos de Detailing",
        "description": "Jornada intensiva de detailing con múltiples expertos reconocidos a nivel nacional e internacional.",
        "eventStatus": "https://schema.org/EventPostponed",
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        "location": {
          "@type": "Place",
          "name": "Academia Detail - Taller 100% Real",
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
          "price": "97",
          "priceCurrency": "EUR",
          "availability": "https://schema.org/PreOrder"
        }
      },
      generateWebPageSchema({
        name: "Up Detail - Jornada con Expertos",
        description: "Jornada intensiva de detailing con múltiples expertos reconocidos",
        url: "/up-detail-evento"
      }),
      generateBreadcrumbSchema([
        { name: "Inicio", url: "/" },
        { name: "Jornadas Intensivas", url: "/curso-detailing-iniciacion" },
        { name: "Up Detail", url: "/up-detail-evento" }
      ])
    ]
  },


  carreraDetailing: {
    title: "Monta Tu Centro de Detailing | Formación 1 Mes",
    description: "🔥 Programa completo para montar tu lavadero de coches: 4 certificaciones + módulo de negocio exclusivo. ✅ Detailing, Wrapping, PPF y Restauración. ➤ Solicita info sin compromiso.",
    keywords: "formación profesional detailing, cómo montar centro detailing, cómo montar lavadero de coches profesional, abrir negocio detailing, curso completo detailing, emprender lavadero rentable, aprender detailing desde cero",
    url: "/formacion-profesional-detailing",
    image: `${BASE_URL}/og-carrera-detailing.jpg`,
    price: "9997",
    schema: [
      localBusinessSchema,
      generateCourseSchemaEnhanced({
        name: "Formación Profesional Detailing - Monta tu Centro de Detailing",
        description: "Programa premium de formación profesional en detailing. Formación intensiva con 4 certificaciones profesionales: Detailing, Wrapping, PPF y Restauración, más módulo de negocio exclusivo.",
        price: 9997,
        duration: "P30D",
        url: "/formacion-profesional-detailing",
        rating: { value: "4.9", count: "89" }
      }),
      // EducationalOccupationalProgram - More specific than Course for full programs
      {
        "@context": "https://schema.org",
        "@type": "EducationalOccupationalProgram",
        "name": "Formación Profesional Detailing - Monta tu Centro",
        "description": "Programa completo de 1 mes para montar tu propio centro de detailing. Incluye 4 certificaciones profesionales (Detailing, Wrapping, PPF, Restauración) más módulo de negocio exclusivo con plan de negocio personalizado.",
        "url": `${BASE_URL}/formacion-profesional-detailing`,
        "timeToComplete": "P30D",
        "occupationalCredentialAwarded": {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "certificate",
          "name": "4 Certificaciones Profesionales de Detailing"
        },
        "programPrerequisites": "Sin experiencia previa necesaria",
        "provider": {
          "@type": "EducationalOrganization",
          "name": "Academia Detail",
          "url": BASE_URL,
          "sameAs": organizationSchemaComplete.sameAs
        },
        "offers": {
          "@type": "Offer",
          "price": "9997",
          "priceCurrency": "EUR",
          "availability": "https://schema.org/LimitedAvailability",
          "validFrom": "2025-01-01",
          "priceValidUntil": "2026-12-31"
        },
        "hasCourse": [
          { "@type": "Course", "name": "Detailing Profesional", "url": `${BASE_URL}/curso-detailing-profesional` },
          { "@type": "Course", "name": "Car Wrapping Profesional", "url": `${BASE_URL}/curso-vinilado-vehiculos` },
          { "@type": "Course", "name": "PPF Protección Pintura", "url": `${BASE_URL}/curso-ppf-proteccion-pintura` },
          { "@type": "Course", "name": "Restauración de Vehículos", "url": `${BASE_URL}/curso-restauracion-vehiculos` }
        ]
      },
      // VideoObject schemas for testimonial videos on this page
      ...generateVideoObjectSchemas([
        { id: 'GWda5NH90YM', title: 'Testimonio Alumno - Mi experiencia en la Carrera de Detailing', name: 'Alumno Graduado', uploadDate: '2025-03-15' },
        { id: 'iJjIZ4Ja7RA', title: 'Testimonio Alumno - Cómo monté mi negocio tras la formación', name: 'Alumno Graduado', uploadDate: '2025-04-20' },
        { id: 'U1qm6XXaQaE', title: 'Testimonio Alumno - La formación que cambió mi carrera', name: 'Alumno Graduado', uploadDate: '2025-05-10' },
      ]),
      generateWebPageSchema({
        name: "Carrera Profesional de Detailing",
        description: "Formación completa de 1 mes para montar tu centro de detailing",
        url: "/formacion-profesional-detailing"
      }),
      generateBreadcrumbSchema([
        { name: "Inicio", url: "/" },
        { name: "Formación Profesional Detailing", url: "/formacion-profesional-detailing" }
      ])
    ]
  },

  aboutUs: {
    title: "Quiénes Somos | Academia Detail | Taller Real desde 2017 | ★4.9",
    description: "✅ Conoce la historia de Academia Detail. Fundada en 2017, somos el único centro de formación en detailing que vive del taller, no de la formación. ⭐ +7 años de experiencia real.",
    keywords: "quienes somos academia detailing, historia detail park, centro formacion detailing españa, escuela detailing alicante, curso detailing profesional taller real, videos detailing profesional",
    url: "/quienes-somos",
    schema: [
      localBusinessSchema,
      {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "name": "Quiénes Somos - Academia Detail",
        "description": "Historia y filosofía de Academia Detail. Fundada en 2017, somos el único centro de formación donde vivimos del detailing profesional.",
        "url": `${BASE_URL}/quienes-somos`,
        "mainEntity": organizationSchemaComplete
      },
      // VideoObject schemas for Detail Park YouTube channel videos
      ...generateVideoObjectSchemas([
        { id: 'lgHS6CO2G2s', title: 'Detailing profesional en taller real - Detail Park', description: 'Proceso completo de detailing profesional realizado en el taller de Detail Park Alicante con clientes reales', uploadDate: '2024-06-01' },
        { id: 'TtPs7WPVLzE', title: 'Proceso de pulido y corrección de pintura profesional', description: 'Técnicas avanzadas de pulido y corrección de pintura en vehículos de alta gama en Detail Park', uploadDate: '2024-07-15' },
        { id: 'ByRhg2kYD-A', title: 'Tratamiento cerámico en vehículo de alta gama', description: 'Aplicación de tratamiento cerámico profesional para protección duradera de la pintura', uploadDate: '2024-08-01' },
        { id: 'G3AU2913_vw', title: 'Lavado profesional y descontaminación de vehículos', description: 'Proceso completo de lavado profesional y descontaminación en el taller de Detail Park', uploadDate: '2024-09-01' },
        { id: 'thUgGa5ULkI', title: 'Trabajo real en Detail Park Alicante', description: 'Un día de trabajo real en las instalaciones de Detail Park Alicante con clientes de alta gama', uploadDate: '2024-10-01' },
        { id: 'kp_yZNZnUwo', title: 'Protección de pintura y acabado perfecto', description: 'Técnicas de protección de pintura para conseguir un acabado perfecto en detailing profesional', uploadDate: '2024-11-01' },
        { id: 'zr_FFDz06Fc', title: 'Restauración y detailing de vehículos clásicos', description: 'Proceso de restauración y detailing profesional de vehículos clásicos y deportivos', uploadDate: '2024-12-01' },
        { id: 'iMatPTngV0g', title: 'Técnicas avanzadas de detailing profesional', description: 'Demostración de técnicas avanzadas de detailing en el taller de Detail Park', uploadDate: '2025-01-15' },
        { id: 'U3K4VsFlY8E', title: 'Interior detailing profesional completo', description: 'Proceso completo de detailing interior profesional en vehículos de alta gama', uploadDate: '2025-02-01' },
        { id: 'L14vIkJWgKw', title: 'Resultados reales de detailing en nuestro taller', description: 'Resultados reales de trabajos de detailing profesional realizados en Detail Park', uploadDate: '2025-03-01' },
        { id: 'eFfzwvhGNcU', title: 'Preparación de vehículos premium para entrega', description: 'Proceso de preparación y detailing de vehículos premium antes de la entrega al cliente', uploadDate: '2025-04-01' },
        { id: 'sqK6qkTWynk', title: 'Detail Park - Trabajo diario en el taller de Alicante', description: 'El día a día en el taller de Detail Park Alicante mostrando trabajo real con clientes', uploadDate: '2025-05-01' },
      ]),
      // ItemList for video carousel in Google Search
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Videos de Detailing Profesional - Detail Park",
        "description": "Colección de videos mostrando trabajo real de detailing profesional en el taller de Detail Park Alicante",
        "numberOfItems": 12,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "url": "https://youtu.be/lgHS6CO2G2s", "name": "Detailing profesional en taller real" },
          { "@type": "ListItem", "position": 2, "url": "https://youtu.be/TtPs7WPVLzE", "name": "Pulido y corrección de pintura" },
          { "@type": "ListItem", "position": 3, "url": "https://youtu.be/ByRhg2kYD-A", "name": "Tratamiento cerámico alta gama" },
          { "@type": "ListItem", "position": 4, "url": "https://youtu.be/G3AU2913_vw", "name": "Lavado profesional y descontaminación" },
          { "@type": "ListItem", "position": 5, "url": "https://youtu.be/thUgGa5ULkI", "name": "Trabajo real en Detail Park" },
          { "@type": "ListItem", "position": 6, "url": "https://youtu.be/kp_yZNZnUwo", "name": "Protección de pintura" },
          { "@type": "ListItem", "position": 7, "url": "https://youtu.be/zr_FFDz06Fc", "name": "Restauración y detailing" },
          { "@type": "ListItem", "position": 8, "url": "https://youtu.be/iMatPTngV0g", "name": "Técnicas avanzadas" },
          { "@type": "ListItem", "position": 9, "url": "https://youtu.be/U3K4VsFlY8E", "name": "Interior detailing profesional" },
          { "@type": "ListItem", "position": 10, "url": "https://youtu.be/L14vIkJWgKw", "name": "Resultados reales del taller" },
          { "@type": "ListItem", "position": 11, "url": "https://youtu.be/eFfzwvhGNcU", "name": "Preparación vehículos premium" },
          { "@type": "ListItem", "position": 12, "url": "https://youtu.be/sqK6qkTWynk", "name": "Trabajo diario en Detail Park" },
        ]
      },
      generateWebPageSchema({
        name: "Quiénes Somos - Academia Detail",
        description: "Historia y filosofía de la academia de detailing líder en España",
        url: "/quienes-somos"
      }),
      generateBreadcrumbSchema([
        { name: "Inicio", url: "/" },
        { name: "Quiénes Somos", url: "/quienes-somos" }
      ])
    ]
  },

  glossary: {
    title: "Glosario Detailing | +85 Términos Profesionales",
    description: "✅ Domina el vocabulario del detailing profesional. +85 términos con definiciones: PPF, coating cerámico, clay bar, swirl marks y más. ➤ Guía de referencia completa.",
    keywords: "glosario detailing, terminología detailing, diccionario car detailing, que es PPF, que es coating cerámico, términos detailing profesional, vocabulario detailing",
    url: "/glosario-detailing",
    schema: [
      localBusinessSchema,
      {
        "@context": "https://schema.org",
        "@type": "DefinedTermSet",
        "name": "Glosario de Detailing Profesional",
        "description": "Diccionario enciclopédico con más de 85 términos técnicos de detallado automotriz profesional",
        "url": `${BASE_URL}/glosario-detailing`,
        "inLanguage": "es",
        "publisher": {
          "@type": "Organization",
          "name": "Academia Detail",
          "url": BASE_URL
        }
      },
      generateWebPageSchema({
        name: "Glosario de Detailing Profesional",
        description: "Diccionario completo de términos técnicos del detallado automotriz",
        url: "/glosario-detailing"
      }),
      generateBreadcrumbSchema([
        { name: "Inicio", url: "/" },
        { name: "Glosario de Detailing", url: "/glosario-detailing" }
      ])
    ]
  },

  calculadoraDilucion: {
    title: "Calculadora Dilución Detailing ⚗️ Ratios Exactos",
    description: "✅ Calcula la dilución exacta de cualquier producto de car detailing. Ratios de mezcla visual para APC, champú, desengrasante y más. ➤ Herramienta gratuita e interactiva.",
    keywords: "calculadora dilución detailing, ratio mezcla productos limpieza coche, como diluir productos detailing, tabla diluciones detailing, proporción agua producto limpieza, calculadora mezcla química coche, dilución APC detailing, ratio champú coche",
    url: "/calculadora-dilucion-detailing",
    schema: [
      localBusinessSchema,
      generateWebPageSchema({
        name: "Calculadora de Dilución para Productos de Detailing",
        description: "Herramienta interactiva para calcular la dilución exacta de productos químicos de car detailing profesional",
        url: "/calculadora-dilucion-detailing"
      }),
      generateBreadcrumbSchema([
        { name: "Inicio", url: "/" },
        { name: "Glosario de Detailing", url: "/glosario-detailing" },
        { name: "Calculadora de Dilución", url: "/calculadora-dilucion-detailing" }
      ])
    ]
  },

  contact: {
    title: "Contacto | Academia Detail Alicante | Reserva tu Plaza ★4.9",
    description: "✅ Contacta con Academia Detail en Alicante. Información sobre cursos de detailing en taller real, wrapping, PPF y restauración. ➤ Reserva tu plaza ahora - Respuesta en 24h.",
    keywords: "academia detailing Alicante, cursos detailing Valencia, formación detailing España, contacto academia detailing, reservar curso detailing taller real",
    url: "/contacto",
    schema: [
      localBusinessSchema,
      {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contacto Academia Detail - Alicante",
        "description": "Página de contacto de Academia Detail para información sobre cursos de detailing profesional en Alicante y Valencia.",
        "url": `${BASE_URL}/contacto`,
        "mainEntity": {
          "@type": "Organization",
          "name": "Academia Detail",
          "telephone": "+34 622 773 555",
          "email": "info@detailpark.es",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Calle Metalurgias, 13",
            "addressLocality": "Alicante",
            "postalCode": "03008",
            "addressCountry": "ES"
          }
        }
      },
      generateWebPageSchema({
        name: "Contacto Academia Detail",
        description: "Contacta con nosotros para reservar tu plaza en los cursos de detailing",
        url: "/contacto"
      }),
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
    modules?: FormationModule[];
    whatYouLearn?: string[];
    forWho?: string[];
    instructor?: FormationInstructor;
    levels?: FormationLevel[];
    certificationTitle?: string;
    originalPrice?: number;
    comingSoon?: boolean;
    includes?: string[];
  }, videoTestimonials?: { id: string; title: string; name?: string; role?: string }[]) => {
    const normalizedSlug = normalizeSlug(slug);
    
    const formationKeywords: Record<string, string> = {
      'curso-detailing-profesional': "curso detailing profesional taller real, aprender detailing con clientes, curso detailing desde cero, formación pulido profesional, curso pulido coche certificado, corrección pintura negocio",
      'curso-vinilado-vehiculos': "curso vinilado vehículos profesional, curso car wrapping negocio, rotulación coches formación, forrado vehículos curso, wrap coche taller real, cambio color coche rentable",
      'curso-ppf-proteccion-pintura': "curso PPF taller real, curso protección pintura profesional, PPF instalador certificado España, proteger pintura coche negocio, film transparente formación práctica",
      'curso-restauracion-vehiculos': "curso restauración vehículos profesional, restaurar coches clásicos negocio, curso chapa y pintura, reparar pintura coche formación taller real"
    };

    const formationTitles: Record<string, string> = {
      'curso-detailing-profesional': "Curso de Pulido y Cerámico [4 Días] | Certificación + Bolsa Empleo | ★4.9",
      'curso-vinilado-vehiculos': "Curso Car Wrapping Profesional [2-4 Días] | Certificación Oficial | ★4.8",
      'curso-ppf-proteccion-pintura': "Curso PPF Instalador [2 Días] | Certificación Profesional | ★4.9",
      'curso-restauracion-vehiculos': "Curso Restauración Vehículos [2 Días] | Certificación Oficial | ★4.7"
    };

    const formationDescriptions: Record<string, string> = {
      'curso-detailing-profesional': "Domina el pulido profesional y tratamiento cerámico en 4 días intensivos. ✅ Certificación oficial + Bolsa de empleo. ⭐ Valoración 4.9/5. ➤ ¡Solo 3 plazas por curso!",
      'curso-vinilado-vehiculos': "Domina el car wrapping profesional en 2-4 días intensivos. ✅ Técnicas de instalación de vinilo y cambio de color. ⭐ Valoración 4.8/5. ➤ ¡Certificación oficial!",
      'curso-ppf-proteccion-pintura': "Domina la instalación de PPF en 2 días intensivos. ✅ Técnicas avanzadas en vehículos de alta gama. ⭐ Valoración 4.9/5. ➤ ¡Certificación oficial!",
      'curso-restauracion-vehiculos': "Domina la restauración de vehículos en 2 días intensivos. ✅ Técnicas avanzadas de recuperación. ⭐ Valoración 4.7/5. ➤ ¡Certificación oficial!"
    };

    const formationImages: Record<string, string> = {
      'curso-detailing-profesional': `${BASE_URL}/og-curso-detailing.jpg`,
      'curso-vinilado-vehiculos': `${BASE_URL}/og-curso-wrapping.jpg`,
      'curso-ppf-proteccion-pintura': `${BASE_URL}/og-curso-ppf.jpg`,
      'curso-restauracion-vehiculos': `${BASE_URL}/og-curso-restauracion.jpg`
    };

    const formationNames: Record<string, string> = {
      'curso-detailing-profesional': "Curso Detailing Profesional",
      'curso-vinilado-vehiculos': "Curso Car Wrapping Profesional",
      'curso-ppf-proteccion-pintura': "Curso PPF Protección Pintura",
      'curso-restauracion-vehiculos': "Curso Restauración Vehículos"
    };

    const courseRatings: Record<string, { value: string; count: string }> = {
      'curso-detailing-profesional': { value: "4.9", count: "127" },
      'curso-vinilado-vehiculos': { value: "4.8", count: "89" },
      'curso-ppf-proteccion-pintura': { value: "4.9", count: "67" },
      'curso-restauracion-vehiculos': { value: "4.7", count: "45" }
    };

    const coursePrices: Record<string, string> = {
      'curso-detailing-profesional': "2997",
      'curso-vinilado-vehiculos': "1999",
      'curso-ppf-proteccion-pintura': "2397",
      'curso-restauracion-vehiculos': "449"
    };

    const imageUrl = formationImages[normalizedSlug] || `${BASE_URL}/og-image.png`;

    return {
      title: formationTitles[normalizedSlug] || `${formation.title} Profesional | Curso Intensivo en España`,
      description: formationDescriptions[normalizedSlug] || `Domina ${formation.title} con nuestra formación profesional. Técnicas avanzadas y certificación oficial. ¡Accede a nuestra bolsa de empleo!`,
      keywords: formationKeywords[normalizedSlug] || "curso detailing profesional españa, formación automotriz certificada, bolsa empleo detailing",
      url: `/${normalizedSlug}`,
      image: imageUrl,
      type: 'product' as const,
      price: coursePrices[normalizedSlug] || String(formation.price),
      schema: [
        localBusinessSchema,
        generateCourseSchemaEnhanced({
          name: formationNames[normalizedSlug] || formation.title,
          description: formationDescriptions[normalizedSlug] || formation.description,
          price: formation.price,
          duration: formation.duration,
          url: `/${normalizedSlug}`,
          image: imageUrl,
          rating: courseRatings[normalizedSlug],
          // Rich data from formation
          modules: formation.modules,
          whatYouLearn: formation.whatYouLearn,
          forWho: formation.forWho,
          instructor: formation.instructor,
          levels: formation.levels,
          certificationTitle: formation.certificationTitle,
          originalPrice: formation.originalPrice,
          comingSoon: formation.comingSoon,
          includes: formation.includes,
        }),
        generateFAQSchema(formation.faqs),
        generateWebPageSchema({
          name: formationNames[normalizedSlug] || formation.title,
          description: formationDescriptions[normalizedSlug] || formation.description,
          url: `/${normalizedSlug}`
        }),
        generateBreadcrumbSchema([
          { name: "Inicio", url: "/" },
          { name: "Formaciones", url: "/#formaciones" },
          { name: formationNames[normalizedSlug] || formation.title, url: `/${normalizedSlug}` }
        ]),
        generateImageObjectSchema({
          url: imageUrl,
          name: `Práctica profesional - ${formationNames[normalizedSlug] || formation.title}`,
          description: `Alumno practicando técnicas profesionales en el curso de ${formationNames[normalizedSlug] || formation.title} en Academia Detail`
        }),
        // VideoObject schemas for video testimonials on this course page
        ...(videoTestimonials && videoTestimonials.length > 0
          ? generateVideoObjectSchemas(videoTestimonials.map(v => ({
              id: v.id,
              title: `Testimonio Alumno - ${v.title}`,
              name: v.name,
              description: `${v.title} - Testimonio real de alumno del ${formationNames[normalizedSlug] || formation.title} en Academia Detail`,
              uploadDate: '2025-06-01',
              duration: 'PT3M'
            })))
          : []
        )
      ]
    };
  }
};

export default seoConfig;

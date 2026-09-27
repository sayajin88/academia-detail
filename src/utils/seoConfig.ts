import type { FormationModule, FormationInstructor, FormationLevel, FormationDetail } from "@/data/formationDetails";
import {
  localBusinessSchema,
  websiteSchema,
  courseDetailingSchema,
  courseWrappingSchema,
  coursePPFSchema,
  courseRestauracionSchema,
  courseFormacionProfesionalSchema,
  courseJornadaZeroSchema,
} from "@/components/SEO";
import { carreraDetailingData } from "@/data/carreraDetailingData";
import { jornadaZeroFaqs, jornadasHubFaqs, upDetailFaqs, JORNADAS_HUB_NAME } from "@/data/jornadas";
import { marketingFaqs } from "@/components/marketing/marketingData";

import { generateFAQSchema, generateBreadcrumbSchema, generateWebPageSchema, generateHomeSEO } from "./seoCore";
export { generateFAQSchema, generateBreadcrumbSchema, generateWebPageSchema, generateHomeSEO };

const BASE_URL = "https://academiadetail.com";

// ============================================
// ORGANIZATION SCHEMA COMPLETO CON SAMEAS
// ============================================
// Google Maps Place URL canónica (same as SEO.tsx)
const GOOGLE_MAPS_PLACE_URL = "https://www.google.com/maps/place/Detail+Park/@38.3377617,-0.5168395,17z/data=!4m6!3m5!1s0xd623648a719504f:0xd9b48559af87cfc6!8m2!3d38.3377617!4d-0.5168395";

export const organizationSchemaComplete = {
  "@context": "https://schema.org",
  "@type": ["Organization", "EducationalOrganization", "LocalBusiness"],
  "@id": "https://academiadetail.com/#local-business",
  name: "Detail Park - Academia Detail",
  alternateName: ["Academia Detail", "Detail Park", "Academia Detailing", "Detail Park Academy"],
  url: BASE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${BASE_URL}/og-image.png`,
    width: 1200,
    height: 630,
  },
  image: `${BASE_URL}/og-image.png`,
  description:
    "El ÚNICO centro de formación en detailing que opera en un taller 100% real con clientes de alta gama. Aprende técnica Y negocio desde el día 1.",
  slogan: "No enseñamos a lavar coches, formamos empresarios del Detailing",
  foundingDate: "2017",
  telephone: "+34 622 773 555",
  email: "info@academiadetail.com",
  priceRange: "€€",
  currenciesAccepted: "EUR",
  paymentAccepted: "Efectivo, Tarjeta de Crédito, Transferencia Bancaria",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Calle Metalurgias, 13",
    addressLocality: "Alicante",
    addressRegion: "Comunidad Valenciana",
    postalCode: "03008",
    addressCountry: "ES",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 38.3377617,
    longitude: -0.5168395,
  },
  sameAs: [
    "http://www.detailpark.com/",
    "https://www.instagram.com/detailparkoficial/",
    "https://www.instagram.com/danidetailoficial/",
    "https://www.youtube.com/@detailpark",
    "https://www.facebook.com/detailpark",
    "https://facebook.com/detailparkoficial",
    "https://www.tiktok.com/@detailpark",
    "https://www.tiktok.com/@detail_park",
    GOOGLE_MAPS_PLACE_URL,
  ],
  hasMap: GOOGLE_MAPS_PLACE_URL,
  // La valoración va solo en localBusinessSchema (mismo @id): si se repite, Google
  // fusiona la entidad con dos valoraciones y marca «varias puntuaciones agregadas».
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "14:00",
    },
  ],
  areaServed: {
    "@type": "Country",
    name: "Spain",
  },
  knowsAbout: [
    "Detailing Profesional",
    "Gestión de Negocio Detailing",
    "PPF Installation",
    "Car Wrapping",
    "Presupuestación de Servicios",
    "Captación de Clientes VIP",
  ],
};

// ============================================
// INSTRUCTOR SCHEMA REUTILIZABLE
// ============================================
export const instructorSchema = {
  "@type": "Person",
  name: "Daniel López",
  jobTitle: "CEO y Formador Principal",
  description: "Detailer profesional con más de 15 años de experiencia en vehículos de alta gama",
  image: `${BASE_URL}/daniel-lopez-instructor.webp`,
  worksFor: {
    "@type": "Organization",
    name: "Detail Park - Academia Detail",
  },
};

// ============================================
// HELPERS: Duration & Instructor
// ============================================
const parseDurationToISO = (duration: string): { iso: string; workload: string } => {
  const match = duration.match(/(\d+)(?:\s*-\s*(\d+))?/);
  if (!match) return { iso: "P5D", workload: "PT40H" };
  const maxDays = parseInt(match[2] || match[1]);
  return { iso: `P${maxDays}D`, workload: `PT${maxDays * 8}H` };
};

const generateInstructorSchema = (instructor?: FormationInstructor) => {
  if (!instructor) return instructorSchema;
  return {
    "@type": "Person" as const,
    name: instructor.name,
    jobTitle: instructor.role,
    description: instructor.description,
    worksFor: {
      "@type": "Organization" as const,
      name: "Detail Park - Academia Detail",
    },
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
  const { iso: durationISO, workload } = parseDurationToISO(course.duration || "5");
  const courseInstructor = generateInstructorSchema(course.instructor);

  // Build syllabusSections from modules
  const syllabusSections = course.modules?.map((mod) => ({
    "@type": "Syllabus",
    name: mod.title,
    description: mod.topics.join(", "),
  }));

  // Build hasPart from modules
  const hasPart = course.modules?.map((mod, i) => ({
    "@type": "Course",
    name: mod.title,
    description: mod.topics.join(". "),
    position: i + 1,
    provider: { "@type": "Organization", name: "Detail Park - Academia Detail" },
  }));

  // Build CourseInstance per level (or single default)
  const courseInstances =
    course.levels && course.levels.length > 0
      ? course.levels.map((level) => ({
          "@type": "CourseInstance" as const,
          name: level.title,
          description: level.subtitle,
          courseMode: "onsite",
          duration: level.duration ? parseDurationToISO(level.duration).iso : durationISO,
          inLanguage: "es",
          courseWorkload: level.duration ? parseDurationToISO(level.duration).workload : workload,
          instructor: courseInstructor,
          maximumAttendeeCapacity: 3,
          location: {
            "@type": "Place" as const,
            name: "Academia Detail - Taller 100% Real",
            address: {
              "@type": "PostalAddress" as const,
              streetAddress: "Calle Metalurgias, 13",
              addressLocality: "Alicante",
              postalCode: "03008",
              addressCountry: "ES",
            },
          },
          ...(level.price && {
            offers: {
              "@type": "Offer" as const,
              price: level.price,
              priceCurrency: "EUR",
              availability: "https://schema.org/LimitedAvailability",
            },
          }),
        }))
      : [
          {
            "@type": "CourseInstance" as const,
            courseSchedule: {
              "@type": "Schedule" as const,
              repeatFrequency: "P1M",
              repeatCount: 12,
            },
            courseMode: "onsite",
            duration: durationISO,
            inLanguage: "es",
            courseWorkload: workload,
            instructor: courseInstructor,
            maximumAttendeeCapacity: 3,
            location: {
              "@type": "Place" as const,
              name: "Academia Detail - Taller 100% Real",
              address: {
                "@type": "PostalAddress" as const,
                streetAddress: "Calle Metalurgias, 13",
                addressLocality: "Alicante",
                postalCode: "03008",
                addressCountry: "ES",
              },
            },
          },
        ];

  // Build offers with priceSpecification
  const offers: Record<string, unknown> = {
    "@type": "Offer",
    price: course.price,
    priceCurrency: "EUR",
    availability: course.comingSoon ? "https://schema.org/PreOrder" : "https://schema.org/LimitedAvailability",
    validFrom: "2025-01-01",
    priceValidUntil: "2026-12-31",
    url: `${BASE_URL}${course.url}`,
    seller: { "@type": "Organization", name: "Detail Park - Academia Detail" },
  };

  // Build teaches from real data or fallback
  const teaches =
    course.whatYouLearn && course.whatYouLearn.length > 0
      ? course.whatYouLearn
      : [
          `Técnicas profesionales de ${course.name}`,
          "Gestión de clientes y presupuestos",
          "Visión de negocio y rentabilidad",
        ];

  // Build credential
  const credential = {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "certificate",
    name: course.certificationTitle || "Certificado Profesional Academia Detail",
  };

  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.name,
    description: course.description,
    provider: {
      "@type": "EducationalOrganization",
      name: "Detail Park - Academia Detail",
      url: BASE_URL,
      logo: `${BASE_URL}/og-image.png`,
      sameAs: organizationSchemaComplete.sameAs,
    },
    offers: offers,
    hasCourseInstance: courseInstances,
    coursePrerequisites: "Sin experiencia previa necesaria",
    educationalCredentialAwarded: credential.name,
    occupationalCredentialAwarded: credential,
    teaches: teaches,
    ...(course.forWho &&
      course.forWho.length > 0 && {
        audience: {
          "@type": "EducationalAudience",
          audienceType: course.forWho.join("; "),
        },
      }),
    ...(hasPart && hasPart.length > 0 && { hasPart: hasPart }),
    ...(syllabusSections && syllabusSections.length > 0 && { syllabusSections: syllabusSections }),
    ...(course.image && { image: course.image }),
    inLanguage: "es",
    isAccessibleForFree: false,
  };
};

// Legacy alias for backwards compatibility
export const generateCourseSchema = generateCourseSchemaEnhanced;

// ============================================
// VIDEO OBJECT SCHEMA GENERATOR (Rich Snippets de Video)
// ============================================
const formatUploadDate = (date: string): string => {
  if (date.includes("T") && (date.includes("+") || date.includes("Z"))) return date;
  return `${date}T00:00:00+00:00`;
};

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
  name: video.title,
  description: video.description || `Testimonio de ${video.name || "alumno"} sobre su experiencia en Academia Detail`,
  thumbnailUrl: `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`,
  uploadDate: formatUploadDate(video.uploadDate || "2025-06-01"),
  contentUrl: `https://www.youtube.com/watch?v=${video.id}`,
  embedUrl: `https://www.youtube.com/embed/${video.id}`,
  duration: video.duration || "PT3M",
  publisher: {
    "@type": "Organization",
    name: "Detail Park - Academia Detail",
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/og-image.png`,
    },
  },
});

export const generateVideoObjectSchemas = (
  videos: {
    id: string;
    title: string;
    description?: string;
    name?: string;
    uploadDate?: string;
    duration?: string;
  }[],
) => videos.map((video) => generateVideoObjectSchema(video));

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
  name: event.name,
  description: event.description,
  startDate: event.startDate,
  endDate: event.endDate,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: event.location || "Academia Detail - Taller 100% Real",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Calle Metalurgias, 13",
      addressLocality: "Alicante",
      postalCode: "03008",
      addressCountry: "ES",
    },
  },
  organizer: {
    "@type": "Organization",
    name: "Detail Park - Academia Detail",
    url: BASE_URL,
  },
  offers: {
    "@type": "Offer",
    price: event.price,
    priceCurrency: "EUR",
    availability: "https://schema.org/LimitedAvailability",
    validFrom: "2025-01-01",
    priceValidUntil: "2026-12-31",
  },
  performer: instructorSchema,
});


// ============================================
// IMAGE OBJECT SCHEMA
// ============================================
export const generateImageObjectSchema = (image: {
  url: string;
  name: string;
  description: string;
  width?: number;
  height?: number;
}) => ({
  "@context": "https://schema.org",
  "@type": "ImageObject",
  contentUrl: image.url,
  url: image.url,
  name: image.name,
  description: image.description,
  width: image.width || 1200,
  height: image.height || 630,
  encodingFormat: image.url.endsWith(".jpg") || image.url.endsWith(".jpeg") ? "image/jpeg" : "image/png",
  representativeOfPage: true,
  license: "https://academiadetail.com/politica-privacidad",
  acquireLicensePage: "https://academiadetail.com/contacto",
  creditText: "Academia Detail - Detail Park",
  creator: {
    "@type": "Organization",
    name: "Detail Park - Academia Detail",
    url: "https://academiadetail.com",
  },
});

// ============================================
// EDUCATIONAL ORGANIZATION SCHEMA (LEGACY)
// ============================================
export const educationalOrganizationSchema = organizationSchemaComplete;

// ============================================
// SLUG MAPPING
// ============================================
const slugMapping: Record<string, string> = {
  detailing: "curso-detailing-profesional",
  wrapping: "curso-vinilado-vehiculos",
  ppf: "curso-ppf-proteccion-pintura",
  restauracion: "curso-restauracion-vehiculos",
  "curso-detailing-profesional": "curso-detailing-profesional",
  "curso-vinilado-vehiculos": "curso-vinilado-vehiculos",
  "curso-ppf-proteccion-pintura": "curso-ppf-proteccion-pintura",
  "curso-restauracion-vehiculos": "curso-restauracion-vehiculos",
};

const normalizeSlug = (slug: string): string => {
  return slugMapping[slug] || slug;
};

// ============================================
// SERVICE SCHEMA - MARKETING DIGITAL PARA DETAILING
// ============================================
const MARKETING_URL = `${BASE_URL}/marketing-digital-detailing`;

const marketingOffer = (
  name: string,
  description: string,
  price: string,
  anchor: string,
) => ({
  "@type": "Offer",
  name,
  description,
  price,
  priceCurrency: "EUR",
  url: `${MARKETING_URL}#${anchor}`,
  availability: "https://schema.org/InStock",
  valueAddedTaxIncluded: false,
  priceSpecification: {
    "@type": "PriceSpecification",
    price,
    priceCurrency: "EUR",
    valueAddedTaxIncluded: false,
  },
  seller: {
    "@type": "Organization",
    "@id": "https://academiadetail.com/#local-business",
    name: "Detail Park - Academia Detail",
  },
});

export const marketingServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${MARKETING_URL}#service`,
  name: "Marketing digital para centros de detailing",
  serviceType: "Diseño web, SEO local, GEO e identidad de marca para detailing",
  description:
    "Diseño y desarrollo web, SEO local, posicionamiento en buscadores de IA (GEO), Google Business Profile, redes sociales e identidad de marca para talleres y centros de detailing.",
  url: MARKETING_URL,
  provider: {
    "@type": ["Organization", "ProfessionalService"],
    "@id": "https://academiadetail.com/#local-business",
    name: "Detail Park - Academia Detail",
    url: BASE_URL,
    telephone: "+34 622 773 555",
    email: "info@academiadetail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Calle Metalurgias, 13",
      addressLocality: "Alicante",
      addressRegion: "Comunidad Valenciana",
      postalCode: "03008",
      addressCountry: "ES",
    },
  },
  areaServed: [
    { "@type": "Country", name: "España" },
    { "@type": "City", name: "Alicante" },
    { "@type": "City", name: "Valencia" },
    { "@type": "City", name: "Murcia" },
  ],
  audience: {
    "@type": "BusinessAudience",
    name: "Centros y profesionales del detailing",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Packs de marketing digital para detailing",
    itemListElement: [
      marketingOffer(
        "Página web de arranque",
        "Landing page profesional de una sola página con galería, formulario y botón de WhatsApp.",
        "199",
        "pack-landing",
      ),
      marketingOffer(
        "Página web Profesional",
        "Web multi-sección con páginas de servicio, blog, galería avanzada y estructura técnica SEO.",
        "889",
        "pack-profesional",
      ),
      marketingOffer(
        "SEO + Posicionamiento en buscadores de IA (GEO)",
        "Auditoría SEO, optimización on page, SEO local, datos estructurados y optimización GEO.",
        "99",
        "pack-seo-geo",
      ),
    ],
  },
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "EUR",
    lowPrice: "99",
    highPrice: "889",
    offerCount: 3,
    url: `${MARKETING_URL}#packs`,
  },
};

export const seoConfig = {
  // Legacy static fallback - prefer generateHomeSEO()
  home: {
    title: "Cursos de Detailing en Alicante | Detail Park",
    description:
      "Academia de detailing en Alicante. Cursos 100 % prácticos de detailing, pulido, tratamiento cerámico, wrapping y PPF en un taller real. 218 alumnos formados.",
    // ── KEYWORDS HOME ENRIQUECIDAS ──────────────────────────────────────────
    keywords:
      "curso detailing, curso detailing intensivo, curso de pulido de coches, curso pulido profesional, curso pulido coche certificado, curso tratamiento cerámico, curso coating cerámico coches, aprender aplicar cerámico coche, curso limpiar coches profesional, curso lavado profesional coches, escuela de detailing, academia detailing, academia detailing alicante, curso detailing alicante, curso ppf alicante, curso wrapping alicante, curso detailing comunidad valenciana, cómo montar negocio detailing, cómo montar centro detailing, abrir taller detailing, montar negocio detailing España, negocio detailing rentable, emprender detailing, cómo montar lavadero de coches, formación detailing España, aprender detailing desde cero, curso detailing online vs presencial, bolsa empleo detailing, certificación oficial detailing, financiar curso detailing, curso detailing Madrid, curso detailing Barcelona, curso de detailing, curso de car detailing, curso de detailing de autos, academia detailing latinoamerica, curso wrapping básico, curso wrapping avanzado, curso vinilado profesional, curso ppf paint protection film, curso pulido carrocería, curso tapizado asientos coches, curso restauración tapicería cuero, qué es el detailing profesional, cuánto cobra un detailer profesional, diferencia detailing lavado normal, salidas laborales detailing, herramientas detailing profesional, ppf vs ceramic coating, precio instalar ppf coche",
    url: "/",
    price: "2997",
    schema: [
      localBusinessSchema,
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Detail Park - Academia Detail",
        alternateName: "Detail Park Academy",
        url: BASE_URL,
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${BASE_URL}/blog?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      generateWebPageSchema({
        name: "Cursos de Detailing Profesional en España",
        description: "Formación 100% práctica en taller real con visión de negocio",
        url: "/",
      }),
      generateBreadcrumbSchema([{ name: "Inicio", url: "/" }]),
    ],
  },

  jornadaCero: {
    title: "Jornada Zero: iniciación al detailing en 1 día | Alicante",
    description:
      "Tu primer día de detailing profesional en el taller de Detail Park (Alicante): práctica sobre un vehículo real, material, comida y certificado. 97 € + IVA, descontables de un curso completo.",
    keywords:
      "jornada zero detailing, curso detailing 1 día, curso iniciación detailing, iniciación detailing Alicante, primer contacto detailing profesional, aprender detailing desde cero, jornada detailing principiantes",
    url: "/jornada-zero-detailing",
    image: `${BASE_URL}/og-jornada-zero.jpg`,
    price: "97",
    schema: [
      localBusinessSchema,
      // Un solo Course; sin EducationEvent mientras no haya fecha (startDate es obligatorio)
      courseJornadaZeroSchema,
      generateWebPageSchema({
        name: "Jornada Zero",
        description: "Jornada de iniciación de un día para descubrir el detailing profesional en el taller de Detail Park",
        url: "/jornada-zero-detailing",
      }),
      generateBreadcrumbSchema([
        { name: "Inicio", url: "/" },
        { name: JORNADAS_HUB_NAME, url: "/curso-detailing-iniciacion" },
        { name: "Jornada Zero", url: "/jornada-zero-detailing" },
      ]),
      generateFAQSchema(jornadaZeroFaqs),
    ],
  },

  jornadasHub: {
    title: "Jornadas de iniciación al detailing en Alicante | Jornada Zero y Up Detail",
    description:
      "Dos formatos de un día para acercarte al detailing profesional en Detail Park (Alicante): la Jornada Zero (97 € + IVA) y Up Detail, un evento puntual intensivo. Compara y elige.",
    keywords:
      "jornada detailing, curso detailing 1 dia, iniciacion detailing, up detail, jornada zero, curso iniciación detailing Alicante, jornada intensiva detailing principiantes, primer paso detailing profesional",
    url: "/curso-detailing-iniciacion",
    image: `${BASE_URL}/og-jornada-zero.jpg`,
    price: "97",
    schema: [
      localBusinessSchema,
      generateWebPageSchema({
        name: "Jornadas de iniciación al detailing",
        description: "Jornada Zero y Up Detail: dos formatos de un día para descubrir el detailing profesional",
        url: "/curso-detailing-iniciacion",
      }),
      generateBreadcrumbSchema([
        { name: "Inicio", url: "/" },
        { name: JORNADAS_HUB_NAME, url: "/curso-detailing-iniciacion" },
      ]),
      generateFAQSchema(jornadasHubFaqs),
    ],
  },

  upDetail: {
    title: "Up Detail: formación intensiva de detailing en 1 día | Alicante",
    description:
      "Up Detail es un formato para aprender lo máximo en el menor tiempo: demostraciones y práctica de detailing profesional en una jornada intensiva en Detail Park (Alicante), comida incluida. Apúntate al aviso.",
    keywords:
      "up detail, jornada detailing intensiva, demostración detailing, formación detailing 1 día, evento detailing Alicante, masterclass detailing",
    url: "/up-detail-evento",
    image: `${BASE_URL}/og-jornada-zero.jpg`,
    schema: [
      localBusinessSchema,
      // Sin EducationEvent mientras no haya fecha (startDate es obligatorio)
      {
        "@context": "https://schema.org",
        "@type": "Course",
        "@id": `${BASE_URL}/up-detail-evento/#course`,
        name: "Up Detail",
        description:
          "Evento puntual de formación intensiva de un día para aprender lo máximo en el menor tiempo: demostraciones de Daniel López y profesionales invitados y práctica sobre vehículos reales en Detail Park. Comida incluida.",
        url: `${BASE_URL}/up-detail-evento`,
        provider: {
          "@type": "EducationalOrganization",
          name: "Detail Park - Academia Detail",
          url: BASE_URL,
        },
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: "onsite",
          courseWorkload: "P1D",
          location: {
            "@type": "Place",
            name: "Detail Park",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Calle Metalurgias, 13",
              addressLocality: "Alicante",
              postalCode: "03008",
              addressCountry: "ES",
            },
          },
        },
        inLanguage: "es",
      },
      generateWebPageSchema({
        name: "Up Detail",
        description: "Formación intensiva de detailing en un día, en formato de demostración",
        url: "/up-detail-evento",
      }),
      generateBreadcrumbSchema([
        { name: "Inicio", url: "/" },
        { name: JORNADAS_HUB_NAME, url: "/curso-detailing-iniciacion" },
        { name: "Up Detail", url: "/up-detail-evento" },
      ]),
      generateFAQSchema(upDetailFaqs),
    ],
  },

  carreraDetailing: {
    title: "Formación Profesional de Detailing, Wrapping y PPF | Alicante",
    description:
      "Carrera Detailing: un mes en un taller real de Alicante con los cursos de detailing, car wrapping y PPF, práctica con coches de clientes y módulo de negocio.",
    keywords:
      "formación profesional detailing, carrera detailing, cómo montar centro detailing, abrir negocio detailing, abrir taller detailing España, emprender detailing, curso completo detailing, programa completo detailing, cómo montar un negocio de detailing desde cero, aprender detailing desde cero, curso detailing wrapping ppf, curso detailing Alicante, formacion profesional detailing España",
    url: "/formacion-profesional-detailing",
    image: `${BASE_URL}/og-carrera-detailing.jpg`,
    price: "9997",
    schema: [
      localBusinessSchema,
      courseFormacionProfesionalSchema,
      {
        "@context": "https://schema.org",
        "@type": "EducationalOccupationalProgram",
        name: "Carrera Detailing - Formación profesional de detailing",
        description:
          "Programa de 1 mes en Detail Park (Alicante): cursos de detailing, car wrapping (dos niveles) y PPF, práctica en el taller con coches de clientes y módulo de negocio.",
        url: `${BASE_URL}/formacion-profesional-detailing`,
        timeToComplete: "P1M",
        occupationalCredentialAwarded: {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "certificate",
          name: "Certificado de Detail Park de cada especialidad",
        },
        programPrerequisites: "Sin experiencia previa necesaria",
        provider: {
          "@type": "EducationalOrganization",
          name: "Detail Park - Academia Detail",
          url: BASE_URL,
          sameAs: organizationSchemaComplete.sameAs,
        },
        offers: {
          "@type": "Offer",
          price: "9997",
          priceCurrency: "EUR",
          url: `${BASE_URL}/formacion-profesional-detailing`,
        },
        hasCourse: [
          { "@type": "Course", name: "Curso de Detailing Profesional", url: `${BASE_URL}/curso-detailing-profesional` },
          { "@type": "Course", name: "Curso de Car Wrapping", url: `${BASE_URL}/curso-vinilado-vehiculos` },
          { "@type": "Course", name: "Curso de PPF", url: `${BASE_URL}/curso-ppf-proteccion-pintura` },
        ],
      },
      generateWebPageSchema({
        name: "Carrera Profesional de Detailing",
        description: "Formación completa de 1 mes para montar tu centro de detailing",
        url: "/formacion-profesional-detailing",
      }),
      generateBreadcrumbSchema([
        { name: "Inicio", url: "/" },
        { name: "Formación Profesional Detailing", url: "/formacion-profesional-detailing" },
      ]),
      generateFAQSchema(carreraDetailingData.faqs),
    ],
  },

  aboutUs: {
    title: "Quiénes Somos | Detail Park - Academia Detail",
    description:
      "Academia Detail es la escuela de Detail Park, un centro de detailing, wrapping y PPF en Alicante desde 2017. Conoce al equipo, las instalaciones y cómo formamos.",
    keywords:
      "quienes somos academia detailing, historia detail park, centro formacion detailing españa, escuela detailing alicante, curso detailing profesional taller real, videos detailing profesional",
    url: "/quienes-somos",
    schema: [
      localBusinessSchema,
      {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        name: "Quiénes Somos - Academia Detail",
        description:
          "Historia, equipo e instalaciones de Academia Detail, la escuela de Detail Park (Alicante, desde 2017).",
        url: `${BASE_URL}/quienes-somos`,
        mainEntity: organizationSchemaComplete,
      },
      generateWebPageSchema({
        name: "Quiénes Somos - Academia Detail",
        description: "Historia, equipo e instalaciones de Academia Detail en Alicante",
        url: "/quienes-somos",
      }),
      generateBreadcrumbSchema([
        { name: "Inicio", url: "/" },
        { name: "Quiénes Somos", url: "/quienes-somos" },
      ]),
    ],
  },

  glossary: {
    title: "Glosario Detailing | +85 Términos Profesionales",
    description:
      "✅ Domina el vocabulario del detailing profesional. +85 términos con definiciones: PPF, coating cerámico, clay bar, swirl marks y más. ➤ Guía de referencia completa.",
    keywords:
      "glosario detailing, terminología detailing, diccionario car detailing, que es PPF, que es coating cerámico, términos detailing profesional, vocabulario detailing",
    url: "/glosario-detailing",
    schema: [
      localBusinessSchema,
      {
        "@context": "https://schema.org",
        "@type": "DefinedTermSet",
        name: "Glosario de Detailing Profesional",
        description: "Diccionario enciclopédico con más de 85 términos técnicos de detallado automotriz profesional",
        url: `${BASE_URL}/glosario-detailing`,
        inLanguage: "es",
        publisher: {
          "@type": "Organization",
          name: "Detail Park - Academia Detail",
          url: BASE_URL,
        },
      },
      generateWebPageSchema({
        name: "Glosario de Detailing Profesional",
        description: "Diccionario completo de términos técnicos del detallado automotriz",
        url: "/glosario-detailing",
      }),
      generateBreadcrumbSchema([
        { name: "Inicio", url: "/" },
        { name: "Glosario de Detailing", url: "/glosario-detailing" },
      ]),
    ],
  },

  calculadoraDilucion: {
    title: "Calculadora y Tabla de Diluciones para Detailing",
    description:
      "Calcula la dilución exacta de APC, champú o desengrasante: ratios 1:10, 1:20, 1:50 y más, con las medidas en ml de producto y agua. Herramienta gratuita.",
    keywords:
      "calculadora dilución detailing, ratio mezcla productos limpieza coche, como diluir productos detailing, tabla diluciones detailing, proporción agua producto limpieza, calculadora mezcla química coche, dilución APC detailing, ratio champú coche",
    url: "/calculadora-dilucion-detailing",
    schema: [
      localBusinessSchema,
      generateWebPageSchema({
        name: "Calculadora de Dilución para Productos de Detailing",
        description:
          "Herramienta interactiva para calcular la dilución exacta de productos químicos de car detailing profesional",
        url: "/calculadora-dilucion-detailing",
      }),
      generateBreadcrumbSchema([
        { name: "Inicio", url: "/" },
        { name: "Glosario de Detailing", url: "/glosario-detailing" },
        { name: "Calculadora de Dilución", url: "/calculadora-dilucion-detailing" },
      ]),
    ],
  },

  marketingDigital: {
    title: "Marketing Digital para Detailing | Web, SEO y Marca",
    description:
      "Diseño web, SEO y GEO para centros de detailing. Webs desde 199 € y SEO desde 99 € + IVA, pago único. Más visibilidad en Google y en la IA. Escríbenos por WhatsApp.",
    keywords:
      "marketing digital para detailing, diseño web para detailing, página web para taller de detailing, SEO para centros de detailing, posicionamiento web taller de coches, logotipo para taller de detailing, GEO buscadores de IA negocios locales",
    url: "/marketing-digital-detailing",
    schema: [
      localBusinessSchema,
      generateWebPageSchema({
        name: "Marketing digital para centros de detailing: web, SEO y marca",
        description:
          "Servicios de diseño web, SEO local, GEO para buscadores de IA e identidad de marca para centros y profesionales del detailing en toda España.",
        url: "/marketing-digital-detailing",
      }),
      marketingServiceSchema,
      generateBreadcrumbSchema([
        { name: "Inicio", url: "/" },
        { name: "Marketing Digital para Detailing", url: "/marketing-digital-detailing" },
      ]),
      generateFAQSchema(marketingFaqs),
    ],
  },


  contact: {
    title: "Contacto | Academia Detail Alicante | Reserva tu plaza",
    description:
      "Pide información o reserva tu plaza en los cursos de detailing, wrapping y PPF de Academia Detail en Alicante. Te respondemos en 48 horas laborables, o escríbenos por WhatsApp.",
    keywords:
      "academia detailing Alicante, cursos detailing Valencia, formación detailing España, contacto academia detailing, reservar curso detailing taller real",
    url: "/contacto",
    schema: [
      localBusinessSchema,
      {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: "Contacto Academia Detail - Alicante",
        description:
          "Página de contacto de Academia Detail para información sobre cursos de detailing profesional en Alicante y Valencia.",
        url: `${BASE_URL}/contacto`,
        mainEntity: {
          "@type": "Organization",
          name: "Detail Park - Academia Detail",
          telephone: "+34 622 773 555",
          email: "info@academiadetail.com",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Calle Metalurgias, 13",
            addressLocality: "Alicante",
            postalCode: "03008",
            addressCountry: "ES",
          },
        },
      },
      generateWebPageSchema({
        name: "Contacto Academia Detail",
        description: "Contacta con nosotros para reservar tu plaza en los cursos de detailing",
        url: "/contacto",
      }),
      generateBreadcrumbSchema([
        { name: "Inicio", url: "/" },
        { name: "Contacto", url: "/contacto" },
      ]),
    ],
  },

  // Formation pages SEO config generator
  getFormationSEO: (
    slug: string,
    formation: {
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
    },
    videoTestimonials?: { id: string; title: string; name?: string; role?: string }[],
  ) => {
    const normalizedSlug = normalizeSlug(slug);

    const formationKeywords: Record<string, string> = {
      // ── DETAILING: se mantiene intacto + nuevas keywords de gap ────────────
      "curso-detailing-profesional":
        "curso detailing intensivo, curso detailing profesional taller real, curso detailing desde cero, curso pulido profesional, curso pulido coche certificado, curso pulido carrocería, corrección pintura negocio, formación detailing presencial, curso detailing Alicante, curso detailing Madrid, curso detailing Barcelona, bolsa empleo detailing, certificación oficial detailing, curso tratamiento cerámico, curso coating cerámico coches, aprender aplicar cerámico coche, ceramic coating duración, escuela detailing España, curso de car detailing, curso de detailing de autos, curso detailing online latinoamerica, qué es el detailing profesional, cuánto cobra un detailer profesional, diferencia detailing lavado normal, salidas laborales detailing, herramientas detailing profesional",
      // ── WRAPPING: se mantiene intacto + nuevas keywords de gap ─────────────
      "curso-vinilado-vehiculos":
        "curso wrapping intensivo, curso vinilado vehículos profesional, curso car wrapping negocio, rotulación coches formación, vinilado vehiculos formacion, wrap coche taller real, cambio color coche rentable, curso wrapping desde cero, curso wrapping Alicante, bolsa empleo wrapping, curso wrapping básico, curso wrapping avanzado, aprender vinilar coches, vinilado integral vs parcial, técnica vinilo fibra de carbono, formación car wrapping profesional, curso vinilado profesional",
      // ── PPF: se mantiene intacto + nuevas keywords de gap ──────────────────
      "curso-ppf-proteccion-pintura":
        "curso PPF intensivo, curso PPF taller real, instalación PPF formación, curso protección pintura profesional, curso PPF España presencial, curso PPF Alicante, aprender instalar PPF coches, curso vinilo protección pintura, PPF instalador certificado España, proteger pintura coche negocio, film transparente formación práctica, curso PPF desde cero, bolsa empleo PPF, paint protection film curso, instalar ppf curso profesional, ppf vs ceramic coating, precio instalar ppf coche, xpel training certificación, certificación ppf españa",
      // ── RESTAURACIÓN: se mantiene intacto + nuevas keywords de gap ─────────
      "curso-restauracion-vehiculos":
        "curso restauración vehículos intensivo, curso restauración vehículos Alicante, restauración cuero vehículo profesional, restauración tapicerías cuero, restaurar coches clásicos negocio, curso corrección pintura avanzada, restauración interior exterior vehículos curso, reparar pintura coche formación taller real, curso restauración desde cero, tapizado asientos coche, curso tapizado asientos coches, curso restauración tapicería cuero, curso chapa y pintura detailing, formación restauración coches, formación restauración coches profesional, restauración vehículos clásicos curso, técnicas restauración automóviles",
    };

    const formationTitles: Record<string, string> = {
      "curso-detailing-profesional":
        "Curso de Detailing Profesional: Pulido y Cerámico en 4 Días",
      "curso-vinilado-vehiculos": "Curso de Wrapping y Vinilado de Coches | 2-4 Días",
      "curso-ppf-proteccion-pintura": "Curso de PPF: Instalación de Film de Protección | Alicante",
      "curso-restauracion-vehiculos": "Curso de Restauración de Vehículos en Taller Real | Alicante",
    };

    const formationDescriptions: Record<string, string> = {
      "curso-detailing-profesional":
        "Curso de detailing presencial de 4 días desde 2.997 € + IVA: pulido profesional y cerámico en taller real, grupos de 3 alumnos, certificación y bolsa de empleo.",
      "curso-vinilado-vehiculos":
        "Aprende wrapping y vinilado de coches en 2-4 días en un taller real de Alicante: cambio de color y técnica profesional, con certificación y bolsa de empleo.",
      "curso-ppf-proteccion-pintura":
        "Formación presencial de 2 días en instalación de PPF (paint protection film) en Alicante. Práctica sobre coches reales de alta gama y certificación.",
      "curso-restauracion-vehiculos":
        "Restauración de vehículos en taller real: corrección de pintura, recuperación de interiores y tratamientos avanzados. Formación presencial en Alicante.",
    };

    const formationImages: Record<string, string> = {
      "curso-detailing-profesional": `${BASE_URL}/og-curso-detailing.jpg`,
      "curso-vinilado-vehiculos": `${BASE_URL}/og-curso-wrapping.jpg`,
      "curso-ppf-proteccion-pintura": `${BASE_URL}/og-curso-ppf.jpg`,
      "curso-restauracion-vehiculos": `${BASE_URL}/og-curso-restauracion.jpg`,
    };

    const formationNames: Record<string, string> = {
      "curso-detailing-profesional": "Curso Detailing Profesional",
      "curso-vinilado-vehiculos": "Curso Car Wrapping Profesional",
      "curso-ppf-proteccion-pintura": "Curso PPF Protección Pintura",
      "curso-restauracion-vehiculos": "Curso Restauración Vehículos",
    };

    const coursePrices: Record<string, string> = {
      "curso-detailing-profesional": "2997",
      "curso-vinilado-vehiculos": "1999",
      "curso-ppf-proteccion-pintura": "2397",
      "curso-restauracion-vehiculos": "449",
    };

    const imageUrl = formationImages[normalizedSlug] || `${BASE_URL}/og-image.png`;

    return {
      title: formationTitles[normalizedSlug] || `${formation.title} Profesional | Curso Intensivo en España`,
      description:
        formationDescriptions[normalizedSlug] ||
        `Domina ${formation.title} con nuestra formación profesional. Técnicas avanzadas y certificación oficial. ¡Accede a nuestra bolsa de empleo!`,
      keywords:
        formationKeywords[normalizedSlug] ||
        "curso detailing profesional españa, formación automotriz certificada, bolsa empleo detailing",
      url: `/${normalizedSlug}`,
      image: imageUrl,
      type: "product" as const,
      price: coursePrices[normalizedSlug] || String(formation.price),
      schema: [
        localBusinessSchema,
        ...((
          {
            "curso-detailing-profesional": courseDetailingSchema,
            "curso-vinilado-vehiculos": courseWrappingSchema,
            "curso-ppf-proteccion-pintura": coursePPFSchema,
            "curso-restauracion-vehiculos": courseRestauracionSchema,
          } as Record<string, object>
        )[normalizedSlug]
          ? [
              (
                {
                  "curso-detailing-profesional": courseDetailingSchema,
                  "curso-vinilado-vehiculos": courseWrappingSchema,
                  "curso-ppf-proteccion-pintura": coursePPFSchema,
                  "curso-restauracion-vehiculos": courseRestauracionSchema,
                } as Record<string, object>
              )[normalizedSlug],
            ]
          : []),
        generateCourseSchemaEnhanced({
          name: formationNames[normalizedSlug] || formation.title,
          description: formationDescriptions[normalizedSlug] || formation.description,
          price: formation.price,
          duration: formation.duration,
          url: `/${normalizedSlug}`,
          image: imageUrl,
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
          url: `/${normalizedSlug}`,
          image: imageUrl,
        }),
        generateBreadcrumbSchema([
          { name: "Inicio", url: "/" },
          { name: "Formaciones", url: "/#formaciones" },
          { name: formationNames[normalizedSlug] || formation.title, url: `/${normalizedSlug}` },
        ]),
        generateImageObjectSchema({
          url: imageUrl,
          name: `Práctica profesional - ${formationNames[normalizedSlug] || formation.title}`,
          description: `Alumno practicando técnicas profesionales en el curso de ${formationNames[normalizedSlug] || formation.title} en Academia Detail`,
        }),
        // VideoObject schemas for video testimonials on this course page
        ...(videoTestimonials && videoTestimonials.length > 0
          ? generateVideoObjectSchemas(
              videoTestimonials.map((v) => ({
                id: v.id,
                title: `Testimonio Alumno - ${v.title}`,
                name: v.name,
                description: `${v.title} - Testimonio real de alumno del ${formationNames[normalizedSlug] || formation.title} en Academia Detail`,
                uploadDate: "2025-06-01",
                duration: "PT3M",
              })),
            )
          : []),
      ],
    };
  },
};

export default seoConfig;

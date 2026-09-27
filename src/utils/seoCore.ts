// SEO común y de la portada. Va aparte de seoConfig.ts para que la portada
// no cargue la configuración SEO de todas las demás páginas.
import type { FormationDetail } from "@/data/formationDetails";
import { localBusinessSchema, websiteSchema } from "@/components/SEO";
import { homeFaqs } from "@/data/homeContent";

const BASE_URL = "https://academiadetail.com";

// ============================================
// FAQ SCHEMA GENERATOR
// ============================================
export const generateFAQSchema = (faqs: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});

// ============================================
// BREADCRUMB SCHEMA GENERATOR
// ============================================
export const generateBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: `${BASE_URL}${item.url}`,
  })),
});

// ============================================
// WEBPAGE SCHEMA WITH SPEAKABLE (VOICE SEARCH)
// ============================================
export const generateWebPageSchema = (page: { name: string; description: string; url: string; image?: string }) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: page.name,
  description: page.description,
  url: `${BASE_URL}${page.url}`,
  isPartOf: {
    "@type": "WebSite",
    name: "Detail Park - Academia Detail",
    url: BASE_URL,
  },
  ...(page.image && {
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: page.image,
      width: 1200,
      height: 630,
    },
  }),
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", ".hero-description", ".section-heading"],
  },
  mainEntity: {
    "@type": "EducationalOrganization",
    name: "Detail Park - Academia Detail",
  },
});


// ============================================
// SEO CONFIG POR PÁGINA
// ============================================

// Dynamic home SEO generator - builds schemas from real formation data
export const generateHomeSEO = (
  formations: {
    id: string;
    title: string;
    shortTitle: string;
    description: string;
    href: string;
    alumnosCertificados?: number;
  }[],
  details: Record<string, FormationDetail>,
) => {
  // Aggregate dynamic keywords from all course categories
  const categoryKeywords = Object.values(details)
    .map((d) => {
      const words = d.title
        .toLowerCase()
        .split(/\s+/)
        .filter((w) => w.length > 3);
      return words.slice(0, 3).join(", ");
    })
    .join(", ");

  const totalAlumnos = formations.reduce((sum, f) => sum + (f.alumnosCertificados || 0), 0);

  // Build ItemList of courses dynamically from real data
  const courseItemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Cursos de Detailing Profesional",
    numberOfItems: formations.length,
    itemListElement: formations.map((f, i) => {
      const detail = details[f.id];
      return {
        "@type": "ListItem",
        position: i + 1,
        name: detail?.title || f.title,
        item: {
          "@type": "Course",
          name: detail?.title || f.title,
          url: `${BASE_URL}${f.href}`,
          description: detail?.description || f.description,
          provider: { "@type": "Organization", name: "Detail Park - Academia Detail", sameAs: BASE_URL },
          ...(detail && {
            offers: {
              "@type": "Offer",
              price: String(detail.price),
              priceCurrency: "EUR",
              availability: detail.comingSoon
                ? "https://schema.org/PreOrder"
                : "https://schema.org/LimitedAvailability",
            },
            ...(detail.modules &&
              detail.modules.length > 0 && {
                hasPart: detail.modules.map((mod, mi) => ({
                  "@type": "Course",
                  name: mod.title,
                  position: mi + 1,
                })),
              }),
          }),
        },
      };
    }),
  };

  // Navigation schema from real formation slugs
  const navItems = [
    ...formations.map((f, i) => ({
      "@type": "ListItem" as const,
      position: i + 1,
      name: f.shortTitle || f.title,
      url: `${BASE_URL}${f.href}`,
    })),
    {
      "@type": "ListItem" as const,
      position: formations.length + 1,
      name: "Carrera Detailing",
      url: `${BASE_URL}/formacion-profesional-detailing`,
    },
    {
      "@type": "ListItem" as const,
      position: formations.length + 2,
      name: "Jornadas de iniciación: Jornada Zero y Up Detail",
      url: `${BASE_URL}/curso-detailing-iniciacion`,
    },
    { "@type": "ListItem" as const, position: formations.length + 3, name: "Contacto", url: `${BASE_URL}/contacto` },
  ];

  return {
    title: "Cursos de Detailing en Alicante | Detail Park",
    description:
      "Academia de detailing en Alicante. Cursos 100 % prácticos de detailing, pulido, tratamiento cerámico, wrapping y PPF en un taller real. 218 alumnos formados.",
    // ── KEYWORDS HOME ENRIQUECIDAS ──────────────────────────────────────────
    keywords: `curso detailing, curso detailing intensivo, curso de pulido de coches, curso pulido profesional, curso pulido coche certificado, curso tratamiento cerámico, curso coating cerámico coches, aprender aplicar cerámico coche, curso limpiar coches profesional, curso lavado profesional coches, escuela de detailing, academia detailing, academia detailing alicante, curso detailing alicante, curso ppf alicante, curso wrapping alicante, curso detailing comunidad valenciana, cómo montar negocio detailing, cómo montar centro detailing, abrir taller detailing, montar negocio detailing España, negocio detailing rentable, emprender detailing, cómo montar lavadero de coches, formación detailing España, aprender detailing desde cero, bolsa empleo detailing, certificación oficial detailing, financiar curso detailing, curso detailing Madrid, curso detailing Barcelona, curso de detailing, curso de car detailing, curso de detailing de autos, academia detailing latinoamerica, curso wrapping básico, curso wrapping avanzado, curso vinilado profesional, curso ppf paint protection film, curso pulido carrocería, curso tapizado asientos coches, curso restauración tapicería cuero, qué es el detailing profesional, cuánto cobra un detailer profesional, diferencia detailing lavado normal, salidas laborales detailing, herramientas detailing profesional, ppf vs ceramic coating, precio instalar ppf coche, ${categoryKeywords}`,
    url: "/",
    price: details["curso-detailing-profesional"]?.price
      ? String(details["curso-detailing-profesional"].price)
      : "2997",
    schema: [
      localBusinessSchema,
      websiteSchema,
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Navegación Principal - Academia Detail",
        itemListElement: navItems,
      },
      courseItemList,
      generateWebPageSchema({
        name: "Cursos de Detailing Profesional en España",
        description: "Formación 100% práctica en taller real con visión de negocio",
        url: "/",
      }),
      generateBreadcrumbSchema([{ name: "Inicio", url: "/" }]),
      generateFAQSchema(homeFaqs),
    ],
  };
};

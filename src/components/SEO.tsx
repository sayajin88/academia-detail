import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  schema?: object | object[];
  canonical?: string;
  disableHreflang?: boolean;
  price?: string;
}

const BASE_URL = 'https://academiadetail.com';
const DEFAULT_IMAGE = 'https://academiadetail.com/og-image.png';

// Hreflang configuration for international SEO
const HREFLANG_REGIONS = [
  { lang: 'es-ES', label: 'España' },
  { lang: 'es-MX', label: 'México' },
  { lang: 'es-AR', label: 'Argentina' },
  { lang: 'es-CO', label: 'Colombia' },
  { lang: 'es-CL', label: 'Chile' },
  { lang: 'es-PE', label: 'Perú' },
  { lang: 'es', label: 'Spanish (General)' },
  { lang: 'x-default', label: 'Default' },
];

// URL to readable name mapping for auto-breadcrumbs
const URL_NAME_MAP: Record<string, string> = {
  'curso-detailing-profesional': 'Curso Detailing',
  'curso-vinilado-vehiculos': 'Curso Wrapping',
  'curso-ppf-proteccion-pintura': 'Curso PPF',
  'curso-restauracion-vehiculos': 'Curso Restauración',
  'formacion-profesional-detailing': 'Carrera Detailing',
  'curso-detailing-iniciacion': 'Jornada Zero',
  'quienes-somos': 'Quiénes Somos',
  'contacto': 'Contacto',
  'galeria': 'Galería',
  'glosario-detailing': 'Glosario de Detailing',
  'calculadora-dilucion-detailing': 'Calculadora de Dilución',
  'centros-detailing-espana': 'Centros Detailing España',
  'blog': 'Blog',
};

// Auto-generate breadcrumb schema from URL
const generateAutoBreadcrumbs = (url: string, title: string) => {
  const segments = url.split('/').filter(Boolean);
  const items = [{ name: "Inicio", item: BASE_URL }];
  
  if (segments.length > 0) {
    let path = '';
    segments.forEach((segment, index) => {
      path += `/${segment}`;
      const isLast = index === segments.length - 1;
      items.push({
        name: URL_NAME_MAP[segment] || (isLast ? title : segment),
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

// LocalBusiness Schema with complete business data for local SEO - Emphasizing REAL WORKSHOP
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "EducationalOrganization"],
  "name": "Detail Park - Academia Detail",
  "alternateName": ["Academia Detail", "Detail Park", "Detail Park - Taller y Academia"],
  "slogan": "No enseñamos a lavar coches, formamos empresarios del Detailing",
  "description": "El ÚNICO centro de formación en detailing que opera en un taller 100% real con clientes de alta gama. Aprende técnica Y negocio desde el día 1. Sin aulas vacías, solo práctica real.",
  "url": BASE_URL,
  "logo": {
    "@type": "ImageObject",
    "url": "https://academiadetail.com/favicon.svg",
    "width": 512,
    "height": 512
  },
  "image": DEFAULT_IMAGE,
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
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "09:00",
      "closes": "14:00"
    }
  ],
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 38.3452,
      "longitude": -0.4892
    },
    "geoRadius": "50000"
  },
  "sameAs": [
    "http://www.detailpark.com/",
    "https://www.instagram.com/detailparkoficial/",
    "https://www.instagram.com/danidetailoficial/",
    "https://www.youtube.com/@detailpark",
    "https://www.facebook.com/detailpark",
    "https://facebook.com/detailparkoficial",
    "https://www.tiktok.com/@detailpark",
    "https://www.tiktok.com/@detail_park",
    "https://www.google.com/maps/place/Detail+Park/"
  ],
  "hasMap": "https://www.google.com/maps/place/Detail+Park/",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "218",
    "bestRating": "5",
    "worstRating": "1"
  },
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Sergio F." },
      "datePublished": "2025-09-12",
      "reviewBody": "La mejor inversión que he hecho. Formación 100% práctica en taller real con coches de clientes. En 2 meses ya tenía mi propio centro funcionando.",
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Gerardo E." },
      "datePublished": "2025-11-03",
      "reviewBody": "Lo que diferencia a Detail Park es que aprendes negocio además de técnica. Daniel te enseña a presupuestar, captar clientes y escalar. Imprescindible.",
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Federica M." },
      "datePublished": "2025-07-20",
      "reviewBody": "Vine desde Italia para formarme aquí. Las instalaciones, el equipo y la metodología son de otro nivel. Totalmente recomendable.",
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
    }
  ],
  "knowsAbout": [
    "Detailing Profesional",
    "Gestión de Negocio Detailing",
    "PPF Installation",
    "Car Wrapping",
    "Presupuestación de Servicios",
    "Captación de Clientes VIP",
    "Cálculo de Márgenes de Beneficio",
    "Escalado de Negocios de Detailing",
    "Formación Práctica en Taller Real",
    "Mentoría Empresarial Detailing"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Cursos de Detailing Profesional en Taller Real",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Course",
          "name": "Jornada Zero - Experiencia de Inmersión",
          "description": "Tu primer contacto con el detailing profesional por solo €97. Prueba antes de invertir."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Course",
          "name": "Curso de Detailing Profesional",
          "description": "Formación completa en lavado, descontaminación, pulido y protección cerámica + visión de negocio"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Course",
          "name": "Curso de Car Wrapping",
          "description": "Instalación profesional de vinilo y cambio de color + gestión de clientes VIP"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Course",
          "name": "Curso de PPF",
          "description": "Instalación de Paint Protection Film en vehículos de alta gama + presupuestación"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Course",
          "name": "Curso de Restauración",
          "description": "Técnicas avanzadas de restauración de vehículos clásicos y dañados"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Course",
          "name": "Formación Profesional Detailing",
          "description": "Programa completo de 1 mes con 4 certificaciones profesionales + módulo de negocio exclusivo"
        }
      }
    ]
  }
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://academiadetail.com/#website",
  "url": "https://academiadetail.com",
  "name": "Academia Detail",
  "inLanguage": "es",
  "publisher": {
    "@id": "https://academiadetail.com/#organization"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://academiadetail.com/?s={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

export const SEO = ({
  title,
  description,
  keywords,
  image = DEFAULT_IMAGE,
  url,
  type = 'website',
  schema,
  canonical,
  disableHreflang = false,
  price,
}: SEOProps) => {
  const fullUrl = url ? `${BASE_URL}${url}` : BASE_URL;
  const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : fullUrl;

  // Handle both single schema object and array of schema objects
  const schemaArray = schema ? (Array.isArray(schema) ? schema : [schema]) : [];
  
  // Auto-generate breadcrumbs if not already in schema
  const hasBreadcrumbs = schemaArray.some(s => 
    s && typeof s === 'object' && '@type' in s && s['@type'] === 'BreadcrumbList'
  );
  
  const finalSchemas = hasBreadcrumbs 
    ? schemaArray 
    : [...schemaArray, generateAutoBreadcrumbs(url || '/', title)];

  // Determine image type from URL
  const getImageType = (imageUrl: string) => {
    if (imageUrl.endsWith('.jpg') || imageUrl.endsWith('.jpeg')) return 'image/jpeg';
    if (imageUrl.endsWith('.png')) return 'image/png';
    if (imageUrl.endsWith('.webp')) return 'image/webp';
    return 'image/png';
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Hreflang Tags for International SEO */}
      {!disableHreflang && HREFLANG_REGIONS.map(({ lang }) => (
        <link 
          key={lang}
          rel="alternate" 
          hrefLang={lang} 
          href={canonicalUrl} 
        />
      ))}

      {/* Open Graph / Facebook - Enhanced with dimensions */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />
      <meta name="thumbnail" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content={getImageType(image)} />
      <meta property="og:image:alt" content={`${title} - Academia Detail`} />
      <meta property="og:locale" content="es_ES" />
      <meta property="og:locale:alternate" content="es_MX" />
      <meta property="og:locale:alternate" content="es_AR" />
      <meta property="og:locale:alternate" content="es_CO" />
      <meta property="og:locale:alternate" content="es_CL" />
      <meta property="og:site_name" content="Academia Detail - Formación Detailing España" />

      {/* Product meta tags for courses (helps with rich snippets) */}
      {type === 'product' && price && (
        <>
          <meta property="product:price:amount" content={price} />
          <meta property="product:price:currency" content="EUR" />
          <meta property="product:availability" content="in stock" />
          <meta property="product:condition" content="new" />
          <meta property="product:retailer_item_id" content={url?.replace(/\//g, '-') || 'course'} />
        </>
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={`${title} - Academia Detail`} />

      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="author" content="Academia Detail - Formación Detailing España" />
      <meta name="geo.region" content="ES" />
      <meta name="geo.placename" content="Alicante, España" />
      <meta name="content-language" content="es" />
      
      {/* International targeting */}
      <meta name="distribution" content="global" />
      <meta name="coverage" content="Worldwide" />
      <meta name="target" content="all" />

      {/* Schema.org JSON-LD */}
      {finalSchemas.map((schemaItem, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schemaItem)}
        </script>
      ))}
    </Helmet>
  );
};

// Alias for backwards compatibility
export const organizationSchema = localBusinessSchema;

// ─── SCHEMAS INDIVIDUALES POR CURSO ───────────────────────────────────────

export const courseDetailingSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  "@id": "https://academiadetail.com/curso-detailing-profesional/#course",
  "name": "Curso de Detailing Profesional",
  "description": "Formación 100% práctica en lavado profesional, descontaminación, pulido, corrección de pintura y protección cerámica. Aprende en un taller real con clientes de alta gama en Alicante.",
  "url": "https://academiadetail.com/curso-detailing-profesional/",
  "image": {
    "@type": "ImageObject",
    "url": "https://academiadetail.com/og-curso-detailing.jpg",
    "width": 1200,
    "height": 630
  },
  "provider": {
    "@type": "EducationalOrganization",
    "@id": "https://academiadetail.com/#organization",
    "name": "Academia Detail",
    "url": "https://academiadetail.com"
  },
  "offers": {
    "@type": "Offer",
    "category": "Paid",
    "priceCurrency": "EUR",
    "availability": "https://schema.org/InStock",
    "validFrom": "2025-01-01",
    "url": "https://academiadetail.com/curso-detailing-profesional/"
  },
  "hasCourseInstance": {
    "@type": "CourseInstance",
    "courseMode": "onsite",
    "location": {
      "@type": "Place",
      "name": "Detail Park",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Calle Metalurgias, 13",
        "addressLocality": "Alicante",
        "postalCode": "03008",
        "addressCountry": "ES"
      }
    },
    "inLanguage": "es",
    "courseWorkload": "PT20H"
  },
  "teaches": [
    "Lavado profesional de vehículos",
    "Descontaminación química y mecánica",
    "Corrección de pintura con pulidora",
    "Aplicación de tratamiento cerámico",
    "Presupuestación de servicios detailing"
  ],
  "educationalLevel": "Beginner to Professional",
  "inLanguage": "es",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "218",
    "bestRating": "5",
    "worstRating": "1"
  }
};

export const courseWrappingSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  "@id": "https://academiadetail.com/curso-vinilado-vehiculos/#course",
  "name": "Curso de Car Wrapping Profesional",
  "description": "Aprende instalación profesional de vinilos y cambio de color en vehículos. Técnicas esenciales y avanzadas de car wrapping en taller real con vehículos de clientes.",
  "url": "https://academiadetail.com/curso-vinilado-vehiculos/",
  "image": {
    "@type": "ImageObject",
    "url": "https://academiadetail.com/og-curso-wrapping.jpg",
    "width": 1200,
    "height": 630
  },
  "provider": {
    "@type": "EducationalOrganization",
    "@id": "https://academiadetail.com/#organization",
    "name": "Academia Detail",
    "url": "https://academiadetail.com"
  },
  "offers": {
    "@type": "Offer",
    "category": "Paid",
    "priceCurrency": "EUR",
    "availability": "https://schema.org/InStock",
    "validFrom": "2025-01-01",
    "url": "https://academiadetail.com/curso-vinilado-vehiculos/"
  },
  "hasCourseInstance": {
    "@type": "CourseInstance",
    "courseMode": "onsite",
    "location": {
      "@type": "Place",
      "name": "Detail Park",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Calle Metalurgias, 13",
        "addressLocality": "Alicante",
        "postalCode": "03008",
        "addressCountry": "ES"
      }
    },
    "inLanguage": "es"
  },
  "teaches": [
    "Preparación de superficies para vinilado",
    "Instalación profesional de vinilos de color",
    "Técnicas de corte y acabado",
    "Vinilado de piezas complejas",
    "Gestión de clientes VIP"
  ],
  "educationalLevel": "Beginner to Professional",
  "inLanguage": "es",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "202",
    "bestRating": "5",
    "worstRating": "1"
  }
};

export const coursePPFSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  "@id": "https://academiadetail.com/curso-ppf-proteccion-pintura/#course",
  "name": "Curso de PPF - Paint Protection Film",
  "description": "Formación intensiva en instalación profesional de Paint Protection Film (PPF) en vehículos de alta gama. 2 días, 16 horas de práctica real en taller.",
  "url": "https://academiadetail.com/curso-ppf-proteccion-pintura/",
  "image": {
    "@type": "ImageObject",
    "url": "https://academiadetail.com/og-curso-ppf.jpg",
    "width": 1200,
    "height": 630
  },
  "provider": {
    "@type": "EducationalOrganization",
    "@id": "https://academiadetail.com/#organization",
    "name": "Academia Detail",
    "url": "https://academiadetail.com"
  },
  "offers": {
    "@type": "Offer",
    "category": "Paid",
    "priceCurrency": "EUR",
    "availability": "https://schema.org/InStock",
    "validFrom": "2025-01-01",
    "url": "https://academiadetail.com/curso-ppf-proteccion-pintura/"
  },
  "hasCourseInstance": {
    "@type": "CourseInstance",
    "courseMode": "onsite",
    "courseWorkload": "PT16H",
    "location": {
      "@type": "Place",
      "name": "Detail Park",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Calle Metalurgias, 13",
        "addressLocality": "Alicante",
        "postalCode": "03008",
        "addressCountry": "ES"
      }
    },
    "inLanguage": "es"
  },
  "teaches": [
    "Fundamentos del Paint Protection Film",
    "Preparación de superficie previa a PPF",
    "Instalación de PPF en zonas de impacto",
    "Full wrap en vehículos de alta gama",
    "Presupuestación y captación de clientes PPF"
  ],
  "timeRequired": "P2D",
  "educationalLevel": "Beginner to Professional",
  "inLanguage": "es",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "202",
    "bestRating": "5",
    "worstRating": "1"
  }
};

export const courseRestauracionSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  "@id": "https://academiadetail.com/curso-restauracion-vehiculos/#course",
  "name": "Curso de Restauración de Vehículos",
  "description": "Técnicas avanzadas de restauración de vehículos clásicos y dañados. Corrección profunda de pintura, eliminación de óxido y recuperación de interiores en taller real.",
  "url": "https://academiadetail.com/curso-restauracion-vehiculos/",
  "image": {
    "@type": "ImageObject",
    "url": "https://academiadetail.com/og-curso-restauracion.jpg",
    "width": 1200,
    "height": 630
  },
  "provider": {
    "@type": "EducationalOrganization",
    "@id": "https://academiadetail.com/#organization",
    "name": "Academia Detail",
    "url": "https://academiadetail.com"
  },
  "offers": {
    "@type": "Offer",
    "category": "Paid",
    "priceCurrency": "EUR",
    "availability": "https://schema.org/InStock",
    "validFrom": "2025-01-01",
    "url": "https://academiadetail.com/curso-restauracion-vehiculos/"
  },
  "hasCourseInstance": {
    "@type": "CourseInstance",
    "courseMode": "onsite",
    "location": {
      "@type": "Place",
      "name": "Detail Park",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Calle Metalurgias, 13",
        "addressLocality": "Alicante",
        "postalCode": "03008",
        "addressCountry": "ES"
      }
    },
    "inLanguage": "es"
  },
  "teaches": [
    "Restauración de pintura envejecida",
    "Eliminación de óxido superficial",
    "Recuperación de plásticos y gomas",
    "Restauración de tapicería e interiores",
    "Valoración y presupuestación de restauraciones"
  ],
  "educationalLevel": "Intermediate to Professional",
  "inLanguage": "es"
};

export const courseFormacionProfesionalSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  "@id": "https://academiadetail.com/formacion-profesional-detailing/#course",
  "name": "Formación Profesional Detailing - Programa Completo",
  "description": "Programa completo de 1 mes con 4 certificaciones profesionales: Detailing, Car Wrapping, PPF y Restauración. Incluye módulo exclusivo de negocio y mentoría empresarial.",
  "url": "https://academiadetail.com/formacion-profesional-detailing/",
  "image": "https://academiadetail.com/og-detailing-profesional.jpg",
  "provider": {
    "@type": "EducationalOrganization",
    "@id": "https://academiadetail.com/#organization",
    "name": "Academia Detail",
    "url": "https://academiadetail.com"
  },
  "offers": {
    "@type": "Offer",
    "category": "Paid",
    "priceCurrency": "EUR",
    "availability": "https://schema.org/InStock",
    "validFrom": "2025-01-01",
    "url": "https://academiadetail.com/formacion-profesional-detailing/"
  },
  "hasCourseInstance": {
    "@type": "CourseInstance",
    "courseMode": "onsite",
    "courseWorkload": "P1M",
    "location": {
      "@type": "Place",
      "name": "Detail Park",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Calle Metalurgias, 13",
        "addressLocality": "Alicante",
        "postalCode": "03008",
        "addressCountry": "ES"
      }
    },
    "inLanguage": "es"
  },
  "teaches": [
    "Detailing profesional completo",
    "Car wrapping e instalación de vinilos",
    "Instalación de PPF",
    "Restauración de vehículos",
    "Cómo montar y escalar un negocio de detailing",
    "Captación de clientes de alta gama",
    "Presupuestación y márgenes de beneficio"
  ],
  "numberOfCredits": 4,
  "timeRequired": "P1M",
  "educationalLevel": "Professional",
  "inLanguage": "es",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "218",
    "bestRating": "5",
    "worstRating": "1"
  }
};

export const courseJornadaZeroSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  "@id": "https://academiadetail.com/curso-detailing-iniciacion/#course",
  "name": "Jornada Zero - Iniciación al Detailing Profesional",
  "description": "Tu primer contacto con el detailing profesional. 1 día intensivo para descubrir si el detailing es tu camino antes de invertir en formación completa. Precio de entrada: €97.",
  "url": "https://academiadetail.com/curso-detailing-iniciacion/",
  "image": "https://academiadetail.com/og-jornada-zero.jpg",
  "provider": {
    "@type": "EducationalOrganization",
    "@id": "https://academiadetail.com/#organization",
    "name": "Academia Detail",
    "url": "https://academiadetail.com"
  },
  "offers": {
    "@type": "Offer",
    "category": "Paid",
    "price": "97",
    "priceCurrency": "EUR",
    "availability": "https://schema.org/InStock",
    "validFrom": "2025-01-01",
    "url": "https://academiadetail.com/curso-detailing-iniciacion/"
  },
  "hasCourseInstance": {
    "@type": "CourseInstance",
    "courseMode": "onsite",
    "courseWorkload": "PT10H",
    "location": {
      "@type": "Place",
      "name": "Detail Park",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Calle Metalurgias, 13",
        "addressLocality": "Alicante",
        "postalCode": "03008",
        "addressCountry": "ES"
      }
    },
    "inLanguage": "es"
  },
  "teaches": [
    "Introducción al detailing profesional",
    "Herramientas y productos básicos",
    "Proceso de lavado y descontaminación",
    "Primeros pasos en corrección de pintura"
  ],
  "timeRequired": "P1D",
  "educationalLevel": "Beginner",
  "inLanguage": "es"
};
export default SEO;

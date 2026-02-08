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
};

// Auto-generate breadcrumb schema from URL
const generateAutoBreadcrumbs = (url: string, title: string) => {
  const segments = url.split('/').filter(Boolean);
  const items = [{ name: "Inicio", item: BASE_URL }];
  
  if (segments.length > 0) {
    let path = '';
    segments.forEach((segment) => {
      path += `/${segment}`;
      items.push({
        name: URL_NAME_MAP[segment] || title,
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
  "@type": ["LocalBusiness", "EducationalOrganization", "AutoRepair"],
  "name": "Academia Detail",
  "alternateName": "Detail Park - Taller y Academia",
  "slogan": "No enseñamos a lavar coches, formamos empresarios del Detailing",
  "description": "El ÚNICO centro de formación en detailing que opera en un taller 100% real con clientes de alta gama. Aprende técnica Y negocio desde el día 1. Sin aulas vacías, solo práctica real.",
  "url": BASE_URL,
  "logo": {
    "@type": "ImageObject",
    "url": DEFAULT_IMAGE,
    "width": 1200,
    "height": 630
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
      "opens": "00:00",
      "closes": "00:00",
      "description": "Previa cita"
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

export default SEO;

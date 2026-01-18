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
}

const BASE_URL = 'https://academiadetail.com';
const DEFAULT_IMAGE = 'https://academiadetail.com/og-image.png';

// LocalBusiness Schema with complete business data for local SEO - Emphasizing REAL WORKSHOP
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "EducationalOrganization", "AutoRepair"],
  "name": "Academia Detail",
  "alternateName": "Detail Park - Taller y Academia",
  "slogan": "No enseñamos a lavar coches, formamos empresarios del Detailing",
  "description": "El ÚNICO centro de formación en detailing que opera en un taller 100% real con clientes de alta gama. Aprende técnica Y negocio desde el día 1. Sin aulas vacías, solo práctica real.",
  "url": BASE_URL,
  "logo": DEFAULT_IMAGE,
  "image": DEFAULT_IMAGE,
  "telephone": "+34 622 773 555",
  "email": "info@detailpark.es",
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
}: SEOProps) => {
  const fullUrl = url ? `${BASE_URL}${url}` : BASE_URL;
  const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : fullUrl;

  // Handle both single schema object and array of schema objects
  const schemaArray = schema ? (Array.isArray(schema) ? schema : [schema]) : [];

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="es_ES" />
      <meta property="og:site_name" content="Academia Detail - Taller Real" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Academia Detail - Taller Real" />
      <meta name="geo.region" content="ES" />
      <meta name="geo.placename" content="Alicante, España" />

      {/* Schema.org JSON-LD */}
      {schemaArray.map((schemaItem, index) => (
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
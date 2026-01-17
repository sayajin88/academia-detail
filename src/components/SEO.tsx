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

const BASE_URL = 'https://detailing-ignition-landing.lovable.app';
const DEFAULT_IMAGE = 'https://storage.googleapis.com/gpt-engineer-file-uploads/KMej6jjSX9MA6QNCkjOdbSEku1i1/social-images/social-1762165951182-DETAIL PARK emblema blanco.png';

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
      <meta property="og:site_name" content="Detail Park Academy" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Detail Park Academy" />
      <meta name="geo.region" content="ES" />
      <meta name="geo.placename" content="España" />

      {/* Schema.org JSON-LD */}
      {schemaArray.map((schemaItem, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schemaItem)}
        </script>
      ))}
    </Helmet>
  );
};

// Organization Schema (to be included on every page)
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Detail Park Academy",
  "url": BASE_URL,
  "logo": DEFAULT_IMAGE,
  "description": "Academia de detailing profesional en España. Formación 100% práctica en cursos de detailing, car wrapping, PPF y restauración.",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "ES",
    "addressLocality": "España"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "availableLanguage": ["Spanish"]
  },
  "sameAs": [
    "https://www.instagram.com/detailpark/",
    "https://www.facebook.com/detailpark/"
  ]
};

export default SEO;

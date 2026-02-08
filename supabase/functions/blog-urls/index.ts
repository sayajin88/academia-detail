import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const BASE_URL = "https://academiadetail.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // All blog article slugs with their publish dates
  const blogArticles = [
    { slug: "como-montar-negocio-detailing-rentable", publishedAt: "2026-01-15", category: "negocios" },
    { slug: "guia-completa-pulido-coches-profesional", publishedAt: "2026-01-08", category: "detailing" },
    { slug: "ppf-vs-ceramico-proteccion-vehiculo", publishedAt: "2025-12-20", category: "ppf" },
    { slug: "car-wrapping-todo-necesitas-saber", publishedAt: "2025-12-10", category: "wrapping" },
    { slug: "5-errores-detailers-principiantes", publishedAt: "2025-11-28", category: "detailing" },
    { slug: "cuanto-gana-detailer-profesional-espana", publishedAt: "2025-11-15", category: "negocios" },
    { slug: "como-ser-detailer-profesional-guia-formacion", publishedAt: "2026-02-05", category: "detailing" },
    { slug: "que-es-ppf-paint-protection-film", publishedAt: "2026-02-03", category: "ppf" },
    { slug: "tecnicas-pulido-principiante-experto", publishedAt: "2026-02-01", category: "detailing" },
    { slug: "car-wrapping-vs-pintura-mejor-opcion", publishedAt: "2026-01-30", category: "wrapping" },
    { slug: "como-montar-centro-detailing-inversion", publishedAt: "2026-01-28", category: "negocios" },
    { slug: "limpieza-restauracion-cuero-alcantara", publishedAt: "2026-01-25", category: "detailing" },
    { slug: "tratamiento-ceramico-ceramic-coating-guia", publishedAt: "2026-01-22", category: "detailing" },
    { slug: "errores-detailer-principiante-como-evitarlos", publishedAt: "2026-01-20", category: "detailing" },
    { slug: "kit-esencial-detailing-herramientas", publishedAt: "2026-01-18", category: "detailing" },
    { slug: "salida-laboral-car-wrapping-sueldo", publishedAt: "2026-01-15", category: "wrapping" },
    { slug: "plan-negocio-centro-detailing-2026", publishedAt: "2026-02-07", category: "negocios" },
    { slug: "detailing-movil-vs-taller-fisico", publishedAt: "2026-02-06", category: "negocios" },
    { slug: "cuanto-cuesta-montar-taller-detailing", publishedAt: "2026-02-05", category: "negocios" },
    { slug: "como-calcular-tarifas-detailing", publishedAt: "2026-02-04", category: "negocios" },
    { slug: "marketing-clientes-vip-detailing", publishedAt: "2026-02-03", category: "negocios" },
    { slug: "lavadero-ecologico-detailing-sin-agua", publishedAt: "2026-02-02", category: "negocios" },
    { slug: "ppf-servicio-mas-rentable-2026", publishedAt: "2026-02-01", category: "ppf" },
    { slug: "licencias-permisos-taller-estetica-automotriz", publishedAt: "2026-01-31", category: "negocios" },
    { slug: "como-montar-estudio-car-wrapping", publishedAt: "2026-01-30", category: "wrapping" },
    { slug: "software-gestion-taller-detailing", publishedAt: "2026-01-29", category: "negocios" },
  ];

  const url = new URL(req.url);
  const format = url.searchParams.get("format") || "json";

  const urls = blogArticles.map((article) => ({
    url: `${BASE_URL}/blog/${article.slug}`,
    lastmod: article.publishedAt,
    category: article.category,
    type: "URL_UPDATED",
  }));

  // Add the blog index page
  urls.unshift({
    url: `${BASE_URL}/blog`,
    lastmod: new Date().toISOString().split("T")[0],
    category: "index",
    type: "URL_UPDATED",
  });

  if (format === "indexing-api") {
    // Format ready for Google Indexing API batch requests
    const indexingRequests = urls.map((u) => ({
      url: u.url,
      type: u.type,
    }));

    return new Response(JSON.stringify({
      total: indexingRequests.length,
      requests: indexingRequests,
      instructions: "Send each request to https://indexing.googleapis.com/v3/urlNotifications:publish with Authorization: Bearer [YOUR_TOKEN]",
    }, null, 2), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Default JSON format
  return new Response(JSON.stringify({
    total: urls.length,
    generated_at: new Date().toISOString(),
    base_url: BASE_URL,
    sitemap_url: `${BASE_URL}/sitemap.xml`,
    urls,
  }, null, 2), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const BASE_URL = "https://academiadetail.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Content-Type": "application/xml; charset=utf-8",
};

const blogArticles = [
  { slug: "como-montar-negocio-detailing-rentable", lastmod: "2026-01-15" },
  { slug: "guia-completa-pulido-coches-profesional", lastmod: "2026-01-08" },
  { slug: "ppf-vs-ceramico-proteccion-vehiculo", lastmod: "2025-12-20" },
  { slug: "car-wrapping-todo-necesitas-saber", lastmod: "2025-12-10" },
  { slug: "5-errores-detailers-principiantes", lastmod: "2025-11-28" },
  { slug: "cuanto-gana-detailer-profesional-espana", lastmod: "2025-11-15" },
  { slug: "como-ser-detailer-profesional-guia-formacion", lastmod: "2026-02-05" },
  { slug: "que-es-ppf-paint-protection-film", lastmod: "2026-02-03" },
  { slug: "tecnicas-pulido-principiante-experto", lastmod: "2026-02-01" },
  { slug: "car-wrapping-vs-pintura-mejor-opcion", lastmod: "2026-01-30" },
  { slug: "como-montar-centro-detailing-inversion", lastmod: "2026-01-28" },
  { slug: "limpieza-restauracion-cuero-alcantara", lastmod: "2026-01-25" },
  { slug: "tratamiento-ceramico-ceramic-coating-guia", lastmod: "2026-01-22" },
  { slug: "errores-detailer-principiante-como-evitarlos", lastmod: "2026-01-20" },
  { slug: "kit-esencial-detailing-herramientas", lastmod: "2026-01-18" },
  { slug: "salida-laboral-car-wrapping-sueldo", lastmod: "2026-01-15" },
  { slug: "plan-negocio-centro-detailing-2026", lastmod: "2026-02-07" },
  { slug: "detailing-movil-vs-taller-fisico", lastmod: "2026-02-06" },
  { slug: "cuanto-cuesta-montar-taller-detailing", lastmod: "2026-02-05" },
  { slug: "como-calcular-tarifas-detailing", lastmod: "2026-02-04" },
  { slug: "marketing-clientes-vip-detailing", lastmod: "2026-02-03" },
  { slug: "lavadero-ecologico-detailing-sin-agua", lastmod: "2026-02-02" },
  { slug: "ppf-servicio-mas-rentable-2026", lastmod: "2026-02-01" },
  { slug: "licencias-permisos-taller-estetica-automotriz", lastmod: "2026-01-31" },
  { slug: "como-montar-estudio-car-wrapping", lastmod: "2026-01-30" },
  { slug: "software-gestion-taller-detailing", lastmod: "2026-01-29" },
];

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const today = new Date().toISOString().split("T")[0];

  let urls = `  <url>
    <loc>${BASE_URL}/blog</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>\n`;

  for (const article of blogArticles) {
    urls += `  <url>
    <loc>${BASE_URL}/blog/${article.slug}</loc>
    <lastmod>${article.lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>\n`;
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}</urlset>`;

  return new Response(xml, { headers: corsHeaders });
});

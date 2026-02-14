import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Content-Type": "application/xml; charset=utf-8",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data: profiles } = await supabase
    .from("detailer_profiles")
    .select("slug, city, province, comunidad_autonoma, created_at")
    .eq("is_published", true);

  const baseUrl = "https://academiadetail.com";
  const today = new Date().toISOString().split("T")[0];

  const slugify = (text: string) =>
    text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  // Collect unique geographic combos
  const comunidades = new Set<string>();
  const provincias = new Map<string, string>(); // provinciaSlug -> comunidadSlug
  const ciudades = new Map<string, { comunidad: string; provincia: string }>();

  (profiles || []).forEach((p: any) => {
    if (!p.comunidad_autonoma) return;
    const cSlug = slugify(p.comunidad_autonoma);
    const pSlug = slugify(p.province);
    const citySlug = slugify(p.city);

    comunidades.add(cSlug);
    provincias.set(pSlug, cSlug);
    ciudades.set(`${cSlug}/${pSlug}/${citySlug}`, {
      comunidad: cSlug,
      provincia: pSlug,
    });
  });

  let urls = `  <url><loc>${baseUrl}/directorio</loc><changefreq>weekly</changefreq><priority>0.9</priority><lastmod>${today}</lastmod></url>\n`;

  // Comunidades
  comunidades.forEach((c) => {
    urls += `  <url><loc>${baseUrl}/directorio/${c}</loc><changefreq>weekly</changefreq><priority>0.8</priority><lastmod>${today}</lastmod></url>\n`;
  });

  // Provincias
  provincias.forEach((cSlug, pSlug) => {
    urls += `  <url><loc>${baseUrl}/directorio/${cSlug}/${pSlug}</loc><changefreq>weekly</changefreq><priority>0.7</priority><lastmod>${today}</lastmod></url>\n`;
  });

  // Ciudades
  ciudades.forEach((_, path) => {
    urls += `  <url><loc>${baseUrl}/directorio/${path}</loc><changefreq>weekly</changefreq><priority>0.7</priority><lastmod>${today}</lastmod></url>\n`;
  });

  // Detailer profiles
  (profiles || []).forEach((p: any) => {
    const lastmod = p.created_at ? p.created_at.split("T")[0] : today;
    urls += `  <url><loc>${baseUrl}/detailer/${p.slug}</loc><changefreq>monthly</changefreq><priority>0.6</priority><lastmod>${lastmod}</lastmod></url>\n`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}</urlset>`;

  return new Response(xml, { headers: corsHeaders });
});

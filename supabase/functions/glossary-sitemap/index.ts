import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const BASE_URL = "https://academiadetail.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Content-Type": "application/xml; charset=utf-8",
};

// All glossary term names (mirrored from frontend glossaryData.ts)
const glossaryTermNames = [
  "Abrasividad", "Acid Rain (Lluvia Ácida)", "Adhesion (Adherencia)", "Agitación",
  "AIO (All In One)", "Alcalino", "Alcantara", "APC (All Purpose Cleaner)",
  "Applicator (Aplicador)", "Backing Plate (Plato de Soporte)", "Base Coat",
  "Beading", "Biodegradable", "Bird Dropping Etching", "Brake Dust (Polvo de Frenos)",
  "Buffing", "Burn (Quemado)", "Carnauba", "Ceramic Coating (Recubrimiento Cerámico)",
  "Cerium Oxide (Óxido de Cerio)", "Clay Bar (Barra de Arcilla)", "Clear Coat (Barniz)",
  "Compound", "Contaminación Férrica", "Correction (Corrección)", "DA (Dual Action)",
  "Decontamination (Descontaminación)", "Degreaser (Desengrasante)", "Detailing",
  "Dressing", "Dry Aid", "Drying Towel (Toalla de Secado)", "Enzyme Cleaner (Limpiador Enzimático)",
  "Etching (Grabado)", "Fillers", "Finishing (Refinado)", "Flash Time", "Foam Cannon",
  "Forced Rotation (Rotación Forzada)", "Glaze", "Graphene (Grafeno)", "Grit Guard",
  "GSM (Gramos por Metro Cuadrado)", "Haze (Neblina)", "High Spots", "Hologramas",
  "Hydrophobic (Hidrofóbico)", "IPA (Alcohol Isopropílico)", "Iron Remover (Eliminador de Hierro)",
  "Jewelling", "LSP (Last Step Product)", "Lubricante", "Marring", "Microfibra",
  "Mohs (Escala de)", "Orange Peel (Piel de Naranja)", "Orbital", "Oxidación",
  "Ozono (Tratamiento de)", "Pad", "Paint Correction (Corrección de Pintura)",
  "Paint Transfer (Transferencia de Pintura)", "pH Neutro", "Polish (Pulimento)",
  "Polímero", "PPF (Paint Protection Film)", "Quick Detailer", "Rail Dust",
  "Recubrimiento Cerámico (Coating)", "RIDS", "Rotativa", "Sealant (Sellador)",
  "Sheeting", "SiO2 (Dióxido de Silicio)", "Snow Foam", "Swirl Marks",
  "Tensioactivo (Surfactante)", "Tire Dressing", "Tornador", "Two Bucket Method",
  "UV (Rayos Ultravioleta)", "Vinyl Protectant", "Water Spots (Marcas de Agua)",
  "Wax (Cera)", "Wet Look", "Wet Sanding (Lijado en Húmedo)",
  "Wheel Cleaner (Limpiador de Llantas)",
];

const generateSlug = (term: string): string => {
  return term
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const today = new Date().toISOString().split("T")[0];

  let urls = `  <url>
    <loc>${BASE_URL}/glosario-detailing</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>\n`;

  for (const term of glossaryTermNames) {
    const slug = generateSlug(term);
    urls += `  <url>
    <loc>${BASE_URL}/glosario-detailing/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>\n`;
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}</urlset>`;

  return new Response(xml, { headers: corsHeaders });
});

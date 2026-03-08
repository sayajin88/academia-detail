const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Content-Type": "application/xml; charset=utf-8",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;

const ALLOWED = ["blog-sitemap", "glossary-sitemap", "directory-sitemap"];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const url = new URL(req.url);
  const target = url.searchParams.get("target");

  if (!target || !ALLOWED.includes(target)) {
    return new Response("<error>Invalid target</error>", { status: 400, headers: corsHeaders });
  }

  const res = await fetch(`${SUPABASE_URL}/functions/v1/${target}`, {
    headers: { Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
  });

  const xml = await res.text();
  return new Response(xml, { headers: corsHeaders });
});

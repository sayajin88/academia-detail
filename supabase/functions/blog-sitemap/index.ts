import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const BASE_URL = "https://academiadetail.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Content-Type": "application/xml; charset=utf-8",
  // Cache 1h on edge, allow stale-while-revalidate for 1 day
  "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toDate(value: string | null | undefined): string {
  if (!value) return new Date().toISOString().split("T")[0];
  // Accept both ISO timestamps and YYYY-MM-DD
  return new Date(value).toISOString().split("T")[0];
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });

  const { data, error } = await supabase
    .from("blog_posts")
    .select("slug, updated_at, published_at")
    .eq("status", "published")
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("[blog-sitemap] DB error:", error);
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?>\n<error>${escapeXml(error.message)}</error>`,
      { status: 500, headers: corsHeaders },
    );
  }

  const posts = data ?? [];

  // Index lastmod = most recent post update (fallback to today)
  const indexLastmod =
    posts.length > 0
      ? toDate(posts[0].updated_at ?? posts[0].published_at)
      : new Date().toISOString().split("T")[0];

  let urls = `  <url>
    <loc>${BASE_URL}/blog</loc>
    <lastmod>${indexLastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>\n`;

  for (const post of posts) {
    if (!post.slug) continue;
    const lastmod = toDate(post.updated_at ?? post.published_at);
    urls += `  <url>
    <loc>${BASE_URL}/blog/${escapeXml(post.slug)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>\n`;
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}</urlset>`;

  console.log(`[blog-sitemap] Served ${posts.length} posts`);
  return new Response(xml, { headers: corsHeaders });
});

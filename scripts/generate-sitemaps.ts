// Prebuild script: fetches dynamic sitemap XML from Supabase edge functions
// and writes them as static files into public/, so the CDN serves them
// directly at /sitemap-blog.xml, /sitemap-glossary.xml, /sitemap-directory.xml
// (no Cloudflare Worker rewrite required).

import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const SUPABASE_URL = "https://kvsrmbutyqyaaaukvgll.supabase.co";
const ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2c3JtYnV0eXF5YWFhdWt2Z2xsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA1MTEzNzYsImV4cCI6MjEwNjA4NzM3Nn0.xcjvTQSWt-KTaYeerrfIzXiCiA8w8dTeRAFufIPj28I";

const targets = [
  { fn: "blog-sitemap", out: "sitemap-blog.xml" },
  { fn: "glossary-sitemap", out: "sitemap-glossary.xml" },
  { fn: "directory-sitemap", out: "sitemap-directory.xml" },
];

async function run() {
  for (const t of targets) {
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/${t.fn}`, {
        headers: { apikey: ANON_KEY, Authorization: `Bearer ${ANON_KEY}` },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const xml = await res.text();
      if (!xml.includes("<urlset")) throw new Error("Invalid XML response");
      writeFileSync(resolve("public", t.out), xml);
      console.log(`[sitemaps] wrote public/${t.out} (${xml.length} bytes)`);
    } catch (err) {
      console.error(`[sitemaps] FAILED ${t.fn}:`, err);
      // Don't fail the build; the existing file (if any) stays in place.
    }
  }

  // Refresh lastmod in the index sitemap
  try {
    const today = new Date().toISOString().split("T")[0];
    const idxPath = resolve("public", "sitemap.xml");
    const fs = await import("node:fs");
    let idx = fs.readFileSync(idxPath, "utf8");
    idx = idx.replace(/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/g, `<lastmod>${today}</lastmod>`);
    fs.writeFileSync(idxPath, idx);
    console.log(`[sitemaps] refreshed index lastmod -> ${today}`);
  } catch (err) {
    console.error("[sitemaps] could not refresh index lastmod:", err);
  }
}

run();

// Pre-renderiza la <head> de cada URL de los sitemaps (título, descripción,
// canonical, Open Graph, Twitter y JSON-LD que pone react-helmet-async) y la
// escribe en dist/<ruta>.html. Así WhatsApp, Facebook, LinkedIn y cualquier bot
// que no ejecuta JavaScript ven los datos propios de cada página.
//
// Solo se toca la <head>: el <body> sigue siendo el de la SPA. Las etiquetas
// llevan data-rh, así que Helmet las sustituye al arrancar y no se duplican.
//
// Uso (después de `vite build`): node scripts/prerender-head.mjs
// Necesita Chrome: CHROME_PATH o las rutas habituales de Linux/Windows.

import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import puppeteer from "puppeteer-core";

const DIST = path.resolve("dist");
const ORIGIN = "https://academiadetail.com";
const CONCURRENCY = 4;
// Terceros que no aportan nada a la <head> y ensucian la analítica.
const BLOCKED = /googletagmanager|google-analytics|youtube|ytimg|facebook|doubleclick|clarity\.ms|hotjar/;

const template = fs.readFileSync(path.join(DIST, "index.html"), "utf8");

// --- URLs a partir de los sitemaps ya copiados a dist ---
const paths = new Set();
for (const f of fs.readdirSync(DIST).filter((f) => /^sitemap-.*\.xml$/.test(f))) {
  const xml = fs.readFileSync(path.join(DIST, f), "utf8");
  for (const [, loc] of xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)) {
    const u = new URL(loc);
    if (u.origin === ORIGIN) paths.add(decodeURI(u.pathname).replace(/\/+$/, "") || "/");
  }
}

// --- Servidor estático mínimo con fallback SPA a la plantilla original ---
const TYPES = { ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".json": "application/json", ".woff2": "font/woff2", ".ico": "image/x-icon", ".webm": "video/webm", ".mp4": "video/mp4", ".xml": "application/xml", ".txt": "text/plain" };
const server = http.createServer((req, res) => {
  const p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  const file = path.join(DIST, p);
  if (p !== "/" && file.startsWith(DIST) && fs.existsSync(file) && fs.statSync(file).isFile()) {
    res.writeHead(200, { "Content-Type": TYPES[path.extname(file).toLowerCase()] ?? "application/octet-stream" });
    fs.createReadStream(file).pipe(res);
  } else {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(template);
  }
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium-browser",
    "/usr/bin/chromium",
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  ];
  const found = candidates.find((c) => c && fs.existsSync(c));
  if (!found) throw new Error("No encuentro Chrome: define CHROME_PATH");
  return found;
}

// Etiquetas fijas de index.html que Helmet sustituye en cada página.
function keyOf(tag) {
  if (/^<title[\s>]/i.test(tag)) return "title";
  const attr = (n) => tag.match(new RegExp(`\\s${n}="([^"]*)"`, "i"))?.[1];
  if (/^<link/i.test(tag) && attr("rel") === "canonical") return "canonical";
  if (/^<meta/i.test(tag)) {
    const k = attr("name") ?? attr("property");
    if (k) return "meta:" + k.toLowerCase();
  }
  return null;
}

function buildHtml(title, helmetTags) {
  const keys = new Set(["title", ...helmetTags.map(keyOf).filter(Boolean)]);
  let html = template.replace(/<head>([\s\S]*?)<\/head>/, (_, head) => {
    // Quita de la plantilla las etiquetas que la página redefine.
    const cleaned = head
      .replace(/<title>[\s\S]*?<\/title>\s*/i, "")
      .replace(/<(meta|link)\b[^>]*>\s*/gi, (tag) => (keys.has(keyOf(tag)) ? "" : tag));
    const esc = title.replace(/&/g, "&amp;").replace(/</g, "&lt;");
    return `<head>${cleaned}    <title>${esc}</title>\n    ${helmetTags.join("\n    ")}\n  </head>`;
  });
  return html;
}

const browser = await puppeteer.launch({
  executablePath: findChrome(),
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

let queue = [...paths].sort();
let failed = [];
let done = 0;

async function worker() {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.setRequestInterception(true);
  page.on("request", (r) => (BLOCKED.test(r.url()) ? r.abort() : r.continue()));
  while (queue.length) {
    const p = queue.shift();
    try {
      await page.goto(base + p, { waitUntil: "domcontentloaded", timeout: 30000 });
      await page.waitForSelector('link[rel="canonical"][data-rh]', { timeout: 30000 });
      // Las páginas con datos (blog, directorio) actualizan Helmet al llegar la respuesta.
      await page.waitForNetworkIdle({ idleTime: 600, timeout: 15000 }).catch(() => {});
      const { title, tags } = await page.evaluate(() => ({
        title: document.title,
        tags: [...document.head.querySelectorAll("[data-rh]")].map((e) => e.outerHTML),
      }));
      const canonical = tags.find((t) => /rel="canonical"/.test(t)) ?? "";
      const expected = ORIGIN + (p === "/" ? "/" : p);
      if (!canonical.includes(`href="${expected}"`) && !canonical.includes(`href="${expected}/"`)) {
        console.warn(`[prerender] ${p}: canonical distinto → ${canonical.match(/href="([^"]*)"/)?.[1]}`);
      }
      const out = p === "/" ? path.join(DIST, "index.html") : path.join(DIST, p + ".html");
      fs.mkdirSync(path.dirname(out), { recursive: true });
      fs.writeFileSync(out, buildHtml(title, tags));
      done++;
    } catch (err) {
      failed.push(p);
      console.error(`[prerender] FALLO ${p}: ${err.message}`);
    }
  }
  await page.close();
}

await Promise.all(Array.from({ length: CONCURRENCY }, worker));
// Segundo intento, de una en una, para las que fallaron por carga.
if (failed.length) {
  console.log(`[prerender] reintentando ${failed.length} páginas`);
  queue = failed;
  failed = [];
  await worker();
}
await browser.close();
server.close();

console.log(`[prerender] ${done}/${paths.size} páginas escritas`);
// Algún fallo suelto no debe bloquear el despliegue; muchos sí.
if (failed.length > Math.max(3, paths.size * 0.1)) process.exit(1);

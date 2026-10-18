// Pre-renderiza cada URL de los sitemaps y la escribe en dist/<ruta>.html:
//   - la <head> (título, descripción, canonical, Open Graph, Twitter y JSON-LD que pone
//     react-helmet-async). Las etiquetas llevan data-rh: Helmet las sustituye al arrancar.
//   - el cuerpo (desde el 18-10-2026): el HTML de la página ya pintada dentro de
//     <div id="root" data-prerendered="/ruta">. Sin él, Bing, Ahrefs/DataForSEO y los bots de
//     IA veían 0 palabras y ningún enlace (auditoría de OpenSEO). src/main.tsx no lo
//     hidrata: monta React oculto encima y quita la copia estática cuando está lista.
// También sigue los enlaces de la paginación del blog (/blog/pagina/N), que no están en
// los sitemaps, y guarda la plantilla vacía en dist/_shell.html para el Worker.
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
if (template.includes("data-prerendered")) throw new Error("dist/index.html ya está pre-renderizado: vuelve a compilar");
// SPA vacía para las rutas sin pre-renderizar (admin, artículos nuevos, 404): la sirve
// el Worker. index.html no vale porque pasa a llevar dentro la portada.
fs.writeFileSync(path.join(DIST, "_shell.html"), template);

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

function buildHtml(title, helmetTags, body, route) {
  const keys = new Set(["title", ...helmetTags.map(keyOf).filter(Boolean)]);
  let html = template.replace(/<head>([\s\S]*?)<\/head>/, (_, head) => {
    // Quita de la plantilla las etiquetas que la página redefine.
    const cleaned = head
      .replace(/<title>[\s\S]*?<\/title>\s*/i, "")
      .replace(/<(meta|link)\b[^>]*>\s*/gi, (tag) => (keys.has(keyOf(tag)) ? "" : tag));
    const esc = title.replace(/&/g, "&amp;").replace(/</g, "&lt;");
    return `<head>${cleaned}    <title>${esc}</title>\n    ${helmetTags.join("\n    ")}\n  </head>`;
  });
  // El texto de respaldo de <noscript> sobra (y duplicaría el H1) si va la página entera.
  html = html.replace(/\s*<!--[^>]*Fallback de contenido[\s\S]*?-->\s*<noscript>[\s\S]*?<\/noscript>/, "");
  const attr = route.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
  // Función como reemplazo: el HTML puede llevar «$&» y similares.
  html = html.replace('<div id="root"></div>', () => `<div id="root" data-prerendered="${attr}">${body}</div>`);
  if (!html.includes("data-prerendered")) throw new Error('no encuentro <div id="root"></div> en la plantilla');
  return html;
}

const browser = await puppeteer.launch({
  executablePath: findChrome(),
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

// PRERENDER_ONLY="/,/blog,/glosario-detailing/abrasividad" limita a esas rutas (pruebas en local).
const only = process.env.PRERENDER_ONLY?.split(",").map((s) => s.trim()).filter(Boolean);
let queue = [...paths].filter((p) => !only || only.includes(p)).sort();
const seen = new Set(queue);
let failed = [];
let done = 0;

async function worker() {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.setRequestInterception(true);
  // Vídeo y audio tampoco: no cambian el HTML y, en streaming, la red nunca queda en reposo.
  page.on("request", (r) => (BLOCKED.test(r.url()) || r.resourceType() === "media" ? r.abort() : r.continue()));
  while (queue.length) {
    const p = queue.shift();
    try {
      await page.goto(base + p, { waitUntil: "domcontentloaded", timeout: 30000 });
      await page.waitForSelector('link[rel="canonical"][data-rh]', { timeout: 30000 });
      // Las páginas con datos (blog, directorio) actualizan Helmet al llegar la respuesta.
      await page.waitForNetworkIdle({ idleTime: 600, timeout: 15000 }).catch(() => {});
      await page.waitForFunction(() => !document.querySelector("[data-page-fallback]"), { timeout: 15000 });
      const { title, tags, body, links } = await page.evaluate(() => {
        const root = document.getElementById("root").cloneNode(true);
        // Fuera lo que no es contenido (aviso de cookies) y el estado de la animación de
        // aparición: lo que está por debajo de la pantalla está oculto hasta hacer scroll.
        root.querySelectorAll("[data-no-prerender], [data-page-fallback]").forEach((e) => e.remove());
        root.querySelectorAll(".ds-reveal-pending, .ds-reveal-in").forEach((e) => {
          e.classList.remove("ds-reveal-pending", "ds-reveal-in");
          e.style.transitionDelay = "";
          if (!e.getAttribute("style")) e.removeAttribute("style");
        });
        return {
          title: document.title,
          tags: [...document.head.querySelectorAll("[data-rh]")].map((e) => e.outerHTML),
          body: root.innerHTML,
          links: [...document.querySelectorAll('a[href^="/blog/pagina/"]')].map((a) => a.getAttribute("href")),
        };
      });
      for (const l of links) {
        const lp = l.replace(/[?#].*$/, "").replace(/\/+$/, "");
        if (!seen.has(lp)) {
          seen.add(lp);
          queue.push(lp);
        }
      }
      if (body.length < 500) throw new Error(`cuerpo casi vacío (${body.length} caracteres)`);
      const canonical = tags.find((t) => /rel="canonical"/.test(t)) ?? "";
      const expected = ORIGIN + (p === "/" ? "/" : p);
      if (!canonical.includes(`href="${expected}"`) && !canonical.includes(`href="${expected}/"`)) {
        console.warn(`[prerender] ${p}: canonical distinto → ${canonical.match(/href="([^"]*)"/)?.[1]}`);
      }
      const out = p === "/" ? path.join(DIST, "index.html") : path.join(DIST, p + ".html");
      fs.mkdirSync(path.dirname(out), { recursive: true });
      fs.writeFileSync(out, buildHtml(title, tags, body, p));
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

console.log(`[prerender] ${done}/${seen.size} páginas escritas`);
// Algún fallo suelto no debe bloquear el despliegue; muchos sí.
if (failed.length > Math.max(3, seen.size * 0.1)) process.exit(1);

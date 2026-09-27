// Worker de academiadetail.com. Solo se ejecuta para las URL que NO son un
// archivo del build (las páginas pre-renderizadas, JS, CSS e imágenes las sirve
// Cloudflare directamente sin pasar por aquí). Se encarga de:
//   - redirecciones 301 reales de URL antiguas (antes eran <Navigate> de React),
//   - devolver 404 de verdad a las URL que no existen (antes todo daba 200),
//   - servir la SPA con 200 al resto de rutas válidas que no están pre-renderizadas
//     (admin, artículos nuevos del blog hasta la siguiente recompilación…).

interface Env {
  ASSETS: Fetcher;
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
}

const REDIRECTS: Record<string, string> = {
  "/privacidad": "/politica-privacidad",
  "/terminos": "/politica-privacidad",
  "/cookies": "/politica-privacidad",
  "/aviso-legal": "/politica-privacidad",
  "/jornada-cero": "/curso-detailing-iniciacion",
  "/carrera-detailing": "/formacion-profesional-detailing",
  "/formacion/detailing": "/curso-detailing-profesional",
  "/formacion/wrapping": "/curso-vinilado-vehiculos",
  "/formacion/ppf": "/curso-ppf-proteccion-pintura",
  "/formacion/restauracion": "/curso-restauracion-vehiculos",
  "/formacion/detailing-profesional": "/formacion-profesional-detailing",
  "/galeria": "/quienes-somos",
  "/galeria-detailing": "/quienes-somos",
  "/directorio": "/centros-detailing-espana",
  "/directorio/unete": "/centros-detailing-espana/unete",
  "/admin/applications": "/admin/profiles",
};

// Rutas de la app que no dependen de datos. La mayoría están pre-renderizadas y ni
// siquiera llegan aquí; se listan por si una recompilación no las generara.
const STATIC_ROUTES = new Set([
  "/", "/curso-detailing-iniciacion", "/jornada-zero-detailing", "/up-detail-evento",
  "/formacion-profesional-detailing", "/curso-detailing-profesional", "/curso-vinilado-vehiculos",
  "/curso-ppf-proteccion-pintura", "/curso-restauracion-vehiculos", "/quienes-somos", "/contacto",
  "/marketing-digital-detailing", "/glosario-detailing", "/calculadora-dilucion-detailing",
  "/centros-detailing-espana", "/centros-detailing-espana/unete", "/blog", "/gracias",
  "/mapa-del-sitio", "/politica-privacidad", "/unsubscribe",
  "/curso-detailing-madrid", "/curso-detailing-barcelona", "/curso-detailing-valencia",
  "/curso-detailing-sevilla", "/curso-detailing-bilbao",
  "/admin/login", "/admin/profiles", "/admin/contacts", "/admin/blog",
]);

const SECURITY_HEADERS = {
  "Strict-Transport-Security": "max-age=31536000",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
};

async function existsInSupabase(env: Env, table: string, filter: string): Promise<boolean> {
  const res = await fetch(`${env.SUPABASE_URL}/rest/v1/${table}?select=slug&limit=1&${filter}`, {
    headers: { apikey: env.SUPABASE_ANON_KEY, Authorization: `Bearer ${env.SUPABASE_ANON_KEY}` },
    cf: { cacheTtl: 300, cacheEverything: true },
  });
  // Si Supabase falla, mejor servir la página (200) que dar un 404 falso.
  if (!res.ok) return true;
  const rows = (await res.json()) as unknown[];
  return rows.length > 0;
}

type Verdict = { redirect: string } | { status: 200 | 404 };

async function classify(path: string, env: Env): Promise<Verdict> {
  if (REDIRECTS[path]) return { redirect: REDIRECTS[path] };
  if (STATIC_ROUTES.has(path)) return { status: 200 };

  let m: RegExpMatchArray | null;
  // /directorio/<comunidad>[/<provincia>[/<ciudad>]] → nueva ruta del directorio
  if ((m = path.match(/^\/directorio(\/[^/]+(?:\/[^/]+){0,2})$/))) {
    return { redirect: `/centros-detailing-espana${m[1]}` };
  }
  // Ciudades sin página propia: la app ya las mandaba al curso principal.
  if (/^\/curso-detailing-[a-z-]+$/.test(path)) return { redirect: "/curso-detailing-profesional" };
  // El directorio genera sus páginas con los datos; no se validan una a una.
  if (/^\/centros-detailing-espana(\/[^/]+){1,3}$/.test(path)) return { status: 200 };

  if ((m = path.match(/^\/blog\/([a-z0-9-]+)$/))) {
    const ok = await existsInSupabase(env, "blog_posts", `slug=eq.${m[1]}&status=eq.published`);
    return { status: ok ? 200 : 404 };
  }
  if ((m = path.match(/^\/detailer\/([a-z0-9-]+)$/))) {
    const ok = await existsInSupabase(env, "detailer_profiles", `slug=eq.${m[1]}&is_published=eq.true`);
    return { status: ok ? 200 : 404 };
  }
  // El glosario es estático y todos sus términos están pre-renderizados.
  return { status: 404 };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    let path: string;
    try {
      path = decodeURIComponent(url.pathname);
    } catch {
      path = url.pathname;
    }

    // Barra final sobrante → 301 a la versión sin barra (si la ruta existe como
    // archivo, Cloudflare ya la ha resuelto antes de llegar aquí).
    if (path.length > 1 && path.endsWith("/")) {
      return Response.redirect(new URL(url.pathname.replace(/\/+$/, "") + url.search, url).toString(), 301);
    }

    const verdict = await classify(path, env);
    if ("redirect" in verdict) {
      return Response.redirect(new URL(verdict.redirect + url.search, url).toString(), 301);
    }

    // La SPA (index.html): React pinta la página, o la de «no encontrada» con noindex.
    const shell = await env.ASSETS.fetch(new Request(new URL("/", url), request));
    const headers = new Headers(shell.headers);
    for (const [k, v] of Object.entries(SECURITY_HEADERS)) headers.set(k, v);
    if (verdict.status === 404) headers.set("X-Robots-Tag", "noindex");
    return new Response(shell.body, { status: verdict.status, headers });
  },
} satisfies ExportedHandler<Env>;

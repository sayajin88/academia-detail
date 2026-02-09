

# Mejora del robots.txt

## Problemas identificados

### 1. Rutas publicas que faltan en las directivas Allow
Las siguientes paginas activas del sitio no estan listadas explicitamente:
- `/glosario-detailing` (herramienta SEO importante)
- `/calculadora-dilucion-detailing` (herramienta interactiva)
- `/jornada-zero-detailing` (evento)
- `/up-detail-evento` (evento)
- `/blog/:slug` (articulos individuales -- solo esta `/blog/`)
- `/politica-privacidad` (pagina legal)

### 2. Directivas obsoletas o incorrectas
- `/_next/` -- Es de Next.js, este proyecto usa Vite. No tiene sentido.
- `/node_modules/` -- No se sirve en produccion.
- `/src/` -- No se sirve en produccion.
- `/*.json$` y `/*.map$` -- La sintaxis `$` no es estandar en robots.txt. Debe ser `/*.json` y `/*.map`.
- `/assets/*.js$` -- Misma sintaxis incorrecta, y ademas bloquea JS que Google podria necesitar para renderizar la pagina (SPA).

### 3. URLs antiguas que no deberian estar en Disallow
Las rutas `/jornada-cero`, `/carrera-detailing`, `/formacion/` y `/galeria` hacen redirect 301 en el router de React. Al bloquearlas con `Disallow`, se impide que Google siga el redirect y transfiera la autoridad SEO acumulada a las URLs nuevas. Deben permitirse para que el 301 funcione correctamente.

### 4. Directivas redundantes
- `Crawl-delay: 0` para Googlebot: Google ignora completamente la directiva `Crawl-delay`.
- Las secciones de bots sociales (Twitter, Facebook, LinkedIn, Pinterest, WhatsApp) con solo `Allow: /` son redundantes porque la regla general `User-agent: *` con `Allow: /` ya los cubre.

---

## Cambios en `public/robots.txt`

### Estructura propuesta

```
# Academia Detail - Robots.txt
# https://academiadetail.com

# --- Reglas generales ---
User-agent: *
Allow: /

# Paginas principales
Allow: /curso-detailing-iniciacion
Allow: /formacion-profesional-detailing
Allow: /curso-detailing-profesional
Allow: /curso-vinilado-vehiculos
Allow: /curso-ppf-proteccion-pintura
Allow: /curso-restauracion-vehiculos
Allow: /quienes-somos
Allow: /contacto

# Eventos
Allow: /jornada-zero-detailing
Allow: /up-detail-evento

# Herramientas
Allow: /glosario-detailing
Allow: /calculadora-dilucion-detailing

# Blog
Allow: /blog
Allow: /blog/

# Legal
Allow: /politica-privacidad

# Bloquear endpoints internos
Disallow: /api/

# --- Sitemap ---
Sitemap: https://academiadetail.com/sitemap.xml

# --- Google ---
User-agent: Googlebot
Allow: /

User-agent: Googlebot-Image
Allow: /assets/

# --- Bing ---
User-agent: Bingbot
Allow: /
Crawl-delay: 1

# --- Bots de SEO ---
User-agent: AhrefsBot
Crawl-delay: 10

User-agent: SemrushBot
Allow: /

# --- Bloquear bots no deseados ---
User-agent: MJ12bot
Disallow: /

User-agent: DotBot
Disallow: /

User-agent: BLEXBot
Disallow: /

User-agent: GPTBot
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: Claude-Web
Disallow: /

User-agent: Google-Extended
Disallow: /
```

### Detalle de cada cambio

| Cambio | Motivo |
|---|---|
| Anadir `/glosario-detailing`, `/calculadora-dilucion-detailing` | Paginas activas no listadas |
| Anadir `/jornada-zero-detailing`, `/up-detail-evento` | Eventos activos no listados |
| Anadir `/blog/` (con barra final) | Cubre articulos individuales `/blog/slug` |
| Anadir `/politica-privacidad` | Pagina legal activa |
| Eliminar `/_next/`, `/node_modules/`, `/src/` | No existen en produccion (Vite, no Next.js) |
| Corregir `/*.json$` a eliminar | Sintaxis `$` no estandar; manifest.json ya tiene cache headers |
| Corregir `/*.map$` a eliminar | Vite no genera .map en produccion por defecto |
| Eliminar `/assets/*.js$` | Bloquear JS impide que Google renderice la SPA correctamente |
| Eliminar Disallow de URLs antiguas | Las URLs hacen redirect 301; bloquearlas impide transferir autoridad SEO |
| Eliminar `Crawl-delay: 0` de Googlebot | Google ignora Crawl-delay |
| Eliminar secciones redundantes de bots sociales | Ya cubiertos por `User-agent: *` con `Allow: /` |
| Eliminar `Screaming Frog SEO Spider` | Ya cubierto por `User-agent: *` |
| Anadir GPTBot, CCBot, anthropic-ai, Claude-Web, Google-Extended | Bloquear bots de IA que scrapen contenido para entrenamiento |

---

## Resumen de archivos

| Archivo | Accion | Descripcion |
|---|---|---|
| `public/robots.txt` | Reescribir | Actualizar con rutas correctas, eliminar directivas obsoletas, anadir proteccion contra bots de IA |

## Resultado esperado

- Todas las paginas activas del sitio estan explicitamente permitidas
- No se bloquean recursos necesarios para el renderizado de la SPA
- Las URLs antiguas con redirect 301 pueden ser seguidas por Google para transferir autoridad
- Se elimina sintaxis no estandar que podria causar interpretaciones incorrectas
- Se anade proteccion contra bots de IA que scrapen contenido para entrenamiento


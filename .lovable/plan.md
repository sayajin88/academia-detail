

# Plan GEO: Optimizar Academia Detail para Buscadores de IA

## Diagnostico Critico

**Problema #1 (URGENTE):** El archivo `robots.txt` esta **bloqueando activamente** todos los crawlers de IA:
- `GPTBot` (ChatGPT) -> Disallow: /
- `anthropic-ai` y `Claude-Web` (Claude) -> Disallow: /
- `Google-Extended` (Gemini training) -> Disallow: /
- `CCBot` (Common Crawl, usado por muchos LLMs) -> Disallow: /

Esto significa que **ninguna IA puede rastrear tu contenido**. Es imposible aparecer en respuestas de ChatGPT, Gemini o Claude si sus crawlers estan bloqueados.

**Problema #2:** No existe archivo `llms.txt`, el estandar emergente para indicar a las IAs que contenido es mas relevante de tu sitio.

**Problema #3:** Los metadatos fallback en `index.html` estan desactualizados (dicen "4.9" y "174 alumnos" en vez de "4.8" y "218 resenas").

**Lo que YA funciona bien** (no tocaremos):
- Schemas JSON-LD completos (LocalBusiness, Course, FAQ, BreadcrumbList, ItemList)
- Estructura semantica HTML5 correcta
- Contenido de autoridad (glosario, blog, FAQ en cada pagina)
- Google Business Profile vinculado correctamente
- Sitemap modular con 4 sitemaps

---

## Plan de Implementacion

### Paso 1: Desbloquear crawlers de IA en robots.txt

Reemplazar los bloques `Disallow: /` de los bots de IA por `Allow: /`. Esto es el cambio mas critico de todo el plan.

**Antes:**
```text
User-agent: GPTBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: Claude-Web
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: CCBot
Disallow: /
```

**Despues:**
```text
# --- Bots de IA (PERMITIDOS para GEO) ---
User-agent: GPTBot
Allow: /
Disallow: /api/

User-agent: ChatGPT-User
Allow: /

User-agent: anthropic-ai
Allow: /
Disallow: /api/

User-agent: Claude-Web
Allow: /
Disallow: /api/

User-agent: Google-Extended
Allow: /

User-agent: CCBot
Allow: /
Disallow: /api/

User-agent: PerplexityBot
Allow: /

User-agent: Bytespider
Disallow: /
```

Se bloquean solo las rutas `/api/` para proteger endpoints internos, y se anade `PerplexityBot` (Perplexity AI) como permitido y `Bytespider` (TikTok/ByteDance) como bloqueado por ser un scraper agresivo sin valor para GEO.

### Paso 2: Crear archivo llms.txt

Crear `public/llms.txt` con un mapa curado del sitio en formato Markdown, optimizado para que los LLMs entiendan rapidamente que ofrece Academia Detail.

```markdown
# Academia Detail (Detail Park)

> Centro de formacion profesional en detailing automotriz operando en un taller 100% real con clientes de alta gama en Alicante, Espana. Formamos detailers profesionales y empresarios del sector desde 2017. 218+ resenas en Google con 4.8/5.

## Cursos de Formacion

- [Jornada Zero - Curso Iniciacion](https://academiadetail.com/curso-detailing-iniciacion): Experiencia de inmersion de 1 dia por 97EUR. Primer contacto con el detailing profesional.
- [Curso Detailing Profesional](https://academiadetail.com/curso-detailing-profesional): Formacion completa en pulido, descontaminacion, tratamiento ceramico y correccion de pintura.
- [Curso Car Wrapping](https://academiadetail.com/curso-vinilado-vehiculos): Instalacion profesional de vinilo y cambio de color de vehiculos.
- [Curso PPF](https://academiadetail.com/curso-ppf-proteccion-pintura): Instalacion de Paint Protection Film en vehiculos de alta gama.
- [Curso Restauracion](https://academiadetail.com/curso-restauracion-vehiculos): Tecnicas avanzadas de restauracion de vehiculos clasicos.
- [Carrera Detailing Profesional](https://academiadetail.com/formacion-profesional-detailing): Programa completo de 1 mes con 4 certificaciones + modulo de negocio.

## Recursos y Herramientas

- [Blog](https://academiadetail.com/blog): Articulos sobre tecnicas de detailing, negocio y tendencias del sector.
- [Glosario de Detailing](https://academiadetail.com/glosario-detailing): Mas de 100 terminos tecnicos del detailing profesional con definiciones completas.
- [Calculadora de Dilucion](https://academiadetail.com/calculadora-dilucion-detailing): Herramienta interactiva para calcular ratios de dilucion de productos de detailing.
- [Directorio de Centros](https://academiadetail.com/centros-detailing-espana): Directorio de centros de detailing certificados en toda Espana.

## Informacion de Contacto

- Web: https://academiadetail.com
- Telefono: +34 622 773 555
- Email: info@academiadetail.com
- Direccion: Calle Metalurgias 13, 03008 Alicante, Espana
- Google Maps: https://www.google.com/maps/place/Detail+Park/

## Sobre Nosotros

- [Quienes Somos](https://academiadetail.com/quienes-somos): Historia, equipo e instalaciones.
- [Contacto](https://academiadetail.com/contacto): Formulario de contacto y ubicacion.
```

### Paso 3: Crear archivo llms-full.txt

Crear `public/llms-full.txt` con contenido expandido que incluya las preguntas frecuentes mas relevantes y datos clave de cada curso (precios, duracion, que incluye). Este archivo sirve como "libro completo" para LLMs con contextos mas amplios.

### Paso 4: Sincronizar metadatos fallback en index.html

Actualizar los meta tags de fallback que estan desactualizados:
- Cambiar "4.9" por "4.8" en og:title y twitter:title
- Cambiar "174 alumnos" por "218+ alumnos" en og:description y twitter:description

Esto es importante porque los crawlers de IA que no ejecutan JavaScript solo ven estos meta tags estaticos.

### Paso 5: Anadir schema "speakable" para contenido citado por voz/IA

Anadir la propiedad `speakable` al schema de las paginas principales en `seoConfig.ts`. Este schema indica a Google y a los asistentes de voz que secciones del contenido son aptas para ser leidas/citadas textualmente.

Se anadira como propiedad dentro de los schemas `WebPage` existentes:
```json
"speakable": {
  "@type": "SpeakableSpecification",
  "cssSelector": ["h1", ".hero-description", ".faq-answer"]
}
```

---

## Detalles Tecnicos

### Archivos a crear:
1. `public/llms.txt` - Mapa curado del sitio para LLMs
2. `public/llms-full.txt` - Version expandida con FAQs y datos de cursos

### Archivos a modificar:
1. `public/robots.txt` - Desbloquear crawlers de IA + anadir PerplexityBot
2. `index.html` - Sincronizar metadatos fallback (4.8/218)
3. `src/utils/seoConfig.ts` - Anadir propiedad `speakable` a schemas WebPage de paginas principales

### Lo que NO se toca:
- Ningun schema JSON-LD existente
- Ningun componente visual
- Ninguna ruta o estructura de paginas
- La base de datos
- Las Edge Functions

### Sin nuevas dependencias
### Sin cambios en base de datos
### Sin cambios visuales


# Auditoría SEO y plan de posicionamiento: /marketing-digital-detailing

## Diagnóstico actual (verificado en el código)

Lo que ya está bien:
- Un único H1 en el hero, jerarquía H2 (secciones) / H3 (tarjetas) correcta.
- `seoConfig.marketingDigital` con title, description, keywords, canonical y schemas (LocalBusiness, WebPage, BreadcrumbList, FAQPage).
- FAQ real en página coherente con el FAQPage.

Puntos débiles detectados:
- **El H1 no contiene ninguna keyword**: "Tu trabajo es espectacular. Que tu marca también lo sea." Es puro claim, sin "marketing digital", "web" ni "detailing".
- **H2 sin keywords**: "En este negocio se vende por los ojos", "Todo lo que tu negocio necesita para verse grande", etc. Ningún H2 menciona web / SEO / detailing / precio.
- **Sin schema de Servicio ni de Oferta**: los packs (199 € / 889 € / 99 €) no están marcados como `Service` + `Offer`, que es lo que permite aparecer con precio en resultados y ser citado por IA.
- **Sin sección de texto indexable de cola larga**: la página es muy visual; falta contenido escrito que cubra búsquedas informativas.
- **Sin enlazado interno entrante** relevante desde blog/glosario/directorio hacia esta landing (solo navbar y footer).
- **Nicho de volumen bajo** (Semrush ES: "diseño web para talleres" = 30 búsq./mes, KD 0). La estrategia debe ser cola larga + GEO (que la citen ChatGPT/Perplexity) + tráfico interno del directorio de centros, no volumen puro.

## Propuesta de estructura de encabezados

H1 (único, hero):
- **Marketing digital para centros de detailing: web, SEO y marca**
  con la línea emocional actual degradada a subtítulo/párrafo.

H2 propuestos (uno por sección, con keyword):
1. Por qué un centro de detailing necesita marketing digital
2. Servicios de marketing digital para detailing: web, SEO, GEO y marca
3. Diseño web para detailing: así se ve una web que convierte
4. Precios y packs de páginas web para detailers (desde 199 €)
5. Identidad de marca y logotipo para tu taller de detailing
6. Contenido y fotografía profesional en tu taller
7. Cómo trabajamos: de la primera llamada a tu web publicada
8. Preguntas frecuentes sobre marketing digital para detailing
9. Habla con nosotros por WhatsApp

H3: mantener los actuales de tarjetas, más los nuevos por pack ("Pack Arranque 199 €", "Pack Profesional 889 €", "Pack SEO + GEO 99 €") y por servicio ("SEO local en Google", "GEO: aparecer en ChatGPT y Perplexity", "Google Business Profile", "Redes sociales").

## Keywords objetivo

Principal: `marketing digital para detailing`
Secundarias: `diseño web para detailing`, `página web para taller de detailing`, `SEO para centros de detailing`, `posicionamiento web taller de coches`, `logotipo para taller de detailing`
Cola larga / GEO: `cuánto cuesta una página web para un detailing`, `cómo conseguir clientes en detailing`, `cómo aparecer en Google con mi taller de detailing`, `aparecer en ChatGPT como negocio local`, `fotos profesionales para redes de detailing`
Locales: variantes + Alicante / Valencia / Murcia / España.

## Contenido nuevo a añadir en la landing

- Párrafo introductorio bajo el H1 con la keyword principal en las primeras 100 palabras.
- Bloque de texto "¿Cuánto cuesta una web para un centro de detailing?" (150-200 palabras) que responde directo con los 3 precios: formato ideal para snippet y para citas de IA.
- Tabla comparativa de packs (HTML real, no solo tarjetas) con qué incluye cada uno: contenido tabular es muy citado por buscadores de IA.
- 4-6 FAQs adicionales orientadas a las cola larga listadas arriba (se reflejan automáticamente en el FAQPage).
- Bloque final de enlaces internos: cursos de detailing, directorio de centros y blog.

Sin inventar cifras: no se añadirán testimonios, número de clientes ni resultados que no nos confirmes.

## SEO técnico ON PAGE

Metadatos propuestos:
- **title** (58 car.): `Marketing Digital para Detailing | Web, SEO y Marca`
- **description** (155 car.): `Diseño web, SEO y GEO para centros de detailing. Webs desde 199 € y SEO desde 99 €/mes. Más visibilidad en Google y en la IA. Escríbenos por WhatsApp.`
- **og:title / og:description** alineados; `og:type: website`; imagen social propia de la landing (1200×630) si nos das el visto bueno para generarla.
- canonical y og:url autorreferenciados a `/marketing-digital-detailing` (ya correcto).

Otros ajustes:
- Alt text descriptivo con keyword en los mockups y fotos de la sección de trabajos.
- `id` semánticos y ancla en cada sección (`#servicios`, `#packs`, `#proceso`, `#faq`) para enlaces internos y posibles sitelinks.
- Verificar peso/formato de las imágenes nuevas (PNG grandes de mockups) y `loading="lazy"` en todo lo que esté bajo el pliegue.
- Página ya incluida en sitemap; confirmar prioridad 0.8 y lastmod actualizado.

## JSON-LD propuesto

Además de los actuales (LocalBusiness, WebPage, BreadcrumbList, FAQPage), añadir:
- **Service** ("Marketing digital para centros de detailing") con `provider` = Detail Park - Academia Detail, `areaServed` España, `serviceType`, y `hasOfferCatalog` con los 3 packs.
- **Offer** por pack con `price` (199, 889, 99), `priceCurrency: EUR`, `availability`, `url` con ancla al pack.
- **ProfessionalService** ligado al `@id` canónico del negocio para no duplicar entidad.
- Mantener el FAQPage sincronizado con las FAQs ampliadas.

## SEO OFF PAGE

- Ficha de Google Business Profile: añadir "diseño web y marketing para detailing" como servicio y publicar posts enlazando la landing.
- Enlaces internos entrantes desde: artículos del blog sobre montar un negocio de detailing, páginas de ciudad, el directorio de centros y la página de la carrera profesional (es el público natural).
- Alta en directorios de agencias y de servicios para automoción; perfiles sociales apuntando a la landing.
- Contenido de apoyo en el blog (3 artículos) que enlacen a la landing: cómo conseguir clientes en detailing, cuánto cobrar por un pulido, cómo hacer fotos de tus trabajos.
- GEO: mantener `llms.txt` actualizado incluyendo esta landing y sus precios para que los LLM la citen.

## Detalles técnicos de implementación

Archivos a tocar:
- `src/components/marketing/MarketingHero.tsx` — nuevo H1 con keyword.
- `src/components/marketing/MarketingSections.tsx` — nuevos textos de H2/H3, bloque de coste, alt text.
- `src/components/marketing/MarketingPacks.tsx` — H3 por pack, ids de ancla, tabla comparativa.
- `src/components/marketing/marketingData.ts` — FAQs ampliadas y copy nuevo.
- `src/utils/seoConfig.ts` — title/description/keywords nuevos y schemas Service + OfferCatalog.
- `public/llms.txt` y `public/llms-full.txt` — incluir la landing.
- Opcional: nueva imagen OG de la landing.

Sin cambios de backend ni de precios; solo contenido, encabezados y metadatos.

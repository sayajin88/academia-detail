# Landing de Marketing Digital para negocios de detailing

Nueva página dentro de Academia Detail que ofrece los servicios digitales (web, SEO/GEO, marca) como complemento natural para alumnos y centros de detailing que están montando su negocio. Misma identidad visual: charcoal #1a1a1f, granate #8B2332, tipografías y espaciado `py-16 md:py-24` ya usados en el sitio.

Ruta: `/marketing-digital-detailing` (enlazada desde el menú y desde el footer).

## Secciones de la página

1. **Hero impactante**
   - Titular tipo "Tu trabajo es espectacular. Tu presencia digital también debería serlo."
   - Subtítulo: web, SEO, posicionamiento en buscadores de IA e identidad de marca para centros de detailing.
   - Doble CTA: WhatsApp directo + scroll a packs.
   - Fondo animado en bucle: gradientes granate en movimiento lento, grid sutil, partículas/reflejo diagonal recorriendo el bloque.

2. **"En este negocio se vende por los ojos"**
   - 4 tarjetas argumentales con iconos Lucide y contadores animados: el cliente juzga en segundos, la mayoría busca en el móvil, fotos y reseñas deciden la llamada, sin web no apareces en Google ni en respuestas de IA.
   - Redacción como argumentos de criterio (sin inventar estadísticas atribuidas a fuentes concretas).

3. **Servicios**
   - Tarjetas con efecto glass, borde con gradiente animado y "spotlight" al pasar el ratón (mismo patrón que `PricingComparison`): Diseño web, SEO, GEO (buscadores de IA), Redes sociales, Google Business Profile, Identidad de marca y logotipo.

4. **Packs de página web** (precios sin IVA, con precio tachado)
   - Página web de arranque (Landing Page): **199€** (antes 299€)
   - Página web Profesional multi-sección: **889€** (antes 1299€) — marcada como más popular
   - Cada tarjeta con lista de entregables y CTA a WhatsApp con mensaje prerellenado del pack.

5. **Packs de posicionamiento** (bloque aparte)
   - SEO + Posicionamiento en buscadores de IA: **99€** (antes 279€)
   - Nota visible: "Precios sin IVA".

6. **Identidad de marca**
   - Bloque de logotipo, imagen de empresa, rotulación y plantillas para redes. Precio a consultar por WhatsApp (no se inventa tarifa).

7. **Proceso en 4 pasos** con línea de tiempo animada: llamada → propuesta → producción → lanzamiento y medición.

8. **FAQ** (acordeón existente) + **CTA final** a WhatsApp.

## CTA

Todos los CTA abren WhatsApp: `https://wa.me/34622773555` con texto prerellenado según el pack (p. ej. "Hola, me interesa la Página web Profesional"). Sin formularios nuevos.

## Detalles técnicos

- `src/pages/MarketingDigital.tsx` + componentes en `src/components/marketing/` (Hero, ValueVisual, ServicesGrid, WebPacks, GrowthPacks, BrandingSection, Process, FAQ, FinalCTA).
- Ruta añadida en `src/App.tsx`; enlace en `Navbar.tsx` y `Footer.tsx`.
- Entrada nueva en `src/utils/seoConfig.ts` (title, description, canonical, BreadcrumbList, Service/Offer y FAQPage) consumida por el componente `SEO` existente.
- Animaciones: keyframes nuevos en `index.css`/`tailwind.config.ts` (shine/sweep, float, gradiente animado, pulse de borde) reutilizando tokens; se respeta `prefers-reduced-motion` y se usa `AnimatedSection` para las entradas por scroll.
- Sin colores hardcodeados: solo tokens semánticos (`primary`, `card`, `muted`, gradientes y sombras ya definidos).
- Añadir la URL al sitemap de páginas.

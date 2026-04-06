
## Plan: Mejoras técnicas SEO, rendimiento, accesibilidad y RGPD

### ⚠️ Ajustes importantes antes de empezar

1. **FASE 1 — `vite-plugin-imagemin`**: Este paquete tiene problemas crónicos de instalación por dependencias nativas (gifsicle, mozjpeg, etc.). El proyecto **ya usa `vite-plugin-image-optimizer`** que hace lo mismo. Propongo mantener el plugin actual en vez de añadir uno conflictivo. Sí revisaré loading/fetchPriority y width/height en imágenes.

2. **FASE 2 — Fuentes**: Ya tienen `display=swap` en index.html. Verificaré y confirmaré.

3. **FASE 4 — `vercel.json` y `_headers`**: Lovable hosting **NO procesa** `vercel.json`, `_headers`, ni `_redirects`. Estos archivos no tienen efecto. Los headers de seguridad deben gestionarse a nivel de plataforma. **Omitiré esta fase** por ser inoperante.

4. **FASE 6 — A11y**: El proyecto ya tiene skip-to-main link, `id="main-content"` en `<main>`, y `role="main"`. Revisaré lo que falta sin duplicar.

### Fases que ejecutaré

| Fase | Descripción | Archivos principales |
|------|-------------|---------------------|
| 1 | Revisar loading/fetchPriority + width/height en imágenes | HomeHero, FormationHero, otros componentes con img |
| 2 | Verificar font-display: swap (ya presente) | index.html |
| 3 | Crear /gracias + redirección post-envío | Gracias.tsx, App.tsx, EnrollmentWizard.tsx |
| ~~4~~ | ~~vercel.json / _headers~~ | ~~Omitida — no aplica en Lovable~~ |
| 5 | Breadcrumbs visuales en FormationDetail | Breadcrumbs.tsx, FormationDetail.tsx |
| 6 | Auditoría a11y: aria-labels, alt texts, nav landmarks | Múltiples componentes |
| 7 | Sitemap con hreflang | sitemap-pages.xml |
| 8 | Página Mapa del Sitio HTML | MapaSitio.tsx, App.tsx |
| 9 | RelatedCourses + enlazado interno | RelatedCourses.tsx, BlogPost.tsx, GlossaryTerm.tsx |
| 10 | CookieBanner RGPD + Consent Mode v2 | CookieBanner.tsx, index.html, App.tsx |

### Archivos NO modificados
- Estilos visuales ni lógica de negocio existente
- src/integrations/supabase/* (autogenerados)
- .env, supabase/migrations/

### Auditoría final
Checklist completa al terminar todas las fases.

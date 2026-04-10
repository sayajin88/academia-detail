

## Plan: Estrategia ViaBill — CTAs de financiación en todo el sitio + mejora de la barra sticky

### Diagnóstico actual
- **ViaBillFinancingBar**: barra sticky inferior con contenido descentrado (logo a la izquierda, mensaje en flex-1, CTA a la derecha — no hay centrado visual real).
- **FinancingBadge**: componente reutilizable con 3 variantes (compact, default, prominent) — ya existe pero se usa poco.
- **BlogSidebar**: no menciona financiación.
- **BlogPostCTA**: no menciona financiación.
- **BlogCTABanner**: no menciona financiación.
- **FormationPricing**: ya usa `ViaBillPriceTag` y `FinancingBadge` (bien).
- **Páginas de blog, Home, Carrera, etc.**: sin CTAs de financiación intermedios.

---

### 1. Mejorar la barra sticky `ViaBillFinancingBar`

**Archivo**: `src/components/shared/ViaBillFinancingBar.tsx`

Cambios:
- Centrar todo el contenido con `justify-center` en lugar de `justify-between`
- Reorganizar layout: logo + separador + mensaje rotativo + CTA, todo centrado en una fila
- Añadir efecto de "glow" pulsante en el borde superior (animación de gradiente más visible)
- Aumentar padding y tamaño tipográfico ligeramente
- En móvil: centrar también, con el CTA "Infórmate" visible (ahora está oculto en `sm:`)

---

### 2. Nuevo componente `ViaBillInlineCTA`

**Archivo nuevo**: `src/components/shared/ViaBillInlineCTA.tsx`

Un banner inline reutilizable para insertar dentro de contenido. Diseño: franja con gradiente púrpura, logo ViaBill, copy tipo "Financia tu formación desde 50€/mes — Sin intereses", botón "Infórmate". Será un componente autónomo que se puede insertar en cualquier página.

---

### 3. Insertar CTAs de financiación en el blog

**Archivo**: `src/pages/BlogPost.tsx`
- Insertar `<ViaBillInlineCTA />` entre el contenido del artículo y los tags (después de `BlogDirectoryBanner`, antes de tags)

**Archivo**: `src/components/blog/BlogSidebar.tsx`
- Añadir un `FinancingBadge` variant="prominent" debajo de los botones de CTA del sidebar, con link a `/contacto`

**Archivo**: `src/components/blog/BlogPostCTA.tsx`
- Añadir mención de financiación ("Financiación disponible desde 50€/mes") con el logo de ViaBill en la columna de texto

---

### 4. Insertar CTAs en páginas de formación

**Archivo**: `src/pages/FormationDetail.tsx`
- Insertar `<ViaBillInlineCTA />` después de `FormationIncludes` y antes de `BrandLogosBar`

---

### 5. Insertar en Home y Carrera

**Archivo**: `src/pages/Home.tsx`
- Insertar `<ViaBillInlineCTA />` como lazy component después de `CarreraNegocioSection`

**Archivo**: `src/pages/CarreraDetailing.tsx`
- Insertar `<ViaBillInlineCTA />` después de la sección de pricing de carrera

---

### Archivos afectados

| Archivo | Cambio |
|---|---|
| `src/components/shared/ViaBillFinancingBar.tsx` | Rediseño centrado + efectos visuales mejorados |
| `src/components/shared/ViaBillInlineCTA.tsx` | **Nuevo** — Banner inline reutilizable de financiación |
| `src/pages/BlogPost.tsx` | Insertar `ViaBillInlineCTA` en el artículo |
| `src/components/blog/BlogSidebar.tsx` | Añadir `FinancingBadge` prominent |
| `src/components/blog/BlogPostCTA.tsx` | Mención de financiación + logo ViaBill |
| `src/pages/FormationDetail.tsx` | Insertar `ViaBillInlineCTA` |
| `src/pages/Home.tsx` | Insertar `ViaBillInlineCTA` lazy |
| `src/pages/CarreraDetailing.tsx` | Insertar `ViaBillInlineCTA` |




## Optimizacion SEO completa de la pagina principal del Directorio

### 1. Cambio de slug

**Slug actual:** `/directorio`
**Nuevo slug:** `/centros-detailing-espana`

El slug actual es generico y no contiene ninguna keyword de valor. El nuevo slug ataca directamente busquedas transaccionales de alta intencion como:
- "centros detailing espana"
- "detailing espana"
- "centros de detailing"

Se mantendra un redirect 301 desde `/directorio` hacia `/centros-detailing-espana` para preservar cualquier autoridad existente.

**Toda la jerarquia geografica migrara tambien:**
- `/centros-detailing-espana/comunidad-valenciana`
- `/centros-detailing-espana/comunidad-valenciana/alicante`
- `/centros-detailing-espana/comunidad-valenciana/alicante/alicante`
- `/centros-detailing-espana/unete`

---

### 2. Meta tags optimizados para SERPs

**Title tag (max 60 chars):**
`Centros de Detailing Certificados en Espana | Academia Detail`

**Meta description (max 155 chars, con power words y CTA):**
`Encuentra centros de detailing y detailers certificados cerca de ti. Pulido, ceramico, PPF e interiores con garantia de calidad ✅ Busca por ciudad`

**Keywords target:**
- centros detailing espana
- detailer cerca de mi
- pulido ceramico profesional
- proteccion pintura coche

---

### 3. Schema markup enriquecido (JSON-LD)

Se implementaran 3 schemas simultaneos en la pagina:

**a) ItemList** (ya existe, se mejora):
- Incluir `url`, `image` y `address` de cada detailer en los items
- Ampliar a los 20 primeros resultados (actualmente solo 10)

**b) BreadcrumbList** (nuevo):
- Inicio > Centros Detailing Espana
- Genera el breadcrumb visible en las SERPs de Google

**c) WebPage con SearchAction** (nuevo):
- Permite que Google muestre un sitelink searchbox en los resultados
- `potentialAction` con `SearchAction` apuntando a la busqueda por ciudad

**d) Organization con areaServed** (existente, se referencia):
- Vincula el directorio con la entidad principal de Academia Detail

---

### 4. Archivos a modificar

**`src/App.tsx`**
- Cambiar ruta `/directorio` a `/centros-detailing-espana`
- Cambiar rutas hijas: `/centros-detailing-espana/:comunidad`, etc.
- Anadir redirect 301: `/directorio` -> `/centros-detailing-espana`
- Anadir redirect 301: `/directorio/:comunidad` -> `/centros-detailing-espana/:comunidad` (y cascada)
- Mantener `/directorio/unete` -> `/centros-detailing-espana/unete`

**`src/pages/Directory.tsx`**
- Nuevo title, meta description, canonical
- Schema BreadcrumbList + WebPage con SearchAction
- Schema ItemList mejorado (20 items, con image/address)
- Actualizar todos los links internos a comunidades

**`src/pages/DirectoryComunidad.tsx`**
- Actualizar canonical y breadcrumbs a `/centros-detailing-espana/...`
- Actualizar links internos

**`src/pages/DirectoryProvincia.tsx`**
- Actualizar canonical y breadcrumbs a `/centros-detailing-espana/...`
- Actualizar links internos

**`src/pages/DirectoryCiudad.tsx`**
- Actualizar canonical y breadcrumbs a `/centros-detailing-espana/...`
- Actualizar links internos

**`src/pages/DetailerPage.tsx`**
- Actualizar breadcrumbs y links a `/centros-detailing-espana`

**`src/pages/DirectoryJoin.tsx`**
- Actualizar canonical y links a `/centros-detailing-espana/unete`

**`src/components/directory/DirectoryJoinBanner.tsx`**
- Actualizar enlace a `/centros-detailing-espana/unete`

**`src/components/layout/Navbar.tsx` y `Footer.tsx`**
- Actualizar enlaces de navegacion si referencian `/directorio`

**`src/components/directory/DirectoryHero.tsx`**
- Sin cambios funcionales, solo se beneficia del nuevo contexto SEO

**`supabase/functions/directory-sitemap/index.ts`**
- Actualizar todas las URLs generadas de `/directorio/` a `/centros-detailing-espana/`

**`public/sitemap.xml`**
- Cambiar la entrada de `/directorio` a `/centros-detailing-espana`

**`src/components/SEO.tsx`**
- Anadir `centros-detailing-espana` al mapa de nombres de breadcrumbs automaticos

---

### 5. Detalle tecnico de los schemas

```text
Schema 1: BreadcrumbList
  - ListItem 1: Inicio -> /
  - ListItem 2: Centros Detailing Espana -> /centros-detailing-espana

Schema 2: ItemList (mejorado)
  - numberOfItems: total de detailers
  - 20 primeros items con:
    - @type: AutoBodyShop
    - name, url, image, address (city + province)

Schema 3: WebPage + SearchAction
  - @type: WebPage
  - name: "Directorio de Centros de Detailing Certificados"
  - potentialAction:
    - @type: SearchAction
    - target: https://academiadetail.com/centros-detailing-espana?q={search_term}
    - query-input: required name=search_term
```

---

### 6. Orden de implementacion

1. Actualizar rutas en `App.tsx` con redirects 301 de compatibilidad
2. Actualizar `Directory.tsx` con nuevo slug, metas y schemas enriquecidos
3. Actualizar las 3 landing pages geograficas (comunidad, provincia, ciudad)
4. Actualizar `DetailerPage.tsx` y `DirectoryJoin.tsx`
5. Actualizar Navbar, Footer y banners con nuevos enlaces
6. Actualizar edge function del sitemap dinamico
7. Actualizar sitemap.xml estatico y mapa de breadcrumbs en SEO.tsx


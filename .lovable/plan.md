

## Arquitectura SEO Geografica Nacional para el Directorio

### Resumen
Implementar una estructura completa de URLs geograficas con 4 niveles (nacional, comunidad autonoma, provincia, ciudad) + fichas de detailer con Schema markup avanzado, sitemap dinamico y contenido SEO optimizado para posicionar en busquedas locales tipo "detailing en [ciudad]".

---

### Cambios en Base de Datos

**Anadir columna `comunidad_autonoma`** a la tabla `detailer_profiles`:
- Nueva columna `comunidad_autonoma TEXT` para clasificar cada perfil por su comunidad autonoma
- Actualizar los registros existentes (ej: Alicante -> Comunidad Valenciana)
- Esto permite generar las rutas `/directorio/comunidad-valenciana/alicante/alicante`

---

### Nueva Estructura de Rutas

```text
/directorio                                          -> Pagina principal nacional
/directorio/comunidad-valenciana                     -> Landing de Comunidad Autonoma
/directorio/comunidad-valenciana/alicante            -> Landing de Provincia
/directorio/comunidad-valenciana/alicante/alicante   -> Landing de Ciudad
/detailer/nombre-del-centro                          -> Ficha individual (nuevo slug base)
```

**Redirects necesarios:**
- `/directorio/:province/:city` (antiguo) redirige a `/directorio/:comunidad/:province/:city`
- `/directorio/:slug` (fichas antiguas) redirige a `/detailer/:slug`

---

### Archivos Nuevos

**1. `src/data/comunidadesAutonomas.ts`**
- Mapa estatico provincia -> comunidad autonoma para las 50 provincias de Espana
- Funcion `slugify()` para generar URLs limpias
- Funcion `getProvinciasByComunidad()` y `getComunidadByProvincia()`

**2. `src/pages/DirectoryComunidad.tsx`**
- Landing page para cada comunidad autonoma
- H1: "Mejores Centros de Detailing en [Comunidad Autonoma]"
- Texto SEO introductorio dinamico sobre detailing en esa region
- Grid de tarjetas de detailers filtrados por comunidad
- Seccion de interlinking: "Provincias en [Comunidad]" con links a todas las provincias
- Schema ItemList + BreadcrumbList

**3. `src/pages/DirectoryProvincia.tsx`**
- Landing page para cada provincia
- H1: "Detailing Profesional en [Provincia] - Centros Certificados"
- Texto SEO sobre servicios de detailing en la provincia
- Grid de detailers filtrados
- Seccion de interlinking: "Ciudades en [Provincia]" con links a ciudades donde hay detailers
- Schema ItemList + BreadcrumbList

**4. `src/pages/DirectoryCiudad.tsx`** (reemplaza DirectoryCity.tsx actual)
- Landing con la nueva estructura de 3 niveles en breadcrumbs
- H1: "Los Mejores Centros de Detailing en [Ciudad]"
- Texto SEO optimizado para busquedas locales
- Grid de detailers + mapa de la ciudad
- Interlinking: "Otras ciudades en [Provincia]"
- Schema ItemList + BreadcrumbList

**5. `supabase/functions/directory-sitemap/index.ts`**
- Edge function que genera un sitemap XML dinamico
- Consulta la base de datos para obtener todas las combinaciones comunidad/provincia/ciudad
- Genera URLs para cada nivel geografico + cada ficha de detailer
- Incluye lastmod basado en `created_at` de los perfiles

---

### Archivos Modificados

**6. `src/App.tsx`** - Nuevas rutas:
```text
/directorio                              -> Directory (sin cambios)
/directorio/:comunidad                   -> DirectoryComunidad
/directorio/:comunidad/:provincia        -> DirectoryProvincia
/directorio/:comunidad/:provincia/:ciudad -> DirectoryCiudad
/detailer/:slug                          -> DetailerPage
/directorio/:slug                        -> Redirect a /detailer/:slug (compatibilidad)
/directorio/:province/:city              -> Redirect a nueva ruta
```

**7. `src/pages/DetailerPage.tsx`** - Mejoras SEO:
- Cambiar ruta base a `/detailer/:slug`
- Schema LocalBusiness completo con campos: `name`, `image`, `address`, `telephone`, `priceRange` ("EUR"), `geo`, `openingHours`, `areaServed`
- Breadcrumbs actualizados con 5 niveles: Inicio > Directorio > Comunidad > Provincia > Ciudad > Nombre
- Meta title: "[Nombre Centro] | Detailing y Limpieza en [Ciudad] - Academia Detail"
- Alt tags automaticos en imagenes del portfolio: "Pulido de coche en [Nombre Centro], [Ciudad]"
- Anadir `<link rel="canonical">` con la nueva URL `/detailer/slug`

**8. `src/pages/Directory.tsx`** - Mejoras en la pagina principal:
- Anadir seccion de interlinking por comunidades autonomas al final
- Mejorar Schema con `areaServed: Spain`
- Texto SEO introductorio bajo el hero

**9. `src/components/directory/DetailerCard.tsx`**
- Actualizar enlaces de `/directorio/:slug` a `/detailer/:slug`

**10. `src/components/directory/DirectoryMap.tsx`**
- Actualizar enlaces en popups de `/directorio/:slug` a `/detailer/:slug`

**11. `public/sitemap.xml`**
- Anadir entrada para `/directorio` con priority 0.9
- Nota: el sitemap dinamico de ciudades/provincias se servira via edge function

---

### Estrategia SEO Adicional

**Contenido SEO en landings geograficas:**
Cada pagina de comunidad/provincia/ciudad incluira un bloque de texto de 100-150 palabras sobre los beneficios del detailing profesional en esa zona, optimizado para keywords locales como:
- "detailing [ciudad]"
- "pulido ceramico [ciudad]"
- "proteccion pintura coche [provincia]"
- "lavado premium [ciudad]"

**Interlinking interno:**
- Cada landing de ciudad enlaza a "Otras ciudades en la provincia"
- Cada landing de provincia enlaza a "Provincias de la comunidad"
- La pagina principal enlaza a todas las comunidades
- Las fichas de detailer enlazan a su ciudad

**Core Web Vitals:**
- Imagenes de detailers con `loading="lazy"` (ya implementado)
- Imagenes de portfolio con alt tags semanticos automaticos
- Skeleton loaders en todas las landings geograficas

**Meta robots:**
- Paginas sin detailers mostraran `<meta name="robots" content="noindex">` para evitar thin content

---

### Detalles Tecnicos

**Orden de implementacion:**
1. Migracion DB: anadir `comunidad_autonoma` + actualizar datos existentes
2. Crear `src/data/comunidadesAutonomas.ts` (mapa estatico)
3. Crear las 3 paginas de landing geograficas
4. Actualizar rutas en App.tsx con redirects de compatibilidad
5. Actualizar DetailerPage con Schema mejorado y nueva ruta
6. Actualizar enlaces en DetailerCard y DirectoryMap
7. Crear edge function de sitemap dinamico
8. Actualizar sitemap.xml estatico

**Dependencias:** Ninguna nueva. Se reutilizan React Router, Helmet, Leaflet y los componentes existentes del directorio.


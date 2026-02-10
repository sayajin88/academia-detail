
# Plan: Directorio de Profesionales (Marketplace de Servicios)

## Resumen

Modulo completo de directorio de detailers certificados. Sin autenticacion -- los detailers envian un formulario publico de solicitud y un admin los da de alta. Incluye subida de imagenes con almacenamiento en Lovable Cloud y mapas con OpenStreetMap/Leaflet (gratis).

---

## Fase 1: Base de Datos

### Nuevas tablas

**`detailer_profiles`**

| Campo | Tipo | Notas |
|---|---|---|
| id | uuid (PK) | Auto-generado |
| created_at | timestamptz | Default now() |
| business_name | text | Nombre comercial |
| slug | text (unique) | URL amigable |
| owner_name | text | Nombre del titular |
| email | text | Contacto interno |
| phone | text | Telefono |
| city | text | Ciudad |
| province | text | Provincia |
| zip_code | text | Codigo postal |
| address | text | Direccion completa |
| latitude | double precision | Para mapa |
| longitude | double precision | Para mapa |
| services | text[] | Array: Pulido, Ceramico, Interior, PPF, Wrapping... |
| level_badge | text | Enum via check: 'member', 'certified', 'master' |
| is_verified | boolean | Default false |
| is_published | boolean | Default false (admin activa) |
| whatsapp_number | text | Nullable |
| website_url | text | Nullable |
| instagram_handle | text | Nullable |
| description | text | Bio/descripcion del negocio |
| featured_image_url | text | Imagen destacada (URL de storage) |

**`portfolio_images`**

| Campo | Tipo | Notas |
|---|---|---|
| id | uuid (PK) | Auto-generado |
| detailer_id | uuid (FK) | Referencia a detailer_profiles |
| before_image_url | text | URL de storage |
| after_image_url | text | URL de storage |
| title | text | Descripcion del trabajo |
| created_at | timestamptz | Default now() |

**`directory_applications`** (formulario publico)

| Campo | Tipo | Notas |
|---|---|---|
| id | uuid (PK) | Auto-generado |
| created_at | timestamptz | Default now() |
| business_name | text | |
| owner_name | text | |
| email | text | |
| phone | text | |
| city | text | |
| province | text | |
| services | text[] | |
| experience_level | text | |
| has_taken_course | boolean | |
| course_name | text | Nullable |
| message | text | Nullable |
| status | text | Default 'pending' |

### RLS Policies

- **detailer_profiles**: SELECT publico para `is_published = true`. No INSERT/UPDATE/DELETE publico (solo admin).
- **portfolio_images**: SELECT publico (vinculado a perfiles publicados). No INSERT/UPDATE/DELETE publico.
- **directory_applications**: INSERT publico (formulario). No SELECT/UPDATE/DELETE publico.

### Storage Bucket

- Crear bucket `portfolio` (publico) para imagenes de before/after y fotos destacadas.
- RLS: lectura publica, escritura restringida.

---

## Fase 2: Frontend - Componentes y Paginas

### Nuevas paginas

1. **`/directorio`** - Pagina principal del directorio
   - Hero con titulo "Encuentra tu Detailer Certificado"
   - Buscador por ciudad/provincia con input de texto
   - Boton "Cerca de mi" (geolocation API del navegador)
   - Filtros: servicios (tags clickables) + nivel de certificacion
   - Grid de tarjetas de detailers (ordenados por level_badge > nombre)
   - Paginacion

2. **`/directorio/:province/:city`** - Paginas de ciudad (SEO programatico)
   - H1 dinamico: "Mejores Detailers en [Ciudad], [Provincia]"
   - Texto introductorio SEO generado por ciudad
   - Lista filtrada de detailers en esa ciudad
   - Breadcrumbs: Inicio > Directorio > [Provincia] > [Ciudad]

3. **`/directorio/:slug`** - Ficha del detailer
   - Imagen destacada grande
   - Nombre comercial, nivel (badge dorado/plateado/bronce)
   - Mapa OpenStreetMap con ubicacion
   - Slider antes/despues con imagenes del portfolio
   - Servicios como tags
   - Seccion "Certificaciones" con iconos de cursos
   - Boton flotante WhatsApp/Telefono
   - Breadcrumbs: Inicio > Directorio > [Provincia] > [Ciudad] > [Negocio]

4. **`/directorio/unete`** - Formulario "Unete al Directorio"
   - Formulario publico similar al de contacto actual
   - Campos: nombre comercial, titular, email, telefono, ciudad, provincia, servicios, experiencia, si ha hecho curso, mensaje
   - Guarda en `directory_applications`
   - Modal de exito

### Nuevos componentes

```text
src/components/directory/
  DirectoryHero.tsx        - Hero con buscador
  DirectoryFilters.tsx     - Filtros de servicios y nivel
  DirectoryGrid.tsx        - Grid de tarjetas
  DetailerCard.tsx         - Tarjeta individual
  DetailerProfile.tsx      - Ficha completa
  DetailerMap.tsx          - Mapa Leaflet/OSM
  BeforeAfterSlider.tsx    - Slider comparativo
  DetailerBadge.tsx        - Badge Member/Certified/Master
  DirectoryJoinForm.tsx    - Formulario de solicitud
  DirectoryCityIntro.tsx   - Texto SEO por ciudad
```

### Navegacion

- Anadir "Directorio" al Navbar, en la seccion principal de links (entre "Blog" e "Inscribirse")

---

## Fase 3: SEO Tecnico

### Schema.org JSON-LD

- **Ficha detailer**: Schema `AutoBodyShop` con nombre, direccion, geo, telefono, imagen, servicios
- **Todas las paginas del directorio**: Schema `BreadcrumbList`
- **Paginas de ciudad**: Schema `ItemList` con los detailers listados

### Metadatos

- Cada pagina con `<title>` y `<meta description>` unicos
- Canonical autorreferencial
- Meta robots: index, follow

### Sitemap

- Actualizar el sitemap para incluir rutas del directorio (paginas de ciudades y fichas)

---

## Fase 4: Diseno UI

### Tarjetas de detailer (DetailerCard)

- Fondo `bg-card` con borde `border-white/10`
- Imagen destacada grande (aspect-[16/9])
- Badge de nivel:
  - **Master**: Gradiente dorado (`gradient-gold`), icono estrella
  - **Certified**: Borde plateado, icono shield
  - **Member**: Borde blanco/10, icono basico
- Servicios como chips/tags pequenos
- Ciudad y provincia en texto muted

### Ficha del detailer

- Imagen hero full-width con overlay gradiente
- Tarjeta de informacion glassmorphism sobre la imagen
- Mapa en un contenedor con bordes redondeados
- Slider antes/despues con handle draggable
- CTA flotante sticky (WhatsApp) en la parte inferior de la pantalla en movil

### Colores y tipografia

- Mantener la paleta existente: fondo carbon (#1a1a1f), acento granate (#8B2332), dorado para badges premium
- Fuentes: Bebas Neue para titulos, Open Sans para cuerpo

---

## Dependencia nueva

- `leaflet` y `react-leaflet` para los mapas OpenStreetMap

---

## Detalles tecnicos: Migracion SQL

```sql
-- Enum-like constraint via check
CREATE TABLE public.detailer_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  business_name text NOT NULL,
  slug text UNIQUE NOT NULL,
  owner_name text NOT NULL,
  email text NOT NULL,
  phone text,
  city text NOT NULL,
  province text NOT NULL,
  zip_code text,
  address text,
  latitude double precision,
  longitude double precision,
  services text[] DEFAULT '{}',
  level_badge text NOT NULL DEFAULT 'member'
    CHECK (level_badge IN ('member', 'certified', 'master')),
  is_verified boolean DEFAULT false,
  is_published boolean DEFAULT false,
  whatsapp_number text,
  website_url text,
  instagram_handle text,
  description text,
  featured_image_url text
);

ALTER TABLE public.detailer_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published detailer profiles"
  ON public.detailer_profiles FOR SELECT
  USING (is_published = true);

CREATE TABLE public.portfolio_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  detailer_id uuid REFERENCES public.detailer_profiles(id)
    ON DELETE CASCADE NOT NULL,
  before_image_url text,
  after_image_url text,
  title text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.portfolio_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view portfolio images"
  ON public.portfolio_images FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.detailer_profiles
      WHERE id = detailer_id AND is_published = true
    )
  );

CREATE TABLE public.directory_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  business_name text NOT NULL,
  owner_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  city text NOT NULL,
  province text NOT NULL,
  services text[] DEFAULT '{}',
  experience_level text,
  has_taken_course boolean DEFAULT false,
  course_name text,
  message text,
  status text NOT NULL DEFAULT 'pending'
);

ALTER TABLE public.directory_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can apply to directory"
  ON public.directory_applications FOR INSERT
  WITH CHECK (true);

-- Storage bucket for portfolio images
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio', 'portfolio', true);

CREATE POLICY "Public can read portfolio files"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'portfolio');
```

## Orden de implementacion

1. Migracion SQL (tablas + storage bucket)
2. Instalar dependencias (leaflet, react-leaflet)
3. Crear componentes del directorio
4. Crear paginas (directorio, ciudad, ficha, formulario)
5. Actualizar App.tsx con nuevas rutas
6. Actualizar Navbar con enlace al directorio
7. SEO: schemas, metadatos, sitemap

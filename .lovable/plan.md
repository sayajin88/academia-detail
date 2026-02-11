

# Plan: Diferenciar Detailers vs Centros + Mejorar Ficha de Perfil

## Resumen

Dos cambios principales:
1. Nuevo campo `profile_type` ("detailer" o "centro") en la base de datos, reflejado en tarjetas, filtros y formulario.
2. Rediseno completo de la pagina de perfil (DetailerPage) con foto del profesional, habilidades, anos de experiencia, especialidad y rango.

Los rangos cambian de `member/certified/master` a `certified_pro/master_detailer/elite_detailer`.

---

## 1. Base de Datos - Migracion

### Nuevos campos en `detailer_profiles`

| Campo | Tipo | Default | Descripcion |
|---|---|---|---|
| profile_type | text | 'detailer' | 'detailer' o 'centro' |
| owner_photo_url | text | null | Foto del profesional/dueno |
| skills | text[] | '{}' | Array: Correccion de pintura, Ceramico, PPF, etc. |
| years_experience | integer | null | Anos de experiencia |
| specialty | text | null | Especialidad principal |

### Actualizar constraint de `level_badge`

Cambiar los valores permitidos de `member/certified/master` a `certified_pro/master_detailer/elite_detailer`:

```sql
ALTER TABLE detailer_profiles DROP CONSTRAINT IF EXISTS detailer_profiles_level_badge_check;
ALTER TABLE detailer_profiles ADD CONSTRAINT detailer_profiles_level_badge_check
  CHECK (level_badge IN ('certified_pro', 'master_detailer', 'elite_detailer'));
```

Actualizar los datos existentes (5 registros de prueba):
- `master` -> `elite_detailer`
- `certified` -> `master_detailer`
- `member` -> `certified_pro`

### Nuevo campo en `directory_applications`

| Campo | Tipo | Default |
|---|---|---|
| profile_type | text | 'detailer' |

---

## 2. Componentes - Cambios

### 2.1 DetailerBadge.tsx (actualizar rangos)

Reemplazar las 3 categorias:

| Rango | Label | Icono | Estilo |
|---|---|---|---|
| elite_detailer | Elite Detailer | Crown (lucide) | Gradiente dorado con glow, efecto premium |
| master_detailer | Master Detailer | Star | Gradiente plateado oscuro con brillo metalico |
| certified_pro | Certificado Pro | Shield | Fondo primario solido con borde |

### 2.2 DetailerCard.tsx (diferenciar tipo)

- Anadir un chip visual debajo del badge que diga "Detailer" o "Centro" con iconos diferentes (User vs Building2)
- Actualizar la interface `DetailerProfile` con los nuevos campos

### 2.3 DirectoryFilters.tsx (nuevo filtro de tipo)

- Anadir una fila de filtro con 3 botones: "Todos", "Detailers", "Centros"
- Actualizar los labels de nivel: Elite Detailer, Master Detailer, Certificado Pro

### 2.4 DirectoryHero.tsx

- Actualizar el titulo: "Encuentra tu Detailer o Centro Certificado"

### 2.5 DirectoryJoinForm.tsx (selector de tipo)

- Anadir campo `profile_type` al inicio del formulario como selector visual (dos tarjetas clickables: "Soy Detailer" / "Soy Centro")
- Anadir campos nuevos: anos de experiencia, especialidad

### 2.6 DirectoryGrid.tsx

- Sin cambios estructurales, ya recibe el array filtrado

---

## 3. Pagina de Perfil (DetailerPage.tsx) - Rediseno completo

La ficha actual es basica. El nuevo diseno tendra las siguientes secciones:

### Seccion 1: Hero con foto del profesional

- Imagen de fondo del negocio (featured_image_url) con overlay oscuro
- Sobre el hero: tarjeta glassmorphism con:
  - Foto circular del profesional (owner_photo_url) con borde dorado/plateado segun rango
  - Nombre del profesional (owner_name)
  - Nombre comercial (business_name)
  - Badge de rango grande
  - Chip de tipo (Detailer / Centro)
  - Ubicacion

### Seccion 2: Panel de estadisticas rapidas

Fila horizontal con 3-4 cajas:
- Anos de experiencia (con icono Calendar)
- Especialidad (con icono Target)
- Rango Academia Detail (con icono Award)
- Verificado / No verificado (con icono CheckCircle)

### Seccion 3: Sobre mi / Descripcion

- Texto libre del profesional

### Seccion 4: Habilidades

- Grid de skills como tarjetas/chips visuales con iconos
- Cada habilidad con un icono representativo (Paintbrush, Shield, Sparkles, etc.)

### Seccion 5: Servicios

- Tags similares a los actuales pero mas grandes y visuales

### Seccion 6: Portfolio (antes/despues)

- Sliders como estan ahora

### Seccion 7: Mapa

- OpenStreetMap como esta ahora

### Seccion 8: Contacto

- Botones WhatsApp, telefono, web, Instagram (como estan)
- CTA flotante movil WhatsApp (como esta)

---

## 4. Paginas de directorio (Directory.tsx)

- Anadir filtro de tipo (detailer/centro) al estado y pasarlo a DirectoryFilters
- Filtrar por `profile_type` en el useMemo

---

## 5. SEO

- Actualizar JSON-LD en DetailerPage con los nuevos campos
- Actualizar meta description para incluir tipo y rango

---

## Archivos a modificar

| Archivo | Cambios |
|---|---|
| Migracion SQL | Nuevos campos, actualizar constraint, migrar datos |
| `src/components/directory/DetailerCard.tsx` | Actualizar interface, chip de tipo |
| `src/components/directory/DetailerBadge.tsx` | Nuevos rangos con nuevos estilos |
| `src/components/directory/DirectoryHero.tsx` | Titulo actualizado |
| `src/components/directory/DirectoryFilters.tsx` | Filtro de tipo, nuevos labels de nivel |
| `src/components/directory/DirectoryJoinForm.tsx` | Selector de tipo, nuevos campos |
| `src/pages/DetailerPage.tsx` | Rediseno completo con secciones nuevas |
| `src/pages/Directory.tsx` | Estado y filtro de tipo |
| `src/pages/DirectoryCity.tsx` | Filtro de tipo |
| `src/pages/DirectoryJoin.tsx` | Actualizar textos |

---

## Detalles tecnicos: SQL de migracion

```sql
-- Nuevos campos
ALTER TABLE public.detailer_profiles
  ADD COLUMN IF NOT EXISTS profile_type text NOT NULL DEFAULT 'detailer',
  ADD COLUMN IF NOT EXISTS owner_photo_url text,
  ADD COLUMN IF NOT EXISTS skills text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS years_experience integer,
  ADD COLUMN IF NOT EXISTS specialty text;

-- Actualizar level_badge existentes
UPDATE public.detailer_profiles SET level_badge = 'elite_detailer' WHERE level_badge = 'master';
UPDATE public.detailer_profiles SET level_badge = 'master_detailer' WHERE level_badge = 'certified';
UPDATE public.detailer_profiles SET level_badge = 'certified_pro' WHERE level_badge = 'member';

-- Actualizar constraint
ALTER TABLE public.detailer_profiles DROP CONSTRAINT IF EXISTS detailer_profiles_level_badge_check;
ALTER TABLE public.detailer_profiles ADD CONSTRAINT detailer_profiles_level_badge_check
  CHECK (level_badge IN ('certified_pro', 'master_detailer', 'elite_detailer'));

-- Nuevo campo en applications
ALTER TABLE public.directory_applications
  ADD COLUMN IF NOT EXISTS profile_type text NOT NULL DEFAULT 'detailer';
```


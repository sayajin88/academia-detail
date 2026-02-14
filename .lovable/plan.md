

## Mejora completa del formulario de inscripcion al directorio

### Problema actual

El formulario actual tiene 4 pasos pero le faltan campos importantes que si existen en los perfiles del directorio (`detailer_profiles`). Ademas, no permite subir foto de perfil del detailer (solo logo del negocio).

### Campos que faltan en el formulario (si existen en perfiles)

| Campo | En perfil | En formulario |
|---|---|---|
| Foto de perfil (owner_photo_url) | Si | No |
| Descripcion / bio | Si | No |
| Web del negocio | Si | No |
| WhatsApp | Si | No |
| Instagram (separado) | Si | No |
| Anos de experiencia | Si | No |
| Especialidad principal | Si | No |
| Habilidades tecnicas (skills) | Si | No |
| Direccion / CP | Si | No |

### Solucion propuesta

**1. Migracion de base de datos** - Anadir columnas nuevas a `directory_applications`:

```text
owner_photo_url  TEXT
description      TEXT
website_url      TEXT
whatsapp_number  TEXT
instagram_handle TEXT
years_experience INTEGER
specialty        TEXT
skills           TEXT[]
address          TEXT
zip_code         TEXT
```

**2. Reestructurar el formulario en 5 pasos optimizados:**

- **Paso 1 - Identidad**: Tipo (detailer/centro), nombre comercial, titular, email, telefono, WhatsApp
- **Paso 2 - Ubicacion y fotos**: Ciudad, provincia, direccion, CP, foto de perfil, logo del negocio
- **Paso 3 - Especializacion**: Servicios, marcas, anos de experiencia, especialidad principal, habilidades tecnicas
- **Paso 4 - Confianza y presencia**: Curso Academia Detail, seguro RC, web, Instagram, descripcion/bio
- **Paso 5 - Galeria y envio**: Hasta 5 fotos del taller/trabajos, politica privacidad, enviar

**3. Mejoras de UX:**

- Foto de perfil circular con preview en tiempo real (paso 2)
- Galeria ampliada de 3 a 5 fotos
- Selector de especialidad principal con opciones predefinidas (Detailing, PPF, Wrapping, Restauracion, Multiservicios)
- Campo de habilidades con chips seleccionables
- Selector de anos de experiencia (1-3, 3-5, 5-10, +10)
- Live Preview actualizado con foto de perfil y mas datos
- Todos los campos nuevos son opcionales para no frenar la conversion

**4. Archivos a modificar:**

- `supabase/migrations/` - Nueva migracion para columnas en `directory_applications`
- `src/components/directory/DirectoryJoinForm.tsx` - Refactor completo del formulario con 5 pasos y todos los campos nuevos

### Detalle tecnico

**Migracion SQL:**

```text
ALTER TABLE directory_applications
  ADD COLUMN IF NOT EXISTS owner_photo_url TEXT,
  ADD COLUMN IF NOT EXISTS description TEXT,
  ADD COLUMN IF NOT EXISTS website_url TEXT,
  ADD COLUMN IF NOT EXISTS whatsapp_number TEXT,
  ADD COLUMN IF NOT EXISTS instagram_handle TEXT,
  ADD COLUMN IF NOT EXISTS years_experience INTEGER,
  ADD COLUMN IF NOT EXISTS specialty TEXT,
  ADD COLUMN IF NOT EXISTS skills TEXT[],
  ADD COLUMN IF NOT EXISTS address TEXT,
  ADD COLUMN IF NOT EXISTS zip_code TEXT;
```

**Formulario** - Se mantiene la arquitectura actual (react-hook-form + zod + pasos) pero se reorganizan los campos en 5 pasos con mejor distribucion. La foto de perfil usa el mismo patron de upload al bucket `directory-uploads` que ya usa el logo. El Live Preview lateral se enriquece con la foto de perfil, especialidad y anos de experiencia.


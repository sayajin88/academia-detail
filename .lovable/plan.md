

## Panel de Admin unificado para el Directorio

### Situacion actual

Existen dos pantallas separadas en el admin:
- `/admin/applications` - Muestra solicitudes pendientes/aprobadas/rechazadas de `directory_applications`
- `/admin/profiles` - Muestra perfiles activos de `detailer_profiles` con mapa y editor

Esto causa duplicidad: dos formas distintas de editar la informacion de un mismo profesional, con campos diferentes en cada una.

### Solucion

Unificar todo en una unica pantalla `/admin/profiles` que muestre:

1. **Tabs de filtro**: Todos | Pendientes | Activos | Rechazados
2. **Tabla unificada** que combina datos de `directory_applications` (pendientes/rechazados) y `detailer_profiles` (activos/publicados)
3. **Modal de edicion completo** con TODOS los campos del formulario de inscripcion, organizado en secciones
4. **Acciones contextuales**: Aprobar/Rechazar para pendientes, Editar/Eliminar para activos

### Cambios por archivo

**1. `src/pages/AdminProfiles.tsx`** - Reescritura completa

La pagina unificada:
- Carga datos de ambas tablas (`directory_applications` + `detailer_profiles`)
- Los normaliza en un tipo unificado con campo `source` (application/profile) y `status` (pending/approved/rejected/draft)
- Muestra contadores por estado (como ya hace AdminApplications)
- Tabla con columnas: Negocio, Tipo, Ubicacion, Estado, Fecha, Acciones
- Mapa opcional (toggle) mostrando solo perfiles con coordenadas
- Boton "Añadir perfil" manual (como ahora)

**2. `src/components/admin/AdminProfileEditModal.tsx`** - Nuevo componente

Modal de edicion completo con todas las secciones del formulario de inscripcion:

- **Seccion Identidad**: Tipo perfil, nombre negocio, propietario, email, telefono, WhatsApp
- **Seccion Ubicacion**: Ciudad, provincia, direccion, CP, coordenadas (lat/lon)
- **Seccion Media**: Foto de perfil (upload circular), logo/imagen destacada, galeria (hasta 5 fotos)
- **Seccion Especializacion**: Servicios (chips), marcas (chips), especialidad, habilidades tecnicas, anos experiencia
- **Seccion Confianza**: Alumno academia, nombre curso, seguro RC, web, Instagram, portfolio URL
- **Seccion Textos**: Descripcion/bio, propuesta de valor, mensaje
- **Seccion Admin** (solo visible para perfiles activos): Rango, publicado/borrador, verificado

Acciones del footer segun estado:
- Pendiente: Aprobar | Rechazar (con campo de motivo) | Guardar edicion
- Activo: Guardar cambios | Eliminar
- Rechazado: Re-aprobar | Guardar edicion

**3. `src/pages/AdminApplications.tsx`** - Eliminar

Ya no se necesita, toda la logica vive en AdminProfiles.

**4. `src/components/admin/ApplicationDetailModal.tsx`** - Eliminar

Reemplazado por AdminProfileEditModal.

**5. `src/components/admin/AdminLayout.tsx`** - Simplificar navegacion

Quitar el enlace "Solicitudes", dejar solo "Directorio" apuntando a `/admin/profiles`.

**6. `src/App.tsx`** - Limpiar rutas

- Eliminar la ruta `/admin/applications`
- Añadir redirect de `/admin/applications` a `/admin/profiles` por si alguien tiene la URL guardada

**7. `supabase/functions/approve-application/index.ts`** - Actualizar

Cuando se aprueba, copiar TODOS los campos nuevos (owner_photo_url, description, website_url, whatsapp_number, instagram_handle, years_experience, specialty, skills, address, zip_code, gallery_urls) de la solicitud al perfil creado.

### Tipo unificado para la tabla

```text
UnifiedEntry {
  id: string
  source: 'application' | 'profile'
  status: 'pending' | 'approved' | 'rejected' | 'draft'
  business_name, owner_name, email, phone, whatsapp_number
  city, province, address, zip_code
  profile_type, services, brands, skills
  specialty, years_experience, experience_level
  owner_photo_url, logo_url, featured_image_url, gallery_urls
  has_taken_course, course_name, has_insurance
  website_url, instagram_handle, portfolio_url
  description, value_proposition, message
  level_badge, is_published, is_verified
  latitude, longitude
  created_at
}
```

### Flujo de datos

- **Pendientes/Rechazados**: se leen de `directory_applications` (source=application)
- **Activos**: se leen de `detailer_profiles` (source=profile)
- Al editar un pendiente: se actualiza `directory_applications`
- Al editar un activo: se actualiza `detailer_profiles`
- Al aprobar: se llama a la edge function que crea el perfil con todos los campos
- Al crear manual: se inserta directamente en `detailer_profiles`


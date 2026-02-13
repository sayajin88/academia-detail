

# Plan: Panel de Administración para Gestionar Solicitudes del Directorio

## Resumen Ejecutivo

Sistema completo de administración con autenticación segura (email + contraseña) para revisar, aprobar y rechazar solicitudes del directorio. Cuando se aprueba una solicitud, se crea automáticamente un perfil publicado en la tabla `detailer_profiles`.

---

## 1. Backend - Base de Datos y Seguridad

### 1.1 Crear Sistema de Roles

**Tabla `user_roles`**: Almacena qué usuario es admin (nunca se guarda en el perfil).

```sql
-- Crear enum para roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Tabla de roles
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE(user_id, role)
);

-- Habilitar RLS en user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Política: Solo admins pueden ver la tabla de roles
CREATE POLICY "Only admins can view user_roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'::app_role));
```

### 1.2 Función `has_role()`

**Función SQL con SECURITY DEFINER** para evitar problemas recursivos con RLS:

```sql
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;
```

### 1.3 Actualizar RLS en `directory_applications`

Agregar una política para que solo admins puedan leer todas las solicitudes:

```sql
-- Los admins pueden ver todas las solicitudes
CREATE POLICY "Admins can view all applications"
  ON public.directory_applications FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Los admins pueden actualizar solicitudes (aprobar/rechazar)
CREATE POLICY "Admins can update applications"
  ON public.directory_applications FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'::app_role));
```

### 1.4 Tabla de Auditoría (Opcional)

Para registrar quién aprobó/rechazó y cuándo:

```sql
CREATE TABLE public.directory_application_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid REFERENCES directory_applications(id) ON DELETE CASCADE NOT NULL,
  admin_id uuid REFERENCES auth.users(id) NOT NULL,
  action text NOT NULL, -- 'approved', 'rejected', 'pending'
  reason text,
  created_at timestamp with time zone DEFAULT now()
);
```

---

## 2. Frontend - Estructura de Componentes

### 2.1 Nuevo Layout: `AdminLayout.tsx`

Layout específico para el panel admin con:
- Navbar minimalista
- Sidebar con navegación admin
- Protección de rutas (solo admins acceden)

### 2.2 Nueva Ruta en `App.tsx`

```
/admin/login - Página de login admin
/admin/applications - Panel de revisión de solicitudes (solo admin)
```

### 2.3 Página de Login: `src/pages/AdminLogin.tsx`

- Formulario email + contraseña
- Validación con Zod
- Persiste sesión en localStorage
- Redirige a `/admin/applications` si login exitoso

**Seguridad**: Usa `supabase.auth.signInWithPassword()` y verifica que el usuario sea admin consultando `user_roles` en el backend.

### 2.4 Página Admin: `src/pages/AdminApplications.tsx`

Panel de control completo:

**Secciones**:
1. **Filtros**: Por estado (Pendiente, Aprobado, Rechazado)
2. **Tabla de solicitudes** con columnas:
   - Nombre comercial
   - Tipo (Detailer/Centro)
   - Propietario
   - Fecha solicitud
   - Estado
   - Acciones (Ver detalles, Aprobar, Rechazar)

3. **Modal de detalles** (al hacer clic en una fila):
   - Información completa del formulario
   - Logo, galería, servicios, especialidades
   - Botones: Aprobar / Rechazar con textarea para motivo de rechazo

### 2.5 Componente `AdminApplicationCard.tsx`

Tarjeta con resumen de solicitud (para vista previa en modal).

### 2.6 Hook `useAdminAuth.ts`

- Verifica si usuario está autenticado
- Verifica si tiene rol admin
- Maneja logout
- Redirige a login si no es admin

---

## 3. Lógica de Aprobación

### 3.1 Edge Function: `approve-application`

**Path**: `supabase/functions/approve-application/index.ts`

Cuando admin aprueba:

```text
1. Validar que el usuario sea admin (verificar user_roles)
2. Leer datos de directory_applications
3. Crear registro en detailer_profiles con:
   - Copiar todos los campos del formulario
   - Asignar level_badge = 'certified_pro' (por defecto)
   - Asignar is_published = true
   - Generar slug único
4. Actualizar directory_applications.status = 'approved'
5. Insertar log en directory_application_logs
6. Retornar confirmación
```

**Seguridad**: Verificar rol admin en el edge function (no confiar solo en RLS).

### 3.2 Edge Function: `reject-application`

**Path**: `supabase/functions/reject-application/index.ts`

```text
1. Validar admin
2. Actualizar directory_applications.status = 'rejected'
3. Guardar motivo de rechazo
4. Insertar log
5. Retornar confirmación
```

---

## 4. Flujo de Seguridad

```
User clicks /admin/login
  ↓
Form: email + password
  ↓
supabase.auth.signInWithPassword()
  ↓
Check user_roles table: ¿tiene rol 'admin'?
  ↓
Si YES → Guarda sesión, redirige a /admin/applications
Si NO → Error "No tienes permisos"
  ↓
En /admin/applications:
  - useAdminAuth hook verifica session + role
  - Si no es admin, redirige a /admin/login
```

---

## 5. Configuración: `supabase/config.toml`

```toml
[functions.approve-application]
verify_jwt = false

[functions.reject-application]
verify_jwt = false
```

Las funciones validan el rol admin internamente.

---

## 6. Archivos a Crear/Modificar

| Archivo | Tipo | Descripción |
|---------|------|-------------|
| `supabase/migrations/...sql` | Crear | Tablas `user_roles`, `directory_application_logs`, funciones, RLS policies |
| `src/pages/AdminLogin.tsx` | Crear | Formulario login admin |
| `src/pages/AdminApplications.tsx` | Crear | Panel de control con tabla de solicitudes |
| `src/components/admin/AdminLayout.tsx` | Crear | Layout específico para admin |
| `src/components/admin/AdminApplicationCard.tsx` | Crear | Tarjeta con detalles de solicitud |
| `src/hooks/useAdminAuth.ts` | Crear | Hook para proteger rutas admin |
| `supabase/functions/approve-application/index.ts` | Crear | Edge function para aprobar |
| `supabase/functions/reject-application/index.ts` | Crear | Edge function para rechazar |
| `src/App.tsx` | Modificar | Agregar rutas `/admin/login` y `/admin/applications` |

---

## 7. UX/UI Design

**Admin Login**:
- Diseño minimalista, marca Academia Detail
- Input email + password
- Botón "Acceder"
- Mensaje "Acceso restringido a administradores"

**Admin Panel**:
- Tabla con scroll horizontal en móvil
- Colores: Pendiente (amarillo), Aprobado (verde), Rechazado (rojo)
- Modal al hacer clic en solicitud
- Botones de acción grandes y accesibles
- Confirmación antes de aprobar/rechazar

---

## 8. Próximos Pasos Post-Plan

1. Crear usuario admin manualmente en Supabase Auth + asignar rol
2. Probar login
3. Probar flujo completo: aprobar solicitud → verificar que aparece en directorio
4. (Opcional) Dashboard con estadísticas: pendientes, aprobadas, rechazadas




## Nueva seccion de Admin: Contactos / Leads de Cursos

### Objetivo

Crear una nueva pagina `/admin/contacts` dentro del panel de administracion para visualizar y gestionar todos los mensajes recibidos desde los formularios de contacto (alumnos interesados en cursos).

### Datos disponibles

La tabla `contact_submissions` ya almacena toda la informacion necesaria:
- Nombre completo (nombre + apellidos)
- Email y telefono
- Experiencia previa en detailing
- Si tiene centro propio
- Rango de inversion
- Tipo de formacion que le interesa
- Mensaje opcional
- Fecha de envio

### Cambios por archivo

**1. `src/pages/AdminContacts.tsx`** - Nuevo

Pagina completa con:
- Contadores por tipo de formacion (Detailing, Wrapping, PPF, etc.)
- Filtro por tipo de formacion y buscador por nombre/email
- Tabla con columnas: Nombre, Email, Telefono, Formacion, Experiencia, Inversion, Fecha
- Al hacer clic en una fila se abre un modal/panel con todos los detalles del lead
- Boton directo para responder por email (mailto) o WhatsApp
- Badge de color por tipo de formacion (mismos colores que usa el edge function de email)

**2. `src/components/admin/AdminLayout.tsx`** - Actualizar

Anadir enlace "Contactos" en la navegacion, con icono `MessageSquare`.

**3. `src/App.tsx`** - Actualizar

Anadir ruta `/admin/contacts` con lazy loading.

### Necesidades de RLS

La tabla `contact_submissions` actualmente solo permite INSERT publico. Para que el admin pueda leerla, se necesita una nueva politica SELECT:

```text
CREATE POLICY "Admins can view contact submissions"
ON contact_submissions FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'));
```

### Funcionalidades de la pagina

- **Vista tabla**: Lista completa de leads ordenados por fecha (mas recientes primero)
- **Filtros**: Por tipo de formacion (tabs o dropdown) y busqueda libre
- **Modal de detalle**: Muestra toda la info del lead con formato legible, labels traducidos (los mismos mapeos que usa el edge function: "sin_experiencia" se muestra como "No, soy nuevo", etc.)
- **Acciones rapidas**: Responder por email, llamar, abrir WhatsApp
- **Indicadores**: Contadores por tipo de formacion para ver de un vistazo que cursos generan mas interes

### Detalle tecnico

- Se reutiliza `AdminLayout` para mantener consistencia visual
- Los labels de traduccion (experiencia, inversion, formacion) se extraen a constantes compartidas o se replican del edge function
- La tabla usa los mismos componentes UI (`Table`, `Badge`, `Card`) que AdminProfiles
- Lazy loading en App.tsx para no afectar el bundle principal


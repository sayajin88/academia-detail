

## Plan: Reducir la puntuacion de spam en los emails de leads

### Problema

El servidor de correo de `detailpark.com` rechaza los emails con el error SMTP `550 "Mensaje rechazado por ser spam"`. Esto se debe a varios factores del contenido del email que disparan los filtros antispam.

### Cambios a realizar

Se modificara unicamente el archivo `supabase/functions/send-contact-email/index.ts`:

#### 1. Eliminar emojis de los asuntos

| Elemento | Antes | Despues |
|----------|-------|---------|
| Asunto admin | `📬 Nuevo lead: Detailing - Juan Daniel` | `Nuevo lead: Detailing - Juan Daniel` |
| Asunto cliente | `✨ Hemos recibido tu mensaje - Detail Park Academy` | `Hemos recibido tu mensaje - Detail Park Academy` |

#### 2. Simplificar el HTML del email del admin

- Eliminar gradientes CSS (`linear-gradient`) y reemplazar por colores solidos
- Reducir la cantidad de estilos inline complejos
- Eliminar emojis decorativos del cuerpo del email (🔔, 📍, 📊, 📝, 📧)
- Mantener la estructura de informacion pero con un diseno mas limpio y plano

#### 3. Simplificar el HTML del email de confirmacion al cliente

- Mismos cambios: colores solidos en lugar de gradientes
- Eliminar emojis del cuerpo (✨, 📞, 📱)
- Mantener el contenido informativo intacto

### Seccion tecnica

**Archivo**: `supabase/functions/send-contact-email/index.ts`

**Lineas afectadas**:
- Linea 303: asunto del email admin (quitar emoji 📬)
- Linea 313: asunto del email cliente (quitar emoji ✨)
- Funcion `generateAdminEmail` (lineas ~90-180): simplificar HTML, quitar emojis y gradientes
- Funcion `generateClientEmail` (lineas ~185-245): simplificar HTML, quitar emojis y gradientes

**Cambios clave en el HTML**:
- `background: linear-gradient(135deg, #8B5CF6, #6D28D9)` se reemplaza por `background-color: #7C3AED`
- Emojis como 🔔 📍 📊 📝 📧 ✨ 📞 📱 se eliminan o reemplazan por texto plano
- Se mantiene la estructura de tablas HTML (compatible con clientes de correo)
- Se conserva toda la informacion del lead (datos de contacto, cualificacion, mensaje)

### Recomendacion adicional (accion del usuario)

Estos cambios reduciran significativamente la probabilidad de rechazo. Sin embargo, tambien es recomendable que en el panel de administracion de tu proveedor de correo de `detailpark.com`:
- Anadais `academiadetail.com` como remitente de confianza (whitelist)
- Reviseis la configuracion del filtro antispam para permitir emails transaccionales


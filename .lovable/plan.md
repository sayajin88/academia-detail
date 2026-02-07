

# Mejoras en la pagina de Contacto

## Resumen de cambios

Se van a actualizar 5 componentes de la pagina de contacto para reflejar la informacion correcta, mejorar el modal de exito y cambiar la imagen del hero.

---

## 1. ContactInfo.tsx - Email y seccion de ubicacion

**Cambios en la informacion de contacto:**
- Cambiar el email de `info@detailpark.es` a `info@academiadetail.com`

**Cambios en la seccion "Nuestra ubicacion":**
- Actualizar el texto descriptivo para indicar que la academia esta dentro de las instalaciones de Detail Park
- Anadir un enlace visible a `www.detailpark.com`
- Incluir el logo de Detail Park (`detail-park-logo-white.png`) junto al enlace, dentro de una tarjeta/banner que destaque la relacion con Detail Park

---

## 2. ContactSchedule.tsx - Horario y tiempo de respuesta

**Cambios en el horario:**
- Lunes - Viernes: `07:00 - 17:30`
- Sabados - Domingos: `Cerrado`
- Eliminar la fila de "Sabados: Previa cita" y "Domingos: Cerrado" y dejarlas en una sola linea "Sabados y Domingos: Cerrado"

**Cambios en el tiempo de respuesta:**
- Cambiar de "menos de 24 horas" a "un plazo de 48 horas"

**Cambios en redes sociales:**
- Actualizar enlace de Instagram a `https://www.instagram.com/detailparkoficial/` (coherente con el footer)
- Anadir segundo enlace de Instagram para `@danidetailoficial`

---

## 3. ContactSuccessModal.tsx - Rediseno completo del modal de exito

**Rediseno visual impactante:**
- Icono de exito mas grande con animacion de entrada (scale + fade)
- Fondo con gradiente decorativo y efecto de confeti/particulas visual
- Titulo mas grande y llamativo: "Solicitud Enviada con Exito"
- Mensaje claro: "En las proximas 48 horas nos pondremos en contacto contigo"

**Contenido del modal:**
- Boton de WhatsApp prominente con enlace a `https://wa.me/34622773555` para contacto directo
- Seccion de redes sociales con enlaces a `@detailparkoficial` y `@danidetailoficial`
- Enlace a `www.detailpark.com` para visitar la pagina de Detail Park
- Eliminar el enlace de email `info@detailpark.es` del modal (se reemplaza con los nuevos elementos)
- Boton de cerrar al final

---

## 4. ContactHero.tsx - Cambio de imagen de fondo

- Cambiar la imagen de `hero-contacto.jpg` a una de las fotos de formacion/eventos disponibles (por ejemplo `evento-grupo-formacion.jpg` o `formacion-detailing-1.jpg`, que muestran el ambiente de la academia)

---

## 5. ContactForm.tsx - Actualizacion de textos

- Cambiar "te contactaremos en menos de 24 horas" a "te contactaremos en un plazo de 48 horas" en la descripcion del formulario

---

## 6. Verificacion mobile

Todos los cambios se implementaran con clases responsive de Tailwind:
- El modal de exito usara `sm:max-w-lg` y botones apilados en movil
- Los botones de redes sociales tendran tamano minimo de toque de 48px
- La tarjeta de Detail Park en la ubicacion se adaptara a pantallas pequenas
- Los textos del modal usaran tamano responsive

---

## Seccion tecnica

### Archivos a modificar

| Archivo | Cambios principales |
|---------|-------------------|
| `src/components/contact/ContactInfo.tsx` | Email a `info@academiadetail.com`, seccion Detail Park con logo y enlace |
| `src/components/contact/ContactSchedule.tsx` | Horario 07:00-17:30, sabados/domingos cerrado, respuesta 48h, redes actualizadas |
| `src/components/contact/ContactSuccessModal.tsx` | Rediseno completo: mas impactante, WhatsApp, redes sociales, enlace detailpark.com |
| `src/components/contact/ContactHero.tsx` | Cambiar imagen de fondo a foto de formacion/evento |
| `src/components/contact/ContactForm.tsx` | Texto "48 horas" en descripcion del formulario |

### Assets utilizados
- `src/assets/detail-park-logo-white.png` - Logo de Detail Park para la seccion de ubicacion
- `src/assets/evento-grupo-formacion.jpg` (o similar) - Nueva imagen para el hero

### Sin cambios en backend
No se requieren cambios en las Edge Functions ni en la base de datos. Solo cambios de interfaz.


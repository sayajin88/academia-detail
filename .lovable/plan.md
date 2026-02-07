

# Logo de Detail Park y seccion Jornada Zero en todas las paginas

## Resumen

Dos grandes cambios:
1. Hacer visible la relacion "Potenciada por Detail Park" en el layout global (Navbar/Footer) para que aparezca en todas las paginas
2. Eliminar el acceso directo a Jornada Zero del Hero de Home y del Navbar, y crear una seccion dedicada reutilizable que se incluya en todas las paginas excepto Contacto

---

## 1. Logo y marca Detail Park en el layout global

### 1a. Navbar - Anadir tagline "Potenciada por Detail Park"
**Archivo**: `src/components/layout/Navbar.tsx`

El logo de Detail Park ya se usa en el Navbar, pero no queda claro que Detail Park es el patrocinador. Se anadira un pequeno subtitulo debajo del logo:
- Bajo el logo, mostrar texto "Potenciada por Detail Park" con enlace a `www.detailpark.com`
- En desktop: visible como texto pequeno debajo del logo
- En movil: visible en el header del menu lateral (ya muestra el logo)
- El enlace abrira detailpark.com en nueva pestana

### 1b. Footer - Clarificar la relacion Detail Park
**Archivo**: `src/components/layout/Footer.tsx`

- Actualizar la descripcion del brand para mencionar explicitamente "Potenciada por Detail Park"
- Anadir un enlace visible a `www.detailpark.com` junto al logo
- Actualizar el email de contacto de `info@detailpark.es` a `info@academiadetail.com` (coherente con los cambios de la pagina de contacto)

---

## 2. Eliminar acceso directo a Jornada Zero del Hero y Navbar

### 2a. HomeHero - Cambiar el CTA principal
**Archivo**: `src/components/home/HomeHero.tsx`

- Eliminar el boton "Probar por 97 EUR + IVA (Jornada Zero)" como CTA principal
- Reemplazar con un CTA mas generico que dirija a las formaciones, como "Ver Formaciones" o "Solicitar Informacion" (enlace a contacto)
- Mantener el boton secundario "Ver Formaciones" que hace scroll

El Hero se enfocara en la propuesta de valor general de la academia, no en un producto especifico.

### 2b. Navbar - Eliminar boton "Jornada Zero"
**Archivo**: `src/components/layout/Navbar.tsx`

- En desktop: eliminar el boton "Jornada Zero" del area de CTAs (lineas 259-277), mantener solo el boton de WhatsApp
- En movil: eliminar el boton "Jornada Zero" del CTA inferior del menu (lineas 439-447), mantener solo WhatsApp

### 2c. HomeCTA - Actualizar enlace
**Archivo**: `src/components/home/HomeCTA.tsx`

- Cambiar el enlace del boton "Reserva tu Plaza Ahora" de `/jornada-cero` a `/contacto`
- Actualizar el email de `info@detailpark.es` a `info@academiadetail.com`
- Actualizar el texto de respuesta de "menos de 24 horas" a "un plazo de 48 horas"

---

## 3. Nueva seccion reutilizable: Jornada Zero

### 3a. Crear nuevo componente
**Archivo nuevo**: `src/components/shared/JornadaZeroSection.tsx`

Componente reutilizable con un diseno visual atractivo que explique:

**Contenido:**
- Badge: "Nuevo en el Detailing?" o "Tu Primera Experiencia"
- Titulo: "Jornada Zero: Prueba el Detailing por Solo 97 EUR + IVA"
- Descripcion: Explicar que es un dia intensivo para personas que quieren probar antes de comprometerse con una formacion completa. Ideal para principiantes y curiosos.
- 3 puntos clave en iconos: "1 Dia Intensivo", "Sin Compromiso", "Taller 100% Real"
- Una imagen de formacion/evento (usando `evento-practica-pulidora-real.jpg` o similar)
- CTA prominente: "Reservar Mi Jornada Zero" que enlace a `/curso-detailing-iniciacion`
- Nota: "Si despues quieres continuar, el importe se descuenta de cualquier curso completo"

**Diseno visual:**
- Layout de dos columnas en desktop: imagen a un lado, contenido al otro
- En movil: imagen arriba, contenido debajo (apilado)
- Fondo con gradiente sutil, borde con acento de color
- Imagen con bordes redondeados y sombra
- CTA con variante "hero" y efecto hover
- Responsive con tamano de toque minimo de 48px

### 3b. Incluir la seccion en las paginas

| Pagina | Archivo | Posicion |
|--------|---------|----------|
| Home | `src/pages/Home.tsx` | Antes de HomeFAQ (penultima seccion) |
| Curso Detailing | `src/pages/FormationDetail.tsx` | Antes de FormationCTA (final) |
| Carrera Detailing | `src/pages/CarreraDetailing.tsx` | Antes de CarreraFAQ (final) |
| Quienes Somos | `src/pages/AboutUs.tsx` | Antes del CTA final |
| Contacto | NO se incluye | - |
| Jornada Zero | NO se incluye (es su propia pagina) | - |

---

## Seccion tecnica

### Archivos a modificar

| Archivo | Cambios |
|---------|---------|
| `src/components/layout/Navbar.tsx` | Anadir tagline "Potenciada por Detail Park" bajo logo + eliminar boton Jornada Zero (desktop y movil) |
| `src/components/layout/Footer.tsx` | Anadir enlace detailpark.com, actualizar email a info@academiadetail.com, mencionar patrocinio |
| `src/components/home/HomeHero.tsx` | Reemplazar CTA de Jornada Zero por "Solicitar Informacion" (enlace a /contacto) |
| `src/components/home/HomeCTA.tsx` | Cambiar enlace /jornada-cero a /contacto, email y texto 48h |
| `src/pages/Home.tsx` | Importar y anadir JornadaZeroSection con lazy loading |
| `src/pages/FormationDetail.tsx` | Importar y anadir JornadaZeroSection antes del CTA final |
| `src/pages/CarreraDetailing.tsx` | Importar y anadir JornadaZeroSection antes de CarreraFAQ |
| `src/pages/AboutUs.tsx` | Importar y anadir JornadaZeroSection antes del CTA final |

### Archivo nuevo

| Archivo | Descripcion |
|---------|-------------|
| `src/components/shared/JornadaZeroSection.tsx` | Componente reutilizable con imagen, descripcion y CTA de Jornada Zero |

### Assets utilizados
- `src/assets/detail-park-logo-white.png` - Logo existente en Navbar y Footer
- `src/assets/evento-practica-pulidora-real.jpg` - Imagen para la seccion Jornada Zero (o similar de las disponibles)

### Sin cambios en backend
No se requieren cambios en Edge Functions, base de datos ni migraciones.


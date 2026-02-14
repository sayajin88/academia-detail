

## Plan: Banner CTA "Únete al Directorio" de alto impacto

### Objetivo
Reemplazar el botón discreto "Únete al directorio" en `/directorio` por un banner visual de alto CTR, y anadir una seccion similar en la Home.

---

### 1. Nuevo componente: `DirectoryJoinBanner`

Se creara un componente reutilizable `src/components/directory/DirectoryJoinBanner.tsx` con:

- **Fondo**: Gradiente granate (primary) con patron decorativo sutil (mismo estilo que `HomeCTA` y `BlogCTABanner`)
- **Layout**: Dos columnas en desktop (texto + CTA a la derecha), una columna en movil
- **Contenido**:
  - Badge: "Directorio Profesional"
  - Titulo: "Aparece en el Directorio y Llega a Nuevos Clientes"
  - Subtitulo: breve propuesta de valor (visibilidad, confianza, gratis)
  - Trust badges: "Solicitud gratuita", "Revision en 48h", "Ficha profesional verificada"
  - Boton principal blanco con enlace a `/directorio/unete`
- **Estilo visual**: Siguiendo la estetica de `BlogCTABanner` y `HomeCTA` (glassmorphism, circulos decorativos, tipografia Bebas Neue para el titulo)

### 2. Cambios en `/directorio` (Directory.tsx)

- **Eliminar** el boton `<Link to="/directorio/unete">` actual (lineas 183-188)
- **Insertar** el nuevo `<DirectoryJoinBanner />` al final de la seccion, despues del grid/mapa de perfiles (antes del cierre de `</section>`)
- Se mantiene toda la logica existente de filtros, mapa y grid intacta

### 3. Cambios en Home (Home.tsx)

- **Importar** `DirectoryJoinBanner` con lazy loading (mismo patron que el resto de secciones below-the-fold)
- **Insertar** la seccion entre `GalleryPreview` y `TestimonialsSection`, ya que encaja tematicamente despues de mostrar trabajos y antes de la prueba social
- Envuelto en `<Suspense fallback={<SectionSkeleton />}>`

---

### Detalles tecnicos

**Archivo nuevo:**
- `src/components/directory/DirectoryJoinBanner.tsx`

**Archivos modificados:**
- `src/pages/Directory.tsx` — eliminar boton, anadir banner
- `src/pages/Home.tsx` — anadir lazy import y seccion

**Sin cambios en base de datos ni edge functions.**


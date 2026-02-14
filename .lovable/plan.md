

## Rediseno completo de la ficha DetailerPage

### Problema actual

La ficha tiene una estructura plana y poco visual: todo se apila verticalmente sin jerarquia clara, los badges de rango no destacan, el WhatsApp no tiene prominencia suficiente, y las imagenes del portfolio solo se muestran como sliders antes/despues sin galeria general.

### Cambios planificados

---

#### 1. `src/components/directory/DetailerBadge.tsx` - Animaciones premium

- Anadir animacion CSS `shimmer-gold` al badge Elite Detailer (efecto de brillo dorado que recorre el badge)
- Anadir animacion `shimmer-silver` al badge Master Detailer (efecto plateado similar)
- El badge Certified Pro mantiene su estilo actual sin animacion

#### 2. `src/index.css` - Nuevos keyframes

Anadir dos keyframes:
- `@keyframes shimmer-gold`: efecto de brillo dorado que recorre el badge de izquierda a derecha con gradiente translucido
- `@keyframes shimmer-silver`: mismo efecto pero con tono plateado

#### 3. `src/pages/DetailerPage.tsx` - Reestructuracion completa

**Layout general**: Pasar de una sola columna a un layout de 2 columnas en desktop (sidebar + contenido principal).

**Columna izquierda (sidebar sticky)**:
- Foto del profesional con borde animado dorado/plateado segun rango
- Nombre y tipo (Detailer/Centro)
- Badge de rango con animacion
- Boton WhatsApp prominente (verde, ancho completo, siempre visible)
- Botones secundarios: Llamar, Web
- Enlace de Instagram con icono visual (no boton outline generico)
- Estadisticas compactas (experiencia, especialidad, verificado)

**Columna derecha (contenido)**:
- H1 con nombre del negocio + ubicacion
- Seccion "Sobre mi/el centro" con descripcion
- Servicios como chips visuales
- Habilidades con iconos
- Mapa de ubicacion
- Galeria de portfolio (antes/despues)

**Seccion hero mejorada**:
- Mantener la imagen de portada actual pero con overlay mas elegante
- Breadcrumbs sobre el hero con mejor contraste

**Galeria de imagenes**:
- Si `portfolio_images` tiene entradas donde solo hay `after_image_url` (sin before), mostrarlas como galeria de fotos normal
- Los pares antes/despues siguen usando el slider
- Layout tipo masonry o grid 2x2 para las fotos sueltas

**CTA flotante movil mejorado**:
- Mantener el boton WhatsApp flotante pero con efecto pulse sutil

**SEO adicional**:
- Anadir schema `makesOffer` con los servicios del detailer
- Anadir `sameAs` con enlace a Instagram y web si existen
- Meta keywords con ciudad + servicios para reforzar geolocalizacion
- Open Graph image con la featured_image_url

#### 4. Mejoras visuales adicionales

- **Foto de perfil con anillo animado**: Para Elite, un anillo dorado con gradiente que rota suavemente alrededor de la foto. Para Master, un anillo plateado.
- **Seccion de servicios mejorada**: Iconos asociados a cada tipo de servicio conocido (Pulido, Ceramico, PPF, Wrapping, Interior, Motores, Restauracion)
- **Verificado badge**: Icono verde con tooltip "Verificado por Academia Detail"
- **Seccion CTA inferior**: Banner al final de la ficha invitando a contactar, con fondo gradiente

### Detalle tecnico por archivo

**`src/index.css`** (2 keyframes nuevos):
```text
@keyframes shimmer-gold {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
@keyframes shimmer-silver {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
```

**`src/components/directory/DetailerBadge.tsx`**:
- Anadir clase `animate-shimmer-gold` al badge elite con `background-size: 200%` y gradiente translucido superpuesto
- Anadir clase `animate-shimmer-silver` al badge master

**`src/pages/DetailerPage.tsx`** - Reescritura completa del render:
- Layout: `grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-8`
- Sidebar: `lg:sticky lg:top-24` con todos los datos de contacto
- Contenido: descripcion, servicios, skills, mapa, portfolio
- SEO: schema `makesOffer`, `sameAs`, OG tags mejorados
- Servicios con iconos mapeados (diccionario servicio -> icono Lucide)
- Banner CTA final con gradiente burdeos

### Resultado esperado

Una ficha profesional con aspecto premium tipo marketplace de lujo, donde los badges animados refuerzan la jerarquia visual, el WhatsApp es el CTA principal siempre accesible, y la informacion esta organizada en un layout de dos columnas que facilita la lectura y la conversion.


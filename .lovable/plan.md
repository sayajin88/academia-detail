

# Plan de Mejoras de Diseno y Visualizacion - Academia Detail

## Estado Actual

Tras la reciente reestructuracion visual (paleta burdeos, fondos gris carbon, iconografia automotive), la web tiene una base solida. Este plan se centra en pulir los detalles restantes, mejorar la coherencia entre paginas y elevar la experiencia visual general.

---

## 1. Coherencia de Fondos entre Secciones

**Problema**: Algunas paginas no alternan consistentemente entre `bg-background` y `bg-card`, lo que reduce el ritmo visual y hace que las secciones se "fusionen" unas con otras.

**Solucion**: Establecer un patron claro de alternancia de fondos en todas las paginas.

### Paginas afectadas:

**FormationDetail** (`src/pages/FormationDetail.tsx` y sus componentes):
- `FormationAdvantages`: `bg-background` (correcto)
- `FormationVideoShowcase`: necesita `bg-card` para contrastar
- `FormationPricing`: `bg-background` (correcto)
- `FormationLevels`: revisar fondo
- `FormationContent`: revisar fondo
- `FormationInstructor`: `bg-background` -> `bg-card` para alternar
- `FormationModules`: `bg-card` (correcto)
- `FormationCurriculum`: revisar fondo
- `FormationReglada`: revisar fondo
- `FormationCertification`: `bg-card` (correcto)
- `FormationIncludes`: `bg-background` (correcto)
- `FormationFAQ`: `bg-card` (correcto)

**AboutUs** (`src/pages/AboutUs.tsx`):
- Logo section: usa gradiente custom -> unificar con `bg-card`
- CTA final: usa gradiente custom -> unificar con `bg-card`

**CarreraDetailing**: Revisar que las secciones gold mantengan el patron alterno

### Archivos a modificar:
- `src/components/formation/FormationInstructor.tsx`
- `src/components/formation/FormationContent.tsx`
- `src/components/formation/FormationCurriculum.tsx`
- `src/components/formation/FormationReglada.tsx`
- `src/pages/AboutUs.tsx`

---

## 2. Separadores Visuales entre Secciones

**Problema**: Cuando dos secciones comparten el mismo fondo (o cuando el contraste entre secciones es bajo), no hay separacion visual clara.

**Solucion**: Anadir separadores sutiles con `border-t border-border/30` en la parte superior de secciones que sigan a otra con el mismo fondo, y/o un leve gradiente de transicion.

### Implementacion:
- Crear una clase CSS reutilizable `.section-divider` en `src/index.css`:
  ```css
  .section-divider {
    border-top: 1px solid hsl(var(--border) / 0.3);
  }
  ```
- Aplicar selectivamente en secciones consecutivas con el mismo fondo

---

## 3. Mejora del Footer

**Problema**: El footer actual es funcional pero basico comparado con el nivel de diseno del resto de la web. Carece de personalidad visual y de separacion del contenido principal.

**Solucion** (`src/components/layout/Footer.tsx`):
- Anadir un gradiente sutil de fondo: de `bg-card` plano a un gradiente como `bg-gradient-to-b from-card to-background/50`
- Anadir una linea decorativa burdeos sutil en la parte superior (similar al shimmer del navbar)
- Mejorar los enlaces sociales: hacerlos ligeramente mas grandes en movil, y anadir un efecto hover mas visible (borde burdeos)
- Anadir la direccion con un mini-mapa estatico o icono mas prominente
- Unificar el copyright con un badge sutil de la marca

---

## 4. Mejora de Cards de Formacion (FormationsGrid)

**Problema**: Las tarjetas de cursos se ven bien pero pueden mejorar la jerarquia visual interna y el feedback de interaccion.

**Solucion** (`src/components/home/FormationsGrid.tsx`):
- Anadir una linea de progreso sutil en la parte inferior de cada card que se rellene con un gradiente burdeos al hacer hover (efecto "loading bar")
- El badge de duracion podria tener un icono tematizado segun el tipo de curso (no solo Clock)
- Mejorar la sombra al hacer hover: usar `shadow-primary/20` en vez de sombra generica negra
- Anadir una microtransicion en el icono del curso: rotacion sutil de 5 grados al hover

---

## 5. Mejora de la Seccion Hero del Home

**Problema**: El hero actual tiene buen contenido pero los stats en dos filas pueden resultar abrumadores visualmente. El overlay oscuro reduce el impacto de la imagen/video.

**Solucion** (`src/components/home/HomeHero.tsx`):
- Reducir la opacidad del overlay de `from-black/70 via-black/50` a `from-black/60 via-black/40` para que el video/imagen tenga mas presencia
- Unificar las dos filas de stats en una sola fila horizontal con scroll en movil (o reducir a 4 stats clave en una fila)
- Anadir un efecto de "texto revelado" sutil al titulo (word-by-word o line-by-line con delay) - similar al que tiene CarreraHero
- Los orbs de fondo (`bg-primary/20`) podrian ser mas sutiles: reducir a `bg-primary/10`

---

## 6. Seccion de Pricing - Mejoras Visuales

**Problema**: La tabla de precios en las paginas de formacion es funcional pero densa visualmente. El card de precio compite con demasiados elementos.

**Solucion** (`src/components/formation/FormationPricing.tsx`):
- Separar visualmente el header del precio del resto con mas espacio
- Dar mas peso visual al precio: aumentar tamano a `text-7xl` en desktop
- Reducir el badge de descuento para que no compita con el precio principal
- Hacer el progress bar de plazas mas prominente (altura de `h-2` a `h-3`, con animacion de pulso al estar casi lleno)
- Mejorar la "urgencia" con un badge de color contrastante (ej: verde para "1 plaza libre")

---

## 7. Pagina de Contacto - Mejoras de UX

**Problema**: El hero de contacto es demasiado simple comparado con los heroes del resto de paginas. El formulario funciona bien pero la experiencia visual es mejorable.

**Solucion**:

**ContactHero** (`src/components/contact/ContactHero.tsx`):
- Usar la misma estructura de hero que las paginas de formacion: imagen a full-width con overlay, en vez de solo una imagen parcial
- Anadir stats de contacto (ej: "Tiempo medio de respuesta: 24h", "Mas de 500 consultas resueltas")
- Badge mas prominente con icono y texto

**ContactForm** (`src/components/contact/ContactForm.tsx`):
- Anadir indicadores de progreso visual (pasos 1/2/3) o agrupar campos por categoria con mini-headers
- Mejorar el visual del checkbox RGPD: hacerlo mas compacto sin perder informacion legal
- Anadir feedback visual inline (ej: icono check verde cuando un campo es valido)

---

## 8. Animaciones y Microinteracciones

**Problema**: Las animaciones existentes son buenas pero hay oportunidades para microinteracciones que mejoren la sensacion de calidad.

**Solucion**:

**Nuevo en `src/index.css`**:
- Efecto `hover-lift`: elevacion sutil (translateY -2px) + sombra para cards al hover, mas suave que `hover-glow`
- Transicion suave en iconos de features al hover: color + scale
- Animacion de "aparicion de texto" para headings grandes (clip-path reveal)

**Accordion** (`src/components/ui/accordion.tsx`):
- Anadir transicion suave al abrir/cerrar: icono de flecha rota por el chevron con suavidad, contenido con height transition

---

## 9. Tipografia y Jerarquia de Texto

**Problema**: Algunos subtitulos y parrafos en paginas de formacion usan `text-muted-foreground` con opacidades adicionales que reducen legibilidad.

**Solucion**:
- Auditar y eliminar opacidades dobles (ej: `text-muted-foreground/70` -> solo `text-muted-foreground`)
- En los modulos de cursos (`FormationModules.tsx`), el titulo del modulo podria tener mas peso visual: usar `text-xl font-bold` en vez de `text-lg font-semibold`
- Los topics dentro de accordions podrian beneficiarse de un `text-foreground/90` en vez de `text-muted-foreground` para mejor legibilidad

**Archivos afectados**:
- `src/components/formation/FormationModules.tsx`
- `src/components/formation/FormationFAQ.tsx`
- `src/components/formation/FormationContent.tsx`

---

## 10. Carrera Detailing - Iconos de Heroes Faltantes

**Problema**: El hero de Carrera Detailing usa iconos genericos como `Crown` y `Sparkles` que no se actualizaron con la nueva iconografia automotive.

**Solucion** (`src/components/carrera/CarreraHero.tsx`):
- `Crown` -> mantener (es coherente con el tema "premium/gold" de Carrera)
- `Sparkles` (en badge y CTA) -> `Star` o `Award` (mas profesional)
- Los iconos de stats (`Clock`, `Users`, `Award`, `Euro`) son correctos

**Otros componentes de Carrera**:
- `CarreraFormaciones.tsx`: `Sparkles` -> `Star` (coherencia gold)
- `CarreraBenefits.tsx`: Ya tiene un buen iconMap, no necesita cambios
- `CarreraPricing.tsx`: `Crown`, `Sparkles` -> reemplazar `Sparkles` por `Star`

---

## 11. Optimizacion de la Seccion "Montamos Tu Centro"

**Problema**: La seccion MontamosTuCentro tiene un buen concepto pero puede mejorar su aspecto visual para transmitir mas profesionalismo.

**Solucion** (`src/components/home/MontamosTuCentro.tsx`):
- Las cards de pasos podrian tener un indicador de conexion visual entre ellas (linea punteada o flecha SVG)
- Anadir un efecto de hover mas pronunciado: elevar la card activa y atenuar las demas
- El numero del paso deberia ser mas destacado: fondo burdeos con numero blanco, en vez de solo texto

---

## 12. Mejoras de Accesibilidad Visual

**Problema**: Algunos contrastes son aun insuficientes con la nueva paleta, especialmente texto secundario sobre fondos card.

**Solucion**:
- Verificar que `--muted-foreground` (75% luminosidad) tiene ratio de contraste suficiente (4.5:1 minimo) contra `--card` (14% luminosidad). Actualmente el ratio es ~5.2:1, que pasa WCAG AA pero esta justo al limite
- Subir ligeramente `--muted-foreground` a 78% luminosidad si es necesario
- Los textos sobre fondos con overlay (heroes con imagenes) deben mantener `text-white/80` como minimo, nunca bajar a `/60`

**Archivo afectado**: `src/index.css` (si se ajusta la variable)

---

## 13. Efecto de Scroll Parallax Sutil

**Problema**: La web se siente "plana" al hacer scroll - todas las secciones entran de la misma manera.

**Solucion**: Anadir un efecto parallax muy sutil a las decoraciones de fondo (gradient orbs, background patterns) para dar profundidad sin afectar rendimiento.

**Implementacion**:
- Crear un hook `useParallax` que aplique `translateY` basado en scroll position
- Aplicar solo a los elementos decorativos de fondo (no al contenido)
- Desactivar en movil por rendimiento
- Solo aplicar en Home y paginas con muchas secciones

---

## 14. Loading States y Skeleton Mejorados

**Problema**: Los skeletons actuales en la pagina Home son genericos (gris con pulse).

**Solucion** (`src/pages/Home.tsx`):
- Mejorar el `SectionSkeleton` para que tenga la estructura correcta de cada seccion (cards skeleton, stats skeleton)
- Usar el color de fondo apropiado para cada skeleton (alternar `bg-card` y `bg-background`)
- Anadir un efecto shimmer en vez de pulse simple

---

## Seccion Tecnica - Resumen de Archivos a Modificar

| Archivo | Cambios |
|---------|---------|
| `src/index.css` | Nueva clase `.section-divider`, efecto `.hover-lift`, posible ajuste `--muted-foreground`, shimmer skeleton |
| `src/components/layout/Footer.tsx` | Gradiente fondo, linea decorativa top, mejorar social icons hover |
| `src/components/home/HomeHero.tsx` | Reducir overlay, unificar stats a 1 fila, reducir orbs |
| `src/components/home/FormationsGrid.tsx` | Hover shadow burdeos, microinteraccion icono |
| `src/components/home/MontamosTuCentro.tsx` | Conectores entre pasos, numero mas destacado |
| `src/components/formation/FormationPricing.tsx` | Precio mas grande, progress bar mejorado |
| `src/components/formation/FormationModules.tsx` | Titulo modulo mas grande, topics mas legibles |
| `src/components/formation/FormationInstructor.tsx` | Alternar fondo bg-card |
| `src/components/contact/ContactHero.tsx` | Hero full-width con stats |
| `src/components/carrera/CarreraHero.tsx` | Sparkles -> Star |
| `src/components/carrera/CarreraFormaciones.tsx` | Sparkles -> Star |
| `src/components/carrera/CarreraPricing.tsx` | Sparkles -> Star |
| `src/pages/Home.tsx` | Skeleton mejorado |
| `src/pages/AboutUs.tsx` | Fondos unificados |
| Varios componentes formation | Alternancia fondos bg-background/bg-card |

### Sin cambios
- **Imagenes y contenidos**: No se tocan
- **Backend/Edge Functions**: No se tocan
- **Rutas/navegacion**: No se tocan
- **Datos (formationDetails, formations, etc.)**: No se tocan


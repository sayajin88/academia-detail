

## Seccion de argumentos de venta antes del formulario de inscripcion

### Que se hara

Anadir un bloque visual con argumentos poderosos entre el `SectionHeading` y el `DirectoryJoinForm` en la pagina `DirectoryJoin.tsx`. Este bloque convencera a detailers, centros y alumnos de unirse al directorio antes de empezar el formulario.

### Contenido y argumentos

Los argumentos se organizaran en 3 bloques visuales:

**Bloque 1 - Estadisticas de impacto (3 metricas horizontales)**
- "+15.000 visitas/mes" — Trafico real combinado de academiadetail.com y detailpark.com
- "Top 1 en Google" — Posicionamiento de la academia como referente en busquedas de detailing en Espana
- "+500 alumnos certificados" — Comunidad activa de profesionales formados

**Bloque 2 - Ventajas clave (grid de 4 tarjetas con icono)**
- "Visibilidad SEO garantizada" — Tu ficha aparece en las primeras posiciones de Google gracias a nuestra autoridad de dominio y estructura SEO programatica
- "Exclusividad en tu zona" — Plazas limitadas por ciudad para que no compitas con decenas de perfiles. Cuanto antes te registres, mejor posicion
- "Verificado por Academia Detail" — Badge de confianza que te diferencia. Los clientes saben que eres un profesional formado y avalado
- "Contacto directo con clientes" — WhatsApp, telefono, Instagram y web visibles desde tu ficha. Sin intermediarios ni comisiones

**Bloque 3 - Banner de precio (inline, compacto)**
- Precio tachado 4,99 EUR/mes con precio actual 0 EUR/mes destacado en verde
- Texto: "Oferta de lanzamiento limitada — despues 4,99 EUR/mes"

### Diseno visual

- Las 3 metricas en una fila con numeros grandes en color primary y texto descriptivo debajo
- Las 4 tarjetas en grid 2x2 (movil 1 columna) con icono, titulo en negrita y descripcion breve
- El banner de precio como un chip/badge centrado con fondo sutil
- Todo el bloque con fondo `bg-card/50` redondeado y borde sutil para separarlo visualmente del formulario

### Detalle tecnico

**`src/pages/DirectoryJoin.tsx`:**

Se anadira un nuevo componente `DirectoryJoinValueProps` importado e insertado entre el `SectionHeading` y el `DirectoryJoinForm`.

**`src/components/directory/DirectoryJoinValueProps.tsx`** (archivo nuevo):

- Componente funcional sin estado
- Usa iconos de lucide-react: `TrendingUp`, `MapPin`, `BadgeCheck`, `MessageCircle`, `Clock`, `Users`, `Search`, `Lock`
- Estructura:
  1. Fila de 3 metricas con `text-3xl font-black text-primary` para los numeros
  2. Grid 2x2 de Cards con icono, titulo y descripcion
  3. Chip de precio centrado con `line-through` y texto verde
- Todo envuelto en un `div` con `bg-card/50 rounded-2xl border border-border/50 p-6 md:p-8 space-y-8`
- Responsive: metricas en columna en movil, fila en desktop; tarjetas 1 col movil, 2 cols desktop


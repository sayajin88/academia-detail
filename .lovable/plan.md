

## Nuevo logo y barra de navegacion clara

### Cambios principales

**1. Nuevo logo de Academia Detail**
- Se guardara el nuevo logo subido (`Academia_Detail_-_Logo_Pequeño.png`) en `src/assets/academia-detail-logo-light.png`
- Se reemplazara el logo actual en el navbar (desktop y movil) por el nuevo
- Se eliminaran los filtros CSS `brightness-[10] invert` ya que el nuevo logo tiene texto oscuro sobre fondo claro y se mostrara tal cual

**2. Barra de navegacion con fondo claro**
- Se cambiara el fondo del glass container del navbar de oscuro/transparente (`bg-background/80`, `bg-background/40`) a un fondo blanco/crema claro (`bg-white/95`, `bg-white/80`) que contraste con el contenido oscuro de la pagina
- Se ajustaran los bordes de `border-white/10` a `border-gray-200` para que sean sutiles sobre fondo claro
- Se cambiara el color del texto de los enlaces de `text-foreground/70` (blanco) a `text-gray-700` / `text-gray-900` para legibilidad sobre fondo claro
- Los enlaces activos mantendran el color primario (burdeos)
- Los hovers pasaran de `hover:bg-white/5` a `hover:bg-gray-100`
- El efecto shimmer del borde se adaptara a tonos claros
- La sombra se ajustara de `shadow-black/20` a `shadow-gray-300/40` para un efecto mas suave

**3. Dropdown de formaciones (desktop)**
- Se cambiara el fondo del dropdown de `bg-background/95` (oscuro) a `bg-white/98` (claro)
- Los bordes e iconos se adaptaran a la paleta clara
- El texto sera oscuro (`text-gray-900`) con descripciones en gris medio

**4. Menu movil**
- El panel lateral se cambiara de `bg-background/95` (oscuro) a `bg-white/98` (claro)
- Todos los textos, iconos y bordes se adaptaran al tema claro
- Los estados activos mantendran el acento burdeos pero sobre fondo claro
- El boton de hamburguesa cambiara a color oscuro (`text-gray-800`)

**5. Boton de hamburguesa y CTA**
- El icono de hamburguesa (las 3 lineas) se cambiara de `text-foreground` (blanco) a `text-gray-800`
- El boton de WhatsApp mantendra su color verde

### Seccion tecnica

Archivos modificados:
- `src/assets/academia-detail-logo-light.png` - nuevo archivo (copia del logo subido)
- `src/components/layout/Navbar.tsx` - cambios de estilos y logo

Clases CSS principales que se reemplazaran:

| Elemento | Actual (oscuro) | Nuevo (claro) |
|---|---|---|
| Glass container | `bg-background/80` | `bg-white/95` |
| Bordes | `border-white/10` | `border-gray-200/80` |
| Texto enlaces | `text-foreground/70` | `text-gray-600` |
| Texto activo | `text-primary` | `text-primary` (sin cambio) |
| Hover fondo | `hover:bg-white/5` | `hover:bg-gray-100` |
| Sombra | `shadow-black/20` | `shadow-gray-300/50` |
| Logo filtros | `brightness-[10] invert` | (sin filtros) |
| Dropdown fondo | `bg-background/95` | `bg-white border-gray-200` |
| Mobile panel | `bg-background/95` | `bg-white` |
| Hamburguesa | `text-foreground` | `text-gray-800` |


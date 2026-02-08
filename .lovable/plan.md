

## Menu oscuro con logo blanco

### Resumen
Se revertira el navbar al tema oscuro que usa el resto de la web (fondo carbon/oscuro con texto blanco) y se usara el logo blanco horizontal que subiste anteriormente (`logo_detail-academy_solid-white.png`).

### Cambios principales

**1. Logo blanco**
- Se guardara el logo blanco subido como `src/assets/academia-detail-logo-white.png`
- Se reemplazara el import actual (`academia-detail-logo-light.png`) por el nuevo logo blanco
- El logo se mostrara sin filtros CSS, ya que es blanco nativo y se vera directamente sobre fondo oscuro

**2. Glass container del navbar - tema oscuro**
- Fondo: de `bg-white/95` y `bg-white/80` a `bg-background/90` y `bg-background/70` (carbon oscuro semi-transparente)
- Bordes: de `border-gray-200/80` a `border-white/10` (sutil sobre fondo oscuro)
- Sombra: de `shadow-gray-300/50` a `shadow-black/20`
- Backdrop blur se mantiene para el efecto glassmorphism

**3. Texto de navegacion (desktop)**
- Enlaces normales: de `text-gray-600` a `text-foreground/70` (blanco semi-transparente)
- Enlaces activos: mantienen `text-primary` (burdeos)
- Hover: de `hover:bg-gray-100` a `hover:bg-white/5` (sutil sobre oscuro)
- Hover texto: de `hover:text-gray-900` a `hover:text-foreground`

**4. Dropdown de formaciones (desktop)**
- Fondo: de `bg-white border-gray-200` a `bg-background/95 border-white/10`
- Sombra: de `shadow-gray-200/60` a `shadow-black/40`
- Iconos: de `bg-gray-100 text-gray-500` a `bg-white/5 text-foreground/50`
- Texto: de `text-gray-900` a `text-foreground`, descripciones de `text-gray-500` a `text-foreground/50`
- Hover fondo: de `hover:bg-gray-50` a `hover:bg-white/5`

**5. Menu movil**
- Panel: de `bg-white border-gray-200` a `bg-background/95 border-white/10`
- Header: bordes y fondos adaptados al tema oscuro
- Enlaces: texto blanco con estados activos en burdeos sobre `bg-primary/10`
- Boton cerrar (X): de `text-gray-600` a `text-foreground/60`
- CTA inferior: de `bg-white/90 border-gray-200` a `bg-background/90 border-white/10`

**6. Boton hamburguesa**
- De `text-gray-800` a `text-foreground` (blanco)

**7. Shimmer border**
- Se ajustara la opacidad del gradiente para que sea visible sobre fondo oscuro (`hsl(var(--primary) / 0.3)` en vez de `0.15`)

### Seccion tecnica

Archivos modificados:
- `src/assets/academia-detail-logo-white.png` - nuevo archivo (logo blanco subido por el usuario)
- `src/components/layout/Navbar.tsx` - reversion completa al tema oscuro + nuevo logo

| Elemento | Actual (claro) | Nuevo (oscuro) |
|---|---|---|
| Logo import | `academia-detail-logo-light.png` | `academia-detail-logo-white.png` |
| Glass container | `bg-white/95` | `bg-background/90` |
| Bordes | `border-gray-200/80` | `border-white/10` |
| Texto enlaces | `text-gray-600` | `text-foreground/70` |
| Texto activo | `text-primary` | `text-primary` (sin cambio) |
| Hover fondo | `hover:bg-gray-100` | `hover:bg-white/5` |
| Hover texto | `hover:text-gray-900` | `hover:text-foreground` |
| Sombra | `shadow-gray-300/50` | `shadow-black/20` |
| Dropdown fondo | `bg-white` | `bg-background/95` |
| Mobile panel | `bg-white` | `bg-background/95` |
| Hamburguesa | `text-gray-800` | `text-foreground` |
| Shimmer | `primary / 0.15` | `primary / 0.3` |


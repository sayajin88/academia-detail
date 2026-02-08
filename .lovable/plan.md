

# Seccion de Marcas Colaboradoras - Logos de Detailing y Car Wrapping

## Objetivo

Crear una seccion visual de "Marcas con las que trabajamos" que refuerce la autoridad y el pilar de diferenciacion de neutralidad de marcas ("100% Brand Neutrality"). Se mostrara en la Home y en las paginas de formacion relevantes.

## Marcas a incluir (9 logos)

| Marca | Sector principal |
|-------|-----------------|
| 3M | Detailing / Wrapping / PPF |
| Avery Dennison | Car Wrapping |
| Chemical Guys | Detailing |
| Flex | Herramientas / Pulidoras |
| Gtechniq | Ceramicos / Detailing |
| Gyeon | Ceramicos / Detailing |
| Hexis | Car Wrapping |
| Meguiar's | Detailing |
| Menzerna | Pulido / Detailing |
| Rupes | Herramientas / Pulidoras |

## Diseno del componente

Se creara un componente reutilizable `BrandLogosBar` con las siguientes caracteristicas:

- **Estilo visual**: Fondo oscuro (bg-card o bg-muted/30) con logos en blanco/gris (filtro `brightness-0 invert` + opacidad ~60%, subiendo a 100% en hover)
- **Layout**: Carrusel infinito horizontal (reusando el patron de animacion `@keyframes scroll` ya existente en `SuccessStoriesLogos`)
- **Titulo corto**: Badge "Marcas Colaboradoras" + frase tipo "Formamos con las mejores marcas del sector"
- **Responsivo**: En desktop, los logos se ven en una fila continua con scroll infinito. En mobile, misma animacion pero con logos mas pequenos
- **Sin interaccion**: Los logos no son clickables (no hay links externos a las marcas)

## Archivos a crear

### 1. Copiar los 10 logos a `src/assets/brands/`

Se copiaran los 10 logos subidos al directorio `src/assets/brands/`:
- `src/assets/brands/3m.png`
- `src/assets/brands/avery-dennison.png`
- `src/assets/brands/chemical-guys.png`
- `src/assets/brands/flex.png`
- `src/assets/brands/gtechniq.png`
- `src/assets/brands/gyeon.png`
- `src/assets/brands/hexis.png`
- `src/assets/brands/meguiars.png`
- `src/assets/brands/menzerna.png`
- `src/assets/brands/rupes.png`

### 2. Nuevo componente: `src/components/shared/BrandLogosBar.tsx`

Componente reutilizable con las siguientes props:

```text
interface BrandLogosBarProps {
  variant?: 'full' | 'compact';       // full = con titulo, compact = solo logos
  filter?: 'all' | 'detailing' | 'wrapping';  // filtra marcas por sector
  className?: string;
}
```

**Estructura del componente:**
- `SectionHeading` con badge "Marcas Colaboradoras" y titulo "Trabajamos con las Mejores Marcas"
- Franja de logos con animacion de scroll infinito
- Cada logo es una imagen con `brightness-0 invert opacity-50 hover:opacity-100` para integrarse con el tema oscuro
- Fades laterales (gradiente) para efecto de desvanecimiento en los bordes

**Categorias de marcas:**
- `detailing`: 3M, Chemical Guys, Flex, Gtechniq, Gyeon, Meguiar's, Menzerna, Rupes
- `wrapping`: 3M, Avery Dennison, Hexis
- `all`: Todas las marcas (default)

## Ubicaciones de la seccion

### Home (`src/pages/Home.tsx`)
- Insertar `BrandLogosBar` (variant="full", filter="all") **despues de** `CompetitiveComparison` y **antes de** `BusinessSkillsSection`
- Esto refuerza visualmente el mensaje de neutralidad de marcas que se menciona en la comparativa competitiva
- Se anadira como lazy-loaded con `Suspense` siguiendo el patron existente

### Pagina de Formacion Detailing (`src/pages/FormationDetail.tsx`)
- Insertar `BrandLogosBar` (variant="compact", filter basado en el slug) **despues de** `FormationIncludes` y **antes de** `FormationLogistics`
- Para `curso-detailing-profesional`: filter="detailing"
- Para `curso-vinilado-vehiculos`: filter="wrapping"
- Para otros cursos: filter="all"

## Detalles tecnicos

### Animacion de scroll infinito
Se reutilizara la keyframe `scroll` ya definida en `SuccessStoriesLogos.tsx`, pero se definira localmente en el componente via `<style>` tag (mismo patron):

```text
@keyframes brand-scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```

Los logos se duplican (`[...brands, ...brands]`) para crear el efecto de loop sin cortes.

### Filtro visual de logos
Todos los logos se renderizan con `brightness-0 invert` para convertirlos a blanco sobre el fondo oscuro, con `opacity-50` por defecto y `hover:opacity-100` para interactividad sutil. Esto da un look cohesivo profesional sin importar el color original del logo.

### Performance
- Los logos se importan como assets de `src/assets/brands/` (bundled por Vite)
- Todos con `loading="lazy"` excepto en la Home donde se usara lazy component via `React.lazy()`
- Tamano de imagen pequeno (logos PNG, ~5-20KB cada uno)

## Resumen de archivos afectados

| Archivo | Cambio |
|---------|--------|
| `src/assets/brands/*.png` (10 archivos) | Copiar los logos subidos |
| `src/components/shared/BrandLogosBar.tsx` | Nuevo componente reutilizable |
| `src/pages/Home.tsx` | Anadir BrandLogosBar lazy-loaded despues de CompetitiveComparison |
| `src/pages/FormationDetail.tsx` | Anadir BrandLogosBar despues de FormationIncludes |

## Impacto esperado

- **Confianza**: Refuerza visualmente que la academia trabaja con marcas lideres reconocidas internacionalmente
- **Diferenciacion**: Apoya el pilar de "100% Brand Neutrality" mostrando la variedad de marcas
- **SEO**: Los alt texts de los logos incluyen nombres de marca relevantes para busquedas
- **Performance**: Impacto minimo (~100KB total en logos PNG, lazy-loaded)


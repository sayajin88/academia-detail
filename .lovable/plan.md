

# Rediseno Visual de las Pricing Tables de Cursos

## Objetivo
Redisenar completamente las secciones de precios de todas las landing pages de cursos (Detailing, Car Wrapping, PPF, Restauracion) con un diseno moderno, alto CTA y visualmente impactante, manteniendo todo el contenido y precios actuales.

## Componentes Afectados

Hay dos componentes de pricing que se renderizan en cada pagina de curso:

1. **`FormationPricing.tsx`** -- Seccion principal con precio, beneficios incluidos, descuento y CTA
2. **`FormationLevels.tsx`** -- Grid de niveles/modalidades (Aficionados, Profesionales, Monta tu Negocio)

Ambos necesitan rediseno. Se mantienen los datos de `formationDetails.ts` sin cambios.

---

## Nuevo Diseno: FormationPricing

Estructura actual: 2 columnas (lista de beneficios + tarjeta de precio). Es funcional pero visualmente plana.

**Nuevo concepto**: Layout centrado tipo "hero pricing" con tarjeta protagonista y beneficios integrados.

- Tarjeta unica centrada con gradiente sutil del color primario (granate)
- Precio grande con animacion countUp mantenida
- Precio tachado y badge de descuento flotante con efecto glassmorphism
- Beneficios reorganizados en grid 2x4 compacto debajo del precio, dentro de la misma tarjeta
- Barra de plazas disponibles con micro-animacion
- CTA boton grande con efecto glow pulsante
- Garantia / social proof compacto debajo del CTA
- Para cursos "coming soon": misma estructura pero con paleta ambar y CTA "Avisarme"

## Nuevo Diseno: FormationLevels

Estructura actual: grid de cards simples con borde y checkmarks.

**Nuevo concepto**: Cards con efecto hover elevado y visual jerarquico claro.

- Card destacada (highlighted) con borde gradiente animado y escala mayor
- Cada card tiene un icono/numero grande de nivel en la parte superior
- Fondo con gradiente sutil diferente para cada nivel
- Features con iconos en lugar de solo checks
- CTA integrado en cada card con variante visual segun nivel
- Badge "Mas Popular" rediseado con efecto glow
- Transiciones staggered al hacer scroll

---

## Detalles Tecnicos

### Archivos a modificar:
1. **`src/components/formation/FormationPricing.tsx`** -- Reescritura completa del layout JSX y clases Tailwind
2. **`src/components/formation/FormationLevels.tsx`** -- Reescritura completa del layout JSX y clases Tailwind

### Lo que se mantiene sin cambios:
- `src/data/formationDetails.ts` -- Todos los datos, precios y contenido
- `src/pages/FormationDetail.tsx` -- Composicion de pagina intacta
- Props e interfaces de ambos componentes
- Hook `useCountUp` y logica de intersection observer
- Soporte para estados "comingSoon"

### Dependencias:
- No se requieren nuevas dependencias
- Se usan los iconos de `lucide-react` ya instalados
- Se mantiene el sistema de diseno existente (Tailwind + componentes UI de shadcn)

### Compatibilidad:
- Responsive: mobile-first con breakpoints md/lg
- Aplica automaticamente a todos los cursos (Detailing, Wrapping, PPF, Restauracion)
- Soporte completo para el estado "coming soon" (Restauracion)


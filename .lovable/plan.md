
# Fix Navbar: Proporciones de enlaces y logo cortado

## Problemas identificados

Analizando la captura de pantalla:

1. **"QUIENES SOMOS" se parte en dos lineas**: La combinacion de `text-[13px]`, `uppercase`, y `tracking-widest` (0.1em) hace que los textos largos como "QUIENES SOMOS" ocupen demasiado ancho horizontal y se rompan en dos lineas, creando una altura inconsistente respecto al resto de enlaces.

2. **Logo cortado**: El logo no tiene `flex-shrink-0`, lo que permite que el layout flex lo comprima cuando el espacio es limitado. El contenedor flexible del navbar esta presionando al logo para dar espacio a los enlaces y botones.

## Solucion

### Archivo: `src/components/layout/Navbar.tsx`

**1. Corregir el logo (linea ~128)**
- Anadir `flex-shrink-0` al contenedor del logo para evitar que se comprima
- Anadir `min-w-0` eliminado y asegurar que el logo tenga espacio reservado

**2. Corregir proporcion de enlaces (lineas 144, 159, 178, 231)**
- Reducir `tracking-widest` (0.1em) a `tracking-wider` (0.05em) para que textos multi-palabra no se expandan excesivamente
- Anadir `whitespace-nowrap` a todos los enlaces del nav para evitar saltos de linea
- Reducir el padding horizontal de `px-4` a `px-3` para ganar espacio entre enlaces
- Estas dos medidas combinadas resolveran el wrapping de "QUIENES SOMOS" sin reducir el tamano de fuente

**3. Reducir gap entre enlaces**
- Cambiar el gap del contenedor nav de `gap-1` a `gap-0` para recuperar espacio horizontal

### Cambios concretos

```text
Contenedor del logo:
  Antes: className="relative flex flex-col"
  Despues: className="relative flex flex-col flex-shrink-0"

Contenedor de enlaces desktop:
  Antes: className="hidden lg:flex items-center gap-1 relative"
  Despues: className="hidden lg:flex items-center gap-0 relative"

Todos los enlaces (Inicio, Formaciones, y navLinks.slice(1)):
  Antes: text-[13px] font-semibold uppercase tracking-widest ... px-4
  Despues: text-[13px] font-semibold uppercase tracking-wider whitespace-nowrap ... px-3
```

Esto se aplica en 4 puntos del codigo:
- Link "Inicio" (linea ~159)
- Boton "Formaciones" (linea ~178)
- Links iterados con navLinks.slice(1) (linea ~231)

## Resultado esperado

- Todos los enlaces del menu se mantienen en una sola linea con altura uniforme
- El logo se muestra completo sin recortes ni compresion
- El espaciado general queda equilibrado y proporcional
- Se mantiene la estetica premium con uppercase y tracking, pero mas contenido

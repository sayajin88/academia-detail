
# Calculadora Visual de Dilucion - VisualDilutionCalculator

## Resumen

Crear un componente interactivo y educativo que permita a detailers novatos entender visualmente como mezclar productos quimicos. Incluye una botella animada con niveles de liquido en tiempo real, controles tactiles, un traductor educativo y resultados copiables.

**Nota importante**: El proyecto no tiene `framer-motion` instalado. Todas las animaciones se implementaran con CSS transitions y keyframes, que ya se usan extensamente en el proyecto (oleaje, burbujas, transiciones de altura).

---

## 1. Estructura de archivos

| Archivo | Tipo | Descripcion |
|---------|------|-------------|
| `src/components/glossary/VisualDilutionCalculator.tsx` | Nuevo | Componente principal con toda la logica |
| `src/pages/Glossary.tsx` | Modificar | Insertar el componente entre las secciones educativas y el grid de terminos |

Se ubicara en la carpeta `glossary/` ya que es una herramienta educativa directamente relacionada con el glosario de detailing.

---

## 2. Layout responsivo

```text
DESKTOP (md+):
+-------------------------------+----------------------------+
|    CONTROLES DE INPUT         |   BOTELLA ANIMADA SVG      |
|  - Slider capacidad           |   +------------------+     |
|  - Grid de ratios             |   |   [gatillo]      |     |
|  - Input custom               |   |                  |     |
|                               |   |  ~~~ producto ~~~|     |
|  TRADUCTOR EDUCATIVO          |   |  .................|     |
|  - Texto dinamico             |   |                  |     |
|  - Barra de potencia          |   |  ~~~ agua ~~~~~~ |     |
|                               |   +------------------+     |
+-------------------------------+----------------------------+
|              RESULTADO FINAL: X ml Producto + Y ml Agua    |
|              [Copiar Receta al Portapapeles]                |
+------------------------------------------------------------+

MOVIL:
+--------------------------+
| CONTROLES DE INPUT       |
| ...                      |
+--------------------------+
| BOTELLA ANIMADA          |
| ...                      |
+--------------------------+
| TRADUCTOR EDUCATIVO      |
+--------------------------+
| RESULTADO FINAL          |
+--------------------------+
```

---

## 3. Seccion izquierda: Controles interactivos

### A. Slider de Capacidad Total
- Componente `Slider` de Radix UI (ya existe en el proyecto como `src/components/ui/slider.tsx`)
- Rango: 100ml a 5000ml, step de 50ml
- Valor mostrado en `text-3xl font-monument` al lado del slider, editable con un input numerico
- Etiqueta: "Capacidad del envase"

### B. Selector de Ratios (Grid de botones)
- Grid de 3x2 con botones grandes (`min-h-[56px]`) para tacto movil
- Presets: `1:1` (Extremo), `1:4` (Fuerte), `1:10` (General), `1:20` (Suave), `1:100` (Jabon)
- Boton activo: `bg-blue-600 text-white border-blue-500 shadow-lg`
- Boton inactivo: `bg-card border-border text-foreground hover:border-blue-400`
- Boton "Custom" que revela dos inputs numericos para parte de producto y parte de agua

---

## 4. Seccion central: Traductor Educativo

Bloque dinamico que cambia con cada seleccion de ratio:

- Texto: "Una dilucion 1:X significa que por cada tapon de producto, debes anadir X tapones de agua."
- Incluye emoji de bombilla y texto con `text-muted-foreground`

### Barra de Potencia/Peligro
- Barra de progreso visual con degradado de color:
  - 1:1 a 1:4 --> Rojo/naranja (80-100% llena) con etiqueta "Concentracion extrema"
  - 1:10 --> Amarillo (50% llena) con etiqueta "Uso general"
  - 1:20 a 1:100 --> Verde (10-25% llena) con etiqueta "Concentracion suave"
- Implementada con un `div` de ancho animado via CSS `transition-all duration-500`
- Degradado de color calculado dinamicamente con `style={{ background: ... }}`

---

## 5. Seccion derecha: Botella Animada SVG

### Diseno de la botella
- SVG en linea con forma de botella pulverizadora (spray bottle)
- Contorno sutil en `stroke: hsl(var(--border))` con `stroke-width: 2`
- Cuerpo rectangular redondeado con cuello estrecho y gatillo/cabezal
- Dimensiones: ~200px ancho x ~350px alto, responsivo con `viewBox`

### Liquidos animados (CSS puro)
- Dos capas rectangulares dentro del SVG, clippeadas al contorno de la botella:
  - **Agua** (capa inferior): `fill: #60a5fa` (blue-400)
  - **Producto** (capa superior): `fill: #f59e0b` (amber-500)
- Las alturas se calculan matematicamente:
  ```text
  volumePorParte = capacidadTotal / (partesProducto + partesAgua)
  volumenProducto = volumePorParte * partesProducto
  volumenAgua = volumePorParte * partesAgua
  alturaProducto% = (volumenProducto / capacidadTotal) * alturaMaximaLiquido
  alturaAgua% = (volumenAgua / capacidadTotal) * alturaMaximaLiquido
  ```
- Animacion de transicion: `transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1)` en los atributos `height` y `y` de los rectangulos SVG
- Etiquetas flotantes dentro del SVG indicando "Producto" y "Agua" con sus ml respectivos

### Efecto de oleaje
- Linea ondulada en la superficie de cada liquido usando un `path` SVG con curvas bezier
- Animacion sutil con keyframe CSS que desplaza horizontalmente el patron de onda:
  ```css
  @keyframes wave { 0%, 100% { d: path("M0,0 Q25,-3 50,0 T100,0"); } 50% { d: path("M0,0 Q25,3 50,0 T100,0"); } }
  ```
- Solo se aplica a la capa superior (producto) para mantener rendimiento

### Burbujas decorativas
- 3-4 circulos SVG pequenos (r=2-4px) con animacion `float-gentle` posicionados aleatoriamente dentro de la zona de agua
- Opacidad baja (0.3-0.5) para no distraer

---

## 6. Resultado Final

- Dos bloques lado a lado (o apilados en movil):
  - Bloque producto: Fondo `bg-amber-500/10`, borde `border-amber-500/30`, icono Droplets, texto "ANADE: X ml de Producto" en `text-2xl font-bold`
  - Bloque agua: Fondo `bg-blue-400/10`, borde `border-blue-400/30`, icono Droplets, texto "RELLENA CON: Y ml de Agua" en `text-2xl font-bold`
- Boton "Copiar Receta al Portapapeles" con icono `Copy` de lucide-react
  - Usa `navigator.clipboard.writeText()` para copiar texto formateado
  - Feedback visual: cambia a "Copiado" con icono `Check` durante 2 segundos via `useState`

---

## 7. Estilos y coherencia con la marca

- Contenedor principal: `bg-card/80 backdrop-blur-sm rounded-2xl border border-border shadow-lg p-6 md:p-8`
- Titulo de seccion en la pagina: "Herramienta Interactiva" con badge tipo glosario
- Subtitulo: "Calcula la dilucion exacta de cualquier producto quimico"
- Respeta la paleta oscura del proyecto (fondo charcoal, acentos burdeos) pero usa azul/ambar para los liquidos (contraste funcional)

---

## 8. Integracion en la pagina del Glosario

En `src/pages/Glossary.tsx`, el componente se insertara entre `<GlossaryEducationalSections />` y la seccion principal del grid, envuelto en una seccion con fondo alternado para mantener el ritmo visual:

```text
<GlossaryEducationalSections />

<!-- NUEVO: Calculadora de Dilucion -->
<section className="py-16 bg-card/30 border-y border-border/30">
  <div className="container mx-auto px-4">
    <VisualDilutionCalculator />
  </div>
</section>

<!-- Grid de terminos existente -->
<section className="pb-20">
```

---

## 9. Logica matematica (React hooks)

```text
Estado:
- capacity: number (100-5000, default 1000)
- ratioProduct: number (default 1)
- ratioWater: number (default 10)
- isCustomRatio: boolean
- copied: boolean (para feedback del clipboard)

Calculos (useMemo):
- totalParts = ratioProduct + ratioWater
- volumePerPart = capacity / totalParts
- productVolume = volumePerPart * ratioProduct (redondeado a 1 decimal)
- waterVolume = volumePerPart * ratioWater (redondeado a 1 decimal)
- strengthPercent = (ratioProduct / totalParts) * 100

Visualizacion botella:
- maxLiquidHeight = 200 (px en viewBox SVG)
- productHeight = (productVolume / capacity) * maxLiquidHeight
- waterHeight = (waterVolume / capacity) * maxLiquidHeight
```

---

## 10. Accesibilidad

- Todos los controles con `aria-label` descriptivos
- El slider con `aria-valuemin`, `aria-valuemax`, `aria-valuenow` (ya proporcionados por Radix)
- Los botones de ratio con `aria-pressed` para indicar estado activo
- Botones de tacto con `min-h-[44px]` (estandar del proyecto)
- Texto alternativo en la botella SVG con `role="img"` y `aria-label`
- Prefers-reduced-motion respetado (las animaciones de oleaje se desactivan)

---

## Resultado esperado

- Herramienta visual e intuitiva que educa al usuario sobre diluciones de productos quimicos
- Animaciones fluidas con CSS puro (sin dependencias adicionales)
- Totalmente responsivo con experiencia tactil optimizada
- Coherente con el diseno premium oscuro del sitio
- Integrada organicamente en la pagina del glosario como recurso educativo complementario


# Integracion de Logos de Partners y Colaboradores

## Resumen

Se integraran 3 nuevos logos en la web, cada uno con un rol diferente:

| Logo | Rol | Paginas |
|------|-----|---------|
| Leandro Landete Academy | Colaborador/formador | Jornada Zero, Up Detail |
| Car Care Passion | Tienda de productos asociada | Todas las paginas |
| STEK Automotive | Instaladores oficiales | Home, PPF, Jornada Zero, Up Detail |

## Estrategia de integracion

Dado que hay dos tipos de paginas con layouts diferentes (paginas con `MainLayout` y paginas autonomas como Jornada Zero/Up Detail), la integracion se hara en varias capas:

### 1. Ampliar el componente BrandLogosBar existente

**Archivo: `src/components/shared/BrandLogosBar.tsx`**

- Extender el tipo de categorias de `('detailing' | 'wrapping')` a `('detailing' | 'wrapping' | 'ppf')`
- Anadir STEK Automotive con categorias `['ppf']`
- Anadir Car Care Passion con categorias `['detailing', 'wrapping', 'ppf']` para que aparezca en todos los filtros
- Esto cubre automaticamente: Home (filter="all"), Curso Detailing (filter="detailing"), Curso Wrapping (filter="wrapping"), Curso PPF (filter="all")

### 2. Anadir Car Care Passion al Footer global

**Archivo: `src/components/layout/Footer.tsx`**

- Anadir una linea sutil debajo de la seccion de marca ("Brand") con el logo de Car Care Passion y el texto "Partner oficial de productos"
- Esto asegura que Car Care Passion aparece en TODAS las paginas que usan `MainLayout` (Home, cursos, blog, contacto, quienes somos, carrera detailing, etc.)

### 3. Seccion de Partners en Jornada Zero

**Archivo: `src/pages/JornadaCero.tsx`**

- Anadir una seccion compacta de logos de partners/colaboradores antes del footer de la pagina (~linea 882)
- Mostrar: Leandro Landete Academy + STEK Automotive + Car Care Passion
- Estilo: franja horizontal con logos en blanco/gris (coherente con el estilo de la pagina) y etiqueta "Nuestros Partners y Colaboradores"

### 4. Seccion de Partners en Up Detail

**Archivo: `src/pages/UpDetail.tsx`**

- Anadir seccion similar a la de Jornada Zero, antes del footer (~linea 615)
- Mostrar: Leandro Landete Academy + STEK Automotive + Car Care Passion
- Estilo: adaptado a la paleta violeta de Up Detail

### 5. Badge "Instaladores Oficiales STEK" en paginas clave

En la Home y en el curso de PPF, STEK ya aparecera en el BrandLogosBar. Opcionalmente se puede destacar con una mencion especial en el subtitulo del BrandLogosBar cuando el filtro incluya PPF.

## Archivos nuevos

| Archivo | Descripcion |
|---------|-------------|
| `src/assets/brands/leandro-landete-academy.png` | Logo de Leandro Landete Academy |
| `src/assets/brands/carcare-passion.png` | Logo de Car Care Passion |
| `src/assets/brands/stek-automotive.png` | Logo de STEK Automotive |

## Archivos modificados

| Archivo | Cambio |
|---------|--------|
| `src/components/shared/BrandLogosBar.tsx` | Anadir STEK y Car Care Passion al array de marcas; extender tipo de categorias con 'ppf' |
| `src/components/layout/Footer.tsx` | Anadir logo de Car Care Passion como partner oficial |
| `src/pages/JornadaCero.tsx` | Anadir seccion de partners con los 3 logos antes del footer |
| `src/pages/UpDetail.tsx` | Anadir seccion de partners con los 3 logos antes del footer |

## Detalles de diseno

- Todos los logos se renderizan con `brightness-0 invert` para integrarse con el tema oscuro
- En el Footer, Car Care Passion se muestra a un tamano discreto (h-6) con texto "Partner oficial"
- En las secciones de partners de Jornada Zero y Up Detail, los logos se muestran en una fila centrada con un titulo "Nuestros Partners y Colaboradores"
- El logo de STEK puede necesitar un tratamiento especial ya que parece tener fondo transparente con texto blanco, se verificara visualmente tras la implementacion

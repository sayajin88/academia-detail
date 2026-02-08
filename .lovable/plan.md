

# Plan: Mejora del articulo "Como Montar un Negocio de Detailing Rentable en 2026"

## Objetivo
Expandir el articulo a mas de 800 palabras, anadir tablas visuales para datos numericos (inversion, rentabilidad), mejorar el SEO con keywords estrategicas e internal links, y optimizar la meta descripcion para CTR en SERPs.

## Cambios principales

### 1. Extender la interfaz BlogSection para soportar tablas
Actualmente la interfaz `BlogSection` solo tiene `id`, `title`, `content` y `links`. Para representar datos numericos visualmente, se anadira una propiedad opcional `table` que permite renderizar tablas estilizadas dentro de las secciones.

### 2. Actualizar BlogArticleContent para renderizar tablas
El componente que renderiza el contenido de los articulos se modificara para detectar si una seccion tiene datos de tabla y renderizarlos con un diseno profesional usando los componentes UI de tabla existentes (`src/components/ui/table.tsx`), con estilos que encajen con el tema oscuro del blog.

### 3. Reescribir y expandir el contenido del articulo
El articulo pasara de ~550 palabras a 900+ palabras con:

- **Seccion 1 - Por que el detailing es rentable**: Ampliada con datos de mercado, keywords como "emprender en detailing", "negocio de estetica automotriz", "montar taller detailing"
- **Seccion 2 - Inversion inicial**: Se anade una **tabla visual** con el desglose detallado de inversiones por categoria (local, equipamiento, stock, marketing, reserva), con columnas de rango minimo/maximo y notas
- **Seccion 3 - Servicios y precios**: **Nueva seccion** con una **tabla de servicios** mostrando cada servicio (lavado premium, pulido, ceramico, PPF, wrapping), su coste de material, precio de venta y margen de beneficio
- **Seccion 4 - Ubicacion**: Se mantiene con mejoras en keywords
- **Seccion 5 - Captacion de clientes**: Ampliada con mas detalle sobre marketing digital y keywords como "marketing para detailing", "captar clientes detailing"
- **Seccion 6 - Rentabilidad primer ano**: Ampliada con una **tabla de proyeccion trimestral** (facturacion, gastos, beneficio neto) para los primeros 12 meses
- **Seccion 7 - Formacion profesional**: **Nueva seccion** sobre la importancia de formarse antes de emprender, con enlace interno a las formaciones de Academia Detail

### 4. Anadir enlaces internos (internal links)
Usar el sistema de `[[marcadores]]` y `links` ya existente para anadir enlaces internos al articulo:
- Enlace al curso de detailing (`/formacion/detailing-profesional`)
- Enlace al articulo de PPF (`/blog/ppf-vs-ceramico-proteccion-vehiculo`)
- Enlace al articulo de cuanto gana un detailer (`/blog/cuanto-gana-detailer-profesional-espana`)
- Enlace a la pagina de contacto (`/contacto`)

### 5. Optimizar SEO: meta, tags y excerpt
- **Meta descripcion (excerpt)**: Reescribirla con power words, numeros concretos y CTA: "Monta tu negocio de detailing rentable en 2026. Inversion desde 15.000EUR, margenes del 70% y facturacion de +10.000EUR/mes. Guia paso a paso con tablas de inversion y rentabilidad real."
- **Tags**: Ampliar con keywords de cola larga: "montar negocio detailing", "emprender detailing", "taller estetica automotriz", "inversion detailing", "rentabilidad detailing", "curso detailing profesional", "plan de negocio detailing"
- **readingTime**: Actualizar a "15 min" acorde al contenido expandido

## Detalle tecnico

### Archivos a modificar

1. **`src/data/blogPosts.ts`** (interfaz + contenido del articulo)
   - Extender `BlogSection` anadiendo:
     ```
     table?: {
       headers: string[];
       rows: string[][];
       caption?: string;
     }
     ```
   - Reescribir las secciones del post `como-montar-negocio-detailing-rentable` con contenido expandido, tablas de datos y enlaces internos
   - Actualizar `excerpt`, `tags` y `readingTime`

2. **`src/components/blog/BlogArticleContent.tsx`**
   - Importar componentes de tabla desde `@/components/ui/table`
   - Detectar `section.table` y renderizar una tabla estilizada con fondo sutil, bordes, y texto legible
   - Mantener el renderizado actual de parrafos intacto

### Archivos que NO se tocan
- `src/pages/BlogPost.tsx` - no necesita cambios, ya usa `post.excerpt` como meta description
- `src/components/blog/BlogTableOfContents.tsx` - funciona automaticamente con las nuevas secciones
- `src/data/blogPostsNew.ts` y `src/data/blogPostsBusiness.ts` - otros articulos no cambian

### Tablas que se incluiran

**Tabla 1 - Desglose de inversion inicial:**

| Concepto | Rango minimo | Rango maximo | Notas |
|----------|-------------|-------------|-------|
| Alquiler local (deposito + 3 meses) | 3.000 EUR | 6.000 EUR | Zona industrial recomendada |
| Equipamiento profesional | 4.000 EUR | 8.000 EUR | Pulidoras, aspiradores, vaporizadoras |
| Stock inicial de productos | 2.000 EUR | 4.000 EUR | Compounds, coatings, quimicos |
| Mobiliario y acondicionamiento | 3.000 EUR | 6.000 EUR | Iluminacion, ventilacion, suelo |
| Marketing inicial | 1.500 EUR | 3.000 EUR | Web, redes, material grafico |
| Reserva de tesoreria | 1.500 EUR | 3.000 EUR | Colchon primeros meses |
| **TOTAL** | **15.000 EUR** | **30.000 EUR** | |

**Tabla 2 - Servicios, costes y margenes:**

| Servicio | Coste material | Precio venta | Margen |
|----------|---------------|-------------|--------|
| Lavado premium + descontaminacion | 5-10 EUR | 80-150 EUR | ~90% |
| Pulido correccion completa | 20-35 EUR | 300-500 EUR | ~92% |
| Tratamiento ceramico | 40-60 EUR | 800-1.500 EUR | ~95% |
| PPF frontal completo | 300-500 EUR | 1.500-3.000 EUR | ~80% |
| Car wrapping full body | 800-1.200 EUR | 3.000-5.000 EUR | ~75% |

**Tabla 3 - Proyeccion de rentabilidad primer ano:**

| Periodo | Facturacion mensual | Gastos fijos | Beneficio neto estimado |
|---------|-------------------|-------------|----------------------|
| Meses 1-3 (arranque) | 3.000-5.000 EUR | 2.500-3.500 EUR | 500-1.500 EUR |
| Meses 4-6 (consolidacion) | 6.000-10.000 EUR | 3.000-4.000 EUR | 3.000-6.000 EUR |
| Meses 7-12 (crecimiento) | 10.000-18.000 EUR | 3.500-5.000 EUR | 6.500-13.000 EUR |

### Resultado esperado
- Articulo de 900+ palabras (actualmente ~550)
- 3 tablas visuales profesionales para datos numericos
- SEO reforzado con keywords de alta intencion comercial
- Meta descripcion optimizada para CTR en SERPs
- Enlaces internos para mejorar la estructura de link juice del sitio
- Tiempo de lectura actualizado


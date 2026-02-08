
# Calculadora de Dilucion en Pagina Independiente + Banner en Blog

## Resumen

Mover la calculadora de dilucion a una pagina dedicada con su propia ruta, SEO optimizado con keywords de alta intencion, y contenido educativo complementario. Ademas, insertar un banner/cuadro permanente en todos los articulos del blog que enlace a esta herramienta.

---

## 1. Nueva pagina: `/calculadora-dilucion-detailing`

### Slug elegido

`/calculadora-dilucion-detailing` -- combina los terminos de busqueda principales:
- "calculadora dilucion" (intencion directa de herramienta)
- "detailing" (nicho profesional)

Alternativas descartadas: `/calculadora-mezcla-productos` (menos especifico), `/herramienta-dilucion` (menos buscado).

### SEO Metadata

| Campo | Valor |
|-------|-------|
| **H1** | Calculadora de Dilucion para Productos de Detailing |
| **Title** | Calculadora de Dilucion Detailing Gratis - Ratios de Mezcla Exactos - Academia Detail |
| **Description** | Calcula la dilucion exacta de cualquier producto de car detailing. Ratios de mezcla visual para APC, champu, desengrasante y mas. Herramienta gratuita e interactiva. |
| **Keywords** | calculadora dilucion detailing, ratio mezcla productos limpieza coche, como diluir productos detailing, tabla diluciones detailing, proporcion agua producto limpieza, calculadora mezcla quimica coche |
| **Canonical** | /calculadora-dilucion-detailing |
| **OG Image** | og-image.png (reutilizar la generica) |

### Estructura del contenido de la pagina

La pagina `src/pages/CalculadoraDilucion.tsx` contendra:

1. **Hero compacto** con H1 optimizado y descripcion breve
2. **La calculadora** (componente `VisualDilutionCalculator` existente, sin cambios)
3. **Seccion educativa: "Como Diluir Productos de Detailing"** (H2)
   - Contenido largo (~400 palabras) explicando por que la dilucion correcta importa
   - Subtemas: seguridad, ahorro, proteccion de superficies, eficacia
4. **Tabla de Ratios Comunes por Tipo de Producto** (H2)
   - Tabla HTML con: Tipo de producto | Ratio comun | Uso recomendado
   - Filas: APC multiusos, champu de lavado, desengrasante, iron remover, limpiacristales, abrillantador rapido, limpiador de cuero, etc.
5. **FAQ: Preguntas frecuentes sobre dilucion** (H2)
   - 5-6 preguntas tipo "Que pasa si diluyo demasiado", "Que ratio usar para un APC", etc.
   - Schema FAQPage para rich snippets
6. **CTA final** enlazando a los cursos (reutilizando patron existente)

### Schema JSON-LD

- **WebApplication** schema (tipo SoftwareApplication/WebApplication) para que Google entienda que es una herramienta interactiva
- **FAQPage** schema con las preguntas frecuentes
- **BreadcrumbList**: Inicio > Glosario > Calculadora de Dilucion
- **LocalBusiness** (reutilizado)

### Archivo nuevo

`src/pages/CalculadoraDilucion.tsx`

---

## 2. Configuracion de ruta en App.tsx

Anadir la nueva ruta:

```text
<Route path="/calculadora-dilucion-detailing" element={<CalculadoraDilucion />} />
```

Posicion: justo despues de la ruta del glosario.

---

## 3. SEO Config en seoConfig.ts

Anadir nueva entrada `calculadoraDilucion` al objeto `seoConfig` con todos los metadatos, schemas y breadcrumbs.

Tambien actualizar el `URL_NAME_MAP` en `SEO.tsx` para incluir el nuevo slug.

---

## 4. Actualizacion del Glosario

En `src/pages/Glossary.tsx`:

- **Eliminar** la seccion de la calculadora embebida (lineas 140-145)
- **Reemplazar** con un banner/enlace que diga: "Usa nuestra Calculadora de Dilucion interactiva" con enlace a la nueva pagina
- Esto mantiene el flujo del glosario limpio y dirige trafico a la pagina dedicada

---

## 5. Banner permanente en articulos del Blog

### Nuevo componente: `src/components/blog/BlogDilutionBanner.tsx`

Un cuadro visual compacto que se insertara en todos los articulos del blog. Diseno:

```text
+---------------------------------------------------+
|  [Icono Beaker]                                    |
|  Herramienta Gratuita                              |
|  Calculadora de Dilucion                           |
|  Calcula la mezcla exacta de cualquier producto    |
|  de detailing con nuestra herramienta interactiva  |
|  [Boton: Usar Calculadora -->]                     |
+---------------------------------------------------+
```

- Estilo: `bg-card/50 border border-border rounded-xl` con icono y enlace interno
- Responsive: se adapta a movil
- Enlace interno `follow` a `/calculadora-dilucion-detailing`

### Integracion en BlogPost.tsx

Insertar `<BlogDilutionBanner />` justo despues del contenido del articulo y antes de los tags, en `src/pages/BlogPost.tsx` (linea ~183 aprox, entre `BlogArticleContent` y el bloque de tags).

---

## 6. Sitemap

Anadir la nueva URL al `public/sitemap.xml`:

```text
<url>
  <loc>https://academiadetail.com/calculadora-dilucion-detailing</loc>
  <lastmod>2026-02-08</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

---

## Resumen de archivos

| Archivo | Accion | Descripcion |
|---------|--------|-------------|
| `src/pages/CalculadoraDilucion.tsx` | Crear | Pagina dedicada con hero, calculadora, contenido SEO, tabla, FAQ y CTA |
| `src/components/blog/BlogDilutionBanner.tsx` | Crear | Banner compacto para enlazar la calculadora desde el blog |
| `src/App.tsx` | Modificar | Anadir ruta `/calculadora-dilucion-detailing` |
| `src/utils/seoConfig.ts` | Modificar | Anadir configuracion SEO de la calculadora |
| `src/components/SEO.tsx` | Modificar | Anadir slug al URL_NAME_MAP |
| `src/pages/Glossary.tsx` | Modificar | Reemplazar calculadora embebida por enlace a la pagina dedicada |
| `src/pages/BlogPost.tsx` | Modificar | Insertar BlogDilutionBanner en todos los articulos |
| `public/sitemap.xml` | Modificar | Anadir nueva URL |

## Contenido educativo de la pagina (Estructura H)

```text
H1: Calculadora de Dilucion para Productos de Detailing
  [Calculadora interactiva]

H2: Como Diluir Productos de Detailing Correctamente
  H3: Por que importa la dilucion exacta
  H3: Consecuencias de una dilucion incorrecta

H2: Tabla de Ratios de Dilucion por Producto
  [Tabla con 8-10 productos comunes]

H2: Preguntas Frecuentes sobre Dilucion de Productos
  - Que pasa si diluyo demasiado un producto?
  - Cual es el ratio mas comun para un APC?
  - Puedo mezclar productos de distintas marcas?
  - Como medir las cantidades sin instrumentos?
  - Se puede guardar un producto ya diluido?
```

## Resultado esperado

- Pagina independiente que puede posicionar para "calculadora dilucion detailing", "ratio mezcla productos limpieza coche", "como diluir productos detailing"
- Contenido educativo largo que refuerza la autoridad tematica
- FAQ con schema para rich snippets en Google
- Todos los articulos del blog enlazan a la herramienta (link juice + descubrimiento)
- El glosario mantiene un enlace visible pero sin duplicar la herramienta completa

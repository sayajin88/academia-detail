

# Glosario de Detailing Profesional - Plan de Implementacion

## Objetivo

Crear una pagina completa de glosario con mas de 80 terminos profesionales de detailing, buscador en tiempo real, navegacion alfabetica lateral, filtros por categoria y SEO optimizado para posicionar como recurso de referencia en el sector.

## Diseno y UX

Basado en la imagen de referencia proporcionada, la pagina incluira:

- **Hero** con titulo "Glosario de Detallado" y subtitulo descriptivo
- **Buscador** central con placeholder tipo "Busca un termino (ej. PPF, Clay Bar...)"
- **Filtros por categoria**: Todos, Exterior, Interior, Protecciones, Herramientas, Quimicos, Tecnicas
- **Navegacion alfabetica** lateral fija (A, B, C, D... visible en desktop)
- **Tarjetas de terminos** agrupadas por letra, cada una mostrando:
  - Nombre del termino (negrita)
  - Badge de categoria (color segun tipo)
  - Definicion completa
- **Seccion educativa introductoria** con articulos breves sobre pintura, pH, descontaminacion, etc. (extraidos del documento)

## Estructura de Datos

### Archivo: `src/data/glossaryData.ts`

Contendra todos los terminos estructurados con la siguiente interfaz:

```text
interface GlossaryTerm {
  term: string;           // "Clay Bar"
  termEn?: string;        // Nombre en ingles si aplica
  definition: string;     // Definicion completa
  category: GlossaryCategory;
  letter: string;         // "C"
}

type GlossaryCategory = 
  | 'exterior'      // Lavado, pintura, correcciones
  | 'interior'      // Limpieza interior, tapicerias
  | 'protecciones'  // Coatings, ceras, selladores, PPF
  | 'herramientas'  // Pulidoras, pads, toallas
  | 'quimicos'      // pH, productos, APC
  | 'tecnicas';     // Procesos, metodos
```

Los terminos se extraeran del documento proporcionado (80+ terminos de la A a la W):
- A: Abrasividad, Acid Rain, Adhesion, Agitacion, AIO, Alcalino, Alcantara, APC, Applicator (9)
- B: Backing Plate, Base Coat, Beading, Biodegradable, Bird Dropping Etching, Brake Dust, Buffing, Burn (8)
- C: Carnauba, Ceramic Coating, Cerium Oxide, Clay Bar, Clear Coat, Compound, Contaminacion Ferrica, Correction (8)
- D: DA, Decontamination, Degreaser, Detailing, Dressing, Dry Aid, Drying Towel (7)
- E: Enzyme Cleaner, Etching (2)
- F: Fillers, Finishing, Flash Time, Foam Cannon, Forced Rotation (5)
- G: Glaze, Graphene, Grit Guard, GSM (4)
- H: Haze, High Spots, Hologramas, Hydrophobic (4)
- I: IPA, Iron Remover (2)
- J: Jewelling (1)
- K: (ninguno)
- L: LSP, Lubricante (2)
- M: Marring, Microfibra, Mohs (3)
- O: Orange Peel, Orbital, Oxidacion, Ozono (4)
- P: Pad, Paint Correction, Paint Transfer, pH Neutro, Polish, Polimero, PPF (7)
- Q: Quick Detailer (1)
- R: Rail Dust, Recubrimiento Ceramico, RIDS, Rotativa (4)
- S: Sealant, Sheeting, SiO2, Snow Foam, Swirl Marks (5)
- T: Tensioactivo, Tire Dressing, Tornador, Two Bucket Method (4)
- U: UV (1)
- V: Vinyl Protectant (1)
- W: Water Spots, Wax, Wet Look, Wet Sanding, Wheel Cleaner (5)

Total: ~87 terminos

### Secciones educativas (del prologo del documento)

Se incluiran como tarjetas destacadas al inicio, antes del glosario alfabetico:
1. Morfologia de la Pintura Moderna (capas: imprimacion, base coat, barniz)
2. Quimica de Superficies: pH y Tensioactivos (tabla de pH)
3. Descontaminacion: Quimica y Mecanica
4. Ingenieria de la Correccion de Pintura
5. Nanotecnologia en Proteccion (SiO2, SiC, Grafeno)
6. Detallado de Interiores y Sanitizacion

## Componentes a Crear

### 1. `src/pages/Glossary.tsx`
Pagina principal del glosario con:
- SEO component con schema DefinedTermSet + BreadcrumbList
- MainLayout
- Hero con titulo y subtitulo
- Buscador integrado
- Filtros de categoria (chips)
- Seccion educativa colapsable (opcional, visible bajo demanda)
- Grid de terminos agrupados por letra con scroll alfabetico
- Navegacion lateral alfabetica (desktop)

### 2. `src/components/glossary/GlossaryHero.tsx`
Hero con:
- Badge "Glosario Profesional"
- H1: "Glosario de Detallado Profesional"
- Subtitulo: "Domina el lenguaje tecnico del Car Detailing. Desde PPF hasta descontaminacion quimica."
- Buscador central integrado
- Filtros de categoria

### 3. `src/components/glossary/GlossarySearch.tsx`
Reutiliza el patron de `BlogSearch.tsx`:
- Input con icono de busqueda
- Debounce de 300ms
- Boton para limpiar la busqueda
- Placeholder "Busca un termino (ej. PPF, Clay Bar...)"

### 4. `src/components/glossary/GlossaryCategoryFilters.tsx`
Chips de filtro por categoria:
- Todos (default)
- Exterior, Interior, Protecciones, Herramientas, Quimicos, Tecnicas
- Cada uno con icono y color acorde

### 5. `src/components/glossary/GlossaryAlphabetNav.tsx`
Navegacion lateral fija (sticky sidebar en desktop):
- Letras A-Z
- Click en letra hace scroll hasta la seccion correspondiente
- Letra activa destacada con color primary
- En mobile, se muestra como barra horizontal scrollable

### 6. `src/components/glossary/GlossaryTermCard.tsx`
Tarjeta individual de termino:
- Nombre del termino (H3, bold)
- Badge de categoria con color
- Definicion completa
- Fondo bg-card con borde sutil

### 7. `src/components/glossary/GlossaryGrid.tsx`
Grid de terminos agrupados por letra:
- Cada grupo tiene header con la letra (H2 grande)
- Linea separadora
- Grid responsive: 1 columna en movil, 2 en desktop
- ID anchor por letra para la navegacion alfabetica (#letra-A, #letra-B, etc.)

## Archivos a Modificar

### 1. `src/App.tsx`
- Importar nueva pagina Glossary
- Anadir ruta `/glosario-detailing`

### 2. `src/components/layout/Navbar.tsx`
- Anadir "Glosario" al array `navLinks` con icono `BookOpen` (o `Search`)

### 3. `src/components/layout/Footer.tsx`
- Anadir enlace al glosario en la seccion "Navegacion"

### 4. `src/utils/seoConfig.ts`
- Anadir configuracion SEO para la pagina del glosario

### 5. `public/sitemap.xml`
- Anadir URL del glosario

## Estrategia SEO

### Meta Tags

```text
title: "Glosario de Detailing 2026 | +80 Terminos Profesionales | Academia Detail"
description: "Domina el vocabulario del detailing profesional. +80 terminos con definiciones: PPF, coating ceramico, clay bar, swirl marks y mas. Guia de referencia."
keywords: "glosario detailing, terminologia detailing, diccionario car detailing, que es PPF, que es coating ceramico, terminos detailing profesional"
```

### Schema.org - DefinedTermSet

Se implementara un schema `DefinedTermSet` con `DefinedTerm` para cada entrada del glosario. Esto ayuda a Google a entender la naturaleza de diccionario/glosario de la pagina y puede generar rich snippets de definicion.

```text
{
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "name": "Glosario de Detailing Profesional",
  "description": "Diccionario enciclopedico de terminos tecnicos de detallado automotriz",
  "definedTerm": [
    {
      "@type": "DefinedTerm",
      "name": "Clay Bar",
      "description": "Barra de arcilla sintetica..."
    },
    ...
  ]
}
```

### URL y Slug
- Ruta: `/glosario-detailing`
- Canonical: `https://academiadetail.com/glosario-detailing`

### Internal Linking
- Links desde blog posts relacionados hacia terminos especificos
- Cada termino puede ser enlazado con anchors (#letra-C)

## Resumen de archivos

| Archivo | Tipo | Descripcion |
|---------|------|-------------|
| `src/data/glossaryData.ts` | Nuevo | 87+ terminos + secciones educativas |
| `src/pages/Glossary.tsx` | Nuevo | Pagina principal del glosario |
| `src/components/glossary/GlossaryHero.tsx` | Nuevo | Hero con buscador y filtros |
| `src/components/glossary/GlossarySearch.tsx` | Nuevo | Buscador con debounce |
| `src/components/glossary/GlossaryCategoryFilters.tsx` | Nuevo | Chips de filtro por categoria |
| `src/components/glossary/GlossaryAlphabetNav.tsx` | Nuevo | Navegacion lateral alfabetica |
| `src/components/glossary/GlossaryTermCard.tsx` | Nuevo | Tarjeta individual de termino |
| `src/components/glossary/GlossaryGrid.tsx` | Nuevo | Grid agrupado por letra |
| `src/App.tsx` | Modificar | Anadir ruta /glosario-detailing |
| `src/components/layout/Navbar.tsx` | Modificar | Anadir link "Glosario" |
| `src/components/layout/Footer.tsx` | Modificar | Anadir link "Glosario" |
| `src/utils/seoConfig.ts` | Modificar | Anadir config SEO glosario |
| `public/sitemap.xml` | Modificar | Anadir URL del glosario |

## Resultado Esperado

- Pagina profesional con +87 terminos de detailing navegables y buscables
- SEO optimizado con schema DefinedTermSet para rich snippets de definicion
- Buscador instantaneo con filtros por categoria
- Navegacion alfabetica fluida con scroll suave
- Diseno coherente con el resto de la web (tema oscuro, burdeos, tarjetas)
- Posicionamiento para busquedas tipo "que es PPF", "glosario detailing", "terminologia car wrapping"




# Anadir Schema FAQ Dinamico a Paginas que lo Necesitan

## Situacion Actual

Las paginas de cursos individuales (Detailing, Wrapping, PPF, Restauracion) y la Home **ya incluyen** el schema `FAQPage` correctamente via `generateFAQSchema()`. Sin embargo, hay **2 paginas** con secciones de preguntas frecuentes visibles que **no tienen** el schema JSON-LD correspondiente:

1. **Carrera Detailing** (`/formacion-profesional-detailing`) -- Tiene el componente `CarreraFAQ` con FAQs de `carreraDetailingData.faqs`, pero su config SEO en `seoConfig.carreraDetailing` no incluye `generateFAQSchema()`
2. **Jornada Zero** (`/jornada-zero-detailing`) -- Tiene el componente `<FAQ />` con 10 preguntas hardcodeadas, pero su config SEO en `seoConfig.jornadaCero` no incluye `generateFAQSchema()`

## Plan de Implementacion

### Paso 1: Carrera Detailing -- Anadir FAQ schema

Modificar `src/utils/seoConfig.ts` en la seccion `carreraDetailing` (linea ~758) para importar `carreraDetailingData` y anadir `generateFAQSchema(carreraDetailingData.faqs)` al array de schemas.

### Paso 2: Jornada Zero -- Anadir FAQ schema

Las FAQs de Jornada Zero estan hardcodeadas dentro de `src/components/FAQ.tsx`. Para reutilizarlas:

- Exportar el array `faqs` desde `src/components/FAQ.tsx` (actualmente es una constante local)
- Importar ese array en `src/utils/seoConfig.ts` y anadir `generateFAQSchema(jornadaCeroFaqs)` al array de schemas de `seoConfig.jornadaCero`

## Detalles Tecnicos

### Archivos a modificar:
1. **`src/utils/seoConfig.ts`** -- Anadir `generateFAQSchema()` a los schemas de `carreraDetailing` y `jornadaCero`
2. **`src/components/FAQ.tsx`** -- Exportar el array `faqs` para que sea importable desde seoConfig

### Sin nuevas dependencias
### Sin cambios en base de datos
### Sin cambios visuales -- solo metadata invisible para Google

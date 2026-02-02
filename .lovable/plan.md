

## Plan: Optimización SEO con Palabras Clave de Alto Volumen

### RESUMEN

Integrar de forma sutil y natural las siguientes palabras clave de alto volumen de búsqueda en toda la web:

**Keywords Principales:**
- Curso de pulido
- Curso de tratamiento cerámico
- Cómo montar negocio de detailing
- Cómo montar lavadero de coches
- Curso de pulido de coches
- Formación en detailing
- Escuela de detailing
- Curso de ceramica para coches

**Keywords Secundarias (alto volumen):**
- Cómo abrir un lavadero de coches
- Montar centro de detailing
- Cuánto cuesta montar un lavadero
- Curso de corrección de pintura
- Certificación detailing España
- Aprender detailing desde cero
- Negocio de lavado de coches rentable

---

### AUDITORÍA DE ENCABEZADOS H1/H2/H3 Y CORRECCIONES

#### Home Page (src/components/home/)

| Componente | Actual | Propuesto (con keyword) |
|------------|--------|-------------------------|
| **HomeHero.tsx** H1 | "No Enseñamos a Lavar Coches, Formamos Empresarios del Detailing" | "Cursos de Detailing Profesional: De Principiante a Empresario" *(H1 con keyword principal)* |
| **FormationsGrid** H2 | "ELIGE TU FORMACIÓN" | "Cursos de Detailing, Pulido y Tratamiento Cerámico" |
| **CompetitiveComparison** H2 | "Por qué los profesionales eligen Academia Detail" | "Por Qué Elegir Nuestra Escuela de Detailing" |
| **BusinessSkillsSection** H2 | "Mentalidad de Empresario" | "Cómo Montar un Negocio de Detailing Rentable" |
| **CarreraNegocioSection** H2 | "De Principiante a Empresario" | "Formación Completa: De Cero a Montar Tu Centro de Detailing" |
| **MontamosTuCentro** H2 | "Te Ayudamos a Montar Tu Centro" | "Te Ayudamos a Montar Tu Lavadero de Coches Profesional" |
| **InstructorSection** H2 | "Tu Formador" | "Aprende Detailing con Profesionales en Activo" |
| **HomeFAQ** H2 | "Preguntas Frecuentes" | "Preguntas Frecuentes sobre Cursos de Detailing" |

---

### CAMBIOS POR ARCHIVO

#### 1. src/components/home/HomeHero.tsx

**Cambios en H1 y copy:**

```tsx
// Antes:
<h1>No Enseñamos a Lavar Coches, Formamos Empresarios del Detailing</h1>

// Después:
<h1>Cursos de Detailing, Pulido y Tratamiento Cerámico en España</h1>
```

**Subtítulo optimizado:**
```tsx
// Antes:
"Olvida las aulas vacías y la teoría sin práctica..."

// Después:
"Aprende detailing desde cero en un taller 100% real. Domina el pulido de coches, tratamiento cerámico y monta tu propio negocio de detailing con mentalidad empresarial."
```

---

#### 2. src/components/home/FormationsGrid.tsx

**Cambios en SectionHeading:**

```tsx
// Antes:
title="ELIGE TU FORMACIÓN"
subtitle="Cursos intensivos y 100% prácticos..."

// Después:
title="Cursos de Detailing, Pulido y Protección Cerámica"
subtitle="Formación profesional para aprender detailing desde cero: curso de pulido de coches, tratamiento cerámico, vinilado y PPF"
```

---

#### 3. src/components/home/CompetitiveComparison.tsx

**Cambios en SectionHeading:**

```tsx
// Antes:
title="Por qué los profesionales eligen Academia Detail"

// Después:
title="La Mejor Escuela de Detailing en España"
subtitle="Comparativa: Por qué elegir nuestra formación en detailing frente a otras academias"
```

---

#### 4. src/components/home/BusinessSkillsSection.tsx

**Cambios en H2:**

```tsx
// Antes:
<h2>Mentalidad de Empresario</h2>

// Después:
<h2>Cómo Montar un Negocio de Detailing Rentable</h2>
```

**Nuevo párrafo en descripción:**
```tsx
"Te enseñamos todo lo que necesitas saber para montar tu lavadero de coches profesional: cálculo de márgenes, captación de clientes VIP y escalado del negocio."
```

---

#### 5. src/components/home/CarreraNegocioSection.tsx

**Cambios en H2:**

```tsx
// Antes:
<h2>De Principiante a Empresario</h2>

// Después:
<h2>Formación Completa para Montar Tu Centro de Detailing</h2>
```

**Descripción optimizada:**
```tsx
"El programa más completo de España para aprender detailing desde cero y montar tu propio lavadero de coches profesional. Incluye curso de pulido, tratamiento cerámico, wrapping y PPF."
```

---

#### 6. src/components/home/MontamosTuCentro.tsx

**Cambios en SectionHeading:**

```tsx
// Antes:
title="Te Ayudamos a Montar Tu Centro"
subtitle="De alumno a empresario: acompañamiento completo..."

// Después:
title="Cómo Montar un Lavadero de Coches Profesional"
subtitle="Te acompañamos en todo el proceso: desde aprender detailing hasta abrir tu centro y conseguir tus primeros clientes"
```

---

#### 7. src/components/home/InstructorSection.tsx

**Cambios en SectionHeading:**

```tsx
// Antes:
title="Tu Formador"

// Después:
title="Aprende Detailing con Profesionales en Activo"
subtitle="Formadores que viven del detailing, no solo de enseñar"
```

---

#### 8. src/components/home/HomeFAQ.tsx

**Cambios en SectionHeading:**

```tsx
// Antes:
title="Preguntas Frecuentes"

// Después:
title="Preguntas Frecuentes sobre Cursos de Detailing"
subtitle="Todo lo que necesitas saber antes de formarte en pulido, tratamiento cerámico y negocio de detailing"
```

**Nuevas FAQs con keywords:**

```tsx
{
  question: "¿Qué incluye el curso de pulido de coches?",
  answer: "Nuestro curso de pulido de coches cubre todas las técnicas: pulido con rotativa, roto-orbital, corrección de pintura en múltiples pasos, identificación de defectos y selección de pads y compounds. Aprenderás a conseguir acabados de concurso."
},
{
  question: "¿Qué es un curso de tratamiento cerámico?",
  answer: "El curso de tratamiento cerámico te enseña a aplicar protecciones cerámicas profesionales: preparación de superficie, técnicas de aplicación, tiempos de curado y mantenimiento. Es uno de los servicios más rentables del sector."
},
{
  question: "¿Es rentable montar un lavadero de coches?",
  answer: "Sí, montar un lavadero de coches profesional puede ser muy rentable. La inversión inicial varía entre 15.000€ y 50.000€, y nuestros alumnos facturan entre 3.000€ y 8.000€ mensuales. Te enseñamos cómo montar un negocio de detailing paso a paso."
}
```

---

#### 9. src/data/formationDetails.ts (Curso Detailing)

**Cambios en título y descripción:**

```tsx
// Antes:
title: 'Curso de Detailing Profesional: Certificación y Carrera de Especialista'
description: 'Curso de detailing profesional 100% práctico de 4 días...'

// Después:
title: 'Curso de Pulido y Tratamiento Cerámico: Certificación Profesional'
description: 'Curso de pulido de coches y tratamiento cerámico profesional de 4 días. Aprende corrección de pintura, protección cerámica y detallado interior. La mejor escuela de detailing en España con formación 100% práctica en taller real.'
```

**Nuevo campo heroDescription:**
```tsx
heroDescription: 'Formación intensiva en pulido de coches y tratamiento cerámico. Domina las técnicas de corrección de pintura, aplicación de cerámicos y detallado profesional. Aprende detailing desde cero y prepárate para montar tu negocio.'
```

---

#### 10. src/utils/seoConfig.ts

**Keywords actualizados por página:**

```tsx
home: {
  keywords: "curso detailing, curso de pulido de coches, curso tratamiento cerámico, escuela de detailing, cómo montar negocio detailing, cómo montar lavadero de coches, formación detailing España, aprender detailing desde cero, curso corrección pintura",
  title: "Cursos de Detailing y Pulido de Coches | Escuela de Detailing España",
  description: "✅ Cursos de pulido de coches y tratamiento cerámico 100% prácticos. Aprende detailing desde cero y monta tu propio lavadero de coches. ⭐ La mejor escuela de detailing en España."
}

carreraDetailing: {
  keywords: "formación profesional detailing, cómo montar centro detailing, cómo montar lavadero de coches profesional, abrir negocio detailing, curso completo detailing, emprender lavadero rentable",
  title: "Cómo Montar un Lavadero de Coches | Formación Completa Detailing",
  description: "🔥 Aprende a montar tu lavadero de coches profesional. Formación completa en detailing + módulo de negocio. Curso de pulido, tratamiento cerámico, PPF y wrapping."
}
```

---

#### 11. src/components/formation/FormationHero.tsx

**Añadir H2 semántico:**

```tsx
// Después del H1 del título del curso, añadir:
<h2 className="sr-only">
  {formation.slug === 'curso-detailing-profesional' 
    ? 'Curso de pulido de coches y tratamiento cerámico profesional'
    : formation.subtitle}
</h2>
```

---

#### 12. src/components/carrera/CarreraHero.tsx

**Cambios en H1:**

```tsx
// Antes:
<h1>CARRERA DETAILING</h1>

// Después:
<h1>
  <span>CARRERA</span>
  <span>DETAILING</span>
</h1>
<h2 className="sr-only">Cómo montar un lavadero de coches profesional - Formación completa</h2>
```

---

### RESUMEN DE ARCHIVOS A MODIFICAR

| Archivo | Tipo de Cambio |
|---------|----------------|
| `src/components/home/HomeHero.tsx` | H1 + copy |
| `src/components/home/FormationsGrid.tsx` | H2 + subtítulo |
| `src/components/home/CompetitiveComparison.tsx` | H2 + subtítulo |
| `src/components/home/BusinessSkillsSection.tsx` | H2 + descripción |
| `src/components/home/CarreraNegocioSection.tsx` | H2 + descripción |
| `src/components/home/MontamosTuCentro.tsx` | H2 + subtítulo |
| `src/components/home/InstructorSection.tsx` | H2 + subtítulo |
| `src/components/home/HomeFAQ.tsx` | H2 + 3 nuevas FAQs |
| `src/components/shared/SectionHeading.tsx` | Verificar H2 semántico |
| `src/data/formationDetails.ts` | Títulos y descripciones |
| `src/utils/seoConfig.ts` | Keywords y meta descriptions |
| `src/components/formation/FormationHero.tsx` | H2 semántico |
| `src/components/carrera/CarreraHero.tsx` | H2 semántico |

---

### ESTRUCTURA DE HEADINGS CORREGIDA

```text
HOME PAGE:
├── H1: "Cursos de Detailing, Pulido y Tratamiento Cerámico en España"
├── H2: "Cursos de Detailing, Pulido y Protección Cerámica"
├── H2: "La Mejor Escuela de Detailing en España"
├── H2: "Cómo Montar un Negocio de Detailing Rentable"
├── H2: "Formación Completa para Montar Tu Centro de Detailing"
├── H2: "Cómo Montar un Lavadero de Coches Profesional"
├── H2: "Aprende Detailing con Profesionales en Activo"
├── H2: "Preguntas Frecuentes sobre Cursos de Detailing"
└── H2: "Reserva Tu Plaza"

CURSO DETAILING PAGE:
├── H1: "Curso de Pulido y Tratamiento Cerámico: Certificación Profesional"
├── H2: "Ventajas de Nuestra Formación"
├── H2: "Qué Aprenderás"
├── H2: "Programa del Curso"
├── H2: "Preguntas Frecuentes"
└── H2: "Reserva Tu Plaza"

CARRERA DETAILING PAGE:
├── H1: "CARRERA DETAILING"
├── H2 (sr-only): "Cómo montar un lavadero de coches profesional"
├── H2: "Módulo de Negocio"
├── H2: "Timeline de Formación"
├── H2: "Tu Inversión"
└── H2: "Preguntas Frecuentes"
```

---

### DENSIDAD DE KEYWORDS OBJETIVO

| Keyword | Páginas donde aparecerá | Densidad |
|---------|------------------------|----------|
| "curso de pulido" | Home, Detailing, SEO | 3-5 veces |
| "tratamiento cerámico" | Home, Detailing, SEO | 3-5 veces |
| "montar negocio detailing" | Home, Carrera, Business | 2-4 veces |
| "montar lavadero de coches" | Home, Carrera, MontamosTuCentro | 2-4 veces |
| "escuela de detailing" | Home, Comparison, SEO | 2-3 veces |
| "aprender detailing" | Home, Hero, FAQs | 3-4 veces |

---

### RESULTADO ESPERADO

1. **Mejor posicionamiento orgánico** para keywords de alto volumen
2. **Estructura de headings correcta** para SEO on-page
3. **Copy natural y persuasivo** sin keyword stuffing
4. **Meta descriptions optimizadas** para CTR en SERPs
5. **FAQs enriquecidas** con keywords long-tail




## Plan: Añadir Mensaje de Centro 100% Neutral e Independiente

### RESUMEN

El objetivo es comunicar que Detail Park Academy es un centro **100% neutral** que trabaja con todo tipo de marcas sin compromisos comerciales, permitiendo elegir siempre la mejor combinación de productos para cada situación.

---

### COPY PROPUESTO

**Mensaje principal:**
> "Centro 100% Independiente: No representamos a ninguna marca. Trabajamos con los mejores productos del mercado sin ataduras comerciales, eligiendo siempre lo que realmente funciona."

**Variaciones para diferentes contextos:**

| Contexto | Copy |
|----------|------|
| Ventaja corta | "Centro 100% neutral y sin ataduras" |
| FAQ | "¿Trabajáis con alguna marca en concreto?" → "No. Somos un centro 100% independiente..." |
| Beneficio | "Aprende sin sesgos comerciales" |
| Comparativa | "La competencia: Formadores patrocinados por marcas" vs "Academia Detail: Centro neutral, elegimos lo mejor" |

---

### CAMBIOS DETALLADOS

#### 1. Nuevo Icono y Ventaja en formationDetails.ts

**Ubicación:** Array `advantages` de cada formación (detailing, wrapping, ppf, restauración)

**Nuevo item:**
```typescript
{ icon: 'ScaleIcon', title: 'Centro 100% neutral: Sin ataduras a marcas' }
```

**Archivos:** `src/data/formationDetails.ts` - Añadir a las 4 formaciones

---

#### 2. Actualizar FormationAdvantages.tsx

**Cambio:** Añadir el icono `Scale` al iconMap para representar neutralidad/balance

**Archivo:** `src/components/formation/FormationAdvantages.tsx`

---

#### 3. Nuevo Beneficio en FormationPricing.tsx

**Ubicación:** Array `benefits` (lista de lo que incluye)

**Nuevo item:**
```typescript
{ 
  icon: Scale, 
  text: "Formación 100% neutral", 
  description: "Sin ataduras a marcas: Aprende a elegir lo mejor" 
}
```

**Archivo:** `src/components/formation/FormationPricing.tsx`

---

#### 4. Nueva Fila en CompetitiveComparison.tsx

**Ubicación:** Array `comparisonData`

**Nueva comparación:**
```typescript
{
  aspect: "Productos",
  competition: "Patrocinados por marcas específicas",
  academiaDetail: "100% neutral: Elegimos lo que funciona",
  icon: Scale
}
```

**Archivo:** `src/components/home/CompetitiveComparison.tsx`

---

#### 5. Nueva FAQ en formationDetails.ts

**Ubicación:** Array `faqs` de cada formación

**Nueva pregunta:**
```typescript
{
  question: "¿Trabajáis con alguna marca específica?",
  answer: "No. Somos un centro 100% independiente y neutral. No tenemos ataduras comerciales con ninguna marca, lo que nos permite enseñarte a elegir los mejores productos del mercado según cada situación. Trabajamos con marcas líderes como Koch Chemie, Gyeon, Sonax, Meguiar's, 3M, XPEL y muchas más, siempre eligiendo lo que realmente funciona."
}
```

**Archivo:** `src/data/formationDetails.ts` - Añadir a las 4 formaciones

---

#### 6. Nuevo Texto en FormationIncludes Bonus

**Ubicación:** Sección Bonus Exclusivo

**Añadir párrafo:**
```typescript
"Además, al ser un centro 100% independiente, aprenderás a evaluar productos de forma objetiva, sin sesgos comerciales."
```

**Archivo:** `src/components/formation/FormationIncludes.tsx`

---

#### 7. Mención en HomeFAQ.tsx

**Ubicación:** Array de FAQs de la home

**Nueva pregunta:**
```typescript
{
  question: "¿Estáis asociados a alguna marca de productos?",
  answer: "No, somos 100% independientes. No representamos a ninguna marca comercial, lo que nos permite elegir siempre los mejores productos para cada situación sin compromisos. Trabajamos con las marcas líderes del sector (Koch Chemie, Gyeon, 3M, XPEL, etc.) pero nuestra formación es completamente neutral y objetiva."
}
```

**Archivo:** `src/components/home/HomeFAQ.tsx`

---

### ARCHIVOS A MODIFICAR

| Archivo | Cambio |
|---------|--------|
| `src/data/formationDetails.ts` | Añadir ventaja y FAQ de neutralidad a las 4 formaciones |
| `src/components/formation/FormationAdvantages.tsx` | Añadir icono Scale al iconMap |
| `src/components/formation/FormationPricing.tsx` | Añadir beneficio de neutralidad |
| `src/components/home/CompetitiveComparison.tsx` | Añadir fila de comparación sobre productos |
| `src/components/formation/FormationIncludes.tsx` | Ampliar texto del Bonus |
| `src/components/home/HomeFAQ.tsx` | Añadir pregunta sobre independencia |

---

### RESULTADO VISUAL

**En FormationAdvantages (iconos):**
```
[Certificado] [Soporte] [Personalizado] [Taller Real] [Empleo] [100% Neutral]
```

**En Competitive Comparison (nueva fila):**
```
❌ Patrocinados por marcas  |  [Scale] Productos  |  ✓ 100% neutral: Elegimos lo mejor
```

**En FormationPricing (nuevo beneficio):**
```
✓ Formación 100% neutral
  Sin ataduras a marcas: Aprende a elegir lo mejor
```

**En FAQs:**
```
P: ¿Trabajáis con alguna marca específica?
R: No. Somos un centro 100% independiente...
```

---

### BENEFICIOS DE ESTA IMPLEMENTACIÓN

1. **Diferenciación clara** - La mayoría de academias están patrocinadas
2. **Confianza del alumno** - Sabe que aprenderá de forma objetiva
3. **Valor añadido** - Aprende a elegir productos por mérito, no por marketing
4. **SEO** - Nuevas keywords: "formación detailing independiente", "curso sin marcas"
5. **Consistencia** - Mensaje presente en toda la web de forma natural


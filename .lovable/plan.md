
## Plan: Corrección de Errores de Accesibilidad

### PROBLEMAS IDENTIFICADOS

| Problema | Archivo(s) | Impacto |
|----------|------------|---------|
| **ARIA Prohibidos** | TestimonialsSection.tsx, InstructorProfile.tsx | Impide lectura por tecnologías asistenciales |
| **Contraste Insuficiente** | SectionHeading.tsx, MontamosTuCentro.tsx, TestimonialsSection.tsx, SuccessStoriesLogos.tsx | Textos difíciles/imposibles de leer |
| **Encabezados Desordenados** | SuccessStoriesLogos.tsx | Rompe estructura semántica |

---

### CORRECCIÓN 1: ARIA Prohibidos en Ratings

El problema es que `aria-label` no es válido en elementos `<div>` con microdata. La solución es añadir `role="img"` para que `aria-label` sea válido.

**Archivo:** `src/components/home/TestimonialsSection.tsx`

```tsx
// Línea 153: Añadir role="img"
<div 
  className="flex items-center gap-1" 
  role="img"
  aria-label={`Valoración media: ${averageRating} de 5 estrellas`}
>

// Línea 183-188: Añadir role="img"
<div 
  className="flex gap-1 mb-4" 
  itemProp="reviewRating" 
  itemScope 
  itemType="https://schema.org/Rating"
  role="img"
  aria-label={`Valoración: ${testimonial.rating} de 5 estrellas`}
>
```

**Archivo:** `src/components/InstructorProfile.tsx`

```tsx
// Línea 133: Añadir role="img"
<div 
  className="flex" 
  role="img"
  aria-label="Valoración 4.9 de 5 estrellas"
>
```

---

### CORRECCIÓN 2: Contraste de Color Insuficiente

El problema principal es `text-primary bg-primary/10` - el rojo (#E52B09) sobre fondo rojo claro tiene ratio de contraste muy bajo (~2.5:1 vs 4.5:1 requerido).

**Solución A: Oscurecer el color de texto en badges**

**Archivo:** `src/components/shared/SectionHeading.tsx`

```tsx
// Cambiar de bg-primary/10 text-primary a bg-primary/15 text-primary-dark
<span
  className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 ${
    light
      ? 'bg-white/10 text-white/90 border border-white/20'
      : 'bg-primary/15 text-[#ff5533] border border-primary/30'  // Color más claro para contraste
  }`}
>
```

**Archivo:** `src/components/home/MontamosTuCentro.tsx`

```tsx
// Línea 69: Iconos (OK en hover porque cambia a fondo sólido)
// Línea 80: Badges "Paso X" - Cambiar contraste
<span className="text-xs font-bold text-[#ff5533] bg-primary/15 px-2 py-0.5 rounded-full">
  Paso {index + 1}
</span>
```

**Archivo:** `src/components/home/TestimonialsSection.tsx`

```tsx
// Línea 245: Badge de formación
<span className="text-xs font-medium text-[#ff5533] bg-primary/15 px-3 py-1 rounded-full">
  {testimonial.formation}
</span>
```

**Archivo:** `src/components/home/SuccessStoriesLogos.tsx`

```tsx
// Líneas 61, 87: Tipo de negocio
<p className="text-xs text-[#ff5533] mt-1">{story.type}</p>
```

**Solución B: Mejorar muted-foreground**

**Archivo:** `src/index.css`

```css
/* Línea 22: Aumentar luminosidad de muted-foreground para mejor contraste */
--muted-foreground: 210 3% 70%;  /* De 60% a 70% */
```

---

### CORRECCIÓN 3: Orden de Encabezados

El `<h4>` en SuccessStoriesLogos salta niveles (debería ser h2 > h3 > h4 pero falta h3).

**Archivo:** `src/components/home/SuccessStoriesLogos.tsx`

```tsx
// Líneas 56, 82: Cambiar h4 a p con estilos equivalentes
// Antes:
<h4 className="font-semibold text-foreground truncate">{story.name}</h4>

// Después:
<p className="font-semibold text-foreground truncate">{story.name}</p>
```

---

### ARCHIVOS A MODIFICAR

| Archivo | Cambio |
|---------|--------|
| `src/components/home/TestimonialsSection.tsx` | Añadir `role="img"` a divs con aria-label, mejorar contraste badge |
| `src/components/InstructorProfile.tsx` | Añadir `role="img"` a div con aria-label |
| `src/components/shared/SectionHeading.tsx` | Mejorar contraste del badge |
| `src/components/home/MontamosTuCentro.tsx` | Mejorar contraste badges "Paso X" |
| `src/components/home/SuccessStoriesLogos.tsx` | Cambiar h4 a p, mejorar contraste tipo |
| `src/index.css` | Aumentar luminosidad de muted-foreground |

---

### RESULTADO ESPERADO

- **ARIA**: Todos los warnings de "atributos ARIA prohibidos" desaparecen
- **Contraste**: Ratio de contraste >= 4.5:1 (WCAG AA)
- **Encabezados**: Estructura semántica correcta sin saltos

---

### NOTAS TÉCNICAS

1. **Color #ff5533**: Este tono de rojo más claro (saturación alta, luminosidad ~50%) sobre bg-primary/15 da un ratio de contraste de aproximadamente 5.5:1, cumpliendo WCAG AA.

2. **role="img"**: Cuando un contenedor visual (como estrellas de rating) necesita aria-label pero no es semánticamente una imagen, `role="img"` es la solución correcta según ARIA 1.2.

3. **muted-foreground a 70%**: Aumentar de 60% a 70% de luminosidad mejora el contraste sobre fondos oscuros sin perder la sensación de texto secundario.

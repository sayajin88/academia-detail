
## Plan: Separar Pricing del Hero y Crear Nueva Sección de Precios

### RESUMEN DEL CAMBIO

Actualmente, el Hero de `/curso-detailing-profesional` incluye una tarjeta de pricing en desktop (columna derecha). El objetivo es:

1. **Simplificar el Hero** - Eliminar la tarjeta de precio para que sea más limpio y responsive
2. **Crear nueva sección de pricing** - Ubicarla después de "Domina las Técnicas Profesionales" (FormationVideoShowcase)
3. **Diseño visual potente** - Similar al estilo de CarreraPricing pero adaptado para cursos individuales

---

### ESTRUCTURA ACTUAL

```text
FormationHero (con pricing card en desktop)
    |
FormationAdvantages
    |
FormationVideoShowcase ("Domina las Técnicas Profesionales")
    |
FormationLevels
    |
... resto de secciones ...
```

### ESTRUCTURA PROPUESTA

```text
FormationHero (SIN pricing card - solo contenido + CTA simple)
    |
FormationAdvantages
    |
FormationVideoShowcase ("Domina las Técnicas Profesionales")
    |
[NUEVA] FormationPricing (sección dedicada de pricing)
    |
FormationLevels
    |
... resto de secciones ...
```

---

### CAMBIOS DETALLADOS

#### 1. Modificar FormationHero.tsx

**Objetivo:** Eliminar la tarjeta de precio del hero y simplificar para mejor UX mobile/desktop.

**Cambios:**
- Eliminar toda la columna derecha con la price card (líneas 139-306)
- Cambiar grid de 2 columnas a layout centrado/full-width
- Mantener: badge de duración, título H1, subtítulo, descripción, stats, CTA
- El Hero quedará más limpio y enfocado en el mensaje principal

**Diseño resultante del Hero:**
```text
+--------------------------------------------------+
|  [4 Días de Formación Intensiva] <- badge        |
|                                                  |
|  Curso de Detailing Profesional:                 |
|  Certificación y Carrera de Especialista   (H1)  |
|                                                  |
|  Formación Intensiva en Corrección...            |
|                                                  |
|  Descripción del curso...                        |
|                                                  |
|  [4 Días] [Grupos Reducidos] [Certificado]       |
|                                                  |
|  [Reservar Plaza] <- CTA principal               |
+--------------------------------------------------+
```

---

#### 2. Crear Nuevo Componente: FormationPricing.tsx

**Ubicación:** `src/components/formation/FormationPricing.tsx`

**Diseño:** Sección visual con dos columnas (mobile: stack vertical)

**Columna Izquierda - "Lo Que Incluye":**
- Lista de beneficios con iconos y checks animados
- Certificado oficial incluido
- Material didáctico completo
- Grupos reducidos (max 8)
- Soporte post-formacion
- Coffee break incluido
- Acceso a comunidad privada
- Bolsa de empleo

**Columna Derecha - "Tarjeta de Precio":**
- Badge "Oferta Especial" con descuento animado
- Precio original tachado: 3.497 euros
- Precio actual grande: 2.997 euros (con animacion countUp)
- Porcentaje de descuento: -14%
- Duracion: 4 dias de formacion intensiva
- Proxima convocatoria: Febrero 2026
- CTA principal: "Reservar Mi Plaza Ahora"
- Indicador de urgencia: "Solo quedan 3 plazas"
- Social proof: "+500 alumnos formados"
- Barra de progreso de plazas ocupadas

**Efectos visuales:**
- Spotlight effect (seguimiento del mouse)
- Animaciones de entrada staggered
- Gradientes y bordes premium
- Shimmer en badge de oferta

---

#### 3. Integrar en FormationDetail.tsx

**Cambio en el orden de componentes:**

```tsx
// Antes
<FormationVideoShowcase ... />
<FormationLevels formation={formation} onCTAClick={handleCTAClick} />

// Despues
<FormationVideoShowcase ... />
<FormationPricing formation={formation} onCTAClick={handleCTAClick} />
<FormationLevels formation={formation} onCTAClick={handleCTAClick} />
```

---

### ARCHIVOS A MODIFICAR/CREAR

| Archivo | Accion |
|---------|--------|
| `src/components/formation/FormationHero.tsx` | Modificar - Eliminar price card, simplificar layout |
| `src/components/formation/FormationPricing.tsx` | **Crear** - Nueva seccion de pricing dedicada |
| `src/pages/FormationDetail.tsx` | Modificar - Importar e integrar FormationPricing |

---

### ESPECIFICACIONES TECNICAS

#### FormationPricing.tsx - Props

```typescript
interface FormationPricingProps {
  formation: FormationDetail;
  onCTAClick: () => void;
}
```

#### Animaciones a incluir:

1. **Intersection Observer** - Activar animaciones cuando la seccion es visible
2. **useCountUp hook** - Animar el precio de 0 a 2997
3. **Staggered animations** - Entrada secuencial de beneficios
4. **Spotlight effect** - Iluminacion que sigue el mouse en la tarjeta
5. **Shimmer badge** - Efecto brillante en el badge de oferta

#### Responsive Design:

- **Mobile:** Stack vertical, padding reducido, fuentes mas pequenas
- **Tablet:** 2 columnas con gaps menores
- **Desktop:** 2 columnas con efectos hover completos

---

### RESULTADO VISUAL ESPERADO

**Hero simplificado:**
- Mas limpio y enfocado en el mensaje
- Mejor experiencia mobile (sin scroll horizontal)
- CTA visible sin competir con la tarjeta de precio

**Nueva seccion de Pricing:**
- Posicion estrategica despues de mostrar los videos de practica
- Usuario ya esta "calentado" al ver las tecnicas
- Presentacion visual del valor antes de pedir la reserva
- Incluye todos los beneficios de forma clara
- Urgencia y social proof para conversion

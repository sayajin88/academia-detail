

## Plan: Hacer la financiación ViaBill más visible y visual

### Problema actual
- El widget PriceTag de ViaBill usa `id="viabill-pricetag"` en vez de `class="viabill-pricetag"` (la documentación de ViaBill requiere class para que funcione, y además `id` solo permite una instancia en toda la página)
- Solo aparece debajo del precio en la página de detalle del curso, con poca visibilidad
- No aparece en la home ni en la Carrera Negocio

### Cambios

**1. Corregir `ViaBillPriceTag.tsx`**
- Cambiar `id="viabill-pricetag"` → `class="viabill-pricetag"` para que el script de ViaBill lo detecte correctamente y soporte múltiples instancias

**2. Crear componente `FinancingBadge.tsx`**
- Un badge visual y llamativo que dice "Págalo a plazos" con el logo/icono de ViaBill
- Diseño: pill/badge con icono de tarjeta de crédito, gradiente sutil, texto "Desde €X/mes" calculado dividiendo el precio entre 4 (ViaBill ofrece 4 cuotas)
- Animación sutil de entrada (fade-in + scale)

**3. Añadir financiación en `FormationsGrid.tsx` (Home)**
- En cada tarjeta de curso (que no sea `comingSoon`), añadir el `FinancingBadge` junto a la fecha/duración
- Añadir el widget `ViaBillPriceTag` con `data-view="list"` dentro de cada tarjeta
- Esto hace visible la opción de plazos desde la home

**4. Mejorar visibilidad en `FormationPricing.tsx`**
- Convertir la línea "Pago único · Financiación disponible" en un bloque más visual con el `FinancingBadge`
- Resaltar el botón de ViaBill con un estilo más prominente (gradiente, icono más grande)

**5. Añadir a `CarreraPricing.tsx`**
- Incluir `ViaBillPriceTag` debajo del precio
- Añadir `FinancingBadge` en la tarjeta de precio

### Archivos a modificar

| Archivo | Cambio |
|---|---|
| `src/components/formation/ViaBillPriceTag.tsx` | Corregir `id` → `className="viabill-pricetag"`, permitir prop `view` |
| `src/components/shared/FinancingBadge.tsx` | **Nuevo** — Badge visual "Desde €X/mes" |
| `src/components/home/FormationsGrid.tsx` | Añadir FinancingBadge + ViaBillPriceTag en cada tarjeta |
| `src/components/formation/FormationPricing.tsx` | Mejorar visibilidad del bloque de financiación |
| `src/components/carrera/CarreraPricing.tsx` | Añadir ViaBillPriceTag + FinancingBadge |


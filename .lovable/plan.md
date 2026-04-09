

## Plan: Quitar botones de pago ViaBill y configurar PriceTag informativo

### Resumen
Eliminar los botones de pago directo con ViaBill de todas las páginas de formaciones y carrera. Mantener únicamente el widget PriceTag informativo (que muestra cuotas mensuales) con el ID correcto de tu tienda, y los badges informativos de financiación.

### Cambios

**1. `index.html` — Corregir script del PriceTag**
- Cambiar `https://viabill.io/api/pricetag/v2/` por `https://pricetag.viabill.com/script/_ol9NtHA4kQ%3D` (URL con tu ID de tienda específico según la documentación oficial)

**2. `src/components/formation/ViaBillPriceTag.tsx` — Actualizar PriceTag ID**
- Cambiar `data-tags` de `_pI9NHA4kQ%3D` a `_ol9NtHA4kQ%3D`

**3. `src/components/formation/FormationPricing.tsx` — Eliminar botón de pago**
- Eliminar el bloque completo del botón "Pagar a Plazos sin Intereses" (líneas 199-233) que llama a `viabill-v3-final`
- Eliminar imports no usados: `supabase`, `toast`, `CreditCard`
- Mantener el `ViaBillPriceTag` y `FinancingBadge` como información visual

**4. `src/components/carrera/CarreraPricing.tsx` — Sin cambios necesarios**
- Ya no tiene botón de pago directo, solo el PriceTag y FinancingBadge informativos

**5. Componentes informativos que se mantienen tal cual:**
- `ViaBillPriceTag` — widget oficial que muestra "desde X€/mes"
- `FinancingBadge` — badge visual con cuotas estimadas
- `ViaBillFinancingBar` — barra sticky morada informativa


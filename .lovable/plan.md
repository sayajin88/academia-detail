

## Plan: Integrar logos ViaBill y barra sticky de financiación

### Resumen
Copiar los logos ViaBill al proyecto, integrarlos en el footer, en los badges de financiación, y crear una barra sticky inferior promocional visible en todas las páginas.

### Cambios

**1. Copiar logos ViaBill al proyecto**
- `user-uploads://viabill.png` → `src/assets/brands/viabill.png` (logo morado sobre transparente)
- `user-uploads://viabill-logo-purple.png` → `src/assets/brands/viabill-logo-purple.png` (logo blanco sobre fondo morado)

**2. Nuevo componente: `src/components/shared/ViaBillFinancingBar.tsx`**
- Barra sticky fija en la parte inferior de la pantalla (above footer)
- Fondo con gradiente morado ViaBill (#6C28D9 / indigo-600)
- Logo ViaBill a la izquierda + copy motivacional tipo: *"Financia tu formación · Págalo mientras generas negocio"* o *"Fórmate hoy, paga a plazos · Sin intereses con ViaBill"*
- Botón CTA que lleva a `/contacto` o hace scroll a formaciones
- Se oculta si el usuario hace scroll hasta el footer (para no solapar)
- Botón de cerrar (X) para que no sea intrusivo, con localStorage para recordar
- Responsive: en móvil, layout vertical más compacto

**3. Integrar barra en `MainLayout.tsx`**
- Añadir `<ViaBillFinancingBar />` justo antes de `<Footer />`

**4. Añadir logo ViaBill en `Footer.tsx`**
- En la sección de "Brand" del footer (columna izquierda), debajo del partner CarCare Passion
- Añadir una línea similar: logo ViaBill + texto "Financiación a plazos disponible"

**5. Mejorar `FinancingBadge.tsx`**
- En la variante `prominent`, reemplazar el icono genérico de CreditCard por el logo real de ViaBill
- Importar `viabill.png` y usarlo como imagen dentro del badge

**6. Añadir logo ViaBill en `FormationsGrid.tsx`**
- En el badge compact de financiación de cada tarjeta de curso, añadir un mini logo ViaBill (12-14px de alto) junto al texto "Desde €X/mes"

### Archivos

| Archivo | Cambio |
|---|---|
| `src/assets/brands/viabill.png` | **Nuevo** — Logo copiado |
| `src/assets/brands/viabill-logo-purple.png` | **Nuevo** — Logo copiado |
| `src/components/shared/ViaBillFinancingBar.tsx` | **Nuevo** — Barra sticky inferior |
| `src/components/layout/MainLayout.tsx` | Añadir ViaBillFinancingBar |
| `src/components/layout/Footer.tsx` | Añadir logo ViaBill + texto financiación |
| `src/components/shared/FinancingBadge.tsx` | Integrar logo ViaBill en variante prominent |
| `src/components/home/FormationsGrid.tsx` | Mini logo ViaBill en badges de financiación |


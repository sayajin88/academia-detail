

## Propuesta de Mejoras UX/UI — Auditoría Visual Completa

### Problemas detectados y mejoras propuestas

---

### 1. Conflicto de barras superpuestas en la parte inferior
**Problema**: La barra de cookies, la barra sticky de ViaBill y el botón "Soy Nuevo" compiten por el espacio inferior. En móvil se solapan gravemente: las tres barras apiladas tapan contenido y crean confusión visual.

**Solución**:
- Mover la barra de cookies por encima de la barra ViaBill (z-index + bottom offset)
- Ocultar la barra ViaBill mientras el banner de cookies esté visible
- En móvil, reducir la barra ViaBill a un formato mínimo (solo icono + "Financia" + flecha) para liberar espacio
- Coordinar posición del botón "Soy Nuevo" con la barra ViaBill para que no se solapen

---

### 2. Falta de separación visual entre secciones en Home
**Problema**: Muchas secciones se funden entre sí sin separadores claros. El fondo carbón uniforme hace que la jerarquía visual se pierda.

**Solución**:
- Alternar fondos entre secciones: `bg-background` / `bg-card` (ya definido en el tema pero poco usado)
- Añadir separadores decorativos tipo gradiente granate sutil entre secciones principales
- Añadir más `py` (padding vertical) entre bloques densos

---

### 3. CTA final (HomeCTA) poco diferenciado
**Problema**: La sección CTA final con fondo granate es correcta, pero los "trust points" en una tarjeta centrada se ven como una lista genérica. Falta impacto visual.

**Solución**:
- Convertir los trust points en 3 badges inline con iconos circulares en fila horizontal (en vez de lista vertical)
- Añadir un countdown o indicador de plazas si aplica
- Hacer el botón principal más grande con efecto de pulse/glow

---

### 4. Sección de testimonios sin fotos reales de alumnos
**Problema**: Los testimonios usan fotos genéricas de eventos grupales. No se ve la cara individual de cada alumno, lo que reduce credibilidad.

**Solución**:
- Usar avatares con iniciales estilizadas como fallback
- Añadir un badge visual con la formación que hicieron
- Considerar un formato de carrusel tipo "stories" en móvil para mayor engagement

---

### 5. Footer denso y sin jerarquía visual
**Problema**: El footer tiene 5 columnas de texto plano sin diferenciación visual. Los iconos sociales son iguales (2x Instagram) sin etiqueta visible.

**Solución**:
- Añadir etiquetas bajo los iconos sociales ("@detailpark", "@danidetail", "YouTube")
- Añadir un mini CTA en el footer ("¿Tienes dudas? Escríbenos por WhatsApp") con botón verde
- Separar visualmente la sección de partners/financiación del resto

---

### 6. Barra ViaBill: texto rotativo cortado
**Problema**: En desktop el texto de la barra ViaBill se corta y es difícil de leer durante la transición. Los mensajes son largos para el espacio disponible.

**Solución**:
- Acortar los mensajes rotativos (máx 40 caracteres)
- Aumentar la velocidad de transición para que el corte sea menos perceptible
- Usar un fade suave en vez de slide vertical

---

### 7. Cookie banner sin botones en móvil
**Problema**: En móvil, el botón "Aceptar" y "Rechazar" quedan debajo del fold del banner. Solo se ve la X para cerrar.

**Solución**:
- Rediseñar el banner de cookies en móvil: layout compacto con los botones siempre visibles
- Formato: texto corto en una línea + dos botones alineados a la derecha

---

### 8. Navbar: botón "¿Eres Nuevo?" poco visible en móvil
**Problema**: En móvil el navbar solo muestra logo + hamburger. El botón "¿Eres Nuevo?" no aparece.

**Solución**:
- Añadir el CTA "¿Eres Nuevo?" como primer item destacado dentro del menú hamburger móvil, con fondo granate y icono

---

### 9. Transiciones de página sin feedback
**Problema**: Al navegar entre páginas no hay transición visual. El contenido simplemente aparece, lo que da sensación de "salto".

**Solución**:
- Añadir un fade-in sutil (200ms) al componente `MainLayout` al montar cada página
- Mantener simple para no afectar rendimiento

---

### Archivos afectados

| Archivo | Cambio |
|---|---|
| `src/components/shared/CookieBanner.tsx` | Rediseño móvil compacto, coordinar z-index con ViaBill |
| `src/components/shared/ViaBillFinancingBar.tsx` | Mensajes más cortos, ocultar si cookies visible, formato mini en móvil |
| `src/components/shared/SoyNuevoButton.tsx` | Ajustar posición bottom para no solapar con ViaBill |
| `src/components/home/HomeCTA.tsx` | Trust points en fila horizontal, botón con glow |
| `src/components/home/TestimonialsSection.tsx` | Badge de formación, avatares con iniciales como fallback |
| `src/components/layout/Footer.tsx` | Etiquetas en iconos sociales, mini CTA WhatsApp |
| `src/components/layout/MainLayout.tsx` | Fade-in al montar página |
| `src/pages/Home.tsx` | Alternar fondos entre secciones (bg-background / bg-card) |
| `src/components/layout/Navbar.tsx` | CTA "¿Eres Nuevo?" en menú hamburger móvil |


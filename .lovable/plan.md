

## Plan: Envío masivo de dossier desde el listado de leads

### Resumen
Añadir selección múltiple con checkboxes en la tabla de leads y un botón de acción masiva para enviar el dossier informativo a todos los seleccionados. Cada envío actualiza `dossier_email_sent = true` y registra la fecha. El flujo de follow-up automático (a los 2 días) no se ve afectado.

### Cambios en `src/pages/AdminContacts.tsx`

1. **Estado de selección múltiple**: Nuevo state `selectedIds: Set<string>` para trackear los leads seleccionados.

2. **Checkbox "Seleccionar todos"** en la cabecera de la tabla (primera columna) — selecciona/deselecciona todos los leads filtrados visibles.

3. **Checkboxes individuales** en cada fila para selección masiva (separados de los checkboxes de estado "contactado/pendiente" existentes — se añade una nueva columna a la izquierda).

4. **Barra de acción masiva**: Cuando hay leads seleccionados, aparece una barra encima de la tabla con:
   - Contador: "X leads seleccionados"
   - Botón "Enviar dossier a seleccionados" (con icono FileText + Send)
   - Botón "Deseleccionar todos"

5. **Lógica de envío masivo**: Itera sobre los seleccionados enviando solo el email de confirmación con dossier (template `contact-confirmation`) vía `send-transactional-email`, sin disparar la notificación admin. Tras cada envío exitoso, actualiza `dossier_email_sent = true` y `dossier_email_sent_at = now()` en la tabla `contact_submissions`. Muestra progreso y toast con resultado.

6. **No interfiere con follow-up**: El follow-up automático (`send-followup-email`) busca registros donde `dossier_email_sent = true` y `followup_email_sent = false` con más de 2 días de antigüedad. El envío masivo del dossier marca `dossier_email_sent = true`, lo cual es el comportamiento esperado — el follow-up se activará 2 días después si no han sido contactados.

### Migración de base de datos

Añadir columna `dossier_email_sent_at` (timestamp, nullable) a `contact_submissions` para registrar la fecha exacta del envío del dossier.

### Archivos afectados

| Archivo | Cambio |
|---|---|
| `src/pages/AdminContacts.tsx` | Añadir selección múltiple y acción masiva |
| Migración SQL | Añadir columna `dossier_email_sent_at` |


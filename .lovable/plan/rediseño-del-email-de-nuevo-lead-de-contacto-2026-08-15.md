# Rediseño del email de "Nuevo Lead de Contacto"

Rediseño visual completo de la notificación interna que llega al admin cuando entra un lead, manteniendo exactamente los mismos datos y el mismo disparo automático.

## Dirección de diseño

Identidad Detail Park: Charcoal (#1a1a1f) + Garnet (#8B2332) sobre fondo blanco de email, estética editorial-técnica tipo "ficha de taller", no plantilla genérica.

- **Cabecera**: banda charcoal con línea garnet superior, monograma "AD" en texto (sin imágenes externas), título "Nuevo Lead" y fecha + hora exacta de recepción (ahora solo hay fecha).
- **Bloque protagonista**: nombre del lead en tipografía grande y la formación solicitada como etiqueta garnet destacada, para leerlo de un vistazo en móvil.
- **Contacto**: email y teléfono como filas con separadores finos y dos botones de acción directa (Responder por email / Llamar / WhatsApp si hay teléfono), en lugar de un único botón al final.
- **Cualificación**: cuadrícula de 2 columnas (tabla, compatible con Outlook) con etiqueta pequeña en mayúsculas + valor en negrita, en vez de la lista vertical actual.
- **Señal de temperatura del lead**: chip calculado a partir de los datos ya existentes (inversión declarada + experiencia + centro propio). Solo lógica de presentación, sin datos nuevos.
- **Mensaje**: bloque con comilla tipográfica y borde garnet, mejor legibilidad.
- **Pie**: charcoal suave con la marca "Detail Park - Academia Detail" y enlace al panel de leads (/admin/contacts).

## Detalles técnicos

- Se edita solo `supabase/functions/_shared/transactional-email-templates/admin-new-lead.tsx`.
- Estilos inline con constantes, layout basado en tablas de React Email (`Section`/`Row`/`Column`) para compatibilidad con Gmail y Outlook; `Body` en `#ffffff`.
- Se mantienen: props, mapas de etiquetas, `subject`, `to`, `previewData` y el registro en `registry.ts` (sin cambios).
- Se mejora el texto de `Preview` para que el resumen del inbox muestre formación + nombre + inversión.
- Tras el cambio, se despliega la función de envío de emails para que la plantilla nueva entre en vigor.

No se modifican `contact-confirmation.tsx` ni `contact-followup.tsx` en este cambio.

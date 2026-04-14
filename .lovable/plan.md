

## Diagnóstico: Los emails de dossier nunca se envían

### Causa raíz

**El dominio de email `notify.academiadetail.com` no está verificado.** La configuración DNS está pendiente, lo que significa que **ningún email** se está enviando realmente — ni dossiers, ni confirmaciones, ni follow-ups, ni notificaciones al admin.

Todos los emails se encolan correctamente, pero cuando el procesador de cola intenta enviarlos, recibe un error `403: Email domain is not verified` y acaban en la cola de mensajes fallidos (DLQ). Hay **17 emails fallidos** acumulados desde el 9 de abril, todos con el mismo error.

### ¿Por qué la UI dice "enviado"?

El código marca `dossier_email_sent = true` cuando el email se encola exitosamente. La cola funciona bien — el problema es que el **despachador** no puede entregar los emails porque el dominio no está verificado. Así que la UI muestra "enviado" pero el email nunca llega al destinatario.

### Solución (2 partes)

#### Parte 1: Verificar el dominio de email (acción del usuario)

Necesitas completar la configuración DNS de `notify.academiadetail.com` en tu proveedor de dominio. Puedes ver el estado y las instrucciones en **Cloud → Emails → Manage Domains**. Una vez verificado, todos los emails empezarán a enviarse automáticamente.

#### Parte 2: Mejora de código (para evitar falsos positivos)

Actualmente el sistema marca el dossier como "enviado" en el momento del encolado. Esto es engañoso cuando hay problemas de entrega. Propongo:

**Archivo**: `src/pages/AdminContacts.tsx`

- En `handleBulkSendDossier`: Después de encolar, **no marcar** `dossier_email_sent = true` inmediatamente. En su lugar, marcar un estado intermedio como `dossier_email_sent_at` (timestamp del intento) pero mantener `dossier_email_sent = false` hasta confirmar entrega.

Sin embargo, dado que el sistema de colas es asíncrono y no hay callback de confirmación, la mejora más práctica es:

- Añadir una **verificación previa** antes de encolar: consultar `email_send_log` para ver si hay emails recientes con status `dlq` y mostrar un **aviso al admin** de que hay problemas de entrega pendientes, en lugar de silenciar el error.
- Mostrar un banner de alerta en el panel de admin cuando haya emails en estado `dlq` recientes.

### Archivos afectados

| Archivo | Cambio |
|---|---|
| `src/pages/AdminContacts.tsx` | Añadir banner de alerta cuando hay emails fallidos (DLQ) + aviso visual en el envío de dossier |

### Prioridad inmediata

Lo más urgente es **verificar el dominio DNS**. Sin eso, ningún cambio de código resolverá el problema de entrega. ¿Quieres que te guíe para verificar el dominio en Cloud → Emails?


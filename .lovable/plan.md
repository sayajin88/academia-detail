

## Plan: Corregir el error visual del webhook n8n en el formulario de inscripción

### Problema
El webhook de n8n (`dlopez88.app.n8n.cloud/webhook/contacto`) está devolviendo un error o no respondiendo. El código actual muestra un `toast.error()` al usuario cuando esto ocurre, aunque la solicitud se guardó correctamente en la base de datos y los emails se enviaron sin problema.

### Causa raíz
En `EnrollmentWizard.tsx` (líneas 130-154), el fetch al webhook de n8n tiene dos `toast.error()` que se muestran al usuario cuando el webhook falla. Como el webhook es una notificación secundaria (los datos ya están en la BD y los emails ya se enviaron), este error no debería mostrarse al usuario.

### Solución

**Archivo**: `src/components/contact/EnrollmentWizard.tsx`

1. **Hacer la llamada al webhook no-bloqueante y silenciosa**: Eliminar los `toast.error()` del bloque del webhook. Solo loguear el error en consola para debugging.
2. **Ejecutar el webhook en "fire-and-forget"**: Lanzar el fetch sin `await` para que no retrase la redirección a `/gracias`.
3. **Mantener los logs de consola** para que puedas ver en desarrollo si el webhook falla, pero sin impactar la experiencia del usuario.

### Cambio concreto

```typescript
// Antes (bloqueante + muestra errores al usuario):
try {
  const webhookResponse = await fetch("https://dlopez88.app.n8n.cloud/webhook/contacto", {...});
  if (!webhookResponse.ok) {
    toast.error("Tu solicitud se guardó pero hubo un problema al notificar.");
  }
} catch (err) {
  toast.error("Tu solicitud se guardó pero hubo un problema de conexión.");
}

// Después (fire-and-forget, silencioso):
fetch("https://dlopez88.app.n8n.cloud/webhook/contacto", {...})
  .then(r => { if (!r.ok) console.warn("Webhook n8n:", r.status); })
  .catch(err => console.warn("Webhook n8n error:", err));
```

### Resultado
- El usuario siempre verá la redirección a `/gracias` sin mensajes de error confusos
- Los datos siguen guardándose en la BD
- Los emails siguen enviándose
- El webhook sigue intentándose pero su fallo es invisible para el usuario

### Archivo afectado
| Archivo | Cambio |
|---|---|
| `src/components/contact/EnrollmentWizard.tsx` | Webhook n8n → fire-and-forget sin toast de error |


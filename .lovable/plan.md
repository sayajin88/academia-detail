

# Cambiar Webhook a URL de Test

## Problema

El webhook actual apunta a la URL de **producción** (`/webhook/contacto`), pero necesitas usar la URL de **test** (`/webhook-test/contacto`) para depurar.

## Cambio

Un único cambio en `src/components/contact/EnrollmentWizard.tsx`, línea 108:

- **Antes:** `https://dlopez88.app.n8n.cloud/webhook/contacto`
- **Después:** `https://dlopez88.app.n8n.cloud/webhook-test/contacto`

Sin otros cambios necesarios. La lógica de envío (JSON con todos los campos, manejo de errores) ya está correcta.


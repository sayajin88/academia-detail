

## Plan: Corregir autenticación con ViaBill API

### Problema
ViaBill rechaza con 401 "Missing or invalid Authorization header". El `apikeyLength: 248` sugiere que el secret puede contener un valor incorrecto. Además, el método de auth (Basic header) puede no ser el correcto para este endpoint.

### Cambios

**Archivo: `supabase/functions/viabill-checkout/index.ts`**

1. **Eliminar el header `Authorization: Basic ...`** — ViaBill espera autenticación solo mediante el campo `apikey` en el body del POST, no mediante headers HTTP
2. **Enviar sin header de autorización** — solo `Content-Type: application/x-www-form-urlencoded` con los campos incluyendo `apikey` y `md5check`
3. **Añadir más logging** del apikey (primeros 6 chars) para depuración

### Acción del usuario
- Verificar en el panel de ViaBill que `VIABILL_API_KEY` es realmente la clave corta (no un token largo)
- Si el valor actual es incorrecto, actualizarlo en los secrets


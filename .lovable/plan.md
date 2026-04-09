

## ViaBill Integration Fix - Based on Official API Documentation

### Research Findings

After reviewing the official ViaBill Merchant API documentation at Stoplight, here are the **critical issues** with the current `viabill-v3-final` Edge Function:

### Issue 1: Wrong Endpoint URL
- **Current**: `https://secure.viabill.com/api/checkout/initiate`
- **Official docs**: `https://secure.viabill.com/api/checkout-authorize/addon/<webshop_name>`

The `<webshop_name>` is `CUSTOM` based on the previous URL you were given by support. So the correct URL is:
`https://secure.viabill.com/api/checkout-authorize/addon/CUSTOM`

### Issue 2: Wrong Protocol Version
- **Current**: `"3.1"`
- **Official docs example**: `"3.0"`

### Issue 3: Wrong Field Names (must be snake_case)
The docs show all fields in **snake_case**, not camelCase:
- `order_number` (not `orderNumber`)
- `success_url` (not `successUrl`)
- `cancel_url` (not `cancelUrl`)
- `callback_url` (not `callbackUrl`)
- `sha256check` stays as is

### Issue 4: No Authorization Header Needed
The docs only require `Content-Type: application/json` and `User-Agent`. No `Authorization` header of any kind. The `apikey` is sent **in the JSON body only**.

### Issue 5: Response is a 302 Redirect
The successful response is a **302 redirect**, not a JSON body. The function needs `redirect: "manual"` and must capture the `Location` header.

### Issue 6: Test Mode Hash
When `test: true`, the hash string appends `#true` (not `#test`). Current code has `test: false` so this is fine, but worth noting.

---

### Plan

**Single file change**: `supabase/functions/viabill-v3-final/index.ts`

1. Change endpoint URL to `https://secure.viabill.com/api/checkout-authorize/addon/CUSTOM`
2. Change protocol from `"3.1"` to `"3.0"`
3. Change all payload field names to snake_case: `order_number`, `success_url`, `cancel_url`, `callback_url`
4. Ensure no Authorization header (already removed - good)
5. Add `redirect: "manual"` to the fetch call
6. Capture the `Location` header from the 302 response as the redirect URL
7. Deploy and test


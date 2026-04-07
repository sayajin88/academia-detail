import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

async function sha256hex(message: string): Promise<string> {
  const data = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

serve(async (req) => {
  const cors = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: cors });
  }

  try {
    const body = await req.json();
    const amount = Number(body.amount || 0);
    const currency = body.currency || "EUR";
    const orderNumber = body.orderNumber || `ORD-${Date.now()}`;
    const transactionId = body.transaction || `TXN-${Date.now()}`;

    const apikey = (Deno.env.get("VIABILL_API_KEY") || "").trim();
    const secret = (Deno.env.get("VIABILL_SECRET") || "").trim();
    const testMode = Deno.env.get("VIABILL_TEST_MODE") === "true";

    // URLs hardcoded para evitar problemas con variables de entorno
    const appUrl = "https://academiadetail.com";
    const successUrl = `${appUrl}/pago-exitoso`;
    const cancelUrl = `${appUrl}/pago-cancelado`;
    const callbackUrl = `${appUrl}/api/viabill-callback`;

    // Firma SHA256 según especificación ViaBill
    const hashString = `${apikey}#${amount}#${currency}#${transactionId}#${orderNumber}#${successUrl}#${cancelUrl}#${secret}${testMode ? "#test" : ""}`;
    const sha256check = await sha256hex(hashString);

    console.log("=== ViaBill Debug ===");
    console.log("apikey length:", apikey.length);
    console.log("secret length:", secret.length);
    console.log("amount:", amount);
    console.log("currency:", currency);
    console.log("orderNumber:", orderNumber);
    console.log("transactionId:", transactionId);
    console.log("testMode:", testMode);
    console.log("hashString:", hashString);
    console.log("sha256check:", sha256check);

    const payload: Record<string, unknown> = {
      protocol: "V3",
      apikey: apikey,
      orderNumber: orderNumber,
      amount: amount,
      currency: currency,
      transaction: transactionId,
      sha256check: sha256check,
      successUrl: successUrl,
      cancelUrl: cancelUrl,
      callbackUrl: callbackUrl,
    };

    if (testMode) payload.test = true;

    console.log("payload:", JSON.stringify(payload));

    const response = await fetch(
      "https://secure.viabill.com/api/checkout-authorize/addon/CUSTOM",
      {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        redirect: "manual",
      }
    );

    let result: unknown = null;
    try { result = await response.json(); } catch { result = null; }

    const redirectUrl = response.headers.get("location");
    console.log("ViaBill status:", response.status);
    console.log("ViaBill redirect:", redirectUrl);
    console.log("ViaBill response:", JSON.stringify(result));

    if (response.status >= 400) {
      return new Response(
        JSON.stringify({ error: "Error ViaBill", details: result }),
        { status: response.status, headers: { ...cors, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ redirectUrl: redirectUrl || (result as any)?.url, status: response.status }),
      { headers: { ...cors, "Content-Type": "application/json" } }
    );

  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Edge function error:", msg);
    return new Response(
      JSON.stringify({ error: msg }),
      { status: 500, headers: { ...cors, "Content-Type": "application/json" } }
    );
  }
});

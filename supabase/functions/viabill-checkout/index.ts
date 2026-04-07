import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

async function sha256hex(message: string): Promise<string> {
  const data = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
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
    const amount = Number(body.amount || 297);
    const currency = "EUR";
    const orderNumber = `ORD-${Date.now()}`;
    const transactionId = `TXN-${Date.now()}`;

    const apiKey = (Deno.env.get("VIABILL_API_KEY") || "").trim();
    const secret = (Deno.env.get("VIABILL_SECRET") || "").trim();
    const testMode = true; // forzado a true para pruebas

    const successUrl = "https://academiadetail.com/pago-exitoso";
    const cancelUrl = "https://academiadetail.com/pago-cancelado";
    const callbackUrl = "https://academiadetail.com/api/viabill-callback";

    const hashString = `${apiKey}#${amount}#${currency}#${transactionId}#${orderNumber}#${successUrl}#${cancelUrl}#${secret}${testMode ? "#test" : ""}`;
    const sha256check = await sha256hex(hashString);

    // Log para verificar que este código está desplegado
    console.log(">>> NUEVO CODIGO DESPLEGADO <<<");
    console.log("apiKey length:", apiKey.length);
    console.log("secret length:", secret.length);
    console.log("hashString:", hashString);
    console.log("sha256check:", sha256check);

    const payload = {
      protocol: "V3",
      apiKey: apiKey,
      orderNumber: orderNumber,
      amount: amount,
      currency: currency,
      transaction: transactionId,
      sha256check: sha256check,
      successUrl: successUrl,
      cancelUrl: cancelUrl,
      callbackUrl: callbackUrl,
      test: true,
    };

    console.log("payload:", JSON.stringify(payload));

    const response = await fetch("https://secure.viabill.com/api/checkout-authorize/addon/CUSTOM", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      redirect: "manual",
    });

    let result: unknown = null;
    try {
      result = await response.json();
    } catch {
      result = null;
    }
    const redirectUrl = response.headers.get("location");

    console.log("ViaBill status:", response.status);
    console.log("ViaBill redirect:", redirectUrl);
    console.log("ViaBill result:", JSON.stringify(result));

    if (response.status >= 400) {
      return new Response(JSON.stringify({ error: "Error ViaBill", details: result }), {
        status: response.status,
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ redirectUrl: redirectUrl, status: response.status }), {
      headers: { ...cors, "Content-Type": "application/json" },
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("ERROR:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }
});

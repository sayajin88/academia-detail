import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

async function sha256(message: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

serve(async (req) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { amount, currency = "EUR", orderNumber, transaction } = await req.json();
    const apikey = Deno.env.get("VIABILL_API_KEY") ?? "";
    const secret = Deno.env.get("VIABILL_SECRET") ?? "";
    const appUrl = Deno.env.get("NEXT_PUBLIC_APP_URL") ?? "https://academiadetail.com";
    const testMode = Deno.env.get("VIABILL_TEST_MODE") === "true";

    const transactionId = transaction || `txn_${Date.now()}`;
    const successUrl = `${appUrl}/pago-exitoso?orderId=${orderNumber}&transactionId=${transactionId}`;
    const cancelUrl = `${appUrl}/pago-cancelado?orderId=${orderNumber}&transactionId=${transactionId}`;
    const callbackUrl = `${appUrl}/api/viabill-callback`;

    // Firma SHA256 según documentación oficial ViaBill
    let signatureString = `${apikey}#${String(amount)}#${currency}#${transactionId}#${orderNumber}#${successUrl}#${cancelUrl}#${secret}`;
    if (testMode) signatureString += "#true";

    const sha256check = await sha256(signatureString);

    // Payload JSON según especificación oficial
    const payload: any = {
      protocol: "3.1",
      apikey,
      transaction: transactionId,
      order_number: orderNumber,
      amount: String(amount),
      currency,
      success_url: successUrl,
      cancel_url: cancelUrl,
      callback_url: callbackUrl,
      sha256check,
    };

    if (testMode) payload.test = true;

    console.log("ViaBill request URL:", "https://secure.viabill.com/api/checkout-authorize/addon/CUSTOM");
    console.log("ViaBill payload:", JSON.stringify(payload));

    const response = await fetch("https://secure.viabill.com/api/checkout-authorize/addon/CUSTOM", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      redirect: "manual",
      body: JSON.stringify(payload),
    });

    const redirectUrl = response.headers.get("location");
    let result;
    try { result = await response.json(); } catch { result = null; }

    console.log("ViaBill status:", response.status);
    console.log("ViaBill redirect:", redirectUrl);

    if (response.status >= 400) {
      return new Response(JSON.stringify({ error: "Error ViaBill", details: result }), {
        status: response.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({
      redirectUrl: redirectUrl,
      transactionId,
      status: response.status,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Edge function error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

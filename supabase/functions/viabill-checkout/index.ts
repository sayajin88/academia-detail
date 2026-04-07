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
    const apikey = (Deno.env.get("VIABILL_API_KEY") ?? "").trim();
    const secret = (Deno.env.get("VIABILL_SECRET") ?? "").trim();
    const appUrl = Deno.env.get("NEXT_PUBLIC_APP_URL") ?? "https://academiadetail.com";
    const testMode = Deno.env.get("VIABILL_TEST_MODE") === "true";

    const numericAmount = Number(amount);
    const transactionId = transaction || `txn_${Date.now()}`;
    const order = orderNumber || `ORD-${Date.now()}`;

    const successUrl = `${appUrl}/pago-exitoso?orderId=${order}`;
    const cancelUrl = `${appUrl}/pago-cancelado?orderId=${order}`;
    const callbackUrl = `${appUrl}/api/viabill-callback`;

    // Hash: apikey#amount#currency#transaction#orderNumber#successUrl#cancelUrl#secret[#test]
    const hashString = `${apikey}#${numericAmount}#${currency}#${transactionId}#${order}#${successUrl}#${cancelUrl}#${secret}${testMode ? "#test" : ""}`;
    const sha256check = await sha256(hashString);

    console.log("ViaBill hashString:", hashString);
    console.log("ViaBill sha256check:", sha256check);

    const payload: any = {
      protocol: "V3",
      apikey,
      orderNumber: order,
      amount: numericAmount,
      currency,
      transaction: transactionId,
      sha256check,
      successUrl,
      cancelUrl,
      callbackUrl,
    };

    if (testMode) payload.test = true;

    console.log("ViaBill payload:", JSON.stringify(payload));

    const auth = btoa(apikey + ":");

    const response = await fetch("https://secure.viabill.com/api/checkout/initiate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${auth}`,
      },
      body: JSON.stringify(payload),
    });

    let result;
    try { result = await response.json(); } catch { result = null; }

    console.log("ViaBill status:", response.status);
    console.log("ViaBill response:", JSON.stringify(result));

    if (!response.ok) {
      return new Response(JSON.stringify({ error: "Error ViaBill", details: result }), {
        status: response.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(result), {
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

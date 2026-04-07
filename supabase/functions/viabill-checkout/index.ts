import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

async function md5(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const hashBuffer = await crypto.subtle.digest("MD5", data);
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, "0")).join("");
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { amount, currency = "EUR", orderNumber, courseSlug } = await req.json();

    const apikey = Deno.env.get("VIABILL_API_KEY") ?? "";
    const secret = Deno.env.get("VIABILL_SECRET") ?? "";

    const formattedAmount = parseFloat(amount).toFixed(2);
    const txOrderNumber = orderNumber || `DP-${courseSlug}-${Date.now()}`;
    const transaction = txOrderNumber;

    // MD5 con separador # según documentación ViaBill
    const md5string = `${formattedAmount}#${currency}#${transaction}#${txOrderNumber}#${apikey}#${secret}`;
    const md5check = createHash("md5").update(md5string).toString();

    const body = new URLSearchParams({
      apikey,
      md5check,
      amount: formattedAmount,
      currency,
      transaction,
      orderNumber: txOrderNumber,
      successUrl: "https://academiadetail.com/pago-exitoso",
      cancelUrl: "https://academiadetail.com/pago-cancelado",
      callbackUrl: "https://academiadetail.com/api/viabill-callback",
      test: "false",
    });

    console.log("ViaBill request:", { txOrderNumber, amount: formattedAmount, apikeyLength: apikey.length });

    const response = await fetch("https://secure.viabill.com/api/checkout/initiate", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    });

    const responseText = await response.text();
    console.log("ViaBill status:", response.status);
    console.log("ViaBill response:", responseText);

    let result;
    try {
      result = JSON.parse(responseText);
    } catch {
      result = { raw: responseText };
    }

    if (!response.ok) {
      return new Response(JSON.stringify({ error: "Error ViaBill", details: result }), {
        status: response.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ redirectUrl: result.url, ...result }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("ViaBill checkout error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

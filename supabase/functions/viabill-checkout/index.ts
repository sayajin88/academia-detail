import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { crypto as stdCrypto } from "https://deno.land/std@0.168.0/crypto/mod.ts";
import { encode as hexEncode } from "https://deno.land/std@0.168.0/encoding/hex.ts";

serve(async (req) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { amount, currency = "EUR", orderNumber } = await req.json();
    const apikey = Deno.env.get("VIABILL_API_KEY") ?? "";
    const secret = Deno.env.get("VIABILL_SECRET") ?? "";
    const appUrl = Deno.env.get("NEXT_PUBLIC_APP_URL") ?? "https://academiadetail.com";

    // Debug: log key length and first/last chars to verify it's loaded
    console.log("VIABILL_API_KEY length:", apikey.length);
    console.log("VIABILL_API_KEY starts with:", apikey.substring(0, 10));
    console.log("VIABILL_SECRET length:", secret.length);

    if (!apikey) {
      return new Response(JSON.stringify({ error: "VIABILL_API_KEY not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // md5check con separador #
    const md5string = `${amount}#${currency}#${orderNumber}#${orderNumber}#${apikey}#${secret}`;
    const md5bytes = await stdCrypto.subtle.digest("MD5", new TextEncoder().encode(md5string));
    const md5check = new TextDecoder().decode(hexEncode(new Uint8Array(md5bytes)));

    const body = new URLSearchParams({
      apikey,
      md5check,
      amount: String(amount),
      currency,
      transaction: String(orderNumber),
      orderNumber: String(orderNumber),
      successUrl: `${appUrl}/pago-exitoso`,
      cancelUrl: `${appUrl}/pago-cancelado`,
      callbackUrl: `${appUrl}/api/viabill-callback`,
      test: "false",
    });

    console.log("Request body:", body.toString());
    console.log("Authorization header:", `Bearer ${apikey.substring(0, 20)}...`);

    const response = await fetch("https://secure.viabill.com/api/checkout/initiate", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Bearer ${apikey}`,
      },
      body: body.toString(),
    });

    const result = await response.json();
    console.log("ViaBill status:", response.status);
    console.log("ViaBill response:", JSON.stringify(result));

    if (!response.ok) {
      return new Response(JSON.stringify({ error: "Error ViaBill", details: result }), {
        status: response.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ redirectUrl: result.url }), {
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

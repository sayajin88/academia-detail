import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { amount, courseSlug } = await req.json();
    const apiKey = Deno.env.get("VIABILL_API_KEY")?.trim();
    const secret = Deno.env.get("VIABILL_SECRET")?.trim();

    if (!apiKey || !secret) throw new Error("Credenciales no configuradas");

    // Datos formateados
    const formattedAmount = parseFloat(amount).toFixed(2);
    const orderNumber = `ORD${Date.now()}`; // ID más corto para evitar errores de longitud
    const successUrl = `https://academiadetail.com/pago-exitoso`;
    const cancelUrl = `https://academiadetail.com/pago-cancelado`;

    // FIRMA SHA256 (Orden exacto V3)
    const hashString = `${apiKey}#${formattedAmount}#EUR#${orderNumber}#${orderNumber}#${successUrl}#${cancelUrl}#${secret}`;
    const msgBuffer = new TextEncoder().encode(hashString);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
    const sha256check = Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    // CUERPO DEL MENSAJE (Ordenado igual que el Hash)
    const body = {
      protocol: "V3",
      apiKey: apiKey,
      amount: parseFloat(formattedAmount),
      currency: "EUR",
      transaction: orderNumber,
      orderNumber: orderNumber,
      successUrl: successUrl,
      cancelUrl: cancelUrl,
      callbackUrl: `https://academiadetail.com/api/viabill-callback`,
      sha256check: sha256check,
      test: true,
    };

    console.log("Iniciando petición a ViaBill V3...");

    const response = await fetch("https://secure.viabill.com/api/checkout/initiate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Basic ${btoa(apiKey + ":")}`,
      },
      body: JSON.stringify(body),
    });

    const result = await response.json();
    console.log("Respuesta de ViaBill:", JSON.stringify(result));

    if (!response.ok) {
      return new Response(JSON.stringify({ error: "Error ViaBill", details: result }), {
        status: response.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Error crítico:", e.message);
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { amount, courseSlug } = await req.json();

    // Credenciales directas
    const VIA_KEY =
      "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJNRVJDSEFOVCIsIlNZU1RFTSJdLCJ1dWlkIjoiZTllY2NkOTAtMzFjMy0xMWYxLTlhMTctZmIxYmYzYWM4NDZlIiwidHYiOjEsImVudiI6IlBST0RVQ1RJT04iLCJpYXQiOjE3NzU0ODUyOTQsImV4cCI6MjA5MTEwNDQ5NH0.zoKaAtlpck09R9shexWRuANuj8YfdsPfDXz31V3xz10";
    const VIA_SECRET = "ivxBzMAP7EP5";

    const finalAmount = parseFloat(amount).toFixed(2);
    const orderID = `ORD${Date.now()}`;
    const urlSuccess = "https://academiadetail.com/pago-exitoso";
    const urlCancel = "https://academiadetail.com/pago-cancelado";

    // GENERAR HASH (Estrictamente V3)
    // Orden: apiKey#amount#currency#transaction#orderNumber#successUrl#cancelUrl#secret
    const stringToHash = `${VIA_KEY}#${finalAmount}#EUR#${orderID}#${orderID}#${urlSuccess}#${urlCancel}#${VIA_SECRET}`;

    const encoder = new TextEncoder();
    const data = encoder.encode(stringToHash);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const finalHash = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

    // OBJETO DE ENVÍO
    const requestBody = {
      protocol: "V3",
      apiKey: VIA_KEY,
      amount: parseFloat(finalAmount),
      currency: "EUR",
      transaction: orderID,
      orderNumber: orderID,
      successUrl: urlSuccess,
      cancelUrl: urlCancel,
      callbackUrl: "https://academiadetail.com/api/viabill-callback",
      sha256check: finalHash,
      test: true,
    };

    console.log("--- NUEVO DESPLIEGE DETECTADO ---");
    console.log("Hash generado con:", stringToHash);

    const response = await fetch("https://secure.viabill.com/api/checkout/initiate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Basic ${btoa(VIA_KEY + ":")}`,
      },
      body: JSON.stringify(requestBody),
    });

    const result = await response.json();
    console.log("Resultado final:", JSON.stringify(result));

    return new Response(JSON.stringify(result), {
      status: response.status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error en función:", err.message);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

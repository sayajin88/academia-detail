import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { amount, courseSlug } = await req.json();

    // 1. Obtener credenciales y limpiar espacios
    const API_KEY_VAL = Deno.env.get("VIABILL_API_KEY")?.trim();
    const SECRET_VAL = Deno.env.get("VIABILL_SECRET")?.trim();

    if (!API_KEY_VAL || !SECRET_VAL) {
      return new Response(JSON.stringify({ error: "Faltan VIABILL_API_KEY o VIABILL_SECRET en Supabase" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 2. Configuración de datos (Formato estricto V3)
    const formattedAmount = parseFloat(amount).toFixed(2);
    const orderNumber = `ORD-${courseSlug}-${Date.now()}`;
    const transaction = orderNumber;
    const currency = "EUR";
    const origin = req.headers.get("origin") || "https://academiadetail.com";

    const successUrl = `${origin}/pago-exitoso`;
    const cancelUrl = `${origin}/pago-cancelado`;
    const callbackUrl = `${origin}/api/viabill-callback`;

    // 3. Generar Hash SHA256 (SIN EL CAMPO TEST)
    // El orden exacto: apiKey#amount#currency#transaction#orderNumber#successUrl#cancelUrl#secret
    const hashInput = `${API_KEY_VAL}#${formattedAmount}#${currency}#${transaction}#${orderNumber}#${successUrl}#${cancelUrl}#${SECRET_VAL}`;

    const msgUint8 = new TextEncoder().encode(hashInput);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
    const sha256check = Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    // 4. Construcción del Payload (OJO: apiKey con K mayúscula)
    const payload = {
      protocol: "V3",
      apiKey: API_KEY_VAL,
      orderNumber: orderNumber,
      amount: parseFloat(formattedAmount),
      currency: currency,
      transaction: transaction,
      sha256check: sha256check,
      successUrl: successUrl,
      cancelUrl: cancelUrl,
      callbackUrl: callbackUrl,
      test: true,
    };

    // 5. Autenticación Básica
    const authHeader = btoa(`${API_KEY_VAL}:`);

    console.log("DEBUG - Hash String:", hashInput);
    console.log("DEBUG - Payload Sent:", JSON.stringify(payload));

    const response = await fetch("https://secure.viabill.com/api/checkout/initiate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Basic ${authHeader}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("ViaBill Error:", result);
      return new Response(JSON.stringify({ error: "Error ViaBill", details: result }), {
        status: response.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Runtime Error:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

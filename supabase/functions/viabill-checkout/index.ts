import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Manejo de CORS para llamadas desde el navegador
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { amount, courseSlug } = await req.json();

    // Obtener y limpiar credenciales
    const apiKey = Deno.env.get("VIABILL_API_KEY")?.trim();
    const secret = Deno.env.get("VIABILL_SECRET")?.trim();

    if (!apiKey || !secret) {
      console.error("Error: VIABILL_API_KEY o VIABILL_SECRET no configurados en Supabase");
      return new Response(JSON.stringify({ error: "Configuración de pago incompleta" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 1. Formatear datos según Protocolo V3
    // El monto debe ser un string con dos decimales (ej: "2997.00")
    const formattedAmount = parseFloat(amount).toFixed(2);
    const orderNumber = `ORD-${courseSlug}-${Date.now()}`;
    const transaction = orderNumber; // Usamos el mismo ID para simplificar
    const currency = "EUR";
    const origin = req.headers.get("origin") || "https://academiadetail.com";

    const successUrl = `${origin}/pago-exitoso`;
    const cancelUrl = `${origin}/pago-cancelado`;
    const callbackUrl = `${origin}/api/viabill-callback`;

    // 2. Generar Hash SHA256 (Orden estricto V3)
    // El orden: apiKey#amount#currency#transaction#orderNumber#successUrl#cancelUrl#secret
    const hashInput = `${apiKey}#${formattedAmount}#${currency}#${transaction}#${orderNumber}#${successUrl}#${cancelUrl}#${secret}`;

    const msgUint8 = new TextEncoder().encode(hashInput);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
    const sha256check = Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    // 3. Preparar el Payload JSON
    const payload = {
      protocol: "V3",
      apiKey: apiKey,
      orderNumber: orderNumber,
      amount: parseFloat(formattedAmount),
      currency: currency,
      transaction: transaction,
      sha256check: sha256check,
      successUrl: successUrl,
      cancelUrl: cancelUrl,
      callbackUrl: callbackUrl,
      test: true, // Cambiar a false para producción
    };

    // 4. Preparar Autenticación Básica (apiKey:Base64)
    const authHeader = btoa(`${apiKey}:`);

    console.log("--- Iniciando Checkout ViaBill V3 ---");
    console.log("Order:", orderNumber);
    console.log("Hash Input:", hashInput);

    // 5. Petición a la API de ViaBill
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
      console.error("ViaBill Error Response:", result);
      return new Response(JSON.stringify({ error: "Error en la pasarela", details: result }), {
        status: response.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Respuesta exitosa (debería contener forwardUrl)
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

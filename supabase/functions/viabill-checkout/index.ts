import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { amount, courseSlug } = await req.json();

    // CLAVES DIRECTAS
    const apiKey =
      "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJNRVJDSEFOVCIsIlNZU1RFTSJdLCJ1dWlkIjoiZTllY2NkOTAtMzFjMy0xMWYxLTlhMTctZmIxYmYzYWM4NDZlIiwidHYiOjEsImVudiI6IlBST0RVQ1RJT04iLCJpYXQiOjE3NzU0ODUyOTQsImV4cCI6MjA5MTEwNDQ5NH0.zoKaAtlpck09R9shexWRuANuj8YfdsPfDXz31V3xz10";
    const secret = "ivxBzMAP7EP5";

    const formattedAmount = parseFloat(amount).toFixed(2);
    const orderNumber = `ORD${Date.now()}`;
    const successUrl = `https://academiadetail.com/pago-exitoso`;
    const cancelUrl = `https://academiadetail.com/pago-cancelado`;

    // 1. GENERAR HASH (Orden exacto V3)
    const hashString = `${apiKey}#${formattedAmount}#EUR#${orderNumber}#${orderNumber}#${successUrl}#${cancelUrl}#${secret}`;
    const msgUint8 = new TextEncoder().encode(hashString);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
    const sha256check = Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    // 2. CONSTRUIR FORM DATA (Mucho más compatible que JSON puro)
    const formData = new URLSearchParams();
    formData.append("protocol", "V3");
    formData.append("apiKey", apiKey);
    formData.append("amount", formattedAmount);
    formData.append("currency", "EUR");
    formData.append("transaction", orderNumber);
    formData.append("orderNumber", orderNumber);
    formData.append("successUrl", successUrl);
    formData.append("cancelUrl", cancelUrl);
    formData.append("callbackUrl", "https://academiadetail.com/api/viabill-callback");
    formData.append("sha256check", sha256check);
    formData.append("test", "true");

    console.log("Enviando petición V3 formateada...");

    const response = await fetch("https://secure.viabill.com/api/checkout/initiate", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded", // Cambio clave de JSON a Form
        Accept: "application/json",
        Authorization: `Basic ${btoa(apiKey + ":")}`,
      },
      body: formData.toString(),
    });

    const responseText = await response.text();
    console.log("Respuesta bruta:", responseText);

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

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

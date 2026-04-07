import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createHash } from "https://deno.land/std@0.91.0/hash/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { amount, courseName, courseSlug } = await req.json();

    if (!amount || !courseName || !courseSlug) {
      return new Response(
        JSON.stringify({ error: 'Faltan datos requeridos' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const apikey = Deno.env.get('VIABILL_API_KEY');
    const secret = Deno.env.get('VIABILL_SECRET');

    if (!apikey || !secret) {
      console.error('Missing VIABILL_API_KEY or VIABILL_SECRET');
      return new Response(
        JSON.stringify({ error: 'Configuración de pago no disponible' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const formattedAmount = parseFloat(amount).toFixed(2);
    const transaction = `VB-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
    const orderNumber = `DP-${courseSlug}-${Date.now()}`;

    const origin = req.headers.get('origin') || 'https://academiadetail.com';

    // MD5 hash: amount|currency|transaction|orderNumber|apikey|SECRET
    const hashInput = `${formattedAmount}|EUR|${transaction}|${orderNumber}|${apikey}|${secret}`;
    const md5check = createHash('md5').update(hashInput).toString();

    const formBody = new URLSearchParams({
      apikey,
      md5check,
      amount: formattedAmount,
      currency: 'EUR',
      transaction,
      orderNumber,
      successUrl: `${origin}/pago-exitoso?curso=${encodeURIComponent(courseSlug)}`,
      cancelUrl: `${origin}/pago-cancelado?curso=${encodeURIComponent(courseSlug)}`,
      callbackUrl: `${origin}/api/viabill-callback`,
      test: 'false',
    });

    console.log('Initiating ViaBill checkout:', { orderNumber, amount: formattedAmount, course: courseSlug, apikeyLength: apikey.length });

    // Try multiple auth approaches
    const basicAuth = btoa(`${apikey}:${secret}`);
    const response = await fetch('https://secure.viabill.com/api/checkout/initiate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${basicAuth}`,
      },
      body: formBody.toString(),
    });

    const responseText = await response.text();
    console.log('ViaBill response status:', response.status, 'body:', responseText);

    let result;
    try {
      result = JSON.parse(responseText);
    } catch {
      result = { raw: responseText };
    }

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: 'Error al iniciar el pago', details: result }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify(result),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('ViaBill checkout error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

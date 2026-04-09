import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const { amount } = await req.json();

    const VIA_KEY =
      'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJNRVJDSEFOVCIsIlNZU1RFTSJdLCJ1dWlkIjoiZTllY2NkOTAtMzFjMy0xMWYxLTlhMTctZmIxYmYzYWM4NDZlIiwidHYiOjEsImVudiI6IlBST0RVQ1RJT04iLCJpYXQiOjE3NzU0ODUyOTQsImV4cCI6MjA5MTEwNDQ5NH0.zoKaAtlpck09R9shexWRuANuj8YfdsPfDXz31V3xz10';
    const VIA_SECRET = 'ivxBzMAP7EP5';

    const finalAmountStr = parseFloat(amount).toFixed(2).toString();
    const orderID = 'ORD' + Date.now();
    const urlSuccess = 'https://academiadetail.com/pago-exitoso';
    const urlCancel = 'https://academiadetail.com/pago-cancelado';

    const stringToHash = `${VIA_KEY}#${finalAmountStr}#EUR#${orderID}#${orderID}#${urlSuccess}#${urlCancel}#${VIA_SECRET}`;

    const encoder = new TextEncoder();
    const data = encoder.encode(stringToHash);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const finalHash = Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');

    const requestBody = {
      protocol: '3.0',
      apikey: VIA_KEY,
      amount: finalAmountStr,
      currency: 'EUR',
      transaction: orderID,
      order_number: orderID,
      success_url: urlSuccess,
      cancel_url: urlCancel,
      callback_url: 'https://academiadetail.com/api/viabill-callback',
      sha256check: finalHash,
      test: false,
    };

    console.log('--- viabill-v3-final protocol 3.0 snake_case ---');
    console.log('payload:', JSON.stringify(requestBody));

    const response = await fetch('https://secure.viabill.com/api/checkout-authorize/addon/CUSTOM', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      redirect: 'manual',
      body: JSON.stringify(requestBody),
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', JSON.stringify(Object.fromEntries(response.headers.entries())));

    // 302 redirect = success, extract Location header
    if (response.status === 302 || response.status === 301) {
      const redirectUrl = response.headers.get('location');
      console.log('Redirect URL:', redirectUrl);
      return new Response(JSON.stringify({ redirectUrl }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Non-redirect response — return body for debugging
    const resultText = await response.text();
    console.log('Response body:', resultText);

    let result;
    try {
      result = JSON.parse(resultText);
    } catch {
      result = { raw: resultText };
    }

    return new Response(JSON.stringify(result), {
      status: response.status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

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
      protocol: '3.1',
      apiKey: VIA_KEY,
      amount: finalAmountStr,
      currency: 'EUR',
      transaction: orderID,
      orderNumber: orderID,
      successUrl: urlSuccess,
      cancelUrl: urlCancel,
      callbackUrl: 'https://academiadetail.com/api/viabill-callback',
      sha256check: finalHash,
      test: false,
    };

    console.log('--- viabill-v3-final protocol 3.1 ---');
    console.log('payload:', JSON.stringify(requestBody));

    const response = await fetch('https://secure.viabill.com/api/checkout/initiate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (response.status === 401) {
      const errorBody = await response.text();
      console.error('ViaBill 401 response:', errorBody);
      console.error('Authorization header used: Bearer <apikey>');
      return new Response(errorBody, {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const result = await response.json();
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

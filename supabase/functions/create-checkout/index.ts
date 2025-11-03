import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripe = new Stripe(Deno.env.get('Stripe') || '', {
      apiVersion: '2023-10-16',
    });

    // Use service role to bypass RLS securely on the server
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const body = await req.json();

    // Accept both flows: either we receive registrationId or full form data
    const {
      registrationId,
      firstName,
      lastName,
      email,
      phone,
      acceptTerms,
      acceptMarketing,
    } = body || {};

    let regId = registrationId as string | undefined;

    if (!regId) {
      // Minimal server-side validation
      if (!firstName || !lastName || !email || !phone || acceptTerms !== true) {
        throw new Error('Datos inválidos');
      }

      // Insert registration server-side (bypassing RLS)
      const { data: inserted, error: insertError } = await supabaseClient
        .from('registrations')
        .insert([
          {
            first_name: String(firstName).trim(),
            last_name: String(lastName).trim(),
            email: String(email).trim().toLowerCase(),
            phone: String(phone).trim(),
            accept_terms: true,
            accept_marketing: !!acceptMarketing,
            payment_status: 'pending',
          },
        ])
        .select('id')
        .single();

      if (insertError) {
        console.error('Insert error:', insertError);
        throw new Error('No se pudo registrar');
      }

      regId = inserted.id;
    }

    if (!regId) throw new Error('No se pudo obtener el ID de registro');

    console.log('Creating checkout for registration:', regId);

    // Try to find a suitable existing price for the provided product
    let priceId: string | undefined;
    try {
      const prices = await stripe.prices.list({
        product: 'prod_TMEHj9ejTLwlIF',
        active: true,
        type: 'one_time',
        limit: 100,
      });
      priceId = prices.data.find((p) => p.currency === 'eur' && p.unit_amount === 19900)?.id || prices.data[0]?.id;
    } catch (err) {
      console.warn('Could not list prices for product:', err);
    }

    if (!priceId) {
      // Create a new one-time price for the product
      const created = await stripe.prices.create({
        currency: 'eur',
        unit_amount: 19900,
        product: 'prod_TMEHj9ejTLwlIF',
      });
      priceId = created.id;
    }

    const origin = req.headers.get('origin') || 'https://ncsatssbhqicptmivmqk.supabase.co';

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        { price: priceId!, quantity: 1 },
      ],
      mode: 'payment',
      success_url: `${origin}/?payment=success&registration_id=${regId}`,
      cancel_url: `${origin}/?payment=cancelled`,
      customer_email: email,
      metadata: {
        registration_id: regId,
        customer_name: `${firstName || ''} ${lastName || ''}`.trim(),
        customer_phone: phone || '',
      },
    });

    console.log('Checkout session created:', session.id);

    return new Response(
      JSON.stringify({ url: session.url }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error creating checkout:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});

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

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const { registrationId } = await req.json();

    if (!registrationId) {
      throw new Error('Registration ID is required');
    }

    console.log('Creating checkout for registration:', registrationId);

    // Get registration details
    const { data: registration, error: regError } = await supabaseClient
      .from('registrations')
      .select('*')
      .eq('id', registrationId)
      .single();

    if (regError || !registration) {
      console.error('Registration not found:', regError);
      throw new Error('Registration not found');
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product: 'prod_TMEHj9ejTLwlIF',
            unit_amount: 19900, // €199.00
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.get('origin') || 'https://ncsatssbhqicptmivmqk.supabase.co'}/?payment=success&registration_id=${registrationId}`,
      cancel_url: `${req.headers.get('origin') || 'https://ncsatssbhqicptmivmqk.supabase.co'}/?payment=cancelled`,
      customer_email: registration.email,
      metadata: {
        registration_id: registrationId,
        customer_name: `${registration.first_name} ${registration.last_name}`,
        customer_phone: registration.phone,
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

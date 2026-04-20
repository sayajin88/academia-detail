import { createClient } from "npm:@supabase/supabase-js@2.78.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const formacionLabels: Record<string, string> = {
  detailing: "Detailing Profesional",
  wrapping: "Car Wrapping",
  ppf: "PPF – Protección de Pintura",
  restauracion: "Restauración de Vehículos",
  carrera: "Carrera Profesional Completa",
  negocio: "Módulo de Negocio",
  general: "Información General",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Find submissions from 2+ days ago that haven't received follow-up.
    // Use `dossier_email_sent_at` (intento de envío) en lugar de `dossier_email_sent`,
    // que ahora solo se marca true cuando hay confirmación real de entrega.
    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString();

    const { data: pendingFollowups, error: queryError } = await supabase
      .from("contact_submissions")
      .select("id, nombre, email, tipo_formacion")
      .eq("followup_email_sent", false)
      .not("dossier_email_sent_at", "is", null)
      .lt("created_at", twoDaysAgo)
      .limit(50);

    if (queryError) {
      console.error("Error querying pending follow-ups:", queryError);
      return new Response(
        JSON.stringify({ error: "Error querying database" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (!pendingFollowups || pendingFollowups.length === 0) {
      console.log("No pending follow-ups to send");
      return new Response(
        JSON.stringify({ success: true, sent: 0 }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log(`Found ${pendingFollowups.length} pending follow-ups to send`);
    let sentCount = 0;

    for (const submission of pendingFollowups) {
      try {
        const formLabel = formacionLabels[submission.tipo_formacion] || submission.tipo_formacion;

        await supabase.functions.invoke("send-transactional-email", {
          body: {
            templateName: "contact-followup",
            recipientEmail: submission.email,
            idempotencyKey: `followup-${submission.id}`,
            templateData: { nombre: submission.nombre, formacion: formLabel },
          },
        });

        // Solo guardamos el timestamp del intento. `followup_email_sent = true`
        // se marcará cuando el email_send_log confirme entrega (status = 'sent').
        // Así evitamos reenviar al mismo lead repetidamente si el envío falla
        // pero sin marcar como entregado prematuramente.
        await supabase
          .from("contact_submissions")
          .update({
            followup_email_sent_at: new Date().toISOString(),
          })
          .eq("id", submission.id);

        sentCount++;
        console.log(`Follow-up enqueued for ${submission.email}`);

        // Small delay between sends
        await new Promise((r) => setTimeout(r, 300));
      } catch (err) {
        console.error(`Exception sending follow-up to ${submission.email}:`, err);
      }
    }

    return new Response(
      JSON.stringify({ success: true, sent: sentCount, total: pendingFollowups.length }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in send-followup-email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);

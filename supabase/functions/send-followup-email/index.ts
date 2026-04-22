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

const MAX_FOLLOWUP_ATTEMPTS = 5;

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
    // Limit retries to MAX_FOLLOWUP_ATTEMPTS to avoid hammering on permanent failures.
    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString();

    const { data: pendingFollowups, error: queryError } = await supabase
      .from("contact_submissions")
      .select("id, nombre, email, tipo_formacion, tracking_token, followup_attempts")
      .eq("followup_email_sent", false)
      .not("dossier_email_sent_at", "is", null)
      .lt("created_at", twoDaysAgo)
      .lt("followup_attempts", MAX_FOLLOWUP_ATTEMPTS)
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
    let failedCount = 0;

    for (const submission of pendingFollowups) {
      const currentAttempts = submission.followup_attempts ?? 0;
      const nextAttempts = currentAttempts + 1;

      try {
        const formLabel = formacionLabels[submission.tipo_formacion] || submission.tipo_formacion;

        const { data: invokeData, error: invokeError } = await supabase.functions.invoke(
          "send-transactional-email",
          {
            body: {
              templateName: "contact-followup",
              recipientEmail: submission.email,
              idempotencyKey: `followup-${submission.id}`,
              templateData: {
                nombre: submission.nombre,
                formacion: formLabel,
                trackingToken: submission.tracking_token ?? undefined,
              },
            },
          }
        );

        // Detect failures: invocation error, or response indicates emails disabled / suppressed.
        // `success: true, queued: true` is the success contract from send-transactional-email.
        const responseFailed =
          invokeData &&
          typeof invokeData === "object" &&
          (invokeData.error ||
            (invokeData.success === false && invokeData.reason !== "email_suppressed"));

        if (invokeError || responseFailed) {
          failedCount++;
          console.error(
            `Follow-up FAILED for ${submission.email} (attempt ${nextAttempts}/${MAX_FOLLOWUP_ATTEMPTS})`,
            { invokeError, invokeData }
          );

          // Increment attempts but DO NOT set followup_email_sent_at — will retry next cycle.
          await supabase
            .from("contact_submissions")
            .update({ followup_attempts: nextAttempts })
            .eq("id", submission.id);

          await new Promise((r) => setTimeout(r, 300));
          continue;
        }

        // Success path — record attempt timestamp.
        // followup_email_sent = true se marca cuando el dispatcher confirma entrega
        // (status = 'sent' en email_send_log).
        await supabase
          .from("contact_submissions")
          .update({
            followup_email_sent_at: new Date().toISOString(),
            followup_attempts: nextAttempts,
          })
          .eq("id", submission.id);

        sentCount++;
        console.log(`Follow-up enqueued for ${submission.email} (attempt ${nextAttempts})`);

        await new Promise((r) => setTimeout(r, 300));
      } catch (err) {
        failedCount++;
        console.error(`Exception sending follow-up to ${submission.email}:`, err);

        // Still increment attempts so we don't loop forever on a poison message.
        await supabase
          .from("contact_submissions")
          .update({ followup_attempts: nextAttempts })
          .eq("id", submission.id);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        sent: sentCount,
        failed: failedCount,
        total: pendingFollowups.length,
      }),
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

Deno.serve(handler);

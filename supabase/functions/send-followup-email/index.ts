import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.78.0";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

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

const sanitizeHtml = (text: string): string => {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

const generateFollowupEmail = (nombre: string, tipo_formacion: string): string => {
  const firstName = sanitizeHtml(nombre.split(" ")[0]);
  const formLabel = formacionLabels[tipo_formacion] || tipo_formacion;

  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background-color:#F3F4F6;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F3F4F6;padding:40px 20px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background-color:#FFFFFF;border-radius:12px;overflow:hidden;border:1px solid #E5E7EB;">
  <!-- Header -->
  <tr><td style="background-color:#7C3AED;padding:40px;text-align:center;">
    <h1 style="margin:0 0 8px;color:#FFF;font-size:28px;font-weight:700;">DETAIL PARK</h1>
    <p style="margin:0;color:rgba(255,255,255,0.9);font-size:14px;letter-spacing:2px;text-transform:uppercase;">Academy</p>
  </td></tr>

  <!-- Content -->
  <tr><td style="padding:40px;">
    <h2 style="margin:0 0 24px;color:#111827;font-size:22px;font-weight:600;">
      ¿Has podido revisar el programa, ${firstName}?
    </h2>
    
    <p style="margin:0 0 20px;color:#374151;font-size:16px;line-height:1.7;">
      Hace un par de días te enviamos toda la información sobre nuestro programa de 
      <strong style="color:#7C3AED;">${sanitizeHtml(formLabel)}</strong>. 
      Queríamos saber si has tenido ocasión de revisarlo.
    </p>

    <p style="margin:0 0 20px;color:#374151;font-size:16px;line-height:1.7;">
      Sabemos que tomar la decisión de invertir en tu formación es importante, así que 
      queremos que tengas toda la información que necesites para dar el paso con confianza.
    </p>

    <!-- Key points box -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F5F3FF;border-radius:12px;border:1px solid #DDD6FE;margin:24px 0;">
    <tr><td style="padding:24px;">
      <p style="margin:0 0 16px;color:#111827;font-size:16px;font-weight:700;">¿Sabías que puedes financiar tu formación?</p>
      <p style="margin:0 0 12px;color:#374151;font-size:15px;line-height:1.6;">
        💳 <strong>Paga a plazos sin intereses</strong> gracias a nuestra colaboración con ViaBill.
      </p>
      <p style="margin:0 0 12px;color:#374151;font-size:15px;line-height:1.6;">
        📅 Elige el plan que mejor se adapte a ti: <strong>3, 6 o 12 meses</strong>.
      </p>
      <p style="margin:0;color:#374151;font-size:15px;line-height:1.6;">
        🎓 Y recuerda: nuestras plazas son limitadas a <strong>3 alumnos por edición</strong> para garantizar atención 1:1.
      </p>
    </td></tr>
    </table>

    <p style="margin:0 0 30px;color:#374151;font-size:16px;line-height:1.7;">
      Si tienes alguna duda, estaremos encantados de resolverla. Puedes reservar una 
      llamada informativa sin compromiso:
    </p>

    <!-- CTA Buttons -->
    <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding-bottom:12px;">
        <a href="https://wa.me/34622773555?text=Hola%2C%20estoy%20interesado%20en%20el%20programa%20de%20${encodeURIComponent(formLabel)}"
           style="display:inline-block;background-color:#25D366;color:#FFF;padding:16px 40px;border-radius:8px;font-size:16px;font-weight:700;text-decoration:none;">
          💬 Hablar por WhatsApp
        </a>
      </td>
    </tr>
    <tr>
      <td align="center">
        <a href="https://academiadetail.com/contacto"
           style="display:inline-block;background-color:#7C3AED;color:#FFF;padding:16px 40px;border-radius:8px;font-size:16px;font-weight:700;text-decoration:none;">
          📋 Reservar mi plaza
        </a>
      </td>
    </tr>
    </table>
  </td></tr>

  <!-- Footer -->
  <tr><td style="background-color:#F9FAFB;padding:30px 40px;border-top:1px solid #E5E7EB;">
    <p style="margin:0 0 8px;color:#111827;font-size:15px;font-weight:600;text-align:center;">
      Estamos aquí para ayudarte
    </p>
    <p style="margin:0 0 16px;color:#6B7280;font-size:14px;text-align:center;">
      📞 <a href="tel:+34622773555" style="color:#7C3AED;text-decoration:none;">+34 622 773 555</a> · 
      📧 <a href="mailto:info@academiadetail.com" style="color:#7C3AED;text-decoration:none;">info@academiadetail.com</a>
    </p>
    <p style="margin:0;text-align:center;">
      <a href="https://academiadetail.com" style="color:#7C3AED;font-size:13px;text-decoration:none;">www.academiadetail.com</a>
    </p>
  </td></tr>
</table>

<table width="600" cellpadding="0" cellspacing="0">
<tr><td style="padding:20px;text-align:center;">
  <p style="margin:0;color:#9CA3AF;font-size:11px;">
    Recibes este email porque solicitaste información sobre nuestros programas formativos.
  </p>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
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

    // Find submissions from 2+ days ago that haven't received follow-up
    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString();

    const { data: pendingFollowups, error: queryError } = await supabase
      .from("contact_submissions")
      .select("id, nombre, email, tipo_formacion")
      .eq("followup_email_sent", false)
      .eq("dossier_email_sent", true)
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
        const emailResponse = await resend.emails.send({
          from: "Detail Park Academy <formacion@academiadetail.com>",
          to: [submission.email],
          subject: `¿Has podido revisar el programa, ${submission.nombre.split(" ")[0]}?`,
          html: generateFollowupEmail(submission.nombre, submission.tipo_formacion),
        });

        if (emailResponse.error) {
          console.error(`Failed to send follow-up to ${submission.email}:`, emailResponse.error);
          continue;
        }

        // Mark as sent
        await supabase
          .from("contact_submissions")
          .update({
            followup_email_sent: true,
            followup_email_sent_at: new Date().toISOString(),
          })
          .eq("id", submission.id);

        sentCount++;
        console.log(`Follow-up sent to ${submission.email}`);

        // Small delay between sends
        await new Promise((r) => setTimeout(r, 500));
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

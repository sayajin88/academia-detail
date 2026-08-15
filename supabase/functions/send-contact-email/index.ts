import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.78.0";

const adminEmail = Deno.env.get("ADMIN_EMAIL") || "info@academiadetail.com";
const backupEmail = "academiadetail@gmail.com";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface ContactRequest {
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  experiencia: string;
  centro_propio: string;
  inversion: string;
  tipo_formacion: string;
  mensaje?: string;
  source: "contact_page" | "home_cta";
}

const formacionLabels: Record<string, string> = {
  detailing: "Detailing",
  wrapping: "Car Wrapping",
  ppf: "Paint Protection Film",
  restauracion: "Restauración",
  negocio: "Negocio",
  carrera_completa: "Carrera Completa",
  general: "Información General",
  sin_especificar: "Sin especificar",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body: ContactRequest = await req.json();
    const { nombre, apellidos, email, telefono, experiencia, centro_propio, inversion, tipo_formacion, mensaje, source } = body;

    if (!nombre || !apellidos || !email || !telefono || !experiencia || !centro_propio || !inversion || !tipo_formacion || !source) {
      return new Response(
        JSON.stringify({ error: "Todos los campos obligatorios son requeridos" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "El formato del email no es válido" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (nombre.length > 50 || apellidos.length > 100 || email.length > 255 || (mensaje && mensaje.length > 1000)) {
      return new Response(
        JSON.stringify({ error: "Uno o más campos exceden la longitud permitida" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const supabase = createClient(SUPABASE_URL, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

    // DOSSIER PAUSADO: el envío del dossier al cliente está temporalmente
    // desactivado mientras se actualiza el PDF del programa formativo.
    // Se mantiene la notificación al admin y el resto del flujo intacto.
    //
    // Cuando se quiera reactivar, descomentar el bloque de abajo y restaurar
    // el botón de descarga en la plantilla contact-confirmation.tsx.
    //
    // const trackingToken = crypto.randomUUID();
    // const { error: updateError } = await supabase
    //   .from("contact_submissions")
    //   .update({
    //     tracking_token: trackingToken,
    //     dossier_email_sent_at: new Date().toISOString(),
    //   })
    //   .eq("email", email)
    //   .order("created_at", { ascending: false })
    //   .limit(1);
    //
    // if (updateError) {
    //   console.error("Error saving tracking token:", updateError);
    // }

    const formLabel = formacionLabels[tipo_formacion] || tipo_formacion;
    const submissionId = crypto.randomUUID();

    // Send admin notification via transactional email
    await supabase.functions.invoke("send-transactional-email", {
      body: {
        templateName: "admin-new-lead",
        idempotencyKey: `admin-lead-${submissionId}`,
        templateData: { nombre, apellidos, email, telefono, experiencia, centro_propio, inversion, tipo_formacion, mensaje, source },
      },
    });

    // DOSSIER PAUSADO: no enviamos la confirmación con dossier al cliente.
    // await supabase.functions.invoke("send-transactional-email", {
    //   body: {
    //     templateName: "contact-confirmation",
    //     recipientEmail: email,
    //     idempotencyKey: `contact-confirm-${submissionId}`,
    //     templateData: { nombre, formacion: formLabel, trackingToken },
    //   },
    // });

    console.log("Admin email enqueued successfully for:", email);

    return new Response(
      JSON.stringify({ success: true, message: "Emails enviados correctamente" }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Error al enviar el email" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);

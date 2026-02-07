import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const adminEmail = Deno.env.get("ADMIN_EMAIL") || "info@academiadetail.com";

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

const experienciaLabels: Record<string, string> = {
  sin_experiencia: "No, soy nuevo",
  con_experiencia: "Si, tengo experiencia",
  sin_especificar: "Sin especificar",
};

const centroLabels: Record<string, string> = {
  si: "Si",
  no: "No",
  sin_especificar: "Sin especificar",
};

const inversionLabels: Record<string, string> = {
  hasta_500: "Hasta 500 EUR",
  "500_2000": "500 - 2.000 EUR",
  "2000_5000": "2.000 - 5.000 EUR",
  mas_5000: "Mas de 5.000 EUR",
  sin_especificar: "Sin especificar",
};

const formacionLabels: Record<string, string> = {
  detailing: "Detailing",
  wrapping: "Car Wrapping",
  ppf: "Paint Protection Film",
  restauracion: "Restauracion",
  negocio: "Negocio",
  carrera_completa: "Carrera Completa",
  general: "Informacion General",
  sin_especificar: "Sin especificar",
};

const formacionColors: Record<string, { bg: string; text: string }> = {
  detailing: { bg: "#8B5CF6", text: "#FFFFFF" },
  wrapping: { bg: "#3B82F6", text: "#FFFFFF" },
  ppf: { bg: "#10B981", text: "#FFFFFF" },
  restauracion: { bg: "#F59E0B", text: "#1F2937" },
  negocio: { bg: "#EF4444", text: "#FFFFFF" },
  carrera_completa: { bg: "#EC4899", text: "#FFFFFF" },
  general: { bg: "#6B7280", text: "#FFFFFF" },
  sin_especificar: { bg: "#374151", text: "#FFFFFF" },
};

const sourceLabels: Record<string, string> = {
  contact_page: "Pagina de Contacto",
  home_cta: "CTA de la Home",
};

const sanitizeHtml = (text: string): string => {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/\n/g, "<br>");
};

const generateAdminEmail = (data: ContactRequest): string => {
  const colors = formacionColors[data.tipo_formacion] || formacionColors.general;
  const fullName = sanitizeHtml(`${data.nombre} ${data.apellidos}`);
  const expLabel = experienciaLabels[data.experiencia] || data.experiencia;
  const centLabel = centroLabels[data.centro_propio] || data.centro_propio;
  const invLabel = inversionLabels[data.inversion] || data.inversion;
  const formLabel = formacionLabels[data.tipo_formacion] || data.tipo_formacion;
  const srcLabel = sourceLabels[data.source] || data.source;
  const dateStr = new Date().toLocaleDateString("es-ES", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
    hour: "2-digit", minute: "2-digit",
  });

  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background-color:#F3F4F6;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F3F4F6;padding:40px 20px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background-color:#FFFFFF;border-radius:8px;overflow:hidden;border:1px solid #E5E7EB;">
  <!-- Header -->
  <tr><td style="background-color:#7C3AED;padding:30px 40px;">
    <h1 style="margin:0;color:#FFF;font-size:22px;font-weight:700;">Nuevo Lead de Contacto</h1>
    <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">${dateStr}</p>
  </td></tr>

  <!-- Source + Formation badges -->
  <tr><td style="padding:24px 40px 0;">
    <span style="display:inline-block;background-color:#374151;color:#FFF;padding:6px 14px;border-radius:20px;font-size:12px;font-weight:600;margin-right:8px;">${sanitizeHtml(srcLabel)}</span>
    <span style="display:inline-block;background-color:${colors.bg};color:${colors.text};padding:6px 14px;border-radius:20px;font-size:12px;font-weight:600;">${sanitizeHtml(formLabel)}</span>
  </td></tr>

  <!-- Contact Info -->
  <tr><td style="padding:20px 40px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F9FAFB;border-radius:8px;border:1px solid #E5E7EB;">
    <tr><td style="padding:20px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr><td style="padding:8px 0;border-bottom:1px solid #E5E7EB;">
          <span style="color:#6B7280;font-size:13px;display:block;">Nombre completo</span>
          <span style="color:#111827;font-size:16px;font-weight:500;">${fullName}</span>
        </td></tr>
        <tr><td style="padding:8px 0;border-bottom:1px solid #E5E7EB;">
          <span style="color:#6B7280;font-size:13px;display:block;">Email</span>
          <a href="mailto:${data.email}" style="color:#7C3AED;font-size:16px;font-weight:500;text-decoration:none;">${sanitizeHtml(data.email)}</a>
        </td></tr>
        <tr><td style="padding:8px 0;">
          <span style="color:#6B7280;font-size:13px;display:block;">Telefono</span>
          <a href="tel:${data.telefono}" style="color:#7C3AED;font-size:16px;font-weight:500;text-decoration:none;">${sanitizeHtml(data.telefono)}</a>
        </td></tr>
      </table>
    </td></tr>
    </table>
  </td></tr>

  <!-- Lead Qualification -->
  <tr><td style="padding:0 40px 20px;">
    <h3 style="margin:0 0 12px;color:#111827;font-size:16px;font-weight:600;">Cualificacion del Lead</h3>
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F9FAFB;border-radius:8px;border:1px solid #E5E7EB;">
    <tr><td style="padding:20px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr><td style="padding:8px 0;border-bottom:1px solid #E5E7EB;">
          <span style="color:#6B7280;font-size:13px;display:block;">Experiencia en Detailing</span>
          <span style="color:#111827;font-size:15px;font-weight:500;">${sanitizeHtml(expLabel)}</span>
        </td></tr>
        <tr><td style="padding:8px 0;border-bottom:1px solid #E5E7EB;">
          <span style="color:#6B7280;font-size:13px;display:block;">Centro propio</span>
          <span style="color:#111827;font-size:15px;font-weight:500;">${sanitizeHtml(centLabel)}</span>
        </td></tr>
        <tr><td style="padding:8px 0;border-bottom:1px solid #E5E7EB;">
          <span style="color:#6B7280;font-size:13px;display:block;">Inversion en formacion</span>
          <span style="color:#111827;font-size:15px;font-weight:500;">${sanitizeHtml(invLabel)}</span>
        </td></tr>
        <tr><td style="padding:8px 0;">
          <span style="color:#6B7280;font-size:13px;display:block;">Formacion deseada</span>
          <span style="color:#111827;font-size:15px;font-weight:500;">${sanitizeHtml(formLabel)}</span>
        </td></tr>
      </table>
    </td></tr>
    </table>
  </td></tr>

  ${data.mensaje ? `
  <!-- Message -->
  <tr><td style="padding:0 40px 24px;">
    <h3 style="margin:0 0 12px;color:#111827;font-size:16px;font-weight:600;">Mensaje</h3>
    <div style="background-color:#F9FAFB;border-radius:8px;padding:20px;border-left:4px solid #7C3AED;">
      <p style="margin:0;color:#374151;font-size:15px;line-height:1.6;">${sanitizeHtml(data.mensaje)}</p>
    </div>
  </td></tr>` : ""}

  <!-- CTA -->
  <tr><td style="padding:0 40px 30px;" align="center">
    <a href="mailto:${data.email}?subject=Re: Solicitud de informacion - Detail Park Academy"
       style="display:inline-block;background-color:#7C3AED;color:#FFF;padding:14px 32px;border-radius:8px;font-size:15px;font-weight:600;text-decoration:none;">
      Responder a ${sanitizeHtml(data.nombre)}
    </a>
  </td></tr>

  <!-- Footer -->
  <tr><td style="background-color:#F9FAFB;padding:20px 40px;border-top:1px solid #E5E7EB;">
    <p style="margin:0;color:#6B7280;font-size:12px;text-align:center;">
      Este mensaje fue enviado desde el formulario de contacto de Detail Park Academy
    </p>
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
};

const generateClientEmail = (data: ContactRequest): string => {
  const firstName = sanitizeHtml(data.nombre.split(" ")[0]);
  const formLabel = formacionLabels[data.tipo_formacion] || data.tipo_formacion;

  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background-color:#F3F4F6;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F3F4F6;padding:40px 20px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background-color:#FFFFFF;border-radius:8px;overflow:hidden;border:1px solid #E5E7EB;">
  <!-- Header -->
  <tr><td style="background-color:#7C3AED;padding:40px;text-align:center;">
    <h1 style="margin:0 0 8px;color:#FFF;font-size:28px;font-weight:700;">DETAIL PARK</h1>
    <p style="margin:0;color:rgba(255,255,255,0.9);font-size:14px;letter-spacing:2px;text-transform:uppercase;">Academy</p>
  </td></tr>

  <!-- Content -->
  <tr><td style="padding:40px;">
    <h2 style="margin:0 0 24px;color:#111827;font-size:22px;font-weight:600;">Hemos recibido tu mensaje</h2>
    <p style="margin:0 0 20px;color:#374151;font-size:16px;line-height:1.6;">
      Hola <strong style="color:#111827;">${firstName}</strong>,
    </p>
    <p style="margin:0 0 20px;color:#374151;font-size:16px;line-height:1.6;">
      Gracias por contactar con Detail Park Academy. Hemos recibido tu consulta sobre
      <strong style="color:#7C3AED;">"${sanitizeHtml(formLabel)}"</strong> y te responderemos
      en menos de <strong style="color:#111827;">24 horas</strong>.
    </p>
    <p style="margin:0 0 30px;color:#374151;font-size:16px;line-height:1.6;">
      Mientras tanto, si tienes alguna pregunta urgente, no dudes en contactarnos directamente:
    </p>

    <!-- Contact Box -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F5F3FF;border-radius:8px;border:1px solid #DDD6FE;">
    <tr><td style="padding:24px;">
      <p style="margin:0 0 16px;color:#111827;font-size:15px;font-weight:600;">Necesitas respuesta urgente?</p>
      <p style="margin:0 0 8px;color:#374151;font-size:14px;">Llamanos: <a href="tel:+34622773555" style="color:#7C3AED;text-decoration:none;font-weight:500;">+34 622 773 555</a></p>
      <p style="margin:0;color:#374151;font-size:14px;">WhatsApp: <a href="https://wa.me/34622773555" style="color:#7C3AED;text-decoration:none;font-weight:500;">+34 622 773 555</a></p>
    </td></tr>
    </table>
  </td></tr>

  <!-- Footer -->
  <tr><td style="background-color:#F9FAFB;padding:30px 40px;border-top:1px solid #E5E7EB;">
    <p style="margin:0 0 16px;color:#111827;font-size:15px;font-weight:600;text-align:center;">Gracias por tu interes</p>
    <p style="margin:0 0 20px;color:#6B7280;font-size:14px;text-align:center;">El equipo de Detail Park</p>
    <p style="margin:0;text-align:center;"><a href="https://academiadetail.com" style="color:#7C3AED;font-size:13px;text-decoration:none;">www.academiadetail.com</a></p>
  </td></tr>
</table>

<table width="600" cellpadding="0" cellspacing="0">
<tr><td style="padding:20px;text-align:center;">
  <p style="margin:0;color:#6B7280;font-size:11px;">Este email fue enviado porque completaste el formulario de contacto en nuestra web.</p>
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
    const body: ContactRequest = await req.json();
    const { nombre, apellidos, email, telefono, experiencia, centro_propio, inversion, tipo_formacion, mensaje, source } = body;

    if (!nombre || !apellidos || !email || !telefono || !experiencia || !centro_propio || !inversion || !tipo_formacion || !source) {
      console.error("Validation failed: Missing required fields", { nombre: !!nombre, apellidos: !!apellidos, email: !!email, source: !!source });
      return new Response(
        JSON.stringify({ error: "Todos los campos obligatorios son requeridos" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error("Validation failed: Invalid email format");
      return new Response(
        JSON.stringify({ error: "El formato del email no es valido" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (nombre.length > 50 || apellidos.length > 100 || email.length > 255 || (mensaje && mensaje.length > 1000)) {
      console.error("Validation failed: Field length exceeded");
      return new Response(
        JSON.stringify({ error: "Uno o mas campos exceden la longitud permitida" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const contactData: ContactRequest = { nombre, apellidos, email, telefono, experiencia, centro_propio, inversion, tipo_formacion, mensaje, source };

    console.log("Processing contact form submission:", {
      nombre, apellidos, tipo_formacion, source,
      timestamp: new Date().toISOString(),
    });

    const adminEmailResponse = await resend.emails.send({
      from: "Detail Park Academy <noreply@academiadetail.com>",
      to: [adminEmail],
      replyTo: email,
      subject: `Nuevo lead: ${formacionLabels[tipo_formacion] || tipo_formacion} - ${nombre} ${apellidos}`,
      html: generateAdminEmail(contactData),
    });

    console.log("Admin email sent:", adminEmailResponse);

    const clientEmailResponse = await resend.emails.send({
      from: "Detail Park Academy <noreply@academiadetail.com>",
      to: [email],
      subject: "Hemos recibido tu mensaje - Detail Park Academy",
      html: generateClientEmail(contactData),
    });

    console.log("Client confirmation email sent:", clientEmailResponse);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Emails enviados correctamente",
        adminEmailId: adminEmailResponse.data?.id,
        clientEmailId: clientEmailResponse.data?.id,
      }),
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

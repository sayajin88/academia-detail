import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const adminEmail = Deno.env.get("ADMIN_EMAIL") || "info@detailpark.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  subjectLabel: string;
  message: string;
}

// Subject badge colors
const subjectColors: Record<string, { bg: string; text: string }> = {
  general: { bg: "#6B7280", text: "#FFFFFF" },
  detailing: { bg: "#8B5CF6", text: "#FFFFFF" },
  wrapping: { bg: "#3B82F6", text: "#FFFFFF" },
  ppf: { bg: "#10B981", text: "#FFFFFF" },
  restauracion: { bg: "#F59E0B", text: "#1F2937" },
  negocio: { bg: "#EF4444", text: "#FFFFFF" },
  otro: { bg: "#374151", text: "#FFFFFF" },
};

// Sanitize HTML to prevent XSS
const sanitizeHtml = (text: string): string => {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/\n/g, "<br>");
};

// Generate admin email HTML
const generateAdminEmail = (data: ContactRequest): string => {
  const colors = subjectColors[data.subject] || subjectColors.general;
  const sanitizedMessage = sanitizeHtml(data.message);
  const sanitizedName = sanitizeHtml(data.name);
  
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0F0F0F;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0F0F0F; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #1A1A1A; border-radius: 16px; overflow: hidden; border: 1px solid #2A2A2A;">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%); padding: 30px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <h1 style="margin: 0; color: #FFFFFF; font-size: 24px; font-weight: 700;">
                      🔔 Nuevo Mensaje de Contacto
                    </h1>
                    <p style="margin: 8px 0 0; color: rgba(255,255,255,0.85); font-size: 14px;">
                      Recibido el ${new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Badge -->
          <tr>
            <td style="padding: 30px 40px 0;">
              <span style="display: inline-block; background-color: ${colors.bg}; color: ${colors.text}; padding: 8px 16px; border-radius: 20px; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                ${sanitizeHtml(data.subjectLabel)}
              </span>
            </td>
          </tr>
          
          <!-- Contact Info -->
          <tr>
            <td style="padding: 24px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #252525; border-radius: 12px; overflow: hidden;">
                <tr>
                  <td style="padding: 20px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #333;">
                          <span style="color: #9CA3AF; font-size: 13px; display: block;">Nombre</span>
                          <span style="color: #FFFFFF; font-size: 16px; font-weight: 500;">${sanitizedName}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #333;">
                          <span style="color: #9CA3AF; font-size: 13px; display: block;">Email</span>
                          <a href="mailto:${data.email}" style="color: #8B5CF6; font-size: 16px; font-weight: 500; text-decoration: none;">${sanitizeHtml(data.email)}</a>
                        </td>
                      </tr>
                      ${data.phone ? `
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #333;">
                          <span style="color: #9CA3AF; font-size: 13px; display: block;">Teléfono</span>
                          <a href="tel:${data.phone}" style="color: #8B5CF6; font-size: 16px; font-weight: 500; text-decoration: none;">${sanitizeHtml(data.phone)}</a>
                        </td>
                      </tr>
                      ` : ''}
                      <tr>
                        <td style="padding: 8px 0;">
                          <span style="color: #9CA3AF; font-size: 13px; display: block;">Asunto</span>
                          <span style="color: #FFFFFF; font-size: 16px; font-weight: 500;">${sanitizeHtml(data.subjectLabel)}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Message -->
          <tr>
            <td style="padding: 0 40px 24px;">
              <h3 style="margin: 0 0 12px; color: #FFFFFF; font-size: 16px; font-weight: 600;">
                📝 Mensaje
              </h3>
              <div style="background-color: #252525; border-radius: 12px; padding: 20px; border-left: 4px solid #8B5CF6;">
                <p style="margin: 0; color: #E5E7EB; font-size: 15px; line-height: 1.6;">
                  ${sanitizedMessage}
                </p>
              </div>
            </td>
          </tr>
          
          <!-- CTA Button -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="mailto:${data.email}?subject=Re: ${encodeURIComponent(data.subjectLabel)} - Detail Park Academy" 
                       style="display: inline-block; background: linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%); color: #FFFFFF; padding: 14px 32px; border-radius: 8px; font-size: 15px; font-weight: 600; text-decoration: none;">
                      📧 Responder a ${sanitizedName}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #151515; padding: 20px 40px; border-top: 1px solid #2A2A2A;">
              <p style="margin: 0; color: #6B7280; font-size: 12px; text-align: center;">
                Este mensaje fue enviado desde el formulario de contacto de Detail Park Academy
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

// Generate client confirmation email HTML
const generateClientEmail = (data: ContactRequest): string => {
  const sanitizedName = sanitizeHtml(data.name.split(' ')[0]);
  
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0F0F0F;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0F0F0F; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #1A1A1A; border-radius: 16px; overflow: hidden; border: 1px solid #2A2A2A;">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%); padding: 40px; text-align: center;">
              <h1 style="margin: 0 0 8px; color: #FFFFFF; font-size: 28px; font-weight: 700;">
                DETAIL PARK
              </h1>
              <p style="margin: 0; color: rgba(255,255,255,0.9); font-size: 14px; letter-spacing: 2px; text-transform: uppercase;">
                Academy
              </p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 24px; color: #FFFFFF; font-size: 22px; font-weight: 600;">
                ¡Hemos recibido tu mensaje! ✨
              </h2>
              
              <p style="margin: 0 0 20px; color: #D1D5DB; font-size: 16px; line-height: 1.6;">
                Hola <strong style="color: #FFFFFF;">${sanitizedName}</strong>,
              </p>
              
              <p style="margin: 0 0 20px; color: #D1D5DB; font-size: 16px; line-height: 1.6;">
                Gracias por contactar con Detail Park Academy. Hemos recibido tu consulta sobre 
                <strong style="color: #8B5CF6;">"${sanitizeHtml(data.subjectLabel)}"</strong> y te responderemos 
                en menos de <strong style="color: #FFFFFF;">24 horas</strong>.
              </p>
              
              <p style="margin: 0 0 30px; color: #D1D5DB; font-size: 16px; line-height: 1.6;">
                Mientras tanto, si tienes alguna pregunta urgente, no dudes en contactarnos directamente:
              </p>
              
              <!-- Contact Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(109, 40, 217, 0.1) 100%); border-radius: 12px; border: 1px solid rgba(139, 92, 246, 0.3);">
                <tr>
                  <td style="padding: 24px;">
                    <p style="margin: 0 0 16px; color: #FFFFFF; font-size: 15px; font-weight: 600;">
                      ¿Necesitas respuesta urgente?
                    </p>
                    <p style="margin: 0 0 8px; color: #D1D5DB; font-size: 14px;">
                      📞 Llámanos: <a href="tel:+34644440851" style="color: #8B5CF6; text-decoration: none; font-weight: 500;">+34 644 440 851</a>
                    </p>
                    <p style="margin: 0; color: #D1D5DB; font-size: 14px;">
                      📱 WhatsApp: <a href="https://wa.me/34644440851" style="color: #8B5CF6; text-decoration: none; font-weight: 500;">+34 644 440 851</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #151515; padding: 30px 40px; border-top: 1px solid #2A2A2A;">
              <p style="margin: 0 0 16px; color: #FFFFFF; font-size: 15px; font-weight: 600; text-align: center;">
                ¡Gracias por tu interés!
              </p>
              <p style="margin: 0 0 20px; color: #9CA3AF; font-size: 14px; text-align: center;">
                El equipo de Detail Park
              </p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="https://detailing-ignition-landing.lovable.app" style="color: #8B5CF6; font-size: 13px; text-decoration: none;">
                      www.detailpark.com
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        
        <!-- Unsubscribe -->
        <table width="600" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding: 20px; text-align: center;">
              <p style="margin: 0; color: #6B7280; font-size: 11px;">
                Este email fue enviado porque completaste el formulario de contacto en nuestra web.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, subject, subjectLabel, message }: ContactRequest = await req.json();

    // Server-side validation
    if (!name || !email || !subject || !subjectLabel || !message) {
      console.error("Validation failed: Missing required fields");
      return new Response(
        JSON.stringify({ error: "Todos los campos obligatorios son requeridos" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error("Validation failed: Invalid email format");
      return new Response(
        JSON.stringify({ error: "El formato del email no es válido" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Length validations
    if (name.length > 100 || email.length > 255 || message.length > 1000) {
      console.error("Validation failed: Field length exceeded");
      return new Response(
        JSON.stringify({ error: "Uno o más campos exceden la longitud permitida" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const contactData: ContactRequest = { name, email, phone, subject, subjectLabel, message };

    console.log("Processing contact form submission:", { 
      name, 
      subject, 
      subjectLabel,
      timestamp: new Date().toISOString() 
    });

    // Send email to admin
    const adminEmailResponse = await resend.emails.send({
      from: "Detail Park Academy <onboarding@resend.dev>",
      to: [adminEmail],
      replyTo: email,
      subject: `📬 Nuevo mensaje: ${subjectLabel} - ${name}`,
      html: generateAdminEmail(contactData),
    });

    console.log("Admin email sent:", adminEmailResponse);

    // Send confirmation email to client
    const clientEmailResponse = await resend.emails.send({
      from: "Detail Park Academy <onboarding@resend.dev>",
      to: [email],
      subject: "✨ Hemos recibido tu mensaje - Detail Park Academy",
      html: generateClientEmail(contactData),
    });

    console.log("Client confirmation email sent:", clientEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Emails enviados correctamente",
        adminEmailId: adminEmailResponse.data?.id,
        clientEmailId: clientEmailResponse.data?.id
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Error al enviar el email" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);

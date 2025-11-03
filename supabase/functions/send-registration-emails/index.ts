import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface RegistrationData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  eventDate: string;
  price: string;
  reservationExpiresAt: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const registrationData: RegistrationData = await req.json();
    console.log("Processing registration emails for:", registrationData.email);

    const adminEmail = Deno.env.get("ADMIN_EMAIL");
    if (!adminEmail) {
      throw new Error("ADMIN_EMAIL not configured");
    }

    // Email de confirmación para el cliente
    const clientEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              background-color: #0a0a0a;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
              border-radius: 16px;
              overflow: hidden;
            }
            .header {
              background: linear-gradient(135deg, #EF3B24 0%, #c41e0a 100%);
              padding: 40px 30px;
              text-align: center;
            }
            .header h1 {
              color: #ffffff;
              margin: 0;
              font-size: 28px;
              font-weight: 800;
              text-transform: uppercase;
              letter-spacing: 2px;
            }
            .content {
              padding: 40px 30px;
              color: #e0e0e0;
            }
            .registration-id {
              background: rgba(239, 59, 36, 0.1);
              border: 2px solid #EF3B24;
              border-radius: 8px;
              padding: 20px;
              text-align: center;
              margin: 30px 0;
            }
            .registration-id-label {
              color: #999;
              font-size: 12px;
              text-transform: uppercase;
              letter-spacing: 1px;
              margin-bottom: 8px;
            }
            .registration-id-value {
              color: #EF3B24;
              font-size: 24px;
              font-weight: bold;
              font-family: 'Courier New', monospace;
            }
            .info-box {
              background: rgba(255, 255, 255, 0.05);
              border-radius: 12px;
              padding: 25px;
              margin: 25px 0;
              border: 1px solid rgba(255, 255, 255, 0.1);
            }
            .info-row {
              display: flex;
              justify-content: space-between;
              padding: 12px 0;
              border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            }
            .info-row:last-child {
              border-bottom: none;
            }
            .info-label {
              color: #999;
              font-size: 14px;
            }
            .info-value {
              color: #ffffff;
              font-weight: 600;
              text-align: right;
            }
            .steps {
              margin: 30px 0;
            }
            .step {
              display: flex;
              gap: 15px;
              margin-bottom: 20px;
              padding: 20px;
              background: rgba(255, 255, 255, 0.03);
              border-radius: 8px;
              border-left: 4px solid #EF3B24;
            }
            .step-number {
              background: #EF3B24;
              color: white;
              width: 32px;
              height: 32px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
              flex-shrink: 0;
            }
            .step-content h3 {
              margin: 0 0 8px 0;
              color: #ffffff;
              font-size: 16px;
            }
            .step-content p {
              margin: 0;
              color: #b0b0b0;
              font-size: 14px;
            }
            .important-info {
              background: linear-gradient(135deg, rgba(239, 59, 36, 0.1) 0%, rgba(239, 59, 36, 0.05) 100%);
              border: 1px solid rgba(239, 59, 36, 0.3);
              border-radius: 12px;
              padding: 25px;
              margin: 30px 0;
            }
            .important-info h3 {
              color: #EF3B24;
              margin: 0 0 15px 0;
              font-size: 18px;
            }
            .important-info ul {
              margin: 0;
              padding-left: 20px;
              color: #e0e0e0;
            }
            .important-info li {
              margin-bottom: 8px;
              font-size: 14px;
            }
            .footer {
              background: rgba(0, 0, 0, 0.5);
              padding: 30px;
              text-align: center;
              color: #666;
              font-size: 12px;
            }
            .price-highlight {
              color: #EF3B24;
              font-size: 24px;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>¡Pre-inscripción Exitosa!</h1>
            </div>
            
            <div class="content">
              <p>Hola <strong>${registrationData.firstName}</strong>,</p>
              <p>¡Gracias por reservar tu plaza en <strong>La Jornada Cero</strong>! Tu pre-inscripción ha sido procesada correctamente.</p>
              
              <div class="registration-id">
                <div class="registration-id-label">ID de Pre-inscripción</div>
                <div class="registration-id-value">${registrationData.id.slice(0, 8).toUpperCase()}</div>
              </div>
              
              <div class="info-box">
                <div class="info-row">
                  <span class="info-label">Nombre completo</span>
                  <span class="info-value">${registrationData.firstName} ${registrationData.lastName}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Email</span>
                  <span class="info-value">${registrationData.email}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Teléfono</span>
                  <span class="info-value">${registrationData.phone}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Fecha del evento</span>
                  <span class="info-value">${registrationData.eventDate}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Precio</span>
                  <span class="info-value price-highlight">${registrationData.price}</span>
                </div>
              </div>
              
              <h2 style="color: #ffffff; margin-top: 40px;">Próximos Pasos</h2>
              
              <div class="steps">
                <div class="step">
                  <div class="step-number">1</div>
                  <div class="step-content">
                    <h3>📧 Confirma tu email</h3>
                    <p>Este correo confirma tu pre-inscripción. Guárdalo para futura referencia.</p>
                  </div>
                </div>
                
                <div class="step">
                  <div class="step-number">2</div>
                  <div class="step-content">
                    <h3>💳 Recibirás el enlace de pago</h3>
                    <p>En las próximas 24-48h te enviaremos un email con el enlace para completar tu pago de forma segura.</p>
                  </div>
                </div>
                
                <div class="step">
                  <div class="step-number">3</div>
                  <div class="step-content">
                    <h3>⏰ Completa tu pago (7 días)</h3>
                    <p>Tendrás 7 días desde ahora para confirmar tu plaza realizando el pago.</p>
                  </div>
                </div>
                
                <div class="step">
                  <div class="step-number">4</div>
                  <div class="step-content">
                    <h3>🎉 ¡Listo para La Jornada Cero!</h3>
                    <p>Una vez completado el pago, recibirás toda la información detallada del evento.</p>
                  </div>
                </div>
              </div>
              
              <div class="important-info">
                <h3>📌 Información Importante</h3>
                <ul>
                  <li>Tu reserva expira el: <strong>${registrationData.reservationExpiresAt}</strong></li>
                  <li>Plazas limitadas a <strong>10 personas</strong> por evento</li>
                  <li>Precio especial: <strong>${registrationData.price}</strong> (70% de descuento)</li>
                  <li>Fecha del evento: <strong>${registrationData.eventDate}</strong></li>
                  <li>Horario: <strong>10:00 AM - 18:00 PM</strong></li>
                </ul>
              </div>
              
              <p style="margin-top: 30px;">Si tienes alguna duda, no dudes en contactarnos respondiendo a este email.</p>
              
              <p style="margin-top: 20px;"><strong>¡Nos vemos pronto!</strong><br>El equipo de Detail Park</p>
            </div>
            
            <div class="footer">
              <p><strong>Detail Park</strong></p>
              <p>Formación profesional en Detailing</p>
              <p style="margin-top: 15px;">© 2025 Detail Park S.L. Todos los derechos reservados.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Email de notificación para el administrador
    const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              color: #333;
              background-color: #f5f5f5;
              margin: 0;
              padding: 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: white;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
              overflow: hidden;
            }
            .header {
              background: #EF3B24;
              padding: 30px;
              text-align: center;
            }
            .header h1 {
              color: white;
              margin: 0;
              font-size: 24px;
            }
            .content {
              padding: 30px;
            }
            .info-table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
            }
            .info-table td {
              padding: 12px;
              border-bottom: 1px solid #eee;
            }
            .info-table td:first-child {
              font-weight: 600;
              width: 40%;
              color: #666;
            }
            .badge {
              display: inline-block;
              background: #4CAF50;
              color: white;
              padding: 6px 12px;
              border-radius: 20px;
              font-size: 12px;
              font-weight: 600;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎯 Nueva Pre-inscripción</h1>
            </div>
            <div class="content">
              <p><span class="badge">NUEVA INSCRIPCIÓN</span></p>
              <h2>Detalles del Registro</h2>
              <table class="info-table">
                <tr>
                  <td>ID de Registro:</td>
                  <td><strong>${registrationData.id}</strong></td>
                </tr>
                <tr>
                  <td>Nombre:</td>
                  <td>${registrationData.firstName} ${registrationData.lastName}</td>
                </tr>
                <tr>
                  <td>Email:</td>
                  <td><a href="mailto:${registrationData.email}">${registrationData.email}</a></td>
                </tr>
                <tr>
                  <td>Teléfono:</td>
                  <td><a href="tel:${registrationData.phone}">${registrationData.phone}</a></td>
                </tr>
                <tr>
                  <td>Fecha del Evento:</td>
                  <td>${registrationData.eventDate}</td>
                </tr>
                <tr>
                  <td>Precio:</td>
                  <td><strong style="color: #EF3B24;">${registrationData.price}</strong></td>
                </tr>
                <tr>
                  <td>Estado:</td>
                  <td><strong style="color: #FF9800;">Pendiente de pago</strong></td>
                </tr>
                <tr>
                  <td>Reserva expira:</td>
                  <td>${registrationData.reservationExpiresAt}</td>
                </tr>
              </table>
              <p style="margin-top: 30px; padding: 15px; background: #fff3cd; border-left: 4px solid #ffc107; border-radius: 4px;">
                <strong>⚠️ Acción requerida:</strong> Debes enviar el enlace de pago a este cliente en las próximas 24-48 horas.
              </p>
              <p style="margin-top: 20px; color: #666; font-size: 14px;">
                Este email se ha generado automáticamente desde el sistema de pre-inscripción de Detail Park.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Enviar email al cliente
    const clientEmailResponse = await resend.emails.send({
      from: "Detail Park <onboarding@resend.dev>",
      to: [registrationData.email],
      subject: "✅ Pre-inscripción confirmada - La Jornada Cero | Detail Park",
      html: clientEmailHtml,
    });

    console.log("Client email sent:", clientEmailResponse);

    // Enviar email al administrador
    const adminEmailResponse = await resend.emails.send({
      from: "Detail Park Notificaciones <onboarding@resend.dev>",
      to: [adminEmail],
      subject: `🎯 Nueva pre-inscripción: ${registrationData.firstName} ${registrationData.lastName}`,
      html: adminEmailHtml,
    });

    console.log("Admin email sent:", adminEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        clientEmailId: clientEmailResponse.data?.id,
        adminEmailId: adminEmailResponse.data?.id
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-registration-emails function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);

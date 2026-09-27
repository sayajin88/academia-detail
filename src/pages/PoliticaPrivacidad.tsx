import { MainLayout } from '@/components/layout/MainLayout';
import { SEO } from '@/components/SEO';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';

export default function PoliticaPrivacidad() {
  return (
    <MainLayout>
      <SEO
        title="Política de Privacidad | Academia Detail"
        description="Política de privacidad y protección de datos personales de Academia Detail. Cumplimiento RGPD y LOPD."
        url="/politica-privacidad"
      />

      <div className="ds-container pt-2">
        <Breadcrumbs items={[{ name: 'Privacidad y aviso legal', url: '/politica-privacidad' }]} />
      </div>
      <div className="bg-background pb-16 pt-4 md:pb-24">
        <div className="ds-narrow">
          <div>
            <h1 className="ds-h1 mb-10 text-foreground">
              Política de Privacidad
            </h1>

            <div className="space-y-10 text-[0.9375rem] leading-relaxed text-muted-foreground">
              {/* Responsable */}
              <section>
                <h2 className="mb-3 text-2xl text-foreground">1. Responsable del Tratamiento</h2>
                <ul className="list-none space-y-1">
                  <li><strong className="text-foreground">Razón social:</strong> Detailing Car & Parking Club S.L.</li>
                  <li><strong className="text-foreground">CIF:</strong> B75683300</li>
                  <li><strong className="text-foreground">Dirección:</strong> Calle Metalurgias, 13 – 03008 Alicante, España</li>
                  <li><strong className="text-foreground">Email:</strong> info@academiadetail.com</li>
                  <li><strong className="text-foreground">Teléfono:</strong> +34 622 773 555</li>
                </ul>
              </section>

              {/* Datos recogidos */}
              <section>
                <h2 className="mb-3 text-2xl text-foreground">2. Datos Personales que Recogemos</h2>
                <p>Recogemos los datos que nos facilitas voluntariamente a través de nuestros formularios de contacto e inscripción: nombre, apellidos, email, teléfono y, en su caso, datos relativos a tu experiencia profesional e interés formativo.</p>
              </section>

              {/* Finalidad */}
              <section>
                <h2 className="mb-3 text-2xl text-foreground">3. Finalidad del Tratamiento</h2>
                <p>Tus datos se tratan con las siguientes finalidades:</p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>Gestionar tu solicitud de información o inscripción en nuestras formaciones.</li>
                  <li>Enviarte comunicaciones relacionadas con nuestros cursos y novedades, siempre con tu consentimiento previo.</li>
                  <li>Cumplir con las obligaciones legales que nos sean de aplicación.</li>
                </ul>
              </section>

              {/* Base legal */}
              <section>
                <h2 className="mb-3 text-2xl text-foreground">4. Base Legal</h2>
                <p>El tratamiento de tus datos se fundamenta en tu consentimiento expreso, que otorgas al marcar la casilla de aceptación en nuestros formularios, así como en la ejecución de la relación contractual cuando te inscribes en una formación.</p>
              </section>

              {/* Destinatarios */}
              <section>
                <h2 className="mb-3 text-2xl text-foreground">5. Destinatarios</h2>
                <p>Tus datos no serán cedidos a terceros, salvo obligación legal. Utilizamos proveedores de servicios (hosting y email marketing) que actúan como encargados de tratamiento bajo acuerdos de confidencialidad.</p>
              </section>

              {/* Derechos */}
              <section>
                <h2 className="mb-3 text-2xl text-foreground">6. Tus Derechos</h2>
                <p>Puedes ejercer tus derechos de acceso, rectificación, supresión, portabilidad, limitación y oposición enviando un email a <a href="mailto:info@academiadetail.com" className="text-brand hover:underline">info@academiadetail.com</a> indicando tu nombre completo y el derecho que deseas ejercer.</p>
                <p className="mt-2">Asimismo, puedes presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD) si consideras que tus derechos no han sido atendidos correctamente.</p>
              </section>

              {/* Conservación */}
              <section>
                <h2 className="mb-3 text-2xl text-foreground">7. Plazo de Conservación</h2>
                <p>Tus datos se conservarán mientras exista una relación formativa o contractual vigente, y una vez finalizada, durante los plazos legalmente establecidos para atender posibles responsabilidades.</p>
              </section>

              {/* Cookies */}
              <section>
                <h2 className="mb-3 text-2xl text-foreground">8. Política de Cookies</h2>
                <p>Este sitio web utiliza cookies propias y de terceros para mejorar la experiencia de navegación, analizar el tráfico y personalizar contenidos. Puedes configurar o rechazar las cookies a través de la configuración de tu navegador.</p>
                <p className="mt-2">Las cookies que utilizamos son:</p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li><strong className="text-foreground">Técnicas:</strong> necesarias para el funcionamiento del sitio.</li>
                  <li><strong className="text-foreground">Analíticas:</strong> nos ayudan a entender cómo interactúas con el sitio (Google Analytics).</li>
                  <li><strong className="text-foreground">De terceros:</strong> YouTube (vídeos embebidos), que pueden instalar cookies propias.</li>
                </ul>
              </section>

              {/* Términos */}
              <section>
                <h2 className="mb-3 text-2xl text-foreground">9. Términos y Condiciones</h2>
                <p>El acceso y uso de este sitio web implica la aceptación de las presentes condiciones. Todo el contenido (textos, imágenes, vídeos, logotipos) es propiedad de Detailing Car & Parking Club S.L. (CIF: B75683300) y está protegido por la legislación de propiedad intelectual.</p>
                <p className="mt-2">Queda prohibida la reproducción total o parcial del contenido sin autorización expresa. Los precios de las formaciones son orientativos y pueden variar. Las plazas están sujetas a disponibilidad.</p>
              </section>

              {/* Aviso legal */}
              <section>
                <h2 className="mb-3 text-2xl text-foreground">10. Aviso Legal</h2>
                <p>En cumplimiento de la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa que este sitio web es propiedad de Detailing Car & Parking Club S.L., con CIF B75683300 y domicilio en Calle Metalurgias, 13 – 03008 Alicante.</p>
              </section>

              {/* Última actualización */}
              <div className="pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Última actualización: septiembre de 2026
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

import { MainLayout } from '@/components/layout/MainLayout';
import { SEO } from '@/components/SEO';
import { AnimatedSection } from '@/components/shared/AnimatedSection';

export default function PoliticaPrivacidad() {
  return (
    <MainLayout>
      <SEO
        title="Política de Privacidad | Academia Detail"
        description="Política de privacidad y protección de datos personales de Academia Detail. Cumplimiento RGPD y LOPD."
        url="/politica-privacidad"
      />

      <div className="pt-32 pb-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <AnimatedSection animation="fade-up">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
              Política de Privacidad
            </h1>

            <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground text-sm leading-relaxed">
              {/* Responsable */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">1. Responsable del Tratamiento</h2>
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
                <h2 className="text-xl font-semibold text-foreground mb-3">2. Datos Personales que Recogemos</h2>
                <p>Recogemos los datos que nos facilitas voluntariamente a través de nuestros formularios de contacto e inscripción: nombre, apellidos, email, teléfono y, en su caso, datos relativos a tu experiencia profesional e interés formativo.</p>
              </section>

              {/* Finalidad */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">3. Finalidad del Tratamiento</h2>
                <p>Tus datos se tratan con las siguientes finalidades:</p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>Gestionar tu solicitud de información o inscripción en nuestras formaciones.</li>
                  <li>Enviarte comunicaciones relacionadas con nuestros cursos y novedades, siempre con tu consentimiento previo.</li>
                  <li>Cumplir con las obligaciones legales que nos sean de aplicación.</li>
                </ul>
              </section>

              {/* Base legal */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">4. Base Legal</h2>
                <p>El tratamiento de tus datos se fundamenta en tu consentimiento expreso, que otorgas al marcar la casilla de aceptación en nuestros formularios, así como en la ejecución de la relación contractual cuando te inscribes en una formación.</p>
              </section>

              {/* Destinatarios */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">5. Destinatarios</h2>
                <p>Tus datos no serán cedidos a terceros, salvo obligación legal. Utilizamos proveedores de servicios (hosting, email marketing, pasarela de pagos) que actúan como encargados de tratamiento bajo acuerdos de confidencialidad.</p>
              </section>

              {/* Derechos */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">6. Tus Derechos</h2>
                <p>Puedes ejercer tus derechos de acceso, rectificación, supresión, portabilidad, limitación y oposición enviando un email a <a href="mailto:info@academiadetail.com" className="text-primary hover:underline">info@academiadetail.com</a> indicando tu nombre completo y el derecho que deseas ejercer.</p>
                <p className="mt-2">Asimismo, puedes presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD) si consideras que tus derechos no han sido atendidos correctamente.</p>
              </section>

              {/* Conservación */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">7. Plazo de Conservación</h2>
                <p>Tus datos se conservarán mientras exista una relación formativa o contractual vigente, y una vez finalizada, durante los plazos legalmente establecidos para atender posibles responsabilidades.</p>
              </section>

              {/* Cookies */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">8. Política de Cookies</h2>
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
                <h2 className="text-xl font-semibold text-foreground mb-3">9. Términos y Condiciones</h2>
                <p>El acceso y uso de este sitio web implica la aceptación de las presentes condiciones. Todo el contenido (textos, imágenes, vídeos, logotipos) es propiedad de Detailing Car & Parking Club S.L. (CIF: B75683300) y está protegido por la legislación de propiedad intelectual.</p>
                <p className="mt-2">Queda prohibida la reproducción total o parcial del contenido sin autorización expresa. Los precios de las formaciones son orientativos y pueden variar. Las plazas están sujetas a disponibilidad.</p>
              </section>

              {/* Aviso legal */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">10. Aviso Legal</h2>
                <p>En cumplimiento de la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa que este sitio web es propiedad de Detailing Car & Parking Club S.L., con CIF B75683300 y domicilio en Calle Metalurgias, 13 – 03008 Alicante.</p>
              </section>

              {/* Última actualización */}
              <div className="pt-6 border-t border-border">
                <p className="text-xs text-muted-foreground/60">
                  Última actualización: febrero de {new Date().getFullYear()}
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </MainLayout>
  );
}

import { FormationDetail } from '@/data/formationDetails';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Award, Briefcase, CheckCircle } from 'lucide-react';

interface FormationCertificationProps {
  formation: FormationDetail;
}

export function FormationCertification({ formation }: FormationCertificationProps) {
  if (!formation.certificationText) return null;

  // Use formation-specific certification title or default with SEO keywords
  const certTitle = formation.certificationTitle || 'Certificación con Reconocimiento Nacional';

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <SectionHeading
            badge="Certificación"
            title={certTitle}
            subtitle="Tu inversión en formación reconocida por el sector profesional"
          />
        </AnimatedSection>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Certificate Image */}
            {formation.certificationImage && (
              <AnimatedSection className="order-2 md:order-1">
                <div className="relative">
                  <div className="rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 border border-primary/20">
                    <img
                      src={formation.certificationImage}
                      alt="Certificado Detail Park"
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg">
                    <Award className="w-8 h-8 text-primary-foreground" />
                  </div>
                </div>
              </AnimatedSection>
            )}

            {/* Content */}
            <AnimatedSection delay={200} className="order-1 md:order-2">
              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {formation.certificationText}
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-background rounded-xl border border-border/50">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Award className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Certificado Oficial</h4>
                      <p className="text-sm text-muted-foreground">
                        Diploma que avala tus conocimientos y añade valor a tu currículum profesional.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-background rounded-xl border border-border/50">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Briefcase className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Bolsa de Empleo</h4>
                      <p className="text-sm text-muted-foreground">
                        Acceso exclusivo a nuestra bolsa de empleo nacional con oportunidades en el sector.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-background rounded-xl border border-border/50">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <CheckCircle className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Reconocimiento del Sector</h4>
                      <p className="text-sm text-muted-foreground">
                        Tu certificación será reconocida por empresas y profesionales de toda España.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}

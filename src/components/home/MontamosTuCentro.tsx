import { Link } from 'react-router-dom';
import { ArrowRight, Store, GraduationCap, Wrench, Gauge, TrendingUp, Shield, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/shared/SectionHeading';

const steps = [
  {
    icon: GraduationCap,
    title: 'Formación Completa',
    description: 'Domina todas las técnicas con nuestra Carrera Negocio',
  },
  {
    icon: Store,
    title: 'Plan de Negocio',
    description: 'Te ayudamos a definir tu modelo de negocio rentable',
  },
  {
    icon: Wrench,
    title: 'Equipamiento',
    description: 'Asesoramiento en herramientas y productos profesionales',
  },
  {
    icon: Gauge,
    title: 'Lanzamiento',
    description: 'Apertura de tu centro con todo preparado',
  },
  {
    icon: TrendingUp,
    title: 'Crecimiento',
    description: 'Mentoría continua para escalar tu negocio',
  },
];

const benefits = [
  'Sin franquicia - Tú eres el dueño al 100%',
  'Inversión adaptada a tu presupuesto',
  'Red de proveedores con descuentos exclusivos',
  'Soporte continuo post-apertura',
  'Acceso a nuestra comunidad de emprendedores',
];

export function MontamosTuCentro() {
  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary-glow/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeading
          badge="Servicio Exclusivo"
          title="Cómo Montar un Lavadero de Coches Profesional"
          subtitle="Te acompañamos en todo el proceso: desde aprender detailing hasta abrir tu centro y conseguir tus primeros clientes"
        />

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Timeline Column */}
          <div className="relative">
            <h3 className="text-xl font-semibold text-foreground mb-8">
              Tu Camino al Éxito en 5 Pasos
            </h3>
            
            <div className="space-y-0">
              {steps.map((step, index) => (
                <div key={step.title} className="flex gap-4 group">
                  {/* Timeline line */}
                  <div className="relative flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm z-10 group-hover:scale-110 transition-transform shadow-lg shadow-primary/30">
                      {index + 1}
                    </div>
                    {index < steps.length - 1 && (
                      <div className="w-0.5 flex-1 bg-gradient-to-b from-primary/40 to-border min-h-[40px]" />
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="pb-8">
                    <div className="flex items-center gap-2 mb-1">
                      <step.icon className="h-4 w-4 text-primary" />
                      <h4 className="font-semibold text-foreground">{step.title}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits Column */}
          <div className="bg-card rounded-2xl border border-border p-6 md:p-8 relative overflow-hidden">
            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/20 to-transparent pointer-events-none" />
            
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary text-primary-foreground">
                <Shield className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Sin Franquicias
              </h3>
            </div>

            <p className="text-muted-foreground mb-6">
              A diferencia de otros modelos, <strong className="text-foreground">tú eres el dueño al 100%</strong> de tu negocio. 
              Sin royalties, sin cuotas mensuales, sin restricciones. Tu marca, tus decisiones, tus beneficios.
            </p>

            <ul className="space-y-3 mb-8">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-xl mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">+50</div>
                <div className="text-xs text-muted-foreground">Centros Montados</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">85%</div>
                <div className="text-xs text-muted-foreground">Éxito Empresarial</div>
              </div>
            </div>

            {/* CTA */}
            <Button asChild size="lg" className="w-full group">
              <Link to="/contacto">
                Quiero Montar Mi Centro
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

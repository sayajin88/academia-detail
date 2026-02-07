import { Calculator, Crown, Settings, TrendingUp, Euro, Users, Target, Fuel } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { AnimatedSection } from '@/components/shared/AnimatedSection';

const businessModules = [
  {
    title: "Cálculo de Márgenes",
    description: "Aprende a calcular costes reales, márgenes de beneficio y precios competitivos que aseguren rentabilidad.",
    icon: Calculator,
    skills: ["Coste hora real", "Pricing estratégico", "ROI por servicio"],
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    title: "Captación de Clientes VIP",
    description: "Estrategias probadas para atraer propietarios de vehículos de alta gama que valoran la calidad.",
    icon: Crown,
    skills: ["Marketing local", "Referidos premium", "Posicionamiento de marca"],
    gradient: "from-amber-500 to-orange-500"
  },
  {
    title: "Gestión de Taller Operativo",
    description: "Desde la organización del espacio hasta la gestión de citas y workflow de trabajo.",
    icon: Settings,
    skills: ["Optimización de espacio", "Gestión de citas", "Proveedores y stock"],
    gradient: "from-purple-500 to-pink-500"
  },
  {
    title: "Escalado del Negocio",
    description: "Cómo pasar de autónomo a empresario: contratación, delegación y expansión.",
    icon: TrendingUp,
    skills: ["Primer empleado", "Procesos escalables", "Múltiples servicios"],
    gradient: "from-green-500 to-emerald-500"
  }
];

export function BusinessSkillsSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Fuel className="w-4 h-4 text-primary" />
              <span className="text-primary font-medium text-sm">Lo que NO te enseñan en otras academias</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Cómo Montar un{' '}
              <span className="text-primary">Negocio de Detailing</span>{' '}
              Rentable
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Te enseñamos todo lo que necesitas saber para montar tu lavadero de coches profesional: cálculo de márgenes, captación de clientes VIP y escalado del negocio.
            </p>
          </div>
        </AnimatedSection>

        {/* Stats Bar */}
        <AnimatedSection delay={0.1}>
          <div className="max-w-4xl mx-auto mb-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Euro, value: "€3.5K", label: "Facturación media/mes" },
                { icon: Users, value: "85%", label: "Montan su negocio" },
                { icon: Target, value: "6 meses", label: "Para ser rentable" },
                { icon: TrendingUp, value: "2x", label: "Ingresos año 2" },
              ].map((stat, index) => (
                <div 
                  key={stat.label}
                  className="text-center p-4 rounded-xl bg-muted/50 border border-border"
                >
                  <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Business Modules Grid */}
        <AnimatedSection delay={0.2}>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {businessModules.map((module, index) => {
              const Icon = module.icon;
              return (
                <Card 
                  key={module.title}
                  className="p-6 hover:border-primary/30 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${module.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{module.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{module.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {module.skills.map((skill) => (
                          <span 
                            key={skill}
                            className="px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </AnimatedSection>

        {/* Bottom Message */}
        <AnimatedSection delay={0.3}>
          <div className="mt-12 text-center">
            <div className="inline-block max-w-2xl mx-auto p-6 rounded-2xl bg-primary/5 border border-primary/20">
              <p className="text-lg font-medium mb-2">
                "La diferencia entre un técnico y un empresario es de{' '}
                <span className="text-primary font-bold">€30.000/año</span>"
              </p>
              <p className="text-muted-foreground text-sm">
                Nuestros alumnos no solo dominan la técnica, saben monetizarla.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
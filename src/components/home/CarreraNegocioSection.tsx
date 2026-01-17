import { Link } from 'react-router-dom';
import { 
  Crown, 
  GraduationCap, 
  Wrench, 
  TrendingUp, 
  Users, 
  Network, 
  Award,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { carreraNegocio } from '@/data/formations';

const iconMap: Record<string, React.ElementType> = {
  'Todas las Formaciones': GraduationCap,
  'Prácticas Reales': Wrench,
  'Gestión de Negocio': TrendingUp,
  'Mentoría Personalizada': Users,
  'Red de Profesionales': Network,
  'Certificación Completa': Award,
};

export function CarreraNegocioSection() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary-glow/10 via-transparent to-transparent" />

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-primary-glow/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-primary-glow/20 border border-primary/30 mb-6">
            <Crown className="h-4 w-4 text-primary" />
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Programa Premium
            </span>
            <Sparkles className="h-4 w-4 text-primary-glow" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            {carreraNegocio.title}
          </h2>
          <p className="text-xl md:text-2xl text-primary font-semibold mb-4">
            {carreraNegocio.subtitle}
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {carreraNegocio.description}
          </p>
        </div>

        {/* Main Card */}
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden">
            {/* Golden Border Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-glow to-primary rounded-3xl" />
            
            <div className="relative m-[2px] bg-card rounded-[22px] p-8 md:p-12">
              {/* Image & Content Grid */}
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-10">
                {/* Image */}
                <div className="relative">
                  <div
                    className="aspect-[4/3] rounded-2xl bg-cover bg-center"
                    style={{ backgroundImage: `url(${carreraNegocio.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl" />
                  
                  {/* Duration Badge */}
                  <div className="absolute bottom-4 left-4 px-4 py-2 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                    {carreraNegocio.duration}
                  </div>
                </div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {carreraNegocio.includes.map((item) => {
                    const Icon = iconMap[item.title] || GraduationCap;
                    return (
                      <div
                        key={item.title}
                        className="p-4 rounded-xl bg-muted/50 border border-border hover:border-primary/50 transition-colors group"
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground text-sm mb-0.5">
                              {item.title}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* CTA */}
              <div className="text-center">
                <Button asChild variant="hero" size="xl" className="group">
                  <Link to="/carrera-detailing">
                    Descubre el Programa Completo
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <p className="mt-4 text-sm text-muted-foreground">
                  Plazas limitadas • Próxima edición en Febrero 2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

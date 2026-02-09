import { Link } from 'react-router-dom';
import { ArrowRight, Users, Star, Headphones, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import portfolioFerrari from '@/assets/portfolio-ferrari.png';

const stats = [
  { icon: Users, value: '+500', label: 'Alumnos Certificados' },
  { icon: Star, value: '98%', label: 'Satisfacción' },
  { icon: Headphones, value: '24/7', label: 'Soporte Continuo' },
];

export function BlogPostCTA() {
  return (
    <AnimatedSection animation="fade-up" delay={100}>
      <div className="mt-12 bg-card/50 border border-border rounded-2xl overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Left: text + CTAs */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <h3
              className="text-2xl md:text-3xl font-bold text-foreground mb-3"
              style={{ fontFamily: "'Open Sans', sans-serif", textTransform: 'none', letterSpacing: 'normal' }}
            >
              ¿Listo para Dominar el Detailing?
            </h3>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6">
              Aprende de profesionales con más de 15 años de experiencia en el sector. 
              Formación 100% práctica en taller real con vehículos de alta gama.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <Link to="/contacto">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-6 py-5 group">
                  Inscribirme en Formación
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/curso-detailing-profesional">
                <Button variant="outline" className="border-border text-foreground hover:bg-muted rounded-xl px-6 py-5">
                  Ver Todos los Cursos
                </Button>
              </Link>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <stat.icon className="h-5 w-5 text-primary mx-auto mb-1.5" />
                  <div className="text-lg font-bold text-foreground">{stat.value}</div>
                  <div className="text-[11px] text-muted-foreground leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: image + testimonial */}
          <div className="relative hidden md:flex flex-col">
            <div className="flex-1 relative overflow-hidden">
              <img
                src={portfolioFerrari}
                alt="Trabajo profesional de detailing en Ferrari"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>
            
            {/* Testimonial overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="bg-card/90 backdrop-blur-sm border border-border rounded-xl p-4">
                <Quote className="h-4 w-4 text-primary mb-2" />
                <p className="text-sm text-muted-foreground italic leading-relaxed mb-2">
                  "La formación en Academia Detail cambió mi vida profesional. Hoy tengo mi propio taller con una facturación que nunca imaginé."
                </p>
                <div className="text-xs">
                  <span className="font-semibold text-foreground">Leandro M.</span>
                  <span className="text-muted-foreground"> · Alumno Promoción 2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

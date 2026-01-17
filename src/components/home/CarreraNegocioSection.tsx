import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Wrench, 
  Award, 
  Building2,
  ArrowRight,
  Clock,
  Users,
  BookOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const journeySteps = [
  {
    icon: BookOpen,
    title: 'Aprende',
    description: '4 formaciones completas',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: Wrench,
    title: 'Practica',
    description: 'Proyectos reales',
    color: 'from-amber-500 to-orange-500'
  },
  {
    icon: Award,
    title: 'Certifica',
    description: 'Diploma acreditado',
    color: 'from-emerald-500 to-green-600'
  },
  {
    icon: Building2,
    title: 'Emprende',
    description: 'Tu propio negocio',
    color: 'from-primary to-primary-glow'
  }
];

const stats = [
  { value: '4', label: 'Cursos', icon: GraduationCap },
  { value: '+100', label: 'Horas', icon: Clock },
  { value: '1:1', label: 'Mentoría', icon: Users },
  { value: '3-6', label: 'Meses', icon: Award },
];

export function CarreraNegocioSection() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/50 via-background to-background" />
      
      {/* Decorative Elements */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-primary-glow/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
            <Award className="h-4 w-4" />
            Programa Premium Exclusivo
          </span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            De Principiante a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-glow">
              Empresario
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            El programa completo para dominar todas las disciplinas del detailing 
            y lanzar tu propio centro de éxito
          </p>
        </div>

        {/* Journey Timeline */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative">
            {/* Connection Line - Desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-amber-500 via-emerald-500 to-primary -translate-y-1/2 z-0" />
            
            {/* Steps */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
              {journeySteps.map((step, index) => (
                <div key={step.title} className="relative z-10 flex flex-col items-center">
                  {/* Icon Circle */}
                  <div 
                    className={cn(
                      "w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mb-4 shadow-lg",
                      "bg-gradient-to-br",
                      step.color
                    )}
                  >
                    <step.icon className="h-8 w-8 md:h-10 md:w-10 text-white" />
                  </div>
                  
                  {/* Arrow - Desktop only, not on last item */}
                  {index < journeySteps.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-[calc(100%_-_1rem)] z-20">
                      <ArrowRight className="h-5 w-5 text-muted-foreground/50" />
                    </div>
                  )}
                  
                  {/* Text */}
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground text-center">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div 
                key={stat.label}
                className="bg-card border border-border rounded-2xl p-6 text-center hover:border-primary/50 transition-colors"
              >
                <stat.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button asChild variant="hero" size="xl" className="group">
            <Link to="/carrera-detailing">
              Descubre Cómo Emprender
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            Plazas limitadas • Próxima edición en Febrero 2025
          </p>
        </div>
      </div>
    </section>
  );
}

import { Link } from 'react-router-dom';
import { formations } from '@/data/formations';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { 
  Sparkles, 
  Palette, 
  Shield, 
  Wrench, 
  ArrowRight, 
  Clock
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  sparkles: Sparkles,
  palette: Palette,
  shield: Shield,
  wrench: Wrench,
};

export function FormationsGrid() {
  return (
    <section id="formaciones" className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-primary/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-primary-glow/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeading
          badge="Formaciones Profesionales"
          title="Elige Tu Especialización"
          subtitle="Cursos intensivos y 100% prácticos para dominar cada disciplina del detailing profesional"
        />

        {/* Grid de Formaciones */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 max-w-7xl mx-auto">
          {formations.map((formation) => {
            const Icon = iconMap[formation.icon] || Sparkles;
            
            return (
              <Link 
                to={formation.href}
                key={formation.id}
                className="group relative overflow-hidden rounded-2xl aspect-[3/4] shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]"
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${formation.image})` }}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20 group-hover:via-black/50 transition-all duration-300" />
                
                {/* Duration Badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-medium border border-white/10">
                    <Clock className="h-3 w-3" />
                    {formation.duration}
                  </span>
                </div>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                  {/* Icon */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2.5 rounded-xl bg-primary/20 backdrop-blur-sm text-primary border border-primary/20">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">
                    {formation.shortTitle}
                  </h3>
                  
                  {/* Description - truncated */}
                  <p className="text-white/70 text-sm line-clamp-2 mb-4 leading-relaxed">
                    {formation.description}
                  </p>
                  
                  {/* CTA */}
                  <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                    Ver Programa
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>

                {/* Hover border effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/30 transition-all duration-300 pointer-events-none" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

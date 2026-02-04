import { Link } from 'react-router-dom';
import { formations } from '@/data/formations';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { 
  Sparkles, 
  Palette, 
  Shield, 
  Wrench, 
  ArrowRight, 
  Clock,
  Construction,
  GraduationCap
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
          title="Cursos de Detailing, Pulido y Protección Cerámica"
          subtitle="Formación profesional para aprender detailing desde cero: curso de pulido de coches, tratamiento cerámico, vinilado y PPF"
        />

        {/* Grid de Formaciones - Better mobile layout */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-7xl mx-auto">
          {formations.map((formation) => {
            const Icon = iconMap[formation.icon] || Sparkles;
            const isComingSoon = formation.comingSoon;
            
            return (
              <Link 
                to={formation.href}
                key={formation.id}
                className="group relative overflow-hidden rounded-xl sm:rounded-2xl aspect-[4/5] sm:aspect-[3/4] shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]"
              >
                {/* Background Image with aspect-ratio to prevent CLS */}
                <div className="absolute inset-0 bg-muted">
                  <img
                    src={formation.image}
                    alt={formation.shortTitle}
                    className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${isComingSoon ? 'grayscale-[30%]' : ''}`}
                    loading="lazy"
                    decoding="async"
                    width={400}
                    height={533}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 400px"
                  />
                </div>
                
                {/* Gradient Overlay - slightly darker for coming soon */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20 group-hover:via-black/50 transition-all duration-300 ${isComingSoon ? 'via-black/70' : ''}`} />
                
                {/* Coming Soon Badge */}
                {isComingSoon && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/90 text-black text-xs font-bold border border-amber-400 shadow-lg animate-pulse">
                      <Construction className="h-3.5 w-3.5" />
                      Próximamente
                    </span>
                  </div>
                )}
                
                {/* Alumnos Certificados Badge */}
                {formation.alumnosCertificados && !isComingSoon && (
                  <div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-10">
                    <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-primary/90 text-white text-[10px] sm:text-xs font-bold border border-primary shadow-lg">
                      <GraduationCap className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      +{formation.alumnosCertificados}
                    </span>
                  </div>
                )}
                
                {/* Duration Badge */}
                <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
                  <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white text-[10px] sm:text-xs font-medium border border-white/10">
                    <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                    <span className="hidden sm:inline">{formation.duration}</span>
                    <span className="sm:hidden">{formation.duration.replace(' días', 'd')}</span>
                  </span>
                </div>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5 md:p-6">
                  {/* Icon */}
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className={`p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl backdrop-blur-sm border ${isComingSoon ? 'bg-amber-500/20 text-amber-400 border-amber-500/20' : 'bg-primary/20 text-primary border-primary/20'}`}>
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-base sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2 leading-tight">
                    {formation.shortTitle}
                  </h3>
                  
                  {/* Description - hidden on small mobile */}
                  <p className="hidden sm:block text-white/70 text-sm line-clamp-2 mb-4 leading-relaxed">
                    {formation.description}
                  </p>
                  
                  {/* CTA */}
                  <span className={`inline-flex items-center gap-1 sm:gap-2 font-semibold text-xs sm:text-sm group-hover:gap-3 transition-all duration-300 ${isComingSoon ? 'text-amber-400' : 'text-primary'}`}>
                    <span className="hidden sm:inline">{isComingSoon ? 'Más Información' : 'Ver Programa'}</span>
                    <span className="sm:hidden">{isComingSoon ? 'Info' : 'Ver'}</span>
                    <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>

                {/* Hover border effect */}
                <div className={`absolute inset-0 rounded-2xl border-2 border-transparent transition-all duration-300 pointer-events-none ${isComingSoon ? 'group-hover:border-amber-500/30' : 'group-hover:border-primary/30'}`} />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

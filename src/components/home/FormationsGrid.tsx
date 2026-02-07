import { Link } from 'react-router-dom';
import { formations } from '@/data/formations';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { 
  Car, 
  Palette, 
  Shield, 
  Wrench, 
  ArrowRight, 
  Clock,
  Construction,
  GraduationCap
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  sparkles: Car,
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

        {/* Grid de Formaciones - 2 columnas grandes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {formations.map((formation) => {
            const Icon = iconMap[formation.icon] || Car;
            const isComingSoon = formation.comingSoon;
            
            return (
              <Link 
                to={formation.href}
                key={formation.id}
                className="group relative overflow-hidden rounded-2xl md:rounded-3xl aspect-[16/10] shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]"
              >
                {/* Background Image */}
                <div className="absolute inset-0 bg-muted">
                  <img
                    src={formation.image}
                    alt={formation.imageAlt}
                    className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${isComingSoon ? 'grayscale-[30%]' : ''}`}
                    loading="lazy"
                    decoding="async"
                    width={800}
                    height={500}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10 group-hover:via-black/40 transition-all duration-300 ${isComingSoon ? 'via-black/60' : ''}`} />
                
                {/* Coming Soon Badge */}
                {isComingSoon && (
                  <div className="absolute top-4 md:top-6 right-4 md:right-6 z-10">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/90 text-black text-sm font-bold border border-amber-400 shadow-lg animate-pulse">
                      <Construction className="h-4 w-4" />
                      Próximamente
                    </span>
                  </div>
                )}
                
                {/* Alumnos Certificados Badge */}
                {formation.alumnosCertificados && !isComingSoon && (
                  <div className="absolute top-4 md:top-6 right-4 md:right-6 z-10">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/90 text-white text-sm font-bold border border-primary shadow-lg">
                      <GraduationCap className="h-4 w-4" />
                      +{formation.alumnosCertificados} alumnos
                    </span>
                  </div>
                )}
                
                {/* Duration Badge */}
                <div className="absolute top-4 md:top-6 left-4 md:left-6">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm font-medium border border-white/10">
                    <Clock className="h-4 w-4" />
                    {formation.duration}
                  </span>
                </div>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  {/* Icon */}
                  <div className="flex items-center gap-3 mb-3 md:mb-4">
                    <div className={`p-3 rounded-xl backdrop-blur-sm border ${isComingSoon ? 'bg-amber-500/20 text-amber-400 border-amber-500/20' : 'bg-primary/20 text-primary border-primary/20'}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-3 leading-tight">
                    {formation.shortTitle}
                  </h3>
                  
                  {/* Description - Visible on all sizes */}
                  <p className="text-white/80 text-sm md:text-base line-clamp-2 mb-4 md:mb-5 leading-relaxed max-w-lg">
                    {formation.description}
                  </p>
                  
                  {/* CTA */}
                  <span className={`inline-flex items-center gap-2 font-semibold text-sm md:text-base group-hover:gap-4 transition-all duration-300 ${isComingSoon ? 'text-amber-400' : 'text-primary'}`}>
                    {isComingSoon ? 'Más Información' : 'Ver Programa Completo'}
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>

                {/* Hover border effect */}
                <div className={`absolute inset-0 rounded-2xl md:rounded-3xl border-2 border-transparent transition-all duration-300 pointer-events-none ${isComingSoon ? 'group-hover:border-amber-500/30' : 'group-hover:border-primary/30'}`} />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

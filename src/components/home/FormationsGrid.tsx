import { Link } from 'react-router-dom';
import { formations } from '@/data/formations';
import { formationDetails } from '@/data/formationDetails';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { 
  ArrowRight, 
  Clock,
  Construction,
  GraduationCap,
  CheckCircle2
} from 'lucide-react';

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

        {/* Vertical list of alternating cards */}
        <div className="flex flex-col gap-12 md:gap-16 max-w-6xl mx-auto">
          {formations.map((formation, index) => {
            const isComingSoon = formation.comingSoon;
            const isEven = index % 2 === 0;
            const num = String(index + 1).padStart(2, '0');
            const detail = formationDetails[formation.id];
            const price = detail?.price;
            
            // Get category label
            const categoryLabels = [
              'Módulo Principal',
              'Especialización',
              'Protección Avanzada',
              'Especialista',
            ];
            const categoryLabel = categoryLabels[index] || 'Formación';

            return (
              <article 
                key={formation.id}
                className="group"
              >
                <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-0 rounded-2xl overflow-hidden border border-border/50 bg-card hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10`}>
                  
                  {/* Image Side */}
                  <div className="relative w-full md:w-[45%] aspect-[16/10] md:aspect-auto md:min-h-[420px] overflow-hidden flex-shrink-0">
                    <img
                      src={formation.image}
                      alt={formation.imageAlt}
                      className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${isComingSoon ? 'grayscale-[30%]' : ''}`}
                      loading="lazy"
                      decoding="async"
                      width={800}
                      height={500}
                      sizes="(max-width: 768px) 100vw, 45vw"
                    />
                    {/* Subtle gradient overlay on image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent md:hidden" />
                    
                    {/* Badges on image */}
                    {isComingSoon && (
                      <div className="absolute top-4 left-4 z-10">
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-amber-500/90 text-black text-xs font-bold uppercase tracking-wider shadow-lg">
                          <Construction className="h-3.5 w-3.5" />
                          Próximamente
                        </span>
                      </div>
                    )}
                    {formation.alumnosCertificados && !isComingSoon && (
                      <div className="absolute top-4 left-4 z-10">
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-primary/90 text-primary-foreground text-xs font-bold uppercase tracking-wider shadow-lg">
                          <GraduationCap className="h-3.5 w-3.5" />
                          +{formation.alumnosCertificados} alumnos
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content Side */}
                  <div className="flex-1 p-6 md:p-8 lg:p-10 flex flex-col justify-center relative">
                    {/* Large decorative number */}
                    <span className={`absolute ${isEven ? 'top-4 right-6 md:top-6 md:right-8' : 'top-4 right-6 md:top-6 md:right-8'} text-[5rem] md:text-[7rem] font-black leading-none text-foreground/[0.08] select-none pointer-events-none font-heading`}>
                      {num}
                    </span>

                    {/* Category badge */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-6 h-[2px] ${isComingSoon ? 'bg-amber-500' : 'bg-primary'}`} />
                      <span className={`text-xs font-bold uppercase tracking-widest ${isComingSoon ? 'text-amber-500' : 'text-primary'}`}>
                        {categoryLabel}
                      </span>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 leading-tight font-heading">
                      {formation.shortTitle}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-5 max-w-lg">
                      {formation.description}
                    </p>

                    {/* What you'll learn box */}
                    {formation.highlights && formation.highlights.length > 0 && (
                      <div className="border border-border/80 rounded-xl p-4 md:p-5 mb-6 bg-background/50">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-foreground mb-3">
                          Lo que aprenderás
                        </h4>
                        <ul className="space-y-2.5">
                          {formation.highlights.map((highlight, hIdx) => (
                            <li key={hIdx} className="flex items-start gap-2.5">
                              <CheckCircle2 className={`h-4 w-4 mt-0.5 shrink-0 ${isComingSoon ? 'text-amber-500/70' : 'text-primary/70'}`} />
                              <span className="text-sm text-muted-foreground">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Price + CTA row */}
                    <div className="flex items-end justify-between gap-4 mt-auto">
                      <div>
                        {isComingSoon ? (
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-1">Estado</span>
                            <span className="text-xl font-bold text-amber-500">Próximamente</span>
                          </div>
                        ) : price ? (
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-1">Desde</span>
                            <div className="flex items-baseline gap-1">
                              <span className="text-3xl md:text-4xl font-bold text-foreground">€{price.toLocaleString('es-ES')}</span>
                              <span className="text-sm text-muted-foreground">+ IVA</span>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm font-medium">{formation.duration}</span>
                          </div>
                        )}
                      </div>

                      <Link
                        to={formation.href}
                        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border text-sm font-semibold transition-all duration-300 group/btn hover:gap-3 ${
                          isComingSoon
                            ? 'border-amber-500/50 text-amber-500 hover:bg-amber-500/10'
                            : 'border-primary/50 text-primary hover:bg-primary/10'
                        }`}
                      >
                        {isComingSoon ? 'Más Info' : 'Ver Detalles'}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { Link } from 'react-router-dom';
import { formations } from '@/data/formations';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { FinancingBadge } from '@/components/shared/FinancingBadge';
import { ViaBillPriceTag } from '@/components/formation/ViaBillPriceTag';
import { 
  ArrowRight, 
  Clock,
  Calendar,
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
                    {/* Gradient overlay on image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                    
                    {/* Hover overlay with text - desktop only */}
                    {!isComingSoon && (
                      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:flex items-center justify-center">
                        <span className="text-white text-lg font-bold tracking-wide bg-black/40 px-5 py-2.5 rounded-lg backdrop-blur-sm border border-white/20">
                          Ver programa →
                        </span>
                      </div>
                    )}

                    {/* Accent line at bottom of image */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 ${isComingSoon ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500' : 'bg-gradient-to-r from-primary via-primary-glow to-primary'}`} />
                    
                    {/* Badges on image */}
                    <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                      {isComingSoon && (
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-amber-500/90 text-black text-xs font-bold uppercase tracking-wider shadow-lg">
                          <Construction className="h-3.5 w-3.5" />
                          Próximamente
                        </span>
                      )}
                      {formation.alumnosCertificados && !isComingSoon && (
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-primary/90 text-primary-foreground text-xs font-bold uppercase tracking-wider shadow-lg">
                          <GraduationCap className="h-3.5 w-3.5" />
                          +{formation.alumnosCertificados} alumnos
                        </span>
                      )}
                      {/* Duration badge */}
                      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-black/60 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                        <Clock className="h-3.5 w-3.5" />
                        {formation.duration}
                      </span>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className="flex-1 p-6 md:p-8 lg:p-10 flex flex-col justify-center relative">
                    {/* Large decorative number */}
                    <span className="absolute top-4 right-6 md:top-6 md:right-8 text-[5rem] md:text-[7rem] font-black leading-none text-foreground/[0.08] select-none pointer-events-none font-heading">
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
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4 max-w-lg">
                      {formation.description}
                    </p>

                    {/* Decorative separator */}
                    <div className={`h-px w-full max-w-[200px] mb-4 ${isComingSoon ? 'bg-gradient-to-r from-amber-500/60 via-amber-500/20 to-transparent' : 'bg-gradient-to-r from-primary/60 via-primary/20 to-transparent'}`} />

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

                    <div className="flex flex-col items-start gap-3 mt-auto">
                      {/* Financing badge for non-coming-soon courses */}
                      {!isComingSoon && (
                        <div className="flex flex-col gap-2">
                          <FinancingBadge price={index === 0 ? 2997 : index === 1 ? 2497 : 1997} variant="compact" />
                          <ViaBillPriceTag price={index === 0 ? 2997 : index === 1 ? 2497 : 1997} view="list" />
                        </div>
                      )}
                      <div className="flex items-end justify-between gap-4 w-full">
                        <div className="flex flex-col gap-1.5">
                          {isComingSoon ? (
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-1">Estado</span>
                              <span className="text-xl font-bold text-amber-500">Próximamente</span>
                            </div>
                          ) : (
                            <>
                              {formation.proximaFecha && (
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Calendar className="h-4 w-4 text-primary" />
                                  <span>Próxima edición: <span className="text-foreground font-semibold">{formation.proximaFecha}</span></span>
                                </div>
                              )}
                            </>
                          )}
                        </div>

                      <Link
                        to={formation.href}
                        className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all duration-300 group/btn hover:gap-3 shadow-lg ${
                          isComingSoon
                            ? 'border border-amber-500/50 text-amber-500 hover:bg-amber-500/10'
                            : 'bg-primary text-primary-foreground hover:bg-primary-glow hover:shadow-primary/30 hover:shadow-xl'
                        }`}
                      >
                        {isComingSoon ? 'Más Info' : 'Descubre el Programa'}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
                      </Link>
                      </div>
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
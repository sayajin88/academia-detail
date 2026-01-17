import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formations } from '@/data/formations';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Button } from '@/components/ui/button';
import { 
  Sparkles, 
  Palette, 
  Shield, 
  Wrench, 
  ArrowRight, 
  Clock,
  Check,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ElementType> = {
  sparkles: Sparkles,
  palette: Palette,
  shield: Shield,
  wrench: Wrench,
};

export function FormationsGrid() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const activeFormation = formations[activeIndex];
  const Icon = iconMap[activeFormation.icon] || Sparkles;

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % formations.length);
        setIsTransitioning(false);
      }, 200);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleTabClick = (index: number) => {
    if (index === activeIndex) return;
    setIsAutoPlaying(false);
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex(index);
      setIsTransitioning(false);
    }, 200);
  };

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev - 1 + formations.length) % formations.length);
      setIsTransitioning(false);
    }, 200);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % formations.length);
      setIsTransitioning(false);
    }, 200);
  };

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

        {/* Tabs Navigation */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10 md:mb-14">
          {formations.map((formation, index) => {
            const TabIcon = iconMap[formation.icon] || Sparkles;
            const isActive = index === activeIndex;
            
            return (
              <button
                key={formation.id}
                onClick={() => handleTabClick(index)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 md:px-6 md:py-3 rounded-full font-semibold text-sm md:text-base transition-all duration-300",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                )}
              >
                <TabIcon className="h-4 w-4 md:h-5 md:w-5" />
                <span className="hidden sm:inline">{formation.shortTitle}</span>
                <span className="sm:hidden">{formation.shortTitle}</span>
              </button>
            );
          })}
        </div>

        {/* Main Content Area */}
        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Arrows - Desktop */}
          <button
            onClick={handlePrev}
            className="hidden md:flex absolute -left-16 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={handleNext}
            className="hidden md:flex absolute -right-16 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all"
            aria-label="Siguiente"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Content Card */}
          <div className="bg-card rounded-3xl border border-border overflow-hidden shadow-xl">
            <div className="grid lg:grid-cols-2">
              {/* Image Section */}
              <div className="relative h-64 md:h-80 lg:h-[480px] overflow-hidden">
                <div
                  className={cn(
                    "absolute inset-0 bg-cover bg-center transition-all duration-500",
                    isTransitioning ? "opacity-0 scale-105" : "opacity-100 scale-100"
                  )}
                  style={{ backgroundImage: `url(${activeFormation.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-card lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-card" />
                
                {/* Duration Badge */}
                <div className="absolute top-4 left-4 md:top-6 md:left-6">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-sm text-white text-sm font-medium border border-white/10">
                    <Clock className="h-4 w-4" />
                    {activeFormation.duration}
                  </span>
                </div>

                {/* Mobile Navigation */}
                <div className="md:hidden absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                  <button
                    onClick={handlePrev}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-black/60 backdrop-blur-sm text-white border border-white/10"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-black/60 backdrop-blur-sm text-white border border-white/10"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Content Section */}
              <div 
                className={cn(
                  "p-6 md:p-10 lg:p-12 flex flex-col justify-center transition-all duration-500",
                  isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
                )}
              >
                {/* Icon & Title */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                    {activeFormation.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
                  {activeFormation.description}
                </p>

                {/* Highlights */}
                <ul className="space-y-3 mb-8">
                  {activeFormation.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-foreground">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                        <Check className="h-3 w-3 text-primary" />
                      </span>
                      <span className="text-sm md:text-base">{highlight}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button asChild variant="hero" size="lg" className="group w-fit">
                  <Link to={activeFormation.href}>
                    Ver Programa Completo
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {formations.map((_, index) => (
              <button
                key={index}
                onClick={() => handleTabClick(index)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  index === activeIndex
                    ? "w-8 bg-primary"
                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                )}
                aria-label={`Ir a formación ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

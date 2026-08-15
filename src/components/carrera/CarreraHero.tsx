import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Crown,
  Clock,
  Users,
  Award,
  ArrowRight,
  Star,
  ChevronDown,
  Check,
  MessageCircle,
  TrendingDown,
} from 'lucide-react';
import { carreraDetailingData, formatEuro } from '@/data/carreraDetailingData';
import { useCountUp } from '@/hooks/useCountUp';
import heroImage from '@/assets/formacion-detailing-juan-daniel.jpg';

interface CarreraHeroProps {
  onCTAClick: () => void;
}

const WHATSAPP_URL =
  'https://wa.me/34622773555?text=Hola,%20quiero%20informaci%C3%B3n%20sobre%20la%20Carrera%20Detailing';

const CarreraHero = ({ onCTAClick }: CarreraHeroProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const { count: savingsCount } = useCountUp(carreraDetailingData.savings, 1800, false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const formations = carreraDetailingData.includedFormations;

  const chips = [
    { icon: Clock, label: '1 mes intensivo' },
    { icon: Users, label: `${carreraDetailingData.spots} plazas` },
    { icon: Award, label: '4 certificaciones' },
  ];

  return (
    <section className="relative overflow-hidden lg:min-h-screen lg:flex lg:items-center">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Formación profesional para montar tu centro de detailing - Programa completo 1 mes"
          className="w-full h-full object-cover scale-105"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/80 to-black/95" />
      </div>

      {/* Gold particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(14)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gold animate-float opacity-30"
            style={{
              width: `${Math.random() * 5 + 2}px`,
              height: `${Math.random() * 5 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 4 + 4}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-24 pb-14 lg:py-28">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
          {/* ---------- Left: story + learning path ---------- */}
          <div>
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/50 bg-gold/10 backdrop-blur-sm mb-5 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
            >
              <Crown className="w-4 h-4 text-gold" />
              <span className="text-gold font-semibold text-xs sm:text-sm tracking-[0.18em] uppercase">
                Programa completo
              </span>
              <Star className="w-4 h-4 text-gold" />
            </div>

            <div
              className={`mb-4 transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-monument leading-[0.95] tracking-tight">
                <span className="block text-foreground">CARRERA</span>
                <span className="block gold-gradient-text">DETAILING</span>
              </h1>
              <h2 className="sr-only">
                Todas las formaciones de detailing, wrapping y PPF en un solo programa
              </h2>
            </div>

            <p
              className={`text-lg sm:text-xl text-gold-light font-medium mb-2 transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              Las 4 formaciones del centro, en una sola ruta y a un solo precio.
            </p>
            <p
              className={`text-sm sm:text-base text-muted-foreground max-w-xl mb-7 transition-all duration-700 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              Empiezas desde cero y sales con base técnica completa: detailing, car wrapping (dos
              niveles) y PPF. Más módulo de negocio y un mes de taller real incluidos.
            </p>

            {/* Mobile price panel (compact) */}
            <div
              className={`lg:hidden mb-7 rounded-2xl border border-gold/40 bg-card/80 backdrop-blur-md p-5 transition-all duration-700 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                    Tu inversión
                  </p>
                  <p className="text-4xl font-monument gold-gradient-text leading-none">
                    {formatEuro(carreraDetailingData.price)} €
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground line-through">
                    {formatEuro(carreraDetailingData.coursesTotal)} €
                  </p>
                  <p className="text-sm font-bold text-gold">
                    Ahorras {formatEuro(carreraDetailingData.savings)} €
                  </p>
                </div>
              </div>
              <Button
                onClick={onCTAClick}
                className="w-full mt-4 h-12 bg-gradient-to-r from-gold-dark via-gold to-gold-light text-gold-foreground font-bold"
              >
                Reservar mi plaza
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center gap-2 h-11 rounded-md border border-gold/30 text-sm text-foreground hover:bg-gold/10 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-gold" />
                Hablar por WhatsApp
              </a>
            </div>

            {/* Learning path */}
            <div
              className={`relative transition-all duration-700 delay-[400ms] ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <p className="text-xs uppercase tracking-[0.2em] text-gold/80 mb-4">
                Tu ruta de aprendizaje
              </p>

              {/* Vertical connector line */}
              <div className="absolute left-[15px] top-12 bottom-10 w-px bg-gradient-to-b from-gold/60 via-gold/30 to-transparent" />

              <ol className="space-y-3">
                {formations.map((formation, index) => (
                  <li
                    key={formation.name}
                    className={`relative flex items-center gap-4 transition-all duration-500 ${
                      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
                    }`}
                    style={{ transitionDelay: `${500 + index * 120}ms` }}
                  >
                    <span className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full bg-gold/15 border border-gold/50 flex items-center justify-center text-xs font-monument text-gold">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1 flex items-center justify-between gap-3 py-2.5 px-3 sm:px-4 rounded-lg bg-card/50 backdrop-blur-sm border border-gold/15 hover:border-gold/40 transition-colors">
                      <div className="min-w-0">
                        <p className="text-sm sm:text-base font-semibold text-foreground truncate">
                          {formation.name}
                        </p>
                        <p className="text-[11px] sm:text-xs text-muted-foreground">
                          {formation.duration}
                        </p>
                      </div>
                      <span className="flex-shrink-0 text-sm sm:text-base text-muted-foreground line-through decoration-gold/70">
                        {formatEuro(formation.value)} €
                      </span>
                    </div>
                  </li>
                ))}

                <li
                  className={`relative flex items-center gap-4 transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
                  }`}
                  style={{ transitionDelay: '1000ms' }}
                >
                  <span className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full bg-gold flex items-center justify-center">
                    <Check className="w-4 h-4 text-gold-foreground" />
                  </span>
                  <div className="flex-1 flex items-center justify-between gap-3 py-2.5 px-3 sm:px-4 rounded-lg bg-gold/10 border border-gold/40">
                    <p className="text-sm sm:text-base font-semibold text-foreground">
                      Módulo de Negocio + mes de taller real
                    </p>
                    <span className="flex-shrink-0 text-xs sm:text-sm font-bold text-gold uppercase tracking-wide">
                      Incluido
                    </span>
                  </div>
                </li>
              </ol>
            </div>

            {/* Chips */}
            <div
              className={`flex flex-wrap gap-2 mt-6 transition-all duration-700 delay-[900ms] ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              {chips.map((chip) => (
                <span
                  key={chip.label}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/60 border border-gold/20 text-xs sm:text-sm text-foreground"
                >
                  <chip.icon className="w-3.5 h-3.5 text-gold" />
                  {chip.label}
                </span>
              ))}
            </div>
          </div>

          {/* ---------- Right: price panel (desktop) ---------- */}
          <aside
            className={`hidden lg:block transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="relative rounded-2xl border border-gold/40 bg-card/85 backdrop-blur-xl p-7 shadow-gold-glow">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light text-gold-foreground text-[11px] font-bold uppercase tracking-widest whitespace-nowrap">
                Todo incluido
              </div>

              <dl className="space-y-3 pt-2 pb-5 border-b border-gold/20">
                <div className="flex items-center justify-between text-sm">
                  <dt className="text-muted-foreground">Valor total del programa</dt>
                  <dd className="text-foreground font-semibold">
                    {formatEuro(carreraDetailingData.totalValue)} €
                  </dd>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <dt className="text-muted-foreground">Los 4 cursos por separado</dt>
                  <dd className="text-muted-foreground line-through">
                    {formatEuro(carreraDetailingData.coursesTotal)} €
                  </dd>
                </div>
              </dl>

              <div className="py-6 text-center">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
                  Tu inversión
                </p>
                <p className="text-5xl xl:text-6xl font-monument gold-gradient-text leading-none">
                  {formatEuro(carreraDetailingData.price)} €
                </p>
                <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full bg-gold/15 border border-gold/40">
                  <TrendingDown className="w-4 h-4 text-gold" />
                  <span className="text-sm font-bold text-gold">
                    Ahorras {formatEuro(savingsCount || carreraDetailingData.savings)} €
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  + {formatEuro(carreraDetailingData.extrasValue)} € en negocio y
                  práctica real, sin coste adicional
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={onCTAClick}
                  className="w-full h-14 text-base bg-gradient-to-r from-gold-dark via-gold to-gold-light text-gold-foreground hover:shadow-gold-intense transition-all duration-300 font-bold group"
                >
                  <Crown className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Reservar mi plaza
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full h-12 rounded-md border border-gold/30 text-sm text-foreground hover:bg-gold/10 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-gold" />
                  Hablar por WhatsApp
                </a>
              </div>

              <div className="mt-5 pt-4 border-t border-gold/20 flex items-center justify-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5 text-gold">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
                  </span>
                  Solo {carreraDetailingData.spots} plazas
                </span>
                <span className="w-px h-3 bg-gold/30" />
                <span>{carreraDetailingData.nextEdition}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hidden lg:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-1 animate-bounce">
        <span className="text-[10px] text-gold/60 uppercase tracking-widest">Descubre más</span>
        <ChevronDown className="w-5 h-5 text-gold/60" />
      </div>
    </section>
  );
};

export default CarreraHero;

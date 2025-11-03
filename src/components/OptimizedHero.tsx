import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, Star, Users, Award, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import heroDetailing from "@/assets/hero-detailing.jpg";
import detailParkLogo from "@/assets/detail-park-logo.webp";

export const OptimizedHero = () => {
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [liveViewers, setLiveViewers] = useState(247);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const progress = Math.min(scrolled / 1000, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveViewers(prev => prev + Math.floor(Math.random() * 3) - 1);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Floating Logo with Progress - Hidden on mobile */}
      <div className="fixed top-4 left-4 z-50 animate-float hidden lg:block">
        <div className="flex items-center gap-3 glass-intense px-4 py-2 rounded-full">
          <img src={detailParkLogo} alt="Detail Park" className="h-8 filter brightness-0 invert" />
          <div className="w-16 h-1 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Live Viewers Indicator - Hidden on mobile */}
      <div className="fixed top-4 right-4 z-50 animate-pulse hidden lg:flex">
        <div className="glass-intense px-4 py-2 rounded-full flex items-center gap-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          <span className="text-white text-sm font-bold">{liveViewers} viendo</span>
        </div>
      </div>

      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Video Background - Visible on mobile */}
        <div className="absolute inset-0">
          <iframe
            src="https://www.youtube.com/embed/ByRhg2kYD-A?autoplay=1&mute=1&loop=1&playlist=ByRhg2kYD-A&controls=0&showinfo=0&rel=0&modestbranding=1&start=39"
            className="w-full h-full object-cover opacity-50 md:opacity-20 scale-110 md:scale-150"
            allow="autoplay; encrypted-media"
            style={{ pointerEvents: 'none' }}
            title="Detail Park Background"
          />
        </div>

        {/* Enhanced Gradient Overlay - Better visibility on mobile */}
        <div className="absolute inset-0 bg-gradient-hero opacity-70 md:opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70 md:from-transparent md:via-black/50 md:to-black/80"></div>
        
        {/* Floating Particles - Hidden on mobile for performance */}
        <div className="hidden md:block">
          {[...Array(15)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full animate-float opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${4 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center max-w-6xl">
          {/* Enhanced Badge */}
          <div className="inline-flex items-center gap-3 glass-intense rounded-full px-8 py-4 mb-8 animate-bounce-in group hover:scale-105 transition-transform duration-300">
            <div className="flex">
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-primary/70 rounded-full animate-pulse ml-1" style={{ animationDelay: '0.5s' }}></div>
              <div className="w-3 h-3 bg-primary/40 rounded-full animate-pulse ml-1" style={{ animationDelay: '1s' }}></div>
            </div>
            <span className="text-white text-sm font-bold uppercase tracking-wide">Oferta Limitada • Solo 48h</span>
            <Badge variant="destructive" className="animate-pulse">-75%</Badge>
          </div>
          
          {/* Mobile-Optimized Headline */}
          <h1 className="text-3xl md:text-5xl lg:text-7xl xl:text-8xl font-black mb-6 md:mb-8 leading-tight animate-fade-in-up">
            <span className="text-white block mb-2">La Jornada Cero:</span>
            <span className="gradient-text block mb-2">Empieza tu Carrera</span>
            <span className="text-white block mb-2">en Detailing</span>
            <span className="gradient-text block">Hoy</span>
            <span className="text-white/90 text-base md:text-2xl lg:text-4xl block mt-3 md:mt-4 font-normal">1 día que transformará tu visión del detailing</span>
          </h1>
          
          {/* Value Proposition - Mobile optimized */}
          <div className="max-w-4xl mx-auto mb-6 md:mb-8 px-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <p className="text-base md:text-xl lg:text-2xl text-white/90 mb-4 font-semibold">
            Descubre en 1 día si el detailing es tu futuro profesional
          </p>
          <div className="flex flex-col md:flex-row flex-wrap justify-center gap-3 md:gap-4 text-sm md:text-base text-white/80">
            <div className="flex items-center justify-center gap-2">
              <Users className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              <span>Perfecto para iniciarse</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Award className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              <span>Primera toma de contacto</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              <span>Decide tu camino</span>
            </div>
          </div>
          </div>
          
          {/* Enhanced CTA Group - Mobile optimized */}
          <div className="space-y-3 md:space-y-4 mb-8 md:mb-12 px-4 animate-bounce-in" style={{ animationDelay: '0.4s' }}>
            <Button 
              variant="hero" 
              size="xl" 
              className="w-full md:w-auto text-sm md:text-base lg:text-xl py-4 md:py-6 px-6 md:px-12 hover:scale-105 transition-all duration-300"
            >
              🚀 RESERVAR PLAZA - €299 + IVA
            </Button>
            <p className="text-xs md:text-sm text-white/60 text-center">
              Normal: €999 + IVA • Ahorras €700
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-xs md:text-sm text-white/70">
              <span>✅ Primera toma de contacto</span>
              <span>✅ Práctica real</span>
              <span>✅ Decide tu camino</span>
            </div>
          </div>

          {/* Social Proof - Mobile optimized */}
          <div className="flex flex-col items-center gap-4 md:gap-6 px-4 animate-slide-in-right" style={{ animationDelay: '0.6s' }}>
            <div className="flex flex-col md:flex-row justify-center items-center gap-3 md:gap-4">
              <div className="flex -space-x-2 md:-space-x-3">
                {[1,2,3,4,5].map((i) => (
                  <div 
                    key={i} 
                    className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-gradient-primary border-2 md:border-3 border-white/20 flex items-center justify-center"
                  >
                    <span className="text-white font-bold text-xs md:text-sm">{String.fromCharCode(65 + i)}</span>
                  </div>
                ))}
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-white/10 border-2 md:border-3 border-white/20 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">+200</span>
                </div>
              </div>
              <div className="flex flex-col items-center md:items-start">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-white/80 text-xs md:text-sm">5.0/5 de 200+ asistentes</span>
              </div>
            </div>
          </div>
          
          {/* Video Preview - Mobile optimized */}
          <div className="mt-8 md:mt-16 max-w-5xl mx-auto px-4 animate-scale-in" style={{ animationDelay: '0.8s' }}>
            <div className="glass-intense rounded-xl md:rounded-3xl p-3 md:p-8 hover-glow group transition-all duration-500">
              <div className="relative overflow-hidden rounded-lg md:rounded-2xl aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/ByRhg2kYD-A"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="La Jornada Cero"
                />
              </div>
              
              {/* Video Description */}
              <div className="mt-3 md:mt-6 text-center">
                <h3 className="text-base md:text-xl font-bold text-white mb-1 md:mb-2">
                  Así es la experiencia La Jornada Cero
                </h3>
                <p className="text-xs md:text-base text-white/80">
                  Evento intensivo de detailing profesional
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Hidden on mobile */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>
    </>
  );
};
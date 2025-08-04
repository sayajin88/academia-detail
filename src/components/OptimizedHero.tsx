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
      {/* Floating Logo with Progress */}
      <div className="fixed top-4 left-4 z-50 animate-float">
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

      {/* Live Viewers Indicator */}
      <div className="fixed top-4 right-4 z-50 animate-pulse">
        <div className="glass-intense px-4 py-2 rounded-full flex items-center gap-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          <span className="text-white text-sm font-bold">{liveViewers} viendo</span>
        </div>
      </div>

      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0">
          {videoPlaying ? (
            <video
              autoPlay
              muted
              loop
              className="w-full h-full object-cover opacity-20"
            >
              <source src="/hero-video.mp4" type="video/mp4" />
            </video>
          ) : (
            <div 
              className="w-full h-full bg-cover bg-center opacity-30 scale-105 transition-transform duration-[20s] hover:scale-110"
              style={{ backgroundImage: `url(${heroDetailing})` }}
            />
          )}
        </div>

        {/* Enhanced Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/80"></div>
        
        {/* Floating Particles */}
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
          
          {/* Ultra-Optimized Headline */}
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-black mb-8 leading-[0.9] animate-fade-in-up">
            <span className="text-white block mb-2">Domina el</span>
            <span className="gradient-text animate-glow-pulse block mb-2">Detailing Profesional</span>
            <span className="text-white block mb-2">y Crea tu</span>
            <span className="gradient-text animate-glow-pulse block">Negocio Rentable</span>
            <span className="text-white/80 text-2xl md:text-4xl block mt-4 font-normal">en solo 21 días</span>
          </h1>
          
          {/* Value Proposition */}
          <div className="max-w-4xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <p className="text-xl md:text-2xl text-white/90 mb-4 font-semibold">
              Sin experiencia previa • Sin inversión inicial • Con garantía total
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-white/80">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <span>+800 estudiantes</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                <span>Certificado oficial</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span>€3,000+ promedio mensual</span>
              </div>
            </div>
          </div>
          
          {/* Enhanced CTA Group */}
          <div className="space-y-4 mb-12 animate-bounce-in" style={{ animationDelay: '0.4s' }}>
            <Button 
              variant="hero" 
              size="xl" 
              className="animate-pulse-glow hover:animate-none hover:scale-105 transition-all duration-300 shadow-glow-intense"
            >
              🚀 Comenzar Ahora (€47 en lugar de €197)
            </Button>
            <div className="flex items-center justify-center gap-4 text-sm text-white/70">
              <span>✅ Acceso inmediato</span>
              <span>✅ 30 días de garantía</span>
              <span>✅ Soporte 24/7</span>
            </div>
          </div>

          {/* Social Proof with Real Avatars */}
          <div className="flex flex-col items-center gap-6 animate-slide-in-right" style={{ animationDelay: '0.6s' }}>
            <div className="flex justify-center items-center gap-3">
              <div className="flex -space-x-3">
                {[1,2,3,4,5,6].map((i) => (
                  <div 
                    key={i} 
                    className="w-12 h-12 rounded-full bg-gradient-primary border-3 border-white/20 flex items-center justify-center hover-glow transform transition-all duration-300 hover:scale-110 hover:z-10"
                  >
                    <span className="text-white font-bold text-sm">{String.fromCharCode(65 + i)}</span>
                  </div>
                ))}
                <div className="w-12 h-12 rounded-full bg-white/10 border-3 border-white/20 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">+800</span>
                </div>
              </div>
              <div className="flex flex-col items-start">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-white/80 text-sm">4.9/5 de 800+ estudiantes</span>
              </div>
            </div>
          </div>
          
          {/* Enhanced Video Preview */}
          <div className="mt-16 max-w-5xl mx-auto animate-scale-in" style={{ animationDelay: '0.8s' }}>
            <div className="glass-intense rounded-3xl p-8 hover-glow group transition-all duration-500">
              <div className="relative overflow-hidden rounded-2xl">
                <img 
                  src={heroDetailing}
                  alt="Preview del curso de detailing" 
                  className="w-full h-[300px] md:h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Video Overlay */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors duration-300">
                  <Button 
                    variant="glass" 
                    size="xl" 
                    className="rounded-full w-20 h-20 animate-pulse-glow hover:animate-none hover:scale-110 transition-all duration-300"
                    onClick={() => setVideoPlaying(!videoPlaying)}
                  >
                    <PlayCircle className="w-10 h-10" />
                  </Button>
                </div>

                {/* Video Stats Overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div className="glass-card px-4 py-2 rounded-lg">
                    <div className="text-white text-sm font-bold">Transformación Real</div>
                    <div className="text-white/80 text-xs">Ver caso de éxito</div>
                  </div>
                  <div className="glass-card px-4 py-2 rounded-lg">
                    <div className="text-primary text-sm font-bold">2:30 min</div>
                    <div className="text-white/80 text-xs">Testimonial</div>
                  </div>
                </div>
              </div>
              
              {/* Video Description */}
              <div className="mt-6 text-center">
                <h3 className="text-xl font-bold text-white mb-2">
                  "De 0 a €3,000/mes en detailing en 21 días"
                </h3>
                <p className="text-white/80">
                  Mira cómo Carlos pasó de ser un aficionado a tener su propio negocio rentable
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>
    </>
  );
};
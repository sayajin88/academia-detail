import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { EventCard } from "@/components/EventCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { FeatureCard } from "@/components/FeatureCard";
import { 
  Award, 
  Users, 
  Clock, 
  Trophy, 
  Star, 
  CheckCircle, 
  Car, 
  Shield, 
  Zap,
  PlayCircle,
  Phone,
  Mail,
  MapPin,
  X,
  Menu,
  ArrowLeft,
  GraduationCap,
  ChevronRight
} from "lucide-react";

// Import new optimized components
import { OptimizedHero } from "@/components/OptimizedHero";
import { AdvancedInteractives } from "@/components/AdvancedInteractives";
import { PsychologicalTriggers } from "@/components/PsychologicalTriggers";
import { MobileOptimization } from "@/components/MobileOptimization";
import { StickyFloatingCTA } from "@/components/StickyFloatingCTA";
import { ROICalculator } from "@/components/ROICalculator";
import { PersonalityQuiz } from "@/components/PersonalityQuiz";
import { LiveChat } from "@/components/LiveChat";
import { ProgressTracker } from "@/components/ProgressTracker";
import { SocialProofBar } from "@/components/SocialProofBar";
import { UrgencyTimer } from "@/components/UrgencyTimer";
import { VideoTestimonials } from "@/components/VideoTestimonials";
import { TrustSignals } from "@/components/TrustSignals";
import { FAQ } from "@/components/FAQ";
import { GoogleReviews } from "@/components/shared/GoogleReviews";
import { PricingComparison } from "@/components/PricingComparison";
import { InstructorProfile } from "@/components/InstructorProfile";
import { RegistrationModal } from "@/components/RegistrationModal";
import { useRegistrationModal } from "@/hooks/useRegistrationModal";
import { ExpertiseShowcase } from "@/components/ExpertiseShowcase";
import { ValueJustification } from "@/components/ValueJustification";
import { SEO, courseJornadaZeroSchema } from "@/components/SEO";
import { seoConfig } from "@/utils/seoConfig";

// Import images
import detailParkLogo from "@/assets/detail-park-logo.webp";
import logoLeandroLandete from "@/assets/brands/leandro-landete-academy.png";
import logoStek from "@/assets/brands/stek-automotive.png";
import logoCarcarePassion from "@/assets/brands/carcare-passion.png";
import detailParkLogoWhite from "@/assets/detail-park-logo-white.png";
import heroJornadaCero from "@/assets/heroes/hero-jornada-cero.jpg";
import beforeAfterDetailing from "@/assets/before-after-detailing.jpg";
import detailingTools from "@/assets/detailing-tools.jpg";
import danielLopezInstructor from "@/assets/daniel-lopez-instructor.webp";
import certificadoDetailing from "@/assets/certificado-detailing.png";
import eventoLimpiezaInterior from "@/assets/evento-limpieza-interior.jpg";
import eventoPulidoFaro from "@/assets/evento-pulido-faro.jpg";
import eventoClaseCompleta from "@/assets/evento-clase-completa.jpg";
import eventoAlumnosAtentos from "@/assets/evento-alumnos-atentos.jpg";
import eventoPracticaPulidora from "@/assets/evento-practica-pulidora.jpg";
import certificadoAlumno from "@/assets/certificado-alumno.png";
import certificadoAlumnoFeliz from "@/assets/certificado-alumno-feliz.jpg";
import eventoGrupoReal from "@/assets/evento-grupo-coche-rojo.jpg";

/** Deferred YouTube background — delays iframe load by 3s to avoid blocking LCP */
function DeferredYouTubeBackground() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="absolute inset-0 w-full h-full hidden md:block">
      <iframe
        src="https://www.youtube.com/embed/ByRhg2kYD-A?autoplay=1&mute=1&loop=1&playlist=ByRhg2kYD-A&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&start=39"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.77777778vh] min-w-full min-h-[56.25vw] h-full"
        allow="autoplay; encrypted-media"
        style={{ pointerEvents: 'none' }}
        title="Detail Park Background"
        loading="lazy"
      />
    </div>
  );
}

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isOpen, openModal, closeModal } = useRegistrationModal();

  return (
    <>
      <SEO {...seoConfig.jornadaCero} />
      <div className="min-h-screen animated-bg">
      {/* Enhanced Interactive Components */}
      <StickyFloatingCTA onCtaClick={openModal} />
      <MobileOptimization 
        isOpen={mobileMenuOpen} 
        onToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
        onCtaClick={openModal}
      />
      
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-4 right-4 z-50 lg:hidden glass-card"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <Menu className="w-5 h-5" />
      </Button>

      {/* Top Banner with Logo - Mobile Optimized */}
      <div className="bg-gradient-to-r from-primary via-primary/90 to-primary text-white py-3 md:py-4 relative overflow-hidden sticky top-0 z-40 shadow-[0_4px_20px_rgba(239,68,68,0.3)]">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-red-600 to-primary opacity-90 animate-gradient-shift"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-400/20 via-transparent to-transparent"></div>
        <div className="relative z-10 container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between gap-4 md:gap-8 max-w-7xl mx-auto">
            {/* Logo */}
            <img 
              src={detailParkLogoWhite} 
              alt="Detail Park Logo" 
              className="h-8 md:h-12 lg:h-14 object-contain flex-shrink-0 drop-shadow-lg"
            />
            
            {/* Estado de inscripciones */}
            <div className="flex items-center gap-2 md:gap-3 flex-1 justify-center text-center">
              <Clock className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 text-white/90" />
              <span className="text-[11px] sm:text-sm md:text-base font-bold text-white/95 leading-tight">
                Inscripciones cerradas — próxima convocatoria por confirmar
              </span>
            </div>
            
            {/* Botón CTA */}
            <Button 
              variant="glass" 
              size="lg" 
              className="hidden md:flex text-sm lg:text-base font-bold px-6 lg:px-8 py-3 whitespace-nowrap flex-shrink-0 hover:scale-105 transition-all duration-300 shadow-lg border-2 border-white/30" 
              onClick={openModal}
            >
              Únete a la lista de espera
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-black/40 backdrop-blur-md border-b border-white/10 py-3 sticky top-[60px] z-30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link to="/curso-detailing-iniciacion" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Ver todas las Jornadas</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link to="/up-detail-evento" className="flex items-center gap-2 text-amber-400/80 hover:text-amber-400 transition-colors text-sm">
                <Users className="w-4 h-4" />
                Up Detail
                <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-[10px] py-0 px-1.5">Nuevo</Badge>
              </Link>
              <Link to="/curso-detailing-profesional" className="flex items-center gap-2 text-white/70 hover:text-primary transition-colors text-sm">
                <GraduationCap className="w-4 h-4" />
                Cursos Completos
              </Link>
              <Link to="/formacion-profesional-detailing" className="flex items-center gap-2 text-white/70 hover:text-primary transition-colors text-sm">
                <Trophy className="w-4 h-4" />
                Carrera Detailing
              </Link>
              <Link to="/contacto" className="flex items-center gap-2 text-white/70 hover:text-primary transition-colors text-sm">
                <Mail className="w-4 h-4" />
                Contacto
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Aviso: plazas cerradas */}
      <section className="bg-black/50 border-b border-primary/20 py-6 md:py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto glass-intense rounded-2xl p-5 md:p-7 border border-primary/30 text-center">
            <Badge className="bg-primary/20 text-primary border-primary/40 mb-3">Plazas cerradas</Badge>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
              Actualmente no hay plazas disponibles
            </h2>
            <p className="text-white/75 text-sm md:text-base max-w-2xl mx-auto mb-4">
              Estamos cerrando la fecha de la próxima convocatoria del Workshop Jornada Zero.
              Déjanos tus datos y serás de los primeros en recibir el aviso cuando abramos inscripciones.
              El precio se mantiene en <strong className="text-white">97 € + IVA</strong> y es descontable de los cursos completos.
            </p>
            <Button variant="hero" size="lg" onClick={openModal} className="w-full md:w-auto">
              Avísame cuando abran plazas
            </Button>
          </div>
        </div>
      </section>

      {/* Problems Section with background video */}
      <section className="relative py-16 md:py-24 overflow-hidden min-h-[50vh] md:min-h-[60vh]">
        {/* Background image for mobile */}
        <div className="absolute inset-0 md:hidden">
          <img 
            src={heroJornadaCero} 
            alt="Detail Park Background" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Background video for desktop — deferred loading to improve LCP */}
        <DeferredYouTubeBackground />
        
        {/* Overlays for readability */}
        <div className="absolute inset-0 bg-black/60 md:bg-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70 md:via-black/40 md:to-black/70"></div>

        <div className="relative z-10 container mx-auto px-4">
          {/* Badge - Low Cost High Value */}
          <div className="text-center mb-6">
            <Badge className="bg-green-500/20 text-green-400 border border-green-500/30 px-4 py-1.5 text-sm font-semibold">
              🚀 EXPERIENCIA DE INMERSIÓN • BAJO RIESGO, ALTO VALOR
            </Badge>
          </div>
          
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight">
              Jornada Zero: <span className="gradient-text">Tu Primera Inmersión</span> en el Detailing Profesional
            </h1>
            <p className="text-base md:text-lg text-white/90 max-w-3xl mx-auto mb-6">
              <strong className="text-primary">No arriesgues miles de euros sin saber si es para ti.</strong> Por solo €97 + IVA, accede a un taller 100% real, usa herramientas profesionales y descubre si tienes mentalidad de empresario.
            </p>
            
            {/* Three Key Points */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mt-8">
              <div className="glass-card p-4 rounded-xl border border-green-500/30">
                <div className="text-2xl mb-2">💰</div>
                <p className="font-bold text-white mb-1">Inversión Mínima</p>
                <p className="text-sm text-white/70">Solo €97 + IVA - El curso más accesible del sector</p>
              </div>
              <div className="glass-card p-4 rounded-xl border border-primary/30">
                <div className="text-2xl mb-2">🔧</div>
                <p className="font-bold text-white mb-1">Acceso Total</p>
                <p className="text-sm text-white/70">Usa las mismas pulidoras y químicos que los profesionales</p>
              </div>
              <div className="glass-card p-4 rounded-xl border border-amber-500/30">
                <div className="text-2xl mb-2">🧠</div>
                <p className="font-bold text-white mb-1">Mentalidad Business</p>
                <p className="text-sm text-white/70">Te enseñamos qué material comprar primero para no tirar el dinero</p>
              </div>
            </div>
          </div>
          
          {/* Cards - Hidden on mobile */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
            {[
              {
                title: "¿Es para mí?",
                description: "No sabes si el detailing es tu vocación profesional"
              },
              {
                title: "Sin experiencia",
                description: "Cero conocimientos prácticos del sector"
              },
              {
                title: "Miedo a invertir",
                description: "Dudas antes de comprometerte con formación cara"
              }
            ].map((problem, index) => (
              <Card key={index} className="glass-card p-4 md:p-6 text-center">
                <p className="text-base md:text-lg font-semibold text-white mb-2 md:mb-3">{problem.title}</p>
                <p className="text-sm md:text-base text-white/70">{problem.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section - Mobile Optimized */}
      <section className="py-12 md:py-16 bg-black/30">
        <div className="container mx-auto px-4">
          {/* Value Proposition Box */}
          <div className="max-w-4xl mx-auto mb-12 glass-intense rounded-2xl p-6 md:p-8 border border-primary/30">
            <div className="text-center">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
                ¿No estás seguro de invertir en formación completa?
              </h2>
              <p className="text-white/80 mb-4">
                La Jornada Zero te permite <strong className="text-primary">probar antes de comprometerte</strong>. Por solo €97 + IVA, vive un día en nuestro taller, practica con vehículos reales y decide con conocimiento de causa.
              </p>
              <p className="text-sm text-primary font-semibold">
                ✨ Si después quieres continuar, este importe se descuenta de cualquier curso completo.
              </p>
            </div>
          </div>

          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight">
              Jornada Zero: <span className="gradient-text">Prueba Antes de Comprometerte</span>
            </h2>
            <p className="text-base md:text-lg text-white/80 max-w-3xl mx-auto px-2">
              No es una formación, es un <strong>workshop práctico de 1 día a precio reducido</strong> para que decidas si quieres continuar con nuestros cursos completos.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
            {[
              { step: "1", title: "Reserva", description: "Tu plaza en el workshop" },
              { step: "2", title: "Experimenta", description: "1 día de práctica real" },
              { step: "3", title: "Descubre", description: "Si es para ti" },
              { step: "4", title: "Decide", description: "Sin compromiso" }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="glass-card rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <span className="text-xl md:text-2xl font-bold gradient-text">{step.step}</span>
                </div>
                <p className="text-sm md:text-lg font-semibold text-white mb-1 md:mb-2">{step.title}</p>
                <p className="text-xs md:text-sm text-white/70">{step.description}</p>
              </div>
            ))}
          </div>

          {/* CTA to other courses */}
          <div className="text-center mt-10">
            <p className="text-white/70 text-sm mb-4">¿Prefieres empezar directamente con formación completa?</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/curso-detailing-profesional">
                <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                  Ver Cursos Completos
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <Link to="/formacion-profesional-detailing">
                <Button variant="outline" size="sm" className="border-primary/30 text-primary hover:bg-primary/10">
                  Carrera Detailing Completa
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Event Team Image Section */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="relative max-w-6xl mx-auto">
            {/* Image with faded edges */}
            <div className="relative rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10 pointer-events-none"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 z-10 pointer-events-none"></div>
              <img 
                src={eventoGrupoReal} 
                alt="Equipo Detail Park Academy en acción" 
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Overlay text */}
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="text-center px-4">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-3 drop-shadow-2xl">
                  Aprende de los <span className="gradient-text">Mejores Profesionales</span>
                </h2>
                <p className="text-base md:text-xl text-white/90 drop-shadow-lg">
                  Experiencia práctica con vehículos reales
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Itinerario del Día */}
      <section className="py-24 bg-black/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block glass-card px-8 py-3 rounded-full mb-8">
              <span className="gradient-text font-bold uppercase tracking-wide">Workshop de 1 Día</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              Itinerario del <span className="gradient-text">Workshop Jornada Zero</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              8 horas de experiencia práctica para descubrir el detailing profesional
            </p>
            
            {/* Fecha y Horario Destacado */}
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <div className="glass-intense rounded-2xl px-8 py-4 border border-primary/30">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-white/70 text-sm">Próxima convocatoria</div>
                    <div className="text-white font-bold text-xl">Fecha por confirmar</div>
                  </div>
                </div>
              </div>
              
              <div className="glass-intense rounded-2xl px-8 py-4 border border-primary/30">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-white/70 text-sm">Horario</div>
                    <div className="text-white font-bold text-xl">10:00 AM - 18:00 PM</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline del Itinerario */}
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Línea vertical central */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-primary/50 to-primary rounded-full"></div>
              
              <div className="space-y-8">
                {[
                  {
                    time: "10:00 AM",
                    title: "Bienvenida y Presentación",
                    description: "Conoce al equipo, otros participantes y descubre qué aprenderás hoy",
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    ),
                    gradient: "from-blue-500 to-cyan-500"
                  },
                  {
                    time: "10:30 AM",
                    title: "Teoría Básica de los Productos",
                    description: "Aprende sobre productos profesionales, usos y técnicas de aplicación",
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    ),
                    gradient: "from-purple-500 to-pink-500"
                  },
                  {
                    time: "11:30 AM",
                    title: "Práctica en un Vehículo Real",
                    description: "Manos a la obra: lavado, descontaminación y limpieza interior profesional",
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    ),
                    gradient: "from-green-500 to-emerald-500"
                  },
                  {
                    time: "14:00 PM",
                    title: "Comida Incluida",
                    description: "Relájate y comparte experiencias con otros participantes",
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    ),
                    gradient: "from-orange-500 to-red-500"
                  },
                  {
                    time: "15:00 PM",
                    title: "Introducción al Pulido",
                    description: "Descubre el mundo del pulido y corrección de pintura profesional",
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    ),
                    gradient: "from-yellow-500 to-amber-500"
                  },
                  {
                    time: "16:30 PM",
                    title: "Sesión de Preguntas y Respuestas",
                    description: "Resuelve todas tus dudas con expertos del sector",
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ),
                    gradient: "from-indigo-500 to-purple-500"
                  },
                  {
                    time: "17:30 PM",
                    title: "Cierre y Entrega de Certificados",
                    description: "Recibe tu certificado de asistencia y próximos pasos profesionales",
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    ),
                    gradient: "from-teal-500 to-cyan-500"
                  }
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 animate-fade-in`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Contenido */}
                    <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <div className="glass-intense rounded-2xl p-6 hover-glow transition-all duration-300 hover:scale-105 border border-white/10">
                        <div className={`inline-block glass-card px-4 py-1 rounded-full mb-3 bg-gradient-to-r ${item.gradient}`}>
                          <span className="text-white text-sm font-bold">{item.time}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2" aria-label={item.title}>{item.title}</h3>
                        <p className="text-white/80">{item.description}</p>
                      </div>
                    </div>

                    {/* Icono Central */}
                    <div className="relative z-10 flex-shrink-0">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-glow animate-pulse-subtle`}>
                        <div className="text-white">
                          {item.icon}
                        </div>
                      </div>
                      {/* Línea conectora en mobile */}
                      {index < 6 && (
                        <div className="md:hidden absolute left-1/2 top-16 w-1 h-8 bg-gradient-to-b from-primary to-transparent transform -translate-x-1/2"></div>
                      )}
                    </div>

                    {/* Espacio para el otro lado */}
                    <div className="flex-1 hidden md:block"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Final - Featured Price Card */}
            <div className="text-center mt-16">
              <div className="relative max-w-lg mx-auto">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <Badge className="bg-green-500 text-white px-4 py-1 font-bold">
                    💰 EL CURSO MÁS ACCESIBLE DEL SECTOR
                  </Badge>
                </div>
                
                <div className="glass-intense rounded-2xl p-8 border-2 border-primary text-center">
                  <div className="text-white/60 line-through text-xl mb-2">€199</div>
                  <div className="text-5xl font-black text-primary mb-2">€97</div>
                  <div className="text-white/80 text-sm mb-6">+ IVA • Oferta limitada</div>
                  
                  <div className="space-y-3 text-left mb-6">
                    <div className="flex items-center gap-2 text-white/90">
                      <CheckCircle className="text-green-400 w-5 h-5" />
                      <span>8 horas de práctica en taller real</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/90">
                      <CheckCircle className="text-green-400 w-5 h-5" />
                      <span>Herramientas profesionales incluidas</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/90">
                      <CheckCircle className="text-green-400 w-5 h-5" />
                      <span>Certificado de asistencia</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/90">
                      <CheckCircle className="text-green-400 w-5 h-5" />
                      <span>Descontable de cursos completos</span>
                    </div>
                  </div>
                  
                  <Button variant="hero" size="xl" onClick={openModal} className="w-full">
                    Avísame cuando abran plazas
                  </Button>
                  
                  <p className="text-xs text-white/60 mt-4">
                    ⚡ Plazas cerradas • 97 € + IVA al reabrir • Sin compromiso
                  </p>
                </div>
              </div>
              
              {/* Estado de convocatoria */}
              <div className="flex flex-wrap justify-center gap-6 mt-8">
                <div className="glass-intense rounded-2xl px-6 py-4 border border-primary/30">
                  <div className="flex items-center gap-3">
                    <Clock className="text-primary w-6 h-6" />
                    <div className="text-left">
                      <div className="text-white/70 text-sm">Próxima convocatoria</div>
                      <div className="text-white font-bold">Fecha por confirmar</div>
                    </div>
                  </div>
                </div>
                
                <div className="glass-intense rounded-2xl px-6 py-4 border border-orange-500/30">
                  <div className="flex items-center gap-3">
                    <Users className="text-orange-400 w-6 h-6" />
                    <div className="text-left">
                      <div className="text-white/70 text-sm">Estado de plazas</div>
                      <div className="text-orange-400 font-bold">Plazas cerradas · Próxima apertura en breve</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Interactive Components - Hidden on mobile */}
      <div className="hidden lg:block">
        <AdvancedInteractives onCtaClick={openModal} />
      </div>

      {/* Video Testimonials */}
      <VideoTestimonials />

      {/* Trust Signals */}
      <TrustSignals />

      {/* Expertise Showcase - Portfolio */}
      <ExpertiseShowcase />

      {/* Pricing Comparison */}
      <PricingComparison />

      {/* Value Justification */}
      <ValueJustification />

      {/* Instructor Profile */}
      <InstructorProfile />

      {/* Google Reviews */}
      <GoogleReviews />

      {/* FAQ Section */}
      <FAQ />

      {/* Access Section - FunnelLabs Style */}
      <section className="py-24 bg-black/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-block glass-card px-8 py-3 rounded-full mb-8">
              <span className="gradient-text font-bold uppercase tracking-wide">Tendrás ACCESO a...</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
              Nuestra academia con <span className="gradient-text">Experiencia Práctica Completa</span>
              <br/>en Detailing <span className="gradient-text">Disruptiva y Efectiva</span>
              <br/>para Crecer tu Carrera Profesional.
            </h2>
            <p className="text-xl text-white/80">Listas para empezar a trabajar, en tan solo unos días.</p>
          </div>
          
          {/* Scrolling Templates Preview - Mobile optimized */}
          <div className="relative overflow-x-auto mb-16 -mx-4 px-4 md:mx-0 md:px-0">
            <div className="flex gap-4 md:gap-8">
              {[eventoClaseCompleta, eventoAlumnosAtentos, eventoPracticaPulidora, eventoLimpiezaInterior, eventoPulidoFaro].map((img, index) => (
                <div key={index} className="flex-shrink-0">
                  <div className="glass-intense rounded-xl md:rounded-2xl p-3 md:p-4 hover-glow">
                    <img 
                      src={img} 
                      alt={`Momento del evento ${index + 1}`}
                      className="w-64 md:w-80 h-48 md:h-64 object-cover object-center rounded-lg md:rounded-xl"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Course Preview */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              👀 Así es La Jornada Cero: Experiencia Real en Detailing
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-8 md:mt-12">
              {[
                {
                  title: "Formación Práctica",
                  description: "Aprende técnicas reales de detailing hands-on",
                  image: eventoPracticaPulidora
                },
                {
                  title: "Ambiente Profesional", 
                  description: "Centro Detail Park con equipamiento completo",
                  image: eventoClaseCompleta
                },
                {
                  title: "Certificado Oficial",
                  description: "Acredita tu participación en el evento",
                  image: certificadoAlumnoFeliz
                }
              ].map((course, index) => (
                <div key={index} className="glass-intense rounded-xl md:rounded-2xl p-4 md:p-6 hover-glow transition-all duration-500 hover:scale-105">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-48 md:h-64 object-cover object-center rounded-lg md:rounded-xl mb-3 md:mb-4"
                  />
                  <h4 className="text-lg md:text-xl font-bold text-white mb-2">{course.title}</h4>
                  <p className="text-sm md:text-base text-white/80 mb-3 md:mb-4">{course.description}</p>
                  <Button variant="funnel" size="sm" className="w-full" onClick={openModal}>
                    Avísame cuando abran plazas
                  </Button>
                </div>
              ))}
            </div>
            
            <Button variant="hero" size="xl" className="mt-12" onClick={openModal}>
              Avísame cuando abran plazas
            </Button>
            
            <div className="flex items-center justify-center gap-2 mt-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-white/80 text-lg ml-2">5,0 - +300 reviews</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bonuses Section - Mobile Optimized */}
      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-20">
            <div className="inline-block glass-card px-4 md:px-8 py-2 md:py-3 rounded-full mb-4 md:mb-8">
              <span className="gradient-text font-bold uppercase tracking-wide text-xs md:text-base">Y por si fuese poco...</span>
            </div>
            <h2 className="text-2xl md:text-4xl lg:text-6xl font-black text-white mb-6 md:mb-8 leading-tight">
              Obtén acceso a todos nuestros
              <br/><span className="gradient-text">Bonus y Actualizaciones.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                bonus: "BONUS #1",
                title: "Certificado Oficial de Asistencia",
                description: "Recibe tu certificado que acredita 8 horas de formación intensiva en detailing profesional.",
                image: certificadoAlumnoFeliz
              },
              {
                bonus: "BONUS #2", 
                title: "Material Didáctico Digital",
                description: "Acceso a guías en PDF, videos de repaso y lista de productos recomendados para seguir practicando.",
                image: eventoAlumnosAtentos
              },
              {
                bonus: "BONUS #3",
                title: "Comunidad Exclusiva Alumni", 
                description: "Únete al grupo de asistentes anteriores con ofertas especiales y prioridad en futuros eventos.",
                image: eventoClaseCompleta
              }
            ].map((bonus, index) => (
              <div key={index} className="glass-intense rounded-xl md:rounded-2xl p-6 md:p-8 hover-glow transition-all duration-500 hover:scale-105">
                <div className="text-primary font-bold text-xs md:text-sm mb-2">{bonus.bonus}</div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4">{bonus.title}</h3>
                <img 
                  src={bonus.image} 
                  alt={bonus.title}
                  className="w-full h-48 md:h-64 object-cover object-center rounded-lg md:rounded-xl mb-3 md:mb-4"
                />
                <p className="text-sm md:text-base text-white/80">{bonus.description}</p>
              </div>
            ))}
          </div>

          {/* Special Bonus - Mobile Optimized */}
          <div className="mt-12 md:mt-16 text-center">
            <h3 className="text-2xl md:text-3xl font-bold gradient-text mb-3 md:mb-4">Y, la Joya de la Corona</h3>
            <p className="text-lg md:text-xl text-white/80 mb-6 md:mb-8">Algo Nunca Antes Visto</p>
            
            <div className="max-w-4xl mx-auto glass-intense rounded-2xl md:rounded-3xl p-6 md:p-12 hover-glow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
                <div className="order-2 md:order-1">
                  <img 
                    src={danielLopezInstructor} 
                    alt="Formador experto"
                    className="w-full rounded-xl md:rounded-2xl"
                  />
                </div>
                <div className="text-left order-1 md:order-2">
                  <h4 className="text-2xl md:text-3xl font-bold gradient-text mb-3 md:mb-4">Formador Experto: Daniel López</h4>
                  <p className="text-sm md:text-base text-white/90 mb-4 md:mb-6">
                    Dentro de Detail Park tendrás acceso exclusivo a nuestro formador experto con +15 años de experiencia 
                    que te ayudará a dominar todas las técnicas profesionales en días.
                  </p>
                  <div className="bg-primary/20 border-l-4 border-primary p-3 md:p-4 rounded-r-lg mb-4 md:mb-6">
                    <h5 className="text-base md:text-lg font-bold text-white mb-2">X1 Sesión Estratégica 15min</h5>
                    <p className="text-white/80 text-xs md:text-sm">
                      Como Bonus nunca antes visto te regalaremos una sesión estratégica de 15 minutos con nuestros 
                      expertos que te darán un paso a paso para que puedas crecer profesionalmente.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8 md:mt-12">
            <Button variant="hero" size="xl" onClick={openModal} className="w-full md:w-auto">
              Avísame cuando abran plazas
            </Button>
            
            <div className="flex items-center justify-center gap-2 mt-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-white/80 text-lg ml-2">5,0 - +300 reviews</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Mobile Optimized */}
      <section className="py-16 md:py-24 bg-black/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-20">
            <div className="inline-block glass-card px-4 md:px-8 py-2 md:py-3 rounded-full mb-4 md:mb-8">
              <span className="gradient-text font-bold uppercase tracking-wide text-xs md:text-base">Testimonios</span>
            </div>
            <h2 className="text-2xl md:text-4xl lg:text-6xl font-black text-white mb-6 md:mb-8 leading-tight">
              ¿Qué opina la gente sobre
              <br/><span className="gradient-text">nuestros cursos?</span>
            </h2>
          </div>
          
          {/* Scrolling Testimonials - Mobile Optimized with horizontal scroll */}
          <div className="relative overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
            <div className="flex gap-4 md:gap-8">
              {[
                {
                  name: "Nacho Amirola",
                  content: "Súper recomendable. Me han enseñado técnicas profesionales que no sabía que existían. Mi trabajo ahora es literalmente mejor que el de talleres establecidos."
                },
                {
                  name: "Jose Miguel", 
                  content: "Los mejores profesionales del Detailing en España. Desde que hice el curso, he montado mi propio negocio y tengo lista de espera de clientes."
                },
                {
                  name: "Felipe Durán",
                  content: "Descubrí este curso a través de un amigo y debo agradecérselo. En 4 días aprendí más que en años de intentar aprender por mi cuenta."
                }
              ].map((testimonial, index) => (
                <div key={index} className="flex-shrink-0 w-72 md:w-80 lg:w-96">
                  <TestimonialCard {...testimonial} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section - Mobile Optimized */}
      <section className="py-16 md:py-24 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-90"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-2xl md:text-4xl lg:text-6xl font-black text-white mb-6 md:mb-8 leading-tight">
            ¿Listo para convertirte en un
            <br/><span className="text-white/90">Detailer Profesional?</span>
          </h2>
          <p className="text-lg md:text-2xl text-white/90 mb-8 md:mb-12 max-w-3xl mx-auto px-2">
            Las plazas están cerradas por ahora. Apúntate a la lista de espera y te avisaremos en cuanto confirmemos la próxima fecha.
          </p>
          
          <Button variant="glass" size="xl" className="mb-6 md:mb-8 text-lg md:text-2xl py-5 md:py-6 px-10 md:px-16 w-full md:w-auto" onClick={openModal}>
            Avísame cuando abran plazas
          </Button>
          
          <div className="flex items-center justify-center gap-2 text-white/80 text-lg">
            <Clock className="w-6 h-6" />
            <span>Próxima convocatoria por confirmar</span>
          </div>
          
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-white/80 text-lg ml-2">5,0 - +300 reviews</span>
          </div>
        </div>
      </section>

      {/* Partners y Colaboradores */}
      <section className="bg-black/50 py-10 md:py-14 border-t border-white/10">
        <div className="container mx-auto px-4">
          <p className="text-center text-xs text-white/50 uppercase tracking-wider font-semibold mb-6">
            Nuestros Partners y Colaboradores
          </p>
          <div className="flex items-center justify-center gap-8 md:gap-14 flex-wrap">
            <img src={logoLeandroLandete} alt="Leandro Landete Academy - Colaborador formativo" className="h-7 md:h-10 w-auto brightness-0 invert opacity-50 hover:opacity-100 transition-opacity duration-300" />
            <img src={logoStek} alt="STEK Automotive - Instaladores oficiales" className="h-7 md:h-10 w-auto brightness-0 invert opacity-50 hover:opacity-100 transition-opacity duration-300" />
            <img src={logoCarcarePassion} alt="Car Care Passion - Partner oficial de productos" className="h-7 md:h-10 w-auto brightness-0 invert opacity-50 hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
      </section>

      {/* Footer - Mobile Optimized */}
      <footer className="bg-black py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Logo and description */}
            <div className="text-center md:text-left">
              <img src={detailParkLogo} alt="Detail Park" className="h-10 md:h-12 mx-auto md:mx-0 mb-4 filter brightness-0 invert" />
              <p className="text-white/60 text-sm">
                Centro de formación profesional en detailing y estética del automóvil.
              </p>
            </div>
            
            {/* Navigation links */}
            <div className="text-center">
              <h4 className="text-white font-semibold mb-4">Explora</h4>
              <div className="flex flex-col gap-2">
                <Link to="/" className="text-white/60 hover:text-primary transition-colors text-sm">Inicio</Link>
                <Link to="/curso-detailing-profesional" className="text-white/60 hover:text-primary transition-colors text-sm">Cursos de Detailing</Link>
                <Link to="/formacion-profesional-detailing" className="text-white/60 hover:text-primary transition-colors text-sm">Carrera Detailing Completa</Link>
                <Link to="/quienes-somos" className="text-white/60 hover:text-primary transition-colors text-sm">Quiénes Somos</Link>
                <Link to="/contacto" className="text-white/60 hover:text-primary transition-colors text-sm">Contacto</Link>
              </div>
            </div>
            
            {/* CTA */}
            <div className="text-center md:text-right">
              <h4 className="text-white font-semibold mb-4">¿Quieres más formación?</h4>
              <p className="text-white/60 text-sm mb-4">
                Descubre nuestros cursos completos y la Carrera Detailing.
              </p>
              <Link to="/formacion-profesional-detailing">
                <Button variant="outline" size="sm" className="border-primary/30 text-primary hover:bg-primary/10">
                  Ver Programa Completo
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-6">
            <p className="text-white/60 text-xs md:text-sm text-center leading-relaxed">
              © {new Date().getFullYear()} Detailing Car & Parking Club S.L. Todos los derechos reservados.
              <span className="hidden md:inline"> | </span>
              <br className="md:hidden" />
              <Link to="/politica-privacidad" className="text-white/80 hover:text-white mx-1 md:mx-2 inline-block mt-2 md:mt-0">Política de Privacidad</Link>
              <span className="mx-1">•</span>
              <Link to="/politica-privacidad" className="text-white/80 hover:text-white mx-1 md:mx-2 inline-block">Aviso Legal</Link>
            </p>
          </div>
        </div>
      </footer>

      {/* Registration Modal */}
      <RegistrationModal isOpen={isOpen} onClose={closeModal} />
    </div>
    </>
  );
};

export default Index;

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Countdown } from "@/components/Countdown";
import { CourseCard } from "@/components/CourseCard";
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
  Menu
} from "lucide-react";

// Import new optimized components
import { OptimizedHero } from "@/components/OptimizedHero";
import { AdvancedInteractives } from "@/components/AdvancedInteractives";
import { PsychologicalTriggers } from "@/components/PsychologicalTriggers";
import { MobileOptimization } from "@/components/MobileOptimization";
import { ExitIntentPopup } from "@/components/ExitIntentPopup";
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
import { PricingComparison } from "@/components/PricingComparison";
import { InstructorProfile } from "@/components/InstructorProfile";
import { RegistrationModal } from "@/components/RegistrationModal";
import { useRegistrationModal } from "@/hooks/useRegistrationModal";

// Import images
import detailParkLogo from "@/assets/detail-park-logo.webp";
import heroDetailing from "@/assets/hero-detailing.jpg";
import beforeAfterDetailing from "@/assets/before-after-detailing.jpg";
import detailingTools from "@/assets/detailing-tools.jpg";
import danielLopezInstructor from "@/assets/daniel-lopez-instructor.webp";
import certificadoDetailing from "@/assets/certificado-detailing.png";

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isOpen, openModal, closeModal } = useRegistrationModal();

  return (
    <div className="min-h-screen animated-bg">
      {/* Enhanced Interactive Components */}
      <StickyFloatingCTA onCtaClick={openModal} />
      <MobileOptimization isOpen={mobileMenuOpen} onToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />
      
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-4 right-4 z-50 lg:hidden glass-card"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <Menu className="w-5 h-5" />
      </Button>

      {/* Top Banner - Enhanced */}
      <div className="bg-primary text-white text-center py-3 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-90"></div>
        <div className="relative z-10 flex items-center justify-center gap-4 container mx-auto px-4">
          <span className="text-sm font-bold">🔥 Oferta limitada termina en</span>
          <Countdown />
          <Button variant="glass" size="sm" className="ml-4 animate-pulse">
            RESERVAR PLAZA
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <iframe
            src="https://www.youtube.com/embed/ByRhg2kYD-A?autoplay=1&mute=1&loop=1&playlist=ByRhg2kYD-A&controls=0&showinfo=0&rel=0&modestbranding=1&start=39"
            className="w-full h-full object-cover scale-150"
            allow="autoplay; encrypted-media"
            style={{ pointerEvents: 'none' }}
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            UP DETAIL: Tu Primera Toma de Contacto
            <br/><span className="gradient-text">con el Detailing Profesional</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Jornada intensiva de 1 día para iniciados que quieren descubrir si el detailing es su futuro. 
            Aprende las técnicas principales y decide si quieres vivir de esto.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button variant="hero" size="xl" className="animate-pulse" onClick={openModal}>
              EMPEZAR AHORA
            </Button>
            <Button variant="glass" size="xl">
              Ver Demostración
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-8 text-white/80">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>+200 participantes</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span>5.0/5 valoración</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              <span>Certificado incluido</span>
            </div>
          </div>
        </div>
      </section>


      {/* Logos Section */}
      <section className="py-12 bg-black/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-8 opacity-60">
            {['DETAILING PROFESIONAL', 'TÉCNICAS AVANZADAS', 'CERTIFICACIÓN OFICIAL'].map((text, index) => (
              <div key={index} className="text-white font-semibold text-sm">
                {text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              ¿Quieres vivir del detailing pero <span className="gradient-text">no sabes por dónde empezar</span>?
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Entendemos las dudas de quien está considerando entrar al mundo del detailing profesional.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
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
              <Card key={index} className="glass-card p-6 text-center">
                <h3 className="text-lg font-semibold text-white mb-3">{problem.title}</h3>
                <p className="text-white/70">{problem.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 bg-black/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              UP DETAIL: Tu <span className="gradient-text">primer paso</span> al éxito
            </h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Un día intensivo diseñado para iniciados que quieren descubrir 
              si el detailing profesional es su futuro.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { step: "1", title: "Reserva", description: "Tu plaza en UP DETAIL" },
              { step: "2", title: "Experimenta", description: "Práctica real 1 día" },
              { step: "3", title: "Aprende", description: "Técnicas principales" },
              { step: "4", title: "Decide", description: "Si es tu camino" }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="glass-card rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold gradient-text">{step.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-white/70 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Itinerario del Día */}
      <section className="py-24 bg-black/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block glass-card px-8 py-3 rounded-full mb-8">
              <span className="gradient-text font-bold uppercase tracking-wide">Tu Día en UP DETAIL</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              Itinerario Completo de la <span className="gradient-text">Jornada Intensiva</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              8 horas de inmersión total en el mundo del detailing profesional
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
                    <div className="text-white/70 text-sm">Fecha del Evento</div>
                    <div className="text-white font-bold text-xl">Sábado 13 Diciembre 2025</div>
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
                        <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
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

            {/* CTA Final */}
            <div className="text-center mt-16">
              <div className="glass-intense rounded-2xl p-8 border border-primary/30">
                <h3 className="text-2xl font-bold text-white mb-4">
                  ¿Listo para tu primera experiencia en detailing profesional?
                </h3>
                <p className="text-white/80 mb-6">
                  Plazas limitadas: Solo 10 participantes para garantizar atención personalizada
                </p>
                <Button variant="hero" size="xl" onClick={openModal} className="animate-pulse-glow">
                  🎯 Reservar Mi Plaza - €299 + IVA
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Interactive Components */}
      <AdvancedInteractives onCtaClick={openModal} />

      {/* Video Testimonials */}
      <VideoTestimonials />

      {/* Trust Signals */}
      <TrustSignals />

      {/* Pricing Comparison */}
      <PricingComparison />

      {/* Instructor Profile */}
      <InstructorProfile />

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
              Nuestra academia con <span className="gradient-text">Formación Completa</span>
              <br/>en Detailing <span className="gradient-text">Disruptiva y Efectiva</span>
              <br/>para Crecer tu Carrera Profesional.
            </h2>
            <p className="text-xl text-white/80">Listas para empezar a trabajar, en tan solo unos días.</p>
          </div>
          
          {/* Scrolling Templates Preview */}
          <div className="relative overflow-hidden mb-16">
            <div className="flex gap-8 animate-float">
              {[heroDetailing, beforeAfterDetailing, detailingTools].map((img, index) => (
                <div key={index} className="flex-shrink-0">
                  <div className="glass-intense rounded-2xl p-4 hover-glow">
                    <img 
                      src={img} 
                      alt={`Técnica ${index + 1}`}
                      className="w-80 h-48 object-cover rounded-xl"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Course Preview */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              👀 Te revelaremos un Sneak Peek de algunas de las técnicas que encontrarás dentro de Nuestra Formación...
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {[
                {
                  title: "Curso Aficionado",
                  description: "Perfecto para empezar en el mundo del detailing",
                  image: detailingTools
                },
                {
                  title: "Curso Profesional", 
                  description: "Domina todas las técnicas avanzadas",
                  image: beforeAfterDetailing
                },
                {
                  title: "Carrera Detailing",
                  description: "Conviértete en un experto certificado",
                  image: heroDetailing
                }
              ].map((course, index) => (
                <div key={index} className="glass-intense rounded-2xl p-6 hover-glow transition-all duration-500 hover:scale-105">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-xl mb-4"
                  />
                  <h4 className="text-xl font-bold text-white mb-2">{course.title}</h4>
                  <p className="text-white/80 mb-4">{course.description}</p>
                  <Button variant="funnel" size="sm" className="w-full">
                    VER DEMOSTRACIÓN
                  </Button>
                </div>
              ))}
            </div>
            
            <Button variant="hero" size="xl" className="mt-12" onClick={openModal}>
              Obtén Acceso Ahora
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

      {/* Bonuses Section - FunnelLabs Style */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-block glass-card px-8 py-3 rounded-full mb-8">
              <span className="gradient-text font-bold uppercase tracking-wide">Y por si fuese poco...</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
              Obtén acceso a todos nuestros
              <br/><span className="gradient-text">Bonus y Actualizaciones.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                bonus: "BONUS #1",
                title: "Certificado Profesional Reconocido",
                description: "Te vamos a dar un certificado oficial que te permitirá trabajar en cualquier taller profesional de España.",
                image: certificadoDetailing
              },
              {
                bonus: "BONUS #2", 
                title: "Acceso a Bolsa de Empleo Nacional",
                description: "Obtén acceso a nuestra red de talleres profesionales que buscan detailers certificados como tú.",
                image: danielLopezInstructor
              },
              {
                bonus: "BONUS #3",
                title: "Asistencia Posterior Personalizada", 
                description: "Como Bonus Exclusivo tendrás acceso directo a nuestros expertos para resolver cualquier duda.",
                image: detailingTools
              }
            ].map((bonus, index) => (
              <div key={index} className="glass-intense rounded-2xl p-8 hover-glow transition-all duration-500 hover:scale-105">
                <div className="text-primary font-bold text-sm mb-2">{bonus.bonus}</div>
                <h3 className="text-xl font-bold text-white mb-4">{bonus.title}</h3>
                <img 
                  src={bonus.image} 
                  alt={bonus.title}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
                <p className="text-white/80">{bonus.description}</p>
              </div>
            ))}
          </div>

          {/* Special Bonus */}
          <div className="mt-16 text-center">
            <h3 className="text-3xl font-bold gradient-text mb-4">Y, la Joya de la Corona</h3>
            <p className="text-xl text-white/80 mb-8">Algo Nunca Antes Visto</p>
            
            <div className="max-w-4xl mx-auto glass-intense rounded-3xl p-12 hover-glow">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <img 
                    src={danielLopezInstructor} 
                    alt="Formador experto"
                    className="w-full rounded-2xl"
                  />
                </div>
                <div className="text-left">
                  <h4 className="text-3xl font-bold gradient-text mb-4">Formador Experto: Daniel López</h4>
                  <p className="text-white/90 mb-6">
                    Dentro de Detail Park tendrás acceso exclusivo a nuestro formador experto con +15 años de experiencia 
                    que te ayudará a dominar todas las técnicas profesionales en días.
                  </p>
                  <div className="bg-primary/20 border-l-4 border-primary p-4 rounded-r-lg mb-6">
                    <h5 className="text-lg font-bold text-white mb-2">X1 Sesión Estratégica 15min</h5>
                    <p className="text-white/80 text-sm">
                      Como Bonus nunca antes visto te regalaremos una sesión estratégica de 15 minutos con nuestros 
                      expertos que te darán un paso a paso para que puedas crecer profesionalmente.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button variant="hero" size="xl" onClick={openModal}>
              Obtén Acceso Ahora
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

      {/* Testimonials Section - FunnelLabs Style */}
      <section className="py-24 bg-black/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-block glass-card px-8 py-3 rounded-full mb-8">
              <span className="gradient-text font-bold uppercase tracking-wide">Testimonios</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
              ¿Qué opina la gente sobre
              <br/><span className="gradient-text">nuestros cursos?</span>
            </h2>
          </div>
          
          {/* Scrolling Testimonials */}
          <div className="relative overflow-hidden">
            <div className="flex gap-8 animate-float">
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
                <div key={index} className="flex-shrink-0 w-96">
                  <TestimonialCard {...testimonial} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section - FunnelLabs Style */}
      <section className="py-24 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-90"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
            ¿Listo para convertirte en un
            <br/><span className="text-white/90">Detailer Profesional?</span>
          </h2>
          <p className="text-2xl text-white/90 mb-12 max-w-3xl mx-auto">
            No dejes pasar esta oportunidad. Los cupos son limitados y la demanda es alta.
          </p>
          
          <Button variant="glass" size="xl" className="mb-8 text-2xl py-6 px-16">
            Inscribirme Ahora
          </Button>
          
          <div className="flex items-center justify-center gap-2 text-white/80 text-lg">
            <Clock className="w-6 h-6" />
            <span>Oferta válida por tiempo limitado</span>
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

      {/* Footer */}
      <footer className="bg-black py-16">
        <div className="container mx-auto px-4 text-center">
          <img src={detailParkLogo} alt="Detail Park" className="h-12 mx-auto mb-8 filter brightness-0 invert" />
          <p className="text-white/60 mb-8">
            Derechos reservados para Detail Park S.L. 2024 | 
            <a href="#" className="text-white/80 hover:text-white mx-2">Aviso Legal</a> |
            <a href="#" className="text-white/80 hover:text-white mx-2">Política de Privacidad</a> |
            <a href="#" className="text-white/80 hover:text-white mx-2">Condiciones de Venta</a>
          </p>
        </div>
      </footer>

      {/* Registration Modal */}
      <RegistrationModal isOpen={isOpen} onClose={closeModal} />

      <ExitIntentPopup />
    </div>
  );
};

export default Index;

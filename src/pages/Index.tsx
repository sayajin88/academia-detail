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

// Import images
import detailParkLogo from "@/assets/detail-park-logo.webp";
import heroDetailing from "@/assets/hero-detailing.jpg";
import beforeAfterDetailing from "@/assets/before-after-detailing.jpg";
import detailingTools from "@/assets/detailing-tools.jpg";
import danielLopezInstructor from "@/assets/daniel-lopez-instructor.webp";
import certificadoDetailing from "@/assets/certificado-detailing.png";

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen animated-bg">
      {/* Enhanced Interactive Components */}
      <StickyFloatingCTA />
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
          <img 
            src={heroDetailing} 
            alt="Professional Detailing" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            Domina el Detailing Profesional 
            <br/>y <span className="gradient-text">Crea tu Negocio Rentable</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Aprende técnicas profesionales de detailing y construye una carrera exitosa. 
            Sin experiencia previa necesaria.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button variant="hero" size="xl" className="animate-pulse">
              EMPEZAR AHORA
            </Button>
            <Button variant="glass" size="xl">
              Ver Demostración
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-8 text-white/80">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>+2,000 estudiantes</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span>4.9/5 valoración</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              <span>Certificación oficial</span>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-12 bg-primary">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              🔥 Oferta Especial Termina en:
            </h3>
            <Countdown />
            <Button variant="glass" className="mt-4 animate-pulse">
              ACCEDER AHORA
            </Button>
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
              ¿Te sientes <span className="gradient-text">frustrado</span> con tu progreso?
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Sabemos lo que se siente al intentar aprender detailing sin la guía adecuada.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                title: "Técnicas Amateur",
                description: "Resultados que no impresionan a los clientes"
              },
              {
                title: "Formación Cara",
                description: "Miles de euros sin garantía de éxito"
              },
              {
                title: "Prueba y Error",
                description: "Perdiendo tiempo y dinero sin dirección"
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
              La <span className="gradient-text">solución</span> que necesitas
            </h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Hemos simplificado el proceso para que cualquier persona pueda acceder 
              a técnicas profesionales de detailing.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { step: "1", title: "Accede", description: "Únete a Detail Park" },
              { step: "2", title: "Aprende", description: "Técnicas profesionales" },
              { step: "3", title: "Practica", description: "En taller real" },
              { step: "4", title: "Certifícate", description: "Obtén tu diploma" }
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

      {/* Advanced Interactive Components */}
      <AdvancedInteractives />

      {/* Video Testimonials */}
      <VideoTestimonials />

      {/* Trust Signals */}
      <TrustSignals />

      {/* Pricing Comparison */}
      <PricingComparison />

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
            
            <Button variant="hero" size="xl" className="mt-12">
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
            <Button variant="hero" size="xl">
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
    </div>
  );
};

export default Index;

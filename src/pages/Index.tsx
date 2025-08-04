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
  X
} from "lucide-react";

// Import images
import detailParkLogo from "@/assets/detail-park-logo.webp";
import heroDetailing from "@/assets/hero-detailing.jpg";
import beforeAfterDetailing from "@/assets/before-after-detailing.jpg";
import detailingTools from "@/assets/detailing-tools.jpg";
import danielLopezInstructor from "@/assets/daniel-lopez-instructor.webp";
import certificadoDetailing from "@/assets/certificado-detailing.png";

const Index = () => {
  return (
    <div className="min-h-screen animated-bg">
      {/* Top Banner - FunnelLabs Style */}
      <div className="bg-primary text-white text-center py-3 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-90"></div>
        <div className="relative z-10 flex items-center justify-center gap-4">
          <span className="text-sm font-bold">Esta oferta desaparece en</span>
          <Countdown />
          <Button variant="glass" size="sm" className="ml-4">
            COMPRAR
          </Button>
        </div>
      </div>

      {/* Floating Logo */}
      <div className="fixed top-4 left-4 z-50 animate-float">
        <img src={detailParkLogo} alt="Detail Park" className="h-12 filter brightness-0 invert" />
      </div>

      {/* Hero Section - Exact FunnelLabs Style */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        {/* Background Video/Image Effect */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${heroDetailing})` }}
        />
        <div className="absolute inset-0 bg-gradient-hero"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-primary rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-primary/50 rounded-full animate-float"></div>
        <div className="absolute bottom-40 left-1/4 w-3 h-3 bg-primary rounded-full animate-bounce"></div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass-intense rounded-full px-6 py-3 mb-8 animate-bounce-in">
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
            <span className="text-white text-sm font-bold uppercase tracking-wide">Oferta por tiempo limitado</span>
          </div>
          
          {/* Main Headline - FunnelLabs Style */}
          <h1 className="text-5xl md:text-8xl font-black mb-8 leading-none animate-fade-in-up">
            <span className="text-white">La clave para conseguir</span><br />
            <span className="gradient-text animate-glow-pulse">Técnicas de Detailing</span><br />
            <span className="text-white">Disruptivas y Altamente</span><br />
            <span className="gradient-text animate-glow-pulse">Efectivas</span><br />
            <span className="text-white">en</span> <span className="gradient-text italic">Solo unos Días</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 mb-4 max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            *Aun sin tener experiencia previa y sin tener que invertir miles de euros*
          </p>
          
          <Button variant="hero" size="xl" className="mb-12 animate-bounce-in" style={{ animationDelay: '0.4s' }}>
            Obtén Acceso Ahora
          </Button>
          
          <div className="flex items-center justify-center gap-2 text-white/80 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <span className="text-lg">+300 personas han utilizado nuestras técnicas para crecer profesionalmente</span>
          </div>
          
          {/* Social Proof Avatars - FunnelLabs Style */}
          <div className="flex justify-center gap-3 mt-8 animate-slide-in-right" style={{ animationDelay: '0.8s' }}>
            {[1,2,3,4,5].map((i) => (
              <div key={i} className="w-16 h-16 rounded-full bg-gradient-primary border-4 border-white/20 flex items-center justify-center hover-glow transform transition-all duration-300 hover:scale-110">
                <span className="text-white font-bold text-lg">{i}</span>
              </div>
            ))}
            <div className="ml-4 flex items-center">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
          </div>
          
          {/* Video Preview - FunnelLabs Style */}
          <div className="mt-16 max-w-4xl mx-auto animate-scale-in" style={{ animationDelay: '1s' }}>
            <div className="glass-intense rounded-3xl p-8 hover-glow">
              <div className="relative">
                <img 
                  src={beforeAfterDetailing} 
                  alt="Preview del curso" 
                  className="rounded-2xl w-full shadow-glow-intense"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button variant="glass" size="xl" className="rounded-full w-20 h-20 animate-pulse-glow">
                    <PlayCircle className="w-10 h-10" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logos Carousel - FunnelLabs Style */}
      <section className="py-16 bg-black/50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-12 opacity-60 animate-float">
            {['DETAILING PROFESIONAL', 'TÉCNICAS AVANZADAS', 'CERTIFICACIÓN OFICIAL', 'PRÁCTICA REAL', 'BOLSA DE EMPLEO'].map((text, index) => (
              <div key={index} className="flex-shrink-0">
                <span className="text-white font-bold text-xl tracking-wider">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problems Section - FunnelLabs Style */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-block glass-card px-8 py-3 rounded-full mb-8">
              <span className="gradient-text font-bold uppercase tracking-wide">Tus problemas</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
              Si estás aquí... te sucede esto cuando vas a
              <br/><span className="gradient-text">aprender Detailing profesional.</span>
            </h2>
            <p className="text-xl text-white/80">Y sabemos lo frustrante que puede llegar a ser.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "❌",
                title: "No Conviertes Hobby en Negocio",
                description: "Tener pasión no basta, necesitas técnicas profesionales. Aquí verás cómo convertir afición en dinero."
              },
              {
                icon: "❌", 
                title: "Técnicas Genéricas y Poco Profesionales",
                description: "Si tu trabajo parece amateur, espanta clientes. Aquí aprenderás técnicas de élite."
              },
              {
                icon: "❌",
                title: "Altos Precios por Formación",
                description: "No necesitas una academia cara, necesitas formación que realmente funcione."
              },
              {
                icon: "❌",
                title: "Falta de Conocimientos y Experiencia Previa", 
                description: "No necesitas ser un pro en detailing, solo adaptar técnicas que ya están optimizadas."
              },
              {
                icon: "❌",
                title: "Prueba y Error = Tiempo Perdido",
                description: "Cada error es dinero perdido. Usa técnicas que ya han pasado la prueba."
              },
              {
                icon: "❌",
                title: "Frustración por los Resultados",
                description: "Si tu detailing no impresiona, el problema no eres tú. Es la formación. Cámbiala."
              }
            ].map((problem, index) => (
              <Card key={index} className="glass-card border-red-500/30 hover:border-red-500/60 transition-all duration-500 hover-glow group">
                <CardContent className="p-8 text-center">
                  <div className="text-4xl mb-4 group-hover:animate-bounce">{problem.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-4">{problem.title}</h3>
                  <p className="text-white/80">{problem.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section - FunnelLabs Style */}
      <section className="py-24 bg-black/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-block glass-card px-8 py-3 rounded-full mb-8">
              <span className="gradient-text font-bold uppercase tracking-wide">Tu solución</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
              No te gastes miles de euros en una formación,
              <br/><span className="gradient-text">hemos simplificado el proceso.</span>
            </h2>
            <p className="text-xl text-white/80 max-w-4xl mx-auto">
              Hemos redefinido el juego. Para que en vez de pagarle miles de euros a una academia cualquier 
              persona pueda tener acceso a Técnicas Profesionales de Detailing para su Carrera en Días y Sin Experiencia Previa.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Accede a Detail Park",
                description: "Inscríbete en nuestro curso y accede a todas nuestras técnicas profesionales y bonuses",
                image: detailingTools
              },
              {
                step: "02", 
                title: "Practica en Taller Real",
                description: "Selecciona las técnicas que más te gusten dentro de nuestro catálogo completo y practícalas en nuestro taller.",
                image: beforeAfterDetailing
              },
              {
                step: "03",
                title: "Personaliza tu Aprendizaje",
                description: "Realiza pequeños ajustes en las técnicas sobre tu estilo (especialización, objetivos, etc.) y en unos días tendrás tu método personalizado.",
                image: heroDetailing
              },
              {
                step: "04",
                title: "¡Obtén tu Certificado!",
                description: "Una vez completada la formación y estés satisfecho, únicamente recibe tu certificado y en tan solo unos días habrás creado tu carrera profesional.",
                image: certificadoDetailing
              }
            ].map((step, index) => (
              <div key={index} className="text-center group">
                <div className="glass-intense rounded-3xl p-8 mb-6 hover-glow transition-all duration-500 group-hover:scale-105">
                  <div className="text-6xl font-black gradient-text mb-4 group-hover:animate-glow-pulse">#{step.step}</div>
                  <img 
                    src={step.image} 
                    alt={step.title}
                    className="w-full h-40 object-cover rounded-xl mb-4 group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:gradient-text transition-all duration-300">{step.title}</h3>
                <p className="text-white/80">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section - FunnelLabs Style */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-block glass-card px-8 py-3 rounded-full mb-8">
              <span className="gradient-text font-bold uppercase tracking-wide">¿Por qué nosotros?</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
              ¿Por qué Detail Park va a 
              <br/><span className="gradient-text">Cambiar el Juego?</span>
            </h2>
            <p className="text-xl text-white/80 max-w-4xl mx-auto">
              Hemos decidido no guardarnos nada y hacer accesible para cualquier persona 
              una Formación en Detailing Disruptiva y Efectiva.
            </p>
          </div>

          {/* Comparison Table - FunnelLabs Style */}
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Other Options */}
              <div className="glass-card p-8 border-red-500/30">
                <h3 className="text-2xl font-bold text-red-400 mb-6 text-center">❌ Otras Opciones</h3>
                <ul className="space-y-4">
                  {[
                    "Cursos Genéricos y Poco Atractivos",
                    "Curva de Aprendizaje Limitada", 
                    "Altos Costos por Menor Valor",
                    "Proceso Lento y Complicado",
                    "Sin Resultados Respaldados"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-white/80">
                      <X className="w-5 h-5 text-red-400 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Our Solution */}
              <div className="glass-intense p-8 border-primary/50 shadow-glow-intense">
                <h3 className="text-2xl font-bold gradient-text mb-6 text-center">✅ Nosotros</h3>
                <ul className="space-y-4">
                  {[
                    "Enfocados en Convertir Afición en Profesión",
                    "Fácil e Intuitivo de Aprender",
                    "Optimizado para Todos los Niveles",
                    "Técnicas, Cursos y Formación Efectivas",
                    "Respaldado por Resultados Reales"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-white">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="font-semibold">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

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

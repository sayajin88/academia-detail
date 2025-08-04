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
  MapPin
} from "lucide-react";

// Import images
import detailParkLogo from "@/assets/detail-park-logo.webp";
import carWashHero from "@/assets/car-wash-hero.jpeg";
import professionalDetailing from "@/assets/professional-detailing.jpg";
import danielLopezInstructor from "@/assets/daniel-lopez-instructor.webp";
import certificadoDetailing from "@/assets/certificado-detailing.png";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Header with countdown */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <img src={detailParkLogo} alt="Detail Park" className="h-8" />
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-sm text-white">Esta oferta desaparece en</div>
              <Countdown />
              <Button variant="cta" size="sm">
                INSCRIBIRME
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${carWashHero})` }}
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-2 mb-8">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-white text-sm">Oferta por tiempo limitado</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white">Conviértete en un</span><br />
            <span className="gradient-text">Verdadero</span><br />
            <span className="text-white">Detailer</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 mb-4 max-w-3xl mx-auto">
            Los cursos de detailing más completos y prácticos del mercado
          </p>
          
          <p className="text-lg text-white/60 mb-12 max-w-2xl mx-auto">
            *Aun sin tener experiencia previa y sin tener que invertir miles de euros*
          </p>
          
          <Button variant="hero" size="xl" className="mb-8 animate-pulse-glow">
            Obtén Acceso Ahora
          </Button>
          
          <div className="flex items-center justify-center gap-2 text-white/80">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span>+300 alumnos han completado nuestros cursos</span>
          </div>
          
          {/* Social proof avatars */}
          <div className="flex justify-center gap-2 mt-6">
            {[1,2,3,4,5].map((i) => (
              <div key={i} className="w-12 h-12 rounded-full bg-gradient-primary border-2 border-white/20 flex items-center justify-center">
                <span className="text-white font-semibold text-sm">{i}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Tus problemas</Badge>
            <h2 className="text-4xl font-bold text-white mb-6">
              Si estás aquí... te sucede esto cuando quieres <br/>
              <span className="gradient-text">convertirte en un Detailer profesional</span>
            </h2>
            <p className="text-white/80 text-lg">Y sabemos lo frustrante que puede llegar a ser.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "No Tienes Experiencia Práctica",
                description: "Ver videos no basta, necesitas práctica real. Aquí aprenderás con coches reales."
              },
              {
                title: "Cursos Genéricos y Poco Profesionales",
                description: "Si tu formación parece de plantilla, espanta clientes. Aquí aprenderás técnicas profesionales."
              },
              {
                title: "Altos Precios por Formación",
                description: "No necesitas una academia cara, necesitas formación que realmente funcione."
              },
              {
                title: "Falta de Conocimientos Técnicos",
                description: "No necesitas ser un pro desde el inicio, solo las técnicas correctas y probadas."
              },
              {
                title: "Prueba y Error = Tiempo Perdido",
                description: "Cada error es dinero perdido. Usa técnicas que ya han sido probadas."
              },
              {
                title: "Frustración por los Resultados",
                description: "Si no obtienes resultados profesionales, el problema no eres tú. Es la formación."
              }
            ].map((problem, index) => (
              <Card key={index} className="glass-card border-red-500/20 hover:border-red-500/40 transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">{problem.title}</h3>
                  <p className="text-white/80 text-sm">{problem.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Tu solución</Badge>
            <h2 className="text-4xl font-bold text-white mb-6">
              No te gastes miles de euros en formación genérica, <br/>
              <span className="gradient-text">hemos simplificado el proceso</span>
            </h2>
            <p className="text-white/80 text-lg max-w-4xl mx-auto">
              Hemos redefinido la formación en detailing. Para que en vez de pagarle miles de euros a academias 
              cualquier persona pueda tener acceso a Formación Profesional en Detailing en Días y Sin Experiencia Previa.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Inscríbete al Curso",
                description: "Elige el curso que mejor se adapte a tus objetivos y necesidades profesionales"
              },
              {
                step: "02", 
                title: "Aprende en Taller Real",
                description: "Practica con coches reales en nuestro taller profesional con todas las herramientas"
              },
              {
                step: "03",
                title: "Domina las Técnicas",
                description: "Aprende técnicas profesionales de pulido, tratamientos cerámicos y detallado completo"
              },
              {
                step: "04",
                title: "Obtén tu Certificado",
                description: "Recibe tu certificación profesional y accede a nuestra bolsa de empleo"
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="text-6xl font-bold gradient-text mb-4">#{step.step}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-white/80">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              <span className="gradient-text">¿Por qué</span> nuestros cursos van a <br/>
              <span className="gradient-text">cambiar tu futuro profesional?</span>
            </h2>
            <p className="text-white/80 text-lg">
              Hemos decidido no guardarnos nada y hacer accesible para cualquier persona una Formación 
              Profesional en Detailing Completa y Efectiva.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Award}
              title="Certificado Profesional"
              description="Certificado de reconocimiento del sector que avala tus conocimientos"
            />
            <FeatureCard 
              icon={Users}
              title="Formación Personalizada"
              description="Cursos adaptados y 100% personalizados con grupos reducidos"
            />
            <FeatureCard 
              icon={Car}
              title="Práctica en Taller Real"
              description="Experiencia real en taller profesional con coches de clientes"
            />
            <FeatureCard 
              icon={Shield}
              title="Asistencia Posterior"
              description="Asistencia personalizada después del curso para resolver dudas"
            />
            <FeatureCard 
              icon={Trophy}
              title="Bolsa de Empleo"
              description="Posibilidad de entrar en nuestra red de talleres profesionales"
            />
            <FeatureCard 
              icon={Zap}
              title="Técnicas Avanzadas"
              description="Aprende las técnicas más avanzadas del detailing profesional"
            />
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="cursos" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              Elige tu <span className="gradient-text">Formación</span>
            </h2>
            <p className="text-white/80 text-lg">
              Cursos diseñados para todos los niveles, desde aficionados hasta profesionales
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <CourseCard 
              title="Curso Aficionado"
              price="€997"
              duration="2 Días de Formación"
              features={[
                "Curso básico de detailing",
                "Defectos de pintura",
                "Tipos de pulidora",
                "Cómo usar la pulidora",
                "Pulido básico",
                "Tipos de sellado",
                "Ceras de carnauba",
                "Limpieza interior básica"
              ]}
              ctaText="Inscribirme"
            />
            
            <CourseCard 
              title="Curso Profesional"
              price="€2997"
              duration="4 Días de Formación"
              features={[
                "Todo del curso aficionado",
                "Pulido con rotativa",
                "Pulido roto-orbital",
                "Sistema de fases",
                "Lijado profesional",
                "Detallado de llantas",
                "Tratamiento cerámico",
                "Extracción de asientos",
                "Máquina inyección/extracción"
              ]}
              isPopular={true}
              ctaText="Inscribirme"
            />
            
            <CourseCard 
              title="Carrera Detailing"
              price="€5997"
              duration="5 Días de Formación"
              features={[
                "Todo del curso profesional",
                "Operativa en taller",
                "Marketing y ventas",
                "Atención al cliente", 
                "+40 horas de práctica real",
                "Modelo de negocio",
                "Gestión de taller",
                "Certificación master"
              ]}
              ctaText="Inscribirme"
            />
          </div>
        </div>
      </section>

      {/* Instructor Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                ¿Quién es el <span className="gradient-text">formador?</span>
              </h2>
              <p className="text-white/80 text-lg mb-6">
                ¡Hola! Mi nombre es <strong className="text-white">Daniel</strong>, soy Detailer desde que tengo uso de la razón. 
                He tenido la gran suerte de cumplir mi sueño y sigo haciendo lo mismo que cuando era pequeño.
              </p>
              <p className="text-white/80 text-lg mb-6">
                Ahora, soy el <strong className="text-white">CEO de Detail Park</strong>. He tenido la gran oportunidad 
                de tratar miles de coches en estos últimos 15 años y eso me ha otorgado una gran experiencia.
              </p>
              <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg">
                <p className="text-white/90 italic">
                  "Nuestro objetivo es proporcionar una formación personalizada y con un número reducido de personas. 
                  Nos importa más la calidad, que la cantidad."
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src={danielLopezInstructor} 
                alt="Daniel López - CEO Detail Park" 
                className="rounded-lg shadow-card w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-gradient-primary p-4 rounded-lg">
                <div className="text-white font-bold text-2xl">15+</div>
                <div className="text-white/80 text-sm">Años de experiencia</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              ¿Qué dicen nuestros <span className="gradient-text">alumnos?</span>
            </h2>
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-white/80 text-lg ml-2">+300 reseñas</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard 
              name="Nacho Amirola"
              content="Súper recomendable. Le han hecho un tratamiento cerámico a todo el coche, desmontado y limpieza interior. El coche está literalmente mejor y más bonito que nuevo. Máximo servicio, profesionalidad y amabilidad."
            />
            <TestimonialCard 
              name="Jose Miguel"
              content="Los mejores profesionales del Detailing en Alicante provincia. Desde que los descubrí, pienso llevar todos mis coches para hacer uso de sus servicios. Si buscas calidad: trato espectacular, asesoramiento y cuidar tu coche al máximo, Detail Park es tu sitio."
            />
            <TestimonialCard 
              name="Felipe Durán"
              content="Descubrí este lugar a través de un amigo y debo de agradecérselo. Mi coche volvió a aparentar como era el primer día. Grandes profesionales, muy buenos consejos y recomendaciones de futuro para el mantenimiento."
            />
          </div>
        </div>
      </section>

      {/* Certificate Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src={certificadoDetailing} 
                alt="Certificado curso detailing" 
                className="rounded-lg shadow-card w-full max-w-md mx-auto"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                <span className="gradient-text">Certificación</span> Profesional
              </h2>
              <p className="text-white/80 text-lg mb-6">
                Gracias a nuestra <strong className="text-white">certificación</strong> otorgada por Detail Park, 
                no solo tendrás un diploma que avale tus conocimientos y tu capacitación con nosotros, sino que 
                te servirá para añadir valor a tu currículum o para dar confianza a tus futuros posibles clientes.
              </p>
              <p className="text-white/80 text-lg mb-8">
                Además, <strong className="text-white">entrarás en una bolsa de empleo</strong> donde estamos 
                conectados todos los centros de Detail en España en la que buscan de forma continua profesionales como tú.
              </p>
              <div className="flex items-center gap-4">
                <CheckCircle className="w-6 h-6 text-primary" />
                <span className="text-white">Certificado reconocido en el sector</span>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <CheckCircle className="w-6 h-6 text-primary" />
                <span className="text-white">Acceso a bolsa de empleo nacional</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              Preguntas <span className="gradient-text">frecuentes</span>
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                question: "¿Es necesario contar con experiencia previa?",
                answer: "En absoluto. Estos cursos están dirigidos tanto a gente sin ningún tipo de experiencia como a entusiastas o profesionales que desean aumentar sus conocimientos."
              },
              {
                question: "¿Necesito llevar material del curso?",
                answer: "No, no necesitas llevar nada al curso. Nosotros te proporcionaremos todo el material para aprender a hacer detailing. Tendrás a tu disposición todas las marcas más punteras y las mejores herramientas del sector."
              },
              {
                question: "¿Cuánto tiempo dura el curso?",
                answer: "La duración del curso puede variar en función del tipo de curso. Normalmente se hacen en jornadas de 8 horas, con 1 hora para comer."
              },
              {
                question: "¿Saldré con una buena base de conocimiento?",
                answer: "Tanto si elijes el curso para aficionados como el profesional, saldrás preparado para aplicar todas las técnicas aprendidas durante la formación."
              },
              {
                question: "¿Podré preguntar dudas después del curso?",
                answer: "Por supuesto, dentro del curso tendrás asesoramiento personalizado por un Detailer experto durante la parte posterior. ¡Nos tendrás siempre a tu disposición!"
              },
              {
                question: "¿Hay algún tipo de certificado?",
                answer: "Si, al finalizar el curso, se entregará un certificado de asistencia y con reconocimiento otorgada por Detail Park, dentro del sector del Detailing en España."
              }
            ].map((faq, index) => (
              <Card key={index} className="glass-card border-white/10 hover:border-white/20 transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
                  <p className="text-white/80">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-primary relative">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            ¿Listo para convertirte en un <br/>
            <span className="text-white/90">Detailer Profesional?</span>
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            No dejes pasar esta oportunidad. Los cupos son limitados y la demanda es alta.
          </p>
          <Button variant="glass" size="xl" className="mb-8">
            Inscribirme Ahora
          </Button>
          <div className="flex items-center justify-center gap-2 text-white/80">
            <Clock className="w-5 h-5" />
            <span>Oferta válida por tiempo limitado</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/80 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <img src={detailParkLogo} alt="Detail Park" className="h-8 mb-4" />
              <p className="text-white/60 text-sm">
                Formación profesional en detailing con certificado reconocido en el sector.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Contacto</h4>
              <div className="space-y-2 text-white/60 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+34 622 77 35 55</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>info@detailpark.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Calle Metalurgias, 13, Alicante</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Cursos</h4>
              <div className="space-y-2 text-white/60 text-sm">
                <div>Curso Aficionado</div>
                <div>Curso Profesional</div>
                <div>Carrera Detailing</div>
                <div>Formación Personalizada</div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <div className="space-y-2 text-white/60 text-sm">
                <div>Aviso Legal</div>
                <div>Política de Privacidad</div>
                <div>Condiciones de Venta</div>
                <div>Política de Cookies</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/60 text-sm">
            <p>© 2024 Detail Park S.L. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

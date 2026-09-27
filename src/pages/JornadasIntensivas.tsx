import { Link } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { SEO } from '@/components/SEO';
import { seoConfig } from '@/utils/seoConfig';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Users, Zap, CalendarDays, Clock, HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

// Images
import danielLopezInstructor from '@/assets/daniel-lopez-instructor.webp';
import leandroImg from '@/assets/leandro-curso-detailing.jpg';
import federicaImg from '@/assets/federica-curso-detailing.jpg';
import eventoGrupo from '@/assets/evento-grupo-coche-rojo.jpg';
import eventoAlumnos from '@/assets/evento-alumnos-atentos.jpg';

const hubFaqs = [
  {
    question: '¿Cuál es la diferencia entre Jornada Zero y Up Detail?',
    answer: 'La Jornada Zero es una experiencia de inmersión con el equipo de Detail Park, ideal para tu primer contacto con el detailing. Up Detail es un formato colaborativo donde se reúnen varios expertos reconocidos a nivel nacional e internacional para ofrecer una visión más amplia del sector.'
  },
  {
    question: '¿Tienen el mismo precio?',
    answer: 'Cada formato tiene su propio precio adaptado a la experiencia que ofrece. La Jornada Zero cuesta 97€ + IVA y Up Detail 349€ + IVA. En ambos casos, el importe se descuenta si continúas con un curso completo.'
  },
  {
    question: '¿Cuál me conviene más si soy principiante?',
    answer: 'Ambas son perfectas para principiantes. La Jornada Zero te da una base sólida con el equipo de Detail Park. Up Detail te ofrece la perspectiva de varios profesionales reconocidos.'
  },
  {
    question: '¿El importe se descuenta de un curso completo?',
    answer: 'Sí, en ambos casos. Si decides continuar con cualquier curso completo de la academia, el importe de la jornada se descuenta íntegramente.'
  },
];

export default function JornadasIntensivas() {
  return (
    <MainLayout>
      <SEO {...seoConfig.jornadasHub} />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        
        <div className="relative container mx-auto px-4 text-center">
          <Badge className="bg-primary/10 text-brand border-primary/30 mb-6 text-sm px-4 py-1.5">
            🚀 ¿Nuevo en el Detailing? Empieza aquí
          </Badge>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
            Jornadas Intensivas de{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-glow">
              Detailing Profesional
            </span>
          </h1>
          
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-4">
            Dos formatos diseñados para que descubras el detailing profesional en un solo día, 
            con herramientas reales y los mejores profesionales del sector.
          </p>
          
          <p className="text-sm text-brand font-medium">
            💡 El importe de cualquier jornada se descuenta de tu curso completo
          </p>
        </div>
      </section>

      {/* Cards Section */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            
            {/* Jornada Zero Card */}
            <div className="relative group rounded-2xl border-2 border-primary/30 bg-card overflow-hidden shadow-lg shadow-primary/5 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1">
              {/* Accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary-glow to-primary" />
              
              {/* Image */}
              <div className="relative h-56 md:h-64 overflow-hidden">
                <img 
                  src={eventoGrupo} 
                  alt="Jornada Zero - Equipo Detail Park en acción" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                
                {/* Instructor avatar */}
                <div className="absolute bottom-3 left-4 flex items-center gap-3">
                  <img 
                    src={danielLopezInstructor} 
                    alt="Daniel López" 
                    className="w-12 h-12 rounded-full border-2 border-primary object-cover"
                  />
                  <div>
                    <p className="text-foreground font-semibold text-sm">Daniel López</p>
                    <p className="text-muted-foreground text-xs">Detail Park</p>
                  </div>
                </div>
                
                {/* Price badge */}
                <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1.5 rounded-lg font-bold text-sm shadow-lg">
                  97€ <span className="text-xs font-normal opacity-90">+ IVA</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 md:p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="h-5 w-5 text-brand" />
                  <h2 className="text-xl md:text-2xl font-bold text-foreground">Jornada Zero</h2>
                </div>
                
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  Tu primera inmersión en el detailing con el equipo de Detail Park. Un día intensivo para descubrir si tienes mente de empresario.
                </p>

                {/* Details */}
                <div className="flex flex-wrap gap-3 mb-5">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full">
                    <CalendarDays className="h-3.5 w-3.5 text-brand" />
                    Sábado 17 Enero 2026
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full">
                    <Clock className="h-3.5 w-3.5 text-brand" />
                    10:00 - 18:00
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full">
                    <Users className="h-3.5 w-3.5 text-brand" />
                    Solo 10 plazas
                  </div>
                </div>

                <Button asChild variant="hero" size="lg" className="w-full">
                  <Link to="/jornada-zero-detailing">
                    Ver Jornada Zero
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Up Detail Card */}
            <div className="relative group rounded-2xl border-2 border-border bg-card overflow-hidden shadow-lg hover:shadow-xl hover:border-violet-500/20 transition-all duration-300 hover:-translate-y-1">
              {/* Accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-600 via-purple-500 to-violet-600" />
              
              {/* Image */}
              <div className="relative h-56 md:h-64 overflow-hidden">
                <img 
                  src={eventoAlumnos} 
                  alt="Up Detail - Formación colaborativa con expertos" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                
                {/* Expert avatars */}
                <div className="absolute bottom-3 left-4 flex items-center">
                  <div className="flex -space-x-2">
                    <img src={danielLopezInstructor} alt="Daniel López" className="w-10 h-10 rounded-full border-2 border-card object-cover" />
                    <img src={leandroImg} alt="Leandro" className="w-10 h-10 rounded-full border-2 border-card object-cover" />
                    <img src={federicaImg} alt="Federica" className="w-10 h-10 rounded-full border-2 border-card object-cover" />
                    <div className="w-10 h-10 rounded-full border-2 border-card bg-muted flex items-center justify-center text-xs text-muted-foreground font-semibold">+</div>
                  </div>
                  <span className="ml-3 text-muted-foreground text-xs">Expertos invitados</span>
                </div>
                
                {/* Coming soon badge */}
                <div className="absolute top-3 right-3 bg-violet-600/90 text-white px-3 py-1.5 rounded-lg font-bold text-sm shadow-lg">
                  Próximamente
                </div>
              </div>

              {/* Content */}
              <div className="p-5 md:p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-violet-500" />
                  <h2 className="text-xl md:text-2xl font-bold text-foreground">Up Detail</h2>
                </div>
                
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  Formación colaborativa con los mejores expertos a nivel nacional. Una jornada donde varios profesionales comparten su conocimiento.
                </p>

                {/* Details */}
                <div className="flex flex-wrap gap-3 mb-5">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full">
                    <CalendarDays className="h-3.5 w-3.5 text-violet-500" />
                    Fecha por confirmar
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full">
                    349€ <span className="text-xs">+ IVA</span>
                  </div>
                </div>

                <Button asChild variant="outline" size="lg" className="w-full border-violet-500/30 text-violet-500 hover:bg-violet-500/10 hover:text-violet-400">
                  <Link to="/up-detail-evento">
                    Descubrir Up Detail
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-3">
                <HelpCircle className="h-5 w-5 text-brand" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">Preguntas Frecuentes</h2>
              </div>
              <p className="text-muted-foreground text-sm">
                Todo lo que necesitas saber sobre nuestras jornadas intensivas
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-3">
              {hubFaqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`faq-${index}`}
                  className="bg-card border border-border rounded-xl px-5 data-[state=open]:border-primary/30"
                >
                  <AccordionTrigger className="text-left text-sm md:text-base font-medium text-foreground hover:no-underline py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

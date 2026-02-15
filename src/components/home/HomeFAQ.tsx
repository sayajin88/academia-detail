import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/shared/SectionHeading';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: '¿Los cursos son en Alicante?',
    answer:
      'Sí, se imparten en nuestras instalaciones de Detail Park en Alicante.',
  },
  {
    question: '¿Es formación práctica?',
    answer:
      'Totalmente, formación 100% práctica sobre vehículos reales desde el primer día.',
  },
  {
    question: '¿Incluye diploma?',
    answer:
      'Al finalizar recibirás tu Certificado Profesional de Academia Detail.',
  },
  {
    question: '¿Necesito experiencia previa para apuntarme a una formación?',
    answer:
      'No, nuestras formaciones están diseñadas para todos los niveles. Puedes aprender detailing desde cero. Empezamos desde los conceptos básicos y avanzamos progresivamente hasta las técnicas más avanzadas.',
  },
  {
    question: '¿Qué incluye el curso de pulido de coches?',
    answer:
      'Nuestro curso de pulido de coches cubre todas las técnicas: pulido con rotativa, roto-orbital, corrección de pintura en múltiples pasos, identificación de defectos y selección de pads y compounds. Aprenderás a conseguir acabados de concurso.',
  },
  {
    question: '¿Qué es un curso de tratamiento cerámico?',
    answer:
      'El curso de tratamiento cerámico te enseña a aplicar protecciones cerámicas profesionales: preparación de superficie, técnicas de aplicación, tiempos de curado y mantenimiento. Es uno de los servicios más rentables del sector.',
  },
  {
    question: '¿Es rentable montar un lavadero de coches?',
    answer:
      'Sí, montar un lavadero de coches profesional puede ser muy rentable. La inversión inicial varía entre 15.000€ y 50.000€, y nuestros alumnos facturan entre 3.000€ y 8.000€ mensuales. Te enseñamos cómo montar un negocio de detailing paso a paso.',
  },
  {
    question: '¿Qué incluye el precio de las formaciones?',
    answer:
      'Todas nuestras formaciones incluyen materiales, herramientas durante el curso, certificación oficial, acceso a nuestra comunidad de profesionales y soporte post-formación.',
  },
  {
    question: '¿Estáis asociados a alguna marca de productos?',
    answer:
      'No, somos 100% independientes. No representamos a ninguna marca comercial, lo que nos permite elegir siempre los mejores productos para cada situación sin compromisos. Trabajamos con las marcas líderes del sector (Koch Chemie, Gyeon, 3M, XPEL, Sonax, Meguiar\'s, etc.) pero nuestra formación es completamente neutral y objetiva.',
  },
  {
    question: '¿Puedo financiar la formación?',
    answer:
      'Sí, ofrecemos opciones de financiación flexibles. Contacta con nosotros para conocer las condiciones y encontrar la mejor opción para ti.',
  },
  {
    question: '¿Las formaciones son presenciales u online?',
    answer:
      'Todas nuestras formaciones son 100% presenciales en nuestras instalaciones de Detail Park. Creemos que la práctica real es fundamental para dominar estas técnicas de pulido y tratamiento cerámico.',
  },
  {
    question: '¿Qué diferencia hay entre las formaciones individuales y la Carrera Negocio?',
    answer:
      'Las formaciones individuales te especializan en una técnica concreta (pulido, cerámicos, wrapping). La Carrera Negocio incluye todas las formaciones, prácticas reales en nuestro taller, y formación en gestión empresarial para que puedas montar tu propio lavadero de coches profesional.',
  },
  {
    question: '¿Puedo vivir del detailing? ¿Cuál es el salario medio?',
    answer:
      'Sí, el detailing es una profesión con alta demanda y buenos ingresos. Un profesional independiente puede facturar entre 3.000€ y 8.000€ mensuales dependiendo de su especialización y ubicación. Nuestros alumnos más exitosos superan los 10.000€/mes.',
  },
  {
    question: '¿Cuánto cuesta montar un centro de detailing?',
    answer:
      'La inversión inicial puede variar desde 15.000€ para un setup básico hasta 50.000€+ para un centro completo. Te asesoramos sobre el equipamiento necesario según tu presupuesto y objetivos de negocio.',
  },
  {
    question: '¿Me ayudáis a conseguir clientes tras la formación?',
    answer:
      'Sí, incluimos formación en marketing y captación de clientes. Además, nuestra red de alumni comparte referencias y oportunidades. El 85% de nuestros alumnos consigue sus primeros clientes en el primer mes.',
  },
  {
    question: '¿Qué certificaciones reconoce el sector?',
    answer:
      'Nuestras certificaciones están reconocidas por las principales marcas de productos profesionales (Gyeon, Angelwax, XPEL). Además, te preparamos para obtener certificaciones adicionales de fabricantes específicos.',
  },
  {
    question: '¿Hay opciones de prácticas o empleo tras el curso?',
    answer:
      'Sí, tenemos bolsa de empleo y colaboramos con centros de detailing que buscan profesionales formados. Además, los mejores alumnos tienen la oportunidad de realizar prácticas en Detail Park.',
  },
  {
    question: '¿Cuántos vehículos se trabajan durante la formación?',
    answer:
      'Durante la formación trabajamos con vehículos reales de clientes. En el curso de Detailing, por ejemplo, cada alumno practica en al menos 3-4 vehículos diferentes, incluyendo modelos de alta gama.',
  },
];

// Schema.org FAQ structured data for SEO
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
};

export function HomeFAQ() {
  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>
      
      <section id="faq" className="py-20 md:py-28 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <SectionHeading
              badge="FAQ"
              title="Preguntas Frecuentes sobre Cursos de Detailing"
              subtitle="Todo lo que necesitas saber antes de formarte en pulido, tratamiento cerámico y negocio de detailing"
            />

            <Accordion type="single" collapsible className="mb-10 md:mb-12">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-foreground hover:text-primary py-5 min-h-[56px]">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground px-1 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="text-center">
              <Button asChild variant="outline" size="lg" className="group">
                <Link to="/contacto">
                  ¿Tienes más preguntas? Contáctanos
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

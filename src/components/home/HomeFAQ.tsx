import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
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
    question: '¿Necesito experiencia previa para apuntarme a una formación?',
    answer:
      'No, nuestras formaciones están diseñadas para todos los niveles. Empezamos desde los conceptos básicos y avanzamos progresivamente hasta las técnicas más avanzadas.',
  },
  {
    question: '¿Qué incluye el precio de las formaciones?',
    answer:
      'Todas nuestras formaciones incluyen materiales, herramientas durante el curso, certificación oficial, acceso a nuestra comunidad de profesionales y soporte post-formación.',
  },
  {
    question: '¿Puedo financiar la formación?',
    answer:
      'Sí, ofrecemos opciones de financiación flexibles. Contacta con nosotros para conocer las condiciones y encontrar la mejor opción para ti.',
  },
  {
    question: '¿Las formaciones son presenciales u online?',
    answer:
      'Todas nuestras formaciones son 100% presenciales en nuestras instalaciones de Detail Park. Creemos que la práctica real es fundamental para dominar estas técnicas.',
  },
  {
    question: '¿Qué diferencia hay entre las formaciones individuales y la Carrera Negocio?',
    answer:
      'Las formaciones individuales te especializan en una técnica concreta. La Carrera Negocio incluye todas las formaciones, prácticas reales en nuestro taller, y formación en gestión empresarial para que puedas montar tu propio negocio.',
  },
];

export function HomeFAQ() {
  return (
    <section className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <SectionHeading
            badge="FAQ"
            title="Preguntas Frecuentes"
            subtitle="Resolvemos tus dudas más comunes"
          />

          <Accordion type="single" collapsible className="mb-10">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-foreground hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
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
  );
}

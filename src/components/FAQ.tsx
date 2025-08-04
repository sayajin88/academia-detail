import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "¿Necesito experiencia previa en detailing?",
    answer: "No, nuestro curso está diseñado para todos los niveles. Comenzamos desde lo básico y avanzamos gradualmente hacia técnicas profesionales."
  },
  {
    question: "¿Cuánto tiempo dura el curso?",
    answer: "El curso tiene una duración de 3 semanas con clases teóricas y prácticas. Puedes completarlo a tu propio ritmo según tu disponibilidad."
  },
  {
    question: "¿Incluye práctica con vehículos reales?",
    answer: "Sí, tendrás acceso a nuestro taller equipado donde practicarás todas las técnicas con vehículos reales bajo la supervisión de instructores expertos."
  },
  {
    question: "¿Qué tipo de certificación obtengo?",
    answer: "Al completar el curso, recibirás una certificación oficial de Detail Park, reconocida en la industria del detailing y válida para emprender tu negocio."
  },
  {
    question: "¿Hay garantía de devolución?",
    answer: "Ofrecemos una garantía de satisfacción de 30 días. Si no estás completamente satisfecho con el curso, te devolvemos el 100% de tu inversión."
  },
  {
    question: "¿Puedo empezar mi negocio después del curso?",
    answer: "Absolutamente. Incluimos módulos específicos sobre cómo monetizar tus habilidades, establecer precios, conseguir clientes y hacer crecer tu negocio de detailing."
  },
  {
    question: "¿Qué herramientas y productos necesito?",
    answer: "Proporcionamos una lista completa de herramientas recomendadas. Durante la formación, tendrás acceso a todo el equipamiento profesional en nuestro taller."
  },
  {
    question: "¿Hay soporte después del curso?",
    answer: "Sí, incluimos acceso a nuestra comunidad privada y soporte continuo de instructores para resolver dudas y compartir experiencias con otros alumnos."
  },
  {
    question: "¿El precio incluye todo?",
    answer: "El precio de €178 incluye todo: material teórico, clases prácticas, acceso al taller, certificación, y soporte post-curso. No hay costos adicionales."
  },
  {
    question: "¿Cuándo puedo empezar?",
    answer: "Puedes empezar inmediatamente después de la inscripción. Las clases prácticas se programan según disponibilidad, generalmente dentro de los primeros 7 días."
  }
];

export function FAQ() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block glass-card px-8 py-3 rounded-full mb-8">
            <span className="gradient-text font-bold uppercase tracking-wide">Preguntas Frecuentes</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
            Resolvemos todas tus <span className="gradient-text">dudas</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Las respuestas a las preguntas más comunes sobre nuestro curso de detailing profesional
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="glass-card border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white">
                <HelpCircle className="w-6 h-6 text-primary" />
                Preguntas y Respuestas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-b border-white/10">
                    <AccordionTrigger className="text-white hover:text-primary text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-white/80 pt-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
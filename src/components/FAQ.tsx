import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

export const faqs = [
  {
    question: "¿Necesito experiencia previa?",
    answer: "No, La Jornada Cero está diseñada para personas sin experiencia que quieren conocer el mundo del detailing profesional de forma práctica e intensiva."
  },
  {
    question: "¿Qué está incluido en los €199 + IVA?",
    answer: "Jornada completa de práctica intensiva (9:00-18:00h), todos los materiales y productos profesionales, comida, certificado de asistencia y acceso a nuestra comunidad exclusiva de detailers."
  },
  {
    question: "¿Qué debo llevar al evento?",
    answer: "Solo ropa cómoda que pueda mancharse. Nosotros proporcionamos todo el material y equipo profesional necesario para la jornada."
  },
  {
    question: "¿Saldré preparado para trabajar como detailer profesional?",
    answer: "La Jornada Cero es un evento introductorio que te da las bases fundamentales del detailing. Para nivel profesional completo, te ofreceremos opciones de workshops avanzados posteriores."
  },
  {
    question: "¿Por qué solo 12 plazas?",
    answer: "Limitamos las plazas a 12 participantes máximo para garantizar atención personalizada, práctica hands-on para todos y un ambiente de aprendizaje óptimo."
  },
  {
    question: "¿Puedo conseguir reembolso si no puedo asistir?",
    answer: "Sí, ofrecemos reembolso 100% hasta 7 días antes del evento. Después de esa fecha, podrás transferir tu plaza a otro evento futuro sin coste adicional."
  },
  {
    question: "¿Dónde se realiza el evento?",
    answer: "En nuestras instalaciones profesionales Detail Park. Te enviaremos la ubicación exacta y todas las indicaciones al confirmar tu inscripción."
  },
  {
    question: "¿Recibiré algún certificado?",
    answer: "Sí, al finalizar el evento recibirás un certificado de asistencia que acredita las 8 horas de práctica intensiva en detailing profesional y pulido básico."
  },
  {
    question: "¿Qué aprenderé exactamente en 1 día?",
    answer: "Por la mañana: lavado profesional completo, descontaminación y limpieza de interiores. Por la tarde: introducción al pulido, uso de máquinas pulidoras y corrección básica de pintura. Todo con práctica real en vehículos."
  },
  {
    question: "¿Habrá más eventos La Jornada Cero en el futuro?",
    answer: "Sí, organizamos eventos periódicamente. Los asistentes de La Jornada Cero tienen prioridad en reservas de futuros eventos y descuentos especiales en workshops avanzados."
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
            Las respuestas a las preguntas más comunes sobre nuestro evento de detailing profesional
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="glass-card border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white">
                <HelpCircle className="w-6 h-6 text-brand" />
                Preguntas y Respuestas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-b border-white/10">
                    <AccordionTrigger className="text-white hover:text-brand text-left">
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
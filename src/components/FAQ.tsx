import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "¿Necesito experiencia previa en detailing automotriz?",
    answer: "No es necesario. Nuestro programa está diseñado para llevarte desde cero hasta nivel profesional en 3 semanas. El 85% de nuestros estudiantes empezaron sin experiencia previa y ahora tienen sus propios negocios."
  },
  {
    question: "¿Realmente podré conseguir trabajo después del curso?",
    answer: "Absolutamente. El 92% de nuestros graduados consiguen empleo o lanzan su negocio en los primeros 30 días. Incluimos garantía de empleo y acceso a nuestra bolsa de trabajo exclusiva con +200 talleres asociados."
  },
  {
    question: "¿Cuánto dinero puedo ganar como detailer profesional?",
    answer: "Los detailers certificados ganan entre €1,500-€4,000/mes trabajando por cuenta ajena, y €3,000-€8,000/mes con negocio propio. Nuestros top graduados facturan más de €120,000 anuales."
  },
  {
    question: "¿Qué herramientas y equipos necesito comprar?",
    answer: "Durante el curso utilizas nuestro equipamiento profesional. Al graduarte, te proporcionamos una lista de herramientas esenciales (inversión inicial de €800-1,200) y acceso a descuentos especiales con proveedores."
  },
  {
    question: "¿El curso incluye práctica real o solo teoría?",
    answer: "70% práctica, 30% teoría. Trabajarás con vehículos reales desde el primer día en nuestro taller profesional de 500m². Cada estudiante completa mínimo 15 servicios completos durante la formación."
  },
  {
    question: "¿La certificación está reconocida oficialmente?",
    answer: "Sí, nuestra certificación está avalada por la Asociación Española de Detailing Profesional y es reconocida por talleres premium, concesionarios y empresas de alta gama en toda España."
  },
  {
    question: "¿Hay garantía si no quedo satisfecho?",
    answer: "Garantía total de 30 días. Si no estás 100% satisfecho o no ves resultados tangibles en tu aprendizaje, te devolvemos íntegra tu inversión sin preguntas."
  },
  {
    question: "¿Puedo financiar el curso?",
    answer: "Sí, ofrecemos financiación hasta 12 meses sin intereses. También aceptamos el pago fraccionado en 3 cuotas. La inversión se recupera típicamente en el primer mes de trabajo."
  },
  {
    question: "¿Cuántas horas semanales requiere el curso?",
    answer: "Modalidad intensiva: 20 horas/semana (3 semanas). Modalidad flexible: 10 horas/semana (6 semanas). Horarios adaptables a tu disponibilidad, incluyendo fines de semana."
  },
  {
    question: "¿Qué apoyo recibo después de graduarme?",
    answer: "Soporte permanente: acceso de por vida a nuestra comunidad exclusiva, actualizaciones de técnicas, descuentos en productos, y mentoría personalizada durante tus primeros 6 meses profesionales."
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
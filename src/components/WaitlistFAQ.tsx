import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CalendarClock, BellRing } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * FAQs about the current lack of confirmed dates and how the waiting list works.
 * Shared between Jornada Zero and Up Detail landing pages.
 */
export const waitlistFaqs = [
  {
    question: "¿Por qué no hay fecha disponible ahora mismo?",
    answer:
      "Las plazas están cerradas temporalmente. Solo abrimos convocatoria cuando podemos garantizar taller, formadores y grupos reducidos. En cuanto cerramos la nueva fecha, la publicamos en esta misma página.",
  },
  {
    question: "¿Cuándo abriréis las próximas plazas?",
    answer:
      "Próximamente. No damos una fecha estimada hasta tenerla confirmada al 100%, precisamente para no dar información inexacta. Apuntarte a la lista de avisos es la forma más rápida de enterarte.",
  },
  {
    question: "¿Cómo funciona la lista de avisos?",
    answer:
      "Dejas tu nombre, email y teléfono en el formulario. Cuando confirmamos fecha, avisamos primero por email (y por WhatsApp si nos has dejado teléfono) antes de publicarla en redes o en la web.",
  },
  {
    question: "¿Apuntarme a la lista me compromete a pagar algo?",
    answer:
      "No. La lista de avisos es gratuita y sin compromiso. No se cobra nada ni se reserva plaza hasta que tú confirmes la inscripción cuando abramos la convocatoria.",
  },
  {
    question: "¿Tengo prioridad si estoy en la lista?",
    answer:
      "Sí. Las personas de la lista reciben el aviso con antelación y pueden reservar antes de la apertura pública. Al ser grupos muy reducidos, esa antelación suele ser decisiva.",
  },
  {
    question: "¿Puedo darme de baja de los avisos?",
    answer:
      "Cuando quieras. Cada email incluye un enlace de baja y puedes escribirnos para eliminar tus datos conforme al RGPD.",
  },
];

interface WaitlistFAQProps {
  /** Optional handler for the CTA button (e.g. scroll to the waiting list form). */
  onCtaClick?: () => void;
  ctaLabel?: string;
}

export function WaitlistFAQ({ onCtaClick, ctaLabel = "Avísame cuando abran plazas" }: WaitlistFAQProps) {
  return (
    <section className="py-16 md:py-24" aria-labelledby="faq-plazas-heading">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <div className="inline-flex items-center gap-2 glass-card px-6 py-2.5 rounded-full mb-6">
              <CalendarClock className="w-4 h-4 text-brand" aria-hidden="true" />
              <span className="gradient-text font-bold uppercase tracking-wide text-sm">
                Fechas y lista de avisos
              </span>
            </div>
            <h2
              id="faq-plazas-heading"
              className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight"
            >
              Plazas cerradas: <span className="gradient-text">todo lo que debes saber</span>
            </h2>
            <p className="text-base md:text-lg text-white/70">
              Ahora mismo no hay convocatoria abierta. Estas son las dudas más habituales sobre la
              próxima apertura y cómo te avisamos.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {waitlistFaqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`waitlist-faq-${index}`}
                className="glass-card border border-white/10 rounded-xl px-5"
              >
                <AccordionTrigger className="text-left text-white font-semibold hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-white/70 leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {onCtaClick && (
            <div className="mt-10 text-center">
              <Button size="lg" className="font-bold" onClick={onCtaClick}>
                <BellRing className="w-4 h-4 mr-2" aria-hidden="true" />
                {ctaLabel}
              </Button>
              <p className="text-white/50 text-sm mt-3">Gratis y sin compromiso.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default WaitlistFAQ;

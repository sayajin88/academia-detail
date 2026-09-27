import { Helmet } from 'react-helmet-async';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqListProps {
  items: FaqItem[];
  /** Añade el marcado FAQPage (solo una vez por página). */
  withSchema?: boolean;
}

/** Preguntas frecuentes en acordeón, legibles (Open Sans 600, 16-17 px). */
export function FaqList({ items, withSchema = false }: FaqListProps) {
  return (
    <>
      {withSchema && (
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: items.map((f) => ({
                '@type': 'Question',
                name: f.question,
                acceptedAnswer: { '@type': 'Answer', text: f.answer },
              })),
            })}
          </script>
        </Helmet>
      )}
      <Accordion type="single" collapsible className="ds-card ds-reveal mx-auto max-w-3xl divide-y divide-white/[0.06]">
        {items.map((f, i) => (
          <AccordionItem key={f.question} value={`faq-${i}`} className="border-0 px-5 md:px-6">
            <AccordionTrigger className="gap-4 py-5 text-left text-base md:text-[1.0625rem] font-semibold text-foreground hover:no-underline hover:text-brand">
              {f.question}
            </AccordionTrigger>
            <AccordionContent className="pb-5 text-[0.9375rem] md:text-base leading-relaxed text-muted-foreground">
              {f.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}

import { FormationDetail } from '@/data/formationDetails';
import { SectionHeading } from '@/components/shared/SectionHeading';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FormationFAQProps {
  formation: FormationDetail;
}

export function FormationFAQ({ formation }: FormationFAQProps) {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <SectionHeading
          badge="FAQ"
          title="Preguntas Frecuentes"
          subtitle={`Dudas comunes sobre la formación de ${formation.title.replace('Formación en ', '')}`}
        />

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible>
            {formation.faqs.map((faq, index) => (
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
        </div>
      </div>
    </section>
  );
}

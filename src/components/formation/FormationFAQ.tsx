import { FormationDetail } from '@/data/formationDetails';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
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
        <AnimatedSection>
          <SectionHeading
            badge="FAQ"
            title="Preguntas Frecuentes"
            subtitle={`Dudas comunes sobre la formación de ${formation.title.replace('Formación en ', '')}`}
          />
        </AnimatedSection>

        <AnimatedSection delay={150}>
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
        </AnimatedSection>
      </div>
    </section>
  );
}

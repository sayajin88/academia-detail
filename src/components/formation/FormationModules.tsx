import { FormationDetail } from '@/data/formationDetails';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FormationModulesProps {
  formation: FormationDetail;
}

export function FormationModules({ formation }: FormationModulesProps) {
  // Dynamic title based on formation type
  const isDetailing = formation.slug === 'curso-detailing-profesional';
  const sectionTitle = isDetailing 
    ? "Programa de Formación en Corrección de Pintura" 
    : "Programa Completo de Formación";

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <SectionHeading
            badge="Temario"
            title={sectionTitle}
            subtitle="Todo lo que cubriremos durante la formación profesional"
          />
        </AnimatedSection>

        <AnimatedSection delay={150}>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible defaultValue="item-0">
              {formation.modules.map((module, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-4">
                      <span className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center">
                        {index + 1}
                      </span>
                      <span className="text-lg font-semibold text-foreground">
                        {module.title}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="ml-14 space-y-2">
                      {module.topics.map((topic, topicIndex) => (
                        <li
                          key={topicIndex}
                          className="flex items-center gap-2 text-muted-foreground"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                          {topic}
                        </li>
                      ))}
                    </ul>
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

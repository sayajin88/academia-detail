import type { GlossaryTerm, GlossaryCategory } from '@/data/glossaryData';
import { categoryLabels } from '@/data/glossaryData';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface GlossaryTermFAQProps {
  term: GlossaryTerm;
}

const categoryActionVerbs: Record<GlossaryCategory, string> = {
  exterior: 'se trata o corrige',
  interior: 'se aplica o limpia',
  protecciones: 'se aplica o instala',
  herramientas: 'se utiliza correctamente',
  quimicos: 'se aplica o diluye',
  tecnicas: 'se ejecuta paso a paso',
};

const categoryTools: Record<GlossaryCategory, string> = {
  exterior: 'pulidora DA o rotativa, pads de corte y acabado, compound, polish y toallas de microfibra de alto GSM',
  interior: 'cepillos de cerdas suaves, limpiadores de pH neutro, extractor de tapicerías y tornador neumático',
  protecciones: 'aplicadores de suede, guantes de nitrilo, luces LED de inspección, toallas de levantado y cabina controlada',
  herramientas: 'backing plates compatibles, pads de diferentes durezas, lubricante de arcilla y toallas de secado twist loop',
  quimicos: 'pulverizadores con graduación, cubos con grit guard, guantes de protección y medidores de pH',
  tecnicas: 'pulidora orbital o rotativa, medidor de espesor de pintura, luces de inspección y panel de test',
};

export function generateFAQs(term: GlossaryTerm) {
  const cat = categoryLabels[term.category].toLowerCase();
  const action = categoryActionVerbs[term.category];
  const tools = categoryTools[term.category];

  return [
    {
      question: `¿Qué es ${term.term} en detailing profesional?`,
      answer: `${term.term} es un concepto de la categoría "${cat}" en el detailing profesional. ${term.definition}`,
    },
    {
      question: `¿Cómo ${action} ${term.term}?`,
      answer: `Para trabajar correctamente con ${term.term}, es fundamental conocer las técnicas adecuadas de la categoría "${cat}". ${term.definition} Un profesional formado sabrá aplicar este conocimiento de forma segura y eficiente.`,
    },
    {
      question: `¿Qué herramientas se necesitan para ${term.term}?`,
      answer: `Las herramientas habituales para trabajar con conceptos de "${cat}" incluyen: ${tools}. Dominar su uso correcto es clave para obtener resultados profesionales.`,
    },
  ];
}

export function GlossaryTermFAQ({ term }: GlossaryTermFAQProps) {
  const faqs = generateFAQs(term);

  return (
    <section className="py-12 bg-card">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
          Preguntas Frecuentes sobre {term.term}
        </h2>
        <div className="max-w-3xl">
          <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger className="text-left text-foreground hover:text-brand">
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

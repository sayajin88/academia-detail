import { Section, SectionHeader } from '@/components/ds/Section';
import { FaqList } from '@/components/ds/FaqList';
import { jornadasHubFaqs } from '@/data/jornadas';

/** Preguntas de la página que compara las dos jornadas. El marcado FAQPage lo genera seoConfig.jornadasHub. */
export function JornadasFaq() {
  return (
    <Section tone="card" aria-labelledby="faq-title">
      <SectionHeader id="faq-title" eyebrow="Preguntas frecuentes" title="¿Cuál elijo?" />
      <FaqList items={jornadasHubFaqs} />
    </Section>
  );
}

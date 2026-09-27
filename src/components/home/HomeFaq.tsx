import { Section, SectionHeader } from '@/components/ds/Section';
import { FaqList } from '@/components/ds/FaqList';
import { homeFaqs } from '@/data/homeContent';

export function HomeFaq() {
  return (
    <Section id="faq" aria-labelledby="faq-title">
      <SectionHeader id="faq-title" eyebrow="Preguntas frecuentes" title="Antes de apuntarte" />
      {/* El marcado FAQPage de la portada lo genera generateHomeSEO */}
      <FaqList items={homeFaqs} />
    </Section>
  );
}

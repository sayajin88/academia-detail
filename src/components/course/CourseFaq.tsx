import { SectionHeader } from '@/components/ds/Section';
import { FaqList, type FaqItem } from '@/components/ds/FaqList';

/** Preguntas del curso. El marcado FAQPage lo genera getFormationSEO. */
export function CourseFaq({ faqs, title = 'Preguntas sobre el curso' }: { faqs: FaqItem[]; title?: string }) {
  if (!faqs.length) return null;
  return (
    <section className="ds-section bg-background" aria-labelledby="faq-title">
      <div className="ds-container">
        <SectionHeader id="faq-title" eyebrow="Preguntas frecuentes" title={title} />
        <FaqList items={faqs} />
      </div>
    </section>
  );
}


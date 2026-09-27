import { Check } from 'lucide-react';
import { Section, SectionHeader } from '@/components/ds/Section';
import type { FormationDetail } from '@/data/formationDetails';

/** Qué aprenderás + para quién es */
export function CourseLearn({ formation }: { formation: FormationDetail }) {
  return (
    <Section aria-labelledby="aprenderas-title">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
        <div>
          <SectionHeader id="aprenderas-title" align="left" eyebrow="El curso" title="Qué aprenderás" className="mb-8" />
          <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {formation.whatYouLearn.map((item) => (
              <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed text-foreground/90 md:text-base">
                <Check className="mt-1 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <aside className="ds-card h-fit p-6 md:p-8" aria-labelledby="paraquien-title">
          <h3 id="paraquien-title" className="text-lg font-bold text-foreground">Para quién es</h3>
          <ul className="mt-4 flex flex-col gap-3">
            {formation.forWho.map((item) => (
              <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </Section>
  );
}

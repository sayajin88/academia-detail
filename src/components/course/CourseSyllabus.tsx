import { Section, SectionHeader } from '@/components/ds/Section';
import type { FormationDetail } from '@/data/formationDetails';

/** Temario por módulos (una sola vez en la página) */
export function CourseSyllabus({ formation }: { formation: FormationDetail }) {
  return (
    <Section tone="card" aria-labelledby="temario-title">
      <SectionHeader
        id="temario-title"
        eyebrow="Temario"
        title="Módulo a módulo"
        lead={`${formation.modules.length} módulos en ${formation.durationShort}, siempre con la teoría justa y el resto sobre el coche.`}
      />
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {formation.modules.map((m, i) => (
          <li key={m.title} className="rounded-xl border border-border bg-background p-5 md:p-6">
            <span className="font-heading text-3xl leading-none text-brand">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="mt-3 text-lg font-bold text-foreground">{m.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:hidden">{m.topics.join(' · ')}</p>
            <ul className="mt-3 hidden flex-col gap-1.5 sm:flex">
              {m.topics.map((t) => (
                <li key={t} className="text-sm leading-relaxed text-muted-foreground">
                  {t}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  );
}

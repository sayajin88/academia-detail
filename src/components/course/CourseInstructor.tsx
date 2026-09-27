import { Section } from '@/components/ds/Section';
import { Img } from '@/components/ds/Img';
import { SITE, STATS } from '@/data/site';
import type { FormationInstructor } from '@/data/formationDetails';
import danielImg from '@/assets/daniel-lopez-team.jpg?w=320;480&format=webp&as=picture';

/** Formador del curso (compacto) */
export function CourseInstructor({ instructor }: { instructor: FormationInstructor }) {
  return (
    <Section tone="card" size="sm" aria-labelledby="formador-title">
      <div className="mx-auto grid max-w-4xl items-center gap-8 sm:grid-cols-[200px_1fr] md:gap-10">
        <div className="mx-auto w-40 overflow-hidden rounded-xl sm:w-full">
          <Img picture={danielImg} alt={`${instructor.name}, formador de Academia Detail`} sizes="200px" className="aspect-[4/5] object-top" />
        </div>
        <div className="flex flex-col gap-3 text-center sm:text-left">
          <p className="ds-eyebrow">Tu formador</p>
          <h2 id="formador-title" className="font-heading text-3xl uppercase text-foreground md:text-4xl">{instructor.name}</h2>
          <p className="text-sm font-semibold text-foreground/85">
            {instructor.role} · más de {SITE.founderYears} años de experiencia · {STATS.alumnos} alumnos formados
          </p>
          <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">{instructor.description}</p>
          <blockquote className="text-[0.9375rem] italic text-foreground/85">“{instructor.quote}”</blockquote>
        </div>
      </div>
    </Section>
  );
}

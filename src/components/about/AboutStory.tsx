import { Wrench, Briefcase, Users } from 'lucide-react';
import { Section, SectionHeader } from '@/components/ds/Section';
import { SITE, STATS } from '@/data/site';

const principles = [
  {
    icon: Wrench,
    title: 'Vivimos del taller',
    text: 'Nuestro trabajo principal es Detail Park. Los cursos nacen de lo que hacemos cada día con coches de clientes, no de un temario de aula.',
  },
  {
    icon: Briefcase,
    title: 'Técnica y negocio',
    text: 'Además de pulir, enseñamos a presupuestar, a hablar con el cliente y a organizar el trabajo para que el servicio sea rentable.',
  },
  {
    icon: Users,
    title: `Máximo ${STATS.maxAlumnosGrupo} alumnos por grupo`,
    text: 'El formador está encima de tu técnica y te corrige mientras trabajas. Preferimos la calidad a la cantidad.',
  },
];

export function AboutStory() {
  return (
    <Section tone="card" aria-labelledby="historia-title">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeader
            id="historia-title"
            align="left"
            eyebrow="Nuestra historia"
            title="Nacimos en el taller, no en un aula"
            className="mb-6 md:mb-8"
          />
          <div className="flex max-w-prose flex-col gap-4 text-[0.9375rem] leading-relaxed text-muted-foreground md:text-base">
            <p>
              {SITE.founder} fundó Detail Park en Alicante en 2017. Hoy es un centro de detailing, vinilado y PPF que
              trabaja cada día con coches de clientes, desde utilitarios hasta deportivos: {STATS.proyectos} proyectos desde 2017.
            </p>
            <p>
              Academia Detail nació para enseñar el oficio tal y como se hace en un centro que vive de ello: con vehículos
              reales, sin simulaciones y hablando también de precios y de clientes. Ya han pasado por la academia{' '}
              <strong className="text-foreground">{STATS.alumnos} alumnos</strong>.
            </p>
          </div>
          <blockquote className="mt-8 max-w-prose border-l-2 border-primary pl-4">
            <p className="text-base italic leading-relaxed text-foreground/85">
              “Hemos visto cerrar decenas de centros por falta de gestión empresarial, no por falta de habilidad técnica.
              Por eso nació Academia Detail: para transmitir no solo el oficio, sino el modelo de negocio.”
            </p>
            <footer className="mt-3 text-sm text-muted-foreground">
              <strong className="font-semibold text-foreground">{SITE.founder}</strong> · {SITE.founderRole}
            </footer>
          </blockquote>
        </div>

        <ul className="flex flex-col gap-4 self-center">
          {principles.map((p) => (
            <li key={p.title} className="ds-card flex gap-4 bg-background p-5 md:p-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-brand">
                <p.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-foreground">{p.title}</h3>
                <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted-foreground">{p.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

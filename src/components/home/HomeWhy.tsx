import { Car, Users, Scale, MessageCircle } from 'lucide-react';
import { Section, SectionHeader } from '@/components/ds/Section';
import { Img } from '@/components/ds/Img';
import { STATS } from '@/data/site';
import alumnaImg from '@/assets/alumna-pulido-concentrada.jpg?w=360;540;720&format=webp&as=picture';
import practicaImg from '@/assets/practicas-alumnos-detailing-2.jpg?w=360;540;720&format=webp&as=picture';

const reasons = [
  {
    icon: Car,
    title: 'Un taller en activo, no un aula',
    text: 'Aprendes en Detail Park, un centro de detailing que trabaja cada día con coches de clientes. Pulidoras, productos y vehículos reales desde el primer minuto.',
  },
  {
    icon: Users,
    title: `Máximo ${STATS.maxAlumnosGrupo} alumnos por grupo`,
    text: 'El formador está encima de tu técnica y te corrige mientras trabajas. Nos importa más la calidad que la cantidad.',
  },
  {
    icon: Scale,
    title: 'Independientes de las marcas',
    text: 'No representamos a ninguna marca. Trabajamos con las líderes del sector para que aprendas a elegir el producto adecuado en cada caso.',
  },
  {
    icon: MessageCircle,
    title: 'Te acompañamos después',
    text: 'Certificado de Detail Park, dudas resueltas cuando empiezas a trabajar y acceso a la bolsa de empleo del sector.',
  },
];

export function HomeWhy() {
  return (
    <Section tone="card" aria-labelledby="porque-title">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="grid grid-cols-2 gap-4">
          <div className="overflow-hidden rounded-xl">
            <Img picture={alumnaImg} alt="Alumna concentrada puliendo con una pulidora DeWalt" sizes="(min-width: 1024px) 25vw, 50vw" className="aspect-[3/4]" />
          </div>
          <div className="mt-10 overflow-hidden rounded-xl">
            <Img picture={practicaImg} alt="Alumnos practicando pulido en grupo sobre un coche" sizes="(min-width: 1024px) 25vw, 50vw" className="aspect-[3/4]" />
          </div>
        </div>
        <div>
          <SectionHeader
            id="porque-title"
            align="left"
            eyebrow="Por qué Academia Detail"
            title="Aprendes haciendo, con alguien al lado"
            className="mb-8 md:mb-10"
          />
          <ul className="flex flex-col gap-7">
            {reasons.map((r) => (
              <li key={r.title} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-brand">
                  <r.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-foreground">{r.title}</h3>
                  <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted-foreground">{r.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

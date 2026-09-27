import { Car, Users, Scale, MessageCircle } from 'lucide-react';
import { Section, SectionHeader } from '@/components/ds/Section';
import { Img } from '@/components/ds/Img';
import { STATS } from '@/data/site';
import alumnaImg from '@/assets/alumna-pulido-concentrada.jpg?w=480;720;960&format=webp&as=picture';
import practicaImg from '@/assets/practicas-alumnos-detailing-2.jpg?w=360;540;720&format=webp&as=picture';
import materialImg from '@/assets/material-curso-detailing.jpg?w=480;720;960&format=webp&as=picture';

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
    <Section tone="card" decor="grid" aria-labelledby="porque-title">
      <SectionHeader
        id="porque-title"
        eyebrow="Por qué Academia Detail"
        title="Aprendes haciendo,"
        accent="con alguien al lado"
        lead="Formación de taller: la teoría justa y el resto con la máquina en la mano, sobre coches de verdad."
      />

      {/* Mosaico: fotos grandes y los cuatro motivos */}
      <div className="grid gap-4 md:grid-cols-4 md:grid-rows-[repeat(2,minmax(0,1fr))]">
        <div className="ds-reveal relative overflow-hidden rounded-2xl border border-white/10 md:col-span-2 md:row-span-2">
          <Img picture={alumnaImg} alt="Alumna concentrada puliendo con una pulidora DeWalt" sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[4/3] h-full md:aspect-auto" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" aria-hidden="true" />
          <div className="absolute inset-x-0 bottom-0 p-6">
            <p className="font-heading text-5xl leading-none text-white">90 %</p>
            <p className="mt-1 text-sm text-white/80">del curso es práctica sobre vehículos reales</p>
          </div>
        </div>
        {reasons.map((r) => (
          <div
            key={r.title}
            className="ds-card ds-card-hover ds-reveal flex flex-col gap-3 p-6"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-gradient-to-br from-primary/40 to-primary/5 text-white shadow-[0_8px_24px_-10px_hsl(var(--primary))]">
              <r.icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-foreground">{r.title}</h3>
              <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted-foreground">{r.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="ds-reveal overflow-hidden rounded-2xl border border-white/10">
          <Img picture={practicaImg} alt="Alumnos practicando pulido en grupo sobre un coche" sizes="50vw" className="aspect-[16/9] transition-transform duration-700 hover:scale-105" />
        </div>
        <div className="ds-reveal overflow-hidden rounded-2xl border border-white/10">
          <Img picture={materialImg} alt="Pulidoras y material profesional preparados para la formación" sizes="50vw" className="aspect-[16/9] transition-transform duration-700 hover:scale-105" />
        </div>
      </div>
    </Section>
  );
}

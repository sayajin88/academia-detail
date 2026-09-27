import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, Check, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Section, SectionHeader } from '@/components/ds/Section';
import { Img } from '@/components/ds/Img';
import { WhatsAppIcon } from '@/components/ds/WhatsAppIcon';
import { NEXT_EDITION, whatsappLink } from '@/data/site';
import { JORNADA_ZERO } from '@/data/jornadas';
import { formatPrice } from '@/lib/format';
import pulidoraImg from '@/assets/evento-practica-pulidora-real.jpg?w=480;720;960&format=webp&as=picture';
import interiorImg from '@/assets/evento-limpieza-interior.jpg?w=480;720;960&format=webp&as=picture';
import grupoImg from '@/assets/evento-alumnos-atentos.jpg?w=480;800;1100&format=webp&as=picture';

const schedule = [
  { time: '10:00', title: 'Bienvenida', text: 'Conoces al equipo y al resto del grupo, y te contamos qué vas a hacer durante el día.' },
  { time: '10:30', title: 'Productos', text: 'Teoría básica: qué productos se usan en un taller profesional, para qué sirve cada uno y cómo se aplica.' },
  { time: '11:30', title: 'Práctica en un vehículo real', text: 'Lavado, descontaminación y limpieza interior con el método y las herramientas del taller.' },
  { time: '14:00', title: 'Comida', text: 'Incluida, con el equipo de Detail Park.' },
  { time: '15:00', title: 'Introducción al pulido', text: 'Primeros pasos con la pulidora y cómo se corrige la pintura.' },
  { time: '16:30', title: 'Preguntas', text: 'Tus dudas sobre el oficio, el material que conviene comprar primero y cómo seguir formándote.' },
  { time: '17:30', title: 'Cierre', text: 'Entrega del certificado de asistencia.' },
];

/** Horario del día (orientativo) con fotos del taller */
export function JornadaZeroDay() {
  return (
    <Section tone="card" aria-labelledby="dia-title">
      <SectionHeader
        id="dia-title"
        eyebrow="El día"
        title="Así es la Jornada Zero"
        lead={`Un día completo, ${JORNADA_ZERO.schedule}, en el taller de Detail Park: la teoría justa y el resto sobre el coche.`}
      />
      <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14">
        <div>
          <ol className="flex flex-col">
            {schedule.map((s) => (
              <li key={s.time} className="grid grid-cols-[4.5rem_1fr] gap-4 border-b border-border py-4 first:pt-0 last:border-0 md:grid-cols-[5.5rem_1fr]">
                <span className="font-heading text-2xl leading-none text-brand md:text-3xl">{s.time}</span>
                <div>
                  <h3 className="font-bold text-foreground">{s.title}</h3>
                  <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted-foreground">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-sm text-muted-foreground">Horario orientativo: puede variar un poco según el grupo.</p>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-1 lg:content-start">
          <Img picture={pulidoraImg} alt="Alumno practicando con una pulidora mientras el formador le corrige" sizes="(min-width: 1024px) 40vw, 50vw" className="aspect-[4/3] rounded-xl" />
          <Img picture={interiorImg} alt="Alumna limpiando el interior de un coche rojo con cepillo y guantes" sizes="(min-width: 1024px) 40vw, 50vw" className="aspect-[4/3] rounded-xl" />
        </div>
      </div>
    </Section>
  );
}

const includes = [
  'Una jornada completa en el taller de Detail Park',
  'Práctica sobre un vehículo real',
  'Todo el material, las máquinas y los productos',
  'Comida con el equipo',
  'Certificado de asistencia',
  'Si después haces un curso completo, el importe se descuenta',
];

/** Qué incluye + precio (un solo precio real, sin tachados ni cuentas atrás) */
export function JornadaZeroPricing() {
  return (
    <Section id="precio" aria-labelledby="precio-title">
      <SectionHeader id="precio-title" eyebrow="Precio" title="Qué incluye tu plaza" />
      <div className="grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
        <div className="flex flex-col gap-8">
          <ul className="grid gap-4 sm:grid-cols-2">
            {includes.map((item) => (
              <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed text-foreground/90">
                <Check className="mt-1 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <figure className="overflow-hidden rounded-xl border border-border">
            <Img picture={grupoImg} alt="Grupo de alumnos atentos a una explicación en Detail Park" sizes="(min-width: 1024px) 55vw, 100vw" className="aspect-[16/9]" />
            <figcaption className="bg-card px-4 py-3 text-sm text-muted-foreground">Formación en el taller de Detail Park, en Alicante.</figcaption>
          </figure>
        </div>

        <div className="ds-card h-fit p-6 md:p-8 lg:sticky lg:top-24">
          <p className="text-sm font-semibold text-foreground">Jornada Zero</p>
          <p className="mt-3 text-sm text-muted-foreground">
            <span className="font-heading text-5xl leading-none text-foreground">{formatPrice(JORNADA_ZERO.price)}</span> + IVA
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {JORNADA_ZERO.duration}, {JORNADA_ZERO.schedule}.
          </p>
          <p className="mt-5 flex items-start gap-2 rounded-lg bg-primary/15 px-3 py-2.5 text-sm text-foreground">
            <Tag className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
            Se descuenta si después haces un curso completo de la academia.
          </p>
          <p className="mt-3 flex items-center gap-2 rounded-lg bg-background px-3 py-2.5 text-sm text-foreground">
            <CalendarDays className="h-4 w-4 text-brand" aria-hidden="true" />
            Próxima edición: <strong className="font-semibold">{NEXT_EDITION.toLowerCase()}</strong>
          </p>
          <Button asChild size="lg" className="mt-5 h-12 w-full text-base font-semibold">
            <Link to={JORNADA_ZERO.contactHref}>
              Reservar plaza o pedir fechas
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="mt-3 h-12 w-full text-base font-semibold">
            <a href={whatsappLink('Hola, quiero información sobre la Jornada Zero.')} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="h-4 w-4" />
              Preguntar por WhatsApp
            </a>
          </Button>
          <p className="mt-3 text-center text-xs text-muted-foreground">Sin compromiso: te respondemos con las fechas y los pasos para reservar.</p>
        </div>
      </div>
    </Section>
  );
}

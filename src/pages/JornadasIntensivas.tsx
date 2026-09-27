import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Tag } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { SEO } from '@/components/SEO';
import { seoConfig } from '@/utils/seoConfig';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { SectionHeader } from '@/components/ds/Section';
import { Img } from '@/components/ds/Img';
import { NEXT_EDITION } from '@/data/site';
import { JORNADA_ZERO, JORNADAS_HUB_NAME, UP_DETAIL } from '@/data/jornadas';
import { formatPrice } from '@/lib/format';
import jornadaZeroImg from '@/assets/evento-grupo-coche-rojo.jpg?w=480;720;960&format=webp&as=picture';
import upDetailImg from '@/assets/evento-clase-completa.jpg?w=480;720;960&format=webp&as=picture';

const JornadasFaq = lazy(() => import('@/components/jornadas/JornadasFaq').then((m) => ({ default: m.JornadasFaq })));
const CtaBand = lazy(() => import('@/components/ds/CtaBand').then((m) => ({ default: m.CtaBand })));

const Placeholder = () => <div className="ds-section" aria-hidden="true" />;

const formats = [
  {
    href: `/${JORNADA_ZERO.slug}`,
    name: JORNADA_ZERO.name,
    eyebrow: 'Para empezar desde cero',
    text: 'Tu primer contacto con el detailing profesional, con el equipo de Detail Park. Practicas sobre un vehículo real y descubres si esto es para ti.',
    image: jornadaZeroImg,
    alt: 'Grupo de alumnos alrededor de un coche rojo en el taller de Detail Park',
    cta: 'Ver la Jornada Zero',
    rows: [
      { label: 'Formato', value: 'Práctica guiada en el taller' },
      { label: 'Duración', value: `${JORNADA_ZERO.duration}, ${JORNADA_ZERO.schedule}` },
      { label: 'Para quién', value: 'Quien nunca ha trabajado en un taller' },
      { label: 'Precio', value: `${formatPrice(JORNADA_ZERO.price)} + IVA` },
      { label: 'Próxima edición', value: NEXT_EDITION },
    ],
  },
  {
    href: `/${UP_DETAIL.slug}`,
    name: UP_DETAIL.name,
    eyebrow: 'Para aprender mucho en poco tiempo',
    text: 'Un formato intensivo para aprender lo máximo en el menor tiempo posible: demostraciones de técnicas profesionales con Daniel López y expertos invitados.',
    image: upDetailImg,
    alt: 'Alumnos en una sesión de formación en las instalaciones de Detail Park',
    cta: 'Ver Up Detail',
    rows: [
      { label: 'Formato', value: 'Demostración intensiva' },
      { label: 'Duración', value: UP_DETAIL.duration },
      { label: 'Para quién', value: 'Quien quiere ver mucha técnica de golpe' },
      { label: 'Precio', value: `${formatPrice(UP_DETAIL.price)} + IVA` },
      { label: 'Próxima edición', value: NEXT_EDITION },
    ],
  },
];

export default function JornadasIntensivas() {
  return (
    <>
      <SEO {...seoConfig.jornadasHub} />
      <MainLayout>
        <section className="ds-section bg-background pt-0 md:pt-0" aria-labelledby="jornadas-title">
          <div className="ds-container pt-2">
            <Breadcrumbs items={[{ name: JORNADAS_HUB_NAME, url: '/curso-detailing-iniciacion' }]} />
          </div>
          <div className="ds-container pt-6 md:pt-10">
            <SectionHeader
              as="h1"
              id="jornadas-title"
              eyebrow="Jornadas de un día · Alicante"
              title="Jornadas de iniciación al detailing"
              lead="Dos formatos de un día para acercarte al detailing profesional en el taller de Detail Park antes de apuntarte a un curso completo."
            />

            <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
              {formats.map((f, i) => (
                <article key={f.href} className="ds-card flex flex-col overflow-hidden">
                  <Link to={f.href} tabIndex={-1} aria-hidden="true" className="block aspect-[16/10] overflow-hidden">
                    <Img picture={f.image} alt="" sizes="(min-width: 768px) 480px, 100vw" className="h-full" priority={i === 0} />
                  </Link>
                  <div className="flex flex-1 flex-col p-6 md:p-8">
                    <p className="ds-eyebrow">{f.eyebrow}</p>
                    <h2 className="mt-2 font-heading text-3xl uppercase text-foreground md:text-4xl">{f.name}</h2>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-foreground">{f.text}</p>
                    <dl className="mt-6 flex-1 divide-y divide-border border-y border-border">
                      {f.rows.map((r) => (
                        <div key={r.label} className="flex items-baseline justify-between gap-4 py-2.5 text-sm">
                          <dt className="shrink-0 text-muted-foreground">{r.label}</dt>
                          <dd className="text-right font-semibold text-foreground">{r.value}</dd>
                        </div>
                      ))}
                    </dl>
                    <Button asChild size="lg" className="mt-6 h-12 w-full text-base font-semibold">
                      <Link to={f.href}>
                        {f.cta}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </Button>
                  </div>
                </article>
              ))}
            </div>

            <div className="mx-auto mt-8 flex max-w-5xl flex-col gap-3 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
              <p className="flex items-start gap-2">
                <Tag className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                En las dos, si después haces un curso completo, el importe de la jornada se descuenta.
              </p>
              <p>
                ¿Ya lo tienes claro?{' '}
                <Link to="/curso-detailing-profesional" className="font-semibold text-brand underline underline-offset-4">
                  Curso de detailing
                </Link>{' '}
                o{' '}
                <Link to="/formacion-profesional-detailing" className="font-semibold text-brand underline underline-offset-4">
                  Carrera Detailing
                </Link>
              </p>
            </div>
          </div>
        </section>

        <Suspense fallback={<Placeholder />}>
          <JornadasFaq />
          <CtaBand
            title="¿No sabes cuál elegir?"
            text="Cuéntanos de dónde partes y qué quieres conseguir, y te decimos qué jornada o curso encaja contigo."
            whatsappText="Hola, quiero información sobre las jornadas de iniciación (Jornada Zero / Up Detail)."
          />
        </Suspense>
      </MainLayout>
    </>
  );
}

import { useState } from 'react';
import { ArrowUpRight, Play, Wrench } from 'lucide-react';
import { Section, SectionHeader } from '@/components/ds/Section';
import { SITE } from '@/data/site';
import { carreraDetailingData } from '@/data/carreraDetailingData';

const VIDEO = {
  id: 'peVrGNgAW14',
  title: 'Daniel López: los 3 errores que casi arruinan mi negocio de detailing',
};

/** Vídeo de YouTube que solo carga el reproductor al pulsar */
function BusinessVideo() {
  const [playing, setPlaying] = useState(false);
  if (playing) {
    return (
      <div className="relative aspect-video overflow-hidden rounded-xl">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${VIDEO.id}?autoplay=1&rel=0`}
          title={VIDEO.title}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }
  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group relative block aspect-video w-full overflow-hidden rounded-xl"
      aria-label={`Reproducir vídeo: ${VIDEO.title}`}
    >
      <img
        src={`https://i.ytimg.com/vi/${VIDEO.id}/hqdefault.jpg`}
        alt=""
        width={480}
        height={360}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <span className="absolute inset-0 bg-black/35 transition-colors group-hover:bg-black/25" aria-hidden="true" />
      <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-white shadow-lg" aria-hidden="true">
        <Play className="ml-0.5 h-6 w-6" fill="currentColor" />
      </span>
    </button>
  );
}

/** Módulo de negocio + práctica en el taller */
export function CarreraBusiness() {
  return (
    <Section id="negocio" aria-labelledby="negocio-title">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
        <div>
          <SectionHeader
            id="negocio-title"
            align="left"
            eyebrow="Módulo de negocio"
            title="Aprende a montar y llevar tu centro"
            lead="Saber pulir no basta: hay que saber cobrarlo y organizarse. Te enseñamos lo que hemos aprendido montando Detail Park."
            className="mb-8"
          />
          <figure className="flex flex-col gap-3">
            <BusinessVideo />
            <figcaption className="text-sm text-muted-foreground">{VIDEO.title} (YouTube).</figcaption>
          </figure>
        </div>

        <div className="flex flex-col gap-4 lg:pt-2">
          <ol className="grid gap-4 sm:grid-cols-2">
            {carreraDetailingData.business.map((b, i) => (
              <li key={b.title} className="ds-card p-5 md:p-6">
                <h3 className="flex items-baseline gap-3 text-lg font-bold text-foreground">
                  <span className="font-heading text-3xl font-normal leading-none text-brand">{String(i + 1).padStart(2, '0')}</span>
                  {b.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.items.join(' · ')}</p>
              </li>
            ))}
          </ol>
          <div className="flex gap-4 rounded-xl border border-border bg-primary/15 p-5 md:p-6">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-background text-brand">
              <Wrench className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-foreground">Práctica en el taller</h3>
              <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted-foreground">
                Además de los cursos, trabajas con coches de clientes junto al equipo de Detail Park y ves cómo se organiza el día a día: citas, presupuestos, prioridades y entregas.
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Y cuando abras, puedes gestionar tu centro con{' '}
            <a href={SITE.sistemaDetailUrl} target="_blank" rel="noopener" className="inline-flex items-center gap-0.5 font-semibold text-foreground underline underline-offset-4">
              Sistema Detail
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            , el software de gestión que usamos en Detail Park.
          </p>
        </div>
      </div>
    </Section>
  );
}

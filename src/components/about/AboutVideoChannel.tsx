import { useState } from 'react';
import { ExternalLink, Play } from 'lucide-react';
import { Section, SectionHeader } from '@/components/ds/Section';
import { SITE } from '@/data/site';

// Vídeos publicados en el canal de YouTube de Detail Park (títulos resumidos de los originales).
const videos = [
  { id: 'sqK6qkTWynk', title: 'Tratamiento cerámico en un Lamborghini Aventador SV' },
  { id: 'L14vIkJWgKw', title: 'PPF completo en un McLaren 765LT' },
  { id: 'lgHS6CO2G2s', title: 'Wrapping de un Audi R8 con vinilo 3M' },
];

/** Miniatura de YouTube: el reproductor solo se carga al pulsar. */
function LiteYouTube({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  if (playing) {
    return (
      <div className="relative aspect-video overflow-hidden rounded-xl">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
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
      aria-label={`Reproducir vídeo: ${title}`}
    >
      <img
        src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
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

export function AboutVideoChannel() {
  return (
    <Section id="videos-detailing" aria-labelledby="videos-title">
      <SectionHeader
        id="videos-title"
        eyebrow="Canal de YouTube"
        title="Trabajos reales del taller"
        lead="Algunos de los trabajos de Detail Park publicados en su canal. Así es el día a día del centro donde vas a aprender."
      />
      <div className="grid gap-6 md:grid-cols-3">
        {videos.map((v) => (
          <figure key={v.id} className="flex flex-col gap-3">
            <LiteYouTube id={v.id} title={v.title} />
            <figcaption className="text-sm text-muted-foreground">{v.title}</figcaption>
          </figure>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <a
          href={SITE.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand underline-offset-4 hover:underline"
        >
          Ver más vídeos en el canal de Detail Park
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </Section>
  );
}

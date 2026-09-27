import { useState } from 'react';
import { Play } from 'lucide-react';
import { Section, SectionHeader } from '@/components/ds/Section';

export interface CourseVideo {
  id: string;
  title: string;
}

function LiteYouTube({ video }: { video: CourseVideo }) {
  const [playing, setPlaying] = useState(false);
  if (playing) {
    return (
      <div className="relative aspect-video overflow-hidden rounded-xl">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
          title={video.title}
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
      aria-label={`Reproducir vídeo: ${video.title}`}
    >
      <img
        src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
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

interface CourseVideosProps {
  videos: CourseVideo[];
  title?: string;
  lead?: string;
}

/** Vídeos del curso (YouTube, el reproductor se carga solo al pulsar) */
export function CourseVideos({ videos, title = 'Así es el curso', lead = 'Vídeos del canal de Detail Park grabados durante las formaciones.' }: CourseVideosProps) {
  return (
    <Section aria-labelledby="videos-title">
      <SectionHeader id="videos-title" eyebrow="En vídeo" title={title} lead={lead} />
      <div className={`mx-auto grid gap-6 ${videos.length === 1 ? 'max-w-2xl' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
        {videos.map((v) => (
          <figure key={v.id} className="flex flex-col gap-3">
            <LiteYouTube video={v} />
            <figcaption className="text-sm text-muted-foreground">{v.title}</figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}

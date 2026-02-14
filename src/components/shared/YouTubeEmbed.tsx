import { useState } from 'react';
import { Play } from 'lucide-react';

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
  isShort?: boolean;
}

export function YouTubeEmbed({ videoId, title, isShort = false }: YouTubeEmbedProps) {
  const [playing, setPlaying] = useState(false);
  const aspectClass = isShort ? 'aspect-[9/16]' : 'aspect-video';

  if (playing) {
    return (
      <div className={`relative ${aspectClass} rounded-2xl overflow-hidden`}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  const thumbUrl = isShort
    ? `https://img.youtube.com/vi/${videoId}/oar2.jpg`
    : `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <button
      onClick={() => setPlaying(true)}
      className={`relative ${aspectClass} rounded-2xl overflow-hidden group w-full`}
      aria-label={`Reproducir video: ${title}`}
    >
      <img
        src={thumbUrl}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
        width={480}
        height={isShort ? 854 : 360}
      />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-violet-600/90 backdrop-blur-sm flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:bg-violet-500 shadow-lg shadow-violet-500/30">
          <Play className="w-6 h-6 md:w-7 md:h-7 text-white ml-0.5" fill="currentColor" />
        </div>
      </div>
    </button>
  );
}

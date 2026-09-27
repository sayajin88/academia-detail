import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, CheckCircle2, Clock, Loader2, Play, Tag } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Section, SectionHeader } from '@/components/ds/Section';
import { Img } from '@/components/ds/Img';
import { supabase } from '@/integrations/supabase/client';
import { NEXT_EDITION, SITE } from '@/data/site';
import { JORNADA_ZERO, UP_DETAIL } from '@/data/jornadas';
import danielImg from '@/assets/daniel-lopez-updetail.jpg?w=320;480;640&format=webp&as=picture';
import leandroImg from '@/assets/leandro-updetail.jpg?w=320;480;640&format=webp&as=picture';
// Copia en vertical de federica-updetail.jpg (el original depende de la orientación EXIF y se veía girado)
import federicaImg from '@/assets/federica-updetail-vertical.jpg?w=320;480;640&format=webp&as=picture';

/* ---------- Vídeos (el reproductor de YouTube se carga solo al pulsar) ---------- */

interface Video {
  id: string;
  title: string;
  short?: boolean;
}

// Vídeos del canal @danidetailoficial grabados en ediciones anteriores
const videos: Video[] = [
  { id: 'ZA8lZ5R6Yg0', title: 'Up Detail, segunda edición' },
  { id: 'BGL5AgEtetM', title: 'Up Detail, vídeo corto 1', short: true },
  { id: 'oRNb5XmT1dU', title: 'Up Detail, vídeo corto 2', short: true },
  { id: 'AT7PLhq-Ygw', title: 'Up Detail, vídeo corto 3', short: true },
];

function LiteYouTube({ video }: { video: Video }) {
  const [playing, setPlaying] = useState(false);
  const aspect = video.short ? 'aspect-[9/16]' : 'aspect-video';
  if (playing) {
    return (
      <div className={`relative ${aspect} overflow-hidden rounded-xl`}>
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
      className={`group relative block ${aspect} w-full overflow-hidden rounded-xl`}
      aria-label={`Reproducir vídeo: ${video.title}`}
    >
      <img
        src={`https://i.ytimg.com/vi/${video.id}/${video.short ? 'oar2' : 'hqdefault'}.jpg`}
        alt=""
        width={video.short ? 405 : 480}
        height={video.short ? 720 : 360}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <span className="absolute inset-0 bg-black/35 transition-colors group-hover:bg-black/25" aria-hidden="true" />
      <span
        className={`absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-white shadow-lg ${video.short ? 'h-10 w-10 md:h-12 md:w-12' : 'h-14 w-14'}`}
        aria-hidden="true"
      >
        <Play className={`ml-0.5 ${video.short ? 'h-4 w-4 md:h-5 md:w-5' : 'h-6 w-6'}`} fill="currentColor" />
      </span>
    </button>
  );
}

export function UpDetailVideos() {
  const [main, ...shorts] = videos;
  return (
    <Section tone="card" aria-labelledby="videos-title">
      <SectionHeader
        id="videos-title"
        eyebrow="En vídeo"
        title="Así fueron las ediciones anteriores"
        lead="Vídeos de Up Detail publicados en el canal de YouTube de Daniel López (@danidetailoficial)."
      />
      <div className="grid items-start gap-4 md:gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,3fr)]">
        <figure className="flex flex-col gap-3">
          <LiteYouTube video={main} />
          <figcaption className="text-sm text-muted-foreground">{main.title}</figcaption>
        </figure>
        <ul className="grid grid-cols-3 gap-3 md:gap-4" aria-label="Vídeos cortos de Up Detail">
          {shorts.map((v) => (
            <li key={v.id}>
              <LiteYouTube video={v} />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/* ---------- Ponentes ---------- */

// Tal como se presentan hoy en la página (sin biografías inventadas)
const speakers = [
  { name: 'Daniel López', role: `${SITE.founderRole}. Organiza Up Detail.`, image: danielImg, alt: 'Daniel López en Detail Park' },
  {
    name: 'Leandro Landete',
    role: 'Leandro Landete Pro Detailing. Experto invitado.',
    href: 'https://www.leandrolandeteprodetailing.com/',
    image: leandroImg,
    alt: 'Leandro Landete, experto invitado de Up Detail',
  },
  { name: 'Federica', role: '@la_detailher. Experta invitada.', image: federicaImg, alt: 'Federica, experta invitada de Up Detail' },
];

export function UpDetailSpeakers() {
  return (
    <Section aria-labelledby="ponentes-title">
      <SectionHeader
        id="ponentes-title"
        eyebrow="Ponentes"
        title="Con quién aprendes"
        lead="Up Detail lo organiza Daniel López en Detail Park, con profesionales invitados. Los ponentes de cada edición se anuncian junto con la fecha."
      />
      <ul className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-3 md:gap-6">
        {speakers.map((s) => (
          <li key={s.name} className="ds-card grid grid-cols-[96px_1fr] items-center overflow-hidden sm:grid-cols-1 sm:content-start sm:items-start">
            <Img picture={s.image} alt={s.alt} sizes="(min-width: 640px) 33vw, 96px" className="aspect-square h-full sm:aspect-[4/5] sm:h-auto" />
            <div className="p-4 md:p-5">
              <h3 className="text-lg font-bold text-foreground">{s.name}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.role}</p>
              {'href' in s && s.href && (
                <a href={s.href} target="_blank" rel="noopener" className="mt-2 inline-block text-sm font-semibold text-brand underline underline-offset-4">
                  Ver su academia
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ---------- Lista de aviso (tabla up_detail_preregistrations) ---------- */

export function UpDetailWaitlist() {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    if (!cleanEmail) return;
    setStatus('sending');
    const { error } = await supabase
      .from('up_detail_preregistrations')
      .insert({ email: cleanEmail, name: fullName.trim() || null });
    // 23505: el email ya estaba en la lista; para el usuario es lo mismo
    if (error && error.code !== '23505') {
      setStatus('idle');
      toast.error('No se ha podido guardar. Inténtalo de nuevo o escríbenos por WhatsApp.');
      return;
    }
    setStatus('done');
  };

  const facts = [
    { icon: Tag, text: `Precio: ${UP_DETAIL.priceLabel.toLowerCase()}` },
    { icon: Clock, text: UP_DETAIL.duration },
    { icon: CalendarDays, text: `Fechas: ${NEXT_EDITION.toLowerCase()}` },
  ];

  return (
    <Section id="preregistro" tone="card" width="narrow" aria-labelledby="espera-title">
      <div className="ds-card border-primary/40 bg-background p-6 text-center md:p-10">
        {status === 'done' ? (
          <div className="flex flex-col items-center gap-3" role="status">
            <CheckCircle2 className="h-10 w-10 text-brand" aria-hidden="true" />
            <h2 id="espera-title" className="ds-h2 text-foreground">Te avisaremos</h2>
            <p className="text-muted-foreground">En cuanto tengamos fecha para la próxima edición de Up Detail te escribimos a {email.trim()}.</p>
            <Link to={`/${JORNADA_ZERO.slug}`} className="mt-2 text-sm font-semibold text-brand underline underline-offset-4">
              Mientras tanto, mira la Jornada Zero
            </Link>
          </div>
        ) : (
          <>
            <p className="ds-eyebrow">Próxima edición</p>
            <h2 id="espera-title" className="ds-h2 mt-3 text-foreground">Avísame de la próxima edición</h2>
            <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-foreground">
              {facts.map((f) => (
                <li key={f.text} className="flex items-center gap-1.5">
                  <f.icon className="h-4 w-4 text-brand" aria-hidden="true" />
                  {f.text}
                </li>
              ))}
            </ul>
            <p className="mx-auto mt-4 max-w-md text-muted-foreground">
              Up Detail es un evento puntual y todavía no hay fecha ni precio. Déjanos tu email y te escribimos en cuanto los confirmemos.
            </p>
            <form onSubmit={submit} className="mx-auto mt-8 grid max-w-md gap-4 text-left">
              <div className="grid gap-1.5">
                <Label htmlFor="espera-nombre">Nombre (opcional)</Label>
                <Input id="espera-nombre" value={fullName} onChange={(e) => setFullName(e.target.value)} autoComplete="name" />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="espera-email">Email</Label>
                <Input id="espera-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
              </div>
              <Button type="submit" size="lg" className="h-12 text-base font-semibold" disabled={status === 'sending'}>
                {status === 'sending' && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
                Apuntarme a la lista
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Gratis y sin compromiso. Solo te escribiremos para avisarte de Up Detail.{' '}
                <Link to="/politica-privacidad" className="underline">Política de privacidad</Link>.
              </p>
            </form>
          </>
        )}
      </div>
    </Section>
  );
}

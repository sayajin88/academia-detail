import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, ChevronDown, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { STATS } from '@/data/site';
import heroImage1280 from '@/assets/heroes/hero-home-1280.webp';
import heroImage1920 from '@/assets/heroes/hero-home-1920.webp';
import mobileHero720 from '@/assets/heroes/hero-home-mobile-720.webp';
import mobileHero1080 from '@/assets/heroes/hero-home-mobile-1080.webp';

// Portada en WebP y a la medida de cada pantalla (en móvil, recorte vertical).
const MOBILE_SRCSET = `${mobileHero720} 720w, ${mobileHero1080} 1080w`;
const DESKTOP_SRCSET = `${heroImage1280} 1280w, ${heroImage1920} 1920w`;

// Vídeo del canal de Detail Park grabado en un curso
const VIDEO_ID = '1JS81ZxslpI';

const rating = STATS.googleRating.toLocaleString('es-ES', { minimumFractionDigits: 1 });

const facts = [
  { value: String(STATS.alumnos), label: 'alumnos formados' },
  { value: `Máx. ${STATS.maxAlumnosGrupo}`, label: 'alumnos por grupo' },
  { value: '90 %', label: 'del curso es práctica' },
];

const consentGiven = () => {
  try {
    return localStorage.getItem("academia-detail-cookie-consent") === "accepted";
  } catch {
    return false;
  }
};

/**
 * Vídeo de fondo: solo en escritorio, con las cookies aceptadas (YouTube es un tercero),
 * sin «ahorro de datos» ni movimiento reducido, y cuando la página ya ha cargado
 * (la foto es la imagen principal, LCP).
 */
function useBackgroundVideo() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const wide = window.matchMedia('(min-width: 1024px)').matches;
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (!wide || calm || saveData) return;
    let timer: ReturnType<typeof setTimeout>;
    const tryStart = () => {
      if (!consentGiven()) return;
      clearTimeout(timer);
      timer = setTimeout(() => setEnabled(true), 2000);
    };
    if (document.readyState === 'complete') tryStart();
    else window.addEventListener('load', tryStart, { once: true });
    // Si acepta las cookies estando en la portada, el vídeo arranca entonces.
    window.addEventListener('cookie-banner-visibility', tryStart);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', tryStart);
      window.removeEventListener('cookie-banner-visibility', tryStart);
    };
  }, []);
  return enabled;
}

export function HomeHero() {
  const videoEnabled = useBackgroundVideo();
  const [videoVisible, setVideoVisible] = useState(false);

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden lg:min-h-[max(720px,94vh)]">
      {/* Precarga de la portada: el pre-renderizado la copia a la cabecera de la home. */}
      <Helmet>
        <link rel="preload" as="image" type="image/webp" media="(max-width: 767px)" imageSrcSet={MOBILE_SRCSET} imageSizes="100vw" fetchPriority="high" />
        <link rel="preload" as="image" type="image/webp" media="(min-width: 768px)" imageSrcSet={DESKTOP_SRCSET} imageSizes="100vw" fetchPriority="high" />
      </Helmet>

      <picture>
        <source media="(max-width: 767px)" type="image/webp" srcSet={MOBILE_SRCSET} sizes="100vw" />
        <source media="(min-width: 768px)" type="image/webp" srcSet={DESKTOP_SRCSET} sizes="100vw" />
        <img
          src={heroImage1920}
          alt="Alumnos puliendo un coche en el taller de Detail Park durante un curso de detailing"
          className="absolute inset-0 -z-20 h-full w-full scale-105 object-cover"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          width={1920}
          height={1080}
        />
      </picture>

      {videoEnabled && (
        <div
          className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden transition-opacity duration-1000 ${videoVisible ? 'opacity-100' : 'opacity-0'}`}
          aria-hidden="true"
        >
          <iframe
            title="Vídeo de fondo"
            tabIndex={-1}
            src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${VIDEO_ID}&controls=0&disablekb=1&fs=0&iv_load_policy=3&modestbranding=1&playsinline=1&rel=0&start=2`}
            allow="autoplay; encrypted-media"
            onLoad={() => setTimeout(() => setVideoVisible(true), 1200)}
            className="absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      )}

      {/* Capas para que el texto se lea y el hero se funda con la página */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/60 to-background/20 lg:bg-gradient-to-r lg:from-background lg:via-background/75 lg:to-background/10" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-background to-transparent" aria-hidden="true" />
      <div className="absolute -left-40 top-1/3 -z-10 h-[32rem] w-[32rem] rounded-full bg-primary/25 blur-[120px]" aria-hidden="true" />

      <div className="ds-container flex flex-1 flex-col justify-end pb-14 pt-28 lg:justify-center lg:pb-20 lg:pt-32">
        <div className="max-w-2xl">
          <p className="ds-glass mb-6 inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-xs font-semibold text-white/90 md:text-sm">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full rounded-full bg-brand" style={{ animation: 'ds-ping 1.8s cubic-bezier(0,0,0.2,1) infinite' }} />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
            </span>
            Formación presencial en un taller real · Alicante
          </p>
          <h1 className="ds-h1 text-white">
            Cursos de detailing <span className="ds-text-gradient">profesional</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
            Aprende pulido, tratamiento cerámico, wrapping y PPF trabajando con vehículos reales en Detail Park. Desde cero, en
            grupos pequeños y con visión de negocio.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-[3.25rem] px-7 text-base font-semibold">
              <a href="#formaciones">
                Ver los cursos
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-[3.25rem] px-7 text-base font-semibold text-white">
              <Link to="/contacto">Solicitar información</Link>
            </Button>
          </div>

          <dl className="mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
            {facts.map((f) => (
              <div key={f.label} className="ds-glass rounded-2xl px-4 py-3.5">
                <dt className="sr-only">{f.label}</dt>
                <dd className="font-heading text-3xl leading-none text-white">{f.value}</dd>
                <dd className="mt-1.5 text-xs leading-snug text-white/70">{f.label}</dd>
              </div>
            ))}
            <div className="ds-glass rounded-2xl px-4 py-3.5">
              <dt className="sr-only">Valoración en Google</dt>
              <dd className="flex items-center gap-1.5 font-heading text-3xl leading-none text-white">
                {rating}
                <Star className="h-5 w-5 fill-gold text-gold" aria-hidden="true" />
              </dd>
              <dd className="mt-1.5 text-xs leading-snug text-white/70">{STATS.googleReviews} opiniones en Google</dd>
            </div>
          </dl>
        </div>
      </div>

      <a
        href="#formaciones"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-white/50 transition-colors hover:text-white lg:block"
        aria-label="Bajar a los cursos"
      >
        <ChevronDown className="h-7 w-7 animate-bounce" aria-hidden="true" />
      </a>
    </section>
  );
}

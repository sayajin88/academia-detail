import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { STATS } from '@/data/site';
import heroImage1280 from '@/assets/heroes/hero-home-1280.webp';
import heroImage1920 from '@/assets/heroes/hero-home-1920.webp';
import mobileHero720 from '@/assets/heroes/hero-home-mobile-720.webp';
import mobileHero1080 from '@/assets/heroes/hero-home-mobile-1080.webp';

// Portada en WebP y a la medida de cada pantalla (en móvil, recorte vertical).
const MOBILE_SRCSET = `${mobileHero720} 720w, ${mobileHero1080} 1080w`;
const DESKTOP_SRCSET = `${heroImage1280} 1280w, ${heroImage1920} 1920w`;

const rating = STATS.googleRating.toLocaleString('es-ES', { minimumFractionDigits: 1 });

const facts = [
  { value: String(STATS.alumnos), label: 'alumnos formados' },
  { value: `${STATS.maxAlumnosGrupo}`, label: 'alumnos por grupo, como máximo' },
  { value: '90 %', label: 'del curso es práctica' },
];

export function HomeHero() {
  return (
    <section className="relative isolate overflow-hidden">
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
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          width={1920}
          height={1080}
        />
      </picture>
      {/* Oscurece la foto para que el texto se lea (más fuerte a la izquierda y abajo) */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/70 to-background/30 md:bg-gradient-to-r md:from-background/95 md:via-background/70 md:to-background/10" aria-hidden="true" />

      <div className="ds-container flex min-h-[calc(100svh-4rem)] flex-col justify-end pb-12 pt-24 md:min-h-[640px] md:justify-center md:py-24 lg:min-h-[720px]">
        <div className="max-w-2xl">
          <p className="ds-eyebrow mb-4">Academia Detail · by Detail Park</p>
          <h1 className="ds-h1 text-white">Cursos de detailing profesional en un taller real</h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
            Aprende pulido, tratamiento cerámico, wrapping y PPF trabajando con vehículos reales en Detail Park, Alicante.
            Desde cero, en grupos pequeños y con visión de negocio.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12 px-7 text-base font-semibold">
              <a href="#formaciones">
                Ver los cursos
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 border-white/30 bg-white/5 px-7 text-base font-semibold text-white backdrop-blur-sm hover:bg-white/10 hover:text-white">
              <Link to="/contacto">Solicitar información</Link>
            </Button>
          </div>

          <dl className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-white/15 pt-6">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="sr-only">{f.label}</dt>
                <dd className="font-heading text-3xl leading-none text-white md:text-4xl">{f.value}</dd>
                <dd className="mt-1 text-xs leading-snug text-white/70 md:text-sm">{f.label}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 flex items-center gap-2 text-sm text-white/80">
            <Star className="h-4 w-4 fill-gold text-gold" aria-hidden="true" />
            <span>
              <strong className="text-white">{rating}</strong> en Google · {STATS.googleReviews} opiniones de Detail Park
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

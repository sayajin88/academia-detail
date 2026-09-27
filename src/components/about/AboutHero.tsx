import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { Img } from '@/components/ds/Img';
import { SITE, STATS } from '@/data/site';
import tallerImg from '@/assets/instalaciones-curso-ferrari.jpg?w=560;840;1200&format=webp&as=picture';

const rating = STATS.googleRating.toLocaleString('es-ES', { minimumFractionDigits: 1 });

const facts = [
  { value: String(STATS.alumnos), label: 'alumnos formados' },
  { value: String(STATS.maxAlumnosGrupo), label: 'alumnos por grupo, como máximo' },
  { value: `+${SITE.founderYears}`, label: 'años de experiencia del formador' },
];

export function AboutHero() {
  return (
    <section className="border-b border-border bg-background">
      <div className="ds-container pt-2">
        <Breadcrumbs items={[{ name: 'Quiénes somos', url: '/quienes-somos' }]} />
      </div>
      <div className="ds-container grid items-center gap-10 pb-14 pt-4 md:pb-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
        <div>
          <p className="ds-eyebrow mb-4">Quiénes somos · Alicante</p>
          <h1 className="ds-h1 text-foreground">La academia de un taller de detailing en activo</h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Academia Detail es la escuela de{' '}
            <a href={SITE.detailParkUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand underline underline-offset-4">
              Detail Park
            </a>
            , un centro de detailing, wrapping y PPF de Alicante que trabaja cada día con coches de clientes. Enseñamos lo
            mismo que hacemos en el taller, con las mismas máquinas y los mismos productos.
          </p>

          <dl className="mt-8 grid max-w-xl grid-cols-3 gap-4 border-t border-border pt-6">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="sr-only">{f.label}</dt>
                <dd className="font-heading text-3xl leading-none text-foreground md:text-4xl">{f.value}</dd>
                <dd className="mt-1 text-xs leading-snug text-muted-foreground md:text-sm">{f.label}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
            <Star className="h-4 w-4 fill-gold text-gold" aria-hidden="true" />
            <span>
              <strong className="text-foreground">{rating}</strong> en Google · {STATS.googleReviews} opiniones de Detail Park
            </span>
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12 px-7 text-base font-semibold">
              <Link to="/#formaciones">
                Ver los cursos
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-7 text-base font-semibold">
              <Link to="/contacto">Solicitar información</Link>
            </Button>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl">
          <Img
            picture={tallerImg}
            alt="Clase en el taller de Detail Park, con alumnos sentados junto a un Ferrari y el formador explicando el material de pulido"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="aspect-[4/3] lg:aspect-[5/4]"
            priority
          />
        </div>
      </div>
    </section>
  );
}

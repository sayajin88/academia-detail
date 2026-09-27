import { ArrowRight, Instagram, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { Img } from '@/components/ds/Img';
import { WhatsAppIcon } from '@/components/ds/WhatsAppIcon';
import { STATS, whatsappLink } from '@/data/site';
import practicaImg from '@/assets/evento-practica-pulidora-real.jpg?w=560;840;1200&format=webp&as=picture';

const rating = STATS.googleRating.toLocaleString('es-ES', { minimumFractionDigits: 1 });

/** Aviso flotante sobre la foto (ilustra lo que genera una buena presencia digital). */
function Notice({ icon, title, text, className }: { icon: React.ReactNode; title: string; text: string; className: string }) {
  return (
    <div className={`absolute flex max-w-[15.5rem] items-center gap-3 rounded-xl border border-white/10 bg-card/95 px-3 py-2.5 shadow-xl shadow-black/40 sm:max-w-[20rem] sm:px-4 sm:py-3 ${className}`}>
      {icon}
      <span className="min-w-0">
        <span className="block text-[13px] font-bold leading-tight text-foreground sm:text-sm">{title}</span>
        <span className="block truncate text-xs text-muted-foreground">{text}</span>
      </span>
    </div>
  );
}

export function MarketingHero() {
  return (
    <section className="border-b border-border bg-background">
      <div className="ds-container pt-2">
        <Breadcrumbs items={[{ name: 'Marketing para detailers', url: '/marketing-digital-detailing' }]} />
      </div>
      <div className="ds-container grid items-center gap-12 pb-14 pt-4 md:pb-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10">
        <div>
          <p className="ds-eyebrow mb-4">Marketing digital para centros de detailing</p>
          <h1 className="ds-h1 text-foreground">Web, SEO y marca para tu centro de detailing</h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Tu trabajo es espectacular; que tu marca también lo sea. Hacemos diseño web, SEO local, posicionamiento en
            buscadores de IA (GEO) e identidad de marca para talleres y centros de detailing de toda España.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12 px-7 text-base font-semibold">
              <a href="#packs">
                Ver packs y precios
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-7 text-base font-semibold">
              <a
                href={whatsappLink('Hola, me interesa el servicio de marketing digital para mi negocio de detailing.')}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Hablar por WhatsApp
              </a>
            </Button>
          </div>
        </div>

        {/* Composición: foto real del taller + avisos de redes, Google y WhatsApp */}
        <div className="relative px-2 pb-10 pt-8 sm:px-6 lg:px-0 lg:pl-6">
          <div className="overflow-hidden rounded-2xl border border-border">
            <Img
              picture={practicaImg}
              alt="Alumno puliendo un coche con una pulidora DeWalt mientras el formador le guía y otros alumnos graban con el móvil"
              sizes="(min-width: 1024px) 700px, 100vw"
              className="aspect-[4/3]"
              priority
            />
          </div>
          <Notice
            className="left-0 top-0 lg:-left-2"
            icon={<span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-brand"><Instagram className="h-5 w-5" aria-hidden="true" /></span>}
            title="Reel publicado"
            text="Corrección de pintura · antes y después"
          />
          <Notice
            className="right-0 top-1/3 sm:-right-2"
            icon={<span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#25D366] text-white"><WhatsAppIcon className="h-5 w-5" /></span>}
            title="Nuevo mensaje"
            text="«¿Tenéis hueco para un cerámico?»"
          />
          <Notice
            className="bottom-0 left-4 sm:left-8"
            icon={<span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10"><Star className="h-5 w-5 fill-gold text-gold" aria-hidden="true" /></span>}
            title={`${rating} en Google`}
            text={`${STATS.googleReviews} reseñas de Detail Park`}
          />
        </div>
      </div>
    </section>
  );
}

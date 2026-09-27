import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Calculator, Megaphone, Settings2, TrendingUp } from 'lucide-react';
import { Section, SectionHeader } from '@/components/ds/Section';
import { SITE } from '@/data/site';

const steps = [
  { n: '01', icon: Calculator, title: 'Precios y márgenes', text: 'Calcula el coste real de cada servicio y pon precios que te dejen margen.' },
  { n: '02', icon: Megaphone, title: 'Captar clientes', text: 'Marketing local, redes y recomendaciones para llenar la agenda.' },
  { n: '03', icon: Settings2, title: 'Organizar el taller', text: 'Espacio, citas, proveedores y stock para trabajar sin perder horas.' },
  { n: '04', icon: TrendingUp, title: 'Crecer', text: 'Cuándo contratar, qué servicios añadir y cómo pasar de autónomo a empresa.' },
];

export function HomeBusiness() {
  return (
    <Section tone="card" decor="grid" aria-labelledby="negocio-title">
      <SectionHeader
        id="negocio-title"
        eyebrow="Más allá de la técnica"
        title="Aprende también a"
        accent="montar tu negocio"
        lead="Un buen detailer no es solo quien pule bien, sino quien sabe cobrarlo. En la Carrera Detailing te enseñamos lo que hemos aprendido montando Detail Park."
      />
      <ol className="relative grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
        {/* Línea que une los pasos (escritorio) */}
        <span className="absolute left-[12%] right-[12%] top-[2.1rem] hidden h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent lg:block" aria-hidden="true" />
        {steps.map((s) => (
          <li key={s.n} className="ds-card ds-card-hover ds-reveal relative flex flex-col gap-3 bg-background p-5 md:p-6">
            <div className="flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/30 bg-gradient-to-br from-primary/40 to-primary/5 text-white">
                <s.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="font-heading text-4xl leading-none text-white/10">{s.n}</span>
            </div>
            <h3 className="text-base font-bold text-foreground md:text-lg">{s.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground md:text-[0.9375rem]">{s.text}</p>
          </li>
        ))}
      </ol>
      <div className="mt-10 flex flex-col items-center gap-4 text-center">
        <Link to="/formacion-profesional-detailing" className="ds-btn-glow inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white">
          Ver la Carrera Detailing
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        <p className="max-w-xl text-sm text-muted-foreground">
          Y cuando abras, gestiona tu centro con{' '}
          <a href={SITE.sistemaDetailUrl} target="_blank" rel="noopener" className="inline-flex items-center gap-0.5 font-semibold text-foreground underline underline-offset-4">
            Sistema Detail
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          , el software de gestión que usamos en Detail Park.
        </p>
      </div>
    </Section>
  );
}

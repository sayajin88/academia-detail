import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Section, SectionHeader } from '@/components/ds/Section';
import { SITE } from '@/data/site';

const steps = [
  { n: '01', title: 'Precios y márgenes', text: 'Calcula el coste real de cada servicio y pon precios que te dejen margen.' },
  { n: '02', title: 'Captar clientes', text: 'Marketing local, redes y recomendaciones para llenar la agenda.' },
  { n: '03', title: 'Organizar el taller', text: 'Espacio, citas, proveedores y stock para trabajar sin perder horas.' },
  { n: '04', title: 'Crecer', text: 'Cuándo contratar, qué servicios añadir y cómo pasar de autónomo a empresa.' },
];

export function HomeBusiness() {
  return (
    <Section tone="card" aria-labelledby="negocio-title">
      <SectionHeader
        id="negocio-title"
        eyebrow="Más allá de la técnica"
        title="Aprende también a montar tu negocio"
        lead="Un buen detailer no es solo quien pule bien, sino quien sabe cobrarlo. En la Carrera Detailing te enseñamos lo que hemos aprendido montando Detail Park."
      />
      <ol className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
        {steps.map((s) => (
          <li key={s.n} className="rounded-xl border border-border bg-background p-4 md:p-6">
            <span className="font-heading text-3xl leading-none text-brand">{s.n}</span>
            <h3 className="mt-3 text-base font-bold text-foreground md:text-lg">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-[0.9375rem]">{s.text}</p>
          </li>
        ))}
      </ol>
      <div className="mt-10 flex flex-col items-center gap-4 text-center">
        <Link
          to="/formacion-profesional-detailing"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Ver la Carrera Detailing
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        <p className="max-w-xl text-sm text-muted-foreground">
          Y cuando abras, gestiona tu centro con{' '}
          <a href={SITE.sistemaDetailUrl} target="_blank" rel="noopener" className="inline-flex items-center gap-0.5 font-semibold text-foreground underline-offset-4 hover:underline">
            Sistema Detail
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          , el software de gestión que usamos en Detail Park.
        </p>
      </div>
    </Section>
  );
}

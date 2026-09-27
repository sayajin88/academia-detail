import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Scale } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { SEO } from '@/components/SEO';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { Section, SectionHeader } from '@/components/ds/Section';
import { seoConfig } from '@/utils/seoConfig';
import { VisualDilutionCalculator } from '@/components/glossary/VisualDilutionCalculator';

const FaqList = lazy(() => import('@/components/ds/FaqList').then((m) => ({ default: m.FaqList })));
const CtaBand = lazy(() => import('@/components/ds/CtaBand').then((m) => ({ default: m.CtaBand })));

const BASE_URL = 'https://academiadetail.com';

const dilutionFAQs = [
  {
    question: '¿Qué pasa si diluyo demasiado un producto de detailing?',
    answer: 'Si diluyes en exceso un producto, perderá su eficacia y no limpiará ni protegerá correctamente la superficie. Tendrás que aplicar más cantidad o repetir el proceso, lo que al final resulta menos eficiente y más costoso. Siempre sigue las indicaciones del fabricante como punto de partida.'
  },
  {
    question: '¿Qué ocurre si uso un producto demasiado concentrado?',
    answer: 'Un producto poco diluido (demasiado concentrado) puede dañar superficies sensibles como pintura blanda, plásticos, vinilo o cuero. Además, deja residuos difíciles de enjuagar y supone un gasto innecesario de producto. En detailing profesional, la dilución correcta es clave para proteger el vehículo del cliente.'
  },
  {
    question: '¿Cuál es el ratio más común para un APC (All Purpose Cleaner)?',
    answer: 'El ratio más habitual para un APC multiusos es 1:10 para uso general. Sin embargo, para suciedad ligera en interiores se suele usar 1:20, y para desengrase intenso de motores o llantas se puede aplicar a 1:4. Consulta siempre la ficha técnica de tu producto específico.'
  },
  {
    question: '¿Puedo mezclar productos de distintas marcas en la misma botella?',
    answer: 'No es recomendable. Mezclar productos de diferentes marcas o tipos puede provocar reacciones químicas impredecibles, generar gases nocivos o anular las propiedades de ambos productos. Cada producto está formulado con un pH específico y mezclarlos puede alterar su eficacia y seguridad.'
  },
  {
    question: '¿Cómo medir las cantidades sin instrumentos de precisión?',
    answer: 'Puedes usar el tapón de la propia botella como unidad de medida: si tu ratio es 1:10, pon 1 tapón de producto y 10 tapones de agua. También puedes usar jeringuillas de cocina o marcas en la botella pulverizadora. Nuestra calculadora te da las cantidades exactas en mililitros para que puedas medirlas fácilmente.'
  },
  {
    question: '¿Se puede guardar un producto ya diluido?',
    answer: 'Sí, la mayoría de productos diluidos se pueden conservar durante semanas si se almacenan en una botella opaca, cerrada y a temperatura ambiente. Sin embargo, algunos productos pierden efectividad con el tiempo una vez diluidos. Como regla general, prepara solo la cantidad que vayas a usar en los próximos 7-14 días.'
  }
];

const dilutionTable = [
  { product: 'APC Multiusos (Interior)', ratio: '1:10', use: 'Limpieza general de tapicerías, plásticos y paneles interiores' },
  { product: 'APC Multiusos (Exterior)', ratio: '1:4', use: 'Limpieza de llantas, pasos de rueda y zonas con suciedad pesada' },
  { product: 'Champú de Lavado', ratio: '1:100 – 1:200', use: 'Lavado exterior con guante o foam lance (espuma)' },
  { product: 'Desengrasante Motor', ratio: '1:4 – 1:8', use: 'Limpieza de compartimento motor y zonas muy grasas' },
  { product: 'Iron Remover (Descontaminante férrico)', ratio: 'Sin diluir', use: 'Aplicar puro sobre la superficie para eliminar partículas metálicas' },
  { product: 'Limpiacristales', ratio: '1:10 – 1:20', use: 'Limpieza de cristales y espejos sin dejar marcas' },
  { product: 'Quick Detailer (Abrillantador Rápido)', ratio: 'Sin diluir', use: 'Aplicar listo para uso como lubricante de arcilla o entre lavados' },
  { product: 'Limpiador de Cuero', ratio: '1:5 – 1:10', use: 'Limpieza suave de asientos y volantes de cuero natural' },
  { product: 'Shampoo para Foam Cannon', ratio: '1:10 – 1:16', use: 'Pre-lavado con espuma. La dilución varía según el cañón de espuma' },
  { product: 'Limpiador de Llantas (ácido/alcalino)', ratio: '1:3 – 1:5', use: 'Limpieza de llantas con suciedad incrustada de polvo de freno' },
];

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Calculadora de Dilución para Detailing',
  description: 'Herramienta interactiva gratuita para calcular la dilución exacta de productos químicos de car detailing profesional.',
  url: `${BASE_URL}/calculadora-dilucion-detailing`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  creator: { '@type': 'Organization', name: 'Academia Detail', url: BASE_URL },
  browserRequirements: 'Requires JavaScript. Requires HTML5.',
  softwareVersion: '1.0',
  inLanguage: 'es',
};

const Placeholder = () => <div className="ds-section" aria-hidden="true" />;

export default function CalculadoraDilucion() {
  const seo = seoConfig.calculadoraDilucion;

  return (
    <>
      {/* El marcado FAQPage lo añade FaqList (una sola vez) */}
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        url={seo.url}
        schema={[...seo.schema, webAppSchema]}
      />
      <MainLayout>
        <section className="ds-hero">
          <div className="ds-container pt-2">
            <Breadcrumbs
              items={[
                { name: 'Glosario', url: '/glosario-detailing' },
                { name: 'Calculadora de dilución', url: '/calculadora-dilucion-detailing' },
              ]}
            />
          </div>
          <div className="ds-container pb-8 pt-4 md:pb-10">
            <p className="ds-pill mb-5">Herramienta gratuita</p>
            <h1 className="ds-h1 max-w-4xl text-foreground">Calculadora de dilución para productos de <span className="ds-text-gradient">detailing</span></h1>
            <p className="ds-lead mt-5 max-w-2xl">
              Elige el tamaño del envase y el ratio que indica el fabricante: te decimos cuántos mililitros de producto y de agua
              necesitas. Sirve para APC, champú, desengrasante, limpiacristales y cualquier otro concentrado.
            </p>
          </div>
          <div id="calculadora" className="ds-container scroll-mt-20 pb-16 md:pb-24">
            <VisualDilutionCalculator />
          </div>
        </section>

        <Section tone="card" width="narrow" aria-labelledby="como-diluir-title">
          <SectionHeader
            id="como-diluir-title"
            align="left"
            eyebrow="Guía rápida"
            title="Cómo diluir productos de detailing correctamente"
            className="mb-8 md:mb-10"
          />
          <div className="space-y-5 text-[1.0625rem] leading-[1.75] text-foreground/85 md:text-lg">
            <p>
              La dilución correcta de los productos químicos es una de las habilidades fundamentales que todo{' '}
              <strong className="font-semibold text-foreground">detailer profesional</strong> debe dominar. No se trata solo de añadir
              agua a un producto: un ratio de mezcla incorrecto puede arruinar una superficie, desperdiciar producto costoso o incluso
              poner en riesgo tu salud.
            </p>
            <div className="grid gap-4 py-2 md:grid-cols-2">
              <div className="rounded-xl border border-border bg-background p-5">
                <h3 className="flex items-center gap-2 text-base font-bold text-foreground">
                  <AlertTriangle className="h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                  Por qué importa la dilución exacta
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
                  Un producto demasiado concentrado puede atacar la pintura, decolorar plásticos o dañar cuero. Muchos APC profesionales
                  tienen un pH alcalino que, sin diluir, puede grabar la superficie de forma permanente. Además, los productos
                  concentrados generan más residuo y son más difíciles de aclarar, dejando marcas visibles al secarse.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-background p-5">
                <h3 className="flex items-center gap-2 text-base font-bold text-foreground">
                  <Scale className="h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                  Consecuencias de una dilución incorrecta
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
                  Si diluyes demasiado, el producto pierde poder de limpieza y necesitarás varias pasadas, lo que consume más tiempo y
                  más producto del necesario. Si usas muy poca agua, además del riesgo de daño, estás tirando dinero: un litro de APC
                  concentrado puede rendir hasta 100 litros diluido.
                </p>
              </div>
            </div>
            <p>
              En el <strong className="font-semibold text-foreground">detailing profesional</strong>, cada producto tiene un ratio
              recomendado por el fabricante, pero la experiencia te enseña a ajustar según el nivel de suciedad, el tipo de superficie y
              las condiciones ambientales. Si algún término no te suena, búscalo en el{' '}
              <Link to="/glosario-detailing" className="font-semibold text-brand underline decoration-brand/50 underline-offset-4 hover:decoration-brand">
                glosario de detailing
              </Link>
              .
            </p>
          </div>
        </Section>

        <Section aria-labelledby="tabla-ratios-title">
          <SectionHeader
            id="tabla-ratios-title"
            eyebrow="Referencia"
            title="Tabla de ratios de dilución por producto"
            lead="Los ratios más utilizados en un taller de detailing. Son orientativos: consulta siempre la ficha técnica de tu producto."
          />
          <div className="mx-auto max-w-4xl overflow-x-auto rounded-xl border border-border">
            <table className="w-full border-collapse text-left text-[0.9375rem] leading-snug">
              <thead className="bg-card">
                <tr>
                  <th scope="col" className="border-b border-border px-4 py-3 font-semibold text-foreground">Producto</th>
                  <th scope="col" className="whitespace-nowrap border-b border-border px-4 py-3 font-semibold text-foreground">Ratio habitual</th>
                  <th scope="col" className="hidden border-b border-border px-4 py-3 font-semibold text-foreground md:table-cell">Uso</th>
                </tr>
              </thead>
              <tbody>
                {dilutionTable.map((row) => (
                  <tr key={row.product} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 align-top">
                      <span className="font-semibold text-foreground">{row.product}</span>
                      <span className="mt-1 block text-sm text-muted-foreground md:hidden">{row.use}</span>
                    </td>
                    <td className="px-4 py-3 align-top font-semibold tabular-nums text-foreground">{row.ratio}</td>
                    <td className="hidden px-4 py-3 align-top text-muted-foreground md:table-cell">{row.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mx-auto mt-4 max-w-4xl text-sm text-muted-foreground">
            Los ratios pueden variar según la marca y la formulación. Consulta siempre la ficha técnica del fabricante antes de usar
            cualquier producto químico.
          </p>
        </Section>

        <Suspense fallback={<Placeholder />}>
          <Section tone="card" aria-labelledby="faq-title">
            <SectionHeader id="faq-title" eyebrow="Preguntas frecuentes" title="Preguntas sobre la dilución de productos" />
            <FaqList items={dilutionFAQs} withSchema />
          </Section>
          <CtaBand
            title="¿Quieres aprenderlo en el taller?"
            text="En el curso de detailing trabajas con productos profesionales y aprendes a elegir y diluir cada uno según la superficie y la suciedad."
            primaryLabel="Ver el curso de detailing"
            primaryHref="/curso-detailing-profesional"
          />
        </Suspense>
      </MainLayout>
    </>
  );
}

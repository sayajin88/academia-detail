import { MainLayout } from '@/components/layout/MainLayout';
import { SEO } from '@/components/SEO';
import { seoConfig } from '@/utils/seoConfig';
import { VisualDilutionCalculator } from '@/components/glossary/VisualDilutionCalculator';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Beaker, AlertTriangle, TrendingUp, Shield, Droplets, HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

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

const CalculadoraDilucion = () => {
  const seo = seoConfig.calculadoraDilucion;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": dilutionFAQs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculadora de Dilución para Detailing",
    "description": "Herramienta interactiva gratuita para calcular la dilución exacta de productos químicos de car detailing profesional.",
    "url": `${BASE_URL}/calculadora-dilucion-detailing`,
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR"
    },
    "creator": {
      "@type": "Organization",
      "name": "Academia Detail",
      "url": BASE_URL
    },
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "softwareVersion": "1.0",
    "inLanguage": "es"
  };

  return (
    <MainLayout>
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        url={seo.url}
        schema={[...seo.schema, faqSchema, webAppSchema]}
      />

      {/* Hero */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <Beaker className="h-4 w-4" />
              Herramienta Gratuita e Interactiva
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-foreground mb-4 leading-tight">
              Calculadora de Dilución para{' '}
              <span className="text-primary">Productos de Detailing</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Calcula la mezcla exacta de cualquier producto químico de car detailing. 
              Ratios visuales para APC, champú, desengrasante, limpiacristales y más. 
              Sin errores, sin desperdiciar producto.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section id="calculadora" className="pb-16 md:pb-20">
        <div className="container mx-auto px-4">
          <VisualDilutionCalculator />
        </div>
      </section>

      {/* Educational Content: Cómo Diluir */}
      <AnimatedSection animation="fade-up">
        <section className="py-16 bg-card/30 border-y border-border/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                Cómo Diluir Productos de Detailing Correctamente
              </h2>

              <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
                <p>
                  La dilución correcta de los productos químicos es una de las habilidades fundamentales que todo <strong className="text-foreground">detailer profesional</strong> debe dominar. 
                  No se trata solo de añadir agua a un producto: un ratio de mezcla incorrecto puede arruinar una superficie, desperdiciar producto costoso o incluso poner en riesgo tu salud.
                </p>

                <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
                  <div className="bg-card/50 rounded-xl border border-border p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-destructive/10">
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                      </div>
                      <h3 className="font-bold text-foreground text-lg">Por qué importa la dilución exacta</h3>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Un producto demasiado concentrado puede atacar la pintura, decolorar plásticos o dañar cuero. 
                      Muchos APC profesionales tienen un pH alcalino que, sin diluir, puede grabar la superficie de forma permanente. 
                      Además, los productos concentrados generan más residuo y son más difíciles de aclarar, dejando marcas visibles al secarse.
                    </p>
                  </div>

                  <div className="bg-card/50 rounded-xl border border-border p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-accent/20">
                        <TrendingUp className="h-5 w-5 text-accent-foreground" />
                      </div>
                      <h3 className="font-bold text-foreground text-lg">Consecuencias de una dilución incorrecta</h3>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Si diluyes demasiado, el producto pierde poder de limpieza y necesitarás varias pasadas —lo que consume más tiempo y más producto del necesario. 
                      Si usas muy poco agua, además del riesgo de daño, estás tirando dinero: un litro de APC concentrado puede rendir hasta 100 litros diluido. 
                      Dominar los ratios es dominar la rentabilidad de tu taller.
                    </p>
                  </div>
                </div>

                <p>
                  En el <strong className="text-foreground">detailing profesional</strong>, cada producto tiene un ratio recomendado por el fabricante, 
                  pero la experiencia te enseña a ajustar según el nivel de suciedad, el tipo de superficie y las condiciones ambientales. 
                  Nuestra calculadora de dilución te permite visualizar y calcular esas proporciones al instante, 
                  tanto para los presets más comunes como para ratios personalizados.
                </p>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Ratio Table */}
      <AnimatedSection animation="fade-up" delay={100}>
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                  Tabla de Ratios de Dilución por Producto
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Referencia rápida con los ratios de dilución más utilizados en un taller de detailing profesional. 
                  Estos valores son orientativos — consulta siempre la ficha técnica de tu producto.
                </p>
              </div>

              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-card/80 border-b border-border">
                      <th className="text-left py-3.5 px-4 font-semibold text-foreground">
                        <div className="flex items-center gap-2">
                          <Droplets className="h-4 w-4 text-primary" />
                          Tipo de Producto
                        </div>
                      </th>
                      <th className="text-center py-3.5 px-4 font-semibold text-foreground">Ratio Común</th>
                      <th className="text-left py-3.5 px-4 font-semibold text-foreground hidden md:table-cell">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-primary" />
                          Uso Recomendado
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dilutionTable.map((row, i) => (
                      <tr key={i} className={`border-b border-border/50 ${i % 2 === 0 ? 'bg-card/30' : 'bg-transparent'} hover:bg-primary/5 transition-colors`}>
                        <td className="py-3 px-4 font-medium text-foreground">{row.product}</td>
                        <td className="py-3 px-4 text-center">
                          <span className="inline-flex px-2.5 py-1 rounded-full bg-primary/10 text-primary font-semibold text-xs border border-primary/20">
                            {row.ratio}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground hidden md:table-cell">{row.use}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-xs text-muted-foreground mt-4 text-center italic">
                ⚠️ Los ratios indicados son orientativos y pueden variar según la marca y la formulación del producto. 
                Consulta siempre la ficha técnica del fabricante antes de usar cualquier producto químico.
              </p>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* FAQ */}
      <AnimatedSection animation="fade-up" delay={150}>
        <section className="py-16 bg-card/30 border-y border-border/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-4">
                  <HelpCircle className="h-3.5 w-3.5" />
                  Preguntas Frecuentes
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Preguntas Frecuentes sobre Dilución de Productos
                </h2>
              </div>

              <Accordion type="single" collapsible className="space-y-3">
                {dilutionFAQs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="bg-card/50 border border-border rounded-xl px-5 data-[state=open]:border-primary/30">
                    <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary text-sm md:text-base py-4">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            ¿Quieres dominar estas técnicas en la práctica?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            En Academia Detail aprenderás a usar todos estos productos de forma profesional, en un taller real con vehículos de alta gama.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/curso-detailing-profesional"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
            >
              Ver cursos disponibles
            </a>
            <a
              href="/contacto"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-card border border-border text-foreground font-semibold hover:border-primary/30 transition-colors"
            >
              Solicitar información
            </a>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default CalculadoraDilucion;

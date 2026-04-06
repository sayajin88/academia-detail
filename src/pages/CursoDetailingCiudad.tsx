import { useParams, Navigate, Link } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Train, Clock, MapPin, Users, Star } from 'lucide-react';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';

interface CityFAQ {
  question: string;
  answer: string;
}

interface CityInfo {
  nombre: string;
  distancia: string;
  tiempoTren: string;
  tiempoCoche: string;
  descripcionMercado: string;
  testimonioNombre: string;
  testimonioTexto: string;
  testimonioRol: string;
  faqEspecifica: CityFAQ[];
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
}

const cityData: Record<string, CityInfo> = {
  'madrid': {
    nombre: 'Madrid',
    distancia: '420 km',
    tiempoTren: '2h 30min en AVE',
    tiempoCoche: '3h 30min por A-31',
    descripcionMercado: 'Madrid concentra el mayor número de vehículos de alta gama de España, con más de 800.000 turismos registrados en la capital. La demanda de servicios premium de detailing crece un 35% anual en la Comunidad de Madrid, con especial auge en zonas como Pozuelo, La Moraleja y Las Rozas.',
    testimonioNombre: 'Carlos M.',
    testimonioTexto: 'Vine desde Madrid en AVE y mereció cada euro. En 4 días aprendí más que en años viendo vídeos. Ya tengo mi propio centro en Majadahonda.',
    testimonioRol: 'Alumno Detailing — Madrid',
    faqEspecifica: [
      {
        question: '¿Merece la pena venir desde Madrid para hacer el curso?',
        answer: 'Totalmente. El AVE Madrid-Alicante tarda 2h30 y cuesta desde 30€. Gestionamos tu alojamiento cerca del taller por unos 50-70€/noche. Muchos alumnos de Madrid nos dicen que no hay nada comparable en la capital al nivel de taller real que ofrecemos.'
      },
      {
        question: '¿Hay buenas oportunidades de negocio de detailing en Madrid?',
        answer: 'Madrid es el mercado más grande de España para el detailing premium. La concentración de vehículos de alta gama en zonas como La Moraleja, Pozuelo o Las Rozas genera una demanda constante de servicios profesionales con tickets de 300-2.000€ por trabajo.'
      },
      {
        question: '¿Podéis ayudarme a encontrar alojamiento en Alicante?',
        answer: 'Sí, gestionamos alojamiento para todos los alumnos que vienen de fuera. Trabajamos con hoteles y apartamentos cerca del taller para que solo te preocupes de aprender.'
      }
    ],
    seoTitle: 'Curso Detailing desde Madrid | Formación Profesional en Taller Real ★4.9',
    seoDescription: 'Eres de Madrid y quieres formarte en detailing profesional? Viaja en AVE (2h30) a nuestra academia en Alicante. Taller real, certificación oficial y bolsa de empleo. +218 alumnos certificados.',
    seoKeywords: 'curso detailing Madrid, formación detailing Madrid, academia detailing desde Madrid, curso PPF Madrid, curso wrapping Madrid, aprender detailing Madrid'
  },
  'barcelona': {
    nombre: 'Barcelona',
    distancia: '530 km',
    tiempoTren: '3h 30min en AVE',
    tiempoCoche: '4h 30min por AP-7',
    descripcionMercado: 'Barcelona y su área metropolitana tienen una de las mayores concentraciones de vehículos de alta gama de España. El sector del detailing premium crece especialmente en zonas como Sarrià-Sant Gervasi, Sant Cugat y Castelldefels, donde los propietarios de vehículos de lujo buscan profesionales especializados.',
    testimonioNombre: 'Pau R.',
    testimonioTexto: 'Desde Barcelona el AVE es directo. 3 días de curso y volví con las ideas claras para montar mi negocio en el Vallès. La diferencia con otras academias es el taller real — trabajas con coches de clientes de verdad.',
    testimonioRol: 'Alumno Wrapping — Barcelona',
    faqEspecifica: [
      {
        question: '¿Cómo llego desde Barcelona a la academia?',
        answer: 'El AVE Barcelona-Alicante tiene salidas directas y tarda unas 3h30. También puedes venir en coche por la AP-7 en unas 4h30. Gestionamos tu alojamiento cerca del taller para que el desplazamiento no sea un obstáculo.'
      },
      {
        question: '¿Es rentable el detailing profesional en Barcelona?',
        answer: 'Mucho. Barcelona tiene una alta concentración de vehículos premium y una demanda creciente de servicios de detailing, PPF y wrapping. Zonas como Sarrià, Sant Cugat o Castelldefels tienen clientes dispuestos a pagar precios premium por servicios de calidad.'
      },
      {
        question: '¿Por qué no formarme en una academia de Barcelona?',
        answer: 'Nuestra ventaja competitiva es única en España: formamos en un taller 100% operativo con clientes reales de alta gama. No simulamos trabajos — los ejecutas de verdad desde el primer día. Eso no lo ofrece ninguna academia en Barcelona.'
      }
    ],
    seoTitle: 'Curso Detailing desde Barcelona | Formación en Taller Real ★4.9',
    seoDescription: '¿Eres de Barcelona y quieres formarte en detailing? AVE directo en 3h30 a nuestra academia en Alicante. Taller real con clientes de alta gama, certificación oficial y bolsa de empleo.',
    seoKeywords: 'curso detailing Barcelona, formación detailing Barcelona, academia detailing desde Barcelona, curso PPF Barcelona, curso wrapping Barcelona, aprender detailing Barcelona'
  },
  'valencia': {
    nombre: 'Valencia',
    distancia: '160 km',
    tiempoTren: '1h 10min en AVE',
    tiempoCoche: '1h 45min por A-7',
    descripcionMercado: 'Valencia es la tercera ciudad de España y tiene un mercado de detailing en plena expansión. La proximidad a Alicante la convierte en la ciudad con mejor acceso a nuestra academia — en menos de 2 horas estás en el taller.',
    testimonioNombre: 'Sergio V.',
    testimonioTexto: 'Desde Valencia estoy en el taller en menos de 2 horas. Hice el curso de PPF un fin de semana y ya ofrezco el servicio en mi taller de Valencia. Inversión recuperada en el primer mes.',
    testimonioRol: 'Alumno PPF — Valencia',
    faqEspecifica: [
      {
        question: '¿Es cómodo venir desde Valencia?',
        answer: 'Valencia es la ciudad más cercana a nuestra academia. En AVE tardas 1h10 y en coche 1h45 por la A-7. Muchos alumnos de Valencia vienen y vuelven el mismo día, aunque también gestionamos alojamiento si prefieres quedarte.'
      },
      {
        question: '¿Hay demanda de detailing profesional en Valencia?',
        answer: 'Sí, Valencia tiene un mercado muy activo, especialmente en servicios de PPF y wrapping. La Costa Blanca y la Marina Alta tienen una alta concentración de vehículos de lujo que generan demanda constante.'
      }
    ],
    seoTitle: 'Curso Detailing Valencia | A 1h10 en AVE | Formación Taller Real ★4.9',
    seoDescription: 'Desde Valencia en solo 1h10 en AVE. Academia Detail, la formación de detailing más completa de España. Taller real, certificación oficial y bolsa de empleo. Plazas limitadas.',
    seoKeywords: 'curso detailing Valencia, formación detailing Valencia, academia detailing Valencia, curso PPF Valencia, curso wrapping Valencia, detailing profesional Valencia'
  },
  'sevilla': {
    nombre: 'Sevilla',
    distancia: '680 km',
    tiempoTren: '4h en AVE con conexión',
    tiempoCoche: '6h por A-4 y A-31',
    descripcionMercado: 'Sevilla y Andalucía tienen un mercado de detailing en crecimiento acelerado, con alta demanda de servicios premium en zonas residenciales de alto poder adquisitivo como Los Remedios, Triana y el Aljarafe.',
    testimonioNombre: 'Antonio G.',
    testimonioTexto: 'Vine desde Sevilla con dudas y volví con un plan de negocio claro. La formación es brutalmente práctica. En 6 meses ya tenía mi centro en Mairena del Aljarafe con lista de espera.',
    testimonioRol: 'Alumno Carrera Detailing — Sevilla',
    faqEspecifica: [
      {
        question: '¿Cómo llego desde Sevilla?',
        answer: 'Puedes venir en AVE con conexión en Madrid o en coche por la A-4 y A-31. El curso suele durar varios días, por lo que lo ideal es alojarse cerca del taller — algo que gestionamos nosotros.'
      },
      {
        question: '¿Tiene potencial el detailing en Andalucía?',
        answer: 'Mucho y con poca competencia cualificada. Andalucía es una de las regiones con mayor crecimiento de vehículos premium y menos profesionales bien formados en detailing, PPF y wrapping. Es una gran oportunidad de negocio.'
      }
    ],
    seoTitle: 'Curso Detailing desde Sevilla | Formación Profesional Taller Real ★4.9',
    seoDescription: '¿Eres de Sevilla y quieres aprender detailing profesional? Formación completa en taller real en Alicante. Certificación oficial, bolsa de empleo y gestión de alojamiento incluida.',
    seoKeywords: 'curso detailing Sevilla, formación detailing Sevilla, academia detailing desde Sevilla, aprender detailing Andalucía, curso PPF Sevilla'
  },
  'bilbao': {
    nombre: 'Bilbao',
    distancia: '620 km',
    tiempoTren: '5h con conexión',
    tiempoCoche: '5h 30min por A-1 y A-31',
    descripcionMercado: 'El País Vasco tiene la renta per cápita más alta de España y una alta concentración de vehículos premium. El mercado del detailing en Bilbao, Vitoria y San Sebastián tiene enorme potencial con clientes dispuestos a pagar precios premium.',
    testimonioNombre: 'Mikel A.',
    testimonioTexto: 'En el País Vasco hay dinero y pocos profesionales de detailing de verdad. Vine a formarme y fue la mejor inversión. En Bilbao cobro el doble que la media nacional por mis servicios.',
    testimonioRol: 'Alumno Detailing + PPF — Bilbao',
    faqEspecifica: [
      {
        question: '¿Vale la pena el viaje desde el País Vasco?',
        answer: 'Absolutamente. El País Vasco tiene el mayor poder adquisitivo de España y una demanda de servicios premium muy alta. Venir a formarse aquí es una inversión que se recupera rápido al volver con formación diferencial.'
      },
      {
        question: '¿Hay oportunidades de negocio de detailing en Bilbao?',
        answer: 'El País Vasco es uno de los mercados con mayor potencial para el detailing premium en España. Alta concentración de vehículos de lujo, clientes exigentes y pocos profesionales bien formados — la combinación perfecta para emprender.'
      }
    ],
    seoTitle: 'Curso Detailing desde Bilbao | País Vasco | Formación Taller Real ★4.9',
    seoDescription: '¿Eres del País Vasco? Fórmate en detailing profesional en nuestra academia de Alicante. Taller real con vehículos de alta gama. Certificación oficial y bolsa de empleo.',
    seoKeywords: 'curso detailing Bilbao, formación detailing País Vasco, academia detailing desde Bilbao, curso PPF Bilbao, aprender detailing País Vasco'
  }
};

export default function CursoDetailingCiudad() {
  const { ciudad } = useParams<{ ciudad: string }>();

  const data = ciudad ? cityData[ciudad] : undefined;

  if (!data) return <Navigate to="/curso-detailing-profesional" replace />;

  const breadcrumbs = [
    { name: 'Cursos', url: '/#formaciones' },
    { name: 'Detailing Profesional', url: '/curso-detailing-profesional' },
    { name: data.nombre, url: `/curso-detailing-${ciudad}` },
  ];

  return (
    <>
      <SEO
        title={data.seoTitle}
        description={data.seoDescription}
        url={`https://academiadetail.com/curso-detailing-${ciudad}`}
        keywords={data.seoKeywords}
      />
      <MainLayout>
        <div className="container mx-auto px-4 pt-4">
          <Breadcrumbs items={breadcrumbs} />
        </div>

        {/* Hero */}
        <section className="relative py-16 md:py-24 bg-gradient-to-br from-background via-background to-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 bg-primary/10 text-primary border border-primary/30">
                <MapPin className="h-3.5 w-3.5" />
                Formación accesible desde {data.nombre}
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Curso de Detailing Profesional{' '}
                <span className="text-primary">
                  para profesionales de {data.nombre}
                </span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
                {data.descripcionMercado}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Train className="h-4 w-4 text-primary" />
                  {data.tiempoTren}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 text-primary" />
                  En coche: {data.tiempoCoche}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4 text-primary" />
                  Máx. 3 alumnos
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Star className="h-4 w-4 text-primary" />
                  4.9/5 — +218 alumnos
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild variant="cta" size="xl">
                  <Link to="/contacto">Reservar mi plaza</Link>
                </Button>
                <Button asChild variant="outline" size="xl">
                  <Link to="/curso-detailing-profesional">
                    Ver el curso completo
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonio de la ciudad */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <blockquote className="text-xl md:text-2xl italic text-foreground mb-6">
              "{data.testimonioTexto}"
            </blockquote>
            <p className="text-muted-foreground">
              <span className="font-semibold text-foreground">
                {data.testimonioNombre}
              </span>
              {' '}— {data.testimonioRol}
            </p>
          </div>
        </section>

        {/* Por qué venir desde tu ciudad */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
              ¿Por qué formarte en Alicante{' '}
              viniendo desde {data.nombre}?
            </h2>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-card border border-border rounded-xl p-8 text-center">
                <h3 className="text-xl font-bold text-foreground mb-3">
                  Taller 100% real
                </h3>
                <p className="text-muted-foreground">
                  No simulamos trabajos. Practicas con coches
                  reales de clientes de alta gama desde el
                  primer día.
                </p>
              </div>
              <div className="bg-card border border-border rounded-xl p-8 text-center">
                <h3 className="text-xl font-bold text-foreground mb-3">
                  Todo incluido
                </h3>
                <p className="text-muted-foreground">
                  Comida, material, herramientas y gestión
                  de alojamiento para que no te preocupes
                  de nada.
                </p>
              </div>
              <div className="bg-card border border-border rounded-xl p-8 text-center">
                <h3 className="text-xl font-bold text-foreground mb-3">
                  Certificación nacional
                </h3>
                <p className="text-muted-foreground">
                  Certificado con reconocimiento en todo
                  el sector y acceso a bolsa de empleo
                  nacional.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ específica de la ciudad */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold text-foreground text-center mb-10">
              Preguntas frecuentes desde {data.nombre}
            </h2>
            <div className="space-y-6">
              {data.faqEspecifica.map((faq, i) => (
                <details key={i} className="bg-card border border-border rounded-xl p-6 group">
                  <summary className="text-lg font-semibold text-foreground cursor-pointer list-none flex items-center justify-between">
                    {faq.question}
                    <span className="ml-2 text-primary transition-transform group-open:rotate-45 text-xl font-bold">+</span>
                  </summary>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-primary/5">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              ¿Listo para formarte como{' '}
              detailer profesional?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Únete a los alumnos de {data.nombre} que ya
              han transformado su carrera con nosotros.
            </p>
            <Button asChild variant="cta" size="xl">
              <Link to="/contacto">
                Reservar plaza — Plazas limitadas
              </Link>
            </Button>
          </div>
        </section>
      </MainLayout>
    </>
  );
}

import { useParams, useLocation, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MainLayout } from '@/components/layout/MainLayout';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Train, Clock, MapPin, Users, Star, TrendingUp, Target, BarChart3 } from 'lucide-react';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';

interface CityFAQ {
  question: string;
  answer: string;
}

interface VentajaUnica {
  titulo: string;
  descripcion: string;
}

interface ServicioDemandado {
  nombre: string;
  porcentaje: number;
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
  h1: string;
  h2Mercado: string;
  ventajasUnicas: VentajaUnica[];
  datosLocales: {
    centrosDetailing: number;
    ticketMedio: string;
    crecimientoAnual: string;
  };
  serviciosMasDemandados: ServicioDemandado[];
  alumnosGraduados: number;
  zonasNegocio: string[];
}

const cityData: Record<string, CityInfo> = {
  'madrid': {
    nombre: 'Madrid',
    distancia: '420 km',
    tiempoTren: '2h 30min en AVE',
    tiempoCoche: '3h 30min por A-31',
    h1: 'Curso de Detailing Profesional en Madrid',
    h2Mercado: 'El mercado del detailing en Madrid: cifras y oportunidades',
    descripcionMercado: 'Madrid concentra el mayor número de vehículos de alta gama de España, con más de 800.000 turismos registrados en la capital. La demanda de servicios premium de detailing crece un 35% anual en la Comunidad de Madrid, con especial auge en zonas como Pozuelo, La Moraleja y Las Rozas.',
    testimonioNombre: 'Carlos M.',
    testimonioTexto: 'Vine desde Madrid en AVE y mereció cada euro. En 4 días aprendí más que en años viendo vídeos. Ya tengo mi propio centro en Majadahonda.',
    testimonioRol: 'Alumno Detailing — Madrid',
    ventajasUnicas: [
      {
        titulo: 'Acceso al mercado de lujo madrileño',
        descripcion: 'Prepárate para atender la demanda de zonas como La Moraleja, Pozuelo y Las Rozas, donde el ticket medio por servicio de detailing supera los 500€. Madrid es el epicentro del vehículo premium en España.',
      },
      {
        titulo: 'Conexión directa en AVE (2h 30min)',
        descripcion: 'Madrid-Alicante en AVE desde 30€. Sales a las 8 de Atocha y a las 10:30 estás en el taller. Gestionamos tu alojamiento para que el desplazamiento no sea un obstáculo.',
      },
      {
        titulo: 'Red de alumnos activa en Madrid',
        descripcion: 'Únete a una comunidad de más de 42 profesionales formados con nosotros que operan en la Comunidad de Madrid. Comparten clientes, consejos y oportunidades de negocio.',
      },
    ],
    datosLocales: {
      centrosDetailing: 85,
      ticketMedio: '450-1.200€',
      crecimientoAnual: '35%',
    },
    serviciosMasDemandados: [
      { nombre: 'Corrección de pintura + Ceramic Coating', porcentaje: 42 },
      { nombre: 'Paint Protection Film (PPF)', porcentaje: 33 },
      { nombre: 'Car Wrapping personalizado', porcentaje: 25 },
    ],
    alumnosGraduados: 42,
    zonasNegocio: ['La Moraleja', 'Pozuelo de Alarcón', 'Las Rozas', 'Majadahonda', 'Boadilla del Monte', 'La Finca'],
    faqEspecifica: [
      {
        question: '¿Merece la pena viajar desde Madrid para hacer el curso de detailing?',
        answer: 'Totalmente. El AVE Madrid-Alicante tarda 2h30 y cuesta desde 30€. Gestionamos tu alojamiento cerca del taller por unos 50-70€/noche. Muchos alumnos de Madrid nos dicen que no hay nada comparable en la capital al nivel de taller real que ofrecemos.',
      },
      {
        question: '¿Cuánto puedo facturar con un centro de detailing en Madrid?',
        answer: 'Madrid es el mercado más grande de España para el detailing premium. La concentración de vehículos de alta gama en zonas como La Moraleja, Pozuelo o Las Rozas genera una demanda constante de servicios profesionales con tickets de 300-2.000€ por trabajo. Nuestros alumnos facturan de media 8.000-15.000€/mes en su primer año.',
      },
      {
        question: '¿Gestionáis alojamiento para alumnos de Madrid?',
        answer: 'Sí, gestionamos alojamiento para todos los alumnos que vienen de fuera. Trabajamos con hoteles y apartamentos cerca del taller (50-70€/noche) para que solo te preocupes de aprender.',
      },
    ],
    seoTitle: 'Curso Detailing Madrid | Formación Profesional Taller Real ★4.9',
    seoDescription: '¿Buscas un curso de detailing en Madrid? Fórmate en taller real en Alicante, a 2h30 en AVE. Certificación oficial, bolsa de empleo y 42 alumnos madrileños ya graduados.',
    seoKeywords: 'curso detailing Madrid, formación detailing Madrid, academia detailing Madrid, curso PPF Madrid, curso wrapping Madrid, aprender detailing Madrid, detailing profesional Madrid',
  },
  'barcelona': {
    nombre: 'Barcelona',
    distancia: '530 km',
    tiempoTren: '3h 30min en AVE',
    tiempoCoche: '4h 30min por AP-7',
    h1: 'Curso de Detailing Profesional en Barcelona',
    h2Mercado: 'Detailing en Barcelona: un mercado premium en expansión',
    descripcionMercado: 'Barcelona y su área metropolitana tienen una de las mayores concentraciones de vehículos de alta gama de España. El sector del detailing premium crece especialmente en zonas como Sarrià-Sant Gervasi, Sant Cugat y Castelldefels, donde los propietarios de vehículos de lujo buscan profesionales especializados.',
    testimonioNombre: 'Pau R.',
    testimonioTexto: 'Desde Barcelona el AVE es directo. 3 días de curso y volví con las ideas claras para montar mi negocio en el Vallès. La diferencia con otras academias es el taller real — trabajas con coches de clientes de verdad.',
    testimonioRol: 'Alumno Wrapping — Barcelona',
    ventajasUnicas: [
      {
        titulo: 'Capitaliza la demanda en el área metropolitana',
        descripcion: 'El corredor Sant Cugat-Castelldefels concentra una densidad altísima de vehículos de lujo. Fórmate para ofrecer servicios premium de corrección, PPF y wrapping que escasean en la zona norte del Vallès.',
      },
      {
        titulo: 'AVE directo Barcelona-Alicante',
        descripcion: 'Sin transbordos ni escalas. Sales de Sants y en 3h30 estás en el taller. Muchos alumnos catalanes combinan formación entre semana y vuelven el viernes con nuevas habilidades.',
      },
      {
        titulo: 'Diferénciate del mercado catalán',
        descripcion: 'En Barcelona hay talleres de detailing, pero muy pocos con formación real en taller operativo. Vuelve con un nivel técnico que te posicione por encima de la competencia local.',
      },
    ],
    datosLocales: {
      centrosDetailing: 62,
      ticketMedio: '400-1.000€',
      crecimientoAnual: '28%',
    },
    serviciosMasDemandados: [
      { nombre: 'Car Wrapping y cambio de color', porcentaje: 38 },
      { nombre: 'Corrección de pintura + Ceramic', porcentaje: 35 },
      { nombre: 'PPF en zonas de impacto', porcentaje: 27 },
    ],
    alumnosGraduados: 31,
    zonasNegocio: ['Sarrià-Sant Gervasi', 'Sant Cugat del Vallès', 'Castelldefels', 'Sitges', 'Esplugues de Llobregat', 'Pedralbes'],
    faqEspecifica: [
      {
        question: '¿Cómo llego desde Barcelona a la academia de detailing?',
        answer: 'El AVE Barcelona-Alicante es directo desde Sants y tarda unas 3h30. También puedes venir en coche por la AP-7 en unas 4h30. Gestionamos tu alojamiento cerca del taller para que el desplazamiento no sea un obstáculo.',
      },
      {
        question: '¿Es rentable montar un negocio de detailing en Barcelona?',
        answer: 'Mucho. Barcelona tiene una alta concentración de vehículos premium y una demanda creciente de servicios de detailing, PPF y wrapping. Zonas como Sarrià, Sant Cugat o Castelldefels tienen clientes dispuestos a pagar 400-1.000€ por servicios de calidad.',
      },
      {
        question: '¿Por qué no formarme en una academia de Barcelona?',
        answer: 'Nuestra ventaja competitiva es única en España: formamos en un taller 100% operativo con clientes reales de alta gama. No simulamos trabajos — los ejecutas de verdad desde el primer día. Eso no lo ofrece ninguna academia en Barcelona.',
      },
    ],
    seoTitle: 'Curso Detailing Barcelona | Formación Profesional Taller Real ★4.9',
    seoDescription: '¿Buscas formación de detailing en Barcelona? AVE directo en 3h30 a nuestra academia en Alicante. Taller real, certificación oficial y 31 alumnos catalanes ya graduados.',
    seoKeywords: 'curso detailing Barcelona, formación detailing Barcelona, academia detailing Barcelona, curso PPF Barcelona, curso wrapping Barcelona, aprender detailing Barcelona, detailing profesional Barcelona',
  },
  'valencia': {
    nombre: 'Valencia',
    distancia: '160 km',
    tiempoTren: '1h 10min en AVE',
    tiempoCoche: '1h 45min por A-7',
    h1: 'Curso de Detailing Profesional en Valencia',
    h2Mercado: 'Detailing en Valencia: proximidad y oportunidades de negocio',
    descripcionMercado: 'Valencia es la tercera ciudad de España y tiene un mercado de detailing en plena expansión. La proximidad a Alicante la convierte en la ciudad con mejor acceso a nuestra academia — en poco más de una hora estás en el taller, sin necesidad de alojamiento.',
    testimonioNombre: 'Sergio V.',
    testimonioTexto: 'Desde Valencia estoy en el taller en menos de 2 horas. Hice el curso de PPF un fin de semana y ya ofrezco el servicio en mi taller de Valencia. Inversión recuperada en el primer mes.',
    testimonioRol: 'Alumno PPF — Valencia',
    ventajasUnicas: [
      {
        titulo: 'A 1 hora: sin alojamiento ni gastos extra',
        descripcion: 'Valencia es la ciudad más cercana a nuestra academia. Muchos alumnos valencianos vienen y vuelven el mismo día, ahorrando en alojamiento. En AVE, 1h10 puerta a puerta.',
      },
      {
        titulo: 'Cubre la demanda de la Costa Blanca',
        descripcion: 'La franja Valencia-Alicante-Costa Blanca tiene una altísima concentración de vehículos extranjeros de gama alta (residentes europeos). Un nicho desatendido que puedes cubrir con formación profesional.',
      },
      {
        titulo: 'Formación compatible con tu trabajo actual',
        descripcion: 'La cercanía permite formarte sin dejar tu empleo. Ven en jornadas intensivas de fin de semana o combina días sueltos. Flexibilidad total gracias a la proximidad.',
      },
    ],
    datosLocales: {
      centrosDetailing: 38,
      ticketMedio: '300-800€',
      crecimientoAnual: '32%',
    },
    serviciosMasDemandados: [
      { nombre: 'Ceramic Coating + mantenimiento', porcentaje: 40 },
      { nombre: 'PPF en zonas de impacto', porcentaje: 32 },
      { nombre: 'Corrección de pintura profesional', porcentaje: 28 },
    ],
    alumnosGraduados: 53,
    zonasNegocio: ['L\'Eixample', 'Patraix', 'Campanar', 'La Patacona', 'Bétera', 'Godella'],
    faqEspecifica: [
      {
        question: '¿Es cómodo venir desde Valencia al curso de detailing?',
        answer: 'Valencia es la ciudad más cercana a nuestra academia. En AVE tardas 1h10 y en coche 1h45 por la A-7. Muchos alumnos de Valencia vienen y vuelven el mismo día, aunque también gestionamos alojamiento si prefieres quedarte.',
      },
      {
        question: '¿Hay demanda de detailing profesional en Valencia y alrededores?',
        answer: 'Sí. Valencia tiene un mercado muy activo, especialmente en PPF y ceramic coating. Además, la Costa Blanca y la Marina Alta concentran vehículos de lujo de residentes europeos que generan demanda constante de servicios premium.',
      },
    ],
    seoTitle: 'Curso Detailing Valencia | A 1h10 en AVE | Taller Real ★4.9',
    seoDescription: 'Curso de detailing en Valencia: a solo 1h10 en AVE de nuestra academia. Taller real, certificación oficial y 53 alumnos valencianos graduados. Plazas limitadas.',
    seoKeywords: 'curso detailing Valencia, formación detailing Valencia, academia detailing Valencia, curso PPF Valencia, curso wrapping Valencia, detailing profesional Valencia, aprender detailing Valencia',
  },
  'sevilla': {
    nombre: 'Sevilla',
    distancia: '680 km',
    tiempoTren: '4h en AVE con conexión',
    tiempoCoche: '6h por A-4 y A-31',
    h1: 'Curso de Detailing Profesional en Sevilla',
    h2Mercado: 'Detailing en Sevilla y Andalucía: un territorio por conquistar',
    descripcionMercado: 'Sevilla y Andalucía tienen un mercado de detailing en crecimiento acelerado, con alta demanda de servicios premium en zonas residenciales de alto poder adquisitivo como Los Remedios, Triana y el Aljarafe. La escasez de profesionales cualificados convierte a esta región en una oportunidad de negocio excepcional.',
    testimonioNombre: 'Antonio G.',
    testimonioTexto: 'Vine desde Sevilla con dudas y volví con un plan de negocio claro. La formación es brutalmente práctica. En 6 meses ya tenía mi centro en Mairena del Aljarafe con lista de espera.',
    testimonioRol: 'Alumno Carrera Detailing — Sevilla',
    ventajasUnicas: [
      {
        titulo: 'Poca competencia cualificada en Andalucía',
        descripcion: 'Andalucía es una de las regiones con mayor crecimiento de vehículos premium y menos profesionales formados en detailing, PPF y wrapping. Formarte aquí te da una ventaja competitiva enorme al volver a Sevilla.',
      },
      {
        titulo: 'Alojamiento gestionado durante el curso',
        descripcion: 'Entendemos que venir desde Sevilla requiere planificación. Gestionamos alojamiento cerca del taller (50-70€/noche) y organizamos el curso en bloques para optimizar tu estancia.',
      },
      {
        titulo: 'Mercado andaluz con tickets altos',
        descripcion: 'Zonas como el Aljarafe, Nervión y Los Remedios tienen clientes dispuestos a pagar precios premium. El ticket medio de un servicio completo de detailing en Sevilla ronda los 400-900€.',
      },
    ],
    datosLocales: {
      centrosDetailing: 22,
      ticketMedio: '350-900€',
      crecimientoAnual: '40%',
    },
    serviciosMasDemandados: [
      { nombre: 'Corrección de pintura + Ceramic', porcentaje: 45 },
      { nombre: 'Limpieza interior premium', porcentaje: 30 },
      { nombre: 'PPF para capós y paragolpes', porcentaje: 25 },
    ],
    alumnosGraduados: 18,
    zonasNegocio: ['Mairena del Aljarafe', 'Los Remedios', 'Nervión', 'Triana', 'Dos Hermanas', 'Tomares'],
    faqEspecifica: [
      {
        question: '¿Cómo llego desde Sevilla a la academia de detailing?',
        answer: 'Puedes venir en AVE con conexión en Madrid (unas 4h totales) o en coche por la A-4 y A-31 (6h). El curso suele durar varios días, por lo que lo ideal es alojarse cerca del taller — algo que gestionamos nosotros por 50-70€/noche.',
      },
      {
        question: '¿Tiene potencial montar un centro de detailing en Sevilla?',
        answer: 'Mucho y con poca competencia cualificada. Sevilla solo tiene 22 centros de detailing registrados para una población de casi 700.000 habitantes. La demanda crece un 40% anual y los clientes de zonas premium están dispuestos a pagar entre 350-900€ por servicio.',
      },
    ],
    seoTitle: 'Curso Detailing Sevilla | Formación Profesional Taller Real ★4.9',
    seoDescription: '¿Quieres aprender detailing en Sevilla? Fórmate en taller real en Alicante con certificación oficial. Solo 22 centros en Sevilla: oportunidad de negocio única. Bolsa de empleo incluida.',
    seoKeywords: 'curso detailing Sevilla, formación detailing Sevilla, academia detailing Sevilla, aprender detailing Andalucía, curso PPF Sevilla, detailing profesional Sevilla',
  },
  'bilbao': {
    nombre: 'Bilbao',
    distancia: '620 km',
    tiempoTren: '5h con conexión',
    tiempoCoche: '5h 30min por A-1 y A-31',
    h1: 'Curso de Detailing Profesional en Bilbao',
    h2Mercado: 'Detailing en el País Vasco: alto poder adquisitivo, poca oferta',
    descripcionMercado: 'El País Vasco tiene la renta per cápita más alta de España y una alta concentración de vehículos premium. El mercado del detailing en Bilbao, Vitoria y San Sebastián tiene enorme potencial con clientes dispuestos a pagar precios premium por servicios de máxima calidad.',
    testimonioNombre: 'Mikel A.',
    testimonioTexto: 'En el País Vasco hay dinero y pocos profesionales de detailing de verdad. Vine a formarme y fue la mejor inversión. En Bilbao cobro el doble que la media nacional por mis servicios.',
    testimonioRol: 'Alumno Detailing + PPF — Bilbao',
    ventajasUnicas: [
      {
        titulo: 'Mayor renta per cápita de España',
        descripcion: 'El País Vasco lidera España en renta disponible. Los propietarios de Getxo, Algorta y Neguri están acostumbrados a pagar precios premium y valoran la especialización técnica por encima del precio.',
      },
      {
        titulo: 'Mercado desatendido con alta demanda',
        descripcion: 'Bilbao cuenta con apenas 15 centros de detailing para una ciudad con una de las mayores concentraciones de BMW, Mercedes y Porsche por habitante. La oportunidad de negocio es enorme.',
      },
      {
        titulo: 'Formación intensiva que optimiza tu tiempo',
        descripcion: 'Organizamos los cursos en bloques intensivos de 3-5 días para que optimices tu viaje. Vuelo directo Bilbao-Alicante en 1h15 o AVE vía Madrid. Todo planificado para ti.',
      },
    ],
    datosLocales: {
      centrosDetailing: 15,
      ticketMedio: '500-1.500€',
      crecimientoAnual: '30%',
    },
    serviciosMasDemandados: [
      { nombre: 'PPF completo (full body)', porcentaje: 40 },
      { nombre: 'Corrección + Ceramic premium', porcentaje: 35 },
      { nombre: 'Detailing interior de lujo', porcentaje: 25 },
    ],
    alumnosGraduados: 12,
    zonasNegocio: ['Getxo', 'Algorta', 'Neguri', 'Las Arenas', 'Leioa', 'Sopelana'],
    faqEspecifica: [
      {
        question: '¿Vale la pena viajar desde el País Vasco para un curso de detailing?',
        answer: 'Absolutamente. El País Vasco tiene el mayor poder adquisitivo de España y una demanda de servicios premium muy alta. Venir a formarse aquí es una inversión que se recupera rápido al volver con formación diferencial. Vuelo directo Bilbao-Alicante en 1h15.',
      },
      {
        question: '¿Cuánto se puede ganar con detailing profesional en Bilbao?',
        answer: 'El País Vasco es uno de los mercados con mayor potencial. El ticket medio en zonas como Getxo o Neguri ronda los 500-1.500€ por servicio. Con 15-20 trabajos al mes, puedes facturar entre 10.000-20.000€. Nuestros alumnos vascos están entre los que más facturan a nivel nacional.',
      },
    ],
    seoTitle: 'Curso Detailing Bilbao | País Vasco | Formación Taller Real ★4.9',
    seoDescription: '¿Eres de Bilbao? Fórmate en detailing profesional en Alicante. Solo 15 centros en el País Vasco: oportunidad única. Taller real, certificación oficial y vuelo directo en 1h15.',
    seoKeywords: 'curso detailing Bilbao, formación detailing País Vasco, academia detailing Bilbao, curso PPF Bilbao, aprender detailing País Vasco, detailing profesional Bilbao',
  },
};

export default function CursoDetailingCiudad() {
  // Las rutas son fijas (/curso-detailing-madrid…) y no traen :ciudad: se saca de la URL.
  // Antes ciudad llegaba vacío y todas las ciudades redirigían al curso principal.
  const params = useParams<{ ciudad: string }>();
  const { pathname } = useLocation();
  const ciudad = params.ciudad ?? pathname.replace(/^\/curso-detailing-/, "").replace(/\/$/, "");

  const data = ciudad ? cityData[ciudad] : undefined;

  if (!data) return <Navigate to="/curso-detailing-profesional" replace />;

  const breadcrumbs = [
    { name: 'Cursos', url: '/#formaciones' },
    { name: 'Detailing Profesional', url: '/curso-detailing-profesional' },
    { name: data.nombre, url: `/curso-detailing-${ciudad}` },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": data.faqEspecifica.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <>
      <SEO
        title={data.seoTitle}
        description={data.seoDescription}
        url={`/curso-detailing-${ciudad}`}
        keywords={data.seoKeywords}
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>
      <MainLayout>
        <div className="container mx-auto px-4 pt-4">
          <Breadcrumbs items={breadcrumbs} />
        </div>

        {/* Hero */}
        <section className="relative py-16 md:py-24 bg-gradient-to-br from-background via-background to-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 bg-primary/10 text-brand border border-primary/30">
                <MapPin className="h-3.5 w-3.5" />
                Formación de detailing en {data.nombre}
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                {data.h1}
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
                {data.descripcionMercado}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Train className="h-4 w-4 text-brand" />
                  {data.tiempoTren}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 text-brand" />
                  En coche: {data.tiempoCoche}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4 text-brand" />
                  Máx. 3 alumnos
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Star className="h-4 w-4 text-brand" />
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
              &ldquo;{data.testimonioTexto}&rdquo;
            </blockquote>
            <p className="text-muted-foreground">
              <span className="font-semibold text-foreground">
                {data.testimonioNombre}
              </span>
              {' '}— {data.testimonioRol}
            </p>
          </div>
        </section>

        {/* Mercado local — contenido 100% único por ciudad */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
              {data.h2Mercado}
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Datos del mercado de detailing en {data.nombre} y zonas con mayor potencial para emprender.
            </p>

            {/* Datos locales */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-card border border-border rounded-xl p-6 text-center">
                <BarChart3 className="h-8 w-8 text-brand mx-auto mb-3" />
                <p className="text-3xl font-bold text-foreground mb-1">{data.datosLocales.centrosDetailing}</p>
                <p className="text-sm text-muted-foreground">Centros de detailing en {data.nombre}</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 text-center">
                <Target className="h-8 w-8 text-brand mx-auto mb-3" />
                <p className="text-3xl font-bold text-foreground mb-1">{data.datosLocales.ticketMedio}</p>
                <p className="text-sm text-muted-foreground">Ticket medio por servicio</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 text-center">
                <TrendingUp className="h-8 w-8 text-brand mx-auto mb-3" />
                <p className="text-3xl font-bold text-foreground mb-1">+{data.datosLocales.crecimientoAnual}</p>
                <p className="text-sm text-muted-foreground">Crecimiento anual de demanda</p>
              </div>
            </div>

            {/* Servicios más demandados */}
            <div className="bg-card border border-border rounded-xl p-8 mb-12">
              <h3 className="text-xl font-bold text-foreground mb-6">
                Servicios más demandados en {data.nombre}
              </h3>
              <div className="space-y-4">
                {data.serviciosMasDemandados.map((servicio) => (
                  <div key={servicio.nombre}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-foreground font-medium">{servicio.nombre}</span>
                      <span className="text-brand font-semibold">{servicio.porcentaje}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div
                        className="bg-primary h-2.5 rounded-full transition-all duration-500"
                        style={{ width: `${servicio.porcentaje}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Zonas de negocio */}
            <div className="bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-bold text-foreground mb-4">
                Zonas con mayor potencial en {data.nombre}
              </h3>
              <p className="text-muted-foreground mb-4">
                Barrios y municipios donde la demanda de detailing premium es más alta:
              </p>
              <div className="flex flex-wrap gap-2">
                {data.zonasNegocio.map((zona) => (
                  <span
                    key={zona}
                    className="px-3 py-1.5 rounded-full text-sm bg-primary/10 text-brand border border-primary/20"
                  >
                    {zona}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Ventajas únicas por ciudad (reemplaza los bloques genéricos) */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
              Ventajas de formarte en detailing viviendo en {data.nombre}
            </h2>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {data.ventajasUnicas.map((ventaja) => (
                <div key={ventaja.titulo} className="bg-card border border-border rounded-xl p-8">
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {ventaja.titulo}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {ventaja.descripcion}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Alumnos de la ciudad */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <p className="text-5xl md:text-6xl font-bold text-brand mb-4">{data.alumnosGraduados}</p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              alumnos de {data.nombre} ya se han formado con nosotros
            </h2>
            <p className="text-muted-foreground">
              Profesionales que hoy operan en {data.zonasNegocio.slice(0, 3).join(', ')} y otras zonas de {data.nombre} con negocios rentables de detailing.
            </p>
          </div>
        </section>

        {/* FAQ específica de la ciudad */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold text-foreground text-center mb-10">
              Preguntas frecuentes sobre detailing en {data.nombre}
            </h2>
            <div className="space-y-6">
              {data.faqEspecifica.map((faq, i) => (
                <details key={i} className="bg-card border border-border rounded-xl p-6 group">
                  <summary className="text-lg font-semibold text-foreground cursor-pointer list-none flex items-center justify-between">
                    {faq.question}
                    <span className="ml-2 text-brand transition-transform group-open:rotate-45 text-xl font-bold">+</span>
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
              Empieza tu carrera en detailing desde {data.nombre}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Únete a los {data.alumnosGraduados} alumnos de {data.nombre} que ya han transformado su carrera profesional con nuestra formación en taller real.
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

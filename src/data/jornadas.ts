// Jornadas de un día: Jornada Zero y Up Detail.
// Precios y preguntas frecuentes en un solo sitio (las páginas y el SEO leen de aquí).
import { SITE, STATS } from './site';

export const JORNADA_ZERO = {
  slug: 'jornada-zero-detailing',
  name: 'Jornada Zero',
  price: 97,
  duration: '1 día',
  schedule: 'de 10:00 a 18:00',
  contactHref: '/contacto?curso=jornada-zero-detailing',
} as const;

export const UP_DETAIL = {
  slug: 'up-detail-evento',
  name: 'Up Detail',
  price: 349,
  duration: '1 día intensivo',
} as const;

/** Nombre de la página que agrupa las dos jornadas (/curso-detailing-iniciacion) */
export const JORNADAS_HUB_NAME = 'Jornadas de iniciación';

interface Faq {
  question: string;
  answer: string;
}

export const jornadasHubFaqs: Faq[] = [
  {
    question: '¿Qué diferencia hay entre la Jornada Zero y Up Detail?',
    answer:
      'La Jornada Zero es un primer contacto con el detailing profesional: pasas el día en el taller de Detail Park con el equipo y practicas sobre un vehículo real. Up Detail es un formato intensivo para aprender lo máximo en el menor tiempo posible; es más una demostración, con Daniel López y profesionales invitados.',
  },
  {
    question: '¿Cuál me conviene si empiezo desde cero?',
    answer:
      'La Jornada Zero. Está pensada para quien nunca ha trabajado en un taller y quiere comprobar si el detailing es para él antes de apuntarse a un curso completo.',
  },
  {
    question: '¿Cuánto cuestan?',
    answer:
      'La Jornada Zero cuesta 97 € + IVA y Up Detail, 349 € + IVA. En los dos casos, si después haces un curso completo de la academia, el importe se descuenta.',
  },
  {
    question: '¿Cuándo son las próximas fechas?',
    answer:
      'Todavía no hay fechas cerradas. Escríbenos y te avisamos en cuanto las confirmemos, sin ningún compromiso.',
  },
  {
    question: '¿Y si ya tengo claro que quiero dedicarme al detailing?',
    answer:
      `Entonces puedes ir directamente al curso de detailing (4 días, en grupos de ${STATS.maxAlumnosGrupo} alumnos como máximo) o a la Carrera Detailing, que suma todas las especialidades y un módulo de negocio.`,
  },
];

export const jornadaZeroFaqs: Faq[] = [
  {
    question: '¿Necesito experiencia previa?',
    answer:
      'No. La Jornada Zero está pensada para quien parte de cero y quiere ver de cerca cómo se trabaja en un taller de detailing profesional antes de decidir si quiere formarse.',
  },
  {
    question: '¿Qué haré durante el día?',
    answer:
      'Por la mañana, teoría básica de productos y práctica sobre un vehículo real: lavado, descontaminación y limpieza interior. Por la tarde, una introducción al pulido con máquina y un turno de preguntas con el equipo.',
  },
  {
    question: '¿Qué incluye el precio?',
    answer:
      'Los 97 € + IVA incluyen la jornada completa en Detail Park, todo el material y los productos profesionales, la comida y el certificado de asistencia.',
  },
  {
    question: '¿Se descuenta si después hago un curso completo?',
    answer:
      'Sí. Si decides continuar con un curso completo de la academia, el importe de la Jornada Zero se descuenta del precio del curso.',
  },
  {
    question: '¿Saldré preparado para trabajar como detailer?',
    answer:
      'No es el objetivo. Es un primer contacto para que conozcas el oficio y decidas con criterio. Para trabajar de forma profesional están el curso de detailing (4 días) y la Carrera Detailing.',
  },
  {
    question: '¿Cuándo es la próxima Jornada Zero?',
    answer:
      'Todavía no hay fecha cerrada. Escríbenos por el formulario de contacto o por WhatsApp y te avisamos en cuanto la confirmemos. Pedir información no te compromete a nada.',
  },
  {
    question: '¿Qué tengo que llevar?',
    answer: 'Solo ropa cómoda que se pueda manchar. El material, las máquinas y los productos los ponemos nosotros.',
  },
  {
    question: '¿Dónde se hace?',
    answer: `En el taller de Detail Park: ${SITE.street}, ${SITE.postalCode} ${SITE.city}.`,
  },
];

export const upDetailFaqs: Faq[] = [
  {
    question: '¿Qué es Up Detail?',
    answer:
      'Un formato de formación pensado para aprender lo máximo posible en el menor tiempo posible. Es más una demostración que un curso y se suele hacer de forma intensiva en un día, en Detail Park (Alicante).',
  },
  {
    question: '¿En qué se diferencia de la Jornada Zero?',
    answer:
      'La Jornada Zero es un primer contacto para quien empieza de cero, con práctica guiada sobre un vehículo real. Up Detail condensa mucha técnica en una jornada intensiva, en formato de demostración y con profesionales invitados.',
  },
  {
    question: '¿Necesito experiencia previa?',
    answer:
      'No es imprescindible: lo aprovecharás tanto si empiezas como si ya trabajas en el sector. Si partes de cero del todo, la Jornada Zero es el punto de partida más suave.',
  },
  {
    question: '¿Cuánto cuesta?',
    answer:
      'Up Detail cuesta 349 € + IVA e incluye la jornada completa y el certificado de asistencia. Si después haces un curso completo de la academia, el importe se descuenta.',
  },
  {
    question: '¿Quiénes son los ponentes?',
    answer:
      'La organiza Daniel López, fundador de Detail Park, con profesionales invitados. Los ponentes de cada edición se anuncian junto con la fecha.',
  },
  {
    question: '¿Cuándo es la próxima edición?',
    answer:
      'Todavía no hay fecha. Apúntate a la lista de aviso de esta página y te escribiremos en cuanto la confirmemos.',
  },
  {
    question: '¿Apuntarme a la lista me compromete a algo?',
    answer:
      'No. Es gratis y sin compromiso: solo te escribimos para avisarte de la próxima edición. Puedes pedirnos que borremos tus datos cuando quieras.',
  },
];

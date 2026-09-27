import type { GlossaryTerm, GlossaryCategory } from '@/data/glossaryData';
import { categoryLabels } from '@/data/glossaryData';
import { FaqList } from '@/components/ds/FaqList';

const categoryActionVerbs: Record<GlossaryCategory, string> = {
  exterior: 'se trata o corrige',
  interior: 'se aplica o limpia',
  protecciones: 'se aplica o instala',
  herramientas: 'se utiliza correctamente',
  quimicos: 'se aplica o diluye',
  tecnicas: 'se ejecuta paso a paso',
};

const categoryTools: Record<GlossaryCategory, string> = {
  exterior: 'pulidora DA o rotativa, pads de corte y acabado, compound, polish y toallas de microfibra de alto GSM',
  interior: 'cepillos de cerdas suaves, limpiadores de pH neutro, extractor de tapicerías y tornador neumático',
  protecciones: 'aplicadores de suede, guantes de nitrilo, luces LED de inspección, toallas de levantado y cabina controlada',
  herramientas: 'backing plates compatibles, pads de diferentes durezas, lubricante de arcilla y toallas de secado twist loop',
  quimicos: 'pulverizadores con graduación, cubos con grit guard, guantes de protección y medidores de pH',
  tecnicas: 'pulidora orbital o rotativa, medidor de espesor de pintura, luces de inspección y panel de test',
};

export function generateFAQs(term: GlossaryTerm) {
  const cat = categoryLabels[term.category].toLowerCase();
  const action = categoryActionVerbs[term.category];
  const tools = categoryTools[term.category];

  return [
    {
      question: `¿Qué es ${term.term} en detailing profesional?`,
      answer: `${term.term} es un concepto de la categoría "${cat}" en el detailing profesional. ${term.definition}`,
    },
    {
      question: `¿Cómo ${action} ${term.term}?`,
      answer: `Para trabajar correctamente con ${term.term}, es fundamental conocer las técnicas adecuadas de la categoría "${cat}". ${term.definition} Un profesional formado sabrá aplicar este conocimiento de forma segura y eficiente.`,
    },
    {
      question: `¿Qué herramientas se necesitan para ${term.term}?`,
      answer: `Las herramientas habituales para trabajar con conceptos de "${cat}" incluyen: ${tools}. Dominar su uso correcto es clave para obtener resultados profesionales.`,
    },
  ];
}

/** Preguntas del término. Genera el marcado FAQPage (una sola vez en la página). */
export function GlossaryTermFAQ({ term }: { term: GlossaryTerm }) {
  return <FaqList items={generateFAQs(term)} withSchema />;
}

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Layers, FlaskConical, Sparkles, Wrench, Shield, Armchair } from 'lucide-react';
import { Section, SectionHeader } from '@/components/ds/Section';

const sections = [
  {
    id: 'pintura',
    icon: Layers,
    title: 'Morfología de la Pintura Moderna',
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          El acabado de un vehículo moderno consta de varias capas superpuestas, cada una con una función específica. El <strong className="text-foreground">barniz (clear coat)</strong> es la capa sobre la que trabaja directamente el detallador profesional.
        </p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Capa</TableHead>
              <TableHead>Espesor</TableHead>
              <TableHead>Función</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium text-foreground">Imprimación (Primer)</TableCell>
              <TableCell>10–20 µm</TableCell>
              <TableCell>Adhesión al metal y protección anticorrosiva</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-foreground">Base Coat (Color)</TableCell>
              <TableCell>15–25 µm</TableCell>
              <TableCell>Pigmentación y efecto visual del color</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-foreground">Clear Coat (Barniz)</TableCell>
              <TableCell>35–50 µm</TableCell>
              <TableCell>Brillo, protección UV y resistencia a la intemperie</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <p className="text-sm text-muted-foreground/80 italic">
          Un micrómetro (µm) equivale a la milésima parte de un milímetro. La corrección de pintura puede eliminar entre 1 y 5 µm por pasada.
        </p>
      </div>
    ),
  },
  {
    id: 'ph',
    icon: FlaskConical,
    title: 'Química de Superficies: pH y Tensioactivos',
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          El pH determina la agresividad de un producto de limpieza. Un detallador profesional debe seleccionar productos con el pH adecuado según el tipo de contaminante a eliminar.
        </p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rango pH</TableHead>
              <TableHead>Clasificación</TableHead>
              <TableHead>Uso típico</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium text-foreground">1–4</TableCell>
              <TableCell>Ácido fuerte</TableCell>
              <TableCell>Eliminadores de cal, sarro, óxido</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-foreground">5–6</TableCell>
              <TableCell>Ácido débil</TableCell>
              <TableCell>Eliminadores de contaminación férrica</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-foreground">7</TableCell>
              <TableCell>Neutro</TableCell>
              <TableCell>Champús de mantenimiento, quick detailers</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-foreground">8–11</TableCell>
              <TableCell>Alcalino débil</TableCell>
              <TableCell>APC (limpiadores multiusos), desengrasantes suaves</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-foreground">12–14</TableCell>
              <TableCell>Alcalino fuerte</TableCell>
              <TableCell>Desengrasantes industriales, limpiadores de motor</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    ),
  },
  {
    id: 'descontaminacion',
    icon: Sparkles,
    title: 'Descontaminación: Química y Mecánica',
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          La descontaminación profesional se ejecuta en dos fases secuenciales para preparar la superficie antes de cualquier corrección o protección:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg border border-border bg-background p-4">
            <h4 className="text-sm font-bold text-foreground mb-2">Fase 1 — Química</h4>
            <ul className="text-sm text-muted-foreground space-y-1.5">
              <li>• <strong className="text-foreground">Eliminadores de hierro</strong> (Iron Remover): reaccionan con partículas férricas incrustadas</li>
              <li>• <strong className="text-foreground">Disolventes de alquitrán</strong>: eliminan residuos de asfalto y brea</li>
              <li>• <strong className="text-foreground">Limpiadores ácidos</strong>: para depósitos minerales y cal</li>
            </ul>
          </div>
          <div className="rounded-lg border border-border bg-background p-4">
            <h4 className="text-sm font-bold text-foreground mb-2">Fase 2 — Mecánica</h4>
            <ul className="text-sm text-muted-foreground space-y-1.5">
              <li>• <strong className="text-foreground">Clay Bar</strong>: barra de arcilla sintética para arrastrar contaminantes adheridos</li>
              <li>• <strong className="text-foreground">Lubricación</strong>: imprescindible para evitar marring durante el proceso</li>
              <li>• <strong className="text-foreground">Alternativas</strong>: clay mitt, clay towel o discos de descontaminación</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'correccion',
    icon: Wrench,
    title: 'Ingeniería de la Corrección de Pintura',
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          La corrección de pintura sigue un proceso de tres etapas progresivas, cada una con un nivel decreciente de abrasividad:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="rounded-lg border border-border bg-background p-4 text-center">
            <span className="font-heading text-2xl text-brand">01</span>
            <h4 className="font-bold text-foreground text-sm mt-1 mb-1">Corte (Compound)</h4>
            <p className="text-xs text-muted-foreground">Eliminación de defectos profundos: arañazos, swirls, hologramas</p>
          </div>
          <div className="rounded-lg border border-border bg-background p-4 text-center">
            <span className="font-heading text-2xl text-brand">02</span>
            <h4 className="font-bold text-foreground text-sm mt-1 mb-1">Pulido (Polish)</h4>
            <p className="text-xs text-muted-foreground">Refinado de la superficie y eliminación de marcas del compound</p>
          </div>
          <div className="rounded-lg border border-border bg-background p-4 text-center">
            <span className="font-heading text-2xl text-brand">03</span>
            <h4 className="font-bold text-foreground text-sm mt-1 mb-1">Refinado (Jewelling)</h4>
            <p className="text-xs text-muted-foreground">Acabado ultra fino para máximo brillo y claridad de reflejo</p>
          </div>
        </div>
        <div className="mt-3">
          <h4 className="font-medium text-foreground text-sm mb-2">Tipos de pulidoras:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• <strong className="text-foreground">Rotativa</strong> — Máximo poder de corte, requiere experiencia</li>
            <li>• <strong className="text-foreground">Dual Action (DA)</strong> — Movimiento orbital aleatorio, más segura para principiantes</li>
            <li>• <strong className="text-foreground">Rotación forzada</strong> — Combina corte y seguridad, ideal para profesionales</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 'proteccion',
    icon: Shield,
    title: 'Nanotecnología en Protección',
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          Las protecciones modernas se basan en nanotecnología para crear capas invisibles de protección sobre la pintura. Cada tipo ofrece diferentes niveles de durabilidad y rendimiento:
        </p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Protección</TableHead>
              <TableHead>Durabilidad</TableHead>
              <TableHead>Características</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium text-foreground">Cera Carnauba</TableCell>
              <TableCell>1–3 meses</TableCell>
              <TableCell>Brillo cálido y profundo, aplicación sencilla, renovación frecuente</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-foreground">Sellador Sintético</TableCell>
              <TableCell>6–9 meses</TableCell>
              <TableCell>Mayor durabilidad que la cera, brillo frío y cristalino</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-foreground">Coating Cerámico (SiO₂)</TableCell>
              <TableCell>2–5+ años</TableCell>
              <TableCell>Dureza 9H (escala del lápiz, no Mohs), gran hidrofobicidad y protección UV</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-foreground">Grafeno</TableCell>
              <TableCell>3–7+ años</TableCell>
              <TableCell>Innovación reciente: mejor disipación térmica, anti-water spot</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    ),
  },
  {
    id: 'interiores',
    icon: Armchair,
    title: 'Detallado de Interiores y Sanitización',
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          El detallado interior va más allá de la limpieza estética: incluye la sanitización del habitáculo para eliminar bacterias, hongos y olores persistentes.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg border border-border bg-background p-4">
            <h4 className="text-sm font-bold text-foreground mb-2">Técnicas de Sanitización</h4>
            <ul className="text-sm text-muted-foreground space-y-1.5">
              <li>• <strong className="text-foreground">Ozono (O₃)</strong>: destruye microorganismos y neutraliza olores a nivel molecular</li>
              <li>• <strong className="text-foreground">Vapor seco</strong>: limpieza profunda sin productos químicos</li>
              <li>• <strong className="text-foreground">Limpiadores enzimáticos</strong>: descomponen materia orgánica causante de olores</li>
            </ul>
          </div>
          <div className="rounded-lg border border-border bg-background p-4">
            <h4 className="text-sm font-bold text-foreground mb-2">Materiales Especiales</h4>
            <ul className="text-sm text-muted-foreground space-y-1.5">
              <li>• <strong className="text-foreground">Alcántara</strong>: microfibra sintética que requiere cepillado con cerdas suaves</li>
              <li>• <strong className="text-foreground">Cuero</strong>: limpieza con pH neutro + acondicionamiento para evitar agrietamiento</li>
              <li>• <strong className="text-foreground">Plásticos</strong>: protección UV con dressings específicos (base agua vs silicona)</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
];

/** Conceptos básicos (acordeón cerrado para no alargar la página). */
export function GlossaryEducationalSections() {
  return (
    <Section tone="card" aria-labelledby="fundamentos-title">
      <SectionHeader
        id="fundamentos-title"
        eyebrow="Para empezar"
        title="Fundamentos del detailing"
        lead="Los conceptos que conviene tener claros antes de entrar en la terminología: capas de pintura, pH, descontaminación, corrección, protección e interiores."
      />
      <Accordion type="multiple" className="mx-auto max-w-3xl divide-y divide-border rounded-xl border border-border bg-background">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <AccordionItem key={section.id} value={section.id} className="border-0 px-5 md:px-6">
              <AccordionTrigger className="gap-4 py-5 text-left hover:no-underline hover:text-brand">
                <span className="flex items-center gap-3 text-base font-semibold text-foreground md:text-[1.0625rem]">
                  <Icon className="h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                  {section.title}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-[0.9375rem] leading-relaxed">{section.content}</AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </Section>
  );
}

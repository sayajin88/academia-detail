import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Layers, FlaskConical, Sparkles, Wrench, Shield, Armchair } from 'lucide-react';

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
          <div className="bg-background/50 rounded-lg p-4 border border-border/50">
            <h4 className="font-monument text-foreground text-sm uppercase tracking-wider mb-2">Fase 1 — Química</h4>
            <ul className="text-sm text-muted-foreground space-y-1.5">
              <li>• <strong className="text-foreground">Eliminadores de hierro</strong> (Iron Remover): reaccionan con partículas férricas incrustadas</li>
              <li>• <strong className="text-foreground">Disolventes de alquitrán</strong>: eliminan residuos de asfalto y brea</li>
              <li>• <strong className="text-foreground">Limpiadores ácidos</strong>: para depósitos minerales y cal</li>
            </ul>
          </div>
          <div className="bg-background/50 rounded-lg p-4 border border-border/50">
            <h4 className="font-monument text-foreground text-sm uppercase tracking-wider mb-2">Fase 2 — Mecánica</h4>
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
          <div className="bg-background/50 rounded-lg p-4 border border-border/50 text-center">
            <span className="text-2xl font-monument text-primary">01</span>
            <h4 className="font-bold text-foreground text-sm mt-1 mb-1">Corte (Compound)</h4>
            <p className="text-xs text-muted-foreground">Eliminación de defectos profundos: arañazos, swirls, hologramas</p>
          </div>
          <div className="bg-background/50 rounded-lg p-4 border border-border/50 text-center">
            <span className="text-2xl font-monument text-primary">02</span>
            <h4 className="font-bold text-foreground text-sm mt-1 mb-1">Pulido (Polish)</h4>
            <p className="text-xs text-muted-foreground">Refinado de la superficie y eliminación de marcas del compound</p>
          </div>
          <div className="bg-background/50 rounded-lg p-4 border border-border/50 text-center">
            <span className="text-2xl font-monument text-primary">03</span>
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
              <TableCell>Máxima dureza (9H Mohs), hidrofobicidad extrema, protección UV</TableCell>
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
          <div className="bg-background/50 rounded-lg p-4 border border-border/50">
            <h4 className="font-monument text-foreground text-sm uppercase tracking-wider mb-2">Técnicas de Sanitización</h4>
            <ul className="text-sm text-muted-foreground space-y-1.5">
              <li>• <strong className="text-foreground">Ozono (O₃)</strong>: destruye microorganismos y neutraliza olores a nivel molecular</li>
              <li>• <strong className="text-foreground">Vapor seco</strong>: limpieza profunda sin productos químicos</li>
              <li>• <strong className="text-foreground">Limpiadores enzimáticos</strong>: descomponen materia orgánica causante de olores</li>
            </ul>
          </div>
          <div className="bg-background/50 rounded-lg p-4 border border-border/50">
            <h4 className="font-monument text-foreground text-sm uppercase tracking-wider mb-2">Materiales Especiales</h4>
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

export function GlossaryEducationalSections() {
  return (
    <section className="py-10 md:py-14">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Fundamentos del <span className="text-primary">Detailing</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Antes de explorar el glosario, domina los conceptos fundamentales que todo detallador profesional debe conocer.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="multiple" className="space-y-3">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <AccordionItem
                  key={section.id}
                  value={section.id}
                  className="border border-border/60 rounded-xl bg-card/50 px-5 data-[state=open]:border-primary/30 transition-colors"
                >
                  <AccordionTrigger className="hover:no-underline gap-3 py-5">
                    <div className="flex items-center gap-3 text-left">
                      <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <Icon className="h-4.5 w-4.5 text-primary" />
                      </div>
                      <span className="font-bold text-foreground text-base md:text-lg">
                        {section.title}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 pt-1">
                    {section.content}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

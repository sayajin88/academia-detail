import { formations } from '@/data/formations';
import { FormationCard } from './FormationCard';
import { SectionHeading } from '@/components/shared/SectionHeading';

export function FormationsGrid() {
  return (
    <section id="formaciones" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <SectionHeading
          badge="Formaciones"
          title="Elige tu Especialidad"
          subtitle="Formación práctica y profesional en las técnicas más demandadas del sector del detailing automotriz"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {formations.map((formation) => (
            <FormationCard key={formation.id} formation={formation} />
          ))}
        </div>
      </div>
    </section>
  );
}

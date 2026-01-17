import { Check, Gift } from 'lucide-react';
import { FormationDetail } from '@/data/formationDetails';
import { SectionHeading } from '@/components/shared/SectionHeading';

interface FormationIncludesProps {
  formation: FormationDetail;
}

export function FormationIncludes({ formation }: FormationIncludesProps) {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <SectionHeading
          badge="Incluido"
          title="Todo Incluido en el Precio"
          subtitle="Sin costes ocultos ni sorpresas"
        />

        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {formation.includes.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
              >
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Check className="h-5 w-5" />
                </div>
                <span className="text-foreground font-medium">{item}</span>
              </div>
            ))}
          </div>

          {/* Bonus */}
          <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-primary/10 to-primary-glow/10 border border-primary/30">
            <div className="flex items-center gap-3 mb-3">
              <Gift className="h-6 w-6 text-primary" />
              <h3 className="text-lg font-bold text-foreground">Bonus Exclusivo</h3>
            </div>
            <p className="text-muted-foreground">
              Al finalizar la formación, recibirás acceso a nuestra comunidad privada de profesionales 
              donde podrás resolver dudas, compartir experiencias y hacer networking con otros detailers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

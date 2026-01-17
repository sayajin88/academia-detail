import { FormationDetail } from '@/data/formationDetails';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Quote } from 'lucide-react';

interface FormationInstructorProps {
  formation: FormationDetail;
}

export function FormationInstructor({ formation }: FormationInstructorProps) {
  if (!formation.instructor) return null;

  const { instructor } = formation;

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <SectionHeading
          badge="El Formador"
          title="Aprende de los mejores"
          subtitle="Formación impartida por profesionales con años de experiencia"
        />

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Instructor Image */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                <img
                  src={instructor.image}
                  alt={instructor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-center text-xs leading-tight">
                  +10 años<br />experiencia
                </span>
              </div>
            </div>

            {/* Instructor Info */}
            <div className="space-y-6">
              <div>
                <h3 className="text-3xl font-bold text-foreground mb-2">{instructor.name}</h3>
                <p className="text-primary font-medium">{instructor.role}</p>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                {instructor.description}
              </p>

              {/* Quote */}
              <div className="relative bg-card rounded-2xl p-6 border border-border/50">
                <Quote className="absolute -top-3 -left-3 w-8 h-8 text-primary" />
                <p className="text-foreground italic leading-relaxed pl-4">
                  "{instructor.quote}"
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center p-4 bg-card rounded-xl border border-border/50">
                  <span className="block text-2xl font-bold text-primary">+10</span>
                  <span className="text-xs text-muted-foreground">Años experiencia</span>
                </div>
                <div className="text-center p-4 bg-card rounded-xl border border-border/50">
                  <span className="block text-2xl font-bold text-primary">+1000</span>
                  <span className="text-xs text-muted-foreground">Coches tratados</span>
                </div>
                <div className="text-center p-4 bg-card rounded-xl border border-border/50">
                  <span className="block text-2xl font-bold text-primary">100%</span>
                  <span className="text-xs text-muted-foreground">Satisfacción</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

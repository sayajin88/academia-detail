import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { SectionHeading } from '@/components/shared/SectionHeading';
import danielImg from '@/assets/daniel-lopez-team.jpg';
import sergioImg from '@/assets/sergio-felipe.jpg';
import gerardoImg from '@/assets/gerardo-espinosa.jpg';

const teamMembers = [
  {
    name: 'Daniel López',
    role: 'Fundador & Instructor Principal',
    image: danielImg,
    alt: 'Daniel López - Fundador e instructor principal de Academia Detail y Detail Park',
    description:
      'Fundador de Detail Park y Academia Detail, Daniel combina más de 12 años de experiencia en detailing profesional con una visión empresarial única. Ha trabajado con marcas como Ferrari, Lamborghini y Porsche. Su metodología une la perfección técnica con la mentalidad de negocio rentable.',
    tags: ['Detailing', 'Gestión de Negocio', 'Instructor Principal'],
  },
  {
    name: 'Sergio Felipe',
    role: 'Instructor & Gestor de Centro',
    image: sergioImg,
    alt: 'Sergio Felipe - Instructor de detailing y gestión de centros en Academia Detail',
    description:
      'Experto en detailing con amplia experiencia práctica. Sergio domina la metodología de un centro de detailing y sabe gestionar todas sus áreas: desde la operativa diaria hasta la atención al cliente. Su visión de negocio complementa su técnica impecable.',
    tags: ['Detailing', 'Gestión de Centro', 'Atención al Cliente'],
  },
  {
    name: 'Gerardo Espinosa',
    role: 'Especialista en Wrapping & PPF',
    image: gerardoImg,
    alt: 'Gerardo Espinosa - Especialista en wrapping y PPF en Academia Detail',
    description:
      'Referente en rotulación, wrapping y PPF (Paint Protection Film). Gerardo es reconocido como uno de los profesionales con más expertis del sector. Su pasión por el detalle y la perfección en cada instalación le convierten en un instructor excepcional.',
    tags: ['Wrapping', 'PPF', 'Rotulación'],
  },
];

export function AboutTeam() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <AnimatedSection>
          <SectionHeading
            badge="Nuestro Equipo"
            title="Los Profesionales que Te Forman"
            subtitle="Conoce a los instructores que comparten su experiencia real contigo en cada formación."
          />
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <AnimatedSection key={member.name} delay={index * 150}>
              <div className="group h-full bg-card border border-border/50 rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500">
                {/* Photo */}
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.alt}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <h3 className="text-xl font-bold text-foreground">{member.name}</h3>
                  <p className="text-primary text-sm font-medium mb-4">{member.role}</p>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                    {member.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {member.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

import { 
  Wrench, 
  Paintbrush, 
  Shield, 
  Car, 
  Sparkles,
  Settings,
  CircleDot,
  Layers,
  Droplets,
  Gem,
  Armchair,
  SprayCan
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { FormationDetail } from '@/data/formationDetails';

interface FormationCurriculumProps {
  formation: FormationDetail;
}

const areaIcons: Record<string, React.ElementType> = {
  'Fundamentos y Aficionado': Wrench,
  'Pulidoras y Técnicas': Settings,
  'Sistema de Fases y Corrección': Layers,
  'Sellado y Protección': Shield,
  'Tratamiento Cerámico': Gem,
  'Interior de Vehículo': Armchair,
  'Corrección de Pintura': Paintbrush,
  'Lavado y Descontaminación': Droplets,
  'Protección y Acabado': SprayCan,
};

const areaColors: Record<string, string> = {
  'Fundamentos y Aficionado': 'from-blue-500/20 to-blue-600/20 border-blue-500/30',
  'Pulidoras y Técnicas': 'from-orange-500/20 to-orange-600/20 border-orange-500/30',
  'Sistema de Fases y Corrección': 'from-purple-500/20 to-purple-600/20 border-purple-500/30',
  'Sellado y Protección': 'from-green-500/20 to-green-600/20 border-green-500/30',
  'Tratamiento Cerámico': 'from-cyan-500/20 to-cyan-600/20 border-cyan-500/30',
  'Interior de Vehículo': 'from-amber-500/20 to-amber-600/20 border-amber-500/30',
};

const areaIconColors: Record<string, string> = {
  'Fundamentos y Aficionado': 'text-blue-400',
  'Pulidoras y Técnicas': 'text-orange-400',
  'Sistema de Fases y Corrección': 'text-purple-400',
  'Sellado y Protección': 'text-green-400',
  'Tratamiento Cerámico': 'text-cyan-400',
  'Interior de Vehículo': 'text-amber-400',
};

export function FormationCurriculum({ formation }: FormationCurriculumProps) {
  // Only show for detailing course with the expanded curriculum
  if (!formation.modules || formation.modules.length < 5) {
    return null;
  }

  const totalTopics = formation.modules.reduce((acc, mod) => acc + mod.topics.length, 0);

  return (
    <section className="py-20 bg-card relative overflow-hidden section-divider">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-primary-glow/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Car className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Temario Completo</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Todo lo que{' '}
            <span className="gradient-text">Aprenderás</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            {totalTopics}+ temas prácticos organizados en {formation.modules.length} módulos de formación intensiva.
            Desde los fundamentos hasta las técnicas más avanzadas.
          </p>
          
          {/* Quick stats */}
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-white/10">
              <CircleDot className="w-4 h-4 text-primary" />
              <span className="text-sm">{formation.modules.length} Módulos</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-white/10">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm">{totalTopics}+ Temas Prácticos</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-white/10">
              <Car className="w-4 h-4 text-primary" />
              <span className="text-sm">100% Práctico</span>
            </div>
          </div>
        </AnimatedSection>

        {/* Curriculum Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {formation.modules.map((module, index) => {
            const Icon = areaIcons[module.title] || Wrench;
            const colorClass = areaColors[module.title] || 'from-primary/20 to-primary-glow/20 border-primary/30';
            const iconColorClass = areaIconColors[module.title] || 'text-primary';
            
            return (
              <AnimatedSection 
                key={module.title}
                delay={100 * index}
              >
                <Card className={`h-full bg-gradient-to-br ${colorClass} border backdrop-blur-sm hover:scale-[1.02] transition-transform duration-300 group`}>
                  <CardContent className="p-6">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-background/50 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <Icon className={`w-6 h-6 ${iconColorClass}`} />
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground">Módulo {index + 1}</span>
                        <h3 className="font-bold text-lg leading-tight">{module.title}</h3>
                      </div>
                    </div>

                    {/* Topics */}
                    <ul className="space-y-2">
                      {module.topics.map((topic, topicIndex) => (
                        <li 
                          key={topicIndex}
                          className="flex items-start gap-2 text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors"
                        >
                          <span className={`flex-shrink-0 w-1.5 h-1.5 rounded-full ${iconColorClass.replace('text-', 'bg-')} mt-1.5`} />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <AnimatedSection delay={400} className="mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 px-6 py-4 rounded-2xl bg-card/80 backdrop-blur-sm border border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-semibold">¿Listo para dominar el Detailing?</p>
                <p className="text-sm text-muted-foreground">Aprenderás todo esto en solo 4 días de formación intensiva</p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

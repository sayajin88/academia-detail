import { SectionHeading } from '@/components/shared/SectionHeading';
import heroImage from '@/assets/heroes/hero-galeria.jpg';

export function AboutHero() {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary-glow/10 rounded-full blur-3xl" />

      <div className="container relative z-10">
        <SectionHeading
          badge="Desde 2017"
          title="Quiénes Somos"
          subtitle="Nacidos del taller, no del aula. Somos el único centro de formación en España que vive de verdad del Detailing, no de la formación."
        />
        
        {/* Tagline diferenciador */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 border border-primary/20">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm md:text-base font-medium text-primary">
              Academia Detail · Potenciada por Detail Park
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

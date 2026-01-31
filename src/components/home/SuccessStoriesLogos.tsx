import { SectionHeading } from '@/components/shared/SectionHeading';
import { Building2, MapPin, ExternalLink } from 'lucide-react';

// Placeholder logos - these would be replaced with real business logos from alumni
const successStories = [
  { name: 'AutoDetail Pro', city: 'Madrid', type: 'Centro de Detailing' },
  { name: 'Premium Wrap BCN', city: 'Barcelona', type: 'Wrapping & PPF' },
  { name: 'DetailMax Valencia', city: 'Valencia', type: 'Centro de Detailing' },
  { name: 'CarCare Sevilla', city: 'Sevilla', type: 'Lavado Premium' },
  { name: 'Elite Detailing', city: 'Bilbao', type: 'Detailing de Lujo' },
  { name: 'ProShine Málaga', city: 'Málaga', type: 'Centro de Detailing' },
  { name: 'DetailStudio', city: 'Zaragoza', type: 'Wrapping & Detailing' },
  { name: 'CarPerfection', city: 'Alicante', type: 'PPF & Cerámicos' },
];

export function SuccessStoriesLogos() {
  return (
    <section className="py-16 md:py-24 bg-muted/50 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeading
          badge="Casos de Éxito"
          title="Emprendedores que Hemos Formado"
          subtitle="Más de 50 empresarios han lanzado su negocio tras formarse con nosotros"
        />

        {/* Infinite scroll container */}
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-muted/50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-muted/50 to-transparent z-10 pointer-events-none" />

          {/* Scrolling logos - First row */}
          <div className="flex overflow-hidden mb-4">
            <div className="flex animate-[scroll_30s_linear_infinite] gap-4">
              {[...successStories, ...successStories].map((story, index) => (
                <div
                  key={`row1-${index}`}
                  className="flex-shrink-0 w-64 p-4 bg-card rounded-xl border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground truncate">{story.name}</h4>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {story.city}
                      </p>
                      <p className="text-xs text-primary mt-1">{story.type}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scrolling logos - Second row (reverse direction) */}
          <div className="flex overflow-hidden">
            <div className="flex animate-[scroll_35s_linear_infinite_reverse] gap-4">
              {[...successStories.slice(4), ...successStories.slice(0, 4), ...successStories.slice(4), ...successStories.slice(0, 4)].map((story, index) => (
                <div
                  key={`row2-${index}`}
                  className="flex-shrink-0 w-64 p-4 bg-card rounded-xl border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground truncate">{story.name}</h4>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {story.city}
                      </p>
                      <p className="text-xs text-primary mt-1">{story.type}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary stats */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary">+50</div>
            <div className="text-sm text-muted-foreground">Negocios Lanzados</div>
          </div>
          <div className="w-px h-12 bg-border hidden sm:block" />
          <div>
            <div className="text-3xl font-bold text-foreground">15+</div>
            <div className="text-sm text-muted-foreground">Ciudades de España</div>
          </div>
          <div className="w-px h-12 bg-border hidden sm:block" />
          <div>
            <div className="text-3xl font-bold text-foreground">85%</div>
            <div className="text-sm text-muted-foreground">Éxito Empresarial</div>
          </div>
        </div>
      </div>

      {/* CSS for infinite scroll animation */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}

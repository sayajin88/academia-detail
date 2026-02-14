import { Search, Navigation, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface DirectoryHeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onNearMe: () => void;
  isLocating: boolean;
  locationLabel?: string;
  locationContext?: string;
}

export function DirectoryHero({ searchQuery, onSearchChange, onNearMe, isLocating, locationLabel, locationContext }: DirectoryHeroProps) {
  const headline = locationLabel
    ? <>Centros de Detailing en{' '}<span className="text-primary">{locationLabel}</span></>
    : <>Encuentra tu{' '}<span className="text-primary">Detailer o Centro</span>{' '}Certificado</>;

  const subtitle = locationContext
    ? locationContext
    : 'Profesionales y centros formados en Academia Detail. Busca por ciudad o deja que te encontremos el más cercano.';

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(348_60%_34%/0.08),transparent_70%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary border border-primary/30">
            {locationLabel ? (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3 w-3" />
                {locationLabel}
              </span>
            ) : (
              'Directorio Profesional'
            )}
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            {headline}
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mt-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={locationLabel ? `Buscar en ${locationLabel}...` : 'Buscar por ciudad o provincia...'}
                className="pl-10 h-12 text-base bg-card border-border"
              />
            </div>
            <Button
              onClick={onNearMe}
              disabled={isLocating}
              variant="outline"
              className="h-12 gap-2 border-primary/30 hover:bg-primary/10 hover:text-primary"
            >
              <Navigation className={`h-4 w-4 ${isLocating ? 'animate-pulse' : ''}`} />
              {isLocating ? 'Localizando...' : 'Cerca de mí'}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

import { cn } from '@/lib/utils';
import { User, Building2 } from 'lucide-react';

const ALL_SERVICES = [
  'Pulido', 'Cerámico', 'Interior', 'PPF', 'Wrapping',
  'Restauración', 'Lavado Premium', 'Descontaminación',
];

const LEVELS = [
  { value: '', label: 'Todos' },
  { value: 'elite_detailer', label: '👑 Élite Detailer' },
  { value: 'master_detailer', label: '⭐ Master Detailer' },
  { value: 'certified_pro', label: '🛡️ Certificado Pro' },
];

const TYPES = [
  { value: '', label: 'Todos', icon: null },
  { value: 'detailer', label: 'Detailers', icon: User },
  { value: 'centro', label: 'Centros', icon: Building2 },
];

interface DirectoryFiltersProps {
  selectedServices: string[];
  onToggleService: (service: string) => void;
  selectedLevel: string;
  onLevelChange: (level: string) => void;
  selectedType: string;
  onTypeChange: (type: string) => void;
}

export function DirectoryFilters({
  selectedServices,
  onToggleService,
  selectedLevel,
  onLevelChange,
  selectedType,
  onTypeChange,
}: DirectoryFiltersProps) {
  return (
    <div className="space-y-4">
      {/* Type filter */}
      <div className="flex flex-wrap gap-2">
        {TYPES.map((type) => (
          <button
            key={type.value}
            onClick={() => onTypeChange(type.value)}
            className={cn(
              'px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border inline-flex items-center gap-1.5',
              selectedType === type.value
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground'
            )}
          >
            {type.icon && <type.icon className="h-3.5 w-3.5" />}
            {type.label}
          </button>
        ))}
      </div>

      {/* Level filter */}
      <div className="flex flex-wrap gap-2">
        {LEVELS.map((level) => (
          <button
            key={level.value}
            onClick={() => onLevelChange(level.value)}
            className={cn(
              'px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border',
              selectedLevel === level.value
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground'
            )}
          >
            {level.label}
          </button>
        ))}
      </div>

      {/* Services filter */}
      <div className="flex flex-wrap gap-2">
        {ALL_SERVICES.map((service) => (
          <button
            key={service}
            onClick={() => onToggleService(service)}
            className={cn(
              'px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border',
              selectedServices.includes(service)
                ? 'bg-primary/15 text-primary border-primary/40'
                : 'bg-card/50 text-muted-foreground border-border/50 hover:border-primary/30'
            )}
          >
            {service}
          </button>
        ))}
      </div>
    </div>
  );
}

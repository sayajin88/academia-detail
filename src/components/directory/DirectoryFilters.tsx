import { cn } from '@/lib/utils';
import { User, Building2, ChevronDown } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const ALL_SERVICES = [
  'Pulido', 'Cerámico', 'Interior', 'PPF', 'Wrapping',
  'Restauración', 'Lavado Premium', 'Descontaminación',
];

const LEVELS = [
  { value: '', label: 'Todos' },
  { value: 'elite_detailer', label: '👑 Élite' },
  { value: 'master_detailer', label: '⭐ Master' },
  { value: 'certified_pro', label: '🛡️ Pro' },
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

const chipBase = 'px-2.5 py-1 rounded-full text-xs font-semibold transition-all duration-200 border inline-flex items-center gap-1.5 cursor-pointer';
const chipActive = 'bg-primary text-primary-foreground border-primary';
const chipInactive = 'bg-transparent text-muted-foreground border-border hover:border-primary/40 hover:text-foreground';

export function DirectoryFilters({
  selectedServices,
  onToggleService,
  selectedLevel,
  onLevelChange,
  selectedType,
  onTypeChange,
}: DirectoryFiltersProps) {
  const serviceCount = selectedServices.length;

  return (
    <div className="w-full rounded-lg border border-border bg-card/80 backdrop-blur-sm px-3 py-2 flex flex-wrap items-center gap-2">
      {/* Type filter */}
      <div className="flex items-center gap-1">
        {TYPES.map((type) => (
          <button
            key={type.value}
            onClick={() => onTypeChange(type.value)}
            className={cn(chipBase, selectedType === type.value ? chipActive : chipInactive)}
          >
            {type.icon && <type.icon className="h-3 w-3" />}
            {type.label}
          </button>
        ))}
      </div>

      <Separator orientation="vertical" className="h-5 hidden md:block" />

      {/* Level filter */}
      <div className="flex items-center gap-1">
        {LEVELS.map((level) => (
          <button
            key={level.value}
            onClick={() => onLevelChange(level.value)}
            className={cn(chipBase, selectedLevel === level.value ? chipActive : chipInactive)}
          >
            {level.label}
          </button>
        ))}
      </div>

      <Separator orientation="vertical" className="h-5 hidden md:block" />

      {/* Services popover */}
      <Popover>
        <PopoverTrigger asChild>
          <button className={cn(chipBase, serviceCount > 0 ? chipActive : chipInactive, 'gap-1')}>
            Servicios
            {serviceCount > 0 && (
              <Badge variant="secondary" className="h-4 min-w-4 px-1 text-[10px] leading-none">
                {serviceCount}
              </Badge>
            )}
            <ChevronDown className="h-3 w-3" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-3 z-50 bg-popover" align="start" sideOffset={8}>
          <div className="flex flex-wrap gap-1.5 max-w-xs">
            {ALL_SERVICES.map((service) => (
              <button
                key={service}
                onClick={() => onToggleService(service)}
                className={cn(
                  chipBase,
                  selectedServices.includes(service)
                    ? 'bg-primary/15 text-primary border-primary/40'
                    : 'bg-card/50 text-muted-foreground border-border/50 hover:border-primary/30'
                )}
              >
                {service}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

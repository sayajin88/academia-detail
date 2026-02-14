import { Crown, Star, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DetailerBadgeProps {
  level: 'certified_pro' | 'master_detailer' | 'elite_detailer';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const badgeConfig = {
  elite_detailer: {
    label: 'Élite Detailer',
    icon: Crown,
    baseClass: 'text-[hsl(45,93%,10%)] shadow-[0_0_20px_hsl(45_93%_47%/0.4)]',
    shimmer: 'animate-shimmer-gold',
  },
  master_detailer: {
    label: 'Master Detailer',
    icon: Star,
    baseClass: 'text-white shadow-[0_0_15px_hsl(220_10%_50%/0.3)]',
    shimmer: 'animate-shimmer-silver',
  },
  certified_pro: {
    label: 'Certificado Pro',
    icon: Shield,
    baseClass: 'bg-primary/20 text-primary border border-primary/40',
    shimmer: '',
  },
};

const sizeConfig = {
  sm: 'text-[10px] px-2 py-0.5 gap-1',
  md: 'text-xs px-3 py-1 gap-1.5',
  lg: 'text-sm px-4 py-1.5 gap-2',
};

const iconSize = { sm: 'h-3 w-3', md: 'h-3.5 w-3.5', lg: 'h-4 w-4' };

export function DetailerBadge({ level, size = 'md', className }: DetailerBadgeProps) {
  const config = badgeConfig[level];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-bold uppercase tracking-wider whitespace-nowrap',
        sizeConfig[size],
        config.baseClass,
        config.shimmer,
        className
      )}
    >
      <Icon className={iconSize[size]} />
      {config.label}
    </span>
  );
}

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
    className: 'bg-gradient-to-r from-[hsl(45,93%,47%)] to-[hsl(45,93%,67%)] text-[hsl(45,93%,10%)] shadow-[0_0_20px_hsl(45_93%_47%/0.4)]',
  },
  master_detailer: {
    label: 'Master Detailer',
    icon: Star,
    className: 'bg-gradient-to-r from-[hsl(220,10%,45%)] to-[hsl(220,15%,70%)] text-white shadow-[0_0_15px_hsl(220_10%_50%/0.3)]',
  },
  certified_pro: {
    label: 'Certificado Pro',
    icon: Shield,
    className: 'bg-primary/20 text-primary border border-primary/40',
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
        config.className,
        className
      )}
    >
      <Icon className={iconSize[size]} />
      {config.label}
    </span>
  );
}

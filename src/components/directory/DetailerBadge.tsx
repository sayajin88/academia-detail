import { Star, Shield, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DetailerBadgeProps {
  level: 'member' | 'certified' | 'master';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const badgeConfig = {
  master: {
    label: 'Master',
    icon: Star,
    className: 'bg-gradient-to-r from-[hsl(45,93%,47%)] to-[hsl(45,93%,67%)] text-[hsl(45,93%,10%)] shadow-[0_0_20px_hsl(45_93%_47%/0.4)]',
  },
  certified: {
    label: 'Certified',
    icon: Shield,
    className: 'bg-gradient-to-r from-[hsl(210,10%,60%)] to-[hsl(210,10%,80%)] text-[hsl(210,10%,10%)] shadow-[0_0_15px_hsl(210_10%_60%/0.3)]',
  },
  member: {
    label: 'Member',
    icon: Award,
    className: 'bg-muted text-muted-foreground border border-border',
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

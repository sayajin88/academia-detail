import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Tone = 'default' | 'card' | 'brand';
type Decor = 'none' | 'glow' | 'grid';

interface SectionProps {
  id?: string;
  tone?: Tone;
  size?: 'md' | 'sm';
  width?: 'content' | 'narrow';
  /** Fondo decorativo: brillos burdeos o retícula sutil */
  decor?: Decor;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
  'aria-labelledby'?: string;
}

const toneClass: Record<Tone, string> = {
  default: 'bg-background',
  card: 'bg-card',
  brand: 'bg-primary text-primary-foreground',
};

const decorClass: Record<Decor, string> = {
  none: '',
  glow: 'ds-glow',
  grid: 'ds-grid-bg',
};

/** Bloque de página con los márgenes y anchos del sistema de diseño. */
export function Section({
  id,
  tone = 'default',
  size = 'md',
  width = 'content',
  decor = 'none',
  className,
  containerClassName,
  children,
  ...rest
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(toneClass[tone], decorClass[decor], size === 'md' ? 'ds-section' : 'ds-section-sm', 'scroll-mt-24', className)}
      {...rest}
    >
      <div className={cn(width === 'content' ? 'ds-container' : 'ds-narrow', containerClassName)}>{children}</div>
    </section>
  );
}

interface SectionHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  /** Parte final del título resaltada en degradado */
  accent?: string;
  lead?: ReactNode;
  align?: 'center' | 'left';
  as?: 'h1' | 'h2';
  id?: string;
  className?: string;
  /** Sobre fondo burdeos */
  onBrand?: boolean;
}

/** Antetítulo + título + entradilla. El mismo en todas las secciones. */
export function SectionHeader({
  eyebrow,
  title,
  accent,
  lead,
  align = 'center',
  as: Tag = 'h2',
  id,
  className,
  onBrand = false,
}: SectionHeaderProps) {
  const centered = align === 'center';
  return (
    <div className={cn('ds-reveal mb-10 flex flex-col gap-4 md:mb-14', centered ? 'items-center text-center' : 'items-start', className)}>
      {eyebrow && <p className={cn('ds-pill', onBrand && 'border-white/30 bg-white/10 text-white')}>{eyebrow}</p>}
      <Tag id={id} className={cn(Tag === 'h1' ? 'ds-h1' : 'ds-h2', 'text-foreground', onBrand && 'text-white', centered && 'max-w-3xl')}>
        {title}
        {accent && (
          <>
            {' '}
            <span className="ds-text-gradient">{accent}</span>
          </>
        )}
      </Tag>
      {lead && <p className={cn('ds-lead max-w-2xl', onBrand && 'text-white/85')}>{lead}</p>}
    </div>
  );
}

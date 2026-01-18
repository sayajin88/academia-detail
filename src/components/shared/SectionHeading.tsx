interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  /** Control heading level: 'h1' for page titles, 'h2' for sections (default) */
  titleAs?: 'h1' | 'h2';
}

export function SectionHeading({
  badge,
  title,
  subtitle,
  centered = true,
  light = false,
  titleAs = 'h2',
}: SectionHeadingProps) {
  const HeadingTag = titleAs;
  
  return (
    <div className={`mb-10 md:mb-14 ${centered ? 'text-center' : ''}`}>
      {badge && (
        <span
          className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 ${
            light
              ? 'bg-white/10 text-white/90 border border-white/20'
              : 'bg-primary/10 text-primary border border-primary/20'
          }`}
        >
          {badge}
        </span>
      )}
      <HeadingTag
        className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${
          light ? 'text-white' : 'text-foreground'
        }`}
      >
        {title}
      </HeadingTag>
      {subtitle && (
        <p
          className={`text-lg md:text-xl max-w-3xl ${centered ? 'mx-auto' : ''} ${
            light ? 'text-white/70' : 'text-muted-foreground'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
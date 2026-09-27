import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TocItem {
  id: string;
  title: string;
}

interface BlogTableOfContentsProps {
  items: TocItem[];
  /** `sidebar`: fijo en la columna lateral (escritorio). `collapsible`: desplegable (móvil). */
  variant?: 'sidebar' | 'collapsible';
}

/** Sección visible ahora mismo (para resaltarla en el índice). */
function useActiveSection(idList: string) {
  const [active, setActive] = useState('');
  useEffect(() => {
    const ids = idList ? idList.split('|') : [];
    if (!ids.length || typeof IntersectionObserver === 'undefined') return;
    // Se recalcula solo cuando una sección cruza la franja superior de la pantalla:
    // la activa es la última cuyo inicio ya ha pasado por arriba.
    const observer = new IntersectionObserver(
      () => {
        let current = ids[0];
        for (const id of ids) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= 140) current = id;
        }
        setActive(current);
      },
      { rootMargin: '-96px 0px -65% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [idList]);
  return active;
}

function TocList({ items, active }: { items: TocItem[]; active?: string }) {
  return (
    <ol className="flex flex-col gap-0.5 text-[0.9375rem] leading-snug">
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            aria-current={active === item.id ? 'location' : undefined}
            className={cn(
              '-ml-px block border-l-2 py-1.5 pl-4 pr-2 transition-colors',
              active === item.id
                ? 'border-brand font-semibold text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground',
            )}
          >
            {item.title}
          </a>
        </li>
      ))}
    </ol>
  );
}

export function BlogTableOfContents({ items, variant = 'sidebar' }: BlogTableOfContentsProps) {
  const active = useActiveSection(variant === 'sidebar' ? items.map((i) => i.id).join('|') : '');
  if (items.length < 2) return null;

  if (variant === 'collapsible') {
    return (
      <details className="ds-card group">
        <summary className="flex min-h-[48px] cursor-pointer list-none items-center justify-between gap-3 px-5 py-3 font-semibold text-foreground [&::-webkit-details-marker]:hidden">
          En este artículo
          <span className="flex items-center gap-2 text-sm font-normal text-muted-foreground">
            {items.length} apartados
            <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden="true" />
          </span>
        </summary>
        <nav aria-label="Índice del artículo" className="border-t border-border px-5 py-4">
          <div className="border-l border-border">
            <TocList items={items} />
          </div>
        </nav>
      </details>
    );
  }

  return (
    <nav aria-label="Índice del artículo" className="sticky top-24">
      <p className="ds-eyebrow mb-4">En este artículo</p>
      <div className="border-l border-border">
        <TocList items={items} active={active} />
      </div>
    </nav>
  );
}

import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-3">
      <ol className="flex items-center gap-1.5 text-sm text-muted-foreground flex-wrap">
        <li className="flex items-center gap-1.5">
          <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
            <Home className="h-3.5 w-3.5" />
            <span>Inicio</span>
          </Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
        </li>

        {items.map((item, index) => (
          <li key={item.url} className="flex items-center gap-1.5">
            {index === items.length - 1 ? (
              <span className="text-foreground font-medium" aria-current="page">
                {item.name}
              </span>
            ) : (
              <>
                <Link to={item.url} className="hover:text-primary transition-colors">
                  {item.name}
                </Link>
                <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

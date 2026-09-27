import { Beaker, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function BlogDilutionBanner() {
  return (
    <div className="my-10 rounded-xl border border-border bg-card/50 p-5 md:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-shrink-0 p-3 rounded-lg bg-primary/10 border border-primary/20">
          <Beaker className="h-6 w-6 text-brand" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-brand uppercase tracking-wider mb-1">
            Herramienta Gratuita
          </p>
          <h3 className="text-base font-bold text-foreground mb-1">
            Calculadora de Dilución de Productos
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Calcula la mezcla exacta de cualquier producto de detailing con nuestra herramienta visual e interactiva.
          </p>
        </div>
        <Link
          to="/calculadora-dilucion-detailing"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors whitespace-nowrap"
        >
          Usar Calculadora
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

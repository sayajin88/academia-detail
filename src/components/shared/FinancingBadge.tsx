import { CreditCard, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FinancingBadgeProps {
  price: number;
  months?: number;
  variant?: 'default' | 'compact' | 'prominent';
  className?: string;
}

export function FinancingBadge({ price, months = 4, variant = 'default', className }: FinancingBadgeProps) {
  const monthlyPayment = Math.ceil(price / months);

  if (variant === 'compact') {
    return (
      <div className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold animate-in fade-in zoom-in-95 duration-500",
        className
      )}>
        <CreditCard className="w-3 h-3" />
        <span>Desde €{monthlyPayment}/mes</span>
      </div>
    );
  }

  if (variant === 'prominent') {
    return (
      <div className={cn(
        "relative overflow-hidden rounded-xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 via-emerald-400/5 to-emerald-500/10 p-4 animate-in fade-in slide-in-from-bottom-2 duration-700",
        className
      )}>
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/5 to-transparent animate-pulse" />
        
        <div className="relative flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex-shrink-0">
            <CreditCard className="w-6 h-6 text-emerald-400" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-sm font-bold text-foreground">Págalo a plazos</span>
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <p className="text-xs text-muted-foreground">
              Desde <span className="text-emerald-400 font-bold text-sm">€{monthlyPayment}/mes</span> en {months} cuotas sin intereses
            </p>
          </div>
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-2xl font-black text-emerald-400">€{monthlyPayment}</span>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">/mes</span>
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={cn(
      "inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 animate-in fade-in zoom-in-95 duration-500",
      className
    )}>
      <CreditCard className="w-4 h-4 text-emerald-400" />
      <div className="flex flex-col">
        <span className="text-xs font-bold text-emerald-400">Págalo a plazos</span>
        <span className="text-[11px] text-muted-foreground">
          Desde €{monthlyPayment}/mes · {months} cuotas
        </span>
      </div>
    </div>
  );
}

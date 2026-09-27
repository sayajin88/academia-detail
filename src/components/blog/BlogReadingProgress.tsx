import { BookOpen, Clock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface BlogReadingProgressProps {
  progress: number;
  readingTime: string;
}

export function BlogReadingProgress({ progress, readingTime }: BlogReadingProgressProps) {
  // Extract minutes from readingTime string like "15 min"
  const totalMinutes = parseInt(readingTime) || 10;
  const remainingMinutes = Math.max(1, Math.round(totalMinutes * (1 - progress / 100)));
  const clampedProgress = Math.min(100, Math.max(0, Math.round(progress)));

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-center gap-2 mb-3">
        <BookOpen className="h-4 w-4 text-brand" />
        <span className="text-sm font-semibold text-foreground">Progreso de Lectura</span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Completado</span>
          <span className="font-bold text-foreground">{clampedProgress}%</span>
        </div>

        <Progress value={clampedProgress} className="h-2 bg-primary/20" />

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          {clampedProgress >= 95 ? (
            <span>¡Lectura completada!</span>
          ) : (
            <span>~{remainingMinutes} min restantes</span>
          )}
        </div>
      </div>
    </div>
  );
}

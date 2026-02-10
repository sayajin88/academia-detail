import { DetailerCard, type DetailerProfile } from './DetailerCard';

interface DirectoryGridProps {
  detailers: DetailerProfile[];
  isLoading: boolean;
}

export function DirectoryGrid({ detailers, isLoading }: DirectoryGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-lg bg-card border border-border animate-pulse">
            <div className="aspect-[16/9] bg-muted" />
            <div className="p-4 space-y-3">
              <div className="h-5 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-1/2" />
              <div className="flex gap-2">
                <div className="h-5 bg-muted rounded-full w-16" />
                <div className="h-5 bg-muted rounded-full w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (detailers.length === 0) {
    return (
      <div className="text-center py-16 space-y-4">
        <p className="text-2xl font-bold text-foreground">No se encontraron detailers</p>
        <p className="text-muted-foreground">
          Prueba a ampliar tu búsqueda o quitar filtros.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {detailers.map((detailer) => (
        <DetailerCard key={detailer.id} detailer={detailer} />
      ))}
    </div>
  );
}

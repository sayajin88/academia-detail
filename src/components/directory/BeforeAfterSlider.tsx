import { useState, useRef, useCallback } from 'react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  title?: string;
}

export function BeforeAfterSlider({ beforeImage, afterImage, title }: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const handleStart = useCallback((clientX: number) => {
    isDragging.current = true;
    updatePosition(clientX);
  }, [updatePosition]);

  const handleMove = useCallback((clientX: number) => {
    if (!isDragging.current) return;
    updatePosition(clientX);
  }, [updatePosition]);

  const handleEnd = useCallback(() => {
    isDragging.current = false;
  }, []);

  return (
    <div className="space-y-2">
      <div
        ref={containerRef}
        className="relative aspect-[16/9] rounded-xl overflow-hidden cursor-col-resize select-none border border-border"
        onMouseDown={(e) => handleStart(e.clientX)}
        onMouseMove={(e) => handleMove(e.clientX)}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        onTouchEnd={handleEnd}
      >
        {/* After (full) */}
        <img src={afterImage} alt="Después" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />

        {/* Before (clipped) */}
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
          <img src={beforeImage} alt="Antes" className="absolute inset-0 w-full h-full object-cover" style={{ minWidth: containerRef.current?.offsetWidth }} loading="lazy" />
        </div>

        {/* Divider */}
        <div className="absolute top-0 bottom-0" style={{ left: `${position}%` }}>
          <div className="absolute top-0 bottom-0 -translate-x-1/2 w-0.5 bg-white shadow-lg" />
          <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
            <div className="flex gap-0.5">
              <div className="w-0.5 h-4 bg-muted-foreground/60 rounded-full" />
              <div className="w-0.5 h-4 bg-muted-foreground/60 rounded-full" />
            </div>
          </div>
        </div>

        {/* Labels */}
        <span className="absolute top-3 left-3 text-xs font-bold uppercase bg-black/60 text-white px-2 py-1 rounded">Antes</span>
        <span className="absolute top-3 right-3 text-xs font-bold uppercase bg-black/60 text-white px-2 py-1 rounded">Después</span>
      </div>
      {title && <p className="text-sm text-muted-foreground text-center">{title}</p>}
    </div>
  );
}

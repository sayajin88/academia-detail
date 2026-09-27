import { useState, useMemo, useCallback } from 'react';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Copy, Check, FlaskConical } from 'lucide-react';
import { cn } from '@/lib/utils';

/* ── Ratio presets ─────────────────────────────────────────── */
const RATIO_PRESETS = [
  { product: 1, water: 1, label: '1:1', tag: 'Extremo' },
  { product: 1, water: 4, label: '1:4', tag: 'Fuerte' },
  { product: 1, water: 10, label: '1:10', tag: 'General' },
  { product: 1, water: 20, label: '1:20', tag: 'Suave' },
  { product: 1, water: 100, label: '1:100', tag: 'Jabón' },
];

/* ── Strength helpers ──────────────────────────────────────── */
function getStrengthInfo(percent: number) {
  if (percent >= 20) return { label: 'Concentración extrema' };
  if (percent >= 8) return { label: 'Concentración fuerte' };
  if (percent >= 5) return { label: 'Uso general' };
  if (percent >= 2) return { label: 'Concentración suave' };
  return { label: 'Muy diluido' };
}

// Colores del sistema: producto en burdeos (relleno) y agua en gris claro
const PRODUCT_FILL = '#8B2332';
const PRODUCT_TEXT = '#E07A88';
const WATER_FILL = 'hsl(210 10% 72%)';
const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

/** 90.9 → «90,9» (coma decimal) */
const formatMl = (n: number) => n.toLocaleString('es-ES', { maximumFractionDigits: 1 });

/* ── Spray bottle SVG ──────────────────────────────────────── */
function SprayBottle({ productHeight, waterHeight, productMl, waterMl }: {
  productHeight: number;
  waterHeight: number;
  productMl: number;
  waterMl: number;
}) {
  // Cuerpo de la botella: y de 110 a 310 (200 px útiles)
  const bodyTop = 110;
  const bodyBottom = 310;
  const bodyLeft = 55;
  const bodyRight = 195;
  const bodyWidth = bodyRight - bodyLeft;

  const waterY = bodyBottom - waterHeight;
  const productY = waterY - productHeight;

  return (
    <svg
      viewBox="0 0 250 340"
      className="h-auto w-full"
      role="img"
      aria-label={`Botella con ${formatMl(productMl)} ml de producto y ${formatMl(waterMl)} ml de agua`}
    >
      <defs>
        <clipPath id="bottleBodyClip">
          <rect x={bodyLeft} y={bodyTop} width={bodyWidth} height={bodyBottom - bodyTop} rx="12" />
        </clipPath>
      </defs>

      {/* Pulverizador */}
      <rect x="95" y="10" width="60" height="18" rx="4" fill="hsl(240 8% 20%)" stroke="hsl(240 6% 30%)" strokeWidth="1.5" />
      <rect x="155" y="14" width="30" height="10" rx="3" fill="hsl(240 8% 22%)" stroke="hsl(240 6% 30%)" strokeWidth="1" />
      <path d="M155 28 L165 28 L168 60 L152 65 L150 45 Z" fill="hsl(240 8% 22%)" stroke="hsl(240 6% 30%)" strokeWidth="1.5" />
      <rect x="100" y="28" width="50" height="30" rx="4" fill="hsl(240 8% 18%)" stroke="hsl(240 6% 28%)" strokeWidth="1.5" />
      <path d="M100 58 L55 105 L55 110 L195 110 L195 105 L150 58 Z" fill="hsl(240 8% 16%)" stroke="hsl(240 6% 28%)" strokeWidth="1.5" fillOpacity="0.6" />
      {/* Cuerpo y base */}
      <rect x={bodyLeft} y={bodyTop} width={bodyWidth} height={bodyBottom - bodyTop} rx="12" fill="hsl(240 8% 14%)" stroke="hsl(240 6% 30%)" strokeWidth="2" fillOpacity="0.4" />
      <rect x="50" y={bodyBottom} width="150" height="20" rx="6" fill="hsl(240 8% 18%)" stroke="hsl(240 6% 28%)" strokeWidth="1.5" />

      {/* Líquidos */}
      <g clipPath="url(#bottleBodyClip)">
        <rect x={bodyLeft} y={waterY} width={bodyWidth} height={waterHeight} fill={WATER_FILL} opacity="0.35" style={{ transition: `all 0.5s ${EASE}` }} />
        <rect x={bodyLeft} y={productY} width={bodyWidth} height={productHeight} fill={PRODUCT_FILL} style={{ transition: `all 0.5s ${EASE}` }} />
      </g>

      {/* Cantidades dentro de la botella */}
      {productHeight > 18 && (
        <text x={bodyLeft + bodyWidth / 2} y={productY + productHeight / 2 + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill="white">
          {formatMl(productMl)} ml
        </text>
      )}
      {waterHeight > 18 && (
        <text x={bodyLeft + bodyWidth / 2} y={waterY + waterHeight / 2 + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill="white">
          {formatMl(waterMl)} ml
        </text>
      )}

      {/* Marcas de nivel */}
      {[0.25, 0.5, 0.75].map((pct) => {
        const markY = bodyBottom - (bodyBottom - bodyTop) * pct;
        return (
          <g key={pct}>
            <line x1="44" y1={markY} x2={bodyLeft} y2={markY} stroke="hsl(240 6% 40%)" strokeWidth="1" />
            <text x="40" y={markY + 4} textAnchor="end" fontSize="11" fill="hsl(210 5% 70%)">{Math.round(pct * 100)}%</text>
          </g>
        );
      })}
    </svg>
  );
}

const labelClass = 'mb-3 block text-sm font-semibold text-foreground';

/* ── Calculadora ───────────────────────────────────────────── */
export function VisualDilutionCalculator() {
  const [capacity, setCapacity] = useState(1000);
  const [ratioProduct, setRatioProduct] = useState(1);
  const [ratioWater, setRatioWater] = useState(10);
  const [isCustom, setIsCustom] = useState(false);
  const [customProduct, setCustomProduct] = useState('1');
  const [customWater, setCustomWater] = useState('10');
  const [copied, setCopied] = useState(false);

  // Cálculos
  const calc = useMemo(() => {
    const totalParts = ratioProduct + ratioWater;
    const volumePerPart = capacity / totalParts;
    const productVolume = Math.round(volumePerPart * ratioProduct * 10) / 10;
    const waterVolume = Math.round(volumePerPart * ratioWater * 10) / 10;
    const strengthPercent = (ratioProduct / totalParts) * 100;
    const maxLiquidHeight = 200;
    const productHeight = (productVolume / capacity) * maxLiquidHeight;
    const waterHeight = (waterVolume / capacity) * maxLiquidHeight;
    return { productVolume, waterVolume, strengthPercent, productHeight, waterHeight };
  }, [capacity, ratioProduct, ratioWater]);

  const strengthInfo = useMemo(() => getStrengthInfo(calc.strengthPercent), [calc.strengthPercent]);

  const selectPreset = useCallback((product: number, water: number) => {
    setRatioProduct(product);
    setRatioWater(water);
    setIsCustom(false);
  }, []);

  const handleCustomToggle = useCallback(() => {
    setIsCustom(true);
    const p = Math.max(1, parseInt(customProduct) || 1);
    const w = Math.max(1, parseInt(customWater) || 1);
    setRatioProduct(p);
    setRatioWater(w);
  }, [customProduct, customWater]);

  const handleCustomProductChange = useCallback((val: string) => {
    setCustomProduct(val);
    const p = Math.max(1, parseInt(val) || 1);
    setRatioProduct(p);
  }, []);

  const handleCustomWaterChange = useCallback((val: string) => {
    setCustomWater(val);
    const w = Math.max(1, parseInt(val) || 1);
    setRatioWater(w);
  }, []);

  const handleCapacityInput = useCallback((val: string) => {
    const n = parseInt(val) || 100;
    setCapacity(Math.min(5000, Math.max(100, n)));
  }, []);

  // Mientras se escribe se guarda el texto tal cual (para poder teclear «500»
  // sin que «5» salte a 100); el valor se aplica si ya está en rango y, al
  // salir del campo, con el mismo límite de 100-5.000 ml de siempre.
  const [capacityDraft, setCapacityDraft] = useState<string | null>(null);
  const handleCapacityDraft = useCallback((val: string) => {
    setCapacityDraft(val);
    const n = parseInt(val);
    if (n >= 100 && n <= 5000) setCapacity(n);
  }, []);
  const commitCapacityDraft = useCallback(() => {
    if (capacityDraft !== null) handleCapacityInput(capacityDraft);
    setCapacityDraft(null);
  }, [capacityDraft, handleCapacityInput]);

  const copyRecipe = useCallback(async () => {
    const text = `🧪 Receta de Dilución\n━━━━━━━━━━━━━━━━━━\nEnvase: ${capacity} ml\nRatio: ${ratioProduct}:${ratioWater}\n\n✅ Producto: ${calc.productVolume} ml\n💧 Agua: ${calc.waterVolume} ml\n\nGenerado con Academia Detail`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback silencioso
    }
  }, [capacity, ratioProduct, ratioWater, calc.productVolume, calc.waterVolume]);

  const isPresetActive = (p: number, w: number) => !isCustom && ratioProduct === p && ratioWater === w;

  const optionClass = (active: boolean) =>
    cn(
      'flex min-h-[60px] flex-col items-center justify-center gap-1 rounded-lg border px-2 font-bold transition-colors',
      active ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-background text-foreground hover:border-white/30',
    );

  return (
    <div className="ds-card p-4 sm:p-5 md:p-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-x-12 lg:gap-y-8">
        {/* 1. Controles */}
        <div className="space-y-8">
          <div>
            <label htmlFor="capacidad-envase" className={labelClass}>
              1. Capacidad del envase
            </label>
            <div className="flex items-center gap-4">
              <Slider
                value={[capacity]}
                onValueChange={([v]) => setCapacity(v)}
                min={100}
                max={5000}
                step={50}
                aria-label="Capacidad total del envase en mililitros"
                className="flex-1 py-2"
              />
              <div className="flex shrink-0 items-center gap-2">
                <Input
                  id="capacidad-envase"
                  type="number"
                  inputMode="numeric"
                  value={capacityDraft ?? capacity}
                  onChange={(e) => handleCapacityDraft(e.target.value)}
                  onBlur={commitCapacityDraft}
                  onKeyDown={(e) => e.key === 'Enter' && commitCapacityDraft()}
                  className="h-11 w-24 bg-background text-center text-lg font-bold"
                  min={100}
                  max={5000}
                  step={50}
                />
                <span className="text-sm text-muted-foreground">ml</span>
              </div>
            </div>
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <span>100 ml</span>
              <span>5.000 ml</span>
            </div>
          </div>

          <div>
            <p id="ratio-label" className={labelClass}>
              2. Ratio de dilución <span className="font-normal text-muted-foreground">(producto : agua)</span>
            </p>
            <div role="group" aria-labelledby="ratio-label" className="grid grid-cols-3 gap-2 sm:grid-cols-6">
              {RATIO_PRESETS.map((preset) => {
                const active = isPresetActive(preset.product, preset.water);
                return (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => selectPreset(preset.product, preset.water)}
                    aria-pressed={active}
                    className={optionClass(active)}
                  >
                    <span className="text-lg leading-none">{preset.label}</span>
                    <span className={cn('text-[11px] font-semibold uppercase tracking-wide', active ? 'text-white/85' : 'text-muted-foreground')}>
                      {preset.tag}
                    </span>
                  </button>
                );
              })}
              <button type="button" onClick={handleCustomToggle} aria-pressed={isCustom} className={optionClass(isCustom)}>
                <FlaskConical className="h-4 w-4" aria-hidden="true" />
                <span className={cn('text-[11px] font-semibold uppercase tracking-wide', isCustom ? 'text-white/85' : 'text-muted-foreground')}>
                  Otro
                </span>
              </button>
            </div>

            {isCustom && (
              <div className="mt-3 flex flex-wrap items-center gap-2 rounded-lg border border-border bg-background p-3">
                <Input
                  type="number"
                  inputMode="numeric"
                  value={customProduct}
                  onChange={(e) => handleCustomProductChange(e.target.value)}
                  className="h-10 w-20 bg-card text-center font-bold"
                  min={1}
                  aria-label="Partes de producto"
                />
                <span className="font-bold text-muted-foreground">:</span>
                <Input
                  type="number"
                  inputMode="numeric"
                  value={customWater}
                  onChange={(e) => handleCustomWaterChange(e.target.value)}
                  className="h-10 w-20 bg-card text-center font-bold"
                  min={1}
                  aria-label="Partes de agua"
                />
                <span className="text-sm text-muted-foreground">partes de producto : partes de agua</span>
              </div>
            )}
          </div>
        </div>

        {/* 2. Resultado (a la derecha en escritorio; justo debajo de los controles en móvil) */}
        <div className="lg:row-span-2">
          <div className="rounded-xl border border-border bg-background p-4 sm:p-5 md:p-6 lg:sticky lg:top-24">
            <p className="ds-eyebrow">Resultado</p>
            <div className="mt-4 grid grid-cols-[minmax(0,1fr)_112px] items-center gap-4 sm:grid-cols-[minmax(0,1fr)_180px] md:gap-6 xl:grid-cols-[minmax(0,1fr)_200px]">
              <dl className="space-y-4" aria-live="polite">
                <div>
                  <dt className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: PRODUCT_FILL }} aria-hidden="true" />
                    Añade de producto
                  </dt>
                  <dd className="mt-1 font-heading text-[2.75rem] leading-none text-foreground md:text-5xl">
                    {formatMl(calc.productVolume)} <span className="font-sans text-lg font-semibold text-muted-foreground">ml</span>
                  </dd>
                </div>
                <div>
                  <dt className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: WATER_FILL, opacity: 0.6 }} aria-hidden="true" />
                    Rellena con agua
                  </dt>
                  <dd className="mt-1 font-heading text-[2.75rem] leading-none text-foreground md:text-5xl">
                    {formatMl(calc.waterVolume)} <span className="font-sans text-lg font-semibold text-muted-foreground">ml</span>
                  </dd>
                </div>
                <div className="border-t border-border pt-3 text-sm text-muted-foreground">
                  Envase de {capacity} ml · ratio {ratioProduct}:{ratioWater}
                </div>
              </dl>
              <SprayBottle
                productHeight={calc.productHeight}
                waterHeight={calc.waterHeight}
                productMl={calc.productVolume}
                waterMl={calc.waterVolume}
              />
            </div>
            <Button type="button" variant="outline" onClick={copyRecipe} className="mt-5 h-11 w-full font-semibold">
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-brand" aria-hidden="true" />
                  Receta copiada
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" aria-hidden="true" />
                  Copiar la receta
                </>
              )}
            </Button>
          </div>
        </div>

        {/* 3. Explicación */}
        <div className="rounded-xl border border-border bg-background p-5">
          <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Qué significa:</strong> una dilución{' '}
            <strong className="text-foreground">{ratioProduct}:{ratioWater}</strong> quiere decir que por cada{' '}
            <strong className="text-foreground">{ratioProduct} {ratioProduct === 1 ? 'tapón' : 'tapones'} de producto</strong> debes añadir{' '}
            <strong className="text-foreground">{ratioWater} {ratioWater === 1 ? 'tapón' : 'tapones'} de agua</strong>.
          </p>
          <div className="mt-4">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-x-4 text-sm">
              <span className="text-muted-foreground">Potencia de la mezcla</span>
              <span className="font-semibold text-foreground">{strengthInfo.label}</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-brand"
                style={{
                  width: `${Math.min(100, Math.max(5, calc.strengthPercent * 2))}%`,
                  transition: `width 0.5s ${EASE}`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

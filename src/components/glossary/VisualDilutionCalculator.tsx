import { useState, useMemo, useCallback } from 'react';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Droplets, Copy, Check, Beaker, FlaskConical } from 'lucide-react';

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
  if (percent >= 20) return { label: 'Concentración extrema', color: 'hsl(0 80% 55%)', barColor: 'from-red-500 to-orange-500' };
  if (percent >= 8)  return { label: 'Concentración fuerte', color: 'hsl(25 90% 55%)', barColor: 'from-orange-500 to-amber-500' };
  if (percent >= 5)  return { label: 'Uso general', color: 'hsl(45 90% 50%)', barColor: 'from-amber-400 to-yellow-400' };
  if (percent >= 2)  return { label: 'Concentración suave', color: 'hsl(140 60% 45%)', barColor: 'from-green-500 to-emerald-400' };
  return { label: 'Muy diluido', color: 'hsl(160 60% 40%)', barColor: 'from-emerald-500 to-teal-400' };
}

/* ── Animated Spray Bottle SVG ────────────────────────────── */
function SprayBottle({ productHeight, waterHeight, productMl, waterMl }: {
  productHeight: number;
  waterHeight: number;
  productMl: number;
  waterMl: number;
}) {
  // Bottle body area: y from 110 to 310 (200px height usable)
  const bodyTop = 110;
  const bodyBottom = 310;
  const bodyLeft = 55;
  const bodyRight = 195;
  const bodyWidth = bodyRight - bodyLeft;

  const waterY = bodyBottom - waterHeight;
  const productY = waterY - productHeight;

  return (
    <div className="relative flex items-center justify-center">
      <svg
        viewBox="0 0 250 370"
        className="w-full max-w-[220px] md:max-w-[260px] h-auto drop-shadow-lg"
        role="img"
        aria-label={`Botella con ${productMl} ml de producto y ${waterMl} ml de agua`}
      >
        <defs>
          {/* Clip path for liquid inside the bottle body */}
          <clipPath id="bottleBodyClip">
            <rect x={bodyLeft} y={bodyTop} width={bodyWidth} height={bodyBottom - bodyTop} rx="12" />
          </clipPath>
          {/* Wave pattern for product surface */}
          <pattern id="wavePattern" x="0" y="0" width="60" height="8" patternUnits="userSpaceOnUse">
            <path
              d="M0,4 Q15,-2 30,4 T60,4"
              fill="none"
              stroke="hsl(36 90% 60%)"
              strokeWidth="1.5"
              opacity="0.5"
              className="animate-[wave_3s_ease-in-out_infinite]"
            />
          </pattern>
        </defs>

        {/* ── Bottle outline ── */}
        {/* Spray head / nozzle */}
        <rect x="95" y="10" width="60" height="18" rx="4" fill="hsl(240 8% 20%)" stroke="hsl(240 6% 30%)" strokeWidth="1.5" />
        <rect x="155" y="14" width="30" height="10" rx="3" fill="hsl(240 8% 22%)" stroke="hsl(240 6% 30%)" strokeWidth="1" />
        {/* Trigger */}
        <path d="M155 28 L165 28 L168 60 L152 65 L150 45 Z" fill="hsl(240 8% 22%)" stroke="hsl(240 6% 30%)" strokeWidth="1.5" />
        {/* Neck */}
        <rect x="100" y="28" width="50" height="30" rx="4" fill="hsl(240 8% 18%)" stroke="hsl(240 6% 28%)" strokeWidth="1.5" />
        {/* Neck-to-body transition */}
        <path d="M100 58 L55 105 L55 110 L195 110 L195 105 L150 58 Z" fill="hsl(240 8% 16%)" stroke="hsl(240 6% 28%)" strokeWidth="1.5" fillOpacity="0.6" />
        {/* Main body */}
        <rect x={bodyLeft} y={bodyTop} width={bodyWidth} height={bodyBottom - bodyTop} rx="12" fill="hsl(240 8% 14%)" stroke="hsl(240 6% 28%)" strokeWidth="2" fillOpacity="0.4" />
        {/* Bottom base */}
        <rect x="50" y={bodyBottom} width="150" height="20" rx="6" fill="hsl(240 8% 18%)" stroke="hsl(240 6% 28%)" strokeWidth="1.5" />

        {/* ── Liquids (clipped to body) ── */}
        <g clipPath="url(#bottleBodyClip)">
          {/* Water layer (bottom) */}
          <rect
            x={bodyLeft}
            y={waterY}
            width={bodyWidth}
            height={waterHeight}
            fill="#60a5fa"
            opacity="0.75"
            style={{ transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)' }}
          />

          {/* Product layer (top of water) */}
          <rect
            x={bodyLeft}
            y={productY}
            width={bodyWidth}
            height={productHeight}
            fill="#f59e0b"
            opacity="0.85"
            style={{ transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)' }}
          />

          {/* Wave effect on product surface */}
          {productHeight > 4 && (
            <rect
              x={bodyLeft}
              y={productY - 4}
              width={bodyWidth}
              height="8"
              fill="url(#wavePattern)"
              style={{ transition: 'y 0.6s cubic-bezier(0.22, 1, 0.36, 1)' }}
            />
          )}

          {/* Decorative bubbles in water zone */}
          {waterHeight > 30 && (
            <>
              <circle cx="90" cy={waterY + waterHeight * 0.3} r="3" fill="#93c5fd" opacity="0.4" className="animate-[floatBubble_4s_ease-in-out_infinite]" />
              <circle cx="140" cy={waterY + waterHeight * 0.6} r="2" fill="#93c5fd" opacity="0.3" className="animate-[floatBubble_5s_ease-in-out_infinite_0.5s]" />
              <circle cx="170" cy={waterY + waterHeight * 0.4} r="2.5" fill="#93c5fd" opacity="0.35" className="animate-[floatBubble_4.5s_ease-in-out_infinite_1s]" />
            </>
          )}
        </g>

        {/* ── Labels inside bottle ── */}
        {productHeight > 18 && (
          <text
            x={bodyLeft + bodyWidth / 2}
            y={productY + productHeight / 2 + 4}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="white"
            style={{ transition: 'y 0.6s cubic-bezier(0.22, 1, 0.36, 1)' }}
          >
            {productMl} ml
          </text>
        )}
        {waterHeight > 18 && (
          <text
            x={bodyLeft + bodyWidth / 2}
            y={waterY + waterHeight / 2 + 4}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="white"
            style={{ transition: 'y 0.6s cubic-bezier(0.22, 1, 0.36, 1)' }}
          >
            {waterMl} ml
          </text>
        )}

        {/* ── Side legends ── */}
        {productHeight > 8 && (
          <>
            <line x1="200" y1={productY + productHeight / 2} x2="215" y2={productY + productHeight / 2} stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" style={{ transition: 'y1 0.6s cubic-bezier(0.22, 1, 0.36, 1), y2 0.6s cubic-bezier(0.22, 1, 0.36, 1)' }} />
            <text x="218" y={productY + productHeight / 2 + 4} fontSize="9" fill="#f59e0b" fontWeight="600" style={{ transition: 'y 0.6s cubic-bezier(0.22, 1, 0.36, 1)' }}>Producto</text>
          </>
        )}
        {waterHeight > 8 && (
          <>
            <line x1="200" y1={waterY + waterHeight / 2} x2="215" y2={waterY + waterHeight / 2} stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="3 2" style={{ transition: 'y1 0.6s cubic-bezier(0.22, 1, 0.36, 1), y2 0.6s cubic-bezier(0.22, 1, 0.36, 1)' }} />
            <text x="218" y={waterY + waterHeight / 2 + 4} fontSize="9" fill="#60a5fa" fontWeight="600" style={{ transition: 'y 0.6s cubic-bezier(0.22, 1, 0.36, 1)' }}>Agua</text>
          </>
        )}

        {/* Measurement marks on left side */}
        {[0.25, 0.5, 0.75].map((pct) => {
          const markY = bodyBottom - (bodyBottom - bodyTop) * pct;
          return (
            <g key={pct}>
              <line x1="48" y1={markY} x2={bodyLeft} y2={markY} stroke="hsl(240 6% 35%)" strokeWidth="1" />
              <text x="44" y={markY + 3} textAnchor="end" fontSize="8" fill="hsl(210 5% 55%)">{Math.round(pct * 100)}%</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ── Main Calculator Component ────────────────────────────── */
export function VisualDilutionCalculator() {
  const [capacity, setCapacity] = useState(1000);
  const [ratioProduct, setRatioProduct] = useState(1);
  const [ratioWater, setRatioWater] = useState(10);
  const [isCustom, setIsCustom] = useState(false);
  const [customProduct, setCustomProduct] = useState('1');
  const [customWater, setCustomWater] = useState('10');
  const [copied, setCopied] = useState(false);

  // Derived calculations
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

  return (
    <div className="bg-card/80 backdrop-blur-sm rounded-2xl border border-border shadow-lg p-5 md:p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
          <Beaker className="h-4 w-4" />
          Herramienta Interactiva
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-foreground mb-2 leading-tight">
          Calculadora de <span className="text-primary">Dilución</span>
        </h2>
        <p className="text-muted-foreground text-sm md:text-base max-w-lg mx-auto">
          Calcula la dilución exacta de cualquier producto químico de forma visual e intuitiva
        </p>
      </div>

      {/* Main Layout: Controls + Bottle */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-10">
        {/* ── LEFT: Controls ── */}
        <div className="flex-1 space-y-6">
          {/* A. Capacity Slider */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
              Capacidad del envase
            </label>
            <div className="flex items-center gap-4 mb-3">
              <div className="flex-1">
                <Slider
                  value={[capacity]}
                  onValueChange={([v]) => setCapacity(v)}
                  min={100}
                  max={5000}
                  step={50}
                  aria-label="Capacidad total del envase en mililitros"
                  className="py-2"
                />
              </div>
              <div className="flex items-baseline gap-1 flex-shrink-0">
                <Input
                  type="number"
                  value={capacity}
                  onChange={(e) => handleCapacityInput(e.target.value)}
                  className="w-20 h-10 text-center text-lg font-bold bg-muted border-border"
                  min={100}
                  max={5000}
                  step={50}
                  aria-label="Capacidad en mililitros"
                />
                <span className="text-muted-foreground text-sm font-medium">ml</span>
              </div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>100 ml</span>
              <span>5000 ml</span>
            </div>
          </div>

          {/* B. Ratio Grid */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
              Ratio de dilución
            </label>
            <div className="grid grid-cols-3 gap-2">
              {RATIO_PRESETS.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => selectPreset(preset.product, preset.water)}
                  aria-pressed={isPresetActive(preset.product, preset.water)}
                  className={`min-h-[56px] rounded-xl border-2 font-bold text-base transition-all duration-200 flex flex-col items-center justify-center gap-0.5 ${
                    isPresetActive(preset.product, preset.water)
                      ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/25 scale-[1.03]'
                      : 'bg-card border-border text-foreground hover:border-blue-400/50 hover:bg-card/80'
                  }`}
                >
                  <span className="text-lg leading-none">{preset.label}</span>
                  <span className={`text-[10px] uppercase tracking-wide ${isPresetActive(preset.product, preset.water) ? 'text-blue-100' : 'text-muted-foreground'}`}>
                    {preset.tag}
                  </span>
                </button>
              ))}

              {/* Custom button */}
              <button
                onClick={handleCustomToggle}
                aria-pressed={isCustom}
                className={`min-h-[56px] rounded-xl border-2 font-bold text-base transition-all duration-200 flex flex-col items-center justify-center gap-0.5 ${
                  isCustom
                    ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/25 scale-[1.03]'
                    : 'bg-card border-border text-foreground hover:border-blue-400/50 hover:bg-card/80'
                }`}
              >
                <FlaskConical className="h-4 w-4" />
                <span className={`text-[10px] uppercase tracking-wide ${isCustom ? 'text-blue-100' : 'text-muted-foreground'}`}>
                  Custom
                </span>
              </button>
            </div>

            {/* Custom ratio inputs */}
            {isCustom && (
              <div className="mt-3 flex items-center gap-2 p-3 rounded-xl bg-muted/50 border border-border animate-fade-in">
                <Input
                  type="number"
                  value={customProduct}
                  onChange={(e) => handleCustomProductChange(e.target.value)}
                  className="w-16 h-9 text-center font-bold bg-card border-border"
                  min={1}
                  aria-label="Partes de producto"
                />
                <span className="text-muted-foreground font-bold">:</span>
                <Input
                  type="number"
                  value={customWater}
                  onChange={(e) => handleCustomWaterChange(e.target.value)}
                  className="w-16 h-9 text-center font-bold bg-card border-border"
                  min={1}
                  aria-label="Partes de agua"
                />
                <span className="text-muted-foreground text-xs ml-1">(producto : agua)</span>
              </div>
            )}
          </div>

          {/* C. Educational Translator */}
          <div className="p-4 rounded-xl bg-muted/40 border border-border/50 space-y-3">
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="text-lg mr-1">💡</span>
              <strong className="text-foreground">Traducción:</strong>{' '}
              Una dilución{' '}
              <span className="text-blue-400 font-bold">{ratioProduct}:{ratioWater}</span>{' '}
              significa que por cada{' '}
              <span className="text-amber-400 font-semibold">{ratioProduct} {ratioProduct === 1 ? 'tapón' : 'tapones'} de producto</span>,
              debes añadir{' '}
              <span className="text-blue-400 font-semibold">{ratioWater} {ratioWater === 1 ? 'tapón' : 'tapones'} de agua</span>.
            </p>

            {/* Strength bar */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Potencia</span>
                <span className="text-xs font-semibold" style={{ color: strengthInfo.color }}>
                  {strengthInfo.label}
                </span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${strengthInfo.barColor}`}
                  style={{
                    width: `${Math.min(100, Math.max(5, calc.strengthPercent * 2))}%`,
                    transition: 'width 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Animated Bottle ── */}
        <div className="flex-1 flex items-center justify-center md:pl-4">
          <SprayBottle
            productHeight={calc.productHeight}
            waterHeight={calc.waterHeight}
            productMl={calc.productVolume}
            waterMl={calc.waterVolume}
          />
        </div>
      </div>

      {/* ── BOTTOM: Results ── */}
      <div className="mt-8 pt-6 border-t border-border/50">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          {/* Product result */}
          <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/25">
            <div className="h-10 w-10 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
              <Droplets className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <p className="text-xs text-amber-400/80 uppercase tracking-wider font-semibold">Añade</p>
              <p className="text-xl md:text-2xl font-bold text-amber-400">{calc.productVolume} ml <span className="text-sm font-normal text-amber-400/70">de Producto</span></p>
            </div>
          </div>

          {/* Water result */}
          <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-400/10 border border-blue-400/25">
            <div className="h-10 w-10 rounded-lg bg-blue-400/20 flex items-center justify-center flex-shrink-0">
              <Droplets className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-blue-400/80 uppercase tracking-wider font-semibold">Rellena con</p>
              <p className="text-xl md:text-2xl font-bold text-blue-400">{calc.waterVolume} ml <span className="text-sm font-normal text-blue-400/70">de Agua</span></p>
            </div>
          </div>
        </div>

        {/* Copy button */}
        <button
          onClick={copyRecipe}
          className="w-full sm:w-auto mx-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-muted hover:bg-muted/80 border border-border text-foreground font-semibold text-sm transition-all duration-200 hover:border-primary/30"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-green-400" />
              <span className="text-green-400">¡Copiado!</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copiar Receta al Portapapeles
            </>
          )}
        </button>
      </div>
    </div>
  );
}

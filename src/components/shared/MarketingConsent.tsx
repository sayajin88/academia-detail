import { Checkbox } from "@/components/ui/checkbox";

/**
 * Casilla «Quiero recibir novedades» (opcional y sin marcar). Se guarda en `marketing_consent` y Core Detail
 * solo suscribe a los newsletters a quien la marca. El texto es el mismo que guarda Core Detail como prueba
 * del consentimiento (supabase/functions/_shared/marketingConsent.ts en Core-Detail-Park): si cambia, cambiar los dos.
 */
export const MARKETING_CONSENT_TEXT =
  "Quiero recibir novedades y promociones de Detail Park por correo. Puedo darme de baja cuando quiera.";

export function MarketingConsent({ id, checked, onChange }: { id: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex flex-row items-start gap-3">
      <Checkbox id={id} checked={checked} onCheckedChange={(v) => onChange(v === true)} className="mt-0.5 h-5 w-5 !min-h-0 !min-w-0" />
      <label htmlFor={id} className="cursor-pointer text-sm font-normal leading-relaxed text-muted-foreground">
        {MARKETING_CONSENT_TEXT} <span className="text-muted-foreground/80">(opcional)</span>
      </label>
    </div>
  );
}

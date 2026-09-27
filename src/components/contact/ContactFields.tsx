import { FormItem, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';

/**
 * Qué le interesa al alumno. `value` es lo que se guarda en `contact_submissions.tipo_formacion`
 * (mismos valores que el panel de administración y el correo `send-contact-email`);
 * `slug` es el de la página del curso, que llega como `/contacto?curso=<slug>`.
 */
export const INTEREST_OPTIONS = [
  { value: 'detailing', slug: 'curso-detailing-profesional', label: 'Curso de detailing profesional' },
  { value: 'wrapping', slug: 'curso-vinilado-vehiculos', label: 'Curso de car wrapping (vinilado)' },
  { value: 'ppf', slug: 'curso-ppf-proteccion-pintura', label: 'Curso de PPF (protección de pintura)' },
  { value: 'carrera_completa', slug: 'formacion-profesional-detailing', label: 'Carrera Detailing (formación completa)' },
  { value: 'jornada_zero', slug: 'jornada-zero-detailing', label: 'Jornada Zero (un día, desde cero)' },
  { value: 'up_detail', slug: 'up-detail-evento', label: 'Up Detail (formación intensiva de un día)' },
  { value: 'restauracion', slug: 'curso-restauracion-vehiculos', label: 'Curso de restauración (próximamente)' },
  { value: 'general', slug: '', label: 'Otra consulta' },
] as const;

/** `?curso=` admite el slug de la página del curso o el valor interno. */
export const interestFromParam = (param: string | null) =>
  param ? INTEREST_OPTIONS.find((o) => o.slug === param || o.value === param) : undefined;

export const EXPERIENCIA_OPTIONS = [
  { value: 'sin_experiencia', label: 'Empiezo desde cero' },
  { value: 'con_experiencia', label: 'Ya tengo experiencia' },
];

export const CENTRO_OPTIONS = [
  { value: 'no', label: 'Todavía no' },
  { value: 'si', label: 'Sí, ya tengo' },
];

export const INVERSION_OPTIONS = [
  { value: 'hasta_500', label: 'Hasta 500 €' },
  { value: '500_2000', label: '500 – 2.000 €' },
  { value: '2000_5000', label: '2.000 – 5.000 €' },
  { value: 'mas_5000', label: 'Más de 5.000 €' },
];

interface ChoiceGroupProps {
  name: string;
  legend: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  columns?: 2 | 4;
}

/** Opciones tipo radio con aspecto de botón (dentro de un FormField). */
export function ChoiceGroup({ name, legend, options, value, onChange, columns = 2 }: ChoiceGroupProps) {
  return (
    <FormItem className="space-y-2">
      <fieldset>
        <legend className="mb-2 text-sm font-medium leading-none text-foreground">{legend}</legend>
        <div className={cn('grid grid-cols-2 gap-2', columns === 4 && 'sm:grid-cols-4')}>
          {options.map((o) => {
            const checked = value === o.value;
            return (
              <label
                key={o.value}
                className={cn(
                  'flex min-h-11 cursor-pointer items-center justify-center rounded-lg border px-3 py-2 text-center text-sm font-medium transition-colors',
                  'has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring',
                  checked
                    ? 'border-primary bg-primary/15 text-foreground'
                    : 'border-border bg-background text-muted-foreground hover:border-foreground/30 hover:text-foreground',
                )}
              >
                <input type="radio" name={name} value={o.value} checked={checked} onChange={() => onChange(o.value)} className="sr-only" />
                {o.label}
              </label>
            );
          })}
        </div>
      </fieldset>
      <FormMessage />
    </FormItem>
  );
}

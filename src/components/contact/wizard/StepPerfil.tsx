import { UseFormReturn } from "react-hook-form";
import { UserPlus, UserCheck, Building2, Home, Coins } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepPerfilProps {
  form: UseFormReturn<any>;
}

interface OptionCardProps {
  selected: boolean;
  onClick: () => void;
  icon: React.ElementType;
  label: string;
  description?: string;
}

const OptionCard = ({ selected, onClick, icon: Icon, label, description }: OptionCardProps) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "relative flex items-center gap-4 p-5 rounded-xl border-2 transition-all duration-200 text-left w-full group",
      "hover:border-primary/60 hover:bg-primary/5",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      selected
        ? "border-primary bg-primary/10 shadow-[var(--shadow-glow-subtle)]"
        : "border-border bg-card"
    )}
  >
    <div
      className={cn(
        "w-12 h-12 rounded-lg flex items-center justify-center shrink-0 transition-colors",
        selected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground group-hover:text-brand"
      )}
    >
      <Icon className="w-6 h-6" />
    </div>
    <div className="flex-1 min-w-0">
      <span className="font-semibold text-foreground block">{label}</span>
      {description && (
        <span className="text-sm text-muted-foreground block">{description}</span>
      )}
    </div>
    {selected && (
      <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0">
        <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    )}
  </button>
);

const inversionOptions = [
  { value: "hasta_500", label: "Hasta 500 €", description: "Talleres intensivos de 1 día" },
  { value: "500_2000", label: "500 – 2.000 €", description: "Cursos especializados" },
  { value: "2000_5000", label: "2.000 – 5.000 €", description: "Formaciones completas" },
  { value: "mas_5000", label: "Más de 5.000 €", description: "Carrera profesional completa" },
];

const StepPerfil = ({ form }: StepPerfilProps) => {
  const experiencia = form.watch("experiencia");
  const centro = form.watch("centro_propio");
  const inversion = form.watch("inversion");
  const { errors } = form.formState;

  const sectionErrorClass = "rounded-xl border-2 border-destructive/50 bg-destructive/5 p-3 -m-3";

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          Cuéntanos sobre ti
        </h2>
        <p className="text-muted-foreground">
          Así podremos recomendarte la mejor opción
        </p>
      </div>

      {/* Experiencia */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-lg font-semibold text-foreground">¿Tienes experiencia en Detailing?</h3>
          {errors.experiencia && (
            <span className="text-destructive text-xs font-medium whitespace-nowrap animate-in fade-in slide-in-from-right-2">* Selecciona una opción</span>
          )}
        </div>
        <div className={cn("grid grid-cols-1 sm:grid-cols-2 gap-3 transition-all", errors.experiencia && sectionErrorClass)}>
          <OptionCard
            selected={experiencia === "sin_experiencia"}
            onClick={() => form.setValue("experiencia", "sin_experiencia", { shouldValidate: true })}
            icon={UserPlus}
            label="Soy nuevo"
            description="Sin experiencia previa"
          />
          <OptionCard
            selected={experiencia === "con_experiencia"}
            onClick={() => form.setValue("experiencia", "con_experiencia", { shouldValidate: true })}
            icon={UserCheck}
            label="Tengo experiencia"
            description="Ya he trabajado en detailing"
          />
        </div>
      </div>

      {/* Centro propio */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-lg font-semibold text-foreground">¿Tienes centro propio?</h3>
          {errors.centro_propio && (
            <span className="text-destructive text-xs font-medium whitespace-nowrap animate-in fade-in slide-in-from-right-2">* Selecciona una opción</span>
          )}
        </div>
        <div className={cn("grid grid-cols-1 sm:grid-cols-2 gap-3 transition-all", errors.centro_propio && sectionErrorClass)}>
          <OptionCard
            selected={centro === "si"}
            onClick={() => form.setValue("centro_propio", "si", { shouldValidate: true })}
            icon={Building2}
            label="Sí, tengo centro"
            description="Dispongo de local o taller"
          />
          <OptionCard
            selected={centro === "no"}
            onClick={() => form.setValue("centro_propio", "no", { shouldValidate: true })}
            icon={Home}
            label="No, todavía no"
            description="Estoy empezando"
          />
        </div>
      </div>

      {/* Inversión */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-lg font-semibold text-foreground">¿Cuánto estás dispuesto a invertir?</h3>
          {errors.inversion && (
            <span className="text-destructive text-xs font-medium whitespace-nowrap animate-in fade-in slide-in-from-right-2">* Selecciona una opción</span>
          )}
        </div>
        <div className={cn("grid grid-cols-1 sm:grid-cols-2 gap-3 transition-all", errors.inversion && sectionErrorClass)}>
          {inversionOptions.map((opt) => (
            <OptionCard
              key={opt.value}
              selected={inversion === opt.value}
              onClick={() => form.setValue("inversion", opt.value, { shouldValidate: true })}
              icon={Coins}
              label={opt.label}
              description={opt.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepPerfil;

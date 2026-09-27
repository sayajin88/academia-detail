import { UseFormReturn } from "react-hook-form";
import { Paintbrush, Layers, Shield, Wrench, Briefcase, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepFormacionProps {
  form: UseFormReturn<any>;
}

const formaciones = [
  {
    value: "detailing",
    label: "Detailing",
    description: "Pulido, corrección de pintura y protección cerámica",
    icon: Paintbrush,
  },
  {
    value: "wrapping",
    label: "Car Wrapping",
    description: "Rotulación y cambio de color con vinilo profesional",
    icon: Layers,
  },
  {
    value: "ppf",
    label: "Paint Protection Film",
    description: "Instalación de láminas de protección transparente",
    icon: Shield,
  },
  {
    value: "restauracion",
    label: "Restauración",
    description: "Recuperación integral de vehículos clásicos y modernos",
    icon: Wrench,
  },
  {
    value: "negocio",
    label: "Negocio",
    description: "Gestión, marketing y rentabilidad de tu centro",
    icon: Briefcase,
  },
  {
    value: "carrera_completa",
    label: "Carrera Completa",
    description: "Todos los cursos + módulo de negocio incluido",
    icon: GraduationCap,
  },
];

const StepFormacion = ({ form }: StepFormacionProps) => {
  const selected = form.watch("tipo_formacion");

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          ¿Qué formación te interesa?
        </h2>
        <p className="text-muted-foreground">
          Selecciona la formación que mejor se adapta a tus objetivos
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {formaciones.map((f) => {
          const isSelected = selected === f.value;
          return (
            <button
              key={f.value}
              type="button"
              onClick={() => form.setValue("tipo_formacion", f.value, { shouldValidate: true })}
              className={cn(
                "relative flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all duration-200 text-left group",
                "hover:border-primary/60 hover:bg-primary/5",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                isSelected
                  ? "border-primary bg-primary/10 shadow-[var(--shadow-glow-subtle)]"
                  : "border-border bg-card"
              )}
            >
              <div
                className={cn(
                  "w-14 h-14 rounded-xl flex items-center justify-center transition-colors",
                  isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground group-hover:text-brand"
                )}
              >
                <f.icon className="w-7 h-7" />
              </div>
              <div className="text-center space-y-1">
                <span className="font-semibold text-foreground block">{f.label}</span>
                <span className="text-sm text-muted-foreground leading-snug block">
                  {f.description}
                </span>
              </div>
              {isSelected && (
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StepFormacion;

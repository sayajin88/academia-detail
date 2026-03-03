import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Send, Loader2, Check } from "lucide-react";

interface StepResumenProps {
  form: UseFormReturn<any>;
  isSubmitting: boolean;
}

const labelMap: Record<string, Record<string, string>> = {
  tipo_formacion: {
    detailing: "Detailing",
    wrapping: "Car Wrapping",
    ppf: "Paint Protection Film",
    restauracion: "Restauración",
    negocio: "Negocio",
    carrera_completa: "Carrera Completa",
  },
  experiencia: {
    sin_experiencia: "Sin experiencia",
    con_experiencia: "Con experiencia",
  },
  centro_propio: {
    si: "Sí, tengo centro",
    no: "No, todavía no",
  },
  inversion: {
    hasta_500: "Hasta 500 €",
    "500_2000": "500 – 2.000 €",
    "2000_5000": "2.000 – 5.000 €",
    mas_5000: "Más de 5.000 €",
  },
};

const getLabel = (field: string, value: string) =>
  labelMap[field]?.[value] || value;

const StepResumen = ({ form, isSubmitting }: StepResumenProps) => {
  const values = form.getValues();

  const rows = [
    { label: "Formación", value: getLabel("tipo_formacion", values.tipo_formacion) },
    { label: "Experiencia", value: getLabel("experiencia", values.experiencia) },
    { label: "Centro propio", value: getLabel("centro_propio", values.centro_propio) },
    { label: "Inversión", value: getLabel("inversion", values.inversion) },
    { label: "Nombre", value: `${values.nombre} ${values.apellidos}` },
    { label: "Email", value: values.email },
    { label: "Teléfono", value: values.telefono },
  ];

  if (values.mensaje) {
    rows.push({ label: "Mensaje", value: values.mensaje });
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          Revisa tu solicitud
        </h2>
        <p className="text-muted-foreground">
          Comprueba que todo está correcto antes de enviar
        </p>
      </div>

      <div className="max-w-lg mx-auto">
        <div className="rounded-xl border-2 border-border bg-card overflow-hidden">
          {rows.map((row, i) => (
            <div
              key={row.label}
              className={`flex items-start justify-between gap-4 px-5 py-4 ${
                i < rows.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <span className="text-sm text-muted-foreground shrink-0">{row.label}</span>
              <span className="text-sm font-medium text-foreground text-right">{row.value}</span>
            </div>
          ))}
        </div>

        <Button
          type="submit"
          className="w-full min-h-[56px] text-base mt-6"
          size="lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              <Send className="mr-2 h-5 w-5" />
              Confirmar inscripción
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default StepResumen;

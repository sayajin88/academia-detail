import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import ContactSuccessModal from "./ContactSuccessModal";
import StepFormacion from "./wizard/StepFormacion";
import StepPerfil from "./wizard/StepPerfil";
import StepDatos from "./wizard/StepDatos";
import StepResumen from "./wizard/StepResumen";

const contactSchema = z.object({
  nombre: z.string().trim().min(1, "El nombre es obligatorio").max(50),
  apellidos: z.string().trim().min(1, "Los apellidos son obligatorios").max(100),
  email: z.string().trim().email("Introduce un email válido").max(255),
  telefono: z.string().trim().min(9, "Introduce un teléfono válido").max(20),
  experiencia: z.string({ required_error: "Selecciona tu nivel de experiencia" }).min(1, "Selecciona tu nivel"),
  centro_propio: z.string({ required_error: "Indica si tienes centro propio" }).min(1, "Selecciona una opción"),
  inversion: z.string({ required_error: "Selecciona tu presupuesto" }).min(1, "Selecciona tu presupuesto"),
  tipo_formacion: z.string({ required_error: "Selecciona el tipo de formación" }).min(1, "Selecciona una formación"),
  mensaje: z.string().trim().min(1, "El mensaje es obligatorio").max(1000),
  acepto_privacidad: z.boolean().refine((val) => val === true, {
    message: "Debes aceptar la política de privacidad",
  }),
});

type ContactFormData = z.infer<typeof contactSchema>;

const steps = [
  { id: 1, label: "Formación", fields: ["tipo_formacion"] as const },
  { id: 2, label: "Perfil", fields: ["experiencia", "centro_propio", "inversion"] as const },
  { id: 3, label: "Datos", fields: ["nombre", "apellidos", "email", "telefono", "mensaje", "acepto_privacidad"] as const },
  { id: 4, label: "Resumen", fields: [] as const },
];

const EnrollmentWizard = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      nombre: "",
      apellidos: "",
      email: "",
      telefono: "",
      experiencia: "",
      centro_propio: "",
      inversion: "",
      tipo_formacion: "",
      mensaje: "",
      acepto_privacidad: false,
    },
    mode: "onTouched",
  });

  const canGoNext = async () => {
    const fieldsToValidate = steps[currentStep].fields as readonly string[];
    if (fieldsToValidate.length === 0) return true;
    const result = await form.trigger(fieldsToValidate as any);
    return result;
  };

  const handleNext = async () => {
    const valid = await canGoNext();
    if (valid && currentStep < steps.length - 1) {
      setCurrentStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const { error: dbError } = await supabase.from("contact_submissions").insert({
        nombre: data.nombre,
        apellidos: data.apellidos,
        email: data.email,
        telefono: data.telefono,
        experiencia: data.experiencia,
        centro_propio: data.centro_propio,
        inversion: data.inversion,
        tipo_formacion: data.tipo_formacion,
        mensaje: data.mensaje,
        acepto_privacidad: data.acepto_privacidad,
      });
      if (dbError) console.error("DB save error:", dbError);
    } catch (err) {
      console.error("DB save exception:", err);
    }

    // Send to n8n webhook
    try {
      const webhookResponse = await fetch("https://dlopez88.app.n8n.cloud/webhook/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: data.nombre,
          apellidos: data.apellidos,
          email: data.email,
          telefono: data.telefono,
          experiencia: data.experiencia,
          centro_propio: data.centro_propio,
          inversion: data.inversion,
          tipo_formacion: data.tipo_formacion,
          mensaje: data.mensaje || "",
          source: "contact_page",
        }),
      });
      if (!webhookResponse.ok) {
        console.error("Webhook error:", webhookResponse.status);
        toast.error("Tu solicitud se guardó pero hubo un problema al notificar.");
      }
    } catch (err) {
      console.error("Webhook exception:", err);
      toast.error("Tu solicitud se guardó pero hubo un problema de conexión.");
    }

    setIsSubmitting(false);
    form.reset();
    setCurrentStep(0);
    navigate('/gracias');
  };

  return (
    <>
      <div className="w-full max-w-3xl mx-auto">
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-10 px-2">
          {steps.map((step, i) => (
            <div key={step.id} className="flex items-center flex-1 last:flex-initial">
              <button
                type="button"
                onClick={() => {
                  if (i < currentStep) setCurrentStep(i);
                }}
                disabled={i > currentStep}
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all shrink-0",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  i < currentStep
                    ? "bg-primary text-primary-foreground cursor-pointer"
                    : i === currentStep
                    ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                )}
              >
                {i < currentStep ? <Check className="w-5 h-5" /> : step.id}
              </button>
              {i < steps.length - 1 && (
                <div
                  className={cn(
                    "h-0.5 flex-1 mx-2 rounded-full transition-colors",
                    i < currentStep ? "bg-primary" : "bg-border"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Labels (mobile hidden, desktop visible) */}
        <div className="hidden sm:flex items-center justify-between mb-8 px-2">
          {steps.map((step, i) => (
            <span
              key={step.id}
              className={cn(
                "text-xs font-medium transition-colors",
                i <= currentStep ? "text-primary" : "text-muted-foreground",
                i === 0 ? "text-left" : i === steps.length - 1 ? "text-right" : "text-center",
                "flex-1 last:flex-initial"
              )}
            >
              {step.label}
            </span>
          ))}
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="bg-card border border-border rounded-2xl p-6 md:p-10 shadow-[var(--shadow-card)]">
              {currentStep === 0 && <StepFormacion form={form} />}
              {currentStep === 1 && <StepPerfil form={form} />}
              {currentStep === 2 && <StepDatos form={form} />}
              {currentStep === 3 && <StepResumen form={form} isSubmitting={isSubmitting} />}
            </div>

            {/* Navigation Buttons */}
            {currentStep < 3 && (
              <div className="flex items-center justify-between mt-6">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className={cn(currentStep === 0 && "invisible")}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Anterior
                </Button>
                <Button type="button" onClick={handleNext} size="lg" className="min-w-[160px]">
                  Siguiente
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}

            {currentStep === 3 && (
              <div className="flex justify-start mt-6">
                <Button type="button" variant="ghost" onClick={handleBack}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Anterior
                </Button>
              </div>
            )}
          </form>
        </Form>
      </div>

      <ContactSuccessModal
        open={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </>
  );
};

export default EnrollmentWizard;

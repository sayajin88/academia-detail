import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import ContactSuccessModal from "./ContactSuccessModal";
import { toast } from "sonner";

// Schema de validación
const contactSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(1, "El nombre es obligatorio")
    .max(50, "Máximo 50 caracteres"),
  apellidos: z
    .string()
    .trim()
    .min(1, "Los apellidos son obligatorios")
    .max(100, "Máximo 100 caracteres"),
  email: z
    .string()
    .trim()
    .email("Introduce un email válido")
    .max(255, "Máximo 255 caracteres"),
  telefono: z
    .string()
    .trim()
    .min(9, "Introduce un teléfono válido")
    .max(20, "Máximo 20 caracteres"),
  experiencia: z.string({
    required_error: "Selecciona tu nivel de experiencia",
  }),
  centro_propio: z.string({
    required_error: "Indica si tienes centro propio",
  }),
  inversion: z.string({
    required_error: "Selecciona tu presupuesto de inversión",
  }),
  tipo_formacion: z.string({
    required_error: "Selecciona el tipo de formación",
  }),
  mensaje: z.string().trim().max(1000, "Máximo 1000 caracteres").optional(),
  acepto_privacidad: z.boolean().refine((val) => val === true, {
    message: "Debes aceptar la política de privacidad",
  }),
});

type ContactFormData = z.infer<typeof contactSchema>;

// Opciones para los selects
const experienciaOptions = [
  { value: "sin_experiencia", label: "No, soy nuevo" },
  { value: "con_experiencia", label: "Sí, tengo experiencia" },
];

const centroOptions = [
  { value: "si", label: "Sí" },
  { value: "no", label: "No" },
];

const inversionOptions = [
  { value: "hasta_500", label: "Hasta 500 euros" },
  { value: "500_2000", label: "Entre 500 y 2.000 euros" },
  { value: "2000_5000", label: "Entre 2.000 y 5.000 euros" },
  { value: "mas_5000", label: "Más de 5.000 euros" },
];

const formacionOptions = [
  { value: "detailing", label: "Detailing" },
  { value: "wrapping", label: "Car Wrapping" },
  { value: "ppf", label: "Paint Protection Film" },
  { value: "restauracion", label: "Restauración" },
  { value: "negocio", label: "Negocio" },
  {
    value: "carrera_completa",
    label: "Quiero hacer una carrera completa de todos los cursos",
  },
];

const ContactForm = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

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
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    // 1. Save to database
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
        mensaje: data.mensaje || null,
        acepto_privacidad: data.acepto_privacidad,
      });

      if (dbError) {
        console.error("DB save error:", dbError);
      }
    } catch (err) {
      console.error("DB save exception:", err);
    }

    // 2. Send emails via edge function
    try {
      const { error: fnError } = await supabase.functions.invoke("send-contact-email", {
        body: {
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
        },
      });

      if (fnError) {
        console.error("Edge function error:", fnError);
        // Still show success since DB save likely worked
        toast.error("Tu solicitud se guardó pero hubo un problema al enviar el email de confirmación.");
      }
    } catch (err) {
      console.error("Edge function exception:", err);
    }

    setIsSubmitting(false);
    setShowSuccessModal(true);
    form.reset();
  };

  return (
    <>
      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">
            Solicita Información
          </CardTitle>
          <p className="text-muted-foreground text-sm">
            Completa el formulario y te contactaremos en un plazo de 48 horas
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Nombre y Apellidos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="nombre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Tu nombre" 
                          {...field} 
                          className="h-12 text-base"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="apellidos"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Apellidos *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Tus apellidos" 
                          {...field}
                          className="h-12 text-base"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Email y Teléfono */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail *</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="tu@email.com"
                          {...field}
                          className="h-12 text-base"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="telefono"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teléfono *</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="622 77 35 55"
                          {...field}
                          className="h-12 text-base"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Experiencia en Detailing */}
              <FormField
                control={form.control}
                name="experiencia"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>¿Tienes experiencia en Detailing? *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 text-base">
                          <SelectValue placeholder="Selecciona una opción" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {experienciaOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value} className="py-3">
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Centro Propio */}
              <FormField
                control={form.control}
                name="centro_propio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>¿Tienes centro propio? *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 text-base">
                          <SelectValue placeholder="Selecciona una opción" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {centroOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value} className="py-3">
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Inversión en Formación */}
              <FormField
                control={form.control}
                name="inversion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      ¿Cuánto estás dispuesto a invertir en formación? *
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 text-base">
                          <SelectValue placeholder="Selecciona tu presupuesto" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {inversionOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value} className="py-3">
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Tipo de Formación */}
              <FormField
                control={form.control}
                name="tipo_formacion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de formación que deseas realizar *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 text-base">
                          <SelectValue placeholder="Selecciona el tipo de formación" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {formacionOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value} className="py-3">
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Mensaje */}
              <FormField
                control={form.control}
                name="mensaje"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mensaje (opcional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Cuéntanos más sobre tus objetivos o cualquier duda que tengas..."
                        className="min-h-[100px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Checkbox RGPD */}
              <FormField
                control={form.control}
                name="acepto_privacidad"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-muted/30">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="mt-1 h-5 w-5"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none flex-1">
                      <FormLabel className="text-sm font-normal text-muted-foreground leading-relaxed cursor-pointer">
                        He leído y acepto la{" "}
                        <a
                          href="/politica-privacidad"
                          target="_blank"
                          className="text-primary underline hover:text-primary/80"
                        >
                          Política de Privacidad
                        </a>
                        . Autorizo a Academia Detail a tratar mis datos
                        personales conforme al RGPD (UE) 2016/679 y la LOPDGDD
                        3/2018 para gestionar mi solicitud y enviarme
                        información comercial sobre formaciones. Puedo ejercer
                        mis derechos de acceso, rectificación, supresión,
                        portabilidad, limitación y oposición en{" "}
                        <a
                          href="mailto:info@academiadetail.com"
                          className="text-primary underline hover:text-primary/80"
                        >
                          info@academiadetail.com
                        </a>
                        .
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              {/* Error message */}
              {submitError && (
                <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                  {submitError}
                </div>
              )}

              {/* Botón de envío */}
              <Button
                type="submit"
                className="w-full min-h-[52px] text-base"
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
                    Enviar solicitud
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Modal de éxito */}
      <ContactSuccessModal
        open={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </>
  );
};

export default ContactForm;

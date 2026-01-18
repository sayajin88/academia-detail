import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm as useFormspree } from "@formspree/react";
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
import ContactSuccessModal from "./ContactSuccessModal";

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
  const [formspreeState, handleFormspreeSubmit] = useFormspree("maqqevbn");
  const hasShownModal = useRef(false);

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

  // Detectar éxito de Formspree y mostrar modal solo una vez
  useEffect(() => {
    if (formspreeState.succeeded && !hasShownModal.current) {
      hasShownModal.current = true;
      setShowSuccessModal(true);
      form.reset();
    }
  }, [formspreeState.succeeded, form]);

  const onSubmit = async (data: ContactFormData) => {
    // Mapear valores a etiquetas legibles para el email
    const experienciaLabel =
      experienciaOptions.find((o) => o.value === data.experiencia)?.label || "";
    const centroLabel =
      centroOptions.find((o) => o.value === data.centro_propio)?.label || "";
    const inversionLabel =
      inversionOptions.find((o) => o.value === data.inversion)?.label || "";
    const formacionLabel =
      formacionOptions.find((o) => o.value === data.tipo_formacion)?.label ||
      "";

    // Crear objeto con datos formateados para Formspree
    const formData = {
      Nombre: data.nombre,
      Apellidos: data.apellidos,
      Email: data.email,
      Teléfono: data.telefono,
      "Experiencia en Detailing": experienciaLabel,
      "Centro Propio": centroLabel,
      "Inversión en Formación": inversionLabel,
      "Tipo de Formación": formacionLabel,
      Mensaje: data.mensaje || "Sin mensaje",
    };

    await handleFormspreeSubmit(formData);
  };

  return (
    <>
      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">
            Solicita Información
          </CardTitle>
          <p className="text-muted-foreground text-sm">
            Completa el formulario y te contactaremos en menos de 24 horas
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
                        <Input placeholder="Tu nombre" {...field} />
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
                        <Input placeholder="Tus apellidos" {...field} />
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
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una opción" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {experienciaOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
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
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una opción" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {centroOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
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
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona tu presupuesto" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {inversionOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
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
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona el tipo de formación" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {formacionOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
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
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
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
                          href="mailto:info@detailpark.es"
                          className="text-primary underline hover:text-primary/80"
                        >
                          info@detailpark.es
                        </a>
                        .
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              {/* Mostrar errores de Formspree */}
              {formspreeState.errors && Object.keys(formspreeState.errors).length > 0 && (
                <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                  Ha ocurrido un error al enviar el formulario. Por favor,
                  inténtalo de nuevo.
                </div>
              )}

              {/* Botón de envío */}
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={formspreeState.submitting}
              >
                {formspreeState.submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
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
        onClose={() => {
          setShowSuccessModal(false);
          hasShownModal.current = false; // Permitir mostrar de nuevo en futuros envíos
        }}
      />
    </>
  );
};

export default ContactForm;

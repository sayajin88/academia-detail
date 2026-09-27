// Formulario de contacto en una sola pantalla (antes era un asistente de 4 pasos).
// El envío (tabla, función de correo y webhook) no ha cambiado.
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Send } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { SITE } from "@/data/site";
import {
  CENTRO_OPTIONS,
  ChoiceGroup,
  EXPERIENCIA_OPTIONS,
  INTEREST_OPTIONS,
  INVERSION_OPTIONS,
} from "./ContactFields";

const contactSchema = z.object({
  tipo_formacion: z.string().min(1, "Elige qué te interesa"),
  nombre: z.string().trim().min(1, "Escribe tu nombre").max(50, "Máximo 50 caracteres"),
  apellidos: z.string().trim().min(1, "Escribe tus apellidos").max(100, "Máximo 100 caracteres"),
  email: z.string().trim().email("Revisa el email").max(255),
  telefono: z.string().trim().min(9, "Revisa el teléfono").max(20),
  experiencia: z.string().min(1, "Elige una opción"),
  centro_propio: z.string().min(1, "Elige una opción"),
  inversion: z.string().min(1, "Elige una opción"),
  mensaje: z.string().trim().max(1000, "Máximo 1000 caracteres"),
  acepto_privacidad: z.boolean().refine((val) => val === true, {
    message: "Necesitamos tu permiso para responderte",
  }),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface EnrollmentWizardProps {
  /** Valor de `tipo_formacion` preseleccionado (desde `?curso=`) */
  initialInterest?: string;
}

const inputClass = "h-12 text-base";

const EnrollmentWizard = ({ initialInterest }: EnrollmentWizardProps) => {
  const navigate = useNavigate();
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
      tipo_formacion: initialInterest ?? "",
      mensaje: "",
      acepto_privacidad: false,
    },
    mode: "onTouched",
  });

  // Si cambia ?curso= sin recargar (otro enlace con la página ya abierta), se actualiza la selección.
  useEffect(() => {
    if (initialInterest) form.setValue("tipo_formacion", initialInterest);
  }, [initialInterest, form]);

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

    // Send admin notification + client confirmation email
    try {
      await supabase.functions.invoke("send-contact-email", {
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
    } catch (err) {
      console.error("Email send error:", err);
    }

    // Send to n8n webhook (fire-and-forget, silent)
    fetch("https://dlopez88.app.n8n.cloud/webhook/contacto", {
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
    })
      .then(r => { if (!r.ok) console.warn("Webhook n8n:", r.status); })
      .catch(err => console.warn("Webhook n8n error:", err));

    setIsSubmitting(false);
    form.reset();
    navigate('/gracias');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="grid gap-5">
        <FormField
          control={form.control}
          name="tipo_formacion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>¿Qué te interesa?</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className={inputClass}>
                    <SelectValue placeholder="Elige un curso o tipo de consulta" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {INTEREST_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value} className="py-2.5">
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-x-3 gap-y-5 sm:gap-x-5">
          <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input autoComplete="given-name" className={inputClass} {...field} />
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
                <FormLabel>Apellidos</FormLabel>
                <FormControl>
                  <Input autoComplete="family-name" className={inputClass} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="telefono"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono</FormLabel>
                <FormControl>
                  <Input type="tel" inputMode="tel" autoComplete="tel" className={inputClass} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" autoComplete="email" className={inputClass} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="experiencia"
            render={({ field }) => (
              <ChoiceGroup name={field.name} legend="¿Tienes experiencia en detailing?" options={EXPERIENCIA_OPTIONS} value={field.value} onChange={field.onChange} />
            )}
          />
          <FormField
            control={form.control}
            name="centro_propio"
            render={({ field }) => (
              <ChoiceGroup name={field.name} legend="¿Tienes centro o taller propio?" options={CENTRO_OPTIONS} value={field.value} onChange={field.onChange} />
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="inversion"
          render={({ field }) => (
            <ChoiceGroup name={field.name} legend="¿Cuánto quieres invertir en formación?" options={INVERSION_OPTIONS} value={field.value} onChange={field.onChange} columns={4} />
          )}
        />

        <FormField
          control={form.control}
          name="mensaje"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Mensaje <span className="font-normal text-muted-foreground">(opcional)</span>
              </FormLabel>
              <FormControl>
                <Textarea placeholder="Fechas que te vienen bien, dudas sobre el curso…" className="min-h-[96px] resize-y text-base" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="acepto_privacidad"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start gap-3 space-y-0">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-0.5 h-5 w-5 !min-h-0 !min-w-0" />
              </FormControl>
              <div className="grid gap-1">
                <FormLabel className="cursor-pointer text-sm font-normal leading-relaxed text-muted-foreground">
                  He leído y acepto la{" "}
                  <Link to="/politica-privacidad" target="_blank" className="text-brand underline underline-offset-2">
                    política de privacidad
                  </Link>
                  . Autorizo a Academia Detail a tratar mis datos (RGPD y LOPDGDD) para gestionar mi solicitud y enviarme
                  información sobre sus formaciones. Puedo ejercer mis derechos en {SITE.email}.
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" size="lg" className="h-12 w-full text-base font-semibold" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />}
          {isSubmitting ? "Enviando…" : "Enviar solicitud"}
        </Button>
      </form>
    </Form>
  );
};

export default EnrollmentWizard;

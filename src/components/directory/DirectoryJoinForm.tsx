import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, Loader2, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const ALL_SERVICES = [
  'Pulido', 'Cerámico', 'Interior', 'PPF', 'Wrapping',
  'Restauración', 'Lavado Premium', 'Descontaminación',
];

const schema = z.object({
  business_name: z.string().trim().min(1, 'Obligatorio').max(100),
  owner_name: z.string().trim().min(1, 'Obligatorio').max(100),
  email: z.string().trim().email('Email no válido'),
  phone: z.string().trim().min(9, 'Teléfono no válido').max(20),
  city: z.string().trim().min(1, 'Obligatorio').max(100),
  province: z.string().trim().min(1, 'Obligatorio').max(100),
  services: z.array(z.string()).min(1, 'Selecciona al menos un servicio'),
  experience_level: z.string({ required_error: 'Selecciona tu nivel' }),
  has_taken_course: z.boolean(),
  course_name: z.string().optional(),
  message: z.string().max(1000).optional(),
  acepto_privacidad: z.boolean().refine((v) => v, { message: 'Debes aceptar la política de privacidad' }),
});

type FormData = z.infer<typeof schema>;

export function DirectoryJoinForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      business_name: '', owner_name: '', email: '', phone: '',
      city: '', province: '', services: [], experience_level: '',
      has_taken_course: false, course_name: '', message: '',
      acepto_privacidad: false,
    },
  });

  const hasTakenCourse = form.watch('has_taken_course');

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('directory_applications' as any).insert({
        business_name: data.business_name,
        owner_name: data.owner_name,
        email: data.email,
        phone: data.phone,
        city: data.city,
        province: data.province,
        services: data.services,
        experience_level: data.experience_level,
        has_taken_course: data.has_taken_course,
        course_name: data.course_name || null,
        message: data.message || null,
      } as any);

      if (error) throw error;
      setIsSuccess(true);
      form.reset();
    } catch (err) {
      console.error(err);
      toast.error('Error al enviar la solicitud. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="py-16 text-center space-y-4">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
          <h3 className="text-2xl font-bold text-foreground">¡Solicitud enviada!</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Revisaremos tu solicitud en un plazo de 48 horas. Te contactaremos para confirmar tu alta en el directorio.
          </p>
          <Button onClick={() => setIsSuccess(false)} variant="outline">
            Enviar otra solicitud
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl">Únete al Directorio</CardTitle>
        <p className="text-muted-foreground text-sm">
          Completa el formulario y revisaremos tu solicitud en 48 horas.
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField control={form.control} name="business_name" render={({ field }) => (
                <FormItem><FormLabel>Nombre comercial *</FormLabel><FormControl><Input placeholder="Tu negocio" {...field} className="h-12" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="owner_name" render={({ field }) => (
                <FormItem><FormLabel>Nombre del titular *</FormLabel><FormControl><Input placeholder="Tu nombre" {...field} className="h-12" /></FormControl><FormMessage /></FormItem>
              )} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem><FormLabel>Email *</FormLabel><FormControl><Input type="email" placeholder="tu@email.com" {...field} className="h-12" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem><FormLabel>Teléfono *</FormLabel><FormControl><Input type="tel" placeholder="622 77 35 55" {...field} className="h-12" /></FormControl><FormMessage /></FormItem>
              )} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField control={form.control} name="city" render={({ field }) => (
                <FormItem><FormLabel>Ciudad *</FormLabel><FormControl><Input placeholder="Madrid" {...field} className="h-12" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="province" render={({ field }) => (
                <FormItem><FormLabel>Provincia *</FormLabel><FormControl><Input placeholder="Madrid" {...field} className="h-12" /></FormControl><FormMessage /></FormItem>
              )} />
            </div>

            {/* Services */}
            <FormField control={form.control} name="services" render={({ field }) => (
              <FormItem>
                <FormLabel>Servicios que ofreces *</FormLabel>
                <div className="flex flex-wrap gap-2">
                  {ALL_SERVICES.map((service) => {
                    const selected = field.value.includes(service);
                    return (
                      <button
                        key={service}
                        type="button"
                        onClick={() => {
                          field.onChange(
                            selected ? field.value.filter((s: string) => s !== service) : [...field.value, service]
                          );
                        }}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                          selected
                            ? 'bg-primary/15 text-primary border-primary/40'
                            : 'bg-card text-muted-foreground border-border hover:border-primary/30'
                        }`}
                      >
                        {service}
                      </button>
                    );
                  })}
                </div>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="experience_level" render={({ field }) => (
              <FormItem>
                <FormLabel>Nivel de experiencia *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl><SelectTrigger className="h-12"><SelectValue placeholder="Selecciona tu nivel" /></SelectTrigger></FormControl>
                  <SelectContent>
                    <SelectItem value="principiante">Principiante (menos de 1 año)</SelectItem>
                    <SelectItem value="intermedio">Intermedio (1-3 años)</SelectItem>
                    <SelectItem value="avanzado">Avanzado (3-5 años)</SelectItem>
                    <SelectItem value="experto">Experto (más de 5 años)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="has_taken_course" render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} className="h-5 w-5" />
                </FormControl>
                <FormLabel className="font-normal cursor-pointer">
                  He realizado un curso en Academia Detail
                </FormLabel>
              </FormItem>
            )} />

            {hasTakenCourse && (
              <FormField control={form.control} name="course_name" render={({ field }) => (
                <FormItem>
                  <FormLabel>¿Qué curso realizaste?</FormLabel>
                  <FormControl><Input placeholder="Ej: Curso Detailing Profesional" {...field} className="h-12" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            )}

            <FormField control={form.control} name="message" render={({ field }) => (
              <FormItem>
                <FormLabel>Mensaje (opcional)</FormLabel>
                <FormControl><Textarea placeholder="Cuéntanos más sobre tu negocio..." className="min-h-[80px] resize-none" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="acepto_privacidad" render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-muted/30">
                <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-1 h-5 w-5" /></FormControl>
                <div className="space-y-1 leading-none flex-1">
                  <FormLabel className="text-sm font-normal text-muted-foreground leading-relaxed cursor-pointer">
                    He leído y acepto la{' '}
                    <a href="/politica-privacidad" target="_blank" className="text-primary underline hover:text-primary/80">
                      Política de Privacidad
                    </a>.
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )} />

            <Button type="submit" className="w-full min-h-[52px] text-base" size="lg" disabled={isSubmitting}>
              {isSubmitting ? (
                <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Enviando...</>
              ) : (
                <><Send className="mr-2 h-5 w-5" />Enviar solicitud</>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

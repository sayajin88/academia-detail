import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card } from '@/components/ui/card';
import {
  Send, Loader2, CheckCircle2, User, Building2, ArrowRight, ArrowLeft,
  MapPin, Sparkles, ShieldCheck, Camera, Upload, X, ExternalLink,
  Paintbrush, Shield, Car, Armchair, Wrench, Cog, Instagram,
  Crown, Star, GraduationCap,
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const SERVICES = [
  { id: 'Pulido', label: 'Pulido', icon: Sparkles },
  { id: 'Cerámico', label: 'Coating', icon: Shield },
  { id: 'PPF', label: 'PPF', icon: ShieldCheck },
  { id: 'Interior', label: 'Interiores', icon: Armchair },
  { id: 'Restauración', label: 'Restauración Cuero', icon: Wrench },
  { id: 'Motores', label: 'Motores', icon: Cog },
];

const BRANDS = [
  'Rupes', 'Flex', 'Meguiar\'s', 'Menzerna', 'Gyeon', 'Gtechniq',
  'Chemical Guys', '3M', 'STEK', 'Avery Dennison', 'Hexis',
];

const STEPS = [
  { num: 1, label: 'Identidad' },
  { num: 2, label: 'Especialización' },
  { num: 3, label: 'Confianza' },
  { num: 4, label: 'Galería' },
];

const schema = z.object({
  profile_type: z.enum(['detailer', 'centro']),
  business_name: z.string().trim().min(1, 'Obligatorio').max(100),
  owner_name: z.string().trim().min(1, 'Obligatorio').max(100),
  email: z.string().trim().email('Email no válido'),
  phone: z.string().trim().min(9, 'Teléfono no válido').max(20),
  city: z.string().trim().min(1, 'Obligatorio').max(100),
  province: z.string().trim().min(1, 'Obligatorio').max(100),
  portfolio_url: z.string().max(500).optional(),
  services: z.array(z.string()).min(1, 'Selecciona al menos un servicio'),
  brands: z.array(z.string()).optional(),
  has_taken_course: z.boolean(),
  course_name: z.string().optional(),
  has_insurance: z.boolean(),
  value_proposition: z.string().max(500).optional(),
  acepto_privacidad: z.boolean().refine((v) => v, { message: 'Debes aceptar la política de privacidad' }),
});

type FormData = z.infer<typeof schema>;

// Step validation: which fields must be valid to proceed
const stepFields: Record<number, (keyof FormData)[]> = {
  1: ['profile_type', 'business_name', 'owner_name', 'email', 'phone', 'city', 'province'],
  2: ['services'],
  3: [],
  4: ['acepto_privacidad'],
};

export function DirectoryJoinForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      profile_type: 'detailer',
      business_name: '', owner_name: '', email: '', phone: '',
      city: '', province: '', portfolio_url: '',
      services: [], brands: [],
      has_taken_course: false, course_name: '',
      has_insurance: false, value_proposition: '',
      acepto_privacidad: false,
    },
  });

  const watched = form.watch();

  const handleLogoSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { toast.error('El logo no puede superar 5MB'); return; }
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  }, []);

  const handleGallerySelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const remaining = 3 - galleryFiles.length;
    const toAdd = files.slice(0, remaining);
    if (toAdd.some(f => f.size > 10 * 1024 * 1024)) { toast.error('Cada foto no puede superar 10MB'); return; }
    setGalleryFiles(prev => [...prev, ...toAdd]);
    setGalleryPreviews(prev => [...prev, ...toAdd.map(f => URL.createObjectURL(f))]);
  }, [galleryFiles.length]);

  const removeGalleryFile = useCallback((index: number) => {
    setGalleryFiles(prev => prev.filter((_, i) => i !== index));
    setGalleryPreviews(prev => prev.filter((_, i) => i !== index));
  }, []);

  const uploadFile = async (file: File, path: string) => {
    const { data, error } = await supabase.storage.from('directory-uploads').upload(path, file, { upsert: true });
    if (error) throw error;
    const { data: urlData } = supabase.storage.from('directory-uploads').getPublicUrl(data.path);
    return urlData.publicUrl;
  };

  const canAdvance = async () => {
    const fields = stepFields[step];
    if (fields.length === 0) return true;
    const valid = await form.trigger(fields);
    return valid;
  };

  const nextStep = async () => {
    if (!(await canAdvance())) return;
    setStep(s => Math.min(s + 1, 4));
  };

  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      let logoUrl: string | null = null;
      const galleryUrls: string[] = [];
      const ts = Date.now();

      if (logoFile) {
        setUploadingLogo(true);
        logoUrl = await uploadFile(logoFile, `logos/${ts}-${logoFile.name}`);
        setUploadingLogo(false);
      }

      if (galleryFiles.length > 0) {
        setUploadingGallery(true);
        for (const file of galleryFiles) {
          const url = await uploadFile(file, `gallery/${ts}-${file.name}`);
          galleryUrls.push(url);
        }
        setUploadingGallery(false);
      }

      const { error } = await supabase.from('directory_applications' as any).insert({
        profile_type: data.profile_type,
        business_name: data.business_name,
        owner_name: data.owner_name,
        email: data.email,
        phone: data.phone,
        city: data.city,
        province: data.province,
        services: data.services,
        experience_level: 'not_specified',
        has_taken_course: data.has_taken_course,
        course_name: data.course_name || null,
        message: data.value_proposition || null,
        logo_url: logoUrl,
        portfolio_url: data.portfolio_url || null,
        brands: data.brands || [],
        has_insurance: data.has_insurance,
        value_proposition: data.value_proposition || null,
        gallery_urls: galleryUrls,
      } as any);

      if (error) throw error;
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      toast.error('Error al enviar la solicitud. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
      setUploadingLogo(false);
      setUploadingGallery(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center space-y-6">
        <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
          <CheckCircle2 className="h-10 w-10 text-primary" />
        </div>
        <h3 className="text-2xl font-bold text-foreground">¡Solicitud enviada!</h3>
        <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
          Tu solicitud está siendo revisada por el equipo de Academia Detail. Te avisaremos cuando tu ficha esté activa.
        </p>
        <Button onClick={() => { setIsSuccess(false); setStep(1); form.reset(); setLogoFile(null); setLogoPreview(null); setGalleryFiles([]); setGalleryPreviews([]); }} variant="outline">
          Enviar otra solicitud
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-10">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          {STEPS.map((s, i) => (
            <div key={s.num} className="flex items-center">
              <div className="flex flex-col items-center gap-1.5">
                <div className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 border-2',
                  step > s.num ? 'bg-primary border-primary text-primary-foreground' :
                  step === s.num ? 'bg-primary/10 border-primary text-primary' :
                  'bg-card border-border text-muted-foreground'
                )}>
                  {step > s.num ? <CheckCircle2 className="h-5 w-5" /> : s.num}
                </div>
                <span className={cn('text-[11px] font-medium', step >= s.num ? 'text-foreground' : 'text-muted-foreground')}>{s.label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={cn('w-12 sm:w-20 h-0.5 mx-2 mb-5 transition-all duration-300', step > s.num ? 'bg-primary' : 'bg-border')} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Form */}
        <div className="lg:col-span-3">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* STEP 1: Identidad */}
              {step === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div>
                    <h2 className="text-xl font-bold text-foreground mb-1">Identidad y ubicación</h2>
                    <p className="text-sm text-muted-foreground">Datos básicos de tu negocio.</p>
                  </div>

                  {/* Type selector */}
                  <FormField control={form.control} name="profile_type" render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { value: 'detailer' as const, label: 'Soy Detailer', desc: 'Profesional independiente', icon: User },
                          { value: 'centro' as const, label: 'Soy Centro', desc: 'Taller establecido', icon: Building2 },
                        ].map((opt) => (
                          <button key={opt.value} type="button" onClick={() => field.onChange(opt.value)}
                            className={cn('flex flex-col items-center gap-2 p-5 rounded-xl border-2 transition-all text-center',
                              field.value === opt.value ? 'border-primary bg-primary/5 text-foreground' : 'border-border bg-card text-muted-foreground hover:border-primary/30'
                            )}>
                            <opt.icon className={cn('h-7 w-7', field.value === opt.value ? 'text-primary' : '')} />
                            <span className="font-semibold text-sm">{opt.label}</span>
                            <span className="text-[11px] text-muted-foreground">{opt.desc}</span>
                          </button>
                        ))}
                      </div>
                    </FormItem>
                  )} />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField control={form.control} name="business_name" render={({ field }) => (
                      <FormItem><FormLabel>Nombre comercial *</FormLabel><FormControl><Input placeholder="Tu negocio" {...field} className="h-11" /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="owner_name" render={({ field }) => (
                      <FormItem><FormLabel>Nombre del titular *</FormLabel><FormControl><Input placeholder="Tu nombre" {...field} className="h-11" /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem><FormLabel>Email *</FormLabel><FormControl><Input type="email" placeholder="tu@email.com" {...field} className="h-11" /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="phone" render={({ field }) => (
                      <FormItem><FormLabel>Teléfono *</FormLabel><FormControl><Input type="tel" placeholder="622 77 35 55" {...field} className="h-11" /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>

                  {/* Logo upload */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Logo (opcional)</label>
                    <div className="flex items-center gap-4">
                      {logoPreview ? (
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-border bg-card">
                          <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" />
                          <button type="button" onClick={() => { setLogoFile(null); setLogoPreview(null); }}
                            className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-white flex items-center justify-center">
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ) : (
                        <label className="w-16 h-16 rounded-xl border-2 border-dashed border-border hover:border-primary/40 bg-card flex items-center justify-center cursor-pointer transition-colors">
                          <Upload className="h-5 w-5 text-muted-foreground" />
                          <input type="file" accept="image/*" className="hidden" onChange={handleLogoSelect} />
                        </label>
                      )}
                      <span className="text-xs text-muted-foreground">PNG, JPG. Máx 5MB</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField control={form.control} name="city" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />Ciudad *</FormLabel>
                        <FormControl><Input placeholder="Madrid" {...field} className="h-11" /></FormControl><FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="province" render={({ field }) => (
                      <FormItem><FormLabel>Provincia *</FormLabel><FormControl><Input placeholder="Madrid" {...field} className="h-11" /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>

                  <FormField control={form.control} name="portfolio_url" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1"><Instagram className="h-3.5 w-3.5" />Portfolio / Instagram (opcional)</FormLabel>
                      <FormControl><Input placeholder="https://instagram.com/tudetailing" {...field} className="h-11" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
              )}

              {/* STEP 2: Especialización */}
              {step === 2 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div>
                    <h2 className="text-xl font-bold text-foreground mb-1">Especialización técnica</h2>
                    <p className="text-sm text-muted-foreground">¿En qué servicios te especializas?</p>
                  </div>

                  <FormField control={form.control} name="services" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Servicios principales *</FormLabel>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {SERVICES.map(({ id, label, icon: Icon }) => {
                          const selected = field.value.includes(id);
                          return (
                            <button key={id} type="button"
                              onClick={() => field.onChange(selected ? field.value.filter((s: string) => s !== id) : [...field.value, id])}
                              className={cn(
                                'flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all',
                                selected ? 'border-primary bg-primary/5 text-foreground' : 'border-border bg-card text-muted-foreground hover:border-primary/30'
                              )}>
                              <Icon className={cn('h-6 w-6', selected ? 'text-primary' : '')} />
                              <span className="text-xs font-semibold">{label}</span>
                            </button>
                          );
                        })}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="brands" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Marcas con las que trabajas (opcional)</FormLabel>
                      <div className="flex flex-wrap gap-2">
                        {BRANDS.map((brand) => {
                          const selected = (field.value || []).includes(brand);
                          return (
                            <button key={brand} type="button"
                              onClick={() => field.onChange(selected ? (field.value || []).filter((b: string) => b !== brand) : [...(field.value || []), brand])}
                              className={cn(
                                'px-3 py-1.5 rounded-full text-xs font-medium transition-all border',
                                selected ? 'bg-primary/15 text-primary border-primary/40' : 'bg-card text-muted-foreground border-border hover:border-primary/30'
                              )}>
                              {brand}
                            </button>
                          );
                        })}
                      </div>
                    </FormItem>
                  )} />
                </div>
              )}

              {/* STEP 3: Confianza */}
              {step === 3 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div>
                    <h2 className="text-xl font-bold text-foreground mb-1">Autoridad y confianza</h2>
                    <p className="text-sm text-muted-foreground">Demuestra tu profesionalidad.</p>
                  </div>

                  <FormField control={form.control} name="has_taken_course" render={({ field }) => (
                    <FormItem>
                      <div className={cn(
                        'p-5 rounded-xl border-2 transition-all',
                        field.value ? 'border-primary bg-primary/5' : 'border-border bg-card'
                      )}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <GraduationCap className={cn('h-6 w-6', field.value ? 'text-primary' : 'text-muted-foreground')} />
                            <div>
                              <p className="font-semibold text-foreground text-sm">¿Has sido alumno de Academia Detail?</p>
                              <p className="text-xs text-muted-foreground">Los alumnos reciben un badge especial</p>
                            </div>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </div>
                        {field.value && (
                          <div className="mt-4 pt-4 border-t border-primary/20">
                            <FormField control={form.control} name="course_name" render={({ field: courseField }) => (
                              <FormItem>
                                <FormLabel className="text-xs">¿Qué curso realizaste?</FormLabel>
                                <FormControl><Input placeholder="Ej: Curso Detailing Profesional" {...courseField} className="h-10" /></FormControl>
                              </FormItem>
                            )} />
                          </div>
                        )}
                      </div>
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="has_insurance" render={({ field }) => (
                    <FormItem>
                      <div className={cn(
                        'p-5 rounded-xl border-2 transition-all',
                        field.value ? 'border-primary bg-primary/5' : 'border-border bg-card'
                      )}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <ShieldCheck className={cn('h-6 w-6', field.value ? 'text-primary' : 'text-muted-foreground')} />
                            <div>
                              <p className="font-semibold text-foreground text-sm">Seguro de Responsabilidad Civil</p>
                              <p className="text-xs text-muted-foreground">Inspira mayor confianza a los clientes</p>
                            </div>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </div>
                      </div>
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="value_proposition" render={({ field }) => (
                    <FormItem>
                      <FormLabel>¿Por qué deberían elegir tu centro? (opcional)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Describe en pocas palabras qué te hace diferente..." className="min-h-[100px] resize-none" maxLength={500} {...field} />
                      </FormControl>
                      <p className="text-[11px] text-muted-foreground text-right">{(field.value || '').length}/500</p>
                    </FormItem>
                  )} />
                </div>
              )}

              {/* STEP 4: Galería */}
              {step === 4 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div>
                    <h2 className="text-xl font-bold text-foreground mb-1">Galería de calidad</h2>
                    <p className="text-sm text-muted-foreground">Sube hasta 3 fotos de tu taller.</p>
                  </div>

                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-3">
                      {galleryPreviews.map((preview, i) => (
                        <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden border border-border bg-card">
                          <img src={preview} alt={`Foto ${i + 1}`} className="w-full h-full object-cover" />
                          <button type="button" onClick={() => removeGalleryFile(i)}
                            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-destructive text-white flex items-center justify-center">
                            <X className="h-3 w-3" />
                          </button>
                          <span className="absolute bottom-2 left-2 text-[10px] font-medium bg-background/70 backdrop-blur-sm px-2 py-0.5 rounded-full text-foreground">
                            {i === 0 ? 'Fachada' : i === 1 ? 'Zona de trabajo' : 'Detalle'}
                          </span>
                        </div>
                      ))}
                      {galleryFiles.length < 3 && (
                        <label className="aspect-[4/3] rounded-xl border-2 border-dashed border-border hover:border-primary/40 bg-card flex flex-col items-center justify-center cursor-pointer transition-colors gap-2">
                          <Camera className="h-6 w-6 text-muted-foreground" />
                          <span className="text-[11px] text-muted-foreground font-medium">Añadir foto</span>
                          <input type="file" accept="image/*" multiple className="hidden" onChange={handleGallerySelect} />
                        </label>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">Fachada, zona de trabajo, detalle de iluminación. Máx 10MB cada una.</p>
                  </div>

                  <FormField control={form.control} name="acepto_privacidad" render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-xl border border-border p-4 bg-card">
                      <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-0.5 h-5 w-5" /></FormControl>
                      <div className="flex-1">
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
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                {step > 1 ? (
                  <Button type="button" variant="ghost" onClick={prevStep} className="gap-2">
                    <ArrowLeft className="h-4 w-4" /> Atrás
                  </Button>
                ) : <div />}

                {step < 4 ? (
                  <Button type="button" onClick={nextStep} className="gap-2 min-w-[140px]">
                    Siguiente <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="submit" disabled={isSubmitting} className="gap-2 min-w-[180px]">
                    {isSubmitting ? (
                      <><Loader2 className="h-4 w-4 animate-spin" />{uploadingLogo ? 'Subiendo logo...' : uploadingGallery ? 'Subiendo fotos...' : 'Enviando...'}</>
                    ) : (
                      <><Send className="h-4 w-4" />Enviar solicitud</>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>

        {/* Live Preview Card */}
        <div className="lg:col-span-2 hidden lg:block">
          <div className="sticky top-28">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Vista previa de tu ficha</p>
            <Card className="overflow-hidden border-border/50 bg-card">
              <div className="aspect-[16/9] bg-muted relative flex items-center justify-center">
                {logoPreview ? (
                  <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" />
                ) : galleryPreviews[0] ? (
                  <img src={galleryPreviews[0]} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl font-bold text-muted-foreground/20">
                    {watched.business_name?.charAt(0) || '?'}
                  </span>
                )}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-primary/20 text-primary border border-primary/40">
                    <Shield className="h-3 w-3" /> Certificado Pro
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-background/80 backdrop-blur-sm text-foreground border border-border/50">
                    {watched.profile_type === 'centro' ? <><Building2 className="h-3 w-3" /> Centro</> : <><User className="h-3 w-3" /> Detailer</>}
                  </span>
                </div>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-bold text-foreground text-lg leading-tight">
                    {watched.business_name || 'Tu negocio'}
                  </h3>
                  <div className="flex items-center gap-1 mt-1 text-muted-foreground text-sm">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    <span>{watched.city || 'Ciudad'}, {watched.province || 'Provincia'}</span>
                  </div>
                </div>
                {watched.services.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {watched.services.slice(0, 4).map((s) => (
                      <span key={s} className="px-2 py-0.5 text-[11px] font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
                {watched.has_taken_course && (
                  <div className="flex items-center gap-1.5 text-xs text-primary">
                    <GraduationCap className="h-3.5 w-3.5" />
                    <span className="font-medium">Alumno Academia Detail</span>
                  </div>
                )}
                {watched.has_insurance && (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>Seguro RC</span>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

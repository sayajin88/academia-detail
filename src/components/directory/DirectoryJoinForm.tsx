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
  MapPin, Sparkles, ShieldCheck, Camera, Upload, X,
  Paintbrush, Shield, Car, Armchair, Wrench, Cog, Instagram,
  Crown, Star, GraduationCap, Globe, Phone, Clock, Briefcase,
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

const SPECIALTIES = [
  'Detailing', 'PPF', 'Wrapping', 'Restauración', 'Multiservicios',
];

const SKILLS = [
  'Corrección de pintura', 'Coating cerámico', 'Descontaminación',
  'Limpieza de interiores', 'Restauración de faros', 'Pulido a máquina',
  'Tratamiento de cuero', 'Detailing de motor', 'Protección PPF',
  'Wrapping vinilo', 'Lavado sin agua', 'Ozone / Ozono',
];

const EXPERIENCE_OPTIONS = [
  { value: '1-3', label: '1–3 años' },
  { value: '3-5', label: '3–5 años' },
  { value: '5-10', label: '5–10 años' },
  { value: '10+', label: '+10 años' },
];

const STEPS = [
  { num: 1, label: 'Identidad' },
  { num: 2, label: 'Ubicación' },
  { num: 3, label: 'Especialización' },
  { num: 4, label: 'Confianza' },
  { num: 5, label: 'Galería' },
  { num: 6, label: 'Confirmar' },
];

const schema = z.object({
  profile_type: z.enum(['detailer', 'centro']),
  business_name: z.string().trim().min(1, 'Obligatorio').max(100),
  owner_name: z.string().trim().min(1, 'Obligatorio').max(100),
  email: z.string().trim().email('Email no válido'),
  phone: z.string().trim().min(9, 'Teléfono no válido').max(20),
  whatsapp_number: z.string().max(20).optional(),
  city: z.string().trim().min(1, 'Obligatorio').max(100),
  province: z.string().trim().min(1, 'Obligatorio').max(100),
  address: z.string().max(200).optional(),
  zip_code: z.string().max(10).optional(),
  portfolio_url: z.string().max(500).optional(),
  services: z.array(z.string()).min(1, 'Selecciona al menos un servicio'),
  brands: z.array(z.string()).optional(),
  specialty: z.string().optional(),
  skills: z.array(z.string()).optional(),
  years_experience: z.string().optional(),
  has_taken_course: z.boolean(),
  course_name: z.string().optional(),
  has_insurance: z.boolean(),
  value_proposition: z.string().max(500).optional(),
  description: z.string().max(1000).optional(),
  website_url: z.string().max(500).optional(),
  instagram_handle: z.string().max(100).optional(),
  acepto_privacidad: z.boolean().refine((v) => v, { message: 'Debes aceptar la política de privacidad' }),
});

type FormData = z.infer<typeof schema>;

const stepFields: Record<number, (keyof FormData)[]> = {
  1: ['profile_type', 'business_name', 'owner_name', 'email', 'phone'],
  2: ['city', 'province'],
  3: ['services'],
  4: [],
  5: [],
  6: ['acepto_privacidad'],
};

const TOTAL_STEPS = 6;

const SUBSCRIPTION_BENEFITS = [
  'Ficha profesional verificada',
  'Visibilidad SEO en Google',
  'Badge de confianza para clientes',
  'Contacto directo (teléfono, WhatsApp, email)',
  'Galería de trabajos realizados',
];

export function DirectoryJoinForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [profilePhotoFile, setProfilePhotoFile] = useState<File | null>(null);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState<string | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      profile_type: 'detailer',
      business_name: '', owner_name: '', email: '', phone: '', whatsapp_number: '',
      city: '', province: '', address: '', zip_code: '',
      portfolio_url: '', website_url: '', instagram_handle: '',
      services: [], brands: [], skills: [],
      specialty: '', years_experience: '',
      has_taken_course: false, course_name: '',
      has_insurance: false, value_proposition: '', description: '',
      acepto_privacidad: false,
    },
  });

  const watched = form.watch();

  const handleFileSelect = useCallback((
    setter: (f: File | null) => void,
    previewSetter: (s: string | null) => void,
    maxMb: number
  ) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > maxMb * 1024 * 1024) { toast.error(`El archivo no puede superar ${maxMb}MB`); return; }
    setter(file);
    previewSetter(URL.createObjectURL(file));
  }, []);

  const handleGallerySelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const remaining = 5 - galleryFiles.length;
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
    return await form.trigger(fields);
  };

  const nextStep = async () => {
    if (!(await canAdvance())) return;
    setStep(s => Math.min(s + 1, TOTAL_STEPS));
  };

  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const parseYearsExperience = (val: string | undefined): number | null => {
    if (!val) return null;
    const map: Record<string, number> = { '1-3': 2, '3-5': 4, '5-10': 7, '10+': 12 };
    return map[val] ?? null;
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      let logoUrl: string | null = null;
      let profilePhotoUrl: string | null = null;
      const galleryUrls: string[] = [];
      const ts = Date.now();

      if (logoFile) {
        setUploadingLogo(true);
        logoUrl = await uploadFile(logoFile, `logos/${ts}-${logoFile.name}`);
        setUploadingLogo(false);
      }

      if (profilePhotoFile) {
        profilePhotoUrl = await uploadFile(profilePhotoFile, `photos/${ts}-${profilePhotoFile.name}`);
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
        experience_level: data.years_experience || 'not_specified',
        has_taken_course: data.has_taken_course,
        course_name: data.course_name || null,
        message: data.value_proposition || null,
        logo_url: logoUrl,
        portfolio_url: data.portfolio_url || null,
        brands: data.brands || [],
        has_insurance: data.has_insurance,
        value_proposition: data.value_proposition || null,
        gallery_urls: galleryUrls,
        // New fields
        owner_photo_url: profilePhotoUrl,
        description: data.description || null,
        website_url: data.website_url || null,
        whatsapp_number: data.whatsapp_number || null,
        instagram_handle: data.instagram_handle || null,
        years_experience: parseYearsExperience(data.years_experience),
        specialty: data.specialty || null,
        skills: data.skills || [],
        address: data.address || null,
        zip_code: data.zip_code || null,
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
        <Button onClick={() => { setIsSuccess(false); setStep(1); form.reset(); setLogoFile(null); setLogoPreview(null); setProfilePhotoFile(null); setProfilePhotoPreview(null); setGalleryFiles([]); setGalleryPreviews([]); }} variant="outline">
          Enviar otra solicitud
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-10">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          {STEPS.map((s, i) => (
            <div key={s.num} className="flex items-center">
              <div className="flex flex-col items-center gap-1.5">
                <div className={cn(
                  'w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 border-2',
                  step > s.num ? 'bg-primary border-primary text-primary-foreground' :
                  step === s.num ? 'bg-primary/10 border-primary text-primary' :
                  'bg-card border-border text-muted-foreground'
                )}>
                  {step > s.num ? <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5" /> : s.num}
                </div>
                <span className={cn('text-[10px] sm:text-[11px] font-medium hidden sm:block', step >= s.num ? 'text-foreground' : 'text-muted-foreground')}>{s.label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={cn('w-6 sm:w-14 h-0.5 mx-1 sm:mx-2 mb-0 sm:mb-5 transition-all duration-300', step > s.num ? 'bg-primary' : 'bg-border')} />
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
                    <h2 className="text-xl font-bold text-foreground mb-1">Identidad</h2>
                    <p className="text-sm text-muted-foreground">Datos básicos de contacto.</p>
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

                  <FormField control={form.control} name="whatsapp_number" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1"><Phone className="h-3.5 w-3.5" />WhatsApp (opcional)</FormLabel>
                      <FormControl><Input type="tel" placeholder="622 77 35 55" {...field} className="h-11" /></FormControl>
                    </FormItem>
                  )} />
                </div>
              )}

              {/* STEP 2: Ubicación y fotos */}
              {step === 2 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div>
                    <h2 className="text-xl font-bold text-foreground mb-1">Ubicación y fotos</h2>
                    <p className="text-sm text-muted-foreground">¿Dónde estás y cómo te ven?</p>
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField control={form.control} name="address" render={({ field }) => (
                      <FormItem><FormLabel>Dirección (opcional)</FormLabel><FormControl><Input placeholder="Calle Ejemplo, 12" {...field} className="h-11" /></FormControl></FormItem>
                    )} />
                    <FormField control={form.control} name="zip_code" render={({ field }) => (
                      <FormItem><FormLabel>Código Postal (opcional)</FormLabel><FormControl><Input placeholder="28001" {...field} className="h-11" /></FormControl></FormItem>
                    )} />
                  </div>

                  {/* Profile photo & Logo side by side */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Profile Photo */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Tu foto de perfil (opcional)</label>
                      <div className="flex flex-col items-center gap-3">
                        {profilePhotoPreview ? (
                          <div className="relative">
                            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary/30">
                              <img src={profilePhotoPreview} alt="Perfil" className="w-full h-full object-cover" />
                            </div>
                            <button type="button" onClick={() => { setProfilePhotoFile(null); setProfilePhotoPreview(null); }}
                              className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-destructive text-white flex items-center justify-center">
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ) : (
                          <label className="w-24 h-24 rounded-full border-2 border-dashed border-border hover:border-primary/40 bg-card flex flex-col items-center justify-center cursor-pointer transition-colors gap-1">
                            <User className="h-6 w-6 text-muted-foreground" />
                            <span className="text-[10px] text-muted-foreground">Subir</span>
                            <input type="file" accept="image/*" className="hidden" onChange={handleFileSelect(setProfilePhotoFile, setProfilePhotoPreview, 5)} />
                          </label>
                        )}
                        <span className="text-[11px] text-muted-foreground">Foto circular. Máx 5MB</span>
                      </div>
                    </div>

                    {/* Logo */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Logo del negocio (opcional)</label>
                      <div className="flex flex-col items-center gap-3">
                        {logoPreview ? (
                          <div className="relative">
                            <div className="w-24 h-24 rounded-xl overflow-hidden border border-border bg-card">
                              <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" />
                            </div>
                            <button type="button" onClick={() => { setLogoFile(null); setLogoPreview(null); }}
                              className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-destructive text-white flex items-center justify-center">
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ) : (
                          <label className="w-24 h-24 rounded-xl border-2 border-dashed border-border hover:border-primary/40 bg-card flex flex-col items-center justify-center cursor-pointer transition-colors gap-1">
                            <Upload className="h-6 w-6 text-muted-foreground" />
                            <span className="text-[10px] text-muted-foreground">Subir</span>
                            <input type="file" accept="image/*" className="hidden" onChange={handleFileSelect(setLogoFile, setLogoPreview, 5)} />
                          </label>
                        )}
                        <span className="text-[11px] text-muted-foreground">PNG, JPG. Máx 5MB</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Especialización */}
              {step === 3 && (
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

                  {/* Specialty */}
                  <FormField control={form.control} name="specialty" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" />Especialidad principal (opcional)</FormLabel>
                      <div className="flex flex-wrap gap-2">
                        {SPECIALTIES.map((sp) => (
                          <button key={sp} type="button"
                            onClick={() => field.onChange(field.value === sp ? '' : sp)}
                            className={cn(
                              'px-4 py-2 rounded-full text-xs font-semibold transition-all border',
                              field.value === sp ? 'bg-primary/15 text-primary border-primary/40' : 'bg-card text-muted-foreground border-border hover:border-primary/30'
                            )}>
                            {sp}
                          </button>
                        ))}
                      </div>
                    </FormItem>
                  )} />

                  {/* Years experience */}
                  <FormField control={form.control} name="years_experience" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />Años de experiencia (opcional)</FormLabel>
                      <div className="flex flex-wrap gap-2">
                        {EXPERIENCE_OPTIONS.map((opt) => (
                          <button key={opt.value} type="button"
                            onClick={() => field.onChange(field.value === opt.value ? '' : opt.value)}
                            className={cn(
                              'px-4 py-2 rounded-full text-xs font-semibold transition-all border',
                              field.value === opt.value ? 'bg-primary/15 text-primary border-primary/40' : 'bg-card text-muted-foreground border-border hover:border-primary/30'
                            )}>
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </FormItem>
                  )} />

                  {/* Skills chips */}
                  <FormField control={form.control} name="skills" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Habilidades técnicas (opcional)</FormLabel>
                      <div className="flex flex-wrap gap-2">
                        {SKILLS.map((skill) => {
                          const selected = (field.value || []).includes(skill);
                          return (
                            <button key={skill} type="button"
                              onClick={() => field.onChange(selected ? (field.value || []).filter((s: string) => s !== skill) : [...(field.value || []), skill])}
                              className={cn(
                                'px-3 py-1.5 rounded-full text-xs font-medium transition-all border',
                                selected ? 'bg-primary/15 text-primary border-primary/40' : 'bg-card text-muted-foreground border-border hover:border-primary/30'
                              )}>
                              {skill}
                            </button>
                          );
                        })}
                      </div>
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

              {/* STEP 4: Confianza y presencia */}
              {step === 4 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div>
                    <h2 className="text-xl font-bold text-foreground mb-1">Autoridad y presencia online</h2>
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField control={form.control} name="website_url" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-1"><Globe className="h-3.5 w-3.5" />Web (opcional)</FormLabel>
                        <FormControl><Input placeholder="https://tudetailing.com" {...field} className="h-11" /></FormControl>
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="instagram_handle" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-1"><Instagram className="h-3.5 w-3.5" />Instagram (opcional)</FormLabel>
                        <FormControl><Input placeholder="@tudetailing" {...field} className="h-11" /></FormControl>
                      </FormItem>
                    )} />
                  </div>

                  <FormField control={form.control} name="portfolio_url" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Portfolio / Enlace adicional (opcional)</FormLabel>
                      <FormControl><Input placeholder="https://..." {...field} className="h-11" /></FormControl>
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="description" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripción / Bio (opcional)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Cuéntanos sobre ti, tu trayectoria y lo que te apasiona del detailing..." className="min-h-[100px] resize-none" maxLength={1000} {...field} />
                      </FormControl>
                      <p className="text-[11px] text-muted-foreground text-right">{(field.value || '').length}/1000</p>
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="value_proposition" render={({ field }) => (
                    <FormItem>
                      <FormLabel>¿Por qué deberían elegirte? (opcional)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Describe en pocas palabras qué te hace diferente..." className="min-h-[80px] resize-none" maxLength={500} {...field} />
                      </FormControl>
                      <p className="text-[11px] text-muted-foreground text-right">{(field.value || '').length}/500</p>
                    </FormItem>
                  )} />
                </div>
              )}

              {/* STEP 5: Galería */}
              {step === 5 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div>
                    <h2 className="text-xl font-bold text-foreground mb-1">Galería de calidad</h2>
                    <p className="text-sm text-muted-foreground">Sube hasta 5 fotos de tu taller o trabajos.</p>
                  </div>

                  <div className="space-y-3">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {galleryPreviews.map((preview, i) => (
                        <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden border border-border bg-card">
                          <img src={preview} alt={`Foto ${i + 1}`} className="w-full h-full object-cover" />
                          <button type="button" onClick={() => removeGalleryFile(i)}
                            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-destructive text-white flex items-center justify-center">
                            <X className="h-3 w-3" />
                          </button>
                          <span className="absolute bottom-2 left-2 text-[10px] font-medium bg-background/70 backdrop-blur-sm px-2 py-0.5 rounded-full text-foreground">
                            Foto {i + 1}
                          </span>
                        </div>
                      ))}
                      {galleryFiles.length < 5 && (
                        <label className="aspect-[4/3] rounded-xl border-2 border-dashed border-border hover:border-primary/40 bg-card flex flex-col items-center justify-center cursor-pointer transition-colors gap-2">
                          <Camera className="h-6 w-6 text-muted-foreground" />
                          <span className="text-[11px] text-muted-foreground font-medium">Añadir foto</span>
                          <input type="file" accept="image/*" multiple className="hidden" onChange={handleGallerySelect} />
                        </label>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">Fachada, zona de trabajo, iluminación, trabajos realizados. Máx 10MB cada una.</p>
                  </div>

                </div>
              )}

              {/* STEP 6: Confirmación */}
              {step === 6 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div>
                    <h2 className="text-xl font-bold text-foreground mb-1">Confirma tu inscripción</h2>
                    <p className="text-sm text-muted-foreground">Revisa el precio y confirma para enviar tu solicitud.</p>
                  </div>

                  {/* Pricing Card */}
                  <Card className="border-primary/30 bg-gradient-to-br from-card to-primary/5 overflow-hidden">
                    <div className="p-6 space-y-5">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-primary/10 text-primary border border-primary/30 animate-pulse">
                          <Clock className="h-3 w-3" />
                          Oferta limitada
                        </span>
                      </div>

                      <div className="text-center space-y-1">
                        <p className="text-lg text-muted-foreground line-through">4,99 €/mes</p>
                        <p className="text-4xl font-black text-green-500">0 €/mes</p>
                        <p className="text-sm text-muted-foreground">
                          Gratis hasta el 31 de Marzo de 2026. Después: 4,99 €/mes
                        </p>
                      </div>

                      <div className="border-t border-border pt-4 space-y-2.5">
                        <p className="text-xs font-semibold text-foreground uppercase tracking-wider">Tu suscripción incluye:</p>
                        {SUBSCRIPTION_BENEFITS.map((benefit) => (
                          <div key={benefit} className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm text-foreground">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>

                  {/* Privacy checkbox */}
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

                {step < TOTAL_STEPS ? (
                  <Button type="button" onClick={nextStep} className="gap-2 min-w-[140px]">
                    Siguiente <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="submit" disabled={isSubmitting} className="gap-2 min-w-[220px]">
                    {isSubmitting ? (
                      <><Loader2 className="h-4 w-4 animate-spin" />{uploadingLogo ? 'Subiendo logo...' : uploadingGallery ? 'Subiendo fotos...' : 'Enviando...'}</>
                    ) : (
                      <><CheckCircle2 className="h-4 w-4" />Confirmar inscripción gratuita</>
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
                {/* Profile photo overlay */}
                {profilePhotoPreview && (
                  <div className="absolute -bottom-6 left-4 w-14 h-14 rounded-full border-2 border-card overflow-hidden shadow-lg">
                    <img src={profilePhotoPreview} alt="Perfil" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
              <div className={cn("p-4 space-y-3", profilePhotoPreview ? "pt-8" : "")}>
                <div>
                  <h3 className="font-bold text-foreground text-lg leading-tight">
                    {watched.business_name || 'Tu negocio'}
                  </h3>
                  <p className="text-xs text-muted-foreground">{watched.owner_name || 'Tu nombre'}</p>
                  <div className="flex items-center gap-1 mt-1 text-muted-foreground text-sm">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    <span>{watched.city || 'Ciudad'}, {watched.province || 'Provincia'}</span>
                  </div>
                </div>

                {watched.specialty && (
                  <div className="flex items-center gap-1.5 text-xs">
                    <Briefcase className="h-3.5 w-3.5 text-primary" />
                    <span className="font-medium text-foreground">{watched.specialty}</span>
                  </div>
                )}

                {watched.years_experience && (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{EXPERIENCE_OPTIONS.find(o => o.value === watched.years_experience)?.label || watched.years_experience}</span>
                  </div>
                )}

                {watched.services.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {watched.services.slice(0, 4).map((s) => (
                      <span key={s} className="px-2 py-0.5 text-[11px] font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                        {s}
                      </span>
                    ))}
                  </div>
                )}

                {(watched.skills || []).length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {(watched.skills || []).slice(0, 3).map((sk) => (
                      <span key={sk} className="px-1.5 py-0.5 text-[10px] rounded bg-muted text-muted-foreground">{sk}</span>
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
                {watched.instagram_handle && (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Instagram className="h-3.5 w-3.5" />
                    <span>{watched.instagram_handle}</span>
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

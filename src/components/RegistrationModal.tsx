import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { X, Star, Shield, Clock, Users, CheckCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const registrationSchema = z.object({
  firstName: z.string().trim().min(2, "Nombre debe tener al menos 2 caracteres").max(50, "Nombre muy largo"),
  lastName: z.string().trim().min(2, "Apellidos deben tener al menos 2 caracteres").max(50, "Apellidos muy largos"),
  email: z.string().trim().email("Email no válido").max(255, "Email muy largo"),
  phone: z.string().trim().regex(/^[+]?[0-9]{9,15}$/, "Teléfono no válido"),
  acceptTerms: z.boolean().refine(val => val === true, "Debes aceptar los términos"),
  acceptMarketing: z.boolean()
});

export function RegistrationModal({ isOpen, onClose }: RegistrationModalProps) {
  const [step, setStep] = useState<'registration' | 'confirmation'>('registration');
  const [loading, setLoading] = useState(false);
  const [registrationId, setRegistrationId] = useState<string>("");
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    acceptTerms: false,
    acceptMarketing: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      // Validar datos
      const validatedData = registrationSchema.parse(formData);
      
      // Guardar en Supabase
      const { data, error } = await supabase
        .from('registrations')
        .insert([
          {
            first_name: validatedData.firstName,
            last_name: validatedData.lastName,
            email: validatedData.email,
            phone: validatedData.phone,
            accept_terms: validatedData.acceptTerms,
            accept_marketing: validatedData.acceptMarketing,
            payment_status: 'pending'
          }
        ])
        .select()
        .single();

      if (error) {
        console.error('Registration insert error:', error);
        if ((error as any).code === '23505') { // Duplicate email
          toast.error("Este email ya está registrado");
          return;
        }
        throw error;
      }

      const newRegistrationId = data.id;
      setRegistrationId(newRegistrationId);
      
      // Enviar emails de confirmación
      try {
        const emailResponse = await supabase.functions.invoke('send-registration-emails', {
          body: {
            id: newRegistrationId,
            firstName: validatedData.firstName,
            lastName: validatedData.lastName,
            email: validatedData.email,
            phone: validatedData.phone,
            eventDate: "Sábado 13 de Diciembre, 2025",
            price: "€199 + IVA",
            reservationExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('es-ES', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })
          }
        });

        if (emailResponse.error) {
          console.error('Email sending error:', emailResponse.error);
        } else {
          console.log('Emails sent successfully');
        }
      } catch (emailError) {
        console.error('Failed to send emails:', emailError);
      }
      
      // Crear sesión de pago con Stripe
      const { data: checkoutData, error: checkoutError } = await supabase.functions.invoke('create-checkout', {
        body: { registrationId: newRegistrationId }
      });

      if (checkoutError || !checkoutData?.url) {
        console.error('Checkout creation error:', checkoutError);
        toast.error("Error al crear la sesión de pago");
        return;
      }

      // Redirigir a Stripe Checkout
      window.location.href = checkoutData.url;
      
    } catch (error) {
      console.error('Registration submit failed:', error);
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error("Error al registrar. Intenta de nuevo");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStep('registration');
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      acceptTerms: false,
      acceptMarketing: false
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="glass-intense border-primary/30 max-w-lg mx-auto max-h-[90vh] overflow-y-auto">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-white/70 hover:text-white transition-colors z-50"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'registration' ? (
          <>
            <DialogHeader className="text-center space-y-4">
              <div className="flex flex-wrap justify-center items-center gap-2 mb-2">
                <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30 text-xs md:text-sm">
                  🔥 EVENTO EXCLUSIVO
                </Badge>
                <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30 text-xs md:text-sm">
                  40% OFF
                </Badge>
              </div>
              
              <DialogTitle className="text-xl md:text-2xl lg:text-3xl font-bold gradient-text">
                ¡Reserva Tu Plaza!
              </DialogTitle>
              
              <DialogDescription className="text-white/70 text-sm">
                Completa el formulario para reservar tu plaza en La Jornada Cero
              </DialogDescription>
              
              <div className="bg-gradient-primary/20 rounded-xl p-3 md:p-4 border border-primary/30">
                <div className="text-center">
                  <div className="text-sm md:text-base lg:text-lg text-white/90 mb-2">Jornada Intensiva de 1 Día</div>
                  <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
                    <span className="text-lg md:text-xl lg:text-2xl text-white/60 line-through">€999 + IVA</span>
                    <span className="text-2xl md:text-3xl lg:text-4xl font-bold gradient-text">€199 + IVA</span>
                  </div>
                  <div className="text-xs md:text-sm text-white/70 mt-2">
                    Ahorras €800 (80% dto.) - Solo 12 plazas
                  </div>
                </div>
              </div>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6 mt-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-white text-sm font-semibold">
                    Nombre *
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary"
                    placeholder="Tu nombre"
                    required
                    disabled={loading}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-white text-sm font-semibold">
                    Apellidos *
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary"
                    placeholder="Tus apellidos"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-white text-sm font-semibold">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary"
                  placeholder="tu@email.com"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-white text-sm font-semibold">
                  Teléfono *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary"
                  placeholder="+34 600 000 000"
                  required
                  disabled={loading}
                />
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="flex flex-col items-center">
                    <Shield className="w-5 h-5 text-primary mb-1" />
                    <span className="text-xs text-white/80">Pago Seguro</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Clock className="w-5 h-5 text-primary mb-1" />
                    <span className="text-xs text-white/80">1 Día Intensivo</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Users className="w-5 h-5 text-primary mb-1" />
                    <span className="text-xs text-white/80">Máx. 12 Plazas</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-primary/10 rounded-lg p-3 border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-white/80">Carlos M., Madrid</span>
                </div>
                <p className="text-xs text-white/90 italic">
                  "Increíble experiencia. En un día aprendí más que en meses viendo videos online."
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.acceptTerms}
                    onCheckedChange={(checked) => handleInputChange("acceptTerms", checked as boolean)}
                    className="border-white/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    disabled={loading}
                  />
                  <Label htmlFor="terms" className="text-xs text-white/80 leading-tight">
                    Acepto los términos y condiciones y la política de privacidad *
                  </Label>
                </div>
                
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="marketing"
                    checked={formData.acceptMarketing}
                    onCheckedChange={(checked) => handleInputChange("acceptMarketing", checked as boolean)}
                    className="border-white/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    disabled={loading}
                  />
                  <Label htmlFor="marketing" className="text-xs text-white/80 leading-tight">
                    Quiero recibir información de futuros eventos y ofertas
                  </Label>
                </div>
              </div>

              <Button 
                type="submit" 
                variant="hero" 
                size="xl" 
                className="w-full"
                disabled={!formData.acceptTerms || loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  <>🚀 RESERVAR MI PLAZA - €199 + IVA</>
                )}
              </Button>

              <div className="text-center">
                <p className="text-xs text-white/60">
                  Evento perfecto para iniciarse en el detailing profesional
                </p>
              </div>
            </form>
          </>
        ) : (
          <>
            <DialogHeader className="text-center space-y-4">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center animate-scale-in">
                  <CheckCircle className="w-10 h-10 text-primary" />
                </div>
              </div>
              
              <DialogTitle className="text-xl md:text-2xl lg:text-3xl font-bold gradient-text">
                ¡Pre-inscripción Exitosa!
              </DialogTitle>
              
              <DialogDescription className="text-white/80 text-sm md:text-base">
                Tu plaza está reservada temporalmente
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 mt-6">
              <div className="glass-card p-6 rounded-xl space-y-4">
                {registrationId && (
                  <div className="flex justify-between items-center pb-4 border-b border-white/10">
                    <span className="font-semibold text-white">ID de Pre-inscripción:</span>
                    <span className="font-mono text-sm text-primary">{registrationId?.slice(0, 8).toUpperCase()}</span>
                  </div>
                )}
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Nombre:</span>
                    <span className="font-medium text-white">{formData.firstName} {formData.lastName}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Email:</span>
                    <span className="font-medium text-white">{formData.email}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Evento:</span>
                    <span className="font-medium text-white">13 de Diciembre, 2025</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Precio:</span>
                    <span className="font-medium text-primary">€199 + IVA (80% dto.)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-center text-white text-lg">Próximos Pasos</h3>
                <div className="space-y-3">
                  <div className="flex gap-3 items-start glass-card p-3 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary">1</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-white">📧 Revisa tu email</p>
                      <p className="text-xs text-white/70">Recibirás un correo de confirmación en los próximos minutos</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 items-start glass-card p-3 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary">2</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-white">💳 Recibirás el enlace de pago</p>
                      <p className="text-xs text-white/70">En las próximas 24-48h te enviaremos el acceso para completar tu pago</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 items-start glass-card p-3 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary">3</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-white">⏰ Completa tu pago</p>
                      <p className="text-xs text-white/70">Tendrás 7 días para confirmar tu plaza con el pago</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 items-start glass-card p-3 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary">4</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-white">🎉 ¡Listo para La Jornada Cero!</p>
                      <p className="text-xs text-white/70">Recibirás toda la información del evento por email</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary/10 p-4 rounded-lg border border-primary/30 space-y-2">
                <p className="text-sm font-semibold text-center text-white">Información Importante</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>• Tu plaza está reservada por 7 días</li>
                  <li>• Plazas limitadas a 12 personas</li>
                  <li>• Precio con 80% de descuento: €199 + IVA</li>
                  <li>• Fecha: Sábado 13 de Diciembre, 2025</li>
                  <li>• Horario: 10:00 AM - 18:00 PM</li>
                </ul>
              </div>

              <Button 
                variant="hero"
                size="lg" 
                className="w-full"
                onClick={handleClose}
              >
                Entendido
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
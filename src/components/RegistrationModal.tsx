import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
  const [step, setStep] = useState<'registration' | 'payment'>('registration');
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
        if (error.code === '23505') { // Duplicate email
          toast.error("Este email ya está registrado");
          return;
        }
        throw error;
      }

      setRegistrationId(data.id);
      toast.success("¡Registro exitoso! Procede al pago");
      setStep('payment');
      
    } catch (error) {
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
              <div className="flex justify-center items-center gap-2 mb-2">
                <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                  🔥 EVENTO EXCLUSIVO
                </Badge>
                <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                  40% OFF
                </Badge>
              </div>
              
              <DialogTitle className="text-3xl font-bold gradient-text">
                ¡Reserva Tu Plaza en UP DETAIL!
              </DialogTitle>
              
              <div className="bg-gradient-primary/20 rounded-xl p-4 border border-primary/30">
                <div className="text-center">
                  <div className="text-lg text-white/90 mb-2">Jornada Intensiva de 1 Día</div>
                  <div className="flex items-center justify-center gap-4">
                    <span className="text-2xl text-white/60 line-through">€999 + IVA</span>
                    <span className="text-4xl font-bold gradient-text">€299 + IVA</span>
                  </div>
                  <div className="text-sm text-white/70 mt-2">
                    Ahorras €700 - Solo 10 plazas máximo
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
                    <span className="text-xs text-white/80">Máx. 10 Plazas</span>
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
                  <>🚀 CONTINUAR AL PAGO - €299 + IVA</>
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
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-primary" />
                </div>
              </div>
              
              <DialogTitle className="text-3xl font-bold gradient-text">
                ¡Un Paso Más!
              </DialogTitle>
              
              <p className="text-white/80">
                Completa tu reserva para el evento UP DETAIL
              </p>
            </DialogHeader>

            <div className="space-y-6 mt-6">
              <div className="glass-card p-6 rounded-xl space-y-4">
                <h3 className="text-lg font-bold text-white mb-4">Resumen del Pedido</h3>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-white/80">
                    <span>Evento UP DETAIL (1 día)</span>
                    <span>€999 + IVA</span>
                  </div>
                  <div className="flex justify-between text-primary font-semibold">
                    <span>Descuento especial (70%)</span>
                    <span>-€700</span>
                  </div>
                  <div className="border-t border-white/10 pt-2 mt-2">
                    <div className="flex justify-between text-white font-bold text-xl">
                      <span>Total a Pagar</span>
                      <span className="gradient-text">€299 + IVA</span>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/10 rounded-lg p-3 mt-4">
                  <h4 className="text-white font-semibold mb-2 text-sm">✅ Incluye:</h4>
                  <ul className="text-xs text-white/80 space-y-1">
                    <li>• Jornada completa 9:00-18:00h</li>
                    <li>• Formación práctica hands-on</li>
                    <li>• Material y productos profesionales</li>
                    <li>• Comida incluida</li>
                    <li>• Certificado de asistencia</li>
                    <li>• Acceso a comunidad exclusiva</li>
                  </ul>
                </div>
              </div>

              <div className="glass-card p-6 rounded-xl text-center">
                <p className="text-white/80 mb-4">
                  La integración de pago con Stripe se configurará próximamente
                </p>
                <div className="bg-primary/20 border border-primary/30 rounded-lg p-4">
                  <p className="text-white font-semibold mb-2">
                    🎉 ¡Tu registro se ha guardado correctamente!
                  </p>
                  <p className="text-white/70 text-sm">
                    ID de Registro: {registrationId.substring(0, 8)}...
                  </p>
                </div>
              </div>

              <Button 
                variant="glass" 
                size="lg" 
                className="w-full"
                onClick={handleClose}
              >
                Cerrar
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
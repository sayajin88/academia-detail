import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { X, Star, Shield, Clock, Users } from "lucide-react";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RegistrationModal({ isOpen, onClose }: RegistrationModalProps) {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Conectar con Supabase para registro
    console.log("Datos de registro:", formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-intense border-primary/30 max-w-lg mx-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-white/70 hover:text-white transition-colors z-50"
        >
          <X className="w-5 h-5" />
        </button>

        <DialogHeader className="text-center space-y-4">
          <div className="flex justify-center items-center gap-2 mb-2">
            <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
              🔥 OFERTA LIMITADA
            </Badge>
            <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
              40% OFF
            </Badge>
          </div>
          
          <DialogTitle className="text-3xl font-bold gradient-text">
            ¡Reserva Tu Plaza Ahora!
          </DialogTitle>
          
          <div className="bg-gradient-primary/20 rounded-xl p-4 border border-primary/30">
            <div className="text-center">
              <div className="text-lg text-white/90 mb-2">Precio especial por tiempo limitado</div>
              <div className="flex items-center justify-center gap-4">
                <span className="text-2xl text-white/60 line-through">€297</span>
                <span className="text-4xl font-bold gradient-text">€178</span>
              </div>
              <div className="text-sm text-white/70 mt-2">
                Ahorras €119 - Solo quedan 7 plazas
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
            />
          </div>

          {/* Trust Signals */}
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="flex flex-col items-center">
                <Shield className="w-5 h-5 text-primary mb-1" />
                <span className="text-xs text-white/80">Pago Seguro</span>
              </div>
              <div className="flex flex-col items-center">
                <Clock className="w-5 h-5 text-primary mb-1" />
                <span className="text-xs text-white/80">Acceso Inmediato</span>
              </div>
              <div className="flex flex-col items-center">
                <Users className="w-5 h-5 text-primary mb-1" />
                <span className="text-xs text-white/80">+2,500 Alumnos</span>
              </div>
            </div>
          </div>

          {/* Testimonial Mini */}
          <div className="bg-gradient-primary/10 rounded-lg p-3 border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>
              <span className="text-xs text-white/80">María G., Barcelona</span>
            </div>
            <p className="text-xs text-white/90 italic">
              "En 2 meses recuperé la inversión. Ahora facturo €3,000/mes."
            </p>
          </div>

          {/* Checkboxes */}
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={formData.acceptTerms}
                onCheckedChange={(checked) => handleInputChange("acceptTerms", checked as boolean)}
                className="border-white/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
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
              />
              <Label htmlFor="marketing" className="text-xs text-white/80 leading-tight">
                Quiero recibir consejos exclusivos y ofertas especiales por email
              </Label>
            </div>
          </div>

          <Button 
            type="submit" 
            variant="hero" 
            size="xl" 
            className="w-full animate-pulse hover:animate-none"
            disabled={!formData.acceptTerms}
          >
            🚀 RESERVAR MI PLAZA - €178
          </Button>

          <div className="text-center">
            <p className="text-xs text-white/60">
              Garantía de devolución de 30 días • Sin preguntas
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
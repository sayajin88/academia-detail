import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Mail, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export function HomeCTA() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Por favor, completa todos los campos.');
      return;
    }

    setIsSubmitting(true);

    // 1. Save to database with default values for qualification fields
    try {
      const { error: dbError } = await supabase.from("contact_submissions").insert({
        nombre: formData.name,
        apellidos: "-",
        email: formData.email,
        telefono: formData.phone,
        experiencia: "sin_especificar",
        centro_propio: "sin_especificar",
        inversion: "sin_especificar",
        tipo_formacion: "general",
        mensaje: null,
        acepto_privacidad: true,
      });

      if (dbError) {
        console.error("HomeCTA DB save error:", dbError);
      }
    } catch (err) {
      console.error("HomeCTA DB exception:", err);
    }

    // 2. Send emails via edge function
    try {
      const { error: fnError } = await supabase.functions.invoke("send-contact-email", {
        body: {
          nombre: formData.name,
          apellidos: "-",
          email: formData.email,
          telefono: formData.phone,
          experiencia: "sin_especificar",
          centro_propio: "sin_especificar",
          inversion: "sin_especificar",
          tipo_formacion: "general",
          mensaje: "",
          source: "home_cta",
        },
      });

      if (fnError) {
        console.error("HomeCTA edge function error:", fnError);
      }
    } catch (err) {
      console.error("HomeCTA edge function exception:", err);
    }

    toast.success('¡Gracias por tu interés! Te contactaremos pronto.');
    setFormData({ name: '', email: '', phone: '' });
    setIsSubmitting(false);
  };

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary-glow" />
      
      {/* Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative Circles */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-black/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
          {/* Left Column - Text */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              ¿Listo para Empezar tu Carrera en Detailing?
            </h2>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-xl mx-auto lg:mx-0">
              Da el primer paso hacia tu futuro profesional. Únete a la comunidad de detailers que ya han transformado su pasión en profesión.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8">
              <Button 
                asChild 
                size="touch" 
                className="bg-white text-primary hover:bg-white/90 shadow-xl group w-full sm:w-auto"
              >
                <Link to="/contacto">
                  Reserva tu Plaza Ahora
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 text-white/80">
              <a 
                href="tel:+34622773555" 
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4" />
                +34 622 773 555
              </a>
              <span className="hidden sm:block w-1 h-1 rounded-full bg-white/40" />
              <a 
                href="mailto:info@academiadetail.com" 
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4" />
                info@academiadetail.com
              </a>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-2">
              Solicita Información
            </h3>
            <p className="text-white/70 text-sm mb-6">
              Te contactamos en un plazo de 48 horas
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                placeholder="Tu nombre"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40"
              />
              <Input
                type="email"
                placeholder="Tu email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40"
              />
              <Input
                type="tel"
                placeholder="Tu teléfono"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40"
              />
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-white text-primary hover:bg-white/90 font-semibold"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Quiero Más Información
                  </>
                )}
              </Button>
            </form>

            <p className="text-white/50 text-xs mt-4 text-center">
              Sin compromiso. Respetamos tu privacidad.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

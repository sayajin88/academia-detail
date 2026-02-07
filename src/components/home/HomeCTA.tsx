import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Mail, Users, Clock, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

const trustPoints = [
  { icon: Users, label: '+500 alumnos formados' },
  { icon: Clock, label: 'Respuesta en 24h' },
  { icon: ShieldCheck, label: 'Sin compromiso' },
];

export function HomeCTA() {
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
        <div className="max-w-4xl mx-auto text-center">
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            ¿Listo para Empezar tu Carrera en Detailing?
          </h2>
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Da el primer paso hacia tu futuro profesional. Únete a la comunidad de detailers que ya han transformado su pasión en profesión.
          </p>

          {/* Trust Points Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20 mb-10 max-w-lg mx-auto">
            <div className="space-y-4">
              {trustPoints.map((point) => (
                <div key={point.label} className="flex items-center gap-3 text-white/90">
                  <div className="p-2 rounded-lg bg-white/10">
                    <point.icon className="h-5 w-5" />
                  </div>
                  <span className="text-base font-medium">{point.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Button 
              asChild 
              size="touch" 
              className="bg-white text-primary hover:bg-white/90 shadow-xl group w-full sm:w-auto text-lg font-bold"
            >
              <Link to="/contacto">
                Inscríbete Ahora
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              size="touch"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 w-full sm:w-auto"
            >
              <a href="https://wa.me/34622773555" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 mr-2">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Contactar por WhatsApp
              </a>
            </Button>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/80">
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
      </div>
    </section>
  );
}

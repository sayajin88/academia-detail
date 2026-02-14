import { MapPin, Clock, MessageCircle, Users } from "lucide-react";
import heroImage from '@/assets/evento-clase-completa.jpg';

const ContactHero = () => {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Full-width Background Image */}
      <img 
        src={heroImage}
        alt="Contacta con Academia Detail - Formación profesional en detailing"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-background" />
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/15 via-transparent to-transparent opacity-60" />
      
      <div className="container relative z-10 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 mb-6">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-white/90">Detail Park Alicante</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Contacta con{" "}
            <span className="gradient-text">Nosotros</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10">
            ¿Tienes dudas sobre nuestras formaciones? Estamos aquí para ayudarte. 
            Escríbenos y te responderemos lo antes posible.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {[
              { icon: Clock, value: "24h", label: "Respuesta media" },
              { icon: MessageCircle, value: "500+", label: "Consultas resueltas" },
              { icon: Users, value: "100%", label: "Satisfacción" },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-3 rounded-xl bg-white/5 backdrop-blur-sm">
                <stat.icon className="w-5 h-5 text-primary mx-auto mb-1" />
                <div className="text-xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;

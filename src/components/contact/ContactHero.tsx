import { MapPin } from "lucide-react";
import heroImage from '@/assets/heroes/hero-contacto.jpg';

const ContactHero = () => {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background" />
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-60" />
      
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Detail Park Alicante</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Contacta con{" "}
            <span className="text-gradient">Nosotros</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            ¿Tienes dudas sobre nuestras formaciones? Estamos aquí para ayudarte. 
            Escríbenos y te responderemos lo antes posible.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Carlos Mendoza",
    role: "Estudiante Graduado",
    thumbnail: "/api/placeholder/300/200",
    quote: "En 3 semanas pasé de aficionado a tener mi propio negocio",
    rating: 5,
    duration: "2:15"
  },
  {
    id: 2,
    name: "Ana Rodriguez",
    role: "Emprendedora",
    thumbnail: "/api/placeholder/300/200", 
    quote: "La mejor inversión que he hecho en mi carrera profesional",
    rating: 5,
    duration: "1:45"
  },
  {
    id: 3,
    name: "Miguel Santos",
    role: "Detailer Profesional",
    thumbnail: "/api/placeholder/300/200",
    quote: "Las técnicas que aprende aquí no las encuentras en ningún sitio",
    rating: 5,
    duration: "3:20"
  }
];

export function VideoTestimonials() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block glass-card px-8 py-3 rounded-full mb-8">
            <span className="gradient-text font-bold uppercase tracking-wide">Testimonios Reales</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
            Escucha a nuestros <span className="gradient-text">estudiantes exitosos</span>
          </h2>
          <p className="text-xl text-white/80">
            Más de 300 personas han transformado su vida con Detail Park
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.id} 
              className="glass-card border-white/10 hover:border-primary/50 transition-all duration-500 hover-glow group"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <div className="w-full h-48 bg-gradient-primary/20 flex items-center justify-center">
                    <div className="text-center">
                      <Button 
                        variant="glass" 
                        size="lg" 
                        className="rounded-full w-16 h-16 mb-4 group-hover:scale-110 transition-transform duration-300"
                      >
                        <Play className="w-6 h-6" />
                      </Button>
                      <div className="text-white/80 text-sm">{testimonial.duration}</div>
                    </div>
                  </div>
                  
                  <div className="absolute top-4 right-4 bg-black/50 rounded-full px-2 py-1">
                    <span className="text-white text-xs font-semibold">{testimonial.duration}</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <div className="flex items-start gap-3 mb-4">
                    <Quote className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-white/90 italic text-sm">"{testimonial.quote}"</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">{testimonial.name}</div>
                      <div className="text-muted-foreground text-xs">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="hero" size="lg">
            Ver Más Testimonios
          </Button>
        </div>
      </div>
    </section>
  );
}
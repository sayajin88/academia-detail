import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Star, Quote, MapPin } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Javier Morales",
    role: "Participante La Jornada Cero - Madrid",
    videoId: "Kzqde_z1c2o",
    quote: "La Jornada Cero me abrió los ojos al mundo del detailing profesional. Ahora sé que quiero dedicarme a esto",
    rating: 5,
    duration: "2:30",
    location: "Madrid, España"
  },
  {
    id: 2,
    name: "Roberto Sánchez",
    role: "Asistente Evento - Barcelona",
    videoId: "ItGES_wJUcQ",
    quote: "En un solo día entendí si el detailing es para mí. La práctica real fue clave para decidir mi futuro",
    rating: 5,
    duration: "1:50",
    location: "Barcelona, España"
  },
  {
    id: 3,
    name: "Pablo Jiménez",
    role: "Iniciado en Detailing - Valencia",
    videoId: "ML0eww0kE5k",
    quote: "Vine sin saber nada y salí con claridad total. Es perfecto para ver si quieres vivir de esto",
    rating: 5,
    duration: "3:10",
    location: "Valencia, España"
  },
  {
    id: 4,
    name: "Andrés Ruiz", 
    role: "Aspirante a Detailer - Sevilla",
    videoId: "LyXGdONRt5g",
    quote: "La Jornada Cero es la mejor inversión si estás pensando en entrar al mundo del detailing profesional",
    rating: 5,
    duration: "2:45",
    location: "Sevilla, España"
  },
  {
    id: 5,
    name: "Luis Fernández",
    role: "Participante Primera Edición - Málaga",
    videoId: "PLmdelKm45Y",
    quote: "Me dio la confianza que necesitaba para dar el paso. Ahora estoy preparándome para mi propio taller",
    rating: 5,
    duration: "4:00",
    location: "Málaga, España"
  },
  {
    id: 6,
    name: "Marcos Torres",
    role: "Asistente La Jornada Cero - Bilbao",
    videoId: "HYGRN-HdVc8",
    quote: "La mejor forma de saber si el detailing es tu camino. Práctica real desde el primer momento",
    rating: 5,
    duration: "1:55",
    location: "Bilbao, España"
  }
];

export function VideoTestimonials() {
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);

  const handlePlayVideo = (testimonialId: number, videoId: string) => {
    setPlayingVideo(testimonialId);
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block glass-card px-8 py-3 rounded-full mb-8 animate-fade-in">
            <span className="gradient-text font-bold uppercase tracking-wide">Testimonios Reales en Video</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight animate-slide-up">
            Escucha a quienes ya dieron <span className="gradient-text">el primer paso</span>
          </h2>
          <p className="text-xl text-white/80 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            Más de 200 personas han descubierto su camino en el detailing con La Jornada Cero
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.id} 
              className="glass-card border-white/10 hover:border-primary/50 transition-all duration-500 hover-glow group animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  {playingVideo === testimonial.id ? (
                    <div className="w-full h-64">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${testimonial.videoId}?autoplay=1&rel=0`}
                        title={`Testimonio de ${testimonial.name}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="rounded-t-lg"
                      ></iframe>
                    </div>
                  ) : (
                    <div 
                      className="w-full h-64 bg-gradient-primary/20 flex items-center justify-center cursor-pointer relative group/video"
                      onClick={() => handlePlayVideo(testimonial.id, testimonial.videoId)}
                    >
                      {/* Thumbnail de YouTube */}
                      <div 
                        className="absolute inset-0 bg-cover bg-center rounded-t-lg"
                        style={{ 
                          backgroundImage: `url(https://img.youtube.com/vi/${testimonial.videoId}/maxresdefault.jpg)`,
                          filter: 'brightness(0.7)'
                        }}
                      />
                      
                      <div className="relative z-10 text-center">
                        <Button 
                          variant="glass" 
                          size="lg" 
                          className="rounded-full w-20 h-20 mb-4 group-hover/video:scale-110 transition-transform duration-300 bg-primary/90 hover:bg-primary border-0"
                        >
                          <Play className="w-8 h-8 text-white fill-white ml-1" />
                        </Button>
                        <div className="text-white font-semibold text-sm bg-black/60 px-3 py-1 rounded-full">
                          {testimonial.duration}
                        </div>
                      </div>
                      
                      <div className="absolute top-4 right-4 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                        ▶ REAL
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <div className="flex items-start gap-3 mb-4">
                    <Quote className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-white/90 italic text-sm leading-relaxed">"{testimonial.quote}"</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="text-white font-semibold text-sm">{testimonial.name}</div>
                        <div className="text-muted-foreground text-xs">{testimonial.role}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 text-xs text-white/70">
                      <MapPin className="w-3 h-3" />
                      <span>{testimonial.location}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <div className="glass-card inline-block px-8 py-6 rounded-lg mb-8 animate-fade-in">
              <div className="flex items-center justify-center gap-4 text-white/90">
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">+200</div>
                <div className="text-xs">Participantes</div>
              </div>
              <div className="w-px h-8 bg-white/20"></div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">+30</div>
                <div className="text-xs">Eventos</div>
              </div>
              <div className="w-px h-8 bg-white/20"></div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">100%</div>
                <div className="text-xs">Satisfacción</div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <Button variant="hero" size="lg" className="animate-pulse hover:animate-none">
              🎥 Acceder a Todos los Testimonios
            </Button>
            <p className="text-white/60 text-sm">
              Biblioteca completa de casos de éxito • Disponible 24/7
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
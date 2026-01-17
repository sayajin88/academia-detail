import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Award, Users, CheckCircle } from "lucide-react";
import instructorDaniel from "@/assets/instructor-daniel-principal.png";

export function InstructorProfile() {
  return (
    <section className="py-24 bg-black/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block glass-card px-8 py-3 rounded-full mb-8">
            <span className="gradient-text font-bold uppercase tracking-wide">Tu Instructor Experto</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
            Aprende de un <span className="gradient-text">Maestro Certificado</span>
          </h2>
        </div>

        <div className="max-w-6xl mx-auto">
          <Card className="glass-card border-white/10 overflow-hidden">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Imagen del Instructor */}
                <div className="relative bg-gradient-to-b from-black/20 to-black/40">
                  <img 
                    src={instructorDaniel} 
                    alt="Daniel López - Instructor Experto en Detailing"
                    className="w-full h-full object-contain min-h-[500px]"
                  />
                  <div className="absolute top-6 left-6">
                    <Badge className="bg-primary text-white font-bold px-4 py-2">
                      INSTRUCTOR PRINCIPAL
                    </Badge>
                  </div>
                  <div className="absolute bottom-6 right-6">
                    <div className="glass-card p-4 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="text-white font-bold">4.9/5</span>
                      </div>
                      <p className="text-white/80 text-sm mt-1">+2,000 estudiantes</p>
                    </div>
                  </div>
                </div>

                {/* Contenido del Perfil */}
                <div className="p-12 flex flex-col justify-center">
                  <h3 className="text-4xl font-black text-white mb-4">
                    Daniel López
                  </h3>
                  <p className="text-xl gradient-text font-bold mb-6">
                    Instructor Principal La Jornada Cero
                  </p>

                  <div className="space-y-6 mb-8">
                    <div className="flex items-start gap-3">
                      <Award className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="text-lg font-bold text-white mb-2">+15 Años de Experiencia</h4>
                        <p className="text-white/80">
                          Experto en transmitir conocimiento práctico en formato acelerado. Ha impartido más de 50 eventos 
                          intensivos con 100% de satisfacción entre los participantes.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="text-lg font-bold text-white mb-2">Certificaciones Internacionales</h4>
                        <p className="text-white/80">
                          Certificado por IDA (International Detailing Association) y formador oficial de marcas 
                          premium como Meguiar's, Chemical Guys y Gyeon.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Users className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="text-lg font-bold text-white mb-2">Metodología de Enseñanza Única</h4>
                        <p className="text-white/80">
                          Combina teoría práctica con demostraciones en vivo y ejercicios supervisados. Cada participante 
                          recibe atención personalizada durante toda la jornada.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Estadísticas del Instructor */}
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                    <div className="text-center">
                      <div className="text-3xl font-black gradient-text">50+</div>
                      <div className="text-white/80 text-sm">Eventos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-black gradient-text">15+</div>
                      <div className="text-white/80 text-sm">Años Exp.</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-black gradient-text">100%</div>
                      <div className="text-white/80 text-sm">Satisfacción</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Testimonios sobre el Instructor */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-white mb-8">
              Lo que dicen sus estudiantes sobre Daniel
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  text: "Increíble experiencia. En un solo día aprendí más que en meses viendo videos. La práctica real marca toda la diferencia.",
                  author: "Carlos M., Asistente La Jornada Cero Madrid"
                },
                {
                  text: "El ambiente, los instructores y la calidad son TOP. Volví con ganas de especializarme en detailing profesional.",
                  author: "Ana R., Asistente La Jornada Cero Barcelona"
                },
                {
                  text: "Totalmente recomendado. Pequeño grupo, mucha práctica y conexiones valiosas con otros apasionados del sector.",
                  author: "Miguel S., Asistente La Jornada Cero Valencia"
                }
              ].map((testimonial, index) => (
                <div key={index} className="glass-card p-6 rounded-2xl">
                  <p className="text-white/90 mb-4 italic">"{testimonial.text}"</p>
                  <p className="text-primary font-semibold">{testimonial.author}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
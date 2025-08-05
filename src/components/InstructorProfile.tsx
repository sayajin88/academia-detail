import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Award, Users, CheckCircle } from "lucide-react";
import danielLopezInstructor from "@/assets/daniel-lopez-instructor.webp";

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
                <div className="relative">
                  <img 
                    src={danielLopezInstructor} 
                    alt="Daniel López - Instructor Experto en Detailing"
                    className="w-full h-full object-cover min-h-[500px]"
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
                    Master Detailer & Formador Certificado
                  </p>

                  <div className="space-y-6 mb-8">
                    <div className="flex items-start gap-3">
                      <Award className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="text-lg font-bold text-white mb-2">+15 Años de Experiencia</h4>
                        <p className="text-white/80">
                          Pionero en técnicas avanzadas de detailing en España. Ha formado a más de 2,000 profesionales 
                          que ahora dirigen sus propios negocios exitosos.
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
                        <h4 className="text-lg font-bold text-white mb-2">Resultados Comprobados</h4>
                        <p className="text-white/80">
                          92% de sus estudiantes consiguen empleo o lanzan su negocio en 30 días. Sus métodos 
                          han generado más de €50M en facturación entre sus graduados.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Estadísticas del Instructor */}
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                    <div className="text-center">
                      <div className="text-3xl font-black gradient-text">2,000+</div>
                      <div className="text-white/80 text-sm">Estudiantes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-black gradient-text">15+</div>
                      <div className="text-white/80 text-sm">Años Exp.</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-black gradient-text">92%</div>
                      <div className="text-white/80 text-sm">Éxito Laboral</div>
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
                  text: "Daniel no solo enseña técnicas, te transforma en un profesional. Su pasión es contagiosa.",
                  author: "Carlos M., Propietario de DetailPro"
                },
                {
                  text: "Gracias a Daniel pude abrir mi taller. Su mentoría fue clave para mi éxito empresarial.",
                  author: "Ana R., DetailCar Studio"
                },
                {
                  text: "El mejor formador de España. Su metodología práctica te prepara para el mundo real.",
                  author: "Miguel S., Detailer en BMW Premium"
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
import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Award, Users, CheckCircle, Instagram, Youtube, ExternalLink } from "lucide-react";
import instructorDaniel from "@/assets/instructor-daniel-principal.png";

// Schema.org Person structured data for SEO (E-E-A-T)
const instructorSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Daniel López",
  "alternateName": "Dani Detail",
  "jobTitle": "Instructor Principal de Detailing Profesional",
  "description": "Experto en detailing automotriz con más de 15 años de experiencia. Certificado por IDA (International Detailing Association) y formador oficial de marcas premium como Meguiar's, Chemical Guys y Gyeon.",
  "image": "https://academiadetail.com/assets/instructor-daniel-principal.png",
  "url": "https://academiadetail.com",
  "sameAs": [
    "https://www.instagram.com/danidetailoficial/",
    "https://www.instagram.com/detailparkoficial/",
    "https://www.youtube.com/@detailpark"
  ],
  "worksFor": {
    "@type": "EducationalOrganization",
    "name": "Academia Detailing - Detail Park",
    "url": "https://academiadetail.com"
  },
  "knowsAbout": [
    "Detailing Automotriz",
    "Corrección de Pintura",
    "Protección Cerámica",
    "PPF - Paint Protection Film",
    "Car Wrapping",
    "Restauración de Vehículos",
    "Lavado Profesional",
    "Descontaminación de Pintura"
  ],
  "hasCredential": [
    {
      "@type": "EducationalOccupationalCredential",
      "name": "Certificación IDA",
      "credentialCategory": "International Detailing Association"
    }
  ],
  "award": [
    "Formador Oficial Meguiar's",
    "Formador Oficial Chemical Guys",
    "Formador Oficial Gyeon"
  ]
};

// Social links for the instructor
const instructorSocials = [
  {
    icon: Instagram,
    label: "@danidetailoficial",
    href: "https://www.instagram.com/danidetailoficial/",
    color: "hover:text-pink-500 hover:border-pink-500/50"
  },
  {
    icon: Instagram,
    label: "@detailparkoficial",
    href: "https://www.instagram.com/detailparkoficial/",
    color: "hover:text-pink-500 hover:border-pink-500/50"
  },
  {
    icon: Youtube,
    label: "YouTube",
    href: "https://www.youtube.com/@detailpark",
    color: "hover:text-red-500 hover:border-red-500/50"
  }
];

// Testimonials about the instructor
const instructorTestimonials = [
  {
    text: "Increíble experiencia. En un solo día aprendí más que en meses viendo videos. La práctica real marca toda la diferencia.",
    author: "Carlos M.",
    role: "Asistente La Jornada Cero Madrid"
  },
  {
    text: "El ambiente, los instructores y la calidad son TOP. Volví con ganas de especializarme en detailing profesional.",
    author: "Ana R.",
    role: "Asistente La Jornada Cero Barcelona"
  },
  {
    text: "Totalmente recomendado. Pequeño grupo, mucha práctica y conexiones valiosas con otros apasionados del sector.",
    author: "Miguel S.",
    role: "Asistente La Jornada Cero Valencia"
  }
];

export function InstructorProfile() {
  return (
    <section className="py-24 bg-black/30" itemScope itemType="https://schema.org/Person">
      {/* Schema.org JSON-LD for SEO */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(instructorSchema)}
        </script>
      </Helmet>

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
                    alt="Daniel López - Instructor Experto en Detailing Profesional"
                    className="w-full h-full object-contain min-h-[500px]"
                    itemProp="image"
                    loading="lazy"
                  />
                  <div className="absolute top-6 left-6">
                    <Badge className="bg-primary text-white font-bold px-4 py-2">
                      INSTRUCTOR PRINCIPAL
                    </Badge>
                  </div>
                  <div className="absolute bottom-6 right-6">
                    <div className="glass-card p-4 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="flex" role="img" aria-label="Valoración 4.9 de 5 estrellas">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                          ))}
                        </div>
                        <span className="text-white font-bold">4.9/5</span>
                      </div>
                      <p className="text-white/80 text-sm mt-1">+2,000 estudiantes</p>
                    </div>
                  </div>
                </div>

                {/* Contenido del Perfil */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <h3 className="text-4xl font-black text-white mb-2" itemProp="name">
                    Daniel López
                  </h3>
                  <p className="text-xl gradient-text font-bold mb-4" itemProp="jobTitle">
                    Instructor Principal La Jornada Cero
                  </p>

                  {/* Social Media Links */}
                  <div className="flex flex-wrap gap-3 mb-8">
                    {instructorSocials.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 ${social.color}`}
                        aria-label={`Seguir a Daniel en ${social.label}`}
                        itemProp="sameAs"
                      >
                        <social.icon className="w-4 h-4" />
                        <span className="text-sm font-medium text-white">{social.label}</span>
                        <ExternalLink className="w-3 h-3 text-white/60" />
                      </a>
                    ))}
                  </div>

                  <div className="space-y-6 mb-8">
                    <div className="flex items-start gap-3">
                      <Award className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="text-lg font-bold text-white mb-2">+15 Años de Experiencia</h4>
                        <p className="text-white/80" itemProp="description">
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
              {instructorTestimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="glass-card p-6 rounded-2xl"
                  itemScope 
                  itemType="https://schema.org/Review"
                >
                  <p className="text-white/90 mb-4 italic" itemProp="reviewBody">
                    "{testimonial.text}"
                  </p>
                  <div itemProp="author" itemScope itemType="https://schema.org/Person">
                    <p className="text-primary font-semibold" itemProp="name">
                      {testimonial.author}
                    </p>
                    <p className="text-white/60 text-sm">{testimonial.role}</p>
                  </div>
                  <meta itemProp="datePublished" content="2025-01-01" />
                  <div itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                    <meta itemProp="ratingValue" content="5" />
                    <meta itemProp="bestRating" content="5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

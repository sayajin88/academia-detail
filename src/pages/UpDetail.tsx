import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { SEO } from '@/components/SEO';
import { seoConfig } from '@/utils/seoConfig';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { GoogleReviews } from '@/components/shared/GoogleReviews';
import { VideoTestimonials } from '@/components/VideoTestimonials';
import {
  Users,
  Star,
  ArrowLeft,
  GraduationCap,
  Trophy,
  Mail,
  CheckCircle,
  Loader2,
  Lightbulb,
  Sparkles,
  Globe,
  Eye,
  Handshake,
  Clock,
  ChevronRight,
  Play
} from 'lucide-react';

// Images
import detailParkLogo from '@/assets/detail-park-logo.webp';
import detailParkLogoWhite from '@/assets/detail-park-logo-white.png';
import danielLopezUpdetail from '@/assets/daniel-lopez-updetail.jpg';
import leandroUpdetail from '@/assets/leandro-updetail.jpg';
import federicaUpdetail from '@/assets/federica-updetail.jpg';
import eventoGrupo from '@/assets/evento-grupo-formacion.jpg';
import eventoClase from '@/assets/evento-clase-completa.jpg';
import eventoAlumnos from '@/assets/evento-alumnos-atencion.jpg';
import heroUpDetail from '@/assets/evento-instructor-explicando.jpg';

const experts = [
  {
    name: 'Daniel López',
    role: 'CEO Detail Park',
    description: 'Fundador de Detail Park y formador principal con más de 15 años de experiencia en detailing de alta gama.',
    image: danielLopezUpdetail,
    tags: ['Detailing', 'Corrección Pintura', 'Cerámico'],
  },
  {
    name: 'Leandro',
    role: 'Academy Pro Detailing',
    description: 'Especialista en formación de detailing profesional con reconocimiento a nivel nacional por su metodología práctica.',
    image: leandroUpdetail,
    tags: ['Formación', 'Técnica Avanzada', 'Pulido'],
  },
  {
    name: 'Federica',
    role: '@la_detailher',
    description: 'Referente en el sector del detailing, reconocida por su enfoque innovador y su comunidad de profesionales.',
    image: federicaUpdetail,
    tags: ['Innovación', 'Comunidad', 'Tendencias'],
  },
];

const benefits = [
  {
    icon: Globe,
    title: 'Múltiples Perspectivas',
    description: 'Aprende de profesionales con estilos y experiencias diferentes para ampliar tu visión.',
  },
  {
    icon: Handshake,
    title: 'Networking Real',
    description: 'Conecta con los expertos y otros asistentes apasionados del sector.',
  },
  {
    icon: Lightbulb,
    title: 'Técnicas Exclusivas',
    description: 'Cada experto comparte sus métodos y trucos que no encontrarás en ningún curso online.',
  },
  {
    icon: Eye,
    title: 'Visión del Mercado',
    description: 'Conoce tendencias, oportunidades de negocio y cómo destacar en el sector.',
  },
];

function YouTubeEmbed({ videoId, title }: { videoId: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="relative aspect-video rounded-2xl overflow-hidden">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      onClick={() => setPlaying(true)}
      className="relative aspect-video rounded-2xl overflow-hidden group w-full"
      aria-label={`Reproducir video: ${title}`}
    >
      <img
        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-violet-600/90 backdrop-blur-sm flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:bg-violet-500 shadow-lg shadow-violet-500/30">
          <Play className="w-7 h-7 md:w-8 md:h-8 text-white ml-1" fill="currentColor" />
        </div>
      </div>
    </button>
  );
}

export default function UpDetail() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handlePreRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    try {
      setLoading(true);
      const { error } = await supabase
        .from('up_detail_preregistrations')
        .insert({ email: email.trim(), name: name.trim() || null });

      if (error) {
        if (error.code === '23505') {
          toast.info('Ya estás registrado. ¡Te avisaremos cuando haya novedades!');
          setSubmitted(true);
        } else {
          throw error;
        }
      } else {
        toast.success('¡Registrado! Te avisaremos cuando haya novedades.');
        setSubmitted(true);
      }
    } catch {
      toast.error('Error al registrar. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO {...seoConfig.upDetail} />
      <div className="min-h-screen animated-bg">

        {/* Top Banner */}
        <div className="bg-gradient-to-r from-violet-700 via-purple-600 to-violet-500 text-white py-3 md:py-4 relative overflow-hidden sticky top-0 z-40 shadow-[0_4px_20px_rgba(139,92,246,0.3)]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-400/20 via-transparent to-transparent" />
          <div className="relative z-10 container mx-auto px-4">
            <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
              <img 
                src={detailParkLogoWhite} 
                alt="Detail Park Logo" 
                className="h-8 md:h-12 object-contain flex-shrink-0 drop-shadow-lg"
              />
              <div className="flex items-center gap-2 flex-1 justify-center">
                <Badge className="bg-white/20 text-white border-white/30 text-xs md:text-sm">
                  ⚡ PRÓXIMAMENTE
                </Badge>
                <span className="text-sm md:text-base font-bold hidden sm:inline">Up Detail — Jornada con Expertos</span>
              </div>
              <Button 
                variant="glass" 
                size="lg" 
                className="hidden md:flex text-sm font-bold px-6 py-3 whitespace-nowrap border-2 border-white/30"
                onClick={() => document.getElementById('preregistro')?.scrollIntoView({ behavior: 'smooth' })}
              >
                RESERVAR AVISO
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="bg-black/40 backdrop-blur-md border-b border-white/10 py-3 sticky top-[60px] z-30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <Link to="/curso-detailing-iniciacion" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Ver todas las Jornadas</span>
              </Link>
              <div className="hidden md:flex items-center gap-6">
                <Link to="/jornada-zero-detailing" className="flex items-center gap-2 text-white/70 hover:text-violet-400 transition-colors text-sm">
                  <Sparkles className="w-4 h-4" />
                  Jornada Zero
                </Link>
                <Link to="/curso-detailing-profesional" className="flex items-center gap-2 text-white/70 hover:text-violet-400 transition-colors text-sm">
                  <GraduationCap className="w-4 h-4" />
                  Cursos Completos
                </Link>
                <Link to="/contacto" className="flex items-center gap-2 text-white/70 hover:text-violet-400 transition-colors text-sm">
                  <Mail className="w-4 h-4" />
                  Contacto
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden min-h-[50vh]">
          <div className="absolute inset-0">
            <img src={heroUpDetail} alt="Up Detail — Formación colaborativa con expertos" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />

          <div className="relative z-10 container mx-auto px-4 text-center">
            <Badge className="bg-violet-500/20 text-violet-400 border border-violet-500/30 px-4 py-1.5 text-sm font-semibold mb-6">
              🌟 FORMATO COLABORATIVO • MÚLTIPLES EXPERTOS
            </Badge>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Up Detail:{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">
                Los Mejores Expertos del País
              </span>
              <br />en Una Sola Jornada
            </h1>

            <p className="text-base md:text-lg text-white/90 max-w-3xl mx-auto mb-8">
              Una experiencia única donde varios <strong className="text-violet-400">formadores reconocidos a nivel nacional e internacional</strong> se 
              reúnen para compartir su conocimiento en una jornada intensiva de detailing profesional.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              <div className="glass-card p-4 rounded-xl border border-violet-500/30">
                <div className="text-2xl mb-2">👥</div>
                <h3 className="font-bold text-white mb-1">+3 Expertos</h3>
                <p className="text-sm text-white/70">Profesionales reconocidos del sector</p>
              </div>
              <div className="glass-card p-4 rounded-xl border border-violet-500/30">
                <div className="text-2xl mb-2">💰</div>
                <h3 className="font-bold text-white mb-1">349€ + IVA</h3>
                <p className="text-sm text-white/70">Inversión en tu futuro profesional</p>
              </div>
              <div className="glass-card p-4 rounded-xl border border-violet-500/30">
                <div className="text-2xl mb-2">🎓</div>
                <h3 className="font-bold text-white mb-1">Certificado</h3>
                <p className="text-sm text-white/70">Acredita tu asistencia oficial</p>
              </div>
            </div>
          </div>
        </section>

        {/* Concept Section */}
        <section className="py-16 md:py-24 bg-black/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <div className="inline-block glass-card px-6 py-2 rounded-full mb-6">
                <span className="text-violet-400 font-bold uppercase tracking-wide text-sm">¿Qué es Up Detail?</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Una Jornada,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">
                  Múltiples Maestros
                </span>
              </h2>
              <p className="text-white/80 text-base md:text-lg leading-relaxed">
                Up Detail nace de la convicción de que el mejor aprendizaje viene de conocer diferentes perspectivas profesionales. 
                Reunimos a formadores de todo el país, cada uno con su especialidad y estilo único, para que puedas absorber lo 
                mejor de cada uno en una sola jornada intensiva.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {benefits.map((benefit, index) => (
                <Card key={index} className="glass-card p-6 text-center border-white/10 hover:border-violet-500/30 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-6 h-6 text-violet-400" />
                  </div>
                  <h3 className="font-bold text-white mb-2">{benefit.title}</h3>
                  <p className="text-sm text-white/70">{benefit.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Promo Video Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <div className="inline-block glass-card px-6 py-2 rounded-full mb-6">
                  <span className="text-violet-400 font-bold uppercase tracking-wide text-sm">🎬 Descubre Up Detail</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Conoce el Formato que Está{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">
                    Revolucionando la Formación
                  </span>
                </h2>
                <p className="text-white/70 max-w-2xl mx-auto">
                  Descubre cómo reunimos a los mejores profesionales del detailing en una experiencia única e irrepetible.
                </p>
              </div>
              <YouTubeEmbed videoId="TR_K9l3GZWc" title="Descubre Up Detail - Video Promocional" />
            </div>
          </div>
        </section>

        {/* Experts Section */}
        <section className="py-16 md:py-24 bg-black/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-block glass-card px-6 py-2 rounded-full mb-6">
                <span className="text-violet-400 font-bold uppercase tracking-wide text-sm">Los Ponentes</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Expertos{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">
                  Confirmados
                </span>
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Profesionales reconocidos a nivel nacional e internacional que comparten su conocimiento
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-8">
              {experts.map((expert, index) => (
                <div 
                  key={index} 
                  className="glass-intense rounded-2xl overflow-hidden border border-white/10 hover:border-violet-500/30 transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={expert.image} 
                      alt={expert.name} 
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-xl font-bold text-white">{expert.name}</h3>
                      <p className="text-violet-400 text-sm font-medium">{expert.role}</p>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-white/80 text-sm mb-4">{expert.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {expert.tags.map((tag, i) => (
                        <Badge key={i} variant="secondary" className="bg-violet-500/10 text-violet-400 border-violet-500/20 text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* More experts coming */}
            <div className="text-center">
              <div className="glass-card inline-flex items-center gap-3 px-6 py-3 rounded-full border border-dashed border-violet-500/30">
                <Users className="w-5 h-5 text-violet-400" />
                <span className="text-white/80 text-sm">Más expertos por confirmar…</span>
              </div>
            </div>
          </div>
        </section>

        {/* Past Event Video — Mayo 2025 */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <div className="inline-block glass-card px-6 py-2 rounded-full mb-6">
                  <span className="text-violet-400 font-bold uppercase tracking-wide text-sm">📽️ Evento Pasado</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Revive Nuestro Primer Evento —{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">
                    Mayo 2025
                  </span>
                </h2>
                <p className="text-white/70 max-w-3xl mx-auto mb-2">
                  En mayo de 2025 celebramos el primer Up Detail: una jornada que reunió a expertos de todo el país 
                  en las instalaciones de Detail Park. <strong className="text-white/90">Todas las plazas agotadas</strong>, 
                  asistentes de más de 6 provincias y una energía que superó todas las expectativas.
                </p>
                <p className="text-sm text-violet-400 font-medium">
                  🔥 Sold out en la primera edición — La jornada que inició todo
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <YouTubeEmbed videoId="ZA8lZ5R6Yg0" title="Up Detail — Evento Mayo 2025" />
                </div>
                <div className="order-1 md:order-2 space-y-6">
                  <div className="glass-card p-5 rounded-xl border border-violet-500/20">
                    <div className="flex items-center gap-3 mb-2">
                      <Trophy className="w-5 h-5 text-violet-400" />
                      <h3 className="font-bold text-white">Sold Out en la 1ª Edición</h3>
                    </div>
                    <p className="text-white/70 text-sm">Las plazas se agotaron antes de lo previsto, demostrando el interés del sector por este formato único.</p>
                  </div>
                  <div className="glass-card p-5 rounded-xl border border-violet-500/20">
                    <div className="flex items-center gap-3 mb-2">
                      <Users className="w-5 h-5 text-violet-400" />
                      <h3 className="font-bold text-white">Asistentes de Toda España</h3>
                    </div>
                    <p className="text-white/70 text-sm">Profesionales y apasionados del detailing viajaron desde más de 6 provincias para vivir esta experiencia.</p>
                  </div>
                  <div className="glass-card p-5 rounded-xl border border-violet-500/20">
                    <div className="flex items-center gap-3 mb-2">
                      <Star className="w-5 h-5 text-violet-400" />
                      <h3 className="font-bold text-white">Valoración: 4.9/5</h3>
                    </div>
                    <p className="text-white/70 text-sm">Los asistentes valoraron la experiencia como una de las mejores jornadas de formación del sector.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-16 md:py-20 bg-black/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Así son nuestras{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">
                  Jornadas Colaborativas
                </span>
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {[leandroUpdetail, federicaUpdetail, danielLopezUpdetail, eventoGrupo, eventoClase, eventoAlumnos].map((img, i) => (
                <div key={i} className="relative rounded-xl overflow-hidden aspect-square group">
                  <img 
                    src={img} 
                    alt={`Momento de formación colaborativa ${i + 1}`} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Video Testimonials */}
        <VideoTestimonials />

        {/* Pre-registration Section */}
        <section id="preregistro" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-xl mx-auto text-center">
              <Badge className="bg-violet-500/20 text-violet-400 border-violet-500/30 mb-6">
                ⚡ PRÓXIMAMENTE
              </Badge>
              
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Sé el Primero en{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">
                  Enterarte
                </span>
              </h2>
              
              <p className="text-white/80 mb-2">
                Deja tu email y te avisaremos cuando abramos las inscripciones.
              </p>
              <p className="text-sm text-violet-400 font-medium mb-8">
                💡 Precio confirmado: 349€ + IVA — Si continúas con un curso completo, se descuenta.
              </p>

              {submitted ? (
                <div className="glass-intense rounded-2xl p-8 border border-green-500/30 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">¡Registrado!</h3>
                  <p className="text-white/70 text-sm mb-6">
                    Te avisaremos por email cuando confirmemos la fecha y abramos las inscripciones.
                  </p>
                  <Link to="/jornada-zero-detailing">
                    <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                      Mientras tanto, mira la Jornada Zero →
                    </Button>
                  </Link>
                </div>
              ) : (
                <form onSubmit={handlePreRegister} className="glass-intense rounded-2xl p-6 md:p-8 border border-violet-500/20">
                  <div className="space-y-4">
                    <div className="text-left">
                      <Label htmlFor="name" className="text-white text-sm font-semibold mb-1 block">
                        Nombre
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-violet-400 h-10"
                        placeholder="Tu nombre"
                        disabled={loading}
                      />
                    </div>
                    <div className="text-left">
                      <Label htmlFor="email" className="text-white text-sm font-semibold mb-1 block">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-violet-400 h-10"
                        placeholder="tu@email.com"
                        required
                        disabled={loading}
                      />
                    </div>
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-bold"
                      disabled={loading || !email.trim()}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Registrando...
                        </>
                      ) : (
                        <>🔔 Avísame cuando esté disponible</>
                      )}
                    </Button>
                    <p className="text-xs text-white/50 text-center">
                      Solo te enviaremos información sobre Up Detail. Sin spam.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Cross-promotion Jornada Zero */}
        <section className="py-12 md:py-16 bg-black/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto glass-intense rounded-2xl p-6 md:p-8 border border-primary/20 text-center">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                ¿No quieres esperar? Prueba la{' '}
                <span className="text-primary">Jornada Zero</span>
              </h3>
              <p className="text-white/70 text-sm mb-6 max-w-xl mx-auto">
                La Jornada Zero está disponible ahora por solo 97€ + IVA, con el equipo de Detail Park. Si decides continuar con un curso completo, el importe se descuenta.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/jornada-zero-detailing">
                  <Button variant="hero" size="lg" className="gap-2">
                    Ver Jornada Zero
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/curso-detailing-iniciacion">
                  <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 gap-2">
                    Comparar ambas jornadas
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Google Reviews */}
        <GoogleReviews />

        {/* Footer */}
        <footer className="bg-black py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center md:text-left">
                <img src={detailParkLogo} alt="Detail Park" className="h-10 md:h-12 mx-auto md:mx-0 mb-4 filter brightness-0 invert" />
                <p className="text-white/60 text-sm">
                  Centro de formación profesional en detailing y estética del automóvil.
                </p>
              </div>
              
              <div className="text-center">
                <h4 className="text-white font-semibold mb-4">Explora</h4>
                <div className="flex flex-col gap-2">
                  <Link to="/" className="text-white/60 hover:text-violet-400 transition-colors text-sm">Inicio</Link>
                  <Link to="/curso-detailing-iniciacion" className="text-white/60 hover:text-violet-400 transition-colors text-sm">Jornadas Intensivas</Link>
                  <Link to="/jornada-zero-detailing" className="text-white/60 hover:text-violet-400 transition-colors text-sm">Jornada Zero</Link>
                  <Link to="/curso-detailing-profesional" className="text-white/60 hover:text-violet-400 transition-colors text-sm">Cursos de Detailing</Link>
                  <Link to="/contacto" className="text-white/60 hover:text-violet-400 transition-colors text-sm">Contacto</Link>
                </div>
              </div>
              
              <div className="text-center md:text-right">
                <h4 className="text-white font-semibold mb-4">¿Quieres más formación?</h4>
                <p className="text-white/60 text-sm mb-4">
                  Descubre nuestros cursos completos y la Carrera Detailing.
                </p>
                <Link to="/formacion-profesional-detailing">
                  <Button variant="outline" size="sm" className="border-violet-500/30 text-violet-400 hover:bg-violet-500/10">
                    Ver Programa Completo
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="border-t border-white/10 pt-6">
              <p className="text-white/60 text-xs md:text-sm text-center leading-relaxed">
                © {new Date().getFullYear()} Detailing Car & Parking Club S.L. Todos los derechos reservados.
                <span className="hidden md:inline"> | </span>
                <br className="md:hidden" />
                <Link to="/politica-privacidad" className="text-white/80 hover:text-white mx-1 md:mx-2 inline-block mt-2 md:mt-0">Política de Privacidad</Link>
                <span className="mx-1">•</span>
                <Link to="/politica-privacidad" className="text-white/80 hover:text-white mx-1 md:mx-2 inline-block">Aviso Legal</Link>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

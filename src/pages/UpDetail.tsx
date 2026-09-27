import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { SEO } from '@/components/SEO';
import { WaitlistFAQ } from '@/components/WaitlistFAQ';
import { seoConfig } from '@/utils/seoConfig';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { GoogleReviews } from '@/components/shared/GoogleReviews';
import { VideoTestimonials } from '@/components/VideoTestimonials';
import { YouTubeEmbed } from '@/components/shared/YouTubeEmbed';
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
  ChevronRight,
} from 'lucide-react';

// Images
import detailParkLogo from '@/assets/detail-park-logo.webp';
import logoStek from '@/assets/brands/stek-automotive.png';
import logoCarcarePassion from '@/assets/brands/carcare-passion.png';
import detailParkLogoWhite from '@/assets/detail-park-logo-white.png';
import danielLopezUpdetail from '@/assets/daniel-lopez-updetail.jpg';
import leandroUpdetail from '@/assets/leandro-updetail.jpg';
import federicaUpdetail from '@/assets/federica-updetail.jpg';
import eventoGrupo from '@/assets/evento-grupo-detailing.jpg';
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

const shortReels = [
  { videoId: 'BGL5AgEtetM', title: 'Up Detail — Así se vive la experiencia' },
  { videoId: 'AT7PLhq-Ygw', title: 'Up Detail — Momentos destacados' },
  { videoId: 'oRNb5XmT1dU', title: 'Up Detail — Formación en acción' },
];

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
        <div className="bg-gradient-to-r from-violet-700 via-purple-600 to-violet-500 text-white py-2.5 md:py-4 relative overflow-hidden sticky top-0 z-40 shadow-[0_4px_20px_rgba(139,92,246,0.3)]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-400/20 via-transparent to-transparent" />
          <div className="relative z-10 container mx-auto px-4">
            <div className="flex items-center justify-between gap-3 max-w-7xl mx-auto">
              <img 
                src={detailParkLogoWhite} 
                alt="Detail Park Logo" 
                className="h-7 md:h-12 object-contain flex-shrink-0 drop-shadow-lg"
              />
              <div className="flex items-center gap-2 flex-1 justify-center min-w-0">
                <Badge className="bg-white/20 text-white border-white/30 text-[10px] md:text-sm shrink-0">
                  ⚡ PRÓXIMAMENTE
                </Badge>
                <span className="text-sm md:text-base font-bold hidden sm:inline truncate">Up Detail — Jornada con Expertos</span>
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
        <nav className="bg-black/40 backdrop-blur-md border-b border-white/10 py-2.5 md:py-3 sticky top-[44px] md:top-[60px] z-30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <Link to="/curso-detailing-iniciacion" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors min-h-[44px]">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Ver Jornadas</span>
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
        <section className="relative py-12 md:py-24 overflow-hidden min-h-[45vh] md:min-h-[50vh]">
          <div className="absolute inset-0">
            <img src={heroUpDetail} alt="Up Detail — Formación colaborativa con expertos" className="w-full h-full object-cover" loading="eager" fetchPriority="high" />
          </div>
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />

          <div className="relative z-10 container mx-auto px-4 text-center">
            <Badge className="bg-violet-500/20 text-violet-400 border border-violet-500/30 px-3 md:px-4 py-1.5 text-xs md:text-sm font-semibold mb-3 md:mb-4">
              🌟 FORMATO COLABORATIVO • MÚLTIPLES EXPERTOS
            </Badge>

            <div className="flex justify-center mb-4 md:mb-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="text-amber-300 text-xs md:text-sm font-semibold">
                  Plazas cerradas — próxima edición por confirmar
                </span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4 leading-tight">
              Up Detail:{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">
                Los Mejores Expertos del País
              </span>
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>en Una Sola Jornada
            </h1>

            <p className="text-sm md:text-lg text-white/90 max-w-3xl mx-auto mb-6 md:mb-8 px-2">
              Una experiencia única donde varios <strong className="text-violet-400">formadores reconocidos a nivel nacional e internacional</strong> se 
              reúnen para compartir su conocimiento en una jornada intensiva de detailing profesional.
            </p>

            <div className="grid grid-cols-3 gap-2 md:gap-4 max-w-4xl mx-auto">
              <div className="glass-card p-3 md:p-4 rounded-xl border border-violet-500/30">
                <div className="text-xl md:text-2xl mb-1 md:mb-2">👥</div>
                <h3 className="font-bold text-white text-sm md:text-base mb-0.5 md:mb-1">+3 Expertos</h3>
                <p className="text-[11px] md:text-sm text-white/70 leading-tight">Profesionales reconocidos</p>
              </div>
              <div className="glass-card p-3 md:p-4 rounded-xl border border-violet-500/30">
                <div className="text-xl md:text-2xl mb-1 md:mb-2">💰</div>
                <h3 className="font-bold text-white text-sm md:text-base mb-0.5 md:mb-1">349€ + IVA</h3>
                <p className="text-[11px] md:text-sm text-white/70 leading-tight">Inversión profesional</p>
              </div>
              <div className="glass-card p-3 md:p-4 rounded-xl border border-violet-500/30">
                <div className="text-xl md:text-2xl mb-1 md:mb-2">🎓</div>
                <h3 className="font-bold text-white text-sm md:text-base mb-0.5 md:mb-1">Certificado</h3>
                <p className="text-[11px] md:text-sm text-white/70 leading-tight">Asistencia oficial</p>
              </div>
            </div>
          </div>
        </section>

        {/* Concept Section */}
        <section className="py-12 md:py-24 bg-black/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12">
              <div className="inline-block glass-card px-5 md:px-6 py-2 rounded-full mb-4 md:mb-6">
                <span className="text-violet-400 font-bold uppercase tracking-wide text-xs md:text-sm">¿Qué es Up Detail?</span>
              </div>
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-6">
                Una Jornada,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">
                  Múltiples Maestros
                </span>
              </h2>
              <p className="text-white/80 text-sm md:text-lg leading-relaxed px-2">
                Up Detail nace de la convicción de que el mejor aprendizaje viene de conocer diferentes perspectivas profesionales. 
                Reunimos a formadores de todo el país, cada uno con su especialidad y estilo único, para que puedas absorber lo 
                mejor de cada uno en una sola jornada intensiva.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 max-w-6xl mx-auto">
              {benefits.map((benefit, index) => (
                <Card key={index} className="glass-card p-4 md:p-6 text-center border-white/10 hover:border-violet-500/30 transition-colors">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-violet-500/10 flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <benefit.icon className="w-5 h-5 md:w-6 md:h-6 text-violet-400" />
                  </div>
                  <h3 className="font-bold text-white text-sm md:text-base mb-1 md:mb-2">{benefit.title}</h3>
                  <p className="text-xs md:text-sm text-white/70">{benefit.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Short Reels — Desde Dentro del Evento */}
        <section className="py-10 md:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-6 md:mb-10">
              <Badge className="bg-violet-500/20 text-violet-400 border-violet-500/30 mb-3 md:mb-4 text-xs">
                📱 Desde dentro del evento
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-3">
                Así se Vive{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">
                  Up Detail
                </span>
              </h2>
              <p className="text-white/70 text-sm md:text-base max-w-2xl mx-auto px-2">
                Energía, aprendizaje y pasión por el detailing. Mira los mejores momentos de nuestras jornadas.
              </p>
            </div>

            {/* 3 Shorts — horizontal scroll on mobile, 3-col on desktop */}
            <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto overflow-x-auto snap-x snap-mandatory pb-4 md:pb-0 -mx-4 px-4 md:mx-auto scrollbar-hide">
              {shortReels.map((reel, index) => (
                <div 
                  key={index} 
                  className="flex-shrink-0 w-[240px] md:w-auto snap-center"
                >
                  <div className="rounded-2xl overflow-hidden border border-violet-500/20 shadow-lg shadow-violet-500/10">
                    <YouTubeEmbed videoId={reel.videoId} title={reel.title} isShort />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 justify-center mt-6 md:mt-8">
              <div className="flex items-center gap-2 text-xs md:text-sm text-white/60">
                <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-violet-400" />
                Demos en vivo
              </div>
              <div className="flex items-center gap-2 text-xs md:text-sm text-white/60">
                <Users className="w-3.5 h-3.5 md:w-4 md:h-4 text-violet-400" />
                Ambiente profesional
              </div>
              <div className="flex items-center gap-2 text-xs md:text-sm text-white/60">
                <Trophy className="w-3.5 h-3.5 md:w-4 md:h-4 text-violet-400" />
                Nivel experto
              </div>
            </div>
          </div>
        </section>

        {/* Promo Video Section */}
        <section className="py-12 md:py-24 bg-black/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8 md:mb-10">
                <div className="inline-block glass-card px-5 md:px-6 py-2 rounded-full mb-4 md:mb-6">
                  <span className="text-violet-400 font-bold uppercase tracking-wide text-xs md:text-sm">🎬 Descubre Up Detail</span>
                </div>
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 md:mb-4">
                  Conoce el Formato que Está{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">
                    Revolucionando la Formación
                  </span>
                </h2>
                <p className="text-white/70 text-sm md:text-base max-w-2xl mx-auto px-2">
                  Descubre cómo reunimos a los mejores profesionales del detailing en una experiencia única e irrepetible.
                </p>
              </div>
              <YouTubeEmbed videoId="TR_K9l3GZWc" title="Descubre Up Detail - Video Promocional" />
            </div>
          </div>
        </section>

        {/* Experts Section */}
        <section className="py-12 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12">
              <div className="inline-block glass-card px-5 md:px-6 py-2 rounded-full mb-4 md:mb-6">
                <span className="text-violet-400 font-bold uppercase tracking-wide text-xs md:text-sm">Los Ponentes</span>
              </div>
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 md:mb-4">
                Expertos{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">
                  Confirmados
                </span>
              </h2>
              <p className="text-white/70 text-sm md:text-base max-w-2xl mx-auto">
                Profesionales reconocidos a nivel nacional e internacional que comparten su conocimiento
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto mb-6 md:mb-8">
              {experts.map((expert, index) => (
                <div 
                  key={index} 
                  className="glass-intense rounded-2xl overflow-hidden border border-white/10 hover:border-violet-500/30 transition-all duration-300"
                >
                  <div className="relative h-52 md:h-64 overflow-hidden">
                    <img 
                      src={expert.image} 
                      alt={expert.name} 
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4">
                      <h3 className="text-lg md:text-xl font-bold text-white">{expert.name}</h3>
                      <p className="text-violet-400 text-xs md:text-sm font-medium">{expert.role}</p>
                    </div>
                  </div>
                  <div className="p-4 md:p-5">
                    <p className="text-white/80 text-xs md:text-sm mb-3 md:mb-4">{expert.description}</p>
                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                      {expert.tags.map((tag, i) => (
                        <Badge key={i} variant="secondary" className="bg-violet-500/10 text-violet-400 border-violet-500/20 text-[10px] md:text-xs">
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
              <div className="glass-card inline-flex items-center gap-3 px-5 md:px-6 py-3 rounded-full border border-dashed border-violet-500/30">
                <Users className="w-4 h-4 md:w-5 md:h-5 text-violet-400" />
                <span className="text-white/80 text-xs md:text-sm">Más expertos por confirmar…</span>
              </div>
            </div>
          </div>
        </section>

        {/* Past Event Video — Mayo 2025 */}
        <section className="py-12 md:py-24 bg-black/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-8 md:mb-10">
                <div className="inline-block glass-card px-5 md:px-6 py-2 rounded-full mb-4 md:mb-6">
                  <span className="text-violet-400 font-bold uppercase tracking-wide text-xs md:text-sm">📽️ Evento Pasado</span>
                </div>
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 md:mb-4">
                  Revive Nuestro Primer Evento —{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">
                    Mayo 2025
                  </span>
                </h2>
                <p className="text-white/70 text-sm md:text-base max-w-3xl mx-auto mb-2 px-2">
                  En mayo de 2025 celebramos el primer Up Detail: una jornada que reunió a expertos de todo el país 
                  en las instalaciones de Detail Park. <strong className="text-white/90">Todas las plazas agotadas</strong>, 
                  asistentes de más de 6 provincias y una energía que superó todas las expectativas.
                </p>
                <p className="text-xs md:text-sm text-violet-400 font-medium">
                  🔥 Sold out en la primera edición — La jornada que inició todo
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
                <div className="order-2 md:order-1">
                  <YouTubeEmbed videoId="ZA8lZ5R6Yg0" title="Up Detail — Evento Mayo 2025" />
                </div>
                <div className="order-1 md:order-2 space-y-3 md:space-y-6">
                  <div className="glass-card p-4 md:p-5 rounded-xl border border-violet-500/20">
                    <div className="flex items-center gap-3 mb-1.5 md:mb-2">
                      <Trophy className="w-4 h-4 md:w-5 md:h-5 text-violet-400 shrink-0" />
                      <h3 className="font-bold text-white text-sm md:text-base">Sold Out en la 1ª Edición</h3>
                    </div>
                    <p className="text-white/70 text-xs md:text-sm">Las plazas se agotaron antes de lo previsto, demostrando el interés del sector por este formato único.</p>
                  </div>
                  <div className="glass-card p-4 md:p-5 rounded-xl border border-violet-500/20">
                    <div className="flex items-center gap-3 mb-1.5 md:mb-2">
                      <Users className="w-4 h-4 md:w-5 md:h-5 text-violet-400 shrink-0" />
                      <h3 className="font-bold text-white text-sm md:text-base">Asistentes de Toda España</h3>
                    </div>
                    <p className="text-white/70 text-xs md:text-sm">Profesionales y apasionados del detailing viajaron desde más de 6 provincias para vivir esta experiencia.</p>
                  </div>
                  <div className="glass-card p-4 md:p-5 rounded-xl border border-violet-500/20">
                    <div className="flex items-center gap-3 mb-1.5 md:mb-2">
                      <Star className="w-4 h-4 md:w-5 md:h-5 text-violet-400 shrink-0" />
                      <h3 className="font-bold text-white text-sm md:text-base">Valoración: 4.9/5</h3>
                    </div>
                    <p className="text-white/70 text-xs md:text-sm">Los asistentes valoraron la experiencia como una de las mejores jornadas de formación del sector.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-6 md:mb-10">
              <h2 className="text-xl md:text-3xl font-bold text-white">
                Así son nuestras{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">
                  Jornadas Colaborativas
                </span>
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 max-w-5xl mx-auto">
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
        <section id="preregistro" className="py-12 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-xl mx-auto text-center">
              <Badge className="bg-violet-500/20 text-violet-400 border-violet-500/30 mb-4 md:mb-6">
                ⚡ PRÓXIMAMENTE
              </Badge>
              
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 md:mb-4">
                Sé el Primero en{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">
                  Enterarte
                </span>
              </h2>
              
              <p className="text-white/80 text-sm md:text-base mb-2 px-2">
                Las plazas están cerradas y la próxima edición aún no tiene fecha. Déjanos tu email y te avisaremos en cuanto abramos inscripciones.
              </p>
              <p className="text-xs md:text-sm text-violet-400 font-medium mb-6 md:mb-8">
                💡 Precio confirmado: 349€ + IVA — Si continúas con un curso completo, se descuenta.
              </p>

              {submitted ? (
                <div className="glass-intense rounded-2xl p-6 md:p-8 border border-green-500/30 text-center">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <CheckCircle className="w-7 h-7 md:w-8 md:h-8 text-green-400" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2">¡Registrado!</h3>
                  <p className="text-white/70 text-xs md:text-sm mb-4 md:mb-6">
                    Te avisaremos por email cuando confirmemos la fecha y abramos las inscripciones.
                  </p>
                  <Link to="/jornada-zero-detailing">
                    <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10 min-h-[44px]">
                      Mientras tanto, mira la Jornada Zero →
                    </Button>
                  </Link>
                </div>
              ) : (
                <form onSubmit={handlePreRegister} className="glass-intense rounded-2xl p-5 md:p-8 border border-violet-500/20">
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
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-violet-400 h-12 text-base"
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
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-violet-400 h-12 text-base"
                        placeholder="tu@email.com"
                        required
                        disabled={loading}
                      />
                    </div>
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-bold min-h-[48px]"
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
        <section className="py-10 md:py-16 bg-black/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto glass-intense rounded-2xl p-5 md:p-8 border border-primary/20 text-center">
              <h3 className="text-lg md:text-2xl font-bold text-white mb-2 md:mb-3">
                ¿No quieres esperar? Prueba la{' '}
                <span className="text-primary">Jornada Zero</span>
              </h3>
              <p className="text-white/70 text-xs md:text-sm mb-4 md:mb-6 max-w-xl mx-auto">
                La Jornada Zero está disponible ahora por solo 97€ + IVA, con el equipo de Detail Park. Si decides continuar con un curso completo, el importe se descuenta.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
                <Link to="/jornada-zero-detailing">
                  <Button variant="hero" size="lg" className="gap-2 min-h-[48px] w-full sm:w-auto">
                    Ver Jornada Zero
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/curso-detailing-iniciacion">
                  <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 gap-2 min-h-[48px] w-full sm:w-auto">
                    Comparar ambas jornadas
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Google Reviews */}
        <GoogleReviews />

        {/* Partners y Colaboradores */}
        <section className="bg-black/50 py-10 md:py-14 border-t border-violet-500/10">
          <div className="container mx-auto px-4">
            <p className="text-center text-xs text-white/50 uppercase tracking-wider font-semibold mb-6">
              Nuestros Partners y Colaboradores
            </p>
            <div className="flex items-center justify-center gap-8 md:gap-14 flex-wrap">
              <span className="font-monument text-xl md:text-3xl leading-none tracking-wide text-foreground opacity-50 hover:opacity-100 transition-opacity duration-300" aria-label="Leandro Landete Academy - Colaborador formativo">LEANDRO LANDETE ACADEMY</span>
              <img src={logoStek} alt="STEK Automotive - Instaladores oficiales" className="h-7 md:h-10 w-auto brightness-0 invert opacity-50 hover:opacity-100 transition-opacity duration-300" />
              <img src={logoCarcarePassion} alt="Car Care Passion - Partner oficial de productos" className="h-7 md:h-10 w-auto brightness-0 invert opacity-50 hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black py-10 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
              <div className="text-center md:text-left">
                <img src={detailParkLogo} alt="Detail Park" className="h-10 md:h-12 mx-auto md:mx-0 mb-3 md:mb-4 filter brightness-0 invert" />
                <p className="text-white/60 text-xs md:text-sm">
                  Centro de formación profesional en detailing y estética del automóvil.
                </p>
              </div>
              
              <div className="text-center">
                <h4 className="text-white font-semibold mb-3 md:mb-4 text-sm md:text-base">Explora</h4>
                <div className="flex flex-col gap-2">
                  <Link to="/" className="text-white/60 hover:text-violet-400 transition-colors text-xs md:text-sm min-h-[44px] flex items-center justify-center md:justify-start">Inicio</Link>
                  <Link to="/curso-detailing-iniciacion" className="text-white/60 hover:text-violet-400 transition-colors text-xs md:text-sm min-h-[44px] flex items-center justify-center md:justify-start">Jornadas Intensivas</Link>
                  <Link to="/jornada-zero-detailing" className="text-white/60 hover:text-violet-400 transition-colors text-xs md:text-sm min-h-[44px] flex items-center justify-center md:justify-start">Jornada Zero</Link>
                  <Link to="/curso-detailing-profesional" className="text-white/60 hover:text-violet-400 transition-colors text-xs md:text-sm min-h-[44px] flex items-center justify-center md:justify-start">Cursos de Detailing</Link>
                  <Link to="/contacto" className="text-white/60 hover:text-violet-400 transition-colors text-xs md:text-sm min-h-[44px] flex items-center justify-center md:justify-start">Contacto</Link>
                </div>
              </div>
              
              <div className="text-center md:text-right">
                <h4 className="text-white font-semibold mb-3 md:mb-4 text-sm md:text-base">¿Quieres más formación?</h4>
                <p className="text-white/60 text-xs md:text-sm mb-3 md:mb-4">
                  Descubre nuestros cursos completos y la Carrera Detailing.
                </p>
                <Link to="/formacion-profesional-detailing">
                  <Button variant="outline" size="sm" className="border-violet-500/30 text-violet-400 hover:bg-violet-500/10 min-h-[44px]">
                    Ver Programa Completo
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="border-t border-white/10 pt-4 md:pt-6">
              <p className="text-white/60 text-[10px] md:text-sm text-center leading-relaxed">
                © {new Date().getFullYear()} Detailing Car & Parking Club S.L. Todos los derechos reservados.
                <span className="hidden md:inline"> | </span>
                <br className="md:hidden" />
                <Link to="/politica-privacidad" className="text-white/80 hover:text-white mx-1 md:mx-2 inline-block mt-1.5 md:mt-0">Política de Privacidad</Link>
                <span className="mx-1">•</span>
                <Link to="/politica-privacidad" className="text-white/80 hover:text-white mx-1 md:mx-2 inline-block">Aviso Legal</Link>
              </p>
            </div>
          </div>
        </footer>

        {/* Waiting list / dates FAQ */}
        <WaitlistFAQ
          onCtaClick={() =>
            document.getElementById('preregistro')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
          }
        />

        {/* Mobile Sticky CTA */}
        <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-black/90 backdrop-blur-md border-t border-violet-500/20 p-3 safe-area-bottom">
          <Button 
            className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-bold min-h-[48px] text-sm"
            onClick={() => document.getElementById('preregistro')?.scrollIntoView({ behavior: 'smooth' })}
          >
            🔔 Avísame cuando abran plazas
          </Button>
        </div>
      </div>
    </>
  );
}

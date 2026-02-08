import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Lightbulb, GraduationCap } from 'lucide-react';
import { BlogPost, blogPosts, categoryLabels, categoryColors } from '@/data/blogPosts';
import { formations } from '@/data/formations';
import { Button } from '@/components/ui/button';

interface BlogBentoHeroProps {
  featuredPost: BlogPost;
}

export function BlogBentoHero({ featuredPost }: BlogBentoHeroProps) {
  // Get second most recent non-featured post
  const secondaryPost = blogPosts.filter(p => !p.featured && p.id !== featuredPost.id)[0];
  const course = formations[0]; // Curso de Detailing

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Left: Featured post (large) */}
      <Link
        to={`/blog/${featuredPost.slug}`}
        className="lg:col-span-2 lg:row-span-2 group relative overflow-hidden rounded-xl min-h-[360px] md:min-h-[480px] lg:min-h-[540px]"
      >
        <img
          src={featuredPost.image}
          alt={featuredPost.imageAlt}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

        {/* Decorative pulse */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-primary/10 rounded-full blur-[80px] animate-pulse pointer-events-none" />

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-10">
          <div className="flex items-center gap-2 mb-3">
            <span className={`px-3 py-1 text-[11px] font-semibold rounded-full border ${categoryColors[featuredPost.category]}`}>
              {categoryLabels[featuredPost.category]}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium rounded-full bg-primary/20 text-primary border border-primary/30">
              <Sparkles className="h-3 w-3" />
              Destacado
            </span>
          </div>

          <h2
            className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-snug mb-3"
            style={{
              fontFamily: "'Open Sans', sans-serif",
              textShadow: '0 2px 8px rgba(0,0,0,0.5)',
            }}
          >
            {featuredPost.title}
          </h2>

          <p className="text-white/70 text-sm md:text-base leading-relaxed mb-5 max-w-xl line-clamp-2">
            {featuredPost.excerpt}
          </p>

          <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
            Leer Reportaje
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </Link>

      {/* Right column cards */}

      {/* Course promo card */}
      <div className="relative overflow-hidden rounded-xl bg-primary p-5 md:p-6 flex flex-col justify-between min-h-[180px]">
        {/* Subtle decorative pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <GraduationCap className="h-5 w-5 text-primary-foreground/80" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-primary-foreground/70">
              Formación Profesional
            </span>
          </div>
          <h3
            className="text-lg md:text-xl font-bold text-primary-foreground leading-tight mb-1"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.02em' }}
          >
            {course.shortTitle}
          </h3>
          <p className="text-primary-foreground/70 text-xs leading-relaxed line-clamp-2 mb-3">
            {course.duration} · +{course.alumnosCertificados} certificados
          </p>
        </div>

        <Link to={course.href} className="relative z-10">
          <Button
            size="sm"
            className="bg-white text-primary hover:bg-white/90 rounded-lg text-xs font-semibold w-full"
          >
            Ver Detalles
            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </Button>
        </Link>
      </div>

      {/* Secondary article card (overlay style) */}
      {secondaryPost && (
        <Link
          to={`/blog/${secondaryPost.slug}`}
          className="group/sec relative overflow-hidden rounded-xl min-h-[180px]"
        >
          <img
            src={secondaryPost.image}
            alt={secondaryPost.imageAlt}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover/sec:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-4">
            <span className={`inline-block px-2.5 py-0.5 text-[10px] font-semibold rounded-full border mb-2 ${categoryColors[secondaryPost.category]}`}>
              {categoryLabels[secondaryPost.category]}
            </span>
          <h3
            className="text-white font-bold text-sm leading-snug line-clamp-2"
            style={{
              fontFamily: "'Open Sans', sans-serif",
              textShadow: '0 1px 4px rgba(0,0,0,0.6)',
            }}
          >
            {secondaryPost.title}
          </h3>
          </div>
        </Link>
      )}

      {/* Tip of the week card */}
      <div className="relative overflow-hidden rounded-xl bg-card border border-border p-5 md:p-6 flex flex-col justify-center min-h-[180px]">
        <div className="absolute top-3 right-3">
          <Lightbulb className="h-5 w-5 text-primary/40" />
        </div>

        <span className="text-[11px] font-semibold uppercase tracking-wider text-primary mb-2">
          Tip de la Semana
        </span>
        <p className="text-foreground text-sm leading-relaxed italic">
          "La diferencia entre un lavadero y un detailer profesional no es el precio, es el conocimiento. Invierte en formarte y el mercado te recompensará."
        </p>
        <span className="text-xs text-muted-foreground mt-3">— Daniel López, CEO Detail Park</span>
      </div>
    </div>
  );
}

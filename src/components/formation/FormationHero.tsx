import { Clock, Users, Award, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FormationDetail } from '@/data/formationDetails';

interface FormationHeroProps {
  formation: FormationDetail;
  onCTAClick: () => void;
}

export function FormationHero({ formation, onCTAClick }: FormationHeroProps) {
  const discount = Math.round(
    ((formation.originalPrice - formation.price) / formation.originalPrice) * 100
  );

  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${formation.image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a formaciones
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 mb-6">
              <span className="text-primary font-semibold text-sm">
                {formation.duration}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {formation.title}
            </h1>
            <p className="text-xl text-white/70 mb-6">
              {formation.subtitle}
            </p>
            <p className="text-white/80 leading-relaxed mb-8 max-w-xl">
              {formation.heroDescription}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2 text-white/70">
                <Clock className="h-5 w-5 text-primary" />
                <span>{formation.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <Users className="h-5 w-5 text-primary" />
                <span>Grupos reducidos</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <Award className="h-5 w-5 text-primary" />
                <span>Certificado incluido</span>
              </div>
            </div>

            {/* CTA */}
            <Button variant="hero" size="xl" onClick={onCTAClick}>
              Reservar Plaza
            </Button>
          </div>

          {/* Right - Price Card */}
          <div className="hidden lg:block">
            <div className="bg-card/90 backdrop-blur-xl border border-border rounded-2xl p-8 max-w-sm ml-auto">
              <div className="mb-6">
                <span className="text-sm text-muted-foreground line-through">
                  €{formation.originalPrice}
                </span>
                <div className="flex items-end gap-2">
                  <span className="text-5xl font-bold text-foreground">
                    €{formation.price}
                  </span>
                  <span className="text-primary font-semibold mb-1">
                    -{discount}%
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {formation.includes.slice(0, 4).map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>

              <Button
                variant="hero"
                size="lg"
                className="w-full"
                onClick={onCTAClick}
              >
                Reservar Ahora
              </Button>

              <p className="text-center text-xs text-muted-foreground mt-4">
                Plazas limitadas • Próximas fechas disponibles
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

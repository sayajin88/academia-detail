import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { Formation } from '@/data/formations';

interface FormationCardProps {
  formation: Formation;
}

export function FormationCard({ formation }: FormationCardProps) {
  return (
    <Link
      to={formation.href}
      className="group relative block h-[360px] md:h-[420px] rounded-2xl overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url(${formation.image})` }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

      {/* Content */}
      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
        {/* Duration Badge */}
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-xs font-medium border border-white/20">
            <Clock className="h-3.5 w-3.5" />
            {formation.duration}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
          {formation.title}
        </h3>

        {/* Description */}
        <p className="text-white/70 text-sm md:text-base leading-relaxed mb-4 line-clamp-3">
          {formation.description}
        </p>

        {/* CTA */}
        <div className="flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wide">
          <span>Ver detalles</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
        </div>
      </div>

      {/* Hover Border Effect */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/50 transition-colors duration-300" />
    </Link>
  );
}

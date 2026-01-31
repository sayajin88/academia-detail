import { Link } from 'react-router-dom';
import { ArrowRight, Award, Users, Car, Calendar, Instagram, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/shared/SectionHeading';
import instructorImage from '@/assets/instructor-daniel-principal.png';

const stats = [
  { icon: Calendar, value: '12+', label: 'Años de Experiencia' },
  { icon: Car, value: '15.000+', label: 'Vehículos Trabajados' },
  { icon: Users, value: '500+', label: 'Alumnos Formados' },
  { icon: Award, value: '4', label: 'Certificaciones' },
];

export function InstructorSection() {
  return (
    <section className="py-20 md:py-28 bg-card relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeading
          badge="Tu Instructor"
          title="Aprende del Mejor"
          subtitle="Conoce a quien te formará en el arte del detailing profesional"
        />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* Image Column */}
          <div className="relative">
            <div className="relative aspect-[4/5] max-w-md mx-auto">
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary-glow/20 rounded-3xl blur-2xl scale-95" />
              
              {/* Main image */}
              <img
                src={instructorImage}
                alt="Daniel López - Instructor Principal de Detail Park"
                className="relative w-full h-full object-cover rounded-3xl shadow-2xl border border-border"
                loading="lazy"
              />

              {/* Experience badge */}
              <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground px-6 py-3 rounded-2xl shadow-xl">
                <div className="text-2xl font-bold">12+</div>
                <div className="text-sm opacity-90">años de experiencia</div>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className="space-y-6">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Daniel López
              </h3>
              <p className="text-lg text-primary font-medium">
                Fundador & Instructor Principal
              </p>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed">
              Con más de 12 años en el sector del detailing profesional, Daniel ha trabajado con las marcas más exclusivas: Ferrari, Lamborghini, Porsche, McLaren y más. Su metodología combina la <strong className="text-foreground">perfección técnica</strong> con una visión clara de <strong className="text-foreground">negocio rentable</strong>.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              No solo te enseñará a pulir y proteger vehículos de alta gama, sino que compartirá contigo los secretos para montar y escalar un negocio de detailing exitoso. Su filosofía: <em className="text-foreground">"Un buen técnico sin mentalidad de empresario es solo un empleado caro"</em>.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-border">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <stat.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                  <div className="text-xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Social Links & CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Button asChild size="lg" className="group">
                <Link to="/contacto">
                  Contactar con Daniel
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com/danidetailoficial/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-muted hover:bg-primary/20 hover:text-primary transition-colors"
                  aria-label="Instagram de Daniel"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://www.youtube.com/@detailpark"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-muted hover:bg-primary/20 hover:text-primary transition-colors"
                  aria-label="YouTube de Detail Park"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

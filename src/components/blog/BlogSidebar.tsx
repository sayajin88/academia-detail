import { Link } from 'react-router-dom';
import { Phone, ArrowRight, GraduationCap, Car, Palette, ShieldCheck, Star, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BlogReadingProgress } from './BlogReadingProgress';
import cursoDetailing from '@/assets/curso-detailing-4.jpg';

const courses = [
  { name: 'Detailing Profesional', href: '/curso-detailing-profesional', icon: Car },
  { name: 'Car Wrapping', href: '/curso-vinilado-vehiculos', icon: Palette },
  { name: 'PPF Protección Pintura', href: '/curso-ppf-proteccion-pintura', icon: ShieldCheck },
  { name: 'Formación Completa', href: '/formacion-profesional-detailing', icon: GraduationCap },
];

const benefits = [
  'Acceso a Todas las Lecciones',
  'Certificación Oficial Academia Detail',
];

interface BlogSidebarProps {
  readProgress?: number;
  readingTime?: string;
}

export function BlogSidebar({ readProgress, readingTime }: BlogSidebarProps) {
  return (
    <aside className="space-y-5">
      {/* Course CTA Card */}
      <div className="bg-card border border-border rounded-xl overflow-hidden sticky top-24">
        {/* Course image */}
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={cursoDetailing}
            alt="Curso de Detailing Profesional"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-5">
          {/* Title + Rating */}
          <h4
            className="text-lg font-bold text-foreground mb-1.5"
            style={{ fontFamily: "'Open Sans', sans-serif", textTransform: 'none', letterSpacing: 'normal' }}
          >
            Curso Detailing Profesional
          </h4>
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">(492 reviews)</span>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Formación 100% práctica en taller real con clientes de alta gama. Grupos reducidos de máximo 3 personas.
          </p>

          <Link to="/contacto">
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl py-5 group mb-3">
              Empezar a Aprender
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>

          <a href="https://wa.me/34622773555" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="w-full border-border text-foreground hover:bg-muted rounded-xl py-5">
              <Phone className="mr-2 h-4 w-4" />
              WhatsApp directo
            </Button>
          </a>

          {/* Benefits */}
          <div className="mt-4 pt-4 border-t border-border space-y-2.5">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                {benefit}
              </div>
            ))}
          </div>

          {/* Course links */}
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground/70 uppercase tracking-wider mb-3 font-semibold">Nuestros Cursos</p>
            <div className="space-y-1.5">
              {courses.map((course) => (
                <Link
                  key={course.href}
                  to={course.href}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200 group"
                >
                  <course.icon className="h-4 w-4 text-primary/60 group-hover:text-primary transition-colors" />
                  {course.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reading Progress Widget */}
      {readProgress !== undefined && readingTime && (
        <BlogReadingProgress progress={readProgress} readingTime={readingTime} />
      )}
    </aside>
  );
}

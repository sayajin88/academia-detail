import { Link } from 'react-router-dom';
import { Phone, ArrowRight, GraduationCap, Car, Palette, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

const courses = [
  { name: 'Detailing Profesional', href: '/curso-detailing-profesional', icon: Car },
  { name: 'Car Wrapping', href: '/curso-vinilado-vehiculos', icon: Palette },
  { name: 'PPF Protección Pintura', href: '/curso-ppf-proteccion-pintura', icon: ShieldCheck },
  { name: 'Formación Completa', href: '/formacion-profesional-detailing', icon: GraduationCap },
];

export function BlogSidebar() {
  return (
    <aside className="space-y-6">
      {/* CTA Card */}
      <div className="bg-gradient-to-br from-primary/15 via-card to-card border border-primary/20 rounded-xl p-6 sticky top-24">
        <div className="text-center mb-4">
          <h4 className="text-xl font-bold text-foreground mb-2" style={{ fontFamily: "'Open Sans', sans-serif", textTransform: 'none', letterSpacing: 'normal' }}>
            ¿Quieres ser detailer profesional?
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Formación 100% práctica en taller real con clientes de alta gama. Grupos reducidos de máximo 3 personas.
          </p>
        </div>

        <Link to="/contacto">
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl py-5 group mb-3">
            Solicitar información
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>

        <a href="https://wa.me/34622773555" target="_blank" rel="noopener noreferrer">
          <Button variant="outline" className="w-full border-border text-foreground hover:bg-muted rounded-xl py-5">
            <Phone className="mr-2 h-4 w-4" />
            WhatsApp directo
          </Button>
        </a>

        {/* Course links */}
        <div className="mt-6 pt-5 border-t border-border">
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
    </aside>
  );
}

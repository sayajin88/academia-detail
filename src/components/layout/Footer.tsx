import { Link } from 'react-router-dom';
import { Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import logo from '@/assets/detail-park-logo-white.png';

const formationLinks = [
  { name: 'Detailing', href: '/formacion/detailing' },
  { name: 'Car Wrapping', href: '/formacion/wrapping' },
  { name: 'Paint Protection Film', href: '/formacion/ppf' },
  { name: 'Restauración', href: '/formacion/restauracion' },
  { name: 'Carrera Detailing', href: '/carrera-detailing' },
];

const legalLinks = [
  { name: 'Política de Privacidad', href: '/privacidad' },
  { name: 'Términos y Condiciones', href: '/terminos' },
  { name: 'Política de Cookies', href: '/cookies' },
];

const socialLinks = [
  { name: 'Instagram', href: 'https://instagram.com/detailpark', icon: Instagram },
  { name: 'YouTube', href: 'https://youtube.com/@detailpark', icon: Youtube },
];

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <img src={logo} alt="Detail Park" className="h-10 w-auto" />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Centro de formación líder en detailing profesional. Aprende de los mejores y transforma tu pasión en profesión.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-muted hover:bg-primary/20 hover:text-primary transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Formaciones */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Formaciones</h4>
            <ul className="space-y-2.5">
              {formationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:info@detailpark.es"
                  className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  info@detailpark.es
                </a>
              </li>
              <li>
                <a
                  href="tel:+34600000000"
                  className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  +34 600 000 000
                </a>
              </li>
              <li>
                <a
                  href="https://maps.google.com/?q=Calle+Metalurgias+13+03008+Alicante+España"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>
                    Calle Metalurgias, 13
                    <br />
                    03008 Alicante, España
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Detail Park. Todos los derechos reservados.
            </p>
            <p className="text-xs text-muted-foreground/60">
              Hecho con pasión por el detailing
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

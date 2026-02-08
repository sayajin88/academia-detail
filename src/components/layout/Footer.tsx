import { Link } from 'react-router-dom';
import { Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import logo from '@/assets/detail-park-logo-white.png';

const formationLinks = [
  { name: 'Detailing', href: '/curso-detailing-profesional' },
  { name: 'Car Wrapping', href: '/curso-vinilado-vehiculos' },
  { name: 'Paint Protection Film', href: '/curso-ppf-proteccion-pintura' },
  { name: 'Restauración', href: '/curso-restauracion-vehiculos' },
  { name: 'Carrera Detailing', href: '/formacion-profesional-detailing' },
];

const quickLinks = [
  { name: 'Blog', href: '/blog' },
  { name: 'Quiénes Somos', href: '/quienes-somos' },
  { name: 'Contacto', href: '/contacto' },
];

const legalLinks = [
  { name: 'Política de Privacidad', href: '/privacidad' },
  { name: 'Términos y Condiciones', href: '/terminos' },
  { name: 'Política de Cookies', href: '/cookies' },
];

const socialLinks = [
  { name: 'Instagram Academia', href: 'https://www.instagram.com/detailparkoficial/', icon: Instagram },
  { name: 'Instagram Daniel', href: 'https://www.instagram.com/danidetailoficial/', icon: Instagram },
  { name: 'YouTube', href: 'https://www.youtube.com/@detailpark', icon: Youtube },
];

export function Footer() {
  return (
    <footer role="contentinfo" className="bg-gradient-to-b from-card to-background/80 border-t border-border relative">
      {/* Decorative burgundy top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="container mx-auto px-4 py-12 md:py-16 pt-14 md:pt-18">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-2">
              <img src={logo} alt="Academia Detail - Escuela de detailing profesional" className="h-10 w-auto" />
            </Link>
            <a 
              href="https://www.detailpark.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block text-xs text-muted-foreground hover:text-primary transition-colors mb-4 tracking-wide"
            >
              Potenciada por <span className="font-semibold text-foreground/80">Detail Park</span> ↗
            </a>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Centro de formación líder en detailing profesional, dentro de las instalaciones de Detail Park en Alicante. Aprende de los mejores y transforma tu pasión en profesión.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-muted hover:bg-primary/20 hover:text-primary hover:border-primary/30 border border-transparent transition-all duration-300 min-w-[48px] min-h-[48px] flex items-center justify-center"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5 md:h-6 md:w-6" />
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

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Navegación</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
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
                  href="mailto:info@academiadetail.com"
                  className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  info@academiadetail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+34622773555"
                  className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  +34 622 773 555
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

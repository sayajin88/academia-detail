import { MapPin, Mail, Phone, ExternalLink } from "lucide-react";
import detailParkLogo from "@/assets/detail-park-logo-white.png";

const ContactInfo = () => {
  const contactDetails = [
    {
      icon: MapPin,
      label: "Dirección",
      value: "Calle Metalurgias, 13",
      subvalue: "03008 Alicante, España",
      href: "https://www.google.com/maps/place/Detail+Park/",
      external: true,
    },
    {
      icon: Mail,
      label: "Email",
      value: "info@academiadetail.com",
      href: "mailto:info@academiadetail.com",
    },
    {
      icon: Phone,
      label: "Teléfono",
      value: "+34 622 773 555",
      href: "tel:+34622773555",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Contact Details Card */}
      <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-6">Información de contacto</h2>

        <div className="space-y-5">
          {contactDetails.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="font-medium group-hover:text-primary transition-colors">
                  {item.value}
                </p>
                {item.subvalue && (
                  <p className="text-sm text-muted-foreground">
                    {item.subvalue}
                  </p>
                )}
              </div>
              {item.external && (
                <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </a>
          ))}
        </div>
      </div>

      {/* Map Card */}
      <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-4">Nuestra ubicación</h2>
        <p className="text-muted-foreground mb-4">
          La academia se encuentra dentro de las instalaciones de{" "}
          <strong className="text-foreground">Detail Park</strong>, en Alicante.
        </p>

        {/* Detail Park Banner */}
        <a
          href="https://www.detailpark.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 hover:border-primary/40 transition-all group mb-6"
        >
          <img
            src={detailParkLogo}
            alt="Detail Park"
            className="h-10 w-auto object-contain brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity"
          />
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
              Visita Detail Park
            </p>
            <p className="text-xs text-muted-foreground">www.detailpark.com</p>
          </div>
          <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </a>

        <div className="rounded-xl overflow-hidden border border-border">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3128.5!2d-0.4892!3d38.3452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd62364f92b3c9b9%3A0x1234567890!2sDetail+Park!5e0!3m2!1ses!2ses!4v1"
            width="100%"
            height="250"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación de Detail Park Alicante"
            className="w-full"
          />
        </div>

        <a
          href="https://www.google.com/maps/place/Detail+Park/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-4 text-primary hover:underline"
        >
          <ExternalLink className="w-4 h-4" />
          Abrir en Google Maps
        </a>
      </div>
    </div>
  );
};

export default ContactInfo;

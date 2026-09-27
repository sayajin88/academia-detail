import { Clock, Instagram, Youtube, MessageCircle } from "lucide-react";

const ContactSchedule = () => {
  const schedule = [
    { day: "Lunes - Viernes", hours: "07:00 - 17:30" },
    { day: "Sábados y Domingos", hours: "Cerrado" },
  ];

  const socialLinks = [
    {
      icon: Instagram,
      label: "@detailparkoficial",
      href: "https://www.instagram.com/detailparkoficial/",
      color: "hover:text-pink-500",
    },
    {
      icon: Instagram,
      label: "@danidetailoficial",
      href: "https://www.instagram.com/danidetailoficial/",
      color: "hover:text-pink-500",
    },
    {
      icon: Youtube,
      label: "YouTube",
      href: "https://www.youtube.com/@detailpark",
      color: "hover:text-red-500",
    },
  ];

  return (
    <section className="py-16 md:py-20">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Schedule */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-brand" />
                  </div>
                  <h2 className="text-xl font-bold">Horario de atención</h2>
                </div>

                <div className="space-y-3">
                  {schedule.map((item) => (
                    <div
                      key={item.day}
                      className="flex justify-between items-center py-2 border-b border-border last:border-0"
                    >
                      <span className="text-muted-foreground">{item.day}</span>
                      <span className="font-medium">{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social & Response Time */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-brand" />
                  </div>
                  <h2 className="text-xl font-bold">Síguenos</h2>
                </div>

                <p className="text-muted-foreground mb-6">
                  Mantente al día con nuestros cursos, trabajos y novedades
                  siguiéndonos en redes sociales.
                </p>

                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-4 py-3 min-h-[48px] rounded-full bg-muted/50 transition-colors ${link.color} hover:bg-muted`}
                      aria-label={link.label}
                    >
                      <link.icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{link.label}</span>
                    </a>
                  ))}
                </div>

                <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">
                      Tiempo de respuesta:
                    </span>{" "}
                    Normalmente respondemos en un plazo de 48 horas laborables.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSchedule;

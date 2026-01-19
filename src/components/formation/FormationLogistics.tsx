import { Plane, Train, Hotel, Car, MapPin, Clock } from 'lucide-react';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { SectionHeading } from '@/components/shared/SectionHeading';

interface FormationLogisticsProps {
  showForSlug?: string;
}

export function FormationLogistics({ showForSlug }: FormationLogisticsProps) {
  // Only show for detailing course or if explicitly enabled
  if (showForSlug && showForSlug !== 'curso-detailing-profesional') {
    return null;
  }

  const logisticsItems = [
    {
      icon: Plane,
      title: 'Aeropuerto de Alicante-Elche (ALC)',
      description: 'A solo 15 minutos en coche de nuestras instalaciones. Conexiones directas con toda España y Europa.',
    },
    {
      icon: Train,
      title: 'Estación AVE Alicante',
      description: 'Conexiones directas con Madrid, Barcelona y Valencia. A 20 minutos de nuestro taller.',
    },
    {
      icon: Hotel,
      title: 'Gestión de Alojamiento',
      description: 'Colaboramos con hoteles cercanos con precios especiales para nuestros alumnos. Nosotros lo gestionamos por ti.',
    },
    {
      icon: Car,
      title: 'Parking Gratuito',
      description: 'Si vienes en coche, disponemos de parking gratuito en nuestras instalaciones durante toda la formación.',
    },
    {
      icon: MapPin,
      title: 'Ubicación Céntrica',
      description: 'Estamos en zona industrial de fácil acceso, con servicios de restauración y comercios cercanos.',
    },
    {
      icon: Clock,
      title: 'Horarios Flexibles',
      description: 'Jornadas de 9:00 a 18:00 para que puedas organizar tu viaje con comodidad.',
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <SectionHeading
            badge="Alumnos Nacionales e Internacionales"
            title="Tu Formación de Detailing, Sin Complicaciones de Viaje"
            subtitle="Facilitamos la logística para que solo te preocupes de aprender"
          />
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {logisticsItems.map((item, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <div className="group p-6 bg-card rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 h-full">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Call to action */}
        <AnimatedSection delay={0.6}>
          <div className="mt-12 text-center">
            <p className="text-muted-foreground max-w-2xl mx-auto">
              <span className="text-primary font-medium">¿Vienes de fuera de Alicante?</span> Contacta con nosotros y te ayudamos a organizar todo: alojamiento, transporte desde el aeropuerto o estación, y cualquier necesidad especial.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

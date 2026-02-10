import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { DirectoryJoinForm } from '@/components/directory/DirectoryJoinForm';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Shield, Star, Users } from 'lucide-react';

const DirectoryJoin = () => {
  return (
    <MainLayout>
      <Helmet>
        <title>Únete al Directorio de Detailers | Academia Detail</title>
        <meta name="description" content="Aparece en nuestro directorio de detailers certificados. Llega a nuevos clientes y muestra tus trabajos ✅ Solicitud gratuita en 2 minutos." />
        <link rel="canonical" href="https://academiadetail.com/directorio/unete" />
      </Helmet>

      <section className="container mx-auto px-4 pt-28 pb-20 space-y-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Inicio</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/directorio">Directorio</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>Únete</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <SectionHeading
          titleAs="h1"
          badge="Únete gratis"
          title="Aparece en el Directorio de Detailers"
          subtitle="Hazte visible para miles de propietarios que buscan un profesional de confianza en su ciudad."
        />

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-8">
          {[
            { icon: Users, title: 'Más visibilidad', desc: 'Llega a clientes que buscan detailing en tu zona' },
            { icon: Shield, title: 'Sello de calidad', desc: 'Badge de certificación que genera confianza' },
            { icon: Star, title: 'Portfolio profesional', desc: 'Muestra tus mejores trabajos con sliders antes/después' },
          ].map((b) => (
            <div key={b.title} className="text-center space-y-2">
              <div className="mx-auto w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <b.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">{b.title}</h3>
              <p className="text-sm text-muted-foreground">{b.desc}</p>
            </div>
          ))}
        </div>

        <DirectoryJoinForm />
      </section>
    </MainLayout>
  );
};

export default DirectoryJoin;

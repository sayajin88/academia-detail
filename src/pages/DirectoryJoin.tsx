import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { DirectoryJoinForm } from '@/components/directory/DirectoryJoinForm';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';

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
          badge="Solicitud gratuita"
          title="Únete al Directorio"
          subtitle="Completa los 4 pasos y revisaremos tu solicitud en menos de 48 horas."
        />

        <DirectoryJoinForm />
      </section>
    </MainLayout>
  );
};

export default DirectoryJoin;

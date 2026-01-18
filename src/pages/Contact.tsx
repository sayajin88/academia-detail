import { MainLayout } from "@/components/layout/MainLayout";
import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactSchedule from "@/components/contact/ContactSchedule";
import { PageBreadcrumbs } from '@/components/shared/PageBreadcrumbs';
import { SEO } from '@/components/SEO';
import { seoConfig } from '@/utils/seoConfig';

const Contact = () => {
  return (
    <>
      <SEO {...seoConfig.contact} />
      <MainLayout>
        {/* Breadcrumbs */}
        <div className="container mx-auto px-4">
          <PageBreadcrumbs items={[{ label: "Contacto" }]} />
        </div>
        
        <ContactHero />

        {/* Main Content */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Form */}
              <ContactForm />

              {/* Info + Map */}
              <ContactInfo />
            </div>
          </div>
        </section>

        {/* Schedule & Social */}
        <ContactSchedule />
      </MainLayout>
    </>
  );
};

export default Contact;

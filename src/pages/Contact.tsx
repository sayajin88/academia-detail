import { MainLayout } from "@/components/layout/MainLayout";
import ContactHero from "@/components/contact/ContactHero";
import EnrollmentWizard from "@/components/contact/EnrollmentWizard";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactSchedule from "@/components/contact/ContactSchedule";
import { GoogleReviews } from "@/components/shared/GoogleReviews";
import { SEO } from '@/components/SEO';
import { seoConfig } from '@/utils/seoConfig';

const Contact = () => {
  return (
    <>
      <SEO {...seoConfig.contact} />
      <MainLayout>
        <ContactHero />

        {/* Wizard de Inscripción */}
        <section className="py-16 md:py-24">
          <div className="container">
            <EnrollmentWizard />
          </div>
        </section>

        {/* Info de Contacto */}
        <section className="py-16 md:py-24 border-t border-border">
          <div className="container max-w-4xl">
            <ContactInfo />
          </div>
        </section>

        <GoogleReviews />
        <ContactSchedule />
      </MainLayout>
    </>
  );
};

export default Contact;

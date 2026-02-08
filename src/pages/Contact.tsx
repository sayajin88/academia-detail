import { MainLayout } from "@/components/layout/MainLayout";
import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
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

        {/* Google Reviews */}
        <GoogleReviews />

        {/* Schedule & Social */}
        <ContactSchedule />
      </MainLayout>
    </>
  );
};

export default Contact;

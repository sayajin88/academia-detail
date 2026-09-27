import { useSearchParams } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import EnrollmentWizard from '@/components/contact/EnrollmentWizard';
import { ContactDirect } from '@/components/contact/ContactDirect';
import { interestFromParam } from '@/components/contact/ContactFields';
import { SEO } from '@/components/SEO';
import { SITE, whatsappLink } from '@/data/site';
import { seoConfig } from '@/utils/seoConfig';

const Contact = () => {
  const [params] = useSearchParams();
  // /contacto?curso=<slug> preselecciona el curso (enlaces desde las páginas de cada curso)
  const interest = interestFromParam(params.get('curso'));
  const whatsappText = interest && interest.value !== 'general'
    ? `Hola, quiero información sobre: ${interest.label}.`
    : 'Hola, quiero información sobre los cursos de Academia Detail.';

  return (
    <>
      <SEO {...seoConfig.contact} />
      <MainLayout>
        <section className="ds-hero pb-16 md:pb-24">
          <div className="ds-container pt-2">
            <Breadcrumbs items={[{ name: 'Contacto', url: '/contacto' }]} />
          </div>
          <div className="ds-container pt-4">
            <div className="mb-10 max-w-2xl md:mb-12">
              <p className="ds-pill mb-5">Contacto · Alicante</p>
              <h1 className="ds-h1 text-foreground">Pide información o reserva <span className="ds-text-gradient">tu plaza</span></h1>
              <p className="ds-lead mt-5">
                Cuéntanos qué quieres aprender y en qué punto estás, y te respondemos en un plazo de 48 horas laborables. Si
                lo prefieres,{' '}
                <a href={SITE.phoneHref} className="font-semibold text-brand underline underline-offset-4">
                  llámanos
                </a>{' '}
                o{' '}
                <a href={whatsappLink(whatsappText)} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand underline underline-offset-4">
                  escríbenos por WhatsApp
                </a>
                .
              </p>
            </div>

            <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-10">
              <div className="ds-card p-5 md:p-8">
                <EnrollmentWizard initialInterest={interest?.value} />
              </div>
              <aside aria-label="Otras formas de contacto" className="lg:sticky lg:top-24">
                <ContactDirect whatsappText={whatsappText} />
              </aside>
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default Contact;

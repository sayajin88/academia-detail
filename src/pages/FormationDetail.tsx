import { useParams, Navigate, useLocation } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { FormationHero } from '@/components/formation/FormationHero';
import { FormationAdvantages } from '@/components/formation/FormationAdvantages';
import { FormationLevels } from '@/components/formation/FormationLevels';
import { FormationContent } from '@/components/formation/FormationContent';
import { FormationInstructor } from '@/components/formation/FormationInstructor';
import { FormationModules } from '@/components/formation/FormationModules';
import { FormationReglada } from '@/components/formation/FormationReglada';
import { FormationCertification } from '@/components/formation/FormationCertification';
import { FormationIncludes } from '@/components/formation/FormationIncludes';
import { FormationFAQ } from '@/components/formation/FormationFAQ';
import { FormationCTA } from '@/components/formation/FormationCTA';
import { getFormationBySlug } from '@/data/formationDetails';
import { useToast } from '@/hooks/use-toast';
import { SEO } from '@/components/SEO';
import { seoConfig } from '@/utils/seoConfig';

// Map URL paths to formation slugs
const pathToSlugMap: Record<string, string> = {
  '/curso-detailing-profesional': 'curso-detailing-profesional',
  '/curso-vinilado-vehiculos': 'curso-vinilado-vehiculos',
  '/curso-ppf-proteccion-pintura': 'curso-ppf-proteccion-pintura',
  '/curso-restauracion-vehiculos': 'curso-restauracion-vehiculos',
};

export default function FormationDetailPage() {
  const { slug: paramSlug } = useParams<{ slug: string }>();
  const location = useLocation();
  const { toast } = useToast();
  
  // Determine slug from either URL path or route param
  const slug = pathToSlugMap[location.pathname] || paramSlug;
  
  const formation = slug ? getFormationBySlug(slug) : undefined;

  if (!formation) {
    return <Navigate to="/" replace />;
  }

  // Generate SEO config for this specific formation
  const formationSEO = seoConfig.getFormationSEO(slug!, {
    title: formation.title,
    description: formation.description,
    price: formation.price,
    duration: formation.duration,
    faqs: formation.faqs,
  });

  const handleCTAClick = () => {
    toast({
      title: "¡Próximamente!",
      description: "El formulario de reserva estará disponible pronto. Mientras tanto, contacta con nosotros por teléfono o email.",
    });
  };

  return (
    <>
      <SEO {...formationSEO} />
      <MainLayout>
        <FormationHero formation={formation} onCTAClick={handleCTAClick} />
        <FormationAdvantages formation={formation} />
        <FormationLevels formation={formation} />
        <FormationContent formation={formation} />
        <FormationInstructor formation={formation} />
        <FormationModules formation={formation} />
        <FormationReglada formation={formation} />
        <FormationCertification formation={formation} />
        <FormationIncludes formation={formation} />
        <FormationFAQ formation={formation} />
        <FormationCTA formation={formation} onCTAClick={handleCTAClick} />
      </MainLayout>
    </>
  );
}

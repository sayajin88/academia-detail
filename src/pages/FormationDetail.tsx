import { useParams, Navigate } from 'react-router-dom';
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

export default function FormationDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();
  
  const formation = slug ? getFormationBySlug(slug) : undefined;

  if (!formation) {
    return <Navigate to="/" replace />;
  }

  const handleCTAClick = () => {
    toast({
      title: "¡Próximamente!",
      description: "El formulario de reserva estará disponible pronto. Mientras tanto, contacta con nosotros por teléfono o email.",
    });
  };

  return (
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
  );
}

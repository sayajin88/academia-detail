import { useParams, Navigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { FormationHero } from '@/components/formation/FormationHero';
import { FormationContent } from '@/components/formation/FormationContent';
import { FormationModules } from '@/components/formation/FormationModules';
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
      <FormationContent formation={formation} />
      <FormationModules formation={formation} />
      <FormationIncludes formation={formation} />
      <FormationFAQ formation={formation} />
      <FormationCTA formation={formation} onCTAClick={handleCTAClick} />
    </MainLayout>
  );
}

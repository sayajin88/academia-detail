import { useParams, Navigate, useLocation } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { FormationHero } from '@/components/formation/FormationHero';
import { FormationAdvantages } from '@/components/formation/FormationAdvantages';
import { FormationLevels } from '@/components/formation/FormationLevels';
import { FormationContent } from '@/components/formation/FormationContent';
import { FormationInstructor } from '@/components/formation/FormationInstructor';
import { FormationModules } from '@/components/formation/FormationModules';
import { FormationCurriculum } from '@/components/formation/FormationCurriculum';
import { FormationReglada } from '@/components/formation/FormationReglada';
import { FormationCertification } from '@/components/formation/FormationCertification';
import { FormationIncludes } from '@/components/formation/FormationIncludes';
import { FormationFAQ } from '@/components/formation/FormationFAQ';
import { FormationROICalculator } from '@/components/formation/FormationROICalculator';
import { FormationCTA } from '@/components/formation/FormationCTA';
import { FormationVideoTestimonials } from '@/components/formation/FormationVideoTestimonials';
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

// Video testimonials by formation slug
const videoTestimonialsBySlug: Record<string, { id: string; title: string; name?: string; role?: string }[]> = {
  'curso-detailing-profesional': [
    { id: 'GWda5NH90YM', title: 'Mi experiencia en el curso de Detailing', name: 'Alumno Graduado', role: 'Detailer Profesional' },
    { id: 'iJjIZ4Ja7RA', title: 'Por qué elegí Detail Park para formarme', name: 'Alumno Graduado', role: 'Emprendedor' },
    { id: 'U1qm6XXaQaE', title: 'Lo que aprendí en la formación de Detailing', name: 'Alumno Graduado', role: 'Técnico Especializado' },
  ],
  'curso-ppf-proteccion-pintura': [
    { id: 'xvfLq467Mis', title: 'Mi experiencia en el curso de PPF', name: 'Alumno Graduado', role: 'Especialista PPF' },
  ],
  'curso-vinilado-vehiculos': [
    { id: '0b8VwDTfxe8', title: 'Mi experiencia en el curso de Car Wrapping', name: 'Alumno Graduado', role: 'Especialista Vinilado' },
  ],
};

export default function FormationDetailPage() {
  const { slug: paramSlug } = useParams<{ slug: string }>();
  const location = useLocation();
  const { toast } = useToast();
  
  // Determine slug from either URL path or route param
  const slug = pathToSlugMap[location.pathname] || paramSlug;
  
  const formation = slug ? getFormationBySlug(slug) : undefined;
  const videoTestimonials = slug ? videoTestimonialsBySlug[slug] : undefined;

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
        <FormationCurriculum formation={formation} />
        <FormationReglada formation={formation} />
        <FormationCertification formation={formation} />
        {videoTestimonials && videoTestimonials.length > 0 && (
          <FormationVideoTestimonials 
            videos={videoTestimonials}
            title="Testimonios de Nuestros Alumnos"
            subtitle="Descubre las experiencias reales de quienes ya se han formado con nosotros"
          />
        )}
        <FormationIncludes formation={formation} />
        <FormationFAQ formation={formation} />
        <FormationROICalculator formation={formation} onCTAClick={handleCTAClick} />
        <FormationCTA formation={formation} onCTAClick={handleCTAClick} />
      </MainLayout>
    </>
  );
}

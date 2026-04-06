import { useState, useEffect } from 'react';
import { useParams, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { FormationHero } from '@/components/formation/FormationHero';
import { FormationAdvantages } from '@/components/formation/FormationAdvantages';
import { FormationVideoShowcase } from '@/components/formation/FormationVideoShowcase';
import { FormationPricing } from '@/components/formation/FormationPricing';
import { FormationLevels } from '@/components/formation/FormationLevels';
import { FormationContent } from '@/components/formation/FormationContent';
import { FormationInstructor } from '@/components/formation/FormationInstructor';
import { FormationModules } from '@/components/formation/FormationModules';
import { FormationCurriculum } from '@/components/formation/FormationCurriculum';
import { FormationReglada } from '@/components/formation/FormationReglada';
import { FormationCertification } from '@/components/formation/FormationCertification';
import { FormationIncludes } from '@/components/formation/FormationIncludes';
import { FormationLogistics } from '@/components/formation/FormationLogistics';
import { FormationFAQ } from '@/components/formation/FormationFAQ';
import { GoogleReviews } from '@/components/shared/GoogleReviews';
import { FormationROICalculator } from '@/components/formation/FormationROICalculator';
import { FormationCTA } from '@/components/formation/FormationCTA';
import { JornadaZeroSection } from '@/components/shared/JornadaZeroSection';
import { FormationVideoTestimonials } from '@/components/formation/FormationVideoTestimonials';
import { FormationGallery } from '@/components/formation/FormationGallery';
import { ComingSoonModal } from '@/components/ComingSoonModal';
import { BrandLogosBar } from '@/components/shared/BrandLogosBar';
import { getFormationBySlug } from '@/data/formationDetails';

import { SEO } from '@/components/SEO';
import { seoConfig } from '@/utils/seoConfig';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';

const breadcrumbItems: Record<string, { name: string; url: string }[]> = {
  'curso-detailing-profesional': [
    { name: 'Formaciones', url: '/#formaciones' },
    { name: 'Curso Detailing Profesional', url: '/curso-detailing-profesional' },
  ],
  'curso-vinilado-vehiculos': [
    { name: 'Formaciones', url: '/#formaciones' },
    { name: 'Curso Car Wrapping', url: '/curso-vinilado-vehiculos' },
  ],
  'curso-ppf-proteccion-pintura': [
    { name: 'Formaciones', url: '/#formaciones' },
    { name: 'Curso PPF', url: '/curso-ppf-proteccion-pintura' },
  ],
  'curso-restauracion-vehiculos': [
    { name: 'Formaciones', url: '/#formaciones' },
    { name: 'Curso Restauración', url: '/curso-restauracion-vehiculos' },
  ],
};

// Video assets for detailing course (vertical 9:16 format)
import detailCursoVideo from '@/assets/detail-curso-v2.webm';
import reelFiltro from '@/assets/reel-filtro.webm';
import reelCursoDetail from '@/assets/reel-curso-detail.webm';

// Detailing course videos array
const detailingVideos = [
  { src: detailCursoVideo },
  { src: reelFiltro },
  { src: reelCursoDetail },
];

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
  const navigate = useNavigate();
  const [showComingSoonModal, setShowComingSoonModal] = useState(false);
  
  // Determine slug from either URL path or route param
  const slug = pathToSlugMap[location.pathname] || paramSlug;
  
  const formation = slug ? getFormationBySlug(slug) : undefined;
  const videoTestimonials = slug ? videoTestimonialsBySlug[slug] : undefined;

  // Show coming soon modal on mount if formation is coming soon
  useEffect(() => {
    if (formation?.comingSoon) {
      // Small delay for better UX
      const timer = setTimeout(() => {
        setShowComingSoonModal(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [formation?.comingSoon]);

  if (!formation) {
    return <Navigate to="/" replace />;
  }

  // Generate SEO config for this specific formation (pass full object + video testimonials for rich Schema.org)
  const formationSEO = seoConfig.getFormationSEO(slug!, formation, videoTestimonials);

  const handleCTAClick = () => {
    if (formation.comingSoon) {
      setShowComingSoonModal(true);
    } else {
      navigate('/contacto');
    }
  };

  return (
    <>
      <SEO {...formationSEO} />
      <MainLayout>
        {slug && breadcrumbItems[slug] && (
          <div className="container mx-auto px-4 pt-2">
            <Breadcrumbs items={breadcrumbItems[slug]} />
          </div>
        )}
        <FormationHero formation={formation} onCTAClick={handleCTAClick} />
        <FormationAdvantages formation={formation} />
        {slug === 'curso-detailing-profesional' && (
          <FormationVideoShowcase
            videos={detailingVideos}
            badge="Mira lo que aprenderás"
            title="Domina las Técnicas Profesionales"
            subtitle="de Detailing Automotriz"
            ctaText="Quiero Aprender Esto"
            onCTAClick={handleCTAClick}
          />
        )}
        <FormationPricing formation={formation} onCTAClick={handleCTAClick} />
        <FormationLevels formation={formation} onCTAClick={handleCTAClick} />
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
        {slug === 'curso-detailing-profesional' && (
          <FormationGallery 
            galleryType="detailing"
            title="Así es Nuestra Formación"
            subtitle="Imágenes reales de nuestros cursos de Detailing Profesional"
            badge="Galería"
          />
        )}
        {slug === 'curso-vinilado-vehiculos' && (
          <FormationGallery 
            galleryType="wrapping"
            title="Trabajos de Nuestros Alumnos"
            subtitle="Resultados reales de proyectos de Car Wrapping realizados durante y después de la formación"
            badge="Galería"
          />
        )}
        <FormationIncludes formation={formation} />
        <BrandLogosBar
          variant="compact"
          filter={
            slug === 'curso-detailing-profesional'
              ? 'detailing'
              : slug === 'curso-vinilado-vehiculos'
                ? 'wrapping'
                : 'all'
          }
        />
        {/* Logistics section for national/international students */}
        <FormationLogistics showForSlug={slug} />
        <GoogleReviews />
        <FormationFAQ formation={formation} />
        <FormationROICalculator formation={formation} onCTAClick={handleCTAClick} />
        {slug !== 'curso-detailing-iniciacion' && <JornadaZeroSection />}
        <FormationCTA formation={formation} onCTAClick={handleCTAClick} />
      </MainLayout>

      {/* Coming Soon Modal */}
      <ComingSoonModal
        open={showComingSoonModal}
        onOpenChange={setShowComingSoonModal}
        formationTitle={formation.title}
        formationSlug={formation.slug}
      />
    </>
  );
}

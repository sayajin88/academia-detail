import { MainLayout } from '@/components/layout/MainLayout';
import { HomeHero } from '@/components/home/HomeHero';
import { CompetitiveComparison } from '@/components/home/CompetitiveComparison';
import { BusinessSkillsSection } from '@/components/home/BusinessSkillsSection';
import { FormationsGrid } from '@/components/home/FormationsGrid';
import { CarreraNegocioSection } from '@/components/home/CarreraNegocioSection';
import { GalleryPreview } from '@/components/home/GalleryPreview';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { HomeFAQ } from '@/components/home/HomeFAQ';
import { HomeCTA } from '@/components/home/HomeCTA';
import { SEO } from '@/components/SEO';
import { seoConfig } from '@/utils/seoConfig';

export default function Home() {
  return (
    <>
      <SEO {...seoConfig.home} />
      <MainLayout>
        <HomeHero />
        <CompetitiveComparison />
        <BusinessSkillsSection />
        <FormationsGrid />
        <CarreraNegocioSection />
        <GalleryPreview />
        <TestimonialsSection />
        <HomeFAQ />
        <HomeCTA />
      </MainLayout>
    </>
  );
}
import { MainLayout } from '@/components/layout/MainLayout';
import { HomeHero } from '@/components/home/HomeHero';
import { FormationsGrid } from '@/components/home/FormationsGrid';
import { CarreraNegocioSection } from '@/components/home/CarreraNegocioSection';
import { GalleryPreview } from '@/components/home/GalleryPreview';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { HomeFAQ } from '@/components/home/HomeFAQ';
import { HomeCTA } from '@/components/home/HomeCTA';

export default function Home() {
  return (
    <MainLayout>
      <HomeHero />
      <FormationsGrid />
      <CarreraNegocioSection />
      <GalleryPreview />
      <TestimonialsSection />
      <HomeFAQ />
      <HomeCTA />
    </MainLayout>
  );
}

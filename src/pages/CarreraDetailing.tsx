import { useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import CarreraHero from '@/components/carrera/CarreraHero';
import CarreraVideoIntro from '@/components/carrera/CarreraVideoIntro';
import CarreraFormaciones from '@/components/carrera/CarreraFormaciones';
import CarreraModuloNegocio from '@/components/carrera/CarreraModuloNegocio';
import CarreraExperienciaReal from '@/components/carrera/CarreraExperienciaReal';
import CarreraROICalculator from '@/components/carrera/CarreraROICalculator';
import CarreraTimeline from '@/components/carrera/CarreraTimeline';
import CarreraBenefits from '@/components/carrera/CarreraBenefits';
import CarreraPricing from '@/components/carrera/CarreraPricing';
import CarreraFAQ from '@/components/carrera/CarreraFAQ';
import { FormationVideoTestimonials } from '@/components/formation/FormationVideoTestimonials';

import { SEO } from '@/components/SEO';
import { seoConfig } from '@/utils/seoConfig';

const carreraVideoTestimonials = [
  { id: 'GWda5NH90YM', title: 'Mi experiencia en la Carrera de Detailing', name: 'Alumno Graduado', role: 'Empresario Detailing' },
  { id: 'iJjIZ4Ja7RA', title: 'Cómo monté mi negocio tras la formación', name: 'Alumno Graduado', role: 'Emprendedor' },
  { id: 'U1qm6XXaQaE', title: 'La formación que cambió mi carrera', name: 'Alumno Graduado', role: 'Profesional Independiente' },
];

const CarreraDetailing = () => {
  const navigate = useNavigate();

  const handleCTAClick = () => {
    navigate('/contacto');
  };

  return (
    <>
      <SEO {...seoConfig.carreraDetailing} />
      <MainLayout>
        {/* Gold Premium Styles */}
        <style>{`
          .gold-gradient-text {
            background: linear-gradient(135deg, hsl(45 93% 47%), hsl(45 93% 67%), hsl(45 93% 47%));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .gold-spotlight {
            position: relative;
          }
          
          .gold-spotlight::before {
            content: '';
            position: absolute;
            inset: 0;
            background: radial-gradient(
              600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
              hsl(45 93% 47% / 0.15),
              transparent 40%
            );
            pointer-events: none;
            border-radius: inherit;
          }
          
          .gold-border-animated {
            position: absolute;
            inset: -2px;
            border-radius: inherit;
            padding: 2px;
            background: linear-gradient(
              var(--angle, 0deg),
              hsl(45 93% 47%),
              hsl(45 93% 67%),
              hsl(45 93% 37%),
              hsl(45 93% 47%)
            );
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            animation: rotate-gold-border 4s linear infinite;
            pointer-events: none;
          }
          
          @keyframes rotate-gold-border {
            to {
              --angle: 360deg;
            }
          }
          
          @property --angle {
            syntax: '<angle>';
            initial-value: 0deg;
            inherits: false;
          }
          
          .shimmer-badge-gold {
            background: linear-gradient(
              90deg,
              transparent 0%,
              hsl(45 93% 67% / 0.3) 50%,
              transparent 100%
            );
            background-size: 200% 100%;
            animation: shimmer-gold 2s infinite;
          }
          
          @keyframes shimmer-gold {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `}</style>
        
        <CarreraHero onCTAClick={handleCTAClick} />
        <CarreraVideoIntro />
        <CarreraFormaciones />
        <CarreraModuloNegocio />
        <CarreraExperienciaReal />
        <FormationVideoTestimonials 
          videos={carreraVideoTestimonials}
          title="Lo Que Dicen Nuestros Alumnos"
          subtitle="Testimonios reales de profesionales que han transformado su carrera con nuestra formación"
        />
        <CarreraTimeline />
        <CarreraBenefits />
        <CarreraROICalculator onCtaClick={handleCTAClick} />
        <CarreraPricing onCTAClick={handleCTAClick} />
        <CarreraFAQ />

      </MainLayout>
    </>
  );
};

export default CarreraDetailing;

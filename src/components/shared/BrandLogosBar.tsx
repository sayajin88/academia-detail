import { SectionHeading } from '@/components/shared/SectionHeading';
import { AnimatedSection } from '@/components/shared/AnimatedSection';

// Brand logos
import logo3m from '@/assets/brands/3m.png';
import logoAvery from '@/assets/brands/avery-dennison.png';
import logoChemicalGuys from '@/assets/brands/chemical-guys.png';
import logoFlex from '@/assets/brands/flex.png';
import logoGtechniq from '@/assets/brands/gtechniq.png';
import logoGyeon from '@/assets/brands/gyeon.png';
import logoHexis from '@/assets/brands/hexis.png';
import logoMeguiars from '@/assets/brands/meguiars.png';
import logoMenzerna from '@/assets/brands/menzerna.png';
import logoRupes from '@/assets/brands/rupes.png';

interface Brand {
  name: string;
  logo: string;
  categories: ('detailing' | 'wrapping')[];
}

const brands: Brand[] = [
  { name: '3M', logo: logo3m, categories: ['detailing', 'wrapping'] },
  { name: 'Avery Dennison', logo: logoAvery, categories: ['wrapping'] },
  { name: 'Chemical Guys', logo: logoChemicalGuys, categories: ['detailing'] },
  { name: 'Flex', logo: logoFlex, categories: ['detailing'] },
  { name: 'Gtechniq', logo: logoGtechniq, categories: ['detailing'] },
  { name: 'Gyeon', logo: logoGyeon, categories: ['detailing'] },
  { name: 'Hexis', logo: logoHexis, categories: ['wrapping'] },
  { name: "Meguiar's", logo: logoMeguiars, categories: ['detailing'] },
  { name: 'Menzerna', logo: logoMenzerna, categories: ['detailing'] },
  { name: 'Rupes', logo: logoRupes, categories: ['detailing'] },
];

interface BrandLogosBarProps {
  variant?: 'full' | 'compact';
  filter?: 'all' | 'detailing' | 'wrapping';
  className?: string;
}

export function BrandLogosBar({
  variant = 'full',
  filter = 'all',
  className = '',
}: BrandLogosBarProps) {
  const filteredBrands =
    filter === 'all'
      ? brands
      : brands.filter((b) => b.categories.includes(filter));

  // Duplicate for infinite scroll effect
  const scrollBrands = [...filteredBrands, ...filteredBrands];

  // Calculate animation duration based on number of brands
  const duration = filteredBrands.length * 3;

  return (
    <section
      className={`py-12 md:py-16 bg-card/50 overflow-hidden ${className}`}
    >
      <style>{`
        @keyframes brand-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <div className="container mx-auto px-4">
        {variant === 'full' && (
          <AnimatedSection>
            <SectionHeading
              badge="Marcas Colaboradoras"
              title="Trabajamos con las Mejores Marcas"
              subtitle="Formación 100% independiente: enseñamos con productos de las marcas líderes del sector sin estar vinculados a ninguna"
            />
          </AnimatedSection>
        )}

        {variant === 'compact' && (
          <AnimatedSection>
            <p className="text-center text-sm text-muted-foreground uppercase tracking-wider font-semibold mb-6">
              Marcas con las que trabajamos
            </p>
          </AnimatedSection>
        )}
      </div>

      {/* Infinite scroll logos */}
      <div className="relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-card/50 to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-card/50 to-transparent z-10 pointer-events-none" />

        <div
          className="flex items-center gap-10 md:gap-16 w-max"
          style={{
            animation: `brand-scroll ${duration}s linear infinite`,
          }}
        >
          {scrollBrands.map((brand, index) => (
            <div
              key={`${brand.name}-${index}`}
              className="flex-shrink-0 flex items-center justify-center"
            >
              <img
                src={brand.logo}
                alt={`Logo de ${brand.name} - marca profesional de detailing y car care`}
                className="h-8 md:h-12 w-auto brightness-0 invert opacity-50 hover:opacity-100 transition-opacity duration-300"
                loading="lazy"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

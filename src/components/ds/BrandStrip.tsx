import logo3m from '@/assets/brands/white/3m.webp';
import logoAvery from '@/assets/brands/white/avery-dennison.webp';
import logoCarcare from '@/assets/brands/white/carcare-passion.webp';
import logoChemicalGuys from '@/assets/brands/white/chemical-guys.webp';
import logoFlex from '@/assets/brands/white/flex.webp';
import logoGtechniq from '@/assets/brands/white/gtechniq.webp';
import logoGyeon from '@/assets/brands/white/gyeon.webp';
import logoHexis from '@/assets/brands/white/hexis.webp';
import logoMeguiars from '@/assets/brands/white/meguiars.webp';
import logoMenzerna from '@/assets/brands/white/menzerna.webp';
import logoRupes from '@/assets/brands/white/rupes.webp';

export type BrandGroup = 'all' | 'detailing' | 'wrapping' | 'ppf';

// w/h: tamaño real del archivo (alto 96 px) para reservar el hueco
const brands: { name: string; src: string; w: number; square?: boolean; groups: string[] }[] = [
  { name: 'Rupes', src: logoRupes, w: 433, groups: ['detailing'] },
  { name: 'Menzerna', src: logoMenzerna, w: 419, groups: ['detailing'] },
  { name: 'Gyeon', src: logoGyeon, w: 96, square: true, groups: ['detailing', 'ppf'] },
  { name: 'Gtechniq', src: logoGtechniq, w: 463, groups: ['detailing'] },
  { name: 'Flex', src: logoFlex, w: 317, groups: ['detailing'] },
  { name: "Meguiar's", src: logoMeguiars, w: 160, groups: ['detailing'] },
  { name: 'Chemical Guys', src: logoChemicalGuys, w: 96, square: true, groups: ['detailing'] },
  { name: 'Car Care Passion', src: logoCarcare, w: 208, groups: ['detailing', 'wrapping', 'ppf'] },
  { name: '3M', src: logo3m, w: 184, groups: ['wrapping', 'ppf'] },
  { name: 'Avery Dennison', src: logoAvery, w: 294, groups: ['wrapping', 'ppf'] },
  { name: 'Hexis', src: logoHexis, w: 236, groups: ['wrapping', 'ppf'] },
];

interface BrandStripProps {
  group?: BrandGroup;
  title?: string;
}

/** Logos de marcas con las que se trabaja (en blanco, sin filtros CSS). */
export function BrandStrip({ group = 'all', title = 'Trabajamos con productos de las marcas líderes, sin estar vinculados a ninguna' }: BrandStripProps) {
  const list = group === "all" ? brands : brands.filter((b) => b.groups.includes(group));
  // Carrusel continuo: la lista va duplicada para que el bucle no tenga salto.
  const loop = [...list, ...list];
  return (
    <section className="border-y border-white/[0.06] bg-background py-10 md:py-12" aria-label="Marcas con las que trabajamos">
      <p className="ds-container mb-8 text-center text-sm text-muted-foreground">{title}</p>
      <div
        className="relative overflow-hidden"
        style={{
          maskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
        }}
      >
        <ul className="ds-marquee flex w-max items-center gap-14 md:gap-20">
          {loop.map((b, i) => (
            <li key={b.name + i} aria-hidden={i >= list.length}>
              <img
                src={b.src}
                alt={i < list.length ? b.name : ""}
                width={b.w}
                height={96}
                loading="lazy"
                decoding="async"
                className={b.square ? "h-11 w-auto opacity-60 transition-opacity hover:opacity-100 md:h-14" : "h-7 w-auto opacity-60 transition-opacity hover:opacity-100 md:h-9"}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

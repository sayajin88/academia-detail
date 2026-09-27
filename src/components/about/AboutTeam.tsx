import { Instagram } from 'lucide-react';
import { Section, SectionHeader } from '@/components/ds/Section';
import { Img } from '@/components/ds/Img';
import { SITE } from '@/data/site';
import danielImg from '@/assets/daniel-lopez-team.jpg?w=240;400&format=webp&as=picture';
// La foto original lleva la orientación en EXIF (8): se gira aquí para que salga derecha.
import sergioImg from '@/assets/sergio-felipe.jpg?rotate=270&w=240;400&format=webp&as=picture';

interface Member {
  name: string;
  role: string;
  picture: ImagetoolsPicture;
  alt: string;
  text: string;
  instagram?: { label: string; href: string };
}

const team: Member[] = [
  {
    name: SITE.founder,
    role: `${SITE.founderRole} · más de ${SITE.founderYears} años en el detailing profesional`,
    picture: danielImg,
    alt: `${SITE.founder}, fundador de Detail Park y formador de Academia Detail`,
    text: 'Dirige Detail Park y da los cursos en persona. Todo lo que enseña es lo que se hace en el taller: técnica, producto y también cómo presupuestar y organizar el trabajo.',
    instagram: SITE.instagram[1],
  },
  {
    name: 'Sergio Felipe',
    role: 'Formador y gestor de centro',
    picture: sergioImg,
    alt: 'Sergio Felipe, formador y gestor de centro en Detail Park',
    text: 'Conoce a fondo la metodología de un centro de detailing y todas sus áreas, desde la operativa diaria del taller hasta la atención al cliente.',
  },
];

export function AboutTeam() {
  return (
    <Section aria-labelledby="equipo-title">
      <SectionHeader
        id="equipo-title"
        eyebrow="El equipo"
        title="Quién te va a formar"
        lead="El equipo de Detail Park que imparte los cursos y resuelve tus dudas."
      />
      <ul className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
        {team.map((m) => (
          <li key={m.name} className="ds-card grid grid-cols-[112px_1fr] gap-4 p-4 sm:grid-cols-[160px_1fr] sm:gap-5 sm:p-5">
            <div className="overflow-hidden rounded-lg">
              <Img picture={m.picture} alt={m.alt} sizes="160px" className="aspect-[4/5] h-full object-top" />
            </div>
            <div className="flex min-w-0 flex-col gap-2">
              <h3 className="ds-h3 font-bold text-foreground">{m.name}</h3>
              <p className="text-sm font-semibold leading-snug text-brand">{m.role}</p>
              <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">{m.text}</p>
              {m.instagram && (
                <a
                  href={m.instagram.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-1.5 pt-1 text-sm text-muted-foreground hover:text-foreground"
                >
                  <Instagram className="h-4 w-4" aria-hidden="true" />
                  {m.instagram.label}
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

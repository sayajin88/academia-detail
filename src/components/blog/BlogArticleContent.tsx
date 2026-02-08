import { Link } from 'react-router-dom';
import { BlogSection, BlogLink } from '@/data/blogPosts';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { ReactNode } from 'react';

interface BlogArticleContentProps {
  sections: BlogSection[];
}

function renderContentWithLinks(content: string, links?: BlogLink[]): ReactNode[] {
  if (!links || links.length === 0) {
    return [content];
  }

  const parts: ReactNode[] = [];
  let remaining = content;
  let keyCounter = 0;

  while (remaining.length > 0) {
    // Find the earliest [[marker]] in the remaining text
    const markerStart = remaining.indexOf('[[');
    if (markerStart === -1) {
      parts.push(remaining);
      break;
    }

    const markerEnd = remaining.indexOf(']]', markerStart);
    if (markerEnd === -1) {
      parts.push(remaining);
      break;
    }

    // Add text before the marker
    if (markerStart > 0) {
      parts.push(remaining.substring(0, markerStart));
    }

    // Extract the marker text
    const markerText = remaining.substring(markerStart + 2, markerEnd);

    // Find the matching link
    const matchingLink = links.find(
      (link) => link.text.toLowerCase() === markerText.toLowerCase()
    );

    if (matchingLink) {
      const linkKey = `link-${keyCounter++}`;
      const isExternal = matchingLink.external === true;
      const relAttr = matchingLink.rel === 'nofollow'
        ? 'noopener noreferrer nofollow'
        : isExternal
          ? 'noopener noreferrer'
          : undefined;

      if (isExternal) {
        parts.push(
          <a
            key={linkKey}
            href={matchingLink.href}
            target="_blank"
            rel={relAttr}
            className="text-primary underline decoration-primary/30 hover:decoration-primary transition-colors font-medium"
          >
            {markerText}
          </a>
        );
      } else {
        parts.push(
          <Link
            key={linkKey}
            to={matchingLink.href}
            className="text-primary underline decoration-primary/30 hover:decoration-primary transition-colors font-medium"
            {...(relAttr ? { rel: relAttr } : {})}
          >
            {markerText}
          </Link>
        );
      }
    } else {
      // No matching link found, just render the text without brackets
      parts.push(markerText);
    }

    remaining = remaining.substring(markerEnd + 2);
  }

  return parts;
}

export function BlogArticleContent({ sections }: BlogArticleContentProps) {
  return (
    <div className="max-w-[720px]">
      {sections.map((section, index) => (
        <AnimatedSection key={section.id} animation="fade-up" stagger={index * 80} duration="fast">
          <section id={section.id} className={index > 0 ? 'mt-10' : ''}>
            {/* Decorative separator between sections */}
            {index > 0 && (
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px flex-1 bg-gradient-to-r from-primary/40 via-primary/20 to-transparent" />
                <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                <div className="h-px flex-1 bg-gradient-to-l from-primary/40 via-primary/20 to-transparent" />
              </div>
            )}

            <h2
              className="text-xl md:text-2xl font-bold text-foreground mb-4 scroll-mt-24"
              style={{ fontFamily: "'Open Sans', sans-serif", textTransform: 'none', letterSpacing: 'normal' }}
            >
              {section.title}
            </h2>
            <div className="space-y-4">
              {section.content.split('\n\n').map((paragraph, i) => (
                <p
                  key={i}
                  className={`text-base md:text-lg text-muted-foreground leading-[1.8] ${
                    i === 0 ? 'first-letter:text-3xl first-letter:font-bold first-letter:text-primary first-letter:float-left first-letter:mr-1.5 first-letter:mt-0.5 first-letter:leading-none' : ''
                  }`}
                  style={{ fontFamily: "'Open Sans', sans-serif" }}
                >
                  {renderContentWithLinks(paragraph, section.links)}
                </p>
              ))}
            </div>
          </section>
        </AnimatedSection>
      ))}
    </div>
  );
}

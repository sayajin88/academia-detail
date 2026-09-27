import { Link } from 'react-router-dom';
import { BlogSection, BlogLink } from '@/data/blogPosts';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { ReactNode } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

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

    if (markerStart > 0) {
      parts.push(remaining.substring(0, markerStart));
    }

    const markerText = remaining.substring(markerStart + 2, markerEnd);

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
            className="text-brand underline decoration-primary/30 hover:decoration-primary transition-colors font-medium"
          >
            {markerText}
          </a>
        );
      } else {
        parts.push(
          <Link
            key={linkKey}
            to={matchingLink.href}
            className="text-brand underline decoration-primary/30 hover:decoration-primary transition-colors font-medium"
            {...(relAttr ? { rel: relAttr } : {})}
          >
            {markerText}
          </Link>
        );
      }
    } else {
      parts.push(markerText);
    }

    remaining = remaining.substring(markerEnd + 2);
  }

  return parts;
}

function BlogDataTable({ table }: { table: NonNullable<BlogSection['table']> }) {
  const isLastRow = (index: number) => index === table.rows.length - 1;
  const lastRowIsTotal = table.rows.length > 0 && table.rows[table.rows.length - 1][0]?.toUpperCase().includes('TOTAL');

  return (
    <div className="my-6 rounded-lg border border-border/60 bg-muted/20 overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          {table.caption && (
            <TableCaption className="pb-3 text-xs text-muted-foreground/70">
              {table.caption}
            </TableCaption>
          )}
          <TableHeader>
            <TableRow className="border-border/40 hover:bg-transparent">
              {table.headers.map((header, i) => (
                <TableHead
                  key={i}
                  className="text-xs md:text-sm font-semibold text-brand/90 bg-primary/5 whitespace-nowrap"
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {table.rows.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                className={`border-border/30 ${
                  isLastRow(rowIndex) && lastRowIsTotal
                    ? 'bg-primary/10 font-bold border-t-2 border-t-primary/30'
                    : rowIndex % 2 === 0
                      ? 'bg-transparent'
                      : 'bg-muted/10'
                }`}
              >
                {row.map((cell, cellIndex) => (
                  <TableCell
                    key={cellIndex}
                    className={`text-xs md:text-sm py-3 whitespace-nowrap ${
                      cellIndex === 0
                        ? 'font-medium text-foreground/90'
                        : 'text-muted-foreground'
                    } ${
                      isLastRow(rowIndex) && lastRowIsTotal
                        ? 'text-foreground'
                        : ''
                    }`}
                  >
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
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
              className="text-xl md:text-2xl font-bold text-foreground mb-4 scroll-mt-24 flex items-baseline gap-2"
              style={{ fontFamily: "'Open Sans', sans-serif", textTransform: 'none', letterSpacing: 'normal' }}
            >
              <span className="text-brand font-bold text-lg md:text-xl shrink-0">
                {String(index + 1).padStart(2, '0')}.
              </span>
              {section.title}
            </h2>
            <div className="space-y-4">
              {section.content.split('\n\n').map((paragraph, i) => (
                <p
                  key={i}
                  className={`text-base md:text-lg text-muted-foreground leading-[1.8] ${
                    i === 0 ? 'first-letter:text-3xl first-letter:font-bold first-letter:text-brand first-letter:float-left first-letter:mr-1.5 first-letter:mt-0.5 first-letter:leading-none' : ''
                  }`}
                  style={{ fontFamily: "'Open Sans', sans-serif" }}
                >
                  {renderContentWithLinks(paragraph, section.links)}
                </p>
              ))}
            </div>

            {/* Render table if present */}
            {section.table && <BlogDataTable table={section.table} />}
          </section>
        </AnimatedSection>
      ))}
    </div>
  );
}

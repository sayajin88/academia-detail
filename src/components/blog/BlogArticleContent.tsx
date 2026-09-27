import { Fragment, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { BlogLink, BlogSection, BlogTable } from '@/data/blogPosts';
import { cn } from '@/lib/utils';

interface BlogArticleContentProps {
  sections: BlogSection[];
  /** Anclas de cada sección (las mismas que usa el índice) */
  anchors: string[];
}

const linkClass = 'font-semibold text-brand underline decoration-brand/50 underline-offset-4 transition-colors hover:decoration-brand';

function renderLink(text: string, href: string, key: string, opts: { external?: boolean; nofollow?: boolean } = {}) {
  const external = opts.external || /^https?:\/\//.test(href);
  if (external) {
    const rel = ['noopener', 'noreferrer', opts.nofollow ? 'nofollow' : ''].filter(Boolean).join(' ');
    return (
      <a key={key} href={href} target="_blank" rel={rel} className={linkClass}>
        {text}
      </a>
    );
  }
  return (
    <Link key={key} to={href} className={linkClass} {...(opts.nofollow ? { rel: 'nofollow' } : {})}>
      {text}
    </Link>
  );
}

/**
 * Texto con formato mínimo del editor: [[enlace]] (con `links`), [texto](url) y **negrita**.
 */
function renderInline(text: string, links: BlogLink[] | undefined, keyPrefix: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const pattern = /\[\[([^\]]+)\]\]|\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g;
  let last = 0;
  let i = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text))) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    const key = `${keyPrefix}-${i++}`;
    if (match[1] !== undefined) {
      const marker = match[1];
      const link = links?.find((l) => l.text.toLowerCase() === marker.toLowerCase());
      parts.push(link ? renderLink(marker, link.href, key, { external: link.external, nofollow: link.rel === 'nofollow' }) : marker);
    } else if (match[2] !== undefined) {
      parts.push(renderLink(match[2], match[3], key));
    } else {
      parts.push(
        <strong key={key} className="font-semibold text-foreground">
          {renderInline(match[4], links, key)}
        </strong>,
      );
    }
    last = pattern.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

type Block =
  | { type: 'p'; text: string }
  | { type: 'ul' | 'ol'; items: string[] }
  | { type: 'h3'; text: string };

const UL = /^\s*[-*•]\s+/;
const OL = /^\s*\d+[.)]\s+/;

/** Convierte el texto de una sección en párrafos, listas y subtítulos. */
function parseBlocks(content: string): Block[] {
  const blocks: Block[] = [];
  for (const chunk of content.split(/\n{2,}/)) {
    let para: string[] = [];
    const flush = () => {
      if (para.length) blocks.push({ type: 'p', text: para.join(' ') });
      para = [];
    };
    for (const raw of chunk.split('\n')) {
      const line = raw.trim();
      if (!line) continue;
      const listType = UL.test(line) ? 'ul' : OL.test(line) ? 'ol' : null;
      if (listType) {
        flush();
        const item = line.replace(listType === 'ul' ? UL : OL, '');
        const prev = blocks[blocks.length - 1];
        if (prev && prev.type === listType) prev.items.push(item);
        else blocks.push({ type: listType, items: [item] });
      } else if (/^#{2,4}\s+/.test(line)) {
        flush();
        blocks.push({ type: 'h3', text: line.replace(/^#{2,4}\s+/, '') });
      } else {
        para.push(line);
      }
    }
    flush();
  }
  return blocks;
}

/**
 * La tabla va detrás del primer párrafo que la presenta («…a continuación:»);
 * si no hay ninguno, al final de la sección.
 */
function tableIndex(blocks: Block[]): number {
  const i = blocks.findIndex(
    (b, idx) => b.type === 'p' && b.text.trim().endsWith(':') && !['ul', 'ol'].includes(blocks[idx + 1]?.type ?? ''),
  );
  return i === -1 ? blocks.length - 1 : i;
}

function ArticleTable({ table }: { table: BlogTable }) {
  const lastIsTotal = table.rows.length > 1 && /total/i.test(table.rows[table.rows.length - 1][0] ?? '');
  return (
    <figure className="my-8">
      <div className="overflow-x-auto rounded-xl border border-border" tabIndex={0} role="region" aria-label={table.caption ?? 'Tabla'}>
        <table className={cn('w-full border-collapse text-left text-[0.9375rem] leading-snug', table.headers.length > 3 && 'min-w-[34rem]')}>
          <thead className="bg-card">
            <tr>
              {table.headers.map((h, i) => (
                <th key={i} scope="col" className="border-b border-border px-4 py-3 align-bottom font-semibold text-foreground">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, r) => {
              const total = lastIsTotal && r === table.rows.length - 1;
              return (
                <tr key={r} className={cn('border-b border-border last:border-0', total && 'bg-primary/15')}>
                  {row.map((cell, c) => (
                    <td
                      key={c}
                      className={cn(
                        'px-4 py-3 align-top',
                        c === 0 || total ? 'font-semibold text-foreground' : 'text-muted-foreground',
                      )}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {table.caption && <figcaption className="mt-2 text-sm text-muted-foreground">{table.caption}</figcaption>}
      {table.headers.length > 3 && (
        <p className="mt-1 text-sm text-muted-foreground sm:hidden" aria-hidden="true">
          Desliza la tabla para ver todas las columnas →
        </p>
      )}
    </figure>
  );
}

function renderBlock(block: Block, links: BlogLink[] | undefined, key: string) {
  switch (block.type) {
    case 'ul':
    case 'ol': {
      const Tag = block.type;
      return (
        <Tag key={key} className={cn('my-5 space-y-2 pl-6 marker:text-brand', Tag === 'ul' ? 'list-disc' : 'list-decimal')}>
          {block.items.map((item, i) => (
            <li key={i} className="pl-1">
              {renderInline(item, links, `${key}-${i}`)}
            </li>
          ))}
        </Tag>
      );
    }
    case 'h3':
      return (
        <h3 key={key} className="mb-3 mt-8 text-xl font-bold text-foreground">
          {renderInline(block.text, links, key)}
        </h3>
      );
    default:
      return (
        <p key={key} className="my-5">
          {renderInline(block.text, links, key)}
        </p>
      );
  }
}

/** Cuerpo del artículo: columna de ~66 caracteres, 17-18 px e interlineado cómodo. */
export function BlogArticleContent({ sections, anchors }: BlogArticleContentProps) {
  return (
    <div className="max-w-[68ch] text-[1.0625rem] leading-[1.75] text-foreground/85 md:text-lg">
      {sections.map((section, index) => {
        const blocks = parseBlocks(section.content || '');
        const tableAt = section.table ? tableIndex(blocks) : -2;
        return (
          <section key={anchors[index]} id={anchors[index]} className="scroll-mt-24" aria-labelledby={`${anchors[index]}-title`}>
            <h2
              id={`${anchors[index]}-title`}
              className={cn('mb-2 text-[1.75rem] leading-[1.1] text-foreground md:text-[2rem]', index === 0 ? 'mt-0' : 'mt-12')}
            >
              {section.title}
            </h2>
            {blocks.map((block, i) => (
              <Fragment key={i}>
                {renderBlock(block, section.links, `${index}-${i}`)}
                {i === tableAt && section.table && <ArticleTable table={section.table} />}
              </Fragment>
            ))}
            {blocks.length === 0 && section.table && <ArticleTable table={section.table} />}
          </section>
        );
      })}
    </div>
  );
}

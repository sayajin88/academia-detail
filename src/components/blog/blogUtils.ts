import type { BlogPost, BlogSection } from '@/data/blogPosts';

/**
 * Las entradas de la base de datos usan más categorías que las del tipo
 * `BlogCategory` (negocio, formacion, tecnicas…). Aquí se agrupan en las que
 * se muestran en el blog.
 */
const CATEGORY_GROUP: Record<string, string> = {
  detailing: 'detailing',
  tecnicas: 'detailing',
  ppf: 'ppf',
  wrapping: 'wrapping',
  negocios: 'negocios',
  negocio: 'negocios',
  formacion: 'formacion',
};

export const BLOG_CATEGORY_LABELS: Record<string, string> = {
  detailing: 'Detailing',
  ppf: 'PPF',
  wrapping: 'Wrapping',
  negocios: 'Negocio',
  formacion: 'Formación',
};

export const BLOG_CATEGORY_ORDER = ['detailing', 'ppf', 'wrapping', 'negocios', 'formacion'];

export const normalizeCategory = (category: string) => CATEGORY_GROUP[category] ?? category;

export const categoryLabel = (category: string) => BLOG_CATEGORY_LABELS[normalizeCategory(category)] ?? category;

export const formatPostDate = (date: string, month: 'long' | 'short' = 'long') =>
  new Date(date).toLocaleDateString('es-ES', { day: 'numeric', month, year: 'numeric' });

const slugify = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);

/** Ancla de cada sección (las entradas nuevas no traen `id`). Siempre únicas. */
export function getSectionAnchors(sections: BlogSection[]): string[] {
  const seen = new Set<string>();
  return sections.map((s, i) => {
    let id = s.id || slugify(s.title) || `seccion-${i + 1}`;
    if (seen.has(id)) id = `${id}-${i + 1}`;
    seen.add(id);
    return id;
  });
}

/**
 * Artículos relacionados: primero los indicados en la entrada (si existen),
 * luego los de la misma categoría y, por último, los más recientes.
 */
export function pickRelatedPosts(post: BlogPost, all: BlogPost[], count = 3): BlogPost[] {
  const others = all.filter((p) => p.slug !== post.slug);
  const bySlug = new Map(others.map((p) => [p.slug, p]));
  const result: BlogPost[] = [];
  const add = (p?: BlogPost) => {
    if (p && result.length < count && !result.some((r) => r.slug === p.slug)) result.push(p);
  };
  post.relatedSlugs.forEach((s) => add(bySlug.get(s)));
  const group = normalizeCategory(post.category);
  others.filter((p) => normalizeCategory(p.category) === group).forEach(add);
  others.forEach(add);
  return result;
}

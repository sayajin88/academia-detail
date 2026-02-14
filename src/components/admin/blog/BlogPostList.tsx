import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Pencil, Trash2, Eye, EyeOff, Upload } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { blogPosts as allStaticPosts, type BlogPost } from '@/data/blogPosts';

interface BlogPostRow {
  id: string;
  slug: string;
  title: string;
  category: string;
  status: string;
  published_at: string;
  seo_score: number | null;
  featured: boolean;
}

interface Props {
  onEdit: (id: string) => void;
  onNew: () => void;
}

// Deterministic SEO scoring function
function calculateSeoScore(post: BlogPost): number {
  let score = 0;

  // Title contains a keyword from tags (10)
  const titleLower = post.title.toLowerCase();
  if (post.tags.some(tag => titleLower.includes(tag.toLowerCase()))) score += 10;

  // Excerpt optimal length 120-160 chars (10)
  if (post.excerpt.length >= 120 && post.excerpt.length <= 160) score += 10;
  else if (post.excerpt.length >= 80 && post.excerpt.length <= 200) score += 5;

  // At least 4 sections (10)
  if (post.sections.length >= 4) score += 10;

  // At least 5 tags (10)
  if (post.tags.length >= 5) score += 10;

  // Sections have internal links (15)
  const hasLinks = post.sections.some(s => s.links && s.links.length > 0);
  if (hasLinks) score += 15;

  // At least one section has a table (10)
  const hasTable = post.sections.some(s => s.table);
  if (hasTable) score += 10;

  // Title < 65 characters (5)
  if (post.title.length < 65) score += 5;

  // Excerpt not empty (5)
  if (post.excerpt.length > 0) score += 5;

  // Has related slugs (10)
  if (post.relatedSlugs && post.relatedSlugs.length > 0) score += 10;

  // Image alt descriptive (> 20 chars) (5)
  if (post.imageAlt && post.imageAlt.length > 20) score += 5;

  // Total word count > 1500 (10)
  const totalWords = post.sections.reduce((acc, s) => acc + s.content.split(/\s+/).length, 0);
  if (totalWords > 1500) score += 10;

  return Math.min(score, 100);
}

export function BlogPostList({ onEdit, onNew }: Props) {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [importing, setImporting] = useState(false);
  const queryClient = useQueryClient();

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['admin-blog-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, slug, title, category, status, published_at, seo_score, featured')
        .order('updated_at', { ascending: false });
      if (error) throw error;
      return (data || []) as BlogPostRow[];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('blog_posts').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
      toast({ title: 'Artículo eliminado' });
    },
  });

  const toggleStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const newStatus = status === 'published' ? 'draft' : 'published';
      const { error } = await supabase.from('blog_posts').update({ status: newStatus }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
      toast({ title: 'Estado actualizado' });
    },
  });

  const handleImportStaticPosts = async () => {
    setImporting(true);
    try {
      // Map static posts to DB rows
      const dbRows = allStaticPosts.map(post => ({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        category: post.category,
        author_name: post.author.name,
        author_role: post.author.role,
        author_image: null as string | null,
        published_at: post.publishedAt,
        reading_time: post.readingTime,
        image_url: null as string | null,
        image_alt: post.imageAlt,
        featured: post.featured,
        tags: post.tags,
        sections: post.sections as any,
        related_slugs: post.relatedSlugs,
        status: 'published' as const,
        seo_score: calculateSeoScore(post),
      }));

      const { error } = await supabase
        .from('blog_posts')
        .upsert(dbRows, { onConflict: 'slug' });

      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
      toast({ title: `${dbRows.length} artículos importados correctamente`, description: 'Todos los artículos estáticos están ahora en la base de datos.' });
    } catch (err: any) {
      toast({ title: 'Error al importar', description: err.message, variant: 'destructive' });
    } finally {
      setImporting(false);
    }
  };

  const filtered = posts.filter(p => {
    if (filterStatus !== 'all' && p.status !== filterStatus) return false;
    if (filterCategory !== 'all' && p.category !== filterCategory) return false;
    return true;
  });

  const statusColor = (s: string) => s === 'published' ? 'default' : 'secondary';
  const categoryLabel: Record<string, string> = { detailing: 'Detailing', ppf: 'PPF', wrapping: 'Wrapping', negocios: 'Negocios' };
  const showImportButton = !isLoading && posts.length === 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Artículos del Blog</h2>
        <div className="flex gap-2">
          {showImportButton && (
            <Button onClick={handleImportStaticPosts} size="sm" variant="outline" disabled={importing}>
              <Upload className="h-4 w-4 mr-1" />
              {importing ? 'Importando...' : 'Importar artículos estáticos'}
            </Button>
          )}
          <Button onClick={onNew} size="sm"><Plus className="h-4 w-4 mr-1" /> Nuevo artículo</Button>
        </div>
      </div>

      <div className="flex gap-3">
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-40"><SelectValue placeholder="Estado" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="draft">Borrador</SelectItem>
            <SelectItem value="published">Publicado</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-40"><SelectValue placeholder="Categoría" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="detailing">Detailing</SelectItem>
            <SelectItem value="ppf">PPF</SelectItem>
            <SelectItem value="wrapping">Wrapping</SelectItem>
            <SelectItem value="negocios">Negocios</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>SEO</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(post => (
              <TableRow key={post.id}>
                <TableCell className="font-medium max-w-xs truncate">
                  {post.featured && <span className="text-yellow-500 mr-1">★</span>}
                  {post.title}
                </TableCell>
                <TableCell><Badge variant="outline">{categoryLabel[post.category] || post.category}</Badge></TableCell>
                <TableCell><Badge variant={statusColor(post.status)}>{post.status === 'published' ? 'Publicado' : 'Borrador'}</Badge></TableCell>
                <TableCell className="text-sm text-muted-foreground">{post.published_at}</TableCell>
                <TableCell>{post.seo_score != null ? <span className={post.seo_score >= 70 ? 'text-green-500 font-semibold' : post.seo_score >= 40 ? 'text-yellow-500 font-semibold' : 'text-red-500 font-semibold'}>{post.seo_score}</span> : '—'}</TableCell>
                <TableCell className="text-right space-x-1">
                  <Button variant="ghost" size="icon" onClick={() => onEdit(post.id)}><Pencil className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => toggleStatusMutation.mutate({ id: post.id, status: post.status })}>
                    {post.status === 'published' ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => { if (confirm('¿Eliminar este artículo?')) deleteMutation.mutate(post.id); }}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No hay artículos</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

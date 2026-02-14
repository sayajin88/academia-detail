import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

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

export function BlogPostList({ onEdit, onNew }: Props) {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
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

  const filtered = posts.filter(p => {
    if (filterStatus !== 'all' && p.status !== filterStatus) return false;
    if (filterCategory !== 'all' && p.category !== filterCategory) return false;
    return true;
  });

  const statusColor = (s: string) => s === 'published' ? 'default' : 'secondary';
  const categoryLabel: Record<string, string> = { detailing: 'Detailing', ppf: 'PPF', wrapping: 'Wrapping', negocios: 'Negocios' };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Artículos del Blog</h2>
        <Button onClick={onNew} size="sm"><Plus className="h-4 w-4 mr-1" /> Nuevo artículo</Button>
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
                <TableCell>{post.seo_score != null ? <span className={post.seo_score >= 70 ? 'text-green-500' : post.seo_score >= 40 ? 'text-yellow-500' : 'text-red-500'}>{post.seo_score}</span> : '—'}</TableCell>
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

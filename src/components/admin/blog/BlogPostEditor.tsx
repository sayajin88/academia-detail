import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { BlogSectionEditor, SectionData } from './BlogSectionEditor';
import { BlogSEOPanel } from './BlogSEOPanel';
import { BlogReadabilityPanel } from './BlogReadabilityPanel';
import { BlogMediaPanel } from './BlogMediaPanel';
import { BlogFactCheckPanel } from './BlogFactCheckPanel';
import { BlogPublishPanel } from './BlogPublishPanel';
import { ArrowLeft, Plus, Sparkles, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Props {
  postId: string | null; // null = new post
  onBack: () => void;
}

interface PostData {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author_name: string;
  author_role: string;
  author_image: string;
  published_at: string;
  reading_time: string;
  image_url: string;
  image_alt: string;
  featured: boolean;
  tags: string[];
  sections: SectionData[];
  related_slugs: string[];
  status: string;
  seo_score: number | null;
  readability_score: number | null;
}

const emptyPost: PostData = {
  title: '',
  slug: '',
  excerpt: '',
  category: 'detailing',
  author_name: 'Daniel López',
  author_role: 'CEO y Formador Principal',
  author_image: '',
  published_at: new Date().toISOString().split('T')[0],
  reading_time: '5 min',
  image_url: '',
  image_alt: '',
  featured: false,
  tags: [],
  sections: [],
  related_slugs: [],
  status: 'draft',
  seo_score: null,
  readability_score: null,
};

export function BlogPostEditor({ postId, onBack }: Props) {
  const [post, setPost] = useState<PostData>(emptyPost);
  const [tagInput, setTagInput] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const queryClient = useQueryClient();

  // Load existing post
  const { isLoading } = useQuery({
    queryKey: ['admin-blog-post', postId],
    queryFn: async () => {
      if (!postId) return null;
      const { data, error } = await supabase.from('blog_posts').select('*').eq('id', postId).single();
      if (error) throw error;
      return data;
    },
    enabled: !!postId,
  });

  useEffect(() => {
    if (postId) {
      // Refetch and set
      supabase.from('blog_posts').select('*').eq('id', postId).single().then(({ data }) => {
        if (data) {
          setPost({
            title: data.title,
            slug: data.slug,
            excerpt: data.excerpt || '',
            category: data.category,
            author_name: data.author_name,
            author_role: data.author_role,
            author_image: data.author_image || '',
            published_at: data.published_at,
            reading_time: data.reading_time,
            image_url: data.image_url || '',
            image_alt: data.image_alt || '',
            featured: data.featured,
            tags: data.tags || [],
            sections: (data.sections as unknown as SectionData[]) || [],
            related_slugs: data.related_slugs || [],
            status: data.status,
            seo_score: data.seo_score,
            readability_score: data.readability_score,
          });
        }
      });
    }
  }, [postId]);

  const generateSlug = useCallback((title: string) => {
    return title.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .slice(0, 80);
  }, []);

  const update = (partial: Partial<PostData>) => setPost(p => ({ ...p, ...partial }));

  const saveMutation = useMutation({
    mutationFn: async (publish: boolean) => {
      const payload = {
        ...post,
        status: publish ? 'published' : post.status,
        sections: JSON.parse(JSON.stringify(post.sections)),
      };
      if (postId) {
        const { error } = await supabase.from('blog_posts').update(payload as any).eq('id', postId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('blog_posts').insert(payload as any);
        if (error) throw error;
      }
    },
    onSuccess: (_, publish) => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
      toast({ title: publish ? 'Artículo publicado ✓' : 'Borrador guardado ✓' });
      onBack();
    },
    onError: (e) => {
      toast({ title: 'Error', description: e instanceof Error ? e.message : 'Error al guardar', variant: 'destructive' });
    },
  });

  const generateOutline = async () => {
    setAiLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('blog-ai-assistant', {
        body: { action: 'generate-outline', data: { title: post.title, category: post.category, keywords: post.tags.join(', ') } },
      });
      if (error) throw error;
      const outline = JSON.parse(data.result);
      update({ sections: outline.map((s: { id: string; title: string }) => ({ id: s.id, title: s.title, content: '' })) });
      toast({ title: 'Outline generado con IA' });
    } catch (e: unknown) {
      toast({ title: 'Error', description: e instanceof Error ? e.message : 'Error', variant: 'destructive' });
    } finally {
      setAiLoading(false);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !post.tags.includes(tagInput.trim())) {
      update({ tags: [...post.tags, tagInput.trim()] });
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => update({ tags: post.tags.filter(t => t !== tag) });

  const updateSection = (index: number, section: SectionData) => {
    const updated = [...post.sections];
    updated[index] = section;
    update({ sections: updated });
  };

  const addSection = () => {
    update({ sections: [...post.sections, { id: `section-${Date.now()}`, title: '', content: '' }] });
  };

  const removeSection = (index: number) => {
    update({ sections: post.sections.filter((_, i) => i !== index) });
  };

  const moveSection = (from: number, to: number) => {
    const updated = [...post.sections];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    update({ sections: updated });
  };

  if (isLoading) {
    return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onBack}><ArrowLeft className="h-4 w-4 mr-1" /> Volver</Button>
        <h2 className="text-xl font-bold">{postId ? 'Editar artículo' : 'Nuevo artículo'}</h2>
      </div>

      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="content">Contenido</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="readability">Legibilidad</TabsTrigger>
          <TabsTrigger value="media">Multimedia</TabsTrigger>
          <TabsTrigger value="factcheck">Verificación</TabsTrigger>
          <TabsTrigger value="publish">Publicar</TabsTrigger>
        </TabsList>

        {/* CONTENT TAB */}
        <TabsContent value="content" className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Título</Label>
              <Input
                value={post.title}
                onChange={e => { update({ title: e.target.value, slug: generateSlug(e.target.value) }); }}
                placeholder="Título del artículo"
              />
            </div>
            <div>
              <Label>Slug</Label>
              <Input value={post.slug} onChange={e => update({ slug: e.target.value })} />
            </div>
          </div>

          <div>
            <Label>Excerpt / Meta description</Label>
            <Textarea value={post.excerpt} onChange={e => update({ excerpt: e.target.value })} rows={2} placeholder="Resumen del artículo (máx 155 caracteres para SEO)" />
            <p className="text-xs text-muted-foreground mt-1">{post.excerpt.length}/155 caracteres</p>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div>
              <Label>Categoría</Label>
              <Select value={post.category} onValueChange={v => update({ category: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="detailing">Detailing</SelectItem>
                  <SelectItem value="ppf">PPF</SelectItem>
                  <SelectItem value="wrapping">Wrapping</SelectItem>
                  <SelectItem value="negocios">Negocios</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Fecha publicación</Label>
              <Input type="date" value={post.published_at} onChange={e => update({ published_at: e.target.value })} />
            </div>
            <div>
              <Label>Tiempo lectura</Label>
              <Input value={post.reading_time} onChange={e => update({ reading_time: e.target.value })} placeholder="5 min" />
            </div>
            <div>
              <Label>Autor</Label>
              <Input value={post.author_name} onChange={e => update({ author_name: e.target.value })} />
            </div>
          </div>

          {/* Tags */}
          <div>
            <Label>Tags</Label>
            <div className="flex gap-2 mb-2">
              <Input value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())} placeholder="Añadir tag..." />
              <Button variant="outline" size="sm" onClick={addTag}>Añadir</Button>
            </div>
            <div className="flex flex-wrap gap-1">
              {post.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                  {tag} <X className="h-3 w-3 ml-1" />
                </Badge>
              ))}
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base">Secciones del artículo</Label>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={generateOutline} disabled={aiLoading || !post.title}>
                  <Sparkles className="h-3.5 w-3.5 mr-1" /> {aiLoading ? 'Generando...' : 'Generar outline con IA'}
                </Button>
                <Button variant="outline" size="sm" onClick={addSection}><Plus className="h-3.5 w-3.5 mr-1" /> Sección</Button>
              </div>
            </div>

            {post.sections.map((section, i) => (
              <BlogSectionEditor
                key={section.id + i}
                section={section}
                index={i}
                total={post.sections.length}
                articleTitle={post.title}
                category={post.category}
                keywords={post.tags.join(', ')}
                onChange={s => updateSection(i, s)}
                onRemove={() => removeSection(i)}
                onMoveUp={() => i > 0 && moveSection(i, i - 1)}
                onMoveDown={() => i < post.sections.length - 1 && moveSection(i, i + 1)}
              />
            ))}
          </div>
        </TabsContent>

        {/* SEO TAB */}
        <TabsContent value="seo" className="mt-4">
          <BlogSEOPanel
            title={post.title}
            excerpt={post.excerpt}
            slug={post.slug}
            tags={post.tags}
            sections={post.sections}
            category={post.category}
            onScoreUpdate={score => update({ seo_score: score })}
          />
        </TabsContent>

        {/* READABILITY TAB */}
        <TabsContent value="readability" className="mt-4">
          <BlogReadabilityPanel
            sections={post.sections}
            onScoreUpdate={score => update({ readability_score: score })}
          />
        </TabsContent>

        {/* MEDIA TAB */}
        <TabsContent value="media" className="mt-4">
          <BlogMediaPanel
            imageUrl={post.image_url}
            imageAlt={post.image_alt}
            authorImage={post.author_image}
            onImageChange={url => update({ image_url: url })}
            onImageAltChange={alt => update({ image_alt: alt })}
            onAuthorImageChange={url => update({ author_image: url })}
          />
        </TabsContent>

        {/* FACTCHECK TAB */}
        <TabsContent value="factcheck" className="mt-4">
          <BlogFactCheckPanel sections={post.sections} />
        </TabsContent>

        {/* PUBLISH TAB */}
        <TabsContent value="publish" className="mt-4">
          <BlogPublishPanel
            title={post.title}
            excerpt={post.excerpt}
            tags={post.tags}
            imageUrl={post.image_url}
            status={post.status}
            featured={post.featured}
            seoScore={post.seo_score}
            readabilityScore={post.readability_score}
            relatedSlugs={post.related_slugs}
            onStatusChange={s => update({ status: s })}
            onFeaturedChange={f => update({ featured: f })}
            onRelatedSlugsChange={s => update({ related_slugs: s })}
            onSave={publish => saveMutation.mutate(publish)}
            saving={saveMutation.isPending}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

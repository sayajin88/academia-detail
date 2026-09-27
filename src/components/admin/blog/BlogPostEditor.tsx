import { useState, useEffect, useCallback, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BlogSectionEditor, SectionData } from './BlogSectionEditor';
import { BlogSEOPanel } from './BlogSEOPanel';
import { BlogReadabilityPanel } from './BlogReadabilityPanel';
import { BlogMediaPanel } from './BlogMediaPanel';
import { BlogFactCheckPanel } from './BlogFactCheckPanel';
import { BlogPublishPanel } from './BlogPublishPanel';
import { ArrowLeft, Plus, Sparkles, X, FileText, Search, BookOpen, Image, ShieldCheck, Send, Save, Settings, Tag, LayoutList, Type } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Props {
  postId: string | null;
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
  title: '', slug: '', excerpt: '', category: 'detailing',
  author_name: 'Daniel López', author_role: 'CEO y Formador Principal',
  author_image: '', published_at: new Date().toISOString().split('T')[0],
  reading_time: '5 min', image_url: '', image_alt: '',
  featured: false, tags: [], sections: [], related_slugs: [],
  status: 'draft', seo_score: null, readability_score: null,
};

export function BlogPostEditor({ postId, onBack }: Props) {
  const [post, setPost] = useState<PostData>(emptyPost);
  const [tagInput, setTagInput] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const queryClient = useQueryClient();

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
      supabase.from('blog_posts').select('*').eq('id', postId).single().then(({ data }) => {
        if (data) {
          setPost({
            title: data.title, slug: data.slug, excerpt: data.excerpt || '',
            category: data.category, author_name: data.author_name,
            author_role: data.author_role, author_image: data.author_image || '',
            published_at: data.published_at, reading_time: data.reading_time,
            image_url: data.image_url || '', image_alt: data.image_alt || '',
            featured: data.featured, tags: data.tags || [],
            sections: (data.sections as unknown as SectionData[]) || [],
            related_slugs: data.related_slugs || [], status: data.status,
            seo_score: data.seo_score, readability_score: data.readability_score,
          });
        }
      });
    }
  }, [postId]);

  const generateSlug = useCallback((title: string) => {
    return title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').slice(0, 80);
  }, []);

  const update = (partial: Partial<PostData>) => setPost(p => ({ ...p, ...partial }));

  const totalWords = useMemo(() => {
    return post.sections.reduce((sum, s) => sum + (s.content?.split(/\s+/).filter(Boolean).length || 0), 0);
  }, [post.sections]);

  const completeness = useMemo(() => {
    let score = 0;
    if (post.title) score += 20;
    if (post.excerpt) score += 20;
    if (post.image_url) score += 20;
    if (post.sections.length > 0) score += 20;
    if (post.tags.length > 0) score += 20;
    return score;
  }, [post.title, post.excerpt, post.image_url, post.sections.length, post.tags.length]);

  const saveMutation = useMutation({
    mutationFn: async (publish: boolean) => {
      const payload = { ...post, status: publish ? 'published' : post.status, sections: JSON.parse(JSON.stringify(post.sections)) };
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
    } finally { setAiLoading(false); }
  };

  const addTag = () => {
    if (tagInput.trim() && !post.tags.includes(tagInput.trim())) {
      update({ tags: [...post.tags, tagInput.trim()] });
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => update({ tags: post.tags.filter(t => t !== tag) });

  const updateSection = (index: number, section: SectionData) => {
    const updated = [...post.sections]; updated[index] = section; update({ sections: updated });
  };

  const addSection = () => {
    update({ sections: [...post.sections, { id: `section-${Date.now()}`, title: '', content: '' }] });
  };

  const removeSection = (index: number) => update({ sections: post.sections.filter((_, i) => i !== index) });

  const duplicateSection = (index: number) => {
    const s = post.sections[index];
    const updated = [...post.sections];
    updated.splice(index + 1, 0, { ...s, id: `section-${Date.now()}` });
    update({ sections: updated });
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
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack}><ArrowLeft className="h-4 w-4 mr-1" /> Volver</Button>
          <h2 className="text-xl font-bold">{postId ? 'Editar artículo' : 'Nuevo artículo'}</h2>
          <Badge variant={post.status === 'published' ? 'default' : 'secondary'} className="capitalize">
            {post.status === 'published' ? 'Publicado' : 'Borrador'}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">{totalWords} palabras · {post.sections.length} secciones</span>
          <Button variant="outline" size="sm" onClick={() => saveMutation.mutate(false)} disabled={saveMutation.isPending}>
            <Save className="h-3.5 w-3.5 mr-1" /> Guardar
          </Button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Completitud del artículo</span>
          <span>{completeness}%</span>
        </div>
        <Progress value={completeness} className="h-2" />
      </div>

      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="content" className="text-xs gap-1"><FileText className="h-3.5 w-3.5" /> Contenido</TabsTrigger>
          <TabsTrigger value="seo" className="text-xs gap-1"><Search className="h-3.5 w-3.5" /> SEO</TabsTrigger>
          <TabsTrigger value="readability" className="text-xs gap-1"><BookOpen className="h-3.5 w-3.5" /> Legibilidad</TabsTrigger>
          <TabsTrigger value="media" className="text-xs gap-1"><Image className="h-3.5 w-3.5" /> Multimedia</TabsTrigger>
          <TabsTrigger value="factcheck" className="text-xs gap-1"><ShieldCheck className="h-3.5 w-3.5" /> Verificación</TabsTrigger>
          <TabsTrigger value="publish" className="text-xs gap-1"><Send className="h-3.5 w-3.5" /> Publicar</TabsTrigger>
        </TabsList>

        {/* CONTENT TAB */}
        <TabsContent value="content" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Main content - 2/3 */}
            <div className="lg:col-span-2 space-y-4">
              {/* Basic info card */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2"><Type className="h-4 w-4 text-brand" /> Información básica</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label className="text-xs">Título</Label>
                    <Input value={post.title} onChange={e => { update({ title: e.target.value, slug: generateSlug(e.target.value) }); }} placeholder="Título del artículo" className="font-semibold" />
                    <p className="text-xs text-muted-foreground mt-1">{post.title.length}/65 caracteres</p>
                  </div>
                  <div>
                    <Label className="text-xs">Slug</Label>
                    <Input value={post.slug} onChange={e => update({ slug: e.target.value })} className="text-xs font-mono" />
                  </div>
                  <div>
                    <Label className="text-xs">Excerpt / Meta description</Label>
                    <Textarea value={post.excerpt} onChange={e => update({ excerpt: e.target.value })} rows={2} placeholder="Resumen del artículo (máx 155 caracteres para SEO)" />
                    <p className="text-xs text-muted-foreground mt-1">{post.excerpt.length}/155 caracteres</p>
                  </div>
                </CardContent>
              </Card>

              {/* Metadata card */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2"><Settings className="h-4 w-4 text-brand" /> Metadatos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs">Categoría</Label>
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
                      <Label className="text-xs">Fecha publicación</Label>
                      <Input type="date" value={post.published_at} onChange={e => update({ published_at: e.target.value })} />
                    </div>
                    <div>
                      <Label className="text-xs">Tiempo lectura</Label>
                      <Input value={post.reading_time} onChange={e => update({ reading_time: e.target.value })} placeholder="5 min" />
                    </div>
                    <div>
                      <Label className="text-xs">Autor</Label>
                      <Input value={post.author_name} onChange={e => update({ author_name: e.target.value })} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tags card */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2"><Tag className="h-4 w-4 text-brand" /> Etiquetas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex gap-2">
                    <Input value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())} placeholder="Añadir tag..." className="text-sm" />
                    <Button variant="outline" size="sm" onClick={addTag}>Añadir</Button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-destructive/20 transition-colors" onClick={() => removeTag(tag)}>
                        {tag} <X className="h-3 w-3 ml-1" />
                      </Badge>
                    ))}
                    {post.tags.length === 0 && <p className="text-xs text-muted-foreground italic">Sin etiquetas. Añade al menos 3 para mejor SEO.</p>}
                  </div>
                </CardContent>
              </Card>

              {/* Sections */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm flex items-center gap-2"><LayoutList className="h-4 w-4 text-brand" /> Secciones del artículo</CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={generateOutline} disabled={aiLoading || !post.title}>
                        <Sparkles className="h-3.5 w-3.5 mr-1" /> {aiLoading ? 'Generando...' : 'Outline IA'}
                      </Button>
                      <Button variant="outline" size="sm" onClick={addSection}><Plus className="h-3.5 w-3.5 mr-1" /> Sección</Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {post.sections.length === 0 ? (
                    <div className="border-2 border-dashed rounded-lg p-8 text-center space-y-3">
                      <LayoutList className="h-10 w-10 mx-auto text-muted-foreground/40" />
                      <p className="text-sm text-muted-foreground">No hay secciones todavía</p>
                      <p className="text-xs text-muted-foreground">Genera un outline con IA o añade secciones manualmente</p>
                      <div className="flex gap-2 justify-center">
                        <Button variant="outline" size="sm" onClick={generateOutline} disabled={aiLoading || !post.title}>
                          <Sparkles className="h-3.5 w-3.5 mr-1" /> Generar outline
                        </Button>
                        <Button variant="outline" size="sm" onClick={addSection}><Plus className="h-3.5 w-3.5 mr-1" /> Añadir sección</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
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
                          onDuplicate={() => duplicateSection(i)}
                          onMoveUp={() => i > 0 && moveSection(i, i - 1)}
                          onMoveDown={() => i < post.sections.length - 1 && moveSection(i, i + 1)}
                        />
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - 1/3 */}
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Resumen</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Estado</span><Badge variant={post.status === 'published' ? 'default' : 'secondary'} className="capitalize">{post.status === 'published' ? 'Publicado' : 'Borrador'}</Badge></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Palabras</span><span className="font-mono font-medium">{totalWords}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Secciones</span><span className="font-mono font-medium">{post.sections.length}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Tags</span><span className="font-mono font-medium">{post.tags.length}</span></div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">SEO</span>
                    <span className={`font-bold ${!post.seo_score ? 'text-muted-foreground' : post.seo_score >= 70 ? 'text-green-500' : post.seo_score >= 40 ? 'text-yellow-500' : 'text-red-500'}`}>
                      {post.seo_score ?? '—'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Legibilidad</span>
                    <span className={`font-bold ${!post.readability_score ? 'text-muted-foreground' : post.readability_score >= 70 ? 'text-green-500' : post.readability_score >= 40 ? 'text-yellow-500' : 'text-red-500'}`}>
                      {post.readability_score ?? '—'}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {post.image_url && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Imagen principal</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <img src={post.image_url} alt={post.image_alt} className="w-full rounded object-cover max-h-40" />
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Checklist</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1.5 text-xs">
                  {[
                    { label: 'Título', ok: !!post.title },
                    { label: 'Excerpt', ok: !!post.excerpt },
                    { label: 'Imagen', ok: !!post.image_url },
                    { label: 'Secciones', ok: post.sections.length >= 3 },
                    { label: 'Tags', ok: post.tags.length >= 3 },
                  ].map(item => (
                    <div key={item.label} className="flex items-center gap-2">
                      <span className={item.ok ? 'text-green-500' : 'text-red-400'}>{item.ok ? '✓' : '✗'}</span>
                      <span className={item.ok ? 'text-foreground' : 'text-muted-foreground'}>{item.label}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="seo" className="mt-4">
          <BlogSEOPanel title={post.title} excerpt={post.excerpt} slug={post.slug} tags={post.tags} sections={post.sections} category={post.category} onScoreUpdate={score => update({ seo_score: score })} />
        </TabsContent>
        <TabsContent value="readability" className="mt-4">
          <BlogReadabilityPanel sections={post.sections} onScoreUpdate={score => update({ readability_score: score })} />
        </TabsContent>
        <TabsContent value="media" className="mt-4">
          <BlogMediaPanel imageUrl={post.image_url} imageAlt={post.image_alt} authorImage={post.author_image} onImageChange={url => update({ image_url: url })} onImageAltChange={alt => update({ image_alt: alt })} onAuthorImageChange={url => update({ author_image: url })} />
        </TabsContent>
        <TabsContent value="factcheck" className="mt-4">
          <BlogFactCheckPanel sections={post.sections} />
        </TabsContent>
        <TabsContent value="publish" className="mt-4">
          <BlogPublishPanel title={post.title} excerpt={post.excerpt} tags={post.tags} imageUrl={post.image_url} status={post.status} featured={post.featured} seoScore={post.seo_score} readabilityScore={post.readability_score} relatedSlugs={post.related_slugs} onStatusChange={s => update({ status: s })} onFeaturedChange={f => update({ featured: f })} onRelatedSlugsChange={s => update({ related_slugs: s })} onSave={publish => saveMutation.mutate(publish)} saving={saveMutation.isPending} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

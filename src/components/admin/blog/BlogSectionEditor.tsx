import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Sparkles, ChevronDown, ChevronRight, Trash2, Wand2, Copy, GripVertical, Eye, Edit3 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface SectionData {
  id: string;
  title: string;
  content: string;
  links?: { text: string; href: string; rel?: string; external?: boolean }[];
  table?: { headers: string[]; rows: string[][]; caption?: string };
}

interface Props {
  section: SectionData;
  index: number;
  total: number;
  articleTitle: string;
  category: string;
  keywords: string;
  onChange: (section: SectionData) => void;
  onRemove: () => void;
  onDuplicate: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

export function BlogSectionEditor({ section, index, total, articleTitle, category, keywords, onChange, onRemove, onDuplicate, onMoveUp, onMoveDown }: Props) {
  const [aiLoading, setAiLoading] = useState(false);
  const [improveInstruction, setImproveInstruction] = useState('');
  const [showImprove, setShowImprove] = useState(false);
  const [isOpen, setIsOpen] = useState(!section.content);
  const [previewMode, setPreviewMode] = useState(false);

  const wordCount = useMemo(() => section.content?.split(/\s+/).filter(Boolean).length || 0, [section.content]);
  const TARGET_WORDS = 300;
  const wordProgress = Math.min((wordCount / TARGET_WORDS) * 100, 100);

  const writeWithAI = async () => {
    setAiLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('blog-ai-assistant', {
        body: { action: 'write-section', data: { articleTitle, sectionTitle: section.title, category, keywords } },
      });
      if (error) throw error;
      const result = data?.result || '';
      if (result.includes('===TABLE===')) {
        const [text, tableJson] = result.split('===TABLE===');
        try {
          const table = JSON.parse(tableJson.trim());
          onChange({ ...section, content: text.trim(), table });
        } catch { onChange({ ...section, content: result }); }
      } else {
        onChange({ ...section, content: result });
      }
      toast({ title: 'Sección generada con IA' });
    } catch (e: unknown) {
      toast({ title: 'Error', description: e instanceof Error ? e.message : 'Error al generar', variant: 'destructive' });
    } finally { setAiLoading(false); }
  };

  const improveWithAI = async () => {
    if (!improveInstruction.trim()) return;
    setAiLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('blog-ai-assistant', {
        body: { action: 'improve-section', data: { content: section.content, instruction: improveInstruction } },
      });
      if (error) throw error;
      onChange({ ...section, content: data?.result || section.content });
      setShowImprove(false);
      setImproveInstruction('');
      toast({ title: 'Sección mejorada' });
    } catch (e: unknown) {
      toast({ title: 'Error', description: e instanceof Error ? e.message : 'Error', variant: 'destructive' });
    } finally { setAiLoading(false); }
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border rounded-lg overflow-hidden">
      <CollapsibleTrigger asChild>
        <div className="flex items-center gap-2 px-3 py-2.5 bg-muted/30 hover:bg-muted/50 cursor-pointer transition-colors">
          <GripVertical className="h-4 w-4 text-muted-foreground/50 shrink-0" />
          <div className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0">
            {index + 1}
          </div>
          {isOpen ? <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" /> : <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />}
          <span className="text-sm font-medium truncate flex-1">{section.title || 'Sin título'}</span>
          <Badge variant="outline" className="text-[10px] font-mono shrink-0">{wordCount} palabras</Badge>
          <div className="flex items-center gap-0.5 shrink-0" onClick={e => e.stopPropagation()}>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onMoveUp} disabled={index === 0} title="Mover arriba"><ChevronDown className="h-3.5 w-3.5 rotate-180" /></Button>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onMoveDown} disabled={index === total - 1} title="Mover abajo"><ChevronDown className="h-3.5 w-3.5" /></Button>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onDuplicate} title="Duplicar"><Copy className="h-3.5 w-3.5" /></Button>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onRemove} title="Eliminar"><Trash2 className="h-3.5 w-3.5 text-destructive" /></Button>
          </div>
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent className="px-3 pb-3 space-y-3">
        <div className="pt-3">
          <Input
            value={section.title}
            onChange={e => onChange({ ...section, title: e.target.value, id: e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') })}
            placeholder="Título de la sección (H2)"
            className="font-semibold text-sm"
          />
        </div>

        {/* Word progress bar */}
        <div className="space-y-1">
          <Progress value={wordProgress} className="h-1.5" />
          <p className="text-[10px] text-muted-foreground">{wordCount}/{TARGET_WORDS} palabras objetivo</p>
        </div>

        {/* Editor / Preview toggle */}
        <div className="flex gap-1 border-b pb-1">
          <Button variant={previewMode ? 'ghost' : 'secondary'} size="sm" className="h-7 text-xs" onClick={() => setPreviewMode(false)}>
            <Edit3 className="h-3 w-3 mr-1" /> Editar
          </Button>
          <Button variant={previewMode ? 'secondary' : 'ghost'} size="sm" className="h-7 text-xs" onClick={() => setPreviewMode(true)} disabled={!section.content}>
            <Eye className="h-3 w-3 mr-1" /> Preview
          </Button>
        </div>

        {previewMode ? (
          <div className="prose prose-sm max-w-none p-3 bg-muted/20 rounded text-sm whitespace-pre-wrap min-h-[120px]">
            {section.content || <span className="text-muted-foreground italic">Sin contenido</span>}
          </div>
        ) : (
          <Textarea
            value={section.content}
            onChange={e => onChange({ ...section, content: e.target.value })}
            placeholder="Contenido de la sección..."
            className="text-sm min-h-[150px] resize-y"
          />
        )}

        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" size="sm" className="h-7 text-xs" onClick={writeWithAI} disabled={aiLoading}>
            <Sparkles className="h-3 w-3 mr-1" /> {aiLoading ? 'Generando...' : 'Escribir con IA'}
          </Button>
          <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => setShowImprove(!showImprove)} disabled={!section.content}>
            <Wand2 className="h-3 w-3 mr-1" /> Mejorar
          </Button>
        </div>

        {showImprove && (
          <div className="flex gap-2">
            <Input value={improveInstruction} onChange={e => setImproveInstruction(e.target.value)} placeholder="Instrucción: 'más datos concretos', 'más SEO'..." className="text-xs" />
            <Button size="sm" className="h-8" onClick={improveWithAI} disabled={aiLoading || !improveInstruction.trim()}>
              {aiLoading ? '...' : 'Aplicar'}
            </Button>
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}

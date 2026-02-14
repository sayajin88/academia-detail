import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Sparkles, ChevronUp, ChevronDown, Trash2, Wand2 } from 'lucide-react';
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
  onMoveUp: () => void;
  onMoveDown: () => void;
}

export function BlogSectionEditor({ section, index, total, articleTitle, category, keywords, onChange, onRemove, onMoveUp, onMoveDown }: Props) {
  const [aiLoading, setAiLoading] = useState(false);
  const [improveInstruction, setImproveInstruction] = useState('');
  const [showImprove, setShowImprove] = useState(false);

  const writeWithAI = async () => {
    setAiLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('blog-ai-assistant', {
        body: { action: 'write-section', data: { articleTitle, sectionTitle: section.title, category, keywords } },
      });
      if (error) throw error;
      const result = data?.result || '';
      // Parse table if present
      if (result.includes('===TABLE===')) {
        const [text, tableJson] = result.split('===TABLE===');
        try {
          const table = JSON.parse(tableJson.trim());
          onChange({ ...section, content: text.trim(), table });
        } catch {
          onChange({ ...section, content: result });
        }
      } else {
        onChange({ ...section, content: result });
      }
      toast({ title: 'Sección generada con IA' });
    } catch (e: unknown) {
      toast({ title: 'Error', description: e instanceof Error ? e.message : 'Error al generar', variant: 'destructive' });
    } finally {
      setAiLoading(false);
    }
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
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <Card className="p-4 space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground font-mono">§{index + 1}</span>
        <Input
          value={section.title}
          onChange={e => onChange({ ...section, title: e.target.value, id: e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') })}
          placeholder="Título de la sección"
          className="font-semibold"
        />
        <Button variant="ghost" size="icon" onClick={onMoveUp} disabled={index === 0}><ChevronUp className="h-4 w-4" /></Button>
        <Button variant="ghost" size="icon" onClick={onMoveDown} disabled={index === total - 1}><ChevronDown className="h-4 w-4" /></Button>
        <Button variant="ghost" size="icon" onClick={onRemove}><Trash2 className="h-4 w-4 text-destructive" /></Button>
      </div>

      <Textarea
        value={section.content}
        onChange={e => onChange({ ...section, content: e.target.value })}
        placeholder="Contenido de la sección..."
        rows={8}
        className="text-sm"
      />

      <div className="flex gap-2 flex-wrap">
        <Button variant="outline" size="sm" onClick={writeWithAI} disabled={aiLoading}>
          <Sparkles className="h-3.5 w-3.5 mr-1" /> {aiLoading ? 'Generando...' : 'Escribir con IA'}
        </Button>
        <Button variant="outline" size="sm" onClick={() => setShowImprove(!showImprove)} disabled={!section.content}>
          <Wand2 className="h-3.5 w-3.5 mr-1" /> Mejorar
        </Button>
      </div>

      {showImprove && (
        <div className="flex gap-2">
          <Input
            value={improveInstruction}
            onChange={e => setImproveInstruction(e.target.value)}
            placeholder="Instrucción: p.ej. 'más datos concretos', 'más SEO'..."
            className="text-sm"
          />
          <Button size="sm" onClick={improveWithAI} disabled={aiLoading || !improveInstruction.trim()}>
            {aiLoading ? '...' : 'Aplicar'}
          </Button>
        </div>
      )}
    </Card>
  );
}

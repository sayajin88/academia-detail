import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface FactCheckItem {
  claim: string;
  confidence: 'high' | 'medium' | 'low';
  note: string;
}

interface Props {
  sections: { title: string; content: string }[];
}

export function BlogFactCheckPanel({ sections }: Props) {
  const [results, setResults] = useState<{ section: string; items: FactCheckItem[] }[]>([]);
  const [loading, setLoading] = useState(false);

  const runFactCheck = async () => {
    setLoading(true);
    try {
      const allResults: { section: string; items: FactCheckItem[] }[] = [];
      for (const section of sections) {
        if (!section.content.trim()) continue;
        const { data, error } = await supabase.functions.invoke('blog-ai-assistant', {
          body: { action: 'fact-check', data: { content: section.content } },
        });
        if (error) throw error;
        const items = JSON.parse(data.result);
        allResults.push({ section: section.title, items });
      }
      setResults(allResults);
      toast({ title: 'Fact-check completado' });
    } catch (e: unknown) {
      toast({ title: 'Error', description: e instanceof Error ? e.message : 'Error', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const confidenceColor = (c: string) => c === 'high' ? 'default' : c === 'medium' ? 'secondary' : 'destructive';

  return (
    <div className="space-y-4">
      <Button onClick={runFactCheck} disabled={loading || sections.length === 0} variant="outline">
        <ShieldCheck className="h-4 w-4 mr-1" /> {loading ? 'Verificando...' : 'Verificar hechos'}
      </Button>

      {results.map((r, i) => (
        <Card key={i} className="p-4">
          <h4 className="font-semibold mb-2">{r.section}</h4>
          <div className="space-y-2">
            {r.items.map((item, j) => (
              <div key={j} className="flex items-start gap-2 text-sm">
                <Badge variant={confidenceColor(item.confidence) as "default" | "secondary" | "destructive"} className="mt-0.5 text-xs shrink-0">
                  {item.confidence === 'high' ? '✓ Alto' : item.confidence === 'medium' ? '? Medio' : '✗ Bajo'}
                </Badge>
                <div>
                  <p className="font-medium">{item.claim}</p>
                  <p className="text-xs text-muted-foreground">{item.note}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}

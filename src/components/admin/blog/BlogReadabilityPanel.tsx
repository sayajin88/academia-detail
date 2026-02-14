import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, FileText } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface ReadabilityResult {
  score: number;
  avgSentenceLength: number;
  passiveVoicePercentage: number;
  technicalLevel: string;
  suggestions: { section: string; issue: string; suggestion: string }[];
}

interface Props {
  sections: { title: string; content: string }[];
  onScoreUpdate: (score: number) => void;
}

export function BlogReadabilityPanel({ sections, onScoreUpdate }: Props) {
  const [result, setResult] = useState<ReadabilityResult | null>(null);
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    setLoading(true);
    try {
      const content = sections.map(s => `## ${s.title}\n${s.content}`).join('\n\n');
      const { data, error } = await supabase.functions.invoke('blog-ai-assistant', {
        body: { action: 'readability-analysis', data: { content } },
      });
      if (error) throw error;
      const parsed = JSON.parse(data.result);
      setResult(parsed);
      onScoreUpdate(parsed.score);
      toast({ title: `Legibilidad: ${parsed.score}/100` });
    } catch (e: unknown) {
      toast({ title: 'Error', description: e instanceof Error ? e.message : 'Error', variant: 'destructive' });
    } finally { setLoading(false); }
  };

  const scoreColor = (s: number) => s >= 70 ? 'text-green-500' : s >= 40 ? 'text-yellow-500' : 'text-red-500';

  return (
    <div className="space-y-4">
      <Button onClick={analyze} disabled={loading || sections.length === 0} variant="outline">
        <BookOpen className="h-4 w-4 mr-1" /> {loading ? 'Analizando...' : 'Analizar legibilidad'}
      </Button>

      {!result && (
        <Card className="border-dashed">
          <CardContent className="py-10 text-center">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground/30 mb-3" />
            <p className="text-sm text-muted-foreground">Analiza la legibilidad de tu artículo</p>
            <p className="text-xs text-muted-foreground mt-1">Evaluaremos longitud de frases, voz pasiva, nivel técnico y más</p>
          </CardContent>
        </Card>
      )}

      {result && (
        <>
          <div className="flex items-center gap-3">
            <span className={`text-3xl font-bold ${scoreColor(result.score)}`}>{result.score}</span>
            <span className="text-muted-foreground">/100</span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Card><CardContent className="p-3 text-center"><p className="text-2xl font-bold">{result.avgSentenceLength}</p><p className="text-xs text-muted-foreground">Palabras/frase</p></CardContent></Card>
            <Card><CardContent className="p-3 text-center"><p className="text-2xl font-bold">{result.passiveVoicePercentage}%</p><p className="text-xs text-muted-foreground">Voz pasiva</p></CardContent></Card>
            <Card><CardContent className="p-3 text-center"><p className="text-2xl font-bold capitalize">{result.technicalLevel}</p><p className="text-xs text-muted-foreground">Nivel técnico</p></CardContent></Card>
          </div>

          {result.suggestions.length > 0 && (
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm">Sugerencias de mejora</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {result.suggestions.map((s, i) => (
                  <div key={i} className="text-sm">
                    <Badge variant="outline" className="mr-2">{s.section}</Badge>
                    <span className="font-medium">{s.issue}</span>
                    <p className="text-xs text-muted-foreground mt-0.5">{s.suggestion}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, ExternalLink, Search } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { BlogGooglePreview } from './BlogGooglePreview';

interface SEOResult {
  score: number;
  onPage: { issue: string; severity: string; suggestion: string }[];
  offPage: { suggestion: string; priority: string }[];
  internalLinks: { text: string; href: string; context: string }[];
}

interface KeywordResult {
  primaryKeyword: string;
  secondaryKeywords: string[];
  longTailKeywords: string[];
  internalLinks: { text: string; href: string; relevance: string }[];
}

interface Props {
  title: string;
  excerpt: string;
  slug: string;
  tags: string[];
  sections: unknown[];
  category: string;
  onScoreUpdate: (score: number) => void;
}

export function BlogSEOPanel({ title, excerpt, slug, tags, sections, category, onScoreUpdate }: Props) {
  const [seoResult, setSeoResult] = useState<SEOResult | null>(null);
  const [keywords, setKeywords] = useState<KeywordResult | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

  const runSEOAnalysis = async () => {
    setLoading('seo');
    try {
      const { data, error } = await supabase.functions.invoke('blog-ai-assistant', {
        body: { action: 'seo-analysis', data: { title, excerpt, tags, sections } },
      });
      if (error) throw error;
      const parsed = JSON.parse(data.result);
      setSeoResult(parsed);
      onScoreUpdate(parsed.score);
      toast({ title: `SEO Score: ${parsed.score}/100` });
    } catch (e: unknown) {
      toast({ title: 'Error', description: e instanceof Error ? e.message : 'Error', variant: 'destructive' });
    } finally {
      setLoading(null);
    }
  };

  const suggestKeywords = async () => {
    setLoading('keywords');
    try {
      const { data, error } = await supabase.functions.invoke('blog-ai-assistant', {
        body: { action: 'suggest-keywords', data: { title, category } },
      });
      if (error) throw error;
      setKeywords(JSON.parse(data.result));
    } catch (e: unknown) {
      toast({ title: 'Error', description: e instanceof Error ? e.message : 'Error', variant: 'destructive' });
    } finally {
      setLoading(null);
    }
  };

  const severityColor = (s: string) => s === 'high' ? 'destructive' : s === 'medium' ? 'secondary' : 'outline';

  return (
    <div className="space-y-6">
      {/* Google Preview */}
      <BlogGooglePreview title={title} excerpt={excerpt} slug={slug} />

      {/* Actions */}
      <div className="flex gap-3">
        <Button onClick={runSEOAnalysis} disabled={loading === 'seo'} variant="outline">
          <Search className="h-4 w-4 mr-1" /> {loading === 'seo' ? 'Analizando...' : 'Análisis SEO'}
        </Button>
        <Button onClick={suggestKeywords} disabled={loading === 'keywords'} variant="outline">
          <Sparkles className="h-4 w-4 mr-1" /> {loading === 'keywords' ? 'Buscando...' : 'Sugerir Keywords'}
        </Button>
      </div>

      {/* SEO Results */}
      {seoResult && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold" style={{ color: seoResult.score >= 70 ? '#22c55e' : seoResult.score >= 40 ? '#eab308' : '#ef4444' }}>
              {seoResult.score}
            </span>
            <span className="text-muted-foreground">/100 SEO Score</span>
          </div>

          <Card className="p-4">
            <h4 className="font-semibold mb-2">SEO On-Page</h4>
            <div className="space-y-2">
              {seoResult.onPage.map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Badge variant={severityColor(item.severity) as "destructive" | "secondary" | "outline"} className="mt-0.5 text-xs">{item.severity}</Badge>
                  <div><p className="text-sm font-medium">{item.issue}</p><p className="text-xs text-muted-foreground">{item.suggestion}</p></div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-4">
            <h4 className="font-semibold mb-2">SEO Off-Page</h4>
            <div className="space-y-2">
              {seoResult.offPage.map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Badge variant="outline" className="text-xs">{item.priority}</Badge>
                  <p className="text-sm">{item.suggestion}</p>
                </div>
              ))}
            </div>
          </Card>

          {seoResult.internalLinks.length > 0 && (
            <Card className="p-4">
              <h4 className="font-semibold mb-2">Enlaces internos sugeridos</h4>
              <div className="space-y-1">
                {seoResult.internalLinks.map((link, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <ExternalLink className="h-3 w-3 text-primary" />
                    <span className="font-medium">{link.text}</span>
                    <span className="text-muted-foreground">→ {link.href}</span>
                    <span className="text-xs text-muted-foreground">({link.context})</span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      )}

      {/* Keywords */}
      {keywords && (
        <Card className="p-4">
          <h4 className="font-semibold mb-3">Keywords sugeridas</h4>
          <div className="space-y-2">
            <div><span className="text-xs text-muted-foreground">Principal:</span> <Badge>{keywords.primaryKeyword}</Badge></div>
            <div><span className="text-xs text-muted-foreground">Secundarias:</span> <div className="flex flex-wrap gap-1 mt-1">{keywords.secondaryKeywords.map(k => <Badge key={k} variant="secondary">{k}</Badge>)}</div></div>
            <div><span className="text-xs text-muted-foreground">Long-tail:</span> <div className="flex flex-wrap gap-1 mt-1">{keywords.longTailKeywords.map(k => <Badge key={k} variant="outline">{k}</Badge>)}</div></div>
          </div>
          {keywords.internalLinks.length > 0 && (
            <div className="mt-3 pt-3 border-t">
              <span className="text-xs text-muted-foreground">Enlaces internos sugeridos:</span>
              <div className="space-y-1 mt-1">
                {keywords.internalLinks.map((l, i) => (
                  <div key={i} className="text-sm flex gap-2">
                    <ExternalLink className="h-3 w-3 text-primary mt-0.5" />
                    <span>{l.text} → {l.href}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}

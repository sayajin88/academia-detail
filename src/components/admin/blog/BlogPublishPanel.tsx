import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save, Send } from 'lucide-react';

interface Props {
  title: string;
  excerpt: string;
  tags: string[];
  imageUrl: string;
  status: string;
  featured: boolean;
  seoScore: number | null;
  readabilityScore: number | null;
  relatedSlugs: string[];
  onStatusChange: (s: string) => void;
  onFeaturedChange: (f: boolean) => void;
  onRelatedSlugsChange: (s: string[]) => void;
  onSave: (publish: boolean) => void;
  saving: boolean;
}

export function BlogPublishPanel({
  title, excerpt, tags, imageUrl, status, featured, seoScore, readabilityScore,
  relatedSlugs, onStatusChange, onFeaturedChange, onRelatedSlugsChange, onSave, saving
}: Props) {
  const scoreColor = (s: number | null) => !s ? 'text-muted-foreground' : s >= 70 ? 'text-green-500' : s >= 40 ? 'text-yellow-500' : 'text-red-500';

  return (
    <div className="space-y-6">
      {/* Summary */}
      <Card className="p-4 space-y-3">
        <h4 className="font-semibold">Resumen del artículo</h4>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div><span className="text-muted-foreground">Título:</span> <span className="font-medium">{title || '—'}</span></div>
          <div><span className="text-muted-foreground">Imagen:</span> {imageUrl ? '✓' : '✗ Sin imagen'}</div>
          <div><span className="text-muted-foreground">Tags:</span> {tags.length > 0 ? tags.slice(0, 3).join(', ') : '—'}</div>
          <div><span className="text-muted-foreground">Excerpt:</span> {excerpt ? `${excerpt.length} chars` : '—'}</div>
        </div>
        <div className="flex gap-4">
          <div><span className="text-muted-foreground text-sm">SEO: </span><span className={`font-bold ${scoreColor(seoScore)}`}>{seoScore ?? '—'}</span></div>
          <div><span className="text-muted-foreground text-sm">Legibilidad: </span><span className={`font-bold ${scoreColor(readabilityScore)}`}>{readabilityScore ?? '—'}</span></div>
        </div>
      </Card>

      {/* Status */}
      <Card className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <Label>Estado</Label>
          <Select value={status} onValueChange={onStatusChange}>
            <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Borrador</SelectItem>
              <SelectItem value="published">Publicado</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-between">
          <Label>Artículo destacado</Label>
          <Switch checked={featured} onCheckedChange={onFeaturedChange} />
        </div>
      </Card>

      {/* Related slugs */}
      <Card className="p-4 space-y-2">
        <Label>Artículos relacionados (slugs separados por coma)</Label>
        <Input
          value={relatedSlugs.join(', ')}
          onChange={e => onRelatedSlugsChange(e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
          placeholder="slug-1, slug-2, slug-3"
        />
      </Card>

      {/* Actions */}
      <div className="flex gap-3">
        <Button variant="outline" onClick={() => onSave(false)} disabled={saving}>
          <Save className="h-4 w-4 mr-1" /> {saving ? 'Guardando...' : 'Guardar borrador'}
        </Button>
        <Button onClick={() => onSave(true)} disabled={saving}>
          <Send className="h-4 w-4 mr-1" /> {saving ? 'Publicando...' : 'Publicar'}
        </Button>
      </div>
    </div>
  );
}

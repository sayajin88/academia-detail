import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save, Send, CheckCircle2, XCircle, BarChart3, Link } from 'lucide-react';

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

  const checklist = [
    { label: 'Título definido', ok: !!title },
    { label: 'Meta description', ok: excerpt.length >= 50 },
    { label: 'Imagen principal', ok: !!imageUrl },
    { label: 'Al menos 3 etiquetas', ok: tags.length >= 3 },
    { label: 'SEO analizado', ok: seoScore !== null },
    { label: 'Legibilidad analizada', ok: readabilityScore !== null },
  ];

  const readyCount = checklist.filter(c => c.ok).length;

  return (
    <div className="space-y-4">
      {/* Pre-publish checklist */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary" /> Checklist pre-publicación
            <Badge variant="outline" className="ml-auto text-xs">{readyCount}/{checklist.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {checklist.map(item => (
            <div key={item.label} className="flex items-center gap-2 text-sm">
              {item.ok ? <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" /> : <XCircle className="h-4 w-4 text-red-400 shrink-0" />}
              <span className={item.ok ? 'text-foreground' : 'text-muted-foreground'}>{item.label}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Scores */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2"><BarChart3 className="h-4 w-4 text-primary" /> Puntuaciones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 rounded-lg bg-muted/30">
              <p className={`text-3xl font-bold ${scoreColor(seoScore)}`}>{seoScore ?? '—'}</p>
              <p className="text-xs text-muted-foreground mt-1">SEO Score</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/30">
              <p className={`text-3xl font-bold ${scoreColor(readabilityScore)}`}>{readabilityScore ?? '—'}</p>
              <p className="text-xs text-muted-foreground mt-1">Legibilidad</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status & featured */}
      <Card>
        <CardContent className="pt-4 space-y-3">
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
        </CardContent>
      </Card>

      {/* Related slugs */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2"><Link className="h-4 w-4 text-primary" /> Artículos relacionados</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            value={relatedSlugs.join(', ')}
            onChange={e => onRelatedSlugsChange(e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
            placeholder="slug-1, slug-2, slug-3"
            className="text-xs"
          />
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <Button variant="outline" className="flex-1" onClick={() => onSave(false)} disabled={saving}>
          <Save className="h-4 w-4 mr-1" /> {saving ? 'Guardando...' : 'Guardar borrador'}
        </Button>
        <Button className="flex-1" onClick={() => onSave(true)} disabled={saving}>
          <Send className="h-4 w-4 mr-1" /> {saving ? 'Publicando...' : 'Publicar'}
        </Button>
      </div>
    </div>
  );
}

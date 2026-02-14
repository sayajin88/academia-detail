import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Image as ImageIcon, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface Props {
  imageUrl: string;
  imageAlt: string;
  authorImage: string;
  onImageChange: (url: string) => void;
  onImageAltChange: (alt: string) => void;
  onAuthorImageChange: (url: string) => void;
}

export function BlogMediaPanel({ imageUrl, imageAlt, authorImage, onImageChange, onImageAltChange, onAuthorImageChange }: Props) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const uploadImage = async (file: File, type: 'main' | 'author') => {
    setUploading(true);
    try {
      const ext = file.name.split('.').pop();
      const path = `${type}/${Date.now()}.${ext}`;
      const { error } = await supabase.storage.from('blog-images').upload(path, file);
      if (error) throw error;
      const { data: urlData } = supabase.storage.from('blog-images').getPublicUrl(path);
      if (type === 'main') onImageChange(urlData.publicUrl);
      else onAuthorImageChange(urlData.publicUrl);
      toast({ title: 'Imagen subida correctamente' });
    } catch (e: unknown) {
      toast({ title: 'Error', description: e instanceof Error ? e.message : 'Error al subir', variant: 'destructive' });
    } finally { setUploading(false); }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) uploadImage(file, 'main');
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2"><ImageIcon className="h-4 w-4 text-primary" /> Imagen principal</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {imageUrl ? (
            <div className="relative group rounded-lg overflow-hidden">
              <img src={imageUrl} alt={imageAlt} className="w-full max-h-56 object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <label className="cursor-pointer">
                  <Button variant="secondary" size="sm" asChild><span><Upload className="h-4 w-4 mr-1" /> Cambiar imagen</span></Button>
                  <input type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && uploadImage(e.target.files[0], 'main')} />
                </label>
              </div>
            </div>
          ) : (
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${dragOver ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'}`}
              onDragOver={e => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
            >
              <Upload className="h-10 w-10 mx-auto text-muted-foreground/40 mb-3" />
              <p className="text-sm text-muted-foreground">Arrastra una imagen aquí</p>
              <p className="text-xs text-muted-foreground mt-1">o haz clic para seleccionar</p>
              <label className="cursor-pointer mt-3 inline-block">
                <Button variant="outline" size="sm" asChild><span>Seleccionar archivo</span></Button>
                <input type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && uploadImage(e.target.files[0], 'main')} />
              </label>
            </div>
          )}

          <div>
            <Label className="text-xs">URL de la imagen</Label>
            <Input value={imageUrl} onChange={e => onImageChange(e.target.value)} placeholder="https://..." className="text-xs" />
          </div>
          <div>
            <Label className="text-xs">Alt text (SEO)</Label>
            <Input value={imageAlt} onChange={e => onImageAltChange(e.target.value)} placeholder="Descripción de la imagen para SEO" className="text-xs" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2"><User className="h-4 w-4 text-primary" /> Imagen del autor</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-4">
            {authorImage ? (
              <img src={authorImage} alt="Autor" className="w-16 h-16 rounded-full object-cover border-2 border-muted" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center"><User className="h-6 w-6 text-muted-foreground" /></div>
            )}
            <div className="flex-1 space-y-2">
              <Input value={authorImage} onChange={e => onAuthorImageChange(e.target.value)} placeholder="URL de la imagen del autor" className="text-xs" />
              <label className="cursor-pointer">
                <Button variant="outline" size="sm" asChild disabled={uploading}><span><Upload className="h-3.5 w-3.5 mr-1" /> Subir foto</span></Button>
                <input type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && uploadImage(e.target.files[0], 'author')} />
              </label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

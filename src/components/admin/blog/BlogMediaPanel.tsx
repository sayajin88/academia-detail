import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Upload, Image as ImageIcon } from 'lucide-react';
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

  const uploadImage = async (file: File, type: 'main' | 'author') => {
    setUploading(true);
    try {
      const ext = file.name.split('.').pop();
      const path = `${type}/${Date.now()}.${ext}`;
      const { error } = await supabase.storage.from('blog-images').upload(path, file);
      if (error) throw error;
      const { data: urlData } = supabase.storage.from('blog-images').getPublicUrl(path);
      if (type === 'main') {
        onImageChange(urlData.publicUrl);
      } else {
        onAuthorImageChange(urlData.publicUrl);
      }
      toast({ title: 'Imagen subida correctamente' });
    } catch (e: unknown) {
      toast({ title: 'Error', description: e instanceof Error ? e.message : 'Error al subir', variant: 'destructive' });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Main image */}
      <Card className="p-4 space-y-3">
        <h4 className="font-semibold flex items-center gap-2"><ImageIcon className="h-4 w-4" /> Imagen principal</h4>
        {imageUrl && (
          <img src={imageUrl} alt={imageAlt} className="w-full max-h-48 object-cover rounded" />
        )}
        <div className="flex gap-2">
          <Input
            value={imageUrl}
            onChange={e => onImageChange(e.target.value)}
            placeholder="URL de la imagen"
          />
          <label className="cursor-pointer">
            <Button variant="outline" size="icon" asChild disabled={uploading}>
              <span><Upload className="h-4 w-4" /></span>
            </Button>
            <input type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && uploadImage(e.target.files[0], 'main')} />
          </label>
        </div>
        <div>
          <Label className="text-xs">Alt text (SEO)</Label>
          <Input value={imageAlt} onChange={e => onImageAltChange(e.target.value)} placeholder="Descripción de la imagen para SEO" />
        </div>
      </Card>

      {/* Author image */}
      <Card className="p-4 space-y-3">
        <h4 className="font-semibold">Imagen del autor</h4>
        {authorImage && (
          <img src={authorImage} alt="Autor" className="w-16 h-16 rounded-full object-cover" />
        )}
        <div className="flex gap-2">
          <Input
            value={authorImage}
            onChange={e => onAuthorImageChange(e.target.value)}
            placeholder="URL de la imagen del autor"
          />
          <label className="cursor-pointer">
            <Button variant="outline" size="icon" asChild disabled={uploading}>
              <span><Upload className="h-4 w-4" /></span>
            </Button>
            <input type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && uploadImage(e.target.files[0], 'author')} />
          </label>
        </div>
      </Card>
    </div>
  );
}

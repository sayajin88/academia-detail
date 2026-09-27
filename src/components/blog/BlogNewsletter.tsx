import { useState } from 'react';
import { Mail, ArrowRight, Check } from 'lucide-react';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const newsletterSchema = z.object({
  email: z.string().trim().email('Email no válido').max(255),
  name: z.string().trim().max(100).optional(),
});

interface BlogNewsletterProps {
  variant?: 'inline' | 'standalone';
}

export function BlogNewsletter({ variant = 'standalone' }: BlogNewsletterProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = newsletterSchema.safeParse({ email, name: name || undefined });
    if (!result.success) {
      toast({ title: 'Error', description: result.error.errors[0]?.message || 'Datos no válidos', variant: 'destructive' });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await (supabase.from('blog_newsletter_subscribers' as any) as any).upsert(
        { email: result.data.email, name: result.data.name || null },
        { onConflict: 'email' }
      );

      if (error) throw error;

      setIsSuccess(true);
      setEmail('');
      setName('');
      toast({ title: '¡Suscrito!', description: 'Te enviaremos los mejores artículos de detailing.' });
    } catch {
      toast({ title: 'Error', description: 'No se pudo completar la suscripción. Inténtalo de nuevo.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className={`bg-primary/5 border border-primary/20 rounded-xl p-6 md:p-8 text-center ${variant === 'inline' ? '' : 'max-w-2xl mx-auto'}`}>
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-brand mb-3">
          <Check className="h-6 w-6" />
        </div>
        <h4 className="text-lg font-bold text-foreground mb-1" style={{ fontFamily: "'Open Sans', sans-serif", textTransform: 'none', letterSpacing: 'normal' }}>
          ¡Bienvenido al blog!
        </h4>
        <p className="text-sm text-muted-foreground">Recibirás nuestros mejores artículos directamente en tu bandeja.</p>
      </div>
    );
  }

  return (
    <div className={`bg-card border border-border rounded-xl p-6 md:p-8 ${variant === 'inline' ? '' : 'max-w-2xl mx-auto'}`}>
      <div className="flex items-center gap-2 mb-3">
        <div className="p-2 rounded-lg bg-primary/10 text-brand">
          <Mail className="h-5 w-5" />
        </div>
        <h4 className="text-lg font-bold text-foreground" style={{ fontFamily: "'Open Sans', sans-serif", textTransform: 'none', letterSpacing: 'normal' }}>
          Newsletter de Detailing
        </h4>
      </div>
      <p className="text-sm text-muted-foreground mb-5">
        Recibe guías exclusivas, consejos de negocio y las últimas tendencias del sector directamente en tu email.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Tu nombre (opcional)"
          aria-label="Tu nombre"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={100}
          className="flex-1 px-4 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
        />
        <input
          type="email"
          placeholder="tu@email.com"
          aria-label="Tu email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          maxLength={255}
          className="flex-1 px-4 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-6 whitespace-nowrap"
        >
          {isSubmitting ? 'Enviando...' : 'Suscribirme'}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>
      <p className="text-xs text-muted-foreground/50 mt-3">Sin spam. Cancela cuando quieras.</p>
    </div>
  );
}

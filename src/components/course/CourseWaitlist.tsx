import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Section } from '@/components/ds/Section';
import { supabase } from '@/integrations/supabase/client';

/** Lista de espera de un curso en preparación (sin ventana emergente). */
export function CourseWaitlist({ slug, name }: { slug: string; name: string }) {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('sending');
    const { error } = await supabase
      .from('coming_soon_subscribers')
      .insert({ email, name: fullName || null, formation_slug: slug });
    if (error && error.code !== '23505') {
      setStatus('idle');
      toast.error('No se ha podido guardar. Inténtalo de nuevo o escríbenos por WhatsApp.');
      return;
    }
    setStatus('done');
  };

  return (
    <Section id="lista-espera" tone="card" width="narrow" aria-labelledby="espera-title">
      <div className="ds-card border-primary/40 bg-background p-6 text-center md:p-10">
        {status === 'done' ? (
          <div className="flex flex-col items-center gap-3" role="status">
            <CheckCircle2 className="h-10 w-10 text-brand" aria-hidden="true" />
            <h2 id="espera-title" className="ds-h2 text-foreground">Te avisaremos</h2>
            <p className="text-muted-foreground">En cuanto abramos plazas del {name.toLowerCase()} te escribimos a {email}.</p>
          </div>
        ) : (
          <>
            <p className="ds-eyebrow">Lista de espera</p>
            <h2 id="espera-title" className="ds-h2 mt-3 text-foreground">Avísame cuando abráis plazas</h2>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">
              Estamos preparando este curso. Déjanos tu email y serás de los primeros en saber las fechas.
            </p>
            <form onSubmit={submit} className="mx-auto mt-8 grid max-w-md gap-4 text-left">
              <div className="grid gap-1.5">
                <Label htmlFor="espera-nombre">Nombre (opcional)</Label>
                <Input id="espera-nombre" value={fullName} onChange={(e) => setFullName(e.target.value)} autoComplete="name" />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="espera-email">Email</Label>
                <Input id="espera-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
              </div>
              <Button type="submit" size="lg" className="h-12 text-base font-semibold" disabled={status === 'sending'}>
                {status === 'sending' && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
                Apuntarme a la lista
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Solo te escribiremos para avisarte de este curso. <Link to="/politica-privacidad" className="underline">Política de privacidad</Link>.
              </p>
            </form>
          </>
        )}
      </div>
    </Section>
  );
}

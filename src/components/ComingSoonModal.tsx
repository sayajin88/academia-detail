import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Construction, Bell, ArrowLeft, CheckCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ComingSoonModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formationTitle: string;
  formationSlug: string;
}

export function ComingSoonModal({ 
  open, 
  onOpenChange, 
  formationTitle,
  formationSlug 
}: ComingSoonModalProps) {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const handleViewOtherFormations = () => {
    onOpenChange(false);
    navigate('/#formaciones');
  };

  const handleNotifyMe = () => {
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email) {
      toast.error('Por favor, introduce tu email');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('coming_soon_subscribers')
        .insert({
          email: formData.email,
          name: formData.name || null,
          formation_slug: formationSlug
        });

      if (error) {
        if (error.code === '23505') {
          toast.info('Ya estás suscrito para recibir novedades de esta formación');
        } else {
          throw error;
        }
      } else {
        setIsSubmitted(true);
        toast.success('¡Perfecto! Te avisaremos cuando esté disponible');
      }
    } catch (error) {
      console.error('Error subscribing:', error);
      toast.error('Ha ocurrido un error. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setShowForm(false);
    setIsSubmitted(false);
    setFormData({ name: '', email: '' });
  };

  return (
    <AlertDialog open={open} onOpenChange={handleClose}>
      <AlertDialogContent className="sm:max-w-md bg-detail-black border-detail-gold/20">
        <AlertDialogHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center">
            {isSubmitted ? (
              <CheckCircle className="h-8 w-8 text-green-500" />
            ) : (
              <Construction className="h-8 w-8 text-amber-500" />
            )}
          </div>
          
          <AlertDialogTitle className="text-2xl font-bold text-white text-center">
            {isSubmitted ? '¡Suscripción Confirmada!' : 'Formación en Desarrollo'}
          </AlertDialogTitle>
          
          <AlertDialogDescription className="text-detail-silver text-center text-base">
            {isSubmitted ? (
              <>
                Te avisaremos por email cuando la formación de <span className="text-detail-gold font-medium">{formationTitle}</span> esté disponible.
              </>
            ) : showForm ? (
              <>
                Déjanos tus datos y te avisaremos cuando la formación de <span className="text-detail-gold font-medium">{formationTitle}</span> esté lista.
              </>
            ) : (
              <>
                Estamos preparando la formación de <span className="text-detail-gold font-medium">{formationTitle}</span> con todo el detalle que merece. Muy pronto estará disponible.
              </>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {showForm && !isSubmitted && (
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">Nombre (opcional)</Label>
              <Input
                id="name"
                type="text"
                placeholder="Tu nombre"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="bg-detail-black/50 border-detail-gold/30 text-white placeholder:text-detail-silver/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="bg-detail-black/50 border-detail-gold/30 text-white placeholder:text-detail-silver/50"
              />
            </div>
          </form>
        )}

        <AlertDialogFooter className="flex-col sm:flex-row gap-3">
          {isSubmitted ? (
            <>
              <Button
                variant="outline"
                onClick={handleViewOtherFormations}
                className="w-full border-detail-gold/30 text-detail-gold hover:bg-detail-gold/10"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Ver Otras Formaciones
              </Button>
              <Button
                onClick={handleClose}
                className="w-full bg-detail-gold text-detail-black hover:bg-detail-gold/90"
              >
                Cerrar
              </Button>
            </>
          ) : showForm ? (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowForm(false)}
                className="w-full border-detail-gold/30 text-detail-gold hover:bg-detail-gold/10"
              >
                Volver
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-detail-gold text-detail-black hover:bg-detail-gold/90"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Bell className="mr-2 h-4 w-4" />
                    Avisarme
                  </>
                )}
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={handleViewOtherFormations}
                className="w-full border-detail-gold/30 text-detail-gold hover:bg-detail-gold/10"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Ver Otras Formaciones
              </Button>
              <Button
                onClick={handleNotifyMe}
                className="w-full bg-detail-gold text-detail-black hover:bg-detail-gold/90"
              >
                <Bell className="mr-2 h-4 w-4" />
                Avisarme cuando esté lista
              </Button>
            </>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

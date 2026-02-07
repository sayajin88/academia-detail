import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { CheckCircle2, MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContactSuccessModalProps {
  open: boolean;
  onClose: () => void;
}

const ContactSuccessModal = ({ open, onClose }: ContactSuccessModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md text-center">
        {/* Icono de éxito animado */}
        <div className="mx-auto w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 className="w-12 h-12 text-green-500 animate-pulse" />
        </div>
        
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">
            ¡Solicitud Enviada! 🎉
          </DialogTitle>
          <DialogDescription className="text-center text-base mt-4">
            Hemos recibido tu mensaje correctamente.{" "}
            <strong>Nos pondremos en contacto contigo en menos de 24 horas.</strong>
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-6 space-y-4">
          <p className="text-muted-foreground">
            Si necesitas más información inmediata, puedes contactarnos por:
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {/* WhatsApp */}
            <Button 
              variant="outline" 
              className="gap-2 border-green-500 text-green-600 hover:bg-green-500/10 hover:text-green-600"
              asChild
            >
              <a 
                href="https://wa.me/34622773555" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </a>
            </Button>
            
            {/* Email */}
            <Button 
              variant="outline" 
              className="gap-2"
              asChild
            >
              <a href="mailto:info@detailpark.es">
                <Mail className="w-5 h-5" />
                info@detailpark.es
              </a>
            </Button>
          </div>
        </div>
        
        <Button 
          onClick={onClose} 
          variant="default" 
          className="mt-6 w-full"
        >
          Cerrar
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ContactSuccessModal;

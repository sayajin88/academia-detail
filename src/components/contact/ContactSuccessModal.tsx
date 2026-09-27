import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { CheckCircle2, MessageCircle, Instagram, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContactSuccessModalProps {
  open: boolean;
  onClose: () => void;
}

const ContactSuccessModal = ({ open, onClose }: ContactSuccessModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden">
        {/* Gradient header */}
        <div className="relative bg-gradient-to-br from-primary/20 via-primary/10 to-transparent pt-10 pb-6 px-6 text-center">
          {/* Decorative circles */}
          <div className="absolute top-4 left-6 w-16 h-16 rounded-full bg-primary/10 blur-xl" aria-hidden="true" />
          <div className="absolute top-8 right-10 w-10 h-10 rounded-full bg-primary/15 blur-lg" aria-hidden="true" />
          <div className="absolute bottom-2 left-1/3 w-8 h-8 rounded-full bg-primary/10 blur-md" aria-hidden="true" />

          {/* Success icon */}
          <div className="relative mx-auto w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-5 animate-scale-in">
            <div className="w-20 h-20 bg-green-500/30 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
            </div>
          </div>

          <DialogHeader>
            <DialogTitle className="text-2xl sm:text-3xl text-center font-bold">
              ¡Solicitud Enviada! 🎉
            </DialogTitle>
            <DialogDescription className="text-center text-base sm:text-lg mt-3 text-muted-foreground">
              En las próximas <strong className="text-foreground">48 horas</strong> nos pondremos en contacto contigo.
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Content */}
        <div className="px-6 pb-6 space-y-5">
          {/* WhatsApp CTA */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-3">
              ¿Necesitas una respuesta más rápida?
            </p>
            <Button
              variant="outline"
              size="lg"
              className="gap-2 border-green-500 text-green-600 hover:bg-green-500/10 hover:text-green-600 w-full sm:w-auto min-h-[48px]"
              asChild
            >
              <a
                href="https://wa.me/34622773555"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5" />
                Escríbenos por WhatsApp
              </a>
            </Button>
          </div>

          {/* Social links */}
          <div className="border-t border-border pt-5">
            <p className="text-sm text-muted-foreground text-center mb-3">
              Síguenos en redes sociales
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://www.instagram.com/detailparkoficial/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 min-h-[48px] rounded-lg bg-muted/50 hover:bg-muted transition-colors text-sm font-medium"
              >
                <Instagram className="w-5 h-5 text-pink-500" />
                @detailparkoficial
              </a>
              <a
                href="https://www.instagram.com/danidetailoficial/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 min-h-[48px] rounded-lg bg-muted/50 hover:bg-muted transition-colors text-sm font-medium"
              >
                <Instagram className="w-5 h-5 text-pink-500" />
                @danidetailoficial
              </a>
            </div>
          </div>

          {/* Detail Park link */}
          <a
            href="https://detailpark.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 rounded-lg bg-primary/5 border border-primary/20 hover:border-primary/40 transition-all group"
          >
            <div>
              <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                Visita Detail Park
              </p>
              <p className="text-xs text-muted-foreground">www.detailpark.com</p>
            </div>
            <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </a>

          {/* Close button */}
          <Button
            onClick={onClose}
            variant="default"
            className="w-full min-h-[48px]"
          >
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactSuccessModal;

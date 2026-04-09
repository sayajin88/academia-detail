import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2, MailX } from "lucide-react";

type Status = "loading" | "valid" | "already" | "invalid" | "success" | "error";

const Unsubscribe = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<Status>("loading");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      return;
    }

    const validate = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${token}`,
          { headers: { apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY } }
        );
        const data = await res.json();
        if (res.ok && data.valid) setStatus("valid");
        else if (data.reason === "already_unsubscribed") setStatus("already");
        else setStatus("invalid");
      } catch {
        setStatus("error");
      }
    };
    validate();
  }, [token]);

  const handleUnsubscribe = async () => {
    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("handle-email-unsubscribe", {
        body: { token },
      });
      if (error) throw error;
      if (data?.success) setStatus("success");
      else if (data?.reason === "already_unsubscribed") setStatus("already");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-card border border-border rounded-2xl p-8 text-center shadow-lg">
        {/* Logo */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground">DETAIL PARK</h2>
          <p className="text-xs tracking-[3px] text-muted-foreground uppercase">Academy</p>
        </div>

        {status === "loading" && (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <p className="text-muted-foreground">Verificando enlace…</p>
          </div>
        )}

        {status === "valid" && (
          <div className="flex flex-col items-center gap-4">
            <MailX className="w-12 h-12 text-muted-foreground" />
            <h3 className="text-lg font-semibold text-foreground">¿Deseas darte de baja?</h3>
            <p className="text-sm text-muted-foreground">
              Ya no recibirás emails de Detail Park Academy. Esta acción no se puede deshacer.
            </p>
            <Button onClick={handleUnsubscribe} disabled={submitting} variant="destructive" className="mt-2">
              {submitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              Confirmar baja
            </Button>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center gap-4">
            <CheckCircle className="w-12 h-12 text-green-500" />
            <h3 className="text-lg font-semibold text-foreground">Te has dado de baja</h3>
            <p className="text-sm text-muted-foreground">
              No recibirás más emails de nuestra parte. Si cambias de opinión, contacta con nosotros.
            </p>
          </div>
        )}

        {status === "already" && (
          <div className="flex flex-col items-center gap-4">
            <CheckCircle className="w-12 h-12 text-muted-foreground" />
            <h3 className="text-lg font-semibold text-foreground">Ya estás dado de baja</h3>
            <p className="text-sm text-muted-foreground">
              Tu dirección de email ya fue eliminada de nuestra lista.
            </p>
          </div>
        )}

        {(status === "invalid" || status === "error") && (
          <div className="flex flex-col items-center gap-4">
            <XCircle className="w-12 h-12 text-destructive" />
            <h3 className="text-lg font-semibold text-foreground">Enlace no válido</h3>
            <p className="text-sm text-muted-foreground">
              Este enlace ha caducado o no es válido. Si necesitas ayuda, escríbenos a{" "}
              <a href="mailto:info@academiadetail.com" className="text-primary hover:underline">
                info@academiadetail.com
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Unsubscribe;

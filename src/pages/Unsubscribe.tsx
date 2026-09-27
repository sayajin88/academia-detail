import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import academiaLogo from "@/assets/academia-detail-logo-light.png";
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
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Helmet>
        <title>Darse de baja | Academia Detail</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="ds-card w-full max-w-md p-6 text-center md:p-8">
        <Link to="/" className="mb-8 inline-block" aria-label="Academia Detail, ir al inicio">
          <img src={academiaLogo} alt="Academia Detail" className="mx-auto h-8 w-auto brightness-0 invert" />
        </Link>

        {status === "loading" && (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 text-brand animate-spin" />
            <p className="text-muted-foreground">Verificando enlace…</p>
          </div>
        )}

        {status === "valid" && (
          <div className="flex flex-col items-center gap-4">
            <MailX className="w-12 h-12 text-muted-foreground" />
            <h1 className="font-heading text-3xl uppercase text-foreground">¿Deseas darte de baja?</h1>
            <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">
              Ya no recibirás emails de Academia Detail. Esta acción no se puede deshacer.
            </p>
            <Button onClick={handleUnsubscribe} disabled={submitting} variant="destructive" className="mt-2">
              {submitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              Confirmar baja
            </Button>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center gap-4">
            <CheckCircle className="w-12 h-12 text-brand" aria-hidden="true" />
            <h1 className="font-heading text-3xl uppercase text-foreground">Te has dado de baja</h1>
            <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">
              No recibirás más emails de nuestra parte. Si cambias de opinión, contacta con nosotros.
            </p>
          </div>
        )}

        {status === "already" && (
          <div className="flex flex-col items-center gap-4">
            <CheckCircle className="w-12 h-12 text-muted-foreground" />
            <h1 className="font-heading text-3xl uppercase text-foreground">Ya estás dado de baja</h1>
            <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">
              Tu dirección de email ya fue eliminada de nuestra lista.
            </p>
          </div>
        )}

        {(status === "invalid" || status === "error") && (
          <div className="flex flex-col items-center gap-4">
            <XCircle className="w-12 h-12 text-destructive" />
            <h1 className="font-heading text-3xl uppercase text-foreground">Enlace no válido</h1>
            <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">
              Este enlace ha caducado o no es válido. Si necesitas ayuda, escríbenos a{" "}
              <a href="mailto:info@academiadetail.com" className="text-brand hover:underline">
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

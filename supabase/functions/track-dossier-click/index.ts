import { createClient } from "npm:@supabase/supabase-js@2.78.0";

const DOSSIER_PDF_URL =
  "https://ncsatssbhqicptmivmqk.supabase.co/storage/v1/object/public/blog-images/dossiers/programa-formativo-academia-detail.pdf";

const handler = async (req: Request): Promise<Response> => {
  const url = new URL(req.url);
  const token = url.searchParams.get("token");

  if (token) {
    try {
      const supabase = createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      );

      // Solo actualiza la primera vez (no sobreescribe el primer clic)
      await supabase
        .from("contact_submissions")
        .update({ dossier_clicked_at: new Date().toISOString() })
        .eq("tracking_token", token)
        .is("dossier_clicked_at", null);

      console.log("Dossier click tracked for token:", token);
    } catch (err) {
      console.error("Error tracking dossier click:", err);
      // No bloqueamos al usuario aunque falle el tracking
    }
  }

  // Redirige al PDF en cualquier caso (con o sin token válido)
  return new Response(null, {
    status: 302,
    headers: {
      Location: DOSSIER_PDF_URL,
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  });
};

Deno.serve(handler);

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

async function sha256hex(message: string): Promise<string> {
  const data = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

serve(async (req) => {
  const cors = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: cors });
  }

  try {
    const body = await req.json();
    const amount = Number(body.amount || 297);
    const currency = "EUR";
    const orderNumber = `ORD-${Date.now()}`;
    const transactionId = `TXN-${Date.now()}`;

    const apiKey = (Deno.env.get("VIABILL_API_KEY") || "").trim();
    const secret = (Deno.env.get("VIABILL_SECRET") || "").trim();
    const testMode = true;

    const successUrl = "https://academiadetail.com/pago-exitoso";
    const cancelUrl = "https://academiadetail.com/pago-cancelado";
    const callbackUrl = "https://academiadetail.com/api/viabill-callback";

    const hashString = `${apiKey}#${amount}#${currency}#${transactionId}#${orderNumber}#${successUrl}#${cancelUrl}#${secret}${testMode ? "#test" : ""}`;
    const sha256check = await sha256hex(hashString);

    console.log(">>> FORM-URLENCODED VERSION <<<");
    console.log("apiKey length:", apiKey.length);
    console.log("secret length:", secret.length);
    console.log("amount:", amount);
    console.log("orderNumber:", orderNumber);
    console.log("transactionId:", transactionId);
    console.log("sha256check:", sha256check);

    const formData = new URLSearchParams();
    formData.append("protocol", "V3");
    formData.append("apikey", apiKey);
    formData.append("orderNumber", orderNumber);
    formData.append("amount", String(amount));
    formData.append("currency", currency);
    formData.append("transaction", transactionId);
    formData.append("sha256check", sha256check);
    formData.append("successUrl", successUrl);
    formData.append("cancelUrl", cancelUrl);
    formData.append("callbackUrl", callbackUrl);
    if (testMode) formData.append("test", "true");

    console.log("form body:", formData.toString());

    const response = await fetch("https://secure.viabill.com/api/checkout-authorize/addon/CUSTOM", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: formData.toString(),
      redirect: "manual",
    });

    let result: unknown = null;
    try {
      result = await response.json();
    } catch {
      result = null;
    }
    const redirectUrl = response.headers.get("location");

    console.log("ViaBill status:", response.status);
    console.log("ViaBill redirect:", redirectUrl);
    console.log("ViaBill result:", JSON.stringify(result));

    if (response.status >= 400) {
      return new Response(JSON.stringify({ error: "Error ViaBill", details: result }), {
        status: response.status,
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ redirectUrl: redirectUrl, status: response.status }), {
      headers: { ...cors, "Content-Type": "application/json" },
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("ERROR:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }
});

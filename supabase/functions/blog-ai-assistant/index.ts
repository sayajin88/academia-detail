import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SITE_CONTEXT = `
Eres el asistente de redacción de Academia Detail, la escuela líder en formación de detailing profesional en España.
Web: https://academiadetail.com

Rutas internas para enlaces:
- /curso-detailing-profesional — Curso de Detailing Profesional
- /curso-vinilado-vehiculos — Curso de Car Wrapping / Vinilado
- /curso-ppf-proteccion-pintura — Curso de PPF (Paint Protection Film)
- /curso-restauracion-vehiculos — Curso de Restauración de Vehículos
- /formacion-profesional-detailing — Carrera Profesional en Detailing
- /curso-detailing-iniciacion — Jornadas Intensivas de Iniciación
- /jornada-zero-detailing — Jornada Zero (experiencia gratuita)
- /quienes-somos — Sobre Nosotros
- /contacto — Contacto
- /blog — Blog
- /glosario-detailing — Glosario de Detailing
- /calculadora-dilucion-detailing — Calculadora de Dilución
- /centros-detailing-espana — Directorio de Centros

Directrices de estilo:
- Tono profesional pero cercano, tutea al lector
- Usa datos concretos y cifras reales
- Incluye tablas cuando haya comparativas numéricas
- Usa enlaces internos con formato [[texto del enlace|/ruta]]
- Escribe en español de España
- Orientado a SEO: incluye la keyword principal en el primer párrafo
- Formato: párrafos de 2-4 frases máximo
`;

type Action = 
  | "generate-outline"
  | "write-section"
  | "seo-analysis"
  | "readability-analysis"
  | "suggest-keywords"
  | "fact-check"
  | "suggest-meta"
  | "improve-section";

function getPrompt(action: Action, data: Record<string, unknown>): { system: string; user: string } {
  const base = SITE_CONTEXT;

  switch (action) {
    case "generate-outline":
      return {
        system: base + "\nGenera un outline de artículo de blog con secciones bien estructuradas para SEO.",
        user: `Genera un outline para un artículo de blog con:
Título: ${data.title}
Categoría: ${data.category}
Keywords objetivo: ${data.keywords || ""}

Responde con un JSON array de objetos con campos: id (slug), title (título de la sección), description (breve descripción del contenido de 1 frase).
Genera entre 5 y 8 secciones. La primera debe ser introductoria y la última un CTA o conclusión.
Responde SOLO con el JSON array, sin markdown ni explicaciones.`
      };

    case "write-section":
      return {
        system: base + "\nEscribe contenido de alta calidad para secciones de artículos de blog.",
        user: `Escribe el contenido para esta sección de un artículo:
Título del artículo: ${data.articleTitle}
Título de la sección: ${data.sectionTitle}
Descripción de la sección: ${data.sectionDescription || ""}
Categoría: ${data.category}
Keywords: ${data.keywords || ""}
Contexto (otras secciones del artículo): ${data.context || ""}

Escribe 2-4 párrafos de contenido rico, con datos concretos. Si es apropiado, sugiere una tabla con formato JSON: {"headers": [...], "rows": [[...], ...], "caption": "..."}.
Usa [[texto|/ruta]] para enlaces internos cuando sea natural.
Responde SOLO con el texto del contenido (y opcionalmente la tabla en JSON al final marcada con ===TABLE=== antes del JSON).`
      };

    case "seo-analysis":
      return {
        system: base + "\nEres un experto en SEO on-page y off-page para blogs de nicho.",
        user: `Analiza el SEO de este artículo:
Título: ${data.title}
Excerpt: ${data.excerpt}
Tags: ${JSON.stringify(data.tags)}
Secciones: ${JSON.stringify(data.sections)}

Responde con un JSON con:
{
  "score": <número 0-100>,
  "onPage": [{"issue": "...", "severity": "high|medium|low", "suggestion": "..."}],
  "offPage": [{"suggestion": "...", "priority": "high|medium|low"}],
  "internalLinks": [{"text": "...", "href": "...", "context": "en qué sección insertarlo"}]
}
Responde SOLO con el JSON.`
      };

    case "readability-analysis":
      return {
        system: base + "\nEres un experto en legibilidad y UX de contenido web en español.",
        user: `Analiza la legibilidad de este contenido:
${data.content}

Responde con un JSON:
{
  "score": <número 0-100>,
  "avgSentenceLength": <número>,
  "passiveVoicePercentage": <número>,
  "technicalLevel": "bajo|medio|alto",
  "suggestions": [{"section": "...", "issue": "...", "suggestion": "..."}]
}
Responde SOLO con el JSON.`
      };

    case "suggest-keywords":
      return {
        system: base + "\nEres un experto en keyword research para SEO en español.",
        user: `Sugiere keywords y enlaces internos para:
Título: ${data.title}
Categoría: ${data.category}

Responde con JSON:
{
  "primaryKeyword": "...",
  "secondaryKeywords": ["..."],
  "longTailKeywords": ["..."],
  "internalLinks": [{"text": "...", "href": "...", "relevance": "alta|media"}]
}
Responde SOLO con el JSON.`
      };

    case "fact-check":
      return {
        system: base + "\nEres un fact-checker experto en la industria del detailing automotriz.",
        user: `Verifica las afirmaciones de este contenido:
${data.content}

Responde con JSON array:
[{"claim": "...", "confidence": "high|medium|low", "note": "..."}]
Responde SOLO con el JSON array.`
      };

    case "suggest-meta":
      return {
        system: base + "\nEres un experto en meta tags SEO optimizados para CTR.",
        user: `Genera meta tags optimizados para:
Título: ${data.title}
Contenido resumido: ${data.content?.toString().slice(0, 500)}

Responde con JSON:
{
  "metaTitle": "... (máx 60 chars)",
  "metaDescription": "... (máx 155 chars)",
  "ogTitle": "...",
  "ogDescription": "..."
}
Responde SOLO con el JSON.`
      };

    case "improve-section":
      return {
        system: base + "\nMejora contenido existente según instrucciones específicas.",
        user: `Mejora esta sección:
Contenido actual: ${data.content}
Instrucción: ${data.instruction}

Responde SOLO con el contenido mejorado, sin explicaciones.`
      };
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, data } = await req.json() as { action: Action; data: Record<string, unknown> };
    
    if (!action || !data) {
      return new Response(JSON.stringify({ error: "action and data are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const { system, user } = getPrompt(action, data);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please wait a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please top up." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      throw new Error("AI gateway error");
    }

    const result = await response.json();
    const content = result.choices?.[0]?.message?.content || "";

    return new Response(JSON.stringify({ result: content }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("blog-ai-assistant error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

// TEMPORAL (migración 27-09-2026): copia los archivos públicos de Lovable Cloud a este proyecto.
// Idempotente (upsert). Borrar esta carpeta y la función en Supabase al terminar la migración.
import { createClient } from "npm:@supabase/supabase-js@2";

const OLD = "https://ncsatssbhqicptmivmqk.supabase.co/storage/v1/object/public/";
const FILES: [string, string, string, number][] = [["directory-uploads","logos/1770930824186-2 -DETAIL PARK LOGO FONDO BLANCO.jpg","image/jpeg",254306],["directory-uploads","gallery/1770930824186-28.png","image/png",449942],["directory-uploads","gallery/1770930824186-IMG-20191215-WA0015.jpg","image/jpeg",359490],["directory-uploads","gallery/1770930824186-DSC00727.jpg","image/jpeg",753203],["directory-uploads","logos/1771065203019-IMG_9036.png","image/png",285629],["directory-uploads","logos/d5a45371-6972-4aa7-b35b-01b461877bf2-1771066022721.png","image/png",229470],["directory-uploads","photos/1771067277152-Captura de pantalla 2026-02-14 114408.png","image/png",229470],["directory-uploads","photos/b6bf0f92-0510-41fe-8791-8d1b824e2b9c-1771068439643.jpg","image/jpeg",87381],["directory-uploads","photos/b6bf0f92-0510-41fe-8791-8d1b824e2b9c-1771068844851.jpg","image/jpeg",87381],["directory-uploads","gallery/b6bf0f92-0510-41fe-8791-8d1b824e2b9c-1771069463872.png","image/png",665817],["directory-uploads","gallery/b6bf0f92-0510-41fe-8791-8d1b824e2b9c-1771069465136.png","image/png",1023620],["directory-uploads","gallery/b6bf0f92-0510-41fe-8791-8d1b824e2b9c-1771069466491.png","image/png",635464],["directory-uploads","gallery/b6bf0f92-0510-41fe-8791-8d1b824e2b9c-1771069467337.png","image/png",449942],["directory-uploads","gallery/b6bf0f92-0510-41fe-8791-8d1b824e2b9c-1771069539623.png","image/png",665817],["directory-uploads","gallery/b6bf0f92-0510-41fe-8791-8d1b824e2b9c-1771069540484.png","image/png",1023620],["directory-uploads","gallery/b6bf0f92-0510-41fe-8791-8d1b824e2b9c-1771069540858.png","image/png",817814],["directory-uploads","gallery/b6bf0f92-0510-41fe-8791-8d1b824e2b9c-1771069541945.png","image/png",574767],["directory-uploads","gallery/b6bf0f92-0510-41fe-8791-8d1b824e2b9c-1771069542976.png","image/png",635464],["blog-images","seo/elegir-pulidora.jpg","image/jpeg",77459],["directory-uploads","gallery/b6bf0f92-0510-41fe-8791-8d1b824e2b9c-1771069543414.png","image/png",449942],["directory-uploads","gallery/b6bf0f92-0510-41fe-8791-8d1b824e2b9c-1771069544013.png","image/png",431210],["directory-uploads","gallery/b6bf0f92-0510-41fe-8791-8d1b824e2b9c-1771069545160.png","image/png",644718],["blog-images","main/1771084143040.JPG","image/jpeg",5232971],["blog-images","seo/cuanto-gana-detailer.jpg","image/jpeg",111024],["blog-images","seo/curso-online-vs-presencial.jpg","image/jpeg",79108],["blog-images","seo/cuidar-coche-ceramico.jpg","image/jpeg",85672],["blog-images","seo/restauracion-tapicerias.jpg","image/jpeg",63346],["blog-images","seo/curso-pulido-profesional.jpg","image/jpeg",64728],["blog-images","seo/que-es-detailing-negocio.jpg","image/jpeg",115679],["blog-images","seo/subvenciones-ayudas.jpg","image/jpeg",117057],["blog-images","seo/curso-detailing-madrid.jpg","image/jpeg",72748],["blog-images","seo/tapizado-asientos.jpg","image/jpeg",86265],["directory-uploads","photos/1774882203784-foto.jpg","image/jpeg",867493],["blog-images","email-assets/academia-detail-logo.png","image/png",57447],["blog-images","dossiers/programa-formativo-academia-detail.pdf","application/pdf",2138065]];

Deno.serve(async () => {
  const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const out: { name: string; ok: boolean; got?: number; expected?: number; error?: string }[] = [];
  for (const [bucket, name, type, size] of FILES) {
    const url = OLD + bucket + "/" + name.split("/").map(encodeURIComponent).join("/");
    const r = await fetch(url);
    if (!r.ok) {
      out.push({ name, ok: false, error: "GET " + r.status });
      continue;
    }
    const bytes = new Uint8Array(await r.arrayBuffer());
    const { error } = await sb.storage.from(bucket).upload(name, bytes, { contentType: type, upsert: true });
    out.push({ name, ok: !error && bytes.length === size, got: bytes.length, expected: size, error: error?.message });
  }
  return Response.json({ total: FILES.length, ok: out.filter((o) => o.ok).length, results: out });
});

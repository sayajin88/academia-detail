import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const container = document.getElementById("root")!;
const prerendered = container.dataset.prerendered;
const here = location.pathname.replace(/\/+$/, "") || "/";

if (prerendered === undefined) {
  createRoot(container).render(<App />);
} else if (prerendered !== here) {
  // Página pre-renderizada de otra URL (no debería pasar): se descarta.
  container.textContent = "";
  delete container.dataset.prerendered;
  createRoot(container).render(<App />);
} else {
  bootOverPrerendered(container);
}

/**
 * La página llega pre-renderizada (scripts/prerender-head.mjs) para los bots que no
 * ejecutan JavaScript. React no la «hidrata» (las rutas son perezosas y no saldría igual):
 * pinta su copia en un contenedor oculto encima y, cuando ya tiene la página entera,
 * se quita la estática. Así no se ve el «Cargando…» entre medias.
 */
function bootOverPrerendered(staticPage: HTMLElement) {
  staticPage.id = "prerendered";
  const app = document.createElement("div");
  app.id = "root";
  app.style.cssText = "position:absolute;top:0;left:0;right:0;visibility:hidden;pointer-events:none";
  staticPage.after(app);

  const textLength = (el: HTMLElement) => (el.textContent ?? "").replace(/\s+/g, "").length;
  const expected = textLength(staticPage);
  // Lista: sin el «Cargando…» de las rutas y con casi todo el texto (las páginas con datos,
  // como el blog, tardan un poco más en tenerlo).
  const ready = () => !app.querySelector("[data-page-fallback]") && textLength(app) >= expected * 0.85;

  let shown = false;
  const show = (timedOut = false) => {
    if (shown) return;
    shown = true;
    // Para medir: performance.getEntriesByName("prerender-swap").
    performance.mark("prerender-swap", { detail: { timedOut } });
    observer.disconnect();
    window.clearTimeout(timer);
    staticPage.remove();
    app.removeAttribute("style");
  };
  // React aplica cada cambio de una vez, así que se puede cambiar en cuanto está lista.
  const observer = new MutationObserver(() => {
    if (ready()) show();
  });
  observer.observe(app, { childList: true, subtree: true, characterData: true });
  // Por si la página cambia de verdad (datos nuevos), no se espera más de 5 s.
  const timer = window.setTimeout(() => show(true), 5000);

  createRoot(app).render(<App />);
}

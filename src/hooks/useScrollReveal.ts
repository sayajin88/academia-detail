import { useEffect } from 'react';

// Elementos que aparecen al hacer scroll: los marcados y todas las tarjetas y marcos de foto
const REVEAL_SELECTOR = '.ds-reveal, .ds-card, .ds-frame';

/**
 * Aparición suave de los elementos `.ds-reveal` al entrar en pantalla.
 * - Solo se ocultan los que están por debajo de la pantalla en el momento de montarse
 *   (lo visible nunca parpadea) y se muestran al acercarse.
 * - Sin JavaScript, sin IntersectionObserver o con «movimiento reducido», todo se ve siempre.
 * - Vigila también lo que llega más tarde (secciones con carga diferida).
 */
export function useScrollReveal() {
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const seen = new WeakSet<Element>();

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          io.unobserve(el);
          el.classList.add('ds-reveal-in');
          el.classList.remove('ds-reveal-pending');
          window.setTimeout(() => {
            el.classList.remove('ds-reveal-in');
            el.style.transitionDelay = '';
          }, 1200);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
    );

    const prepare = (el: Element) => {
      if (seen.has(el)) return;
      seen.add(el);
      const rect = el.getBoundingClientRect();
      // Ya visible (o por encima): se deja tal cual.
      if (rect.top < window.innerHeight * 0.92) return;
      const html = el as HTMLElement;
      // Escalonado suave entre hermanos (tarjetas de una misma rejilla)
      const siblings = el.parentElement ? Array.from(el.parentElement.children).filter((c) => c.matches(REVEAL_SELECTOR)) : [];
      const index = Math.max(0, siblings.indexOf(el));
      html.style.transitionDelay = `${Math.min(index, 4) * 80}ms`;
      html.classList.add('ds-reveal-pending');
      io.observe(el);
    };

    const scan = (root: ParentNode) => {
      root.querySelectorAll(REVEAL_SELECTOR).forEach(prepare);
    };

    scan(document);
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((n) => {
          if (n.nodeType !== 1) return;
          const el = n as Element;
          if (el.matches(REVEAL_SELECTOR)) prepare(el);
          scan(el);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      io.disconnect();
      document.querySelectorAll('.ds-reveal-pending').forEach((el) => el.classList.remove('ds-reveal-pending'));
    };
  }, []);
}

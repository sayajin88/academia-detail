# Pricing disruptivo + imágenes nuevas en la landing de Marketing

## 1. Nueva pricing table (sección "Packs")

Se sustituye la rejilla actual de tarjetas iguales por un bloque de oferta con jerarquía agresiva:

- **Franja de oferta arriba**: cinta granate en diagonal con "Precios de lanzamiento · plazas limitadas" y contador de descuento medio (-60%).
- **Layout escalonado**: el pack Profesional (889€) se muestra como tarjeta protagonista, más grande y elevada, en el centro; Arranque (199€) y SEO+GEO (99€) quedan como tarjetas laterales más compactas. Fin de las tres columnas idénticas.
- **Precio con impacto**: precio antiguo tachado grande, flecha descendente y precio nuevo en tipografía enorme con degradado granate, más una "píldora de ahorro" (`Ahorras X€ · -N%`) con fondo granate sólido.
- **Barra de descuento visual**: mini barra de progreso que representa gráficamente la reducción de precio en cada pack.
- **Detalles llamativos**: borde animado con brillo recorriendo el pack destacado, halo granate, hover con elevación, y sello "Precio de lanzamiento" rotado en la esquina.
- Se mantienen features, textos y enlaces de WhatsApp existentes; sólo cambia la presentación.
- Todo con tokens del sistema (charcoal/garnet), responsive mobile-first: en móvil se apilan con el destacado primero.

## 2. Imágenes con fondo transparente

- **`Auto-Detailing-Header.png`** (detailers trabajando en el coche negro con iconos de redes sociales): pasa a ser la imagen principal del **hero**, sustituyendo la ilustración plana del megáfono. Encaja perfecto con la propuesta: detailing real + canales digitales. Se coloca a la derecha sobre halo granate, sin marco (fondo transparente), con animación flotante suave y `loading="eager"`.
- **`desing_web_detailing.png`** y **`desing_web_detailing_2.png`** (mockups de webs de detailing) y **`example_desing_web.jpg`**: se usan como **prueba de trabajo** en una nueva sección "Así se ve una web hecha para detailing", justo antes de los packs. Mockups sobre fondo oscuro con reflejo sutil y halo granate, en composición asimétrica (uno grande + dos apilados), con pie de texto y CTA a WhatsApp.
- La ilustración del megáfono que sale del hero se reubica junto a la sección de servicios o se retira si sobrecarga.

## Detalles técnicos

- Las 4 imágenes se suben con `lovable-assets create` desde `/mnt/user-uploads/` y se referencian por sus `.asset.json` en `src/assets/marketing/`; no se copian binarios al repositorio.
- Archivos a editar: `MarketingPacks.tsx` (rediseño completo), `MarketingHero.tsx` (imagen nueva), `MarketingSections.tsx` (nueva sección de mockups) y `MarketingDigital.tsx` (orden de secciones).
- Estilos nuevos (cinta, borde animado, barra de descuento) en `src/index.css` con variables existentes; nada de colores hardcodeados.
- `alt` descriptivos en español, `loading="lazy"` salvo hero, espaciado `py-16 md:py-24` y `AnimatedSection` como en el resto de la página.

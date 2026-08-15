# Rediseño Carrera Detailing — Hero + estrategia de precio

## Objetivo

Que el visitante entienda en 5 segundos que la Carrera Detailing es la suma de TODAS las formaciones técnicas del centro, comprada junta, más barata y con una base completa desde el inicio.

## Números oficiales (a partir de los precios reales de la web)

| Formación | Precio individual |
|---|---|
| Detailing Profesional (4 días) | 2.997 € |
| Car Wrapping Nivel 1 (2 días) | 1.999 € |
| Car Wrapping Nivel 2 — Avanzado (2 días) | 1.999 € |
| Paint Protection Film (PPF) | 2.397 € |
| **Suma formaciones por separado** | **9.392 €** |

Extras incluidos sin coste adicional (valorados, no facturables por separado):
- Módulo de Negocio: 2.500 €
- Mes de práctica real en taller: 3.500 €
- **Valor total del programa: 15.392 €**

**Precio Carrera Detailing: 7.997 €**
- Ahorro directo frente a comprar los 4 cursos sueltos: **1.395 €**
- Valor extra recibido gratis: 6.000 €

Se corrige la incoherencia actual: hoy la Carrera cuesta 9.997 € (más caro que la suma de sus partes) y muestra un "valor original" de 18.992 € que no cuadra con ningún precio publicado.

## Nuevo Hero — "Ruta de aprendizaje"

Estructura en dos columnas en PC, apilada en móvil.

```text
PC (>=1024px)
┌───────────────────────────────┬──────────────────────────┐
│ Badge: PROGRAMA COMPLETO      │  PANEL PRECIO (sticky)   │
│ H1 CARRERA DETAILING          │  Valor total  15.392 €   │
│ Subtítulo + promesa           │  Suma cursos   9.392 €   │
│                               │  ────────────────────    │
│ RUTA: 4 etapas conectadas     │  Tu inversión  7.997 €   │
│  01 Detailing      2.997 €    │  Ahorras       1.395 €   │
│  02 Wrapping N1    1.999 €    │  + 6.000 € en extras     │
│  03 Wrapping N2    1.999 €    │  [ Reservar plaza ]      │
│  04 PPF            2.397 €    │  [ Hablar por WhatsApp ] │
│  ✓ Negocio + Taller  incluido │  4 plazas · Marzo 2026   │
└───────────────────────────────┴──────────────────────────┘

Móvil
[Badge] [H1] [subtítulo]
[Panel precio compacto: 7.997 € · antes 9.392 € · ahorras 1.395 €]
[CTA principal ancho completo]
[Ruta 4 etapas en vertical, precios tachados a la derecha]
[Chips: 1 mes · 4 plazas · 4 certificaciones]
```

Detalles visuales:
- Se mantiene el lenguaje Charcoal + Garnet + acento oro ya existente en la página.
- La ruta se dibuja como línea vertical/horizontal con nodos numerados; cada precio individual aparece tachado al entrar en viewport.
- El ahorro se anima con contador (reutilizando `useCountUp`).
- El hero deja de ser `min-h-screen` en móvil (pasa a contenido natural con padding) para que el precio y el CTA se vean sin scroll.
- CTA secundario a WhatsApp junto al principal.

## Reordenación de secciones (UX)

Orden actual: Hero → Video → Formaciones → Módulo Negocio → Experiencia Real → Testimonios → Timeline → Beneficios → ROI → Precio → ViaBill → Jornada Zero → Reviews → FAQ.

Orden propuesto:
1. Hero (con precio y ahorro)
2. Formaciones incluidas (justo después: valida la promesa del hero)
3. Módulo de Negocio
4. Experiencia real en taller
5. Timeline del mes
6. Vídeo intro
7. Testimonios en vídeo + Google Reviews juntos (bloque de prueba social único)
8. Beneficios
9. Calculadora ROI
10. Pricing detallado + ViaBill (financiación pegada al precio)
11. Jornada Zero (puerta de entrada de bajo compromiso)
12. FAQ

Además: barra CTA fija en móvil con precio + botón, visible al salir del hero.

## Cambios técnicos

- `src/data/carreraDetailingData.ts`: `price: 7997`, `originalValue: 9392`, nuevo bloque `valueBreakdown` (formaciones con su precio real, extras valorados, totales y ahorro) alineado con `formationDetails.ts`. Se actualizan las FAQ que citan 9.997 €, 2.596 € y 18.992 €.
- `src/components/carrera/CarreraHero.tsx`: reescritura completa con el layout de ruta + panel de precio.
- Nuevo `src/components/carrera/CarreraStickyCTA.tsx`: barra fija móvil.
- `src/components/carrera/CarreraPricing.tsx` y `CarreraFormaciones.tsx`: sincronizar cifras con `valueBreakdown`.
- `src/pages/CarreraDetailing.tsx`: nuevo orden de secciones.
- `src/utils/seoConfig.ts`: actualizar `offers.price` del schema Course a 7997 y la meta description con el ángulo de ahorro.

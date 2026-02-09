

# Actualizar favicon para SERPs de Google

## Problema actual

El favicon actual (`favicon.svg`) es el logo completo con el coche + texto "DETAIL" + subtexto "ACADEMIA DETAIL PARK" con un aspect ratio de 383x113 (muy apaisado). A 16x16px en los resultados de Google, es completamente ilegible.

## Imagen elegida

**`favicon_detail-academy_transparent.png`** -- El monograma "AD" (A negra + D dorada, fondo transparente).

Motivos:
- Aspecto cuadrado: obligatorio para Google SERPs
- Formas gruesas y simples: legible incluso a 16x16px
- Alto contraste: negro + dorado (#DD9933)
- PNG con transparencia: funciona en fondo claro y oscuro
- Los demas SVGs (logo completo, versiones horizontales) son demasiado anchos y detallados para funcionar como favicon

## Cambios a realizar

### 1. Copiar la imagen al proyecto
- Copiar `favicon_detail-academy_transparent.png` a `public/favicon.png` (reemplaza el actual)

### 2. Actualizar `index.html`
- Eliminar la referencia a `favicon.svg` (el logo completo apaisado no sirve como icono)
- Mantener la referencia a `favicon.png` como icono principal
- Anadir tamanio `48x48` (minimo que Google exige)

Cambios concretos en la seccion de favicon:
```text
<!-- Antes -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon.png">
<link rel="apple-touch-icon" sizes="180x180" href="/favicon.png">

<!-- Despues -->
<link rel="icon" type="image/png" sizes="48x48" href="/favicon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon.png">
<link rel="apple-touch-icon" sizes="180x180" href="/favicon.png">
```

### 3. Actualizar `public/manifest.json`
- Anadir entrada de icono `48x48` (requisito de Google)
- Mantener entradas de 192x192 y 512x512

```text
"icons": [
  {
    "src": "/favicon.png",
    "sizes": "48x48",
    "type": "image/png"
  },
  {
    "src": "/favicon.png",
    "sizes": "192x192",
    "type": "image/png"
  },
  {
    "src": "/favicon.png",
    "sizes": "512x512",
    "type": "image/png",
    "purpose": "any maskable"
  }
]
```

## Requisitos de Google para favicons en SERPs

| Requisito | Estado con "AD" |
|---|---|
| Minimo 48x48px (multiplo de 48) | Cumple (imagen es 500x500+) |
| Formato cuadrado | Cumple |
| Legible a 16x16px | Cumple (formas gruesas) |
| No ser generico ni ofensivo | Cumple |
| Representar la marca | Cumple ("A" de Academia, "D" de Detail) |

## Resumen de archivos

| Archivo | Accion |
|---|---|
| `public/favicon.png` | Reemplazar con el monograma "AD" transparente |
| `index.html` | Eliminar referencia a SVG, anadir tamanio 48x48 |
| `public/manifest.json` | Anadir icono 48x48, agregar `purpose` al de 512 |

## Resultado esperado

- En las pestanas del navegador: se vera el monograma "AD" nitido
- En los resultados de Google (SERPs): icono reconocible y legible
- En dispositivos moviles (apple-touch-icon): icono cuadrado con las letras "AD"
- El cambio puede tardar semanas en reflejarse en Google, ya que depende de que Google vuelva a rastrear el sitio

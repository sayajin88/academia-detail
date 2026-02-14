

## Añadir Google Analytics (gtag.js) al proyecto

### Cambio
Insertar el snippet de Google Tag Manager en `index.html`, justo despues de la etiqueta `<head>`, antes de cualquier otro contenido.

### Archivo modificado
- **`index.html`**: Añadir las dos etiquetas `<script>` de gtag.js con el ID `G-EQW4MPZTEW` al inicio del `<head>`, despues del `<meta charset>` y `<meta viewport>`.

### Detalle tecnico
Se insertan exactamente las dos lineas proporcionadas:
1. Script async que carga la libreria gtag.js
2. Script inline que inicializa dataLayer y configura el ID de medicion

Esto permitira que Google Analytics registre todas las visitas y eventos (incluyendo los `gtag()` ya implementados en BlogDirectoryBanner y otros componentes).


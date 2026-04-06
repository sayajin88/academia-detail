

## Plan: Optimizar imagen OG para /curso-detailing-profesional

### Contexto
La página del curso Detailing ya referencia `public/og-curso-detailing.jpg` (actualmente 1200x640). El usuario quiere reemplazarla con la foto subida (alumnos puliendo coches en taller), adaptada al formato OG recomendado.

### Especificaciones OG recomendadas
- Tamaño: 1200 x 630 px
- Formato: JPEG
- Peso: menos de 300 KB (ideal < 200 KB)
- Calidad: 85% JPEG

### Pasos

1. **Copiar la imagen subida** al proyecto como archivo temporal
2. **Procesar con Pillow** (Python):
   - Redimensionar/recortar al ratio 1200:630 (≈1.905:1) usando crop centrado
   - Exportar como JPEG calidad 85, optimizado
   - Guardar como `public/og-curso-detailing.jpg` (reemplaza el existente)
3. **Verificar** que el peso final sea < 300 KB y las dimensiones sean exactamente 1200x630

### Archivos modificados
- `public/og-curso-detailing.jpg` — reemplazado con la nueva imagen optimizada

### Archivos NO modificados
- Ningún archivo `.ts` / `.tsx` / de estilos / de lógica (ya apuntan a `/og-curso-detailing.jpg` con dimensiones 1200x630)


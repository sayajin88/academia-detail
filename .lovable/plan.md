

## Actualizar Banner "Únete al Directorio" con nuevo contenido y layout

### Cambios

Se modificara el componente `DirectoryJoinBanner.tsx` para:

1. **Nuevo titulo**: "¿Eres Profesional, Detailer o Tienes un Centro?" con subtitulo "Aparece en nuestro directorio nacional e internacional"
2. **Layout centrado** con bullet points de ventajas debajo del texto
3. **Bullet points de ventajas** (con iconos Lucide):
   - Llega a nuevos clientes que buscan servicios cerca de ti
   - Aumenta tu visibilidad y presencia digital profesional
   - Ficha verificada con badge de credibilidad y confianza
   - Solicitud gratuita con revision en menos de 48 horas
4. **Boton CTA** centrado debajo de los bullet points
5. Se mantienen los trust badges y los elementos decorativos (gradiente, circulos, patron)

### Archivo modificado
- `src/components/directory/DirectoryJoinBanner.tsx` -- nuevo contenido, layout centrado con bullet points

### Detalles tecnicos

La estructura pasara de dos columnas (texto + boton lateral) a una sola columna centrada:

- Badge "Directorio Profesional" centrado arriba
- Titulo en Bebas Neue centrado
- Subtitulo descriptivo centrado
- Grid 2x2 (desktop) o 1 columna (movil) con los bullet points de ventajas, cada uno con icono + texto
- Boton CTA "Unete Gratis" centrado debajo
- Trust badges centrados al final

No hay cambios en base de datos, rutas ni otros archivos. Solo se modifica el contenido y layout del componente existente.



## Centrar imagenes y evitar recorte en tarjetas del directorio

### Problema

Actualmente todas las imagenes de las tarjetas usan `object-cover`, que funciona bien para fotos de personas pero recorta los logos de centros (como se ve en la captura con "Detail Park").

### Solucion

Diferenciar el comportamiento segun el tipo de perfil (`profile_type`):

- **Detailer** (fotos de caras): mantener `object-cover` para que la foto llene la tarjeta sin dejar huecos.
- **Centro** (logos): usar `object-contain` con padding y fondo blanco para que el logo se vea completo y centrado sin recortar nada.

El tamano de las tarjetas no cambia en absoluto, solo cambia como se ajusta la imagen dentro del contenedor.

### Detalle tecnico

**Archivo:** `src/components/directory/DetailerCard.tsx`

Cambio en la clase CSS del `<img>` (linea 51):

- Si `profile_type === 'centro'`: usar `object-contain p-4 bg-white` (logo centrado sobre fondo blanco, con padding).
- Si `profile_type === 'detailer'`: mantener `object-cover` (foto recortada para llenar).

Se aplica la clase de forma condicional. El contenedor (`aspect-[16/9]`) y el resto de la tarjeta permanecen identicos.

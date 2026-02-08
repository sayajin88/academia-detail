

# Actualizar Landing Up Detail: Colores, Precio, Videos y Testimonios

## Resumen de cambios

La landing de Up Detail necesita 5 actualizaciones principales:

1. **Paleta de colores**: Cambiar dorado/amber por violeta/morado en toda la pagina
2. **Precio**: Actualizar de 97 euros + IVA a 349 euros + IVA
3. **Videos YouTube**: Incrustar 2 videos (promo + evento pasado Mayo 2025)
4. **Hero background**: Reemplazar imagen del hero por una foto real del proyecto
5. **Video testimonios**: Anadir los mismos testimonios en video que tiene la Jornada Zero

---

## Detalle de cada cambio

### 1. Paleta de colores: de dorado a violeta

Se reemplazaran **todas las referencias** a colores amber/orange por violeta/morado:

| Elemento | Antes (amber) | Despues (violet) |
|---|---|---|
| Top banner gradient | `from-amber-600 via-amber-500 to-orange-500` | `from-violet-700 via-purple-600 to-violet-500` |
| Badges | `bg-amber-500/20 text-amber-400` | `bg-violet-500/20 text-violet-400` |
| Gradientes de texto | `from-amber-400 to-orange-400` | `from-violet-400 to-purple-400` |
| Bordes hover | `border-amber-500/30` | `border-violet-500/30` |
| Iconos | `text-amber-400` | `text-violet-400` |
| Botones CTA | `from-amber-500 to-orange-500` | `from-violet-600 to-purple-600` |
| Links hover footer | `hover:text-amber-400` | `hover:text-violet-400` |
| Shadow del banner | `rgba(245,158,11,0.3)` | `rgba(139,92,246,0.3)` |

Esto afecta a **todo el archivo** `UpDetail.tsx`. Tambien se actualizara la tarjeta de Up Detail en el **Hub** (`JornadasIntensivas.tsx`) para coherencia visual: la linea de acento, el badge "Proximamente", y el icono pasaran a violeta.

---

### 2. Precio actualizado: 349 euros + IVA

Cambios en los siguientes puntos del archivo:

- **Hero**: La tarjeta de precio cambia de "97 euros + IVA" a "349 euros + IVA"
- **Seccion pre-registro**: El texto "Precio confirmado: 97 euros + IVA" cambia a "Precio confirmado: 349 euros + IVA"
- **Cross-promotion**: El texto "El mismo precio" se actualiza para reflejar que ya no es el mismo precio que Jornada Zero
- **Hub** (`JornadasIntensivas.tsx`): El badge de precio cambia a 349 euros, y el texto de la FAQ sobre precios se actualiza para reflejar que cada formato tiene su propio precio

---

### 3. Incrustar 2 videos de YouTube

Se anaden dos nuevas secciones con videos embebidos:

**Video 1 - Video promocional** (`TR_K9l3GZWc`)
- Se ubica justo despues de la seccion de concepto "Que es Up Detail?"
- Titulo: "Descubre Up Detail"
- Presentado como el video principal de presentacion del formato
- Embebido con facade pattern (thumbnail + click para cargar iframe)

**Video 2 - Evento pasado Mayo 2025** (`ZA8lZ5R6Yg0`)
- Se ubica como nueva seccion despues de los expertos, antes de la galeria
- Titulo: "Revive Nuestro Ultimo Evento — Mayo 2025"
- Texto contextual: Se presenta como el primer Up Detail celebrado en Mayo 2025, con texto que resalta el exito del evento (sold out, reunion de expertos, asistentes satisfechos)
- Se describe como "la jornada que inicio todo" o "nuestro primer evento colaborativo"
- Embebido tambien con facade pattern

Ambos videos usaran el mismo patron visual: thumbnail de YouTube, overlay oscuro, boton play con colores violeta, y carga de iframe al hacer clic.

---

### 4. Hero background

Se reemplaza `heroJornadaCero` (que es la misma imagen usada en Jornada Zero) por una imagen diferente para dar identidad propia a Up Detail. Se usara `evento-grupo-detailing.jpg` o `evento-instructor-explicando.jpg`, que son fotos reales de eventos colaborativos y encajan con el concepto de Up Detail con multiples expertos.

---

### 5. Video testimonios

Se reutiliza el componente `VideoTestimonials` que ya existe en la Jornada Zero (`src/components/VideoTestimonials.tsx`). Este componente contiene 6 testimonios en video de participantes reales.

Se importa y se coloca despues de la galeria de fotos, antes de la seccion de pre-registro. Para integrarlo en la paleta violeta, se ajustara el contenedor envolvente con clases de fondo consistentes.

---

## Archivos afectados

| Archivo | Cambios |
|---|---|
| `src/pages/UpDetail.tsx` | Colores violeta, precio 349 euros, 2 videos YouTube, hero image, import VideoTestimonials |
| `src/pages/JornadasIntensivas.tsx` | Colores violeta en tarjeta Up Detail, precio 349 euros, FAQ actualizada |

---

## Orden de implementacion

1. Actualizar todos los colores amber/orange a violet/purple en `UpDetail.tsx`
2. Cambiar el precio a 349 euros + IVA en todos los puntos
3. Cambiar la imagen del hero
4. Anadir seccion de video promo despues de "Que es Up Detail?"
5. Anadir seccion de evento pasado Mayo 2025 con video y texto contextual
6. Importar y colocar `VideoTestimonials` despues de la galeria
7. Actualizar `JornadasIntensivas.tsx` (hub) con colores y precio coherentes

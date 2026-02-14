

## Promocion "Gratis hasta el 31 de Marzo" + paso de confirmacion de precio

### 1. Banners promocionales (3 archivos)

**`DirectoryJoinBanner.tsx`** (Home + Directory):
- Cambiar el badge superior de "Directorio Profesional" a "GRATIS hasta el 31 de Marzo"
- Anadir un chip/badge extra debajo del titulo con efecto de urgencia: "Oferta limitada - despues 4,99 EUR/mes"
- El boton CTA pasa de "Unete Gratis" a "Unete Gratis - 0 EUR/mes"

**`BlogDirectoryBanner.tsx`** (Blog):
- Mismos cambios que el banner principal pero adaptados al tamano compacto del blog
- Badge "GRATIS hasta 31 Mar" y mencion al precio futuro tachado

**`DirectoryJoin.tsx`** (pagina de registro):
- Actualizar el subtitle del SectionHeading para incluir mencion a la oferta gratuita temporal

### 2. Nuevo paso 6 en el formulario de inscripcion

**`DirectoryJoinForm.tsx`** - Anadir paso "Confirmar" al flujo:

- STEPS pasa de 5 a 6 elementos: `{ num: 6, label: 'Confirmar' }`
- TOTAL_STEPS pasa a 6
- El paso 5 actual (Galeria + privacidad) pierde el checkbox de privacidad
- El paso 6 nuevo contiene:
  - Resumen visual tipo "tarjeta de precio" con:
    - Precio real tachado: ~~4,99 EUR/mes~~ (texto gris con line-through)
    - Precio actual grande: 0 EUR/mes (verde, destacado)
    - Badge "Oferta limitada" con icono de reloj
    - Texto "Gratis hasta el 31 de Marzo de 2026. Despues: 4,99 EUR/mes"
  - Lista de lo que incluye la suscripcion (ficha verificada, visibilidad SEO, badge de confianza, contacto directo)
  - Checkbox de politica de privacidad (movido desde paso 5)
  - Boton final "Confirmar inscripcion gratuita"

### Detalle tecnico

**`DirectoryJoinForm.tsx`:**

```text
Cambios en constantes:
- STEPS: anadir { num: 6, label: 'Confirmar' }
- TOTAL_STEPS: 6
- stepFields[5]: [] (galeria sin privacidad)
- stepFields[6]: ['acepto_privacidad']

Paso 6 (nuevo render):
- Card con gradiente sutil y borde primary
- Precio: <span className="line-through text-muted-foreground">4,99 EUR/mes</span>
- Precio actual: <span className="text-3xl font-black text-green-500">0 EUR/mes</span>
- Badge animado "Oferta limitada" con shimmer
- Lista de beneficios con checks verdes
- Checkbox privacidad
- Boton submit con texto "Confirmar inscripcion gratuita"
```

**`DirectoryJoinBanner.tsx`:**
- Badge superior: "GRATIS hasta el 31 de Marzo"
- Nuevo parrafo bajo descripcion: chip con precio tachado y precio actual
- Boton: "Unete Gratis - 0 EUR/mes"

**`BlogDirectoryBanner.tsx`:**
- Misma logica de badge y precio adaptada al tamano compacto

**`DirectoryJoin.tsx`:**
- Subtitle actualizado: "Completa los pasos y empieza GRATIS. Oferta limitada hasta el 31 de Marzo."


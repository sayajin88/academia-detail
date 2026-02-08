
# Correccion del Header: Espaciado Logo-Menu

## Problema detectado

En la captura de pantalla se ve claramente que la palabra "Inicio" queda cortada/solapada por el logo. Esto ocurre porque el contenedor de navegacion desktop (`lg:flex`) no tiene margen izquierdo y usa `gap-0`, lo que hace que los enlaces empiecen inmediatamente despues del logo.

## Cambios en `src/components/layout/Navbar.tsx`

### 1. Anadir separacion entre logo y navegacion desktop (linea 154)

Cambiar:
```
className="hidden lg:flex items-center gap-0 relative"
```
A:
```
className="hidden lg:flex items-center gap-0.5 relative ml-6 xl:ml-8"
```

- `ml-6 xl:ml-8`: Crea un margen izquierdo entre el logo y el primer enlace ("Inicio") para que no se solapen.
- `gap-0.5`: Anade un micro-espacio entre todos los enlaces para mejorar la legibilidad general sin romper la compactness.

### 2. Reducir ligeramente el padding de los enlaces para compensar (lineas 169, 188, 245, 297)

Cambiar `px-3` a `px-2.5` en los enlaces de navegacion desktop para que todo quepa sin que la barra se sienta apretada. Esto afecta a:

- Enlace "Inicio" (linea 169)
- Boton "Formaciones" (linea 188)
- Boton "Herramientas" (linea 245)
- Links restantes (Quienes Somos, Blog, Inscribirse) (linea 297)

### 3. Mobile: garantizar que el logo no se comprima

En la seccion mobile del header (la barra superior, no el panel lateral), el logo, boton WhatsApp y hamburguesa ya estan con `flex-shrink-0` en el logo. Se verificara que no hay recorte en viewports de 320px.

Anadir `gap-2` al area de botones mobile (WhatsApp + hamburger) si no existe, para evitar que se peguen entre si.

## Resultado esperado

- En desktop: "Inicio" visible completamente, sin solaparse con el logo
- El espaciado queda proporcionado entre todos los elementos de la barra
- En movil: logo, icono WhatsApp y hamburger quedan con espacio suficiente sin recortes

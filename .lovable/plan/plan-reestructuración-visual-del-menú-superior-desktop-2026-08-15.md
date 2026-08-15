# Plan: Reestructuración visual del menú superior (desktop)

## Objetivo
Evitar que el logo de Detail Park tape el enlace "Inicio" en la versión de escritorio y aprovechar para mejorar visualmente la barra de navegación, manteniendo el menú móvil tal cual.

## Decisiones tomadas
- **Distribución**: logo a la izquierda, menú de navegación alineado a la derecha.
- **Enlace "Inicio"**: se muestra como icono de casa + texto "Inicio", ocupando menos espacio y quedando visible.
- **Alcance**: solo escritorio (`lg:`). El menú móvil no se toca.

## Pasos de implementación

1. **Ajustar layout del navbar desktop**
   - En `src/components/layout/Navbar.tsx`, cambiar el contenedor de navegación de escritorio para que el grupo de enlaces se alinee a la derecha (`ml-auto` / `justify-end`) en lugar de quedar junto al logo con un margen fijo.
   - Asegurar que el logo tenga un ancho máximo razonable (`max-w-[140px]` o similar) para no invadir la zona de los enlaces.

2. **Convertir "Inicio" en icono + texto**
   - Reemplazar el enlace de texto plano "Inicio" por un enlace con el icono `Home` de Lucide seguido de la palabra "Inicio".
   - Reducir ligeramente el padding horizontal de ese primer enlace para que el conjunto encaje sin forzar el ancho total.

3. **Mejoras visuales del menú desktop**
   - Unificar el `gap` entre elementos del menú para que se vea equilibrado.
   - Refinar el indicador de pill activa para que se desplace correctamente con el nuevo layout.
   - Añadir una separación sutil (línea vertical o espaciado) entre el logo y el menú, manteniendo la estética Charcoal/Garnet.
   - Revisar tamaños de fuente y tracking para que no se sature la barra.

4. **Verificación**
   - Capturar una screenshot del navbar en escritorio para confirmar que "Inicio" es visible y no queda tapado por el logo.
   - Comprobar que los dropdowns de "Formaciones" y "Herramientas" siguen abriendo correctamente y que el botón "¿Eres Nuevo?" y el icono de WhatsApp no se desbordan.

## Archivos a modificar
- `src/components/layout/Navbar.tsx`

## No se modificarán
- Menú móvil.
- Colores, tipografía o identidad de marca.
- Funcionalidad de los dropdowns ni los enlaces existentes.
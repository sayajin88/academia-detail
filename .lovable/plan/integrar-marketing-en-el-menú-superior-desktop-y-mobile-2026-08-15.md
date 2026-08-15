# Integrar "Marketing" en el menú superior (desktop y mobile)

## Objetivo
Añadir un enlace directo de primer nivel llamado **"Marketing"** en la barra de navegación superior, tanto en versión de escritorio como en móvil, que apunte a `/marketing-digital-detailing`.

## Cambios propuestos

### 1. `src/components/layout/Navbar.tsx`
- **Escritorio**: insertar un nuevo `<Link>` a `/marketing-digital-detailing` con el texto "Marketing" dentro de la fila de navegación principal (`navRef`), junto a los demás enlaces de primer nivel (Inicio, Formaciones, Herramientas, etc.).
- **Móvil**: añadir un nuevo `<Link>` destacado dentro del panel del menú móvil, junto a "Inicio" y los acordeones de Formaciones/Herramientas.
- Usar el icono `Rocket` (ya importado) para mantener coherencia con el enlace existente en el menú "Herramientas".
- Mantener el estilo, accesibilidad y animaciones actuales del Navbar.

### 2. Menú "Herramientas" (opcional, a valorar)
- Decidir si se mantiene "Marketing para tu Negocio" dentro del desplegable "Herramientas" o se elimina de ahí para evitar duplicidad. Se propone **mantenerlo** también en Herramientas, ya que marketing es una herramienta de negocio, pero destacarlo como primer nivel.

## Criterios de aceptación
- En desktop aparece el enlace "Marketing" en la barra superior.
- En el menú hamburguesa aparece el enlace "Marketing".
- El enlace apunta correctamente a `/marketing-digital-detailing`.
- El estado activo se visualiza correctamente cuando el usuario está en esa ruta.

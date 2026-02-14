

## Reducir el logo de Academia Detail en el menu

El logo actual usa `md:h-12` (48px) que es demasiado grande y solapa los enlaces del menu. Se reducira para que quede proporcionado.

### Cambio unico

**Archivo:** `src/components/layout/Navbar.tsx` (linea 139)

**Actual:**
```
h-7 sm:h-8 md:h-12
```

**Nuevo:**
```
h-6 sm:h-7 md:h-8
```

Esto reduce el logo de escritorio de 48px a 32px, y ajusta proporcionalmente en movil. El logo dejara de tapar los enlaces de navegacion.


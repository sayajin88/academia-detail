

## Fix: Imagenes rotas en el blog

### Causa raiz

Los 26 articulos estaticos se importaron en la base de datos con `image_url = null`. Esto ocurre porque las imagenes en los archivos estaticos son imports de ES6 (e.g., `import professionalDetailing from '@/assets/...'`) que Vite resuelve a URLs hasheadas en tiempo de build. Esos valores no se pueden guardar como strings en la base de datos.

El hook `useBlogPosts` prioriza los posts de la base de datos sobre los estaticos. Al hacerlo, la imagen del post de la DB (`null` -> `""`) reemplaza la imagen correcta del post estatico.

### Solucion

Modificar el hook `useBlogPosts.ts` para que, cuando un post exista tanto en la DB como en los datos estaticos, se haga un **merge inteligente**: usar los campos de la DB como fuente principal, pero rellenar los campos vacios (como `image_url` y `author_image`) con los valores del post estatico.

### Cambios

**Archivo: `src/hooks/useBlogPosts.ts`**

En la funcion de merge, en lugar de simplemente ignorar los posts estaticos cuando existe una version en la DB:

1. Crear un mapa de posts estaticos indexado por slug
2. Para cada post de la DB, buscar si existe un post estatico con el mismo slug
3. Si el post de la DB tiene `image_url` vacio o nulo, usar la imagen del post estatico
4. Si el post de la DB tiene `author_image` vacio o nulo, usar la imagen de autor del post estatico
5. Mantener la misma logica de ordenamiento y prioridad

Esto asegura que:
- Los articulos importados recuperan sus imagenes originales
- Los articulos nuevos creados desde el admin funcionan normalmente con sus propias URLs
- No se necesita modificar la base de datos ni re-importar nada

### Detalle tecnico

```text
// Pseudocodigo del merge mejorado
const staticBySlug = Map(staticPosts, slug -> post)

for each dbPost in dynamicPosts:
  staticMatch = staticBySlug.get(dbPost.slug)
  if staticMatch:
    if !dbPost.image -> usar staticMatch.image
    if !dbPost.author.image -> usar staticMatch.author.image

merged = [...enrichedDynamic, ...staticPosts sin duplicados]
```

**Un solo archivo modificado**: `src/hooks/useBlogPosts.ts`

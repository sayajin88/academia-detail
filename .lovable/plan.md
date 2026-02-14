

## Banner "Únete al Directorio" en todos los artículos del blog

### Objetivo
Añadir un banner visual de alto CTR dentro de la estructura de todos los artículos del blog, reutilizando el estilo del `DirectoryJoinBanner` pero adaptado al contexto del contenido (inline, más compacto).

---

### 1. Nuevo componente: `BlogDirectoryBanner`

**Archivo**: `src/components/blog/BlogDirectoryBanner.tsx`

Un banner inline adaptado al contexto del blog, con el mismo mensaje y ventajas que el `DirectoryJoinBanner` pero en un formato más compacto que encaje entre el contenido del artículo (similar al estilo de `BlogDilutionBanner` pero con el fondo granate y las ventajas del directorio).

**Contenido:**
- Fondo gradiente granate (primary) con circulos decorativos (mismo estilo que `DirectoryJoinBanner`)
- Titulo: "¿Eres Profesional, Detailer o Tienes un Centro?"
- Subtitulo corto: "Aparece en nuestro directorio nacional e internacional"
- 4 bullet points en linea (2x2 en desktop, 1 columna en movil):
  - Llega a nuevos clientes cerca de ti
  - Aumenta tu visibilidad digital
  - Ficha verificada con badge
  - Solicitud gratuita, revision en 48h
- Boton CTA blanco: "Unete Gratis" enlazando a `/directorio/unete`

### 2. Insercion en BlogPost.tsx

Se insertara el `BlogDirectoryBanner` en la pagina de articulos, entre el `BlogDilutionBanner` y los tags (linea 202-204 actual). Asi aparece despues del contenido principal y antes del cierre del articulo, en una posicion de alta visibilidad.

**Orden final del contenido:**
1. Contenido del articulo (`BlogArticleContent`)
2. Banner Calculadora Dilucion (`BlogDilutionBanner`)
3. **Banner Directorio** (`BlogDirectoryBanner`) -- NUEVO
4. Tags del articulo
5. Share buttons
6. CTA de formacion (`BlogPostCTA`)
7. Articulos relacionados

---

### Detalles tecnicos

**Archivo nuevo:**
- `src/components/blog/BlogDirectoryBanner.tsx`

**Archivo modificado:**
- `src/pages/BlogPost.tsx` -- importar y colocar el nuevo banner

Sin cambios en base de datos, rutas ni otros archivos.

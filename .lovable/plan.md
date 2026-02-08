
# Auditoria Tecnica Completa - academiadetail.com

## Resumen Ejecutivo
Tras revisar en detalle todas las paginas, componentes, datos, SEO y configuracion del sitio, se han detectado **12 problemas** de distinta gravedad. A continuacion se detalla cada uno con su solucion concreta.

---

## ERRORES CRITICOS (afectan funcionalidad o SEO)

### 1. Paginas legales inexistentes (404)
**Problema:** El footer enlaza a `/privacidad`, `/terminos` y `/cookies`. El formulario de contacto enlaza a `/politica-privacidad`. La Jornada Zero enlaza a `/privacidad` y `/terminos`. Ninguna de estas rutas existe en `App.tsx`, por lo que muestran la pagina 404.

**Impacto:** Viola el RGPD al no tener paginas legales accesibles. Genera errores 404 que afectan el rastreo de Google.

**Solucion:** Crear una pagina `/politica-privacidad` con la informacion legal basica, y anadir redirects desde `/privacidad`, `/terminos` y `/cookies` a esa pagina (o crear paginas separadas). Registrar las rutas en `App.tsx`.

---

### 2. YouTube Hero: bucle de warnings en consola
**Problema:** En `HomeHero.tsx`, el `setInterval` en `onReady` llama a `seekTo` cada 500ms. Cuando el componente se desmonta y se vuelve a montar (por navegacion React), el player se destruye pero el intervalo puede ejecutarse antes de la limpieza, generando el warning "The YouTube player is not attached to the DOM" repetidamente (visible en los logs de consola).

**Impacto:** Contamina la consola, puede causar fugas de memoria menores.

**Solucion:** Guardar una referencia `isDestroyed` y verificarla antes de cada `seekTo`. Tambien verificar `playerRef.current` antes de llamar a metodos. Limpiar el intervalo antes de destruir el player en el `useEffect` cleanup.

---

### 3. Imports sin usar en GalleryPreview.tsx
**Problema:** Se importan `training2` (evento-grupo-formacion.jpg), `training5` (formacion-detailing-1.jpg), `training7` (certificado-alumno-feliz.jpg) y `training8` (alumnos-formacion-3.jpg) pero ya no se usan en el array `galleryImages` tras los cambios recientes. Esto anadie peso muerto al bundle.

**Impacto:** Incrementa el tamano del JavaScript bundle innecesariamente (4 imagenes cargadas pero no mostradas).

**Solucion:** Eliminar las 4 lineas de import no utilizados (`training2`, `training5`, `training7`, `training8`).

---

### 4. OG Image inconsistente en index.html
**Problema:** En `index.html`, las meta tags `og:image` y `twitter:image` apuntan a una URL de Google Cloud Storage (`storage.googleapis.com/gpt-engineer-file-uploads/...`), mientras que el componente SEO.tsx usa `https://academiadetail.com/og-image.png`. Esto crea inconsistencia y la URL de Storage puede ser temporal.

**Impacto:** Las previsualizaciones en redes sociales pueden mostrar una imagen incorrecta o caida.

**Solucion:** Actualizar las meta tags de `index.html` para usar `https://academiadetail.com/og-image.png`, coherente con el resto del sitio.

---

## ERRORES MODERADOS (afectan UX o calidad)

### 5. Copyright desactualizado en Jornada Zero
**Problema:** El footer de la pagina Jornada Zero (linea 902) dice "Derechos reservados para Detail Park S.L. 2024", con el ano hardcodeado.

**Impacto:** Transmite imagen de pagina desactualizada.

**Solucion:** Reemplazar `2024` por `{new Date().getFullYear()}` como ya se hace en el Footer principal (`Footer.tsx` linea 159).

---

### 6. Email inconsistente entre SEO schema y Footer
**Problema:** El schema LocalBusiness en `SEO.tsx` (linea 89) y `seoConfig.ts` (linea 25) usan `info@detailpark.es` como email. El Footer y el formulario de contacto usan `info@academiadetail.com`.

**Impacto:** Inconsistencia que puede confundir a Google y a usuarios que consulten datos de contacto en snippets de busqueda.

**Solucion:** Unificar a `info@academiadetail.com` en ambos schemas (`SEO.tsx` y `seoConfig.ts`), que es el email de la marca actual.

---

### 7. Blog: imagen OG usa ruta local en vez de URL absoluta
**Problema:** En `BlogPost.tsx` (linea 50 y 92), la imagen OG usa `typeof post.image === 'string' ? post.image : ...`. Las imagenes de blog son imports de Vite (objetos con URL relativa tras compilacion), no strings con URL absoluta. Esto significa que la condicion siempre dara `false` para imagenes importadas, y el OG fallback sera `/og-image.png` generico.

**Impacto:** Las previsualizaciones al compartir articulos del blog en redes sociales mostraran la imagen generica en vez de la imagen especifica del articulo.

**Solucion:** Eliminar la condicion `typeof` y usar directamente `post.image` (que ya es una URL valida tras el import de Vite), o construir la URL absoluta con `${BASE_URL}${post.image}`.

---

### 8. BlogPostCTA: enlace a "/#formaciones" no funciona con React Router
**Problema:** En `BlogPostCTA.tsx` (linea 38), el boton "Ver Todos los Cursos" enlaza a `/#formaciones`. Con React Router, los hash links a otras paginas no hacen scroll automatico al ancla despues de la navegacion.

**Impacto:** El usuario llega a la home pero no se desplaza a la seccion de formaciones.

**Solucion:** Cambiar la ruta a `/` y manejar el scroll programaticamente, o simplemente enlazar a `/contacto` o directamente a `/curso-detailing-profesional`.

---

## ERRORES MENORES (mejoras de calidad)

### 9. Blog: autor sin imagen en posts de blogPostsNew.ts y blogPostsBusiness.ts
**Problema:** En `blogPostsNew.ts` (linea 17) y `blogPostsBusiness.ts` (linea 18), el `defaultAuthor` tiene `image: ''` (cadena vacia). Aunque se reemplaza con la imagen correcta en el merge de `blogPosts.ts` (lineas 370-378), durante la construccion del array los posts individuales tienen `image: ''`. Si algun componente accede directamente a estos arrays antes del merge, el avatar aparecera roto.

**Impacto:** Bajo, pero introduce fragilidad. Si alguien importa directamente `newBlogPosts`, los avatares estaran rotos.

**Solucion:** Importar `danielLopez` en ambos archivos de datos y usarlo directamente, eliminando la dependencia del merge.

---

### 10. Sidebar del blog: reading progress no es sticky
**Problema:** En `BlogSidebar.tsx`, el contenedor del curso card (linea 28) tiene `sticky top-24`, pero el `BlogReadingProgress` esta fuera de este contenedor sticky (linea 103-105). Esto hace que el widget de progreso no se quede fijo al hacer scroll.

**Impacto:** El progreso de lectura desaparece al hacer scroll, perdiendo su utilidad.

**Solucion:** Mover el `BlogReadingProgress` dentro del contenedor `sticky` existente, despues de los beneficios/cursos, para que ambos widgets permanezcan visibles.

---

### 11. JornadaCero: "Aviso Legal" y "Privacidad" enlazan al mismo sitio
**Problema:** En la Jornada Zero (linea 905-907), tanto "Aviso Legal" como "Privacidad" enlazan a `/privacidad`. Deberian ser paginas diferentes o al menos tener labels distintas.

**Impacto:** Confuso para el usuario y legalmente incorrecto (aviso legal y privacidad son documentos diferentes en la legislacion espanola).

**Solucion:** Crear rutas separadas `/aviso-legal` y `/politica-privacidad`, o si se mantiene una sola pagina, unificar el texto del enlace.

---

### 12. JornadaCero: no usa MainLayout (doble navbar potencial)
**Problema:** La pagina Jornada Zero (`JornadaCero.tsx`) no usa `MainLayout`. En su lugar, tiene su propia barra de navegacion (lineas 99-157) y su propio footer (lineas 854-913). Esto crea una experiencia inconsistente respecto al resto del sitio.

**Impacto:** El usuario ve un navbar y footer diferente en la Jornada Zero comparado con el resto de paginas. Esto es intencional (landing page autonoma), asi que es mas una observacion que un error. Sin embargo, el `SoyNuevoButton` global del `MainLayout` no aparece aqui (lo cual es correcto porque ya se excluye esa ruta).

**Solucion:** Ninguna accion requerida si el diseno de landing page independiente es intencional. Solo documentar la decision.

---

## Resumen de prioridades

| Prioridad | Issue | Archivos afectados |
|---|---|---|
| Critica | 1. Paginas legales 404 | `App.tsx`, nuevo `PoliticaPrivacidad.tsx` |
| Critica | 4. OG Image index.html | `index.html` |
| Alta | 2. YouTube warnings | `HomeHero.tsx` |
| Alta | 3. Imports sin usar | `GalleryPreview.tsx` |
| Alta | 7. Blog OG image local | `BlogPost.tsx` |
| Media | 5. Copyright 2024 | `JornadaCero.tsx` |
| Media | 6. Email schema | `SEO.tsx`, `seoConfig.ts` |
| Media | 8. Hash link roto | `BlogPostCTA.tsx` |
| Baja | 9. Author image vacia | `blogPostsNew.ts`, `blogPostsBusiness.ts` |
| Baja | 10. Progress no sticky | `BlogSidebar.tsx` |
| Baja | 11. Links legales duplicados | `JornadaCero.tsx` |
| Info | 12. JornadaCero sin MainLayout | Observacion, sin accion |

---

## Plan de implementacion

Se propone resolver todos los problemas en una sola iteracion, empezando por los criticos:

1. Crear pagina legal basica y registrar rutas en `App.tsx`
2. Corregir `index.html` meta OG images
3. Arreglar `HomeHero.tsx` cleanup del YouTube player
4. Eliminar imports no usados en `GalleryPreview.tsx`
5. Corregir OG image en `BlogPost.tsx`
6. Actualizar copyright en `JornadaCero.tsx`
7. Unificar email en schemas SEO
8. Corregir hash link en `BlogPostCTA.tsx`
9. Anadir imagen de autor en archivos de datos del blog
10. Mover reading progress dentro del sticky container
11. Corregir links legales duplicados en JornadaCero

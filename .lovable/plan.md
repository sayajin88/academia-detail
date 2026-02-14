

## Correccion: Guardar imagenes de galeria correctamente

### Problema

Cuando se suben fotos de galeria en el panel admin, se suben al storage correctamente pero **nunca se insertan en la tabla `portfolio_images`**. El guardado del perfil (`handleSave`) no incluye logica para sincronizar las URLs de galeria con `portfolio_images`. La ficha del detailer (`DetailerPage`) lee de `portfolio_images`, asi que las fotos nunca aparecen.

### Solucion

#### 1. Base de datos: Politicas RLS para `portfolio_images`

Actualmente solo existe una politica SELECT publica. Faltan politicas de INSERT, UPDATE y DELETE para admins:

- INSERT: admins pueden insertar imagenes de portfolio
- DELETE: admins pueden eliminar imagenes de portfolio

#### 2. `AdminProfileEditModal.tsx` - Sincronizar galeria con `portfolio_images`

Cambios en el flujo de guardado:

- **Al guardar un perfil existente (source: "profile")**: Tras guardar los datos del perfil, sincronizar las imagenes de galeria con `portfolio_images`:
  1. Obtener las imagenes actuales de `portfolio_images` para ese detailer_id
  2. Comparar con las URLs en `form.gallery_urls`
  3. Insertar las nuevas (como `after_image_url`, sin `before_image_url`)
  4. Eliminar las que ya no estan en la lista

- **Al crear un perfil nuevo**: Tras el INSERT del perfil, obtener el ID generado e insertar todas las gallery_urls como registros en `portfolio_images`

- **Al guardar una aplicacion**: Las gallery_urls se guardan en `directory_applications` como antes (ya funciona). Cuando se aprueba, la edge function deberia migrarlas a `portfolio_images` automaticamente.

#### 3. `AdminProfileEditModal.tsx` - Cargar galeria existente al abrir

Cuando se abre un perfil existente (source: "profile"), cargar las imagenes desde `portfolio_images` y poblar `gallery_urls` en el formulario para que se vean en la UI de galeria.

### Detalle tecnico por archivo

**Migracion SQL:**
```text
-- Politica INSERT para admins en portfolio_images
CREATE POLICY "Admins can insert portfolio images"
ON portfolio_images FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Politica DELETE para admins en portfolio_images
CREATE POLICY "Admins can delete portfolio images"
ON portfolio_images FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'));

-- Politica SELECT para admins (ver todas, no solo publicadas)
CREATE POLICY "Admins can view all portfolio images"
ON portfolio_images FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'));
```

**`AdminProfileEditModal.tsx`:**

1. Anadir `useEffect` que al abrir un perfil (source: "profile"), haga `SELECT after_image_url FROM portfolio_images WHERE detailer_id = id` y rellene `gallery_urls` con esas URLs

2. En `handleSave`, tras guardar el perfil:
   - Obtener imagenes actuales: `SELECT id, after_image_url FROM portfolio_images WHERE detailer_id = form.id`
   - Calcular nuevas URLs (las que estan en gallery_urls pero no en las actuales) -> INSERT
   - Calcular URLs eliminadas (las que estan en actuales pero no en gallery_urls) -> DELETE por ID
   - Cada nueva imagen se inserta como: `{ detailer_id: form.id, after_image_url: url, title: null }`

3. Para perfiles nuevos: tras el INSERT, usar el ID retornado para insertar las gallery_urls en portfolio_images


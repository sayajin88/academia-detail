
Rediseño del email "Confirmación de contacto con dossier".

**Archivo a editar:**
- `supabase/functions/_shared/transactional-email-templates/contact-confirmation.tsx`

**Cambios:**

1. **Header con logos** — Sustituyo el bloque "DETAIL PARK / Academy" por dos logos centrados:
   - Academia Detail (uso el PNG ya existente en el repo, lo subo al bucket público para tener URL absoluta)
   - Detail Park (uso un wordmark estilizado en HTML/CSS al lado, salvo que me pases una URL de logo Detail Park)
   - Banda granate fina debajo como acento de marca

2. **CTA principal** — Cambio el texto del botón a **"Ver tipos de formación y precios"** manteniendo el destino actual (PDF dossier en Drive). Si prefieres que lleve a `/formaciones` u otra URL, dímelo y lo cambio en una línea.

3. **Email de respuesta** — Reemplazo todas las apariciones de `info@academiadetail.com` por `info@detailpark.com` (sección de contacto y `mailto:`).

4. **Bloque "Síguenos"** — Añado una sección nueva sobre el footer con dos botones visuales:
   - 🌐 **Web Detail Park** → `https://detailpark.com`
   - 📷 **Instagram @danidetailoficial** → `https://instagram.com/danidetailoficial`
   Uso iconos en imagen (glifo Instagram + favicon de la web) hospedados como assets públicos para máxima compatibilidad con clientes de email.

5. **Rediseño visual completo (más bonito y legible):**
   - Body fondo blanco (#ffffff) — regla obligatoria de email
   - Paleta granate `#8B2332` como acento, neutros `#F9FAFB / #E5E7EB / #374151`
   - Tipografía con mejor jerarquía: heading 26px, subhead 15px, body 16px line-height 1.7
   - CTA más destacado con sombra sutil y padding generoso
   - "Value box" con checks verdes en SVG en lugar de emojis (look más profesional)
   - Caja de exclusividad rediseñada como "callout" con borde lateral granate
   - Footer con bloque de redes integrado, divisor sutil, copyright Detail Park
   - Espaciado consistente (24/32px), bordes 12px

6. **Mantener:** props (`nombre`, `formacion`, `trackingToken`), pixel de tracking al final, estructura `TemplateEntry`, `Preview` text actualizado.

**Después de editar:**
- Redeploy de `send-transactional-email` para que la nueva plantilla entre en vigor inmediatamente.
- Opcional: enviar un test al admin para verificar visualmente.

**Detalles técnicos relevantes:**
- Los logos en email necesitan URL absolutas → los subo al bucket público de Supabase Storage (o uso assets ya hospedados en `https://academiadetail.com/`).
- React Email auto-escapa todas las props (sin `dangerouslySetInnerHTML`).
- El footer de unsubscribe lo añade el sistema automáticamente — no lo toco.

**Asunción que aplico salvo que digas lo contrario:** el botón sigue abriendo el PDF del dossier en Drive (cambio solo el texto). Si quieres que apunte a la web, indícamelo en una línea.

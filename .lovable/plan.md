

## Sistema de estado de contacto (Pendiente / Contactado) + mejoras

### Cambios en base de datos

Anadir dos columnas nuevas a `contact_submissions`:

```text
contact_status TEXT NOT NULL DEFAULT 'pendiente'   -- valores: 'pendiente', 'contactado'
contacted_at   TIMESTAMPTZ                         -- fecha en que se marco como contactado
admin_notes    TEXT                                 -- notas internas del admin sobre el lead
```

Tambien se necesita una politica RLS de UPDATE para que los admins puedan cambiar el estado:

```text
CREATE POLICY "Admins can update contact submissions"
ON contact_submissions FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));
```

### Cambios en `src/pages/AdminContacts.tsx`

**1. Filtro por estado** - Anadir una fila de filtro por estado (Todos / Pendientes / Contactados) encima o junto a los filtros de formacion. Contadores separados para pendientes y contactados.

**2. Columna de estado en la tabla** - Nueva columna "Estado" con badge visual:
- Pendiente: badge naranja con icono de reloj
- Contactado: badge verde con icono de check

**3. Boton de cambio rapido de estado** - En cada fila, un boton/toggle para marcar como "Contactado" sin abrir el modal. Al hacer clic llama a UPDATE en la base de datos y refresca la query.

**4. En el modal de detalle**:
- Mostrar el estado actual con posibilidad de cambiarlo
- Campo de notas internas (textarea) para apuntar observaciones sobre el lead
- Boton "Guardar notas" que persiste en la columna `admin_notes`
- Mostrar la fecha de contacto si existe (`contacted_at`)

**5. Indicadores mejorados** - Los contadores principales mostraran tambien cuantos estan pendientes vs contactados (ej: "12 total - 8 pendientes")

### Mejoras adicionales incluidas

- **Notas internas**: Campo libre para que el admin apunte "le envie presupuesto", "llamar el lunes", etc. Esto es muy util para el seguimiento comercial.
- **Fecha de contacto**: Se registra automaticamente cuando se marca como contactado, para saber cuanto tiempo paso entre la solicitud y la respuesta.
- **Ordenacion visual**: Los pendientes aparecen primero por defecto, destacados visualmente.

### Detalle tecnico

**Migracion SQL:**
- ALTER TABLE `contact_submissions` ADD COLUMN `contact_status` text NOT NULL DEFAULT 'pendiente'
- ALTER TABLE `contact_submissions` ADD COLUMN `contacted_at` timestamptz
- ALTER TABLE `contact_submissions` ADD COLUMN `admin_notes` text
- CREATE POLICY para UPDATE por admins

**Tipo ContactSubmission** actualizado con los 3 campos nuevos.

**Mutaciones React Query:**
- `useMutation` para cambiar estado (UPDATE contact_status + contacted_at)
- `useMutation` para guardar notas (UPDATE admin_notes)
- Ambas invalidan la query `admin-contacts` tras completarse


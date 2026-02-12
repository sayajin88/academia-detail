
# Plan: Mapa Interactivo de Espana en el Directorio

## Concepto

Un mapa interactivo de Espana usando Leaflet (ya instalado) que muestra todos los detailers/centros como marcadores en sus coordenadas reales. El mapa se posiciona entre el hero y los filtros, con una vista centrada en Espana. Los marcadores tienen colores segun el rango y al hacer clic muestran una mini-tarjeta (popup) con la informacion del detailer y un enlace directo a su ficha.

## Diseno Visual

- Mapa centrado en Espana (coordenadas ~40.0, -3.7, zoom 6)
- Tiles oscuros (CartoDB Dark Matter) para mantener la estetica premium del sitio
- Marcadores circulares con color segun rango:
  - Elite Detailer: dorado
  - Master Detailer: plateado
  - Certificado Pro: granate (color primario)
- Marcadores con tamano ligeramente diferente por rango (Elite mas grande)
- Cuando hay varios detailers muy juntos, los marcadores se agrupan (cluster) con un numero

## Interactividad

- **Click en marcador**: Abre un popup Leaflet con una mini-tarjeta que incluye:
  - Nombre comercial
  - Badge de rango (texto)
  - Tipo (Detailer / Centro)
  - Ciudad, provincia
  - Servicios (primeros 3)
  - Boton "Ver perfil" que enlaza a `/directorio/[slug]`
- **Zoom**: El mapa es zoomable con scroll y pinch (movil)
- **Responsive**: Altura adaptable (300px movil, 450px desktop)
- **Filtros sincronizados**: El mapa refleja los mismos filtros que el grid (si filtras por "Centro" solo se ven centros en el mapa)
- **Toggle vista**: Un boton permite alternar entre vista mapa y vista grid, o mostrar ambos

## Implementacion Tecnica

### Nuevo componente: `DirectoryMap.tsx`

```text
src/components/directory/DirectoryMap.tsx
```

Recibe como prop el array `detailers` (ya filtrado) y renderiza un mapa Leaflet con:
- Centro en Espana
- Un marcador por cada detailer que tenga lat/lng
- Popups con HTML personalizado (mini-tarjeta)
- Tiles CartoDB Dark Matter para coherencia visual

### Cambios en `Directory.tsx`

- Importar `DirectoryMap`
- Anadir un estado `viewMode` ("map" | "grid" | "both") con botones toggle
- Renderizar el mapa encima o junto al grid segun el modo
- Pasar el array `filtered` al mapa (mismos filtros que el grid)

### Sin dependencias nuevas

Leaflet ya esta instalado. No se necesita leaflet.markercluster por ahora -- si hay pocos perfiles, no hace falta clustering. Se puede anadir despues si crece.

## Layout en la pagina

La seccion del mapa se coloca entre los filtros y el grid. Un grupo de botones permite cambiar entre:
- Icono mapa: Solo mapa
- Icono grid: Solo tarjetas (comportamiento actual)
- Icono mixto: Mapa arriba + grid debajo (por defecto)

## Archivos a crear/modificar

| Archivo | Accion |
|---|---|
| `src/components/directory/DirectoryMap.tsx` | **Crear** - Mapa interactivo con marcadores y popups |
| `src/pages/Directory.tsx` | **Modificar** - Anadir toggle de vista y renderizar mapa |

No se necesitan cambios en base de datos ni dependencias nuevas.

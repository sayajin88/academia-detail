

# Enlace Interno Blog - Glosario: Estrategia SEO

## Objetivo

Insertar enlaces internos estrategicos desde los articulos del blog hacia la pagina del glosario (`/glosario-detailing`) para mejorar la autoridad SEO interna, aumentar el tiempo de permanencia del usuario y facilitar la comprension de terminos tecnicos.

## Sistema de enlace existente

El blog ya utiliza un sistema de marcadores `[[texto]]` que se mapean a un array `links` en cada seccion del articulo. Se reutilizara este mismo patron para insertar los nuevos enlaces al glosario.

## Estrategia de seleccion

Se han seleccionado los articulos mas tecnicos donde los terminos del glosario aparecen de forma natural. Las reglas aplicadas son:

- Maximo 2-3 enlaces al glosario por articulo (evitar sobrecarga)
- Solo en la primera mencion relevante del termino dentro del articulo
- Priorizando terminos que el lector podria no conocer (valor educativo)
- Sin repetir enlaces al glosario dentro del mismo articulo
- Sin duplicar enlaces que ya existen (ej. si una seccion ya enlaza a otro sitio, no sobrecargar)

## Mapa de enlaces por articulo

### Archivo: `src/data/blogPosts.ts`

**Articulo 2: "Guia Completa de Pulido de Coches Profesional"**
- Seccion `que-es-pulido-profesional`: Insertar `[[swirl marks]]` en la primera mencion de "marcas de lavado (swirl marks)"
  - Link: `{ text: 'swirl marks', href: '/glosario-detailing#letra-S', rel: 'follow' }`
- Seccion `proceso-paso-a-paso`: Insertar `[[clay bar]]` en la mencion de "descontaminacion con clay bar"
  - Link: `{ text: 'clay bar', href: '/glosario-detailing#letra-C', rel: 'follow' }`

**Articulo 3: "PPF vs Ceramico"**
- Seccion `que-son`: Insertar `[[dioxido de silicio (SiO2)]]` en la mencion del componente quimico
  - Link: `{ text: 'dióxido de silicio (SiO2)', href: '/glosario-detailing#letra-S', rel: 'follow' }`

**Articulo 5: "5 Errores que Cometen los Detailers Principiantes"**
- Seccion `error-2-productos-baratos`: Insertar `[[hologramas]]` en la mencion de defectos
  - Link: `{ text: 'hologramas', href: '/glosario-detailing#letra-H', rel: 'follow' }`

### Archivo: `src/data/blogPostsNew.ts`

**Articulo 9: "Tecnicas de Pulido en 3 Pasos"**
- Seccion `fundamentos-pulido`: Insertar `[[pulidora rotativa]]` en la primera mencion
  - Link: `{ text: 'pulidora rotativa', href: '/glosario-detailing#letra-R', rel: 'follow' }`
- Seccion `proteccion-post-pulido`: Insertar `[[coating ceramico]]` en la primera mencion de las opciones de proteccion
  - Link: `{ text: 'coating cerámico', href: '/glosario-detailing#letra-C', rel: 'follow' }`

**Articulo 12: "Limpieza y Restauracion de Cuero y Alcantara"**
- Seccion `cuero-vs-alcantara`: Insertar `[[Alcantara]]` en la primera mencion del material
  - Link: `{ text: 'Alcantara', href: '/glosario-detailing#letra-A', rel: 'follow' }`
- Seccion `limpieza-profunda-cuero`: Insertar `[[pH neutro]]` en la mencion de limpiador de pH neutro
  - Link: `{ text: 'pH neutro', href: '/glosario-detailing#letra-P', rel: 'follow' }`

**Articulo 13: "Tratamiento Ceramico (Ceramic Coating): Guia"**
- Seccion `que-es-ceramico`: Insertar `[[SiO2]]` en la primera mencion
  - Link: `{ text: 'SiO2', href: '/glosario-detailing#letra-S', rel: 'follow' }`
- Seccion `preparacion-aplicacion`: Insertar `[[clay bar]]` y `[[IPA]]` en las menciones del proceso
  - Links: `{ text: 'clay bar', href: '/glosario-detailing#letra-C', rel: 'follow' }`, `{ text: 'IPA', href: '/glosario-detailing#letra-I', rel: 'follow' }`

**Articulo 14: "Los 7 Errores que todo Detailer principiante comete"**
- Seccion `error-pulir-sin-medir`: Insertar `[[barniz]]` en la mencion de "capa de barniz"
  - Link: `{ text: 'barniz', href: '/glosario-detailing#letra-C', rel: 'follow' }` (apunta a Clear Coat / Barniz)

### Archivo: `src/data/blogPostsBusiness.ts`

**Articulo 22: "Montar un Lavadero Ecologico"**
- Seccion `detailing-sin-agua`: Insertar `[[GSM]]` en la mencion de "minimo 400 GSM"
  - Link: `{ text: 'GSM', href: '/glosario-detailing#letra-G', rel: 'follow' }`

**Articulo 23: "Por que el PPF es el servicio mas rentable de 2026"**
- Seccion `margenes-ppf`: Insertar enlace a `[[PPF]]` en el glosario en la primera mencion tecnica
  - Link: `{ text: 'PPF', href: '/glosario-detailing#letra-P', rel: 'follow' }`

## Resumen de cambios por archivo

| Archivo | Articulos modificados | Total enlaces nuevos |
|---------|----------------------|---------------------|
| `src/data/blogPosts.ts` | 3 articulos (ids 2, 3, 5) | 4 enlaces |
| `src/data/blogPostsNew.ts` | 4 articulos (ids 9, 12, 13, 14) | 7 enlaces |
| `src/data/blogPostsBusiness.ts` | 2 articulos (ids 22, 23) | 2 enlaces |
| **Total** | **9 articulos** | **13 enlaces al glosario** |

## Detalle tecnico de implementacion

Cada enlace se implementara de la misma manera que los enlaces existentes:

1. Se inserta un marcador `[[texto del termino]]` dentro del string `content` de la seccion correspondiente
2. Se anade una entrada al array `links` de esa seccion con:

```text
{
  text: 'texto del termino',
  href: '/glosario-detailing#letra-X',
  rel: 'follow'
}
```

3. Si la seccion ya tiene un array `links` con enlaces existentes, se anade al final
4. Si la seccion no tiene array `links`, se crea uno nuevo

Los anchors `#letra-X` ya existen en la pagina del glosario (generados por `GlossaryGrid.tsx`), lo que asegura que el usuario llegue a la seccion correcta de la letra del termino.

## Resultado esperado

- 13 nuevos enlaces internos que conectan el blog con el glosario
- Mejora del flujo de navegacion interna (el usuario descubre el glosario desde los articulos)
- Senales SEO de autoridad tematica al interconectar contenido educativo
- Mayor tiempo de permanencia en el sitio (el lector consulta definiciones mientras lee)
- Los terminos tecnicos en los articulos se convierten en enlaces utiles para lectores principiantes


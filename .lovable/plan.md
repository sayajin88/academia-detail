

# Mejoras del Glosario: Secciones Educativas, Hero, Tarjetas y Verificacion

## Resumen

Se aplicaran tres mejoras principales a la pagina del glosario:

1. **Secciones educativas colapsables** extraidas del documento original (6 secciones tematicas)
2. **Rediseno de las tarjetas de terminos** para mayor legibilidad y aspecto moderno
3. **Generacion de imagen hero profesional** para la cabecera de la pagina

La verificacion funcional (buscador, filtros, navegacion alfabetica) ya se ha realizado y todo funciona correctamente.

---

## 1. Secciones Educativas Colapsables

Se anadiran 6 secciones educativas extraidas del prologo del documento, colocadas entre el hero/filtros y el grid de terminos. Cada seccion sera un acordeon colapsable con contenido resumido.

### Contenido de las secciones:

| Seccion | Titulo | Contenido clave |
|---------|--------|-----------------|
| 1 | Morfologia de la Pintura Moderna | Capas del acabado automotriz: imprimacion (10-20 micras), base coat (15-25 micras), barniz/clear coat (35-50 micras). El barniz es la capa sobre la que trabaja el detallador. |
| 2 | Quimica de Superficies: pH y Tensioactivos | Tabla de pH (acido fuerte 1-4, acido debil 5-6, neutro 7, alcalino debil 8-11, alcalino fuerte 12-14) y su relacion con la limpieza de diferentes contaminantes. |
| 3 | Descontaminacion: Quimica y Mecanica | Dos fases: quimica (eliminadores de hierro, disolventes de alquitran) y mecanica (clay bar con lubricacion adecuada). |
| 4 | Ingenieria de la Correccion de Pintura | Tres etapas: corte (compound), pulido (polish) y refinado (jewelling). Tipos de pulidoras: rotativa, DA, rotacion forzada. |
| 5 | Nanotecnologia en Proteccion | Comparativa: cera carnauba (1-3 meses), sellador sintetico (6-9 meses), coating ceramico (2-5+ anos). Innovacion del grafeno. |
| 6 | Detallado de Interiores y Sanitizacion | Tratamiento de ozono, limpiadores enzimaticos, gestion de olores y microbiologia del habitaculo. |

### Implementacion:

**Nuevo componente: `src/components/glossary/GlossaryEducationalSections.tsx`**
- Utiliza el componente `Accordion` de Radix UI ya existente en el proyecto
- Cada seccion tendra un icono tematico (Layers, FlaskConical, Sparkles, Wrench, Shield, Armchair)
- Diseno: fondo `bg-card/50` con borde sutil, estilo coherente con el tema oscuro
- Incluye tablas de datos donde aplique (tabla de pH, tabla comparativa de protecciones, tabla de capas de pintura)

**Modificar: `src/pages/Glossary.tsx`**
- Insertar el componente entre la seccion de filtros y el contenido principal del grid
- Envuelto en una seccion con titulo "Fundamentos del Detailing" y subtitulo breve

---

## 2. Rediseno de Tarjetas de Terminos

### Problemas actuales:
- La fuente del titulo del termino (`text-base font-bold`) se ve pequena y poco destacada
- Las tarjetas son funcionales pero planas, con poco contraste visual

### Cambios en `GlossaryTermCard.tsx`:
- Titulo del termino: cambiar a `text-lg font-monument` (Bebas Neue) para mayor impacto visual y diferenciacion tipografica, con `tracking-wide`
- Anadir una linea decorativa sutil (borde izquierdo con color de la categoria) para guiar el ojo
- Aumentar el padding interno de `p-5` a `p-6`
- Mejorar la definicion con `text-sm leading-relaxed` a `text-[15px] leading-relaxed` para mejor legibilidad
- Anadir efecto de hover mas pronunciado: `hover:translate-y-[-2px]` y sombra mas visible
- El badge de categoria se mantiene pero se redondea mas (`rounded-full` en lugar de `rounded-md`)

### Cambios en `GlossaryGrid.tsx`:
- Aumentar el gap entre tarjetas de `gap-3` a `gap-4`

---

## 3. Imagen Hero Profesional

Se generara una imagen hero usando el modelo de IA de generacion de imagenes disponible. La imagen representara:
- Estetica de taller de detailing premium
- Tonos oscuros coherentes con la paleta de la web (charcoal/burgundy)
- Elementos visuales: herramientas de pulido, superficies brillantes, ambiente profesional

La imagen se integrara como fondo del hero section en `Glossary.tsx` con un overlay degradado para mantener la legibilidad del texto.

---

## Archivos afectados

| Archivo | Tipo | Cambio |
|---------|------|--------|
| `src/components/glossary/GlossaryEducationalSections.tsx` | Nuevo | 6 secciones educativas en acordeon |
| `src/components/glossary/GlossaryTermCard.tsx` | Modificar | Rediseno tipografico y visual de las tarjetas |
| `src/components/glossary/GlossaryGrid.tsx` | Modificar | Aumentar gap entre tarjetas |
| `src/pages/Glossary.tsx` | Modificar | Insertar secciones educativas + imagen hero de fondo |

## Resultado de la verificacion funcional

Se ha verificado en el navegador que:
- El buscador filtra correctamente en tiempo real (probado con "PPF")
- Los filtros por categoria funcionan (probado con "Herramientas")
- La navegacion alfabetica lateral hace scroll correcto a cada letra (probado con letra "P")
- El boton de limpiar busqueda funciona
- Las letras no disponibles aparecen deshabilitadas
- Todo el layout es responsivo


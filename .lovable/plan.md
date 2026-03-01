

# Completar Cobertura de Paginas en llms.txt y llms-full.txt

## Problema

Los archivos `llms.txt` y `llms-full.txt` (los que usan ChatGPT, Gemini, Claude y Perplexity para entender tu web) no incluyen todas las paginas publicadas. Faltan paginas de eventos y utilidades que si estan en el sitemap pero no en estos archivos de descubrimiento para IAs.

## Paginas que faltan

| Pagina | llms.txt | llms-full.txt |
|--------|----------|---------------|
| Jornada Zero (`/jornada-zero-detailing`) | FALTA | FALTA |
| Up Detail Evento (`/up-detail-evento`) | FALTA | FALTA |
| Unete al Directorio (`/centros-detailing-espana/unete`) | FALTA | FALTA |
| Politica de Privacidad (`/politica-privacidad`) | FALTA | FALTA |

Ademas, `llms-full.txt` no menciona las paginas de Quienes Somos ni Contacto como secciones con URL (solo aparecen parcialmente en la seccion de contacto).

## Lo que YA esta bien (no se toca)

- robots.txt: Todos los bots de IA permitidos correctamente
- Sitemap: Las 4 partes cubren todas las paginas, blog y glosario
- Blog sitemap: Los 26 slugs coinciden exactamente con los datos del frontend
- Schemas JSON-LD: No se modifican
- Ningun componente visual cambia

## Plan de Implementacion

### Paso 1: Actualizar llms.txt

Anadir las paginas que faltan en las secciones correspondientes:

- En "Cursos de Formacion": Anadir linea para Jornada Zero con URL `/jornada-zero-detailing` (diferente de Jornada Zero - Curso Iniciacion que ya aparece con la URL `/curso-detailing-iniciacion`)
- Crear seccion "Eventos" con Up Detail (`/up-detail-evento`)
- En "Recursos y Herramientas": Anadir "Unete al Directorio" (`/centros-detailing-espana/unete`)
- Crear seccion "Legal" con Politica de Privacidad (`/politica-privacidad`)

### Paso 2: Actualizar llms-full.txt

Anadir las mismas paginas que faltan con descripcion expandida:

- Seccion "Jornada Zero" con URL, duracion y descripcion
- Seccion "Evento Up Detail" con URL y descripcion
- Seccion "Quienes Somos" con URL y descripcion breve
- Seccion "Contacto" con URL y descripcion
- Seccion "Unete al Directorio" con URL
- Seccion "Legal" con URL de politica de privacidad

## Detalles Tecnicos

### Archivos a modificar:
1. `public/llms.txt` -- Anadir 4 URLs que faltan en secciones nuevas y existentes
2. `public/llms-full.txt` -- Anadir secciones expandidas para las paginas que faltan

### Sin nuevas dependencias
### Sin cambios en base de datos
### Sin cambios visuales
### Sin cambios en schemas JSON-LD ni robots.txt


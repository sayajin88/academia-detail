

## Plan: Contenido Único por Ciudad + Estrategia de Keywords + Footer

### Problema actual de contenido duplicado

La plantilla actual tiene **3 secciones idénticas** en todas las ciudades (solo cambia el nombre de la ciudad):
- La sección "¿Por qué formarte en Alicante?" tiene los **mismos 3 bloques** (Taller 100% real, Todo incluido, Certificación nacional) con texto idéntico palabra por palabra
- El CTA final es idéntico
- La estructura hero repite el mismo patrón con solo el nombre de ciudad intercambiado

Google detecta esto como **contenido thin/boilerplate** con sustitución de variables. Riesgo alto de canibalización y penalización.

### Cambios propuestos

#### 1. Añadir campos únicos por ciudad al `cityData`

Cada ciudad tendrá contenido exclusivo adicional:

- **`ventajasUnicas`**: Array de 3 objetos `{titulo, descripcion}` con ventajas específicas para esa ciudad (reemplaza los 3 bloques genéricos idénticos). Ejemplo: Madrid habla de "mercado de lujo en La Moraleja", Barcelona de "demanda en Sant Cugat", Valencia de "proximidad sin alojamiento", etc.
- **`datosLocales`**: Datos de mercado específicos (n.o de centros detailing en la ciudad, ticket medio local, crecimiento interanual local)
- **`serviciosMasDemandados`**: Los 3 servicios más demandados en esa zona específica, con porcentaje de demanda (genera contenido numérico único)
- **`alumnosGraduados`**: Número de alumnos de esa ciudad concreta
- **`zonasNegocio`**: Array de barrios/zonas de alto potencial exclusivas de la ciudad

#### 2. Añadir una sección nueva "Mercado del detailing en [Ciudad]"

Sección con datos locales exclusivos que no se repite entre ciudades:
- Estadísticas del mercado local (vehículos premium, competencia, ticket medio)
- Zonas de mayor demanda en la ciudad
- Servicios más demandados en la región

Esto genera **contenido indexable único** que diferencia cada URL.

#### 3. Sección "Alumnos de [Ciudad]" con contador

Bloque con el número de alumnos graduados de esa ciudad + mención a las zonas donde operan.

#### 4. Estrategia de keywords en headings

Actualmente los H1/H2 usan patrones genéricos. Se cambiará a:
- **H1**: "Curso de Detailing Profesional en {Ciudad}" (no "para profesionales de")  
- **H2s**: Incluir variaciones long-tail: "Formación detailing {Ciudad}", "Aprender detailing en {Ciudad}", "Academia detailing {Ciudad}"
- Añadir campo **`h1`** y **`h2Mercado`** al cityData para que cada heading sea único y no un simple find-replace

#### 5. Schema FAQPage por ciudad

Añadir JSON-LD `FAQPage` schema con las preguntas específicas de cada ciudad para que Google muestre rich results diferenciados por URL.

#### 6. Footer: sección "Cursos por ciudad"

Añadir un nuevo bloque en el Footer con enlaces a las 5 ciudades:

```
Cursos por ciudad
├── Detailing Madrid
├── Detailing Barcelona  
├── Detailing Valencia
├── Detailing Sevilla
└── Detailing Bilbao
```

Esto aporta enlazado interno permanente desde todas las páginas.

### Archivos a modificar

| Archivo | Cambio |
|---|---|
| `src/pages/CursoDetailingCiudad.tsx` | Añadir campos únicos al cityData, nueva sección "Mercado local", headings con keywords, schema FAQPage |
| `src/components/layout/Footer.tsx` | Añadir columna "Cursos por ciudad" con enlaces a las 5 landing pages |

### Archivos NO modificados
- Ningún otro archivo de estilos, rutas o lógica


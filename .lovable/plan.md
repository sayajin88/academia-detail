

# Mejora del Schema.org Injector para Cursos

## Problema actual

La funcion `getFormationSEO` en `seoConfig.ts` solo recibe 5 campos del curso (title, description, price, duration, faqs), pero cada curso tiene datos mucho mas ricos en `formationDetails.ts` que Google nunca ve:

| Dato disponible | Se inyecta en Schema? | Campo Schema.org correspondiente |
|---|---|---|
| `modules` (syllabus completo) | NO | `syllabusSections` / `hasPart` |
| `whatYouLearn` (competencias) | NO | `teaches` (usa texto generico) |
| `forWho` (audiencia) | NO | `audience` |
| `instructor` (por curso) | NO | Usa siempre Daniel Lopez |
| `includes` (lo que incluye) | NO | `coursePrerequisites` / descripcion |
| `levels` (niveles) | NO | `hasCourseInstance` multiples |
| `certificationTitle` | NO | `occupationalCredentialAwarded` |
| `originalPrice` (precio tachado) | NO | `offers.priceSpecification` |
| `advantages` | NO | (complementario) |

Ademas, hay valores hardcoded incorrectos:
- `duration` siempre cae a "P5D" (5 dias), pero hay cursos de 2, 4 y 2-4 dias
- `courseWorkload` siempre "PT40H" independientemente del curso
- `teaches` usa la plantilla generica "Tecnicas profesionales de X" en lugar de los datos reales
- `occupationalCredentialAwarded` siempre dice "Certificado de Detailing Profesional" incluso para PPF/Wrapping
- Instructor siempre es Daniel Lopez, pero Wrapping y PPF tienen a Gerardo

---

## Cambios planificados

### 1. Ampliar la interfaz de datos que recibe `getFormationSEO` (seoConfig.ts)

Cambiar la firma de `getFormationSEO` para aceptar el objeto `FormationDetail` completo (o los campos adicionales necesarios):

**Campos nuevos que se pasaran:**
- `modules` -- para generar `syllabusSections` / `hasPart`
- `whatYouLearn` -- para generar `teaches` con datos reales
- `forWho` -- para generar `audience`
- `instructor` -- para inyectar el instructor correcto por curso
- `includes` -- para enriquecer la descripcion del curso
- `levels` -- para generar multiples `CourseInstance` con precios y duraciones propias
- `certificationTitle` -- para el nombre correcto del credential
- `originalPrice` -- para mostrar precio original vs descuento en `offers`
- `comingSoon` -- para marcar disponibilidad correctamente

### 2. Mejorar `generateCourseSchemaEnhanced` (seoConfig.ts)

Refactorizar la funcion para aceptar los nuevos campos y generar un schema mucho mas completo:

```text
Course
  +-- name, description, url, image
  +-- provider (EducationalOrganization)
  +-- teaches[] .................. <-- whatYouLearn real
  +-- audience ................... <-- forWho real  
  +-- about[] .................... <-- temas clave del curso
  +-- syllabusSections[] ......... <-- modules con topics
  +-- hasCourseInstance[]
  |     +-- CourseInstance (por cada level)
  |     |     +-- courseMode: "onsite"
  |     |     +-- duration: duración real
  |     |     +-- instructor: instructor real del curso
  |     |     +-- location: taller
  |     |     +-- maximumEnrollment: 3
  |     |     +-- offers: precio especifico del nivel
  +-- offers (principal)
  |     +-- price, priceCurrency
  |     +-- priceSpecification (con precio original tachado)
  |     +-- availability (LimitedAvailability o PreOrder si comingSoon)
  +-- occupationalCredentialAwarded
  |     +-- name: certificationTitle real
  +-- aggregateRating
  +-- coursePrerequisites: "Sin experiencia previa"
  +-- numberOfCredits / totalHistoricalEnrollment
```

### 3. Actualizar `FormationDetailPage` para pasar datos completos (FormationDetail.tsx)

Cambiar la llamada a `getFormationSEO` para pasar el objeto `formation` completo en lugar de solo 5 campos:

Antes:
```text
seoConfig.getFormationSEO(slug, {
  title: formation.title,
  description: formation.description,
  price: formation.price,
  duration: formation.duration,
  faqs: formation.faqs,
});
```

Despues:
```text
seoConfig.getFormationSEO(slug, formation);
```

### 4. Corregir duraciones ISO 8601 por curso (seoConfig.ts)

Mapa de duraciones reales:

| Curso | Duracion real | ISO 8601 | Workload |
|---|---|---|---|
| Detailing | 4 dias | P4D | PT32H |
| Wrapping | 2-4 dias | P4D (max) | PT32H |
| PPF | 2 dias | P2D | PT16H |
| Restauracion | 2 dias | P2D | PT16H |

### 5. Corregir instructor por curso (seoConfig.ts)

| Curso | Instructor | Schema |
|---|---|---|
| Detailing | Daniel Lopez | instructorSchema actual |
| Wrapping | Gerardo | nuevo schema con datos de formationDetails |
| PPF | Gerardo | nuevo schema con datos de formationDetails |
| Restauracion | Daniel Lopez | instructorSchema actual |

La funcion usara `formation.instructor` para generar el schema del instructor dinamicamente.

---

## Resumen de archivos

| Archivo | Accion | Descripcion |
|---|---|---|
| `src/utils/seoConfig.ts` | Modificar | Ampliar `getFormationSEO` y `generateCourseSchemaEnhanced` para aceptar y usar todos los datos del curso: modules, whatYouLearn, forWho, instructor, levels, includes, certificationTitle, originalPrice |
| `src/pages/FormationDetail.tsx` | Modificar | Pasar el objeto `formation` completo a `getFormationSEO` en lugar de solo 5 campos |

---

## Resultado esperado

- Google recibira un schema Course mucho mas rico con syllabus real, competencias, audiencia, instructor correcto y multiples instancias con precios
- Cada curso tendra duraciones e instructores correctos en lugar de valores genericos
- Los rich snippets de Google podran mostrar mas informacion: precio con descuento, modulos del temario, y credenciales especificas
- Se mantiene retrocompatibilidad con el resto de schemas de la pagina (LocalBusiness, FAQ, Breadcrumbs, etc.)

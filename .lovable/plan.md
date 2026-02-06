

## Plan: Optimizacion de ALT Texts para SEO

### ANALISIS COMPLETO

He revisado todos los archivos con imagenes del proyecto y los cruzo con las palabras clave objetivo:

**Palabras clave principales:**
- curso detailing / curso de detailing
- curso de pulido de coches
- curso tratamiento ceramico
- escuela de detailing
- como montar negocio detailing / como montar lavadero de coches
- formacion detailing Espana
- aprender detailing desde cero
- car wrapping / curso wrapping
- PPF / paint protection film
- restauracion vehiculos

---

### PROBLEMAS DETECTADOS Y CORRECCIONES

#### 1. LOGOS - Descripcion generica, sin palabras clave

| Archivo | Alt Actual | Alt Propuesto |
|---------|-----------|---------------|
| `Navbar.tsx` (linea 129) | `"Detail Park"` | `"Academia Detail - Cursos de detailing profesional en Espana"` |
| `Navbar.tsx` (linea 330) | `"Detail Park"` | `"Academia Detail - Cursos de detailing profesional en Espana"` |
| `Footer.tsx` (linea 33) | `"Detail Park"` | `"Academia Detail - Escuela de detailing profesional"` |
| `OptimizedHero.tsx` (linea 37) | `"Detail Park"` | `"Academia Detail logo"` |
| `OptimizedHero.tsx` (linea 60) | `"Detail Park Background"` | `"Taller de detailing profesional - Formacion practica en Alicante"` |

---

#### 2. HERO PRINCIPAL - Bueno pero mejorable

| Archivo | Alt Actual | Alt Propuesto |
|---------|-----------|---------------|
| `HomeHero.tsx` (linea 58) | `"Detail Park - Centro de formacion de detailing profesional"` | `"Curso de detailing profesional - Formacion practica en taller real Alicante"` |

---

#### 3. FORMACIONES GRID - Usa shortTitle, no describe la imagen

| Archivo | Alt Actual | Alt Propuesto |
|---------|-----------|---------------|
| `FormationsGrid.tsx` (linea 52) | `{formation.shortTitle}` (ej: "Curso de Detailing") | Cambiar a usar una propiedad `imageAlt` en el dato |

**Nuevos alt texts por formacion en `formations.ts`:**

| Formacion | Alt Propuesto |
|-----------|---------------|
| Detailing | `"Curso de detailing profesional - Alumnos practicando pulido de coches en taller real"` |
| Wrapping | `"Curso de car wrapping - Formacion practica en vinilado de vehiculos profesional"` |
| PPF | `"Curso de PPF - Instalacion de paint protection film en vehiculo de alta gama"` |
| Restauracion | `"Curso de restauracion de vehiculos - Limpieza y acondicionamiento interior profesional"` |

---

#### 4. INSTRUCTOR - Bueno pero puede mejorar

| Archivo | Alt Actual | Alt Propuesto |
|---------|-----------|---------------|
| `InstructorSection.tsx` (linea 38) | `"Daniel Lopez - Instructor Principal de Detail Park"` | `"Daniel Lopez - Instructor de cursos de detailing profesional en Academia Detail"` |
| `InstructorProfile.tsx` (linea 120) | `"Daniel Lopez - Instructor Experto en Detailing Profesional"` | `"Daniel Lopez - Formador experto en detailing, pulido y tratamiento ceramico"` |

---

#### 5. TESTIMONIOS - Fotos genericas sin contexto SEO

| Archivo | Alt Actual | Alt Propuesto |
|---------|-----------|---------------|
| `TestimonialsSection.tsx` (linea 227) | `` `Foto de ${testimonial.name}` `` | `` `${testimonial.name} - Alumno certificado en ${testimonial.formation} por Academia Detail` `` |

---

#### 6. GALERIA PREVIEW (Home) - Textos correctos pero genericos

| Archivo | Alt Actual | Alt Propuesto (en `GalleryPreview.tsx`) |
|---------|-----------|---------------|
| training1 | `"Clase completa de detailing"` | `"Clase de curso de detailing profesional - Alumnos en formacion practica"` |
| training2 | `"Grupo de alumnos en formacion"` | `"Grupo de alumnos en curso de detailing - Formacion presencial en Alicante"` |
| training3 | `"Practica con pulidora"` | `"Practica de pulido de coches con pulidora profesional - Curso de detailing"` |
| training4 | `"Instructor explicando tecnicas"` | `"Instructor explicando tecnicas de detailing y tratamiento ceramico"` |
| training5 | `"Formacion practica"` | `"Formacion practica de detailing en taller real con vehiculos de alta gama"` |
| training6 | `"Alumnos en clase teorica"` | `"Alumnos en clase teorica de curso de detailing profesional"` |
| training7 | `"Alumno con certificado"` | `"Alumno certificado por Academia Detail - Escuela de detailing en Espana"` |
| training8 | `"Ambiente de formacion"` | `"Ambiente de formacion en escuela de detailing - Aprender detailing desde cero"` |

---

#### 7. CARRERA DETAILING - Muy generico

| Archivo | Alt Actual | Alt Propuesto |
|---------|-----------|---------------|
| `CarreraHero.tsx` (linea 34) | `"Carrera Detailing"` | `"Formacion profesional para montar tu centro de detailing - Programa completo 1 mes"` |

---

#### 8. CERTIFICACION - Generico

| Archivo | Alt Actual | Alt Propuesto |
|---------|-----------|---------------|
| `FormationCertification.tsx` (linea 36) | `"Certificado Detail Park"` | `"Certificado profesional de detailing - Acreditacion Academia Detail Espana"` |

---

#### 9. FORMATION HERO - Usa solo titulo, no describe

| Archivo | Alt Actual | Alt Propuesto |
|---------|-----------|---------------|
| `FormationHero.tsx` (linea 29) | `{formation.title}` | Usar `formation.heroDescription` o un alt especifico |

Se anadira un campo `heroAlt` en `formationDetails.ts`:

| Formacion | heroAlt |
|-----------|---------|
| Detailing | `"Curso de pulido de coches y tratamiento ceramico - Formacion intensiva presencial"` |
| Wrapping | `"Curso de car wrapping profesional - Formacion en vinilado de vehiculos"` |
| PPF | `"Curso de PPF paint protection film - Instalacion profesional certificada"` |
| Restauracion | `"Curso de restauracion de vehiculos - Tecnicas avanzadas de recuperacion"` |

---

#### 10. ABOUT HERO / HISTORY

| Archivo | Alt Actual | Alt Propuesto |
|---------|-----------|---------------|
| `AboutHero.tsx` (linea 37) | backgroundImage CSS (sin alt) | No tiene img tag, no aplica |
| `AboutHistory.tsx` (linea 60) | `"Juan Daniel - Fundador de Detail Park"` | `"Juan Daniel - Fundador de Academia Detail y Detail Park, escuela de detailing"` |

---

#### 11. EXPERTISE SHOWCASE (Portfolio) - Buenos pero repetitivos

Los alt texts en `ExpertiseShowcase.tsx` y `galleryData.ts` ya estan bien optimizados con palabras clave. No requieren cambios.

---

### ARCHIVOS A MODIFICAR

| Archivo | Cambios |
|---------|---------|
| `src/components/layout/Navbar.tsx` | Alt del logo (2 instancias) |
| `src/components/layout/Footer.tsx` | Alt del logo |
| `src/components/home/HomeHero.tsx` | Alt de imagen hero |
| `src/components/home/GalleryPreview.tsx` | Alt texts de 8 imagenes de galeria |
| `src/components/home/TestimonialsSection.tsx` | Alt de fotos de testimonios |
| `src/components/home/InstructorSection.tsx` | Alt de imagen instructor |
| `src/components/InstructorProfile.tsx` | Alt de imagen instructor |
| `src/components/OptimizedHero.tsx` | Alt de logo y background |
| `src/components/carrera/CarreraHero.tsx` | Alt de imagen hero |
| `src/components/formation/FormationCertification.tsx` | Alt de certificado |
| `src/components/formation/FormationHero.tsx` | Alt de imagen hero |
| `src/components/about/AboutHistory.tsx` | Alt de video thumbnail |
| `src/data/formations.ts` | Anadir campo `imageAlt` por formacion |
| `src/data/formationDetails.ts` | Anadir campo `heroAlt` por formacion |
| `src/components/home/FormationsGrid.tsx` | Usar `formation.imageAlt` en vez de `shortTitle` |

---

### CRITERIOS APLICADOS

1. **Descriptivo**: Cada alt describe lo que realmente muestra la imagen
2. **Palabras clave**: Incluye terminos SEO objetivo (curso detailing, pulido de coches, tratamiento ceramico, etc.)
3. **Natural**: No keyword stuffing, lectura fluida
4. **Unico**: No hay dos alt texts identicos
5. **Accesible**: Util para lectores de pantalla


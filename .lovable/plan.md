

## Añadir a Daniel Lopez al equipo con fondo editado

### Resumen
Se añadira a Daniel Lopez (fundador, instructor principal y gerente de Detail Park) como tercer miembro del equipo en la seccion "Nuestro Equipo" de la pagina Quienes Somos. Ademas, se editara su foto usando la IA de generacion de imagenes para añadirle el fondo de la fachada de Detail Park que comparten Sergio y Gerardo.

### Edicion de la imagen

La foto subida tiene fondo blanco. Se usara la API de IA de imagenes (modelo de edicion) para:
- Tomar la foto original de Daniel con fondo blanco
- Añadirle un fondo que simule la fachada del centro Detail Park (tonos oscuros/grisaceos con el exterior de un local profesional), similar al que comparten Sergio Felipe y Gerardo Espinosa
- El resultado se guardara como `src/assets/daniel-lopez-team.jpg`

Si el resultado de la IA no es satisfactorio, como alternativa se usara la foto tal cual con un fondo CSS oscuro via gradiente para que encaje visualmente con la estetica de la seccion.

### Cambios en el layout

Actualmente la seccion muestra 2 tarjetas en grid `md:grid-cols-2` con `max-w-4xl`. Al añadir un tercer miembro:
- Se cambiara a `lg:grid-cols-3` con `max-w-6xl` para acomodar 3 tarjetas
- En tablet (`md`), se mantendra `md:grid-cols-2` con la tercera tarjeta debajo
- En movil, las 3 tarjetas se apilaran verticalmente
- Daniel aparecera como la primera tarjeta (posicion de liderazgo)

### Contenido del perfil de Daniel

- **Nombre**: Daniel Lopez
- **Rol**: Fundador & Instructor Principal
- **Descripcion**: Fundador de Detail Park y Academia Detail, Daniel combina mas de 12 anos de experiencia en detailing profesional con una vision empresarial unica. Ha trabajado con marcas como Ferrari, Lamborghini y Porsche. Su metodologia une la perfeccion tecnica con la mentalidad de negocio rentable.
- **Tags**: Detailing, Gestion de Negocio, Instructor Principal
- **Alt SEO**: "Daniel Lopez - Fundador e instructor principal de Academia Detail y Detail Park"

### Seccion tecnica

**Archivos nuevos:**
- `src/assets/daniel-lopez-team.jpg` - foto de Daniel con fondo editado (generada por IA)

**Archivos modificados:**
- `src/components/about/AboutTeam.tsx`:
  - Nuevo import de `danielImg` desde `@/assets/daniel-lopez-team.jpg`
  - Nuevo objeto en el array `teamMembers` en primera posicion (antes de Sergio)
  - Grid: de `md:grid-cols-2 max-w-4xl` a `md:grid-cols-2 lg:grid-cols-3 max-w-6xl`

**Proceso de edicion de imagen:**
1. Crear una funcion backend temporal (`edit-team-photo`) que use la API de IA de imagenes para editar el fondo de la foto de Daniel
2. Enviar la imagen original junto con la instruccion de añadir un fondo de fachada de local profesional de detailing (similar a Detail Park)
3. Guardar el resultado como `src/assets/daniel-lopez-team.jpg`
4. Eliminar la funcion temporal despues de usarla

**Alternativa si la edicion por IA no da buen resultado:**
- Usar la foto original tal cual (`Yo_sin_fondo-2.png`)
- Añadir un fondo CSS oscuro con gradiente al contenedor de la imagen (`.bg-gradient-to-b from-[#2a2a30] to-[#1a1a1f]`) para que el fondo blanco no desentone con el tema oscuro de la web

**Orden final de los miembros:**

```text
[Daniel Lopez]  [Sergio Felipe]  [Gerardo Espinosa]
 Fundador &      Instructor &     Especialista en
 Instructor      Gestor de        Wrapping & PPF
 Principal       Centro
```


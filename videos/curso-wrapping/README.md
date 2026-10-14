# Vídeo · Curso de Car Wrapping (9:16, ~43 s)

Vídeo para redes sociales hecho con [Remotion](https://www.remotion.dev/) a partir de los
datos, capturas y fotos reales de academiadetail.com.

## Guion (voz en off)

> Esto no es pintura… ¡Es VINILO! Y puede ser tu nueva profesión.
> El car wrapping es un sector en auge, que no para de crecer… y con el que puedes trabajar en casi cualquier parte del mundo.
> En Academia Detail tienes dos niveles, de dos días cada uno.
> Principiante: tipos de vinilo, metodología de corte e instalación práctica.
> Avanzado: cromados, interiores de puerta y técnicas profesionales.
> Cada nivel, 1.999 euros más IVA… con material, comida y certificado incluidos. Y máximo tres alumnos por grupo.
> Y lo más importante: no vivimos de la formación. Vivimos de nuestros clientes. Más de dos mil proyectos en Detail Park lo demuestran.
> Reserva tu plaza en academiadetail.com.

Todos los datos salen de `src/data/formationDetails.ts` y `src/data/site.ts` de la web.

## Escenas

| Seg. | Escena | Contenido |
|---|---|---|
| 0–4,5 | Hook | «Esto no es pintura → VINILO → tu nueva profesión» |
| 4,5–10,9 | Sector | Sector en auge (gráfico ilustrativo, sin cifras) + globo «cualquier parte del mundo» |
| 10,9–14,5 | 2 niveles | Logo Academia Detail + móvil con la web real |
| 14,5–19 | Nivel 1 | Principiante · 2 días · temario |
| 19–23,1 | Nivel 2 | Avanzado · 2 días · temario · «los dos seguidos: 4 días» |
| 23,1–26,4 | Precio | 1.999 € + IVA por nivel + tarjeta de precios real de la web |
| 26,4–31,2 | Incluye | Material, comida, certificado, bolsa de empleo + máx. 3 alumnos |
| 31,2–38,6 | Prueba real | «No vivimos de la formación, vivimos de nuestros clientes» + 2.000 proyectos |
| 38,6–43,5 | CTA | academiadetail.com + logos Academia Detail y Detail Park |

Los tiempos de cada palabra están en `src/cues.ts`.

## Audio

Las pistas van en `public/audio/` (si falta alguna, el vídeo se renderiza sin ella):

- `vo.mp3` — voz en off (ElevenLabs v3, voz «Andrés Bustamante», generada en Magnific)
- `music.mp3` — música clásica-retro (barroco + synthwave), generada en Magnific
- `whoosh.mp3`, `impact.mp3`, `vinyl.mp3` — efectos

## Uso

```bash
npm i
npm run dev                                   # Remotion Studio
npx remotion render CursoWrapping out/curso-wrapping.mp4
```

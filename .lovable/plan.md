# Plazas cerradas en Jornada Zero y Up Detail

Ninguna de las dos formaciones tiene fecha confirmada. Las landings deben comunicar con claridad que las inscripciones están cerradas y que se abrirán plazas próximamente, sin perder al lead: todos los CTA pasan a "lista de espera".

## Jornada Zero (/jornada-zero-detailing)

Estado actual: la página anuncia "Sábado 17 Enero 2026", "Solo 4 de 10 plazas", un contador de cuenta atrás y botones "RESERVAR MI PLAZA - 97€".

Cambios:
- Barra superior: sustituir el countdown "Oferta termina en" por un aviso fijo "Inscripciones cerradas — próxima convocatoria por confirmar". El botón pasa a "Únete a la lista de espera".
- Bloque de fecha del itinerario: "Fecha del Evento: Sábado 17 Enero 2026" pasa a "Próxima convocatoria: Fecha por confirmar". Se mantiene el horario (10:00 - 18:00) como orientativo.
- Bloque de urgencia: eliminar "Solo 4 de 10 plazas" y sustituirlo por un distintivo "Plazas cerradas · Próxima apertura en breve".
- Todos los botones de reserva ("RESERVAR PLAZA", "RESERVAR MI PLAZA - 97€", CTAs de secciones y sticky móvil) pasan a "Avísame cuando abran plazas" y siguen abriendo el modal de registro existente, ahora presentado como lista de espera.
- Añadir un banner destacado bajo el hero explicando el estado: plazas cerradas, fecha por confirmar, precio 97€ + IVA se mantiene y es descontable.

## Up Detail (/up-detail-evento)

Ya funciona en modo preaviso, pero falta un mensaje explícito arriba.

Cambios:
- Añadir en el hero un distintivo claro "Plazas cerradas — próxima edición por confirmar".
- Homogeneizar el texto del sticky móvil y del bloque de preinscripción con la misma redacción que Jornada Zero.
- Mantener el formulario de preinscripción y el mensaje de confirmación tal cual.

## Detalles técnicos

- Archivos: `src/pages/JornadaCero.tsx`, `src/pages/UpDetail.tsx`.
- El componente `Countdown` deja de renderizarse en Jornada Zero (no se elimina del proyecto).
- Sin cambios de datos ni de backend: el modal de registro y la tabla de preinscripciones se reutilizan como lista de espera.
- Solo cambios de UI y copy; se respeta la paleta Charcoal/Garnet y el espaciado actual.

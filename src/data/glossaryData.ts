export type GlossaryCategory =
  | 'exterior'
  | 'interior'
  | 'protecciones'
  | 'herramientas'
  | 'quimicos'
  | 'tecnicas';

export interface GlossaryTerm {
  term: string;
  definition: string;
  category: GlossaryCategory;
  letter: string;
}

export const categoryLabels: Record<GlossaryCategory, string> = {
  exterior: 'Exterior',
  interior: 'Interior',
  protecciones: 'Protecciones',
  herramientas: 'Herramientas',
  quimicos: 'Químicos',
  tecnicas: 'Técnicas',
};

export const categoryColors: Record<GlossaryCategory, string> = {
  exterior: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  interior: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  protecciones: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  herramientas: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  quimicos: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
  tecnicas: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
};

export const categoryBorderLeft: Record<GlossaryCategory, string> = {
  exterior: 'border-l-blue-500/60',
  interior: 'border-l-amber-500/60',
  protecciones: 'border-l-emerald-500/60',
  herramientas: 'border-l-purple-500/60',
  quimicos: 'border-l-rose-500/60',
  tecnicas: 'border-l-cyan-500/60',
};

export const glossaryTerms: GlossaryTerm[] = [
  // A
  {
    term: 'Abrasividad',
    definition: 'Propiedad física de un compuesto o herramienta para remover material de una superficie mediante fricción controlada. En el detallado, se gradúa desde abrasivos de corte pesado hasta pulimentos de acabado ultra fino.',
    category: 'tecnicas',
    letter: 'A',
  },
  {
    term: 'Acid Rain (Lluvia Ácida)',
    definition: 'Precipitación con niveles de pH bajos debido a contaminantes atmosféricos. Al secarse sobre la pintura, los ácidos se concentran y pueden grabar (etch) el barniz, requiriendo pulido mecánico para su eliminación.',
    category: 'exterior',
    letter: 'A',
  },
  {
    term: 'Adhesion (Adherencia)',
    definition: 'Capacidad de un producto protector (cera, sellador o coating) para anclarse a la superficie. Una descontaminación deficiente compromete directamente la adherencia y durabilidad del tratamiento.',
    category: 'protecciones',
    letter: 'A',
  },
  {
    term: 'Agitación',
    definition: 'Acción mecánica de frotar o cepillar una superficie después de aplicar un producto químico para ayudar a desprender la suciedad. Es crítica en la limpieza de neumáticos y tapicerías.',
    category: 'tecnicas',
    letter: 'A',
  },
  {
    term: 'AIO (All In One)',
    definition: 'Producto que integra agentes de limpieza, abrasivos ligeros y una capa de protección en una sola aplicación. Ideales para detallados rápidos de mantenimiento.',
    category: 'quimicos',
    letter: 'A',
  },
  {
    term: 'Alcalino',
    definition: 'Sustancia con pH superior a 7. Los limpiadores alcalinos son excelentes para disolver suciedad grasa, pero pueden resecar materiales sensibles si no se aclaran adecuadamente.',
    category: 'quimicos',
    letter: 'A',
  },
  {
    term: 'Alcantara',
    definition: 'Tejido sintético compuesto por fibras de poliéster y poliuretano que imita al ante. Requiere productos de limpieza de pH neutro y técnicas de frotado mínimas para evitar el "pilling" o formación de bolas en el tejido.',
    category: 'interior',
    letter: 'A',
  },
  {
    term: 'APC (All Purpose Cleaner)',
    definition: 'Limpiador multiuso altamente versátil. Su potencia se ajusta mediante diferentes ratios de dilución, permitiendo su uso en motores, pasos de rueda o interiores delicados.',
    category: 'quimicos',
    letter: 'A',
  },
  {
    term: 'Applicator (Aplicador)',
    definition: 'Herramienta manual, generalmente de esponja o microfibra, diseñada para extender ceras, selladores o acondicionadores de manera uniforme.',
    category: 'herramientas',
    letter: 'A',
  },
  // B
  {
    term: 'Backing Plate (Plato de Soporte)',
    definition: 'Componente de la pulidora donde se fija el pad. Su tamaño debe ser compatible con la órbita de la máquina y el diámetro de la esponja para evitar vibraciones excesivas.',
    category: 'herramientas',
    letter: 'B',
  },
  {
    term: 'Base Coat',
    definition: 'Capa de pintura pigmentada que define el color del vehículo. En sistemas bicapa, esta capa es mate y requiere una capa de barniz superior para obtener brillo y protección.',
    category: 'exterior',
    letter: 'B',
  },
  {
    term: 'Beading',
    definition: 'Efecto hidrofóbico donde el agua forma gotas esféricas debido a la alta tensión superficial creada por un recubrimiento. Es un indicador visual de la presencia de protección activa.',
    category: 'protecciones',
    letter: 'B',
  },
  {
    term: 'Biodegradable',
    definition: 'Capacidad de un producto químico para descomponerse de forma natural por acción de microorganismos. Muchos productos de detallado modernos se formulan bajo este estándar para reducir el impacto ambiental.',
    category: 'quimicos',
    letter: 'B',
  },
  {
    term: 'Bird Dropping Etching',
    definition: 'Daño corrosivo causado por la acidez de los excrementos de aves. Si no se retiran rápidamente, pueden penetrar el barniz y dejar una marca permanente.',
    category: 'exterior',
    letter: 'B',
  },
  {
    term: 'Brake Dust (Polvo de Frenos)',
    definition: 'Mezcla de partículas metálicas ferrosas y residuos de carbono generada por el desgaste de pastillas y discos. Es altamente corrosiva y requiere limpiadores reactivos para su eliminación segura.',
    category: 'exterior',
    letter: 'B',
  },
  {
    term: 'Buffing',
    definition: 'Acto de frotar una superficie con una toalla de microfibra limpia para retirar el exceso de producto o para abrillantar el acabado tras la aplicación de una cera.',
    category: 'tecnicas',
    letter: 'B',
  },
  {
    term: 'Burn (Quemado)',
    definition: 'Daño irreversible causado por exceso de calor o fricción durante el pulido, donde se elimina completamente el barniz y se llega a la base de color o al metal. Se previene controlando la temperatura y la presión.',
    category: 'tecnicas',
    letter: 'B',
  },
  // C
  {
    term: 'Carnauba',
    definition: 'Cera natural extraída de la palma Copernicia prunifera. Valorada por proporcionar un brillo profundo y una apariencia "húmeda", aunque su durabilidad térmica es limitada.',
    category: 'protecciones',
    letter: 'C',
  },
  {
    term: 'Ceramic Coating (Recubrimiento Cerámico)',
    definition: 'Protección de larga duración basada en nanotecnología que crea una unión química permanente o semipermanente con el barniz. Se basa en dióxido de silicio (SiO2) o carburo de silicio (SiC).',
    category: 'protecciones',
    letter: 'C',
  },
  {
    term: 'Cerium Oxide (Óxido de Cerio)',
    definition: 'Mineral de tierras raras utilizado en forma de pasta para pulir cristales. Es el único compuesto capaz de nivelar el vidrio para eliminar arañazos de limpiaparabrisas o marcas de agua severas.',
    category: 'quimicos',
    letter: 'C',
  },
  {
    term: 'Clay Bar (Barra de Arcilla)',
    definition: 'Polímero maleable que, al ser deslizado sobre una superficie debidamente lubricada, captura mecánicamente los contaminantes adheridos al barniz. La lubricación adecuada es fundamental para evitar micro-rayado.',
    category: 'herramientas',
    letter: 'C',
  },
  {
    term: 'Clear Coat (Barniz)',
    definition: 'Barniz transparente final que actúa como barrera protectora del pigmento. Es la capa que se nivela durante la corrección de pintura y tiene un espesor de 35 a 50 micras.',
    category: 'exterior',
    letter: 'C',
  },
  {
    term: 'Compound',
    definition: 'Pulimento de alta abrasividad diseñado para la etapa inicial de corrección. Su función es eliminar defectos profundos de forma rápida, aunque suele requerir un paso posterior de refinado.',
    category: 'quimicos',
    letter: 'C',
  },
  {
    term: 'Contaminación Férrica',
    definition: 'Partículas metálicas microscópicas incrustadas en el barniz. Se detectan mediante productos químicos que cambian de color (púrpura) al entrar en contacto con el hierro.',
    category: 'exterior',
    letter: 'C',
  },
  {
    term: 'Correction (Corrección)',
    definition: 'Etapa del detallado enfocada en la eliminación permanente de defectos mediante pulido mecánico, a diferencia de los productos que solo rellenan o enmascaran.',
    category: 'tecnicas',
    letter: 'C',
  },
  // D
  {
    term: 'DA (Dual Action)',
    definition: 'Tipo de pulidora que combina dos movimientos: una rotación orbital y una rotación sobre su eje. Su naturaleza "aleatoria" evita la acumulación excesiva de calor, haciéndola extremadamente segura.',
    category: 'herramientas',
    letter: 'D',
  },
  {
    term: 'Decontamination (Descontaminación)',
    definition: 'Proceso integral de remoción de impurezas adheridas. Incluye etapas químicas (hierro, alquitrán) y mecánicas (arcilla) para purificar la superficie antes de corrección o protección.',
    category: 'tecnicas',
    letter: 'D',
  },
  {
    term: 'Degreaser (Desengrasante)',
    definition: 'Producto potente formulado para romper moléculas de grasa y aceite. Esencial en la limpieza de motores, bisagras y pasos de rueda.',
    category: 'quimicos',
    letter: 'D',
  },
  {
    term: 'Detailing',
    definition: 'Término anglosajón que define el cuidado minucioso y profesional del automóvil, integrando limpieza, restauración y protección. Va mucho más allá del lavado convencional.',
    category: 'tecnicas',
    letter: 'D',
  },
  {
    term: 'Dressing',
    definition: 'Acondicionador diseñado para devolver el aspecto original a plásticos, gomas y neumáticos, proporcionando además una barrera contra la radiación UV.',
    category: 'protecciones',
    letter: 'D',
  },
  {
    term: 'Dry Aid',
    definition: 'Técnica que consiste en aplicar un Quick Detailer o sellador ligero sobre la carrocería mojada antes de pasar la toalla de secado para aumentar la lubricidad y el brillo.',
    category: 'tecnicas',
    letter: 'D',
  },
  {
    term: 'Drying Towel (Toalla de Secado)',
    definition: 'Toalla de microfibra de gran tamaño y alto GSM (habitualmente con tejido Twist Loop) diseñada para absorber grandes cantidades de agua sin rayar la superficie.',
    category: 'herramientas',
    letter: 'D',
  },
  // E
  {
    term: 'Enzyme Cleaner (Limpiador Enzimático)',
    definition: 'Producto que utiliza enzimas biológicas para digerir manchas orgánicas y eliminar olores de raíz. Extremadamente efectivo en interiores frente a restos de leche, orina o vómito.',
    category: 'quimicos',
    letter: 'E',
  },
  {
    term: 'Etching (Grabado)',
    definition: 'Daño químico permanente en el barniz causado por sustancias ácidas (excrementos de aves, lluvia ácida, savia de árboles) que corroen la superficie si no se retiran a tiempo.',
    category: 'exterior',
    letter: 'E',
  },
  // F
  {
    term: 'Fillers',
    definition: 'Sustancias químicas (como aceites o siliconas) presentes en algunos pulimentos o ceras que rellenan temporalmente los arañazos en lugar de eliminarlos, falseando el resultado de la corrección.',
    category: 'quimicos',
    letter: 'F',
  },
  {
    term: 'Finishing (Refinado)',
    definition: 'Paso final del pulido mecánico que utiliza abrasivos ultra finos para eliminar la neblina de pasos anteriores y lograr el máximo brillo especular.',
    category: 'tecnicas',
    letter: 'F',
  },
  {
    term: 'Flash Time',
    definition: 'Tiempo que tarda un producto aplicado (como un recubrimiento cerámico) en evaporar sus solventes y comenzar a curar, momento en el cual debe ser nivelado o retirado.',
    category: 'tecnicas',
    letter: 'F',
  },
  {
    term: 'Foam Cannon',
    definition: 'Accesorio para hidrolavadoras que genera una espuma densa que se adhiere a la pintura, permitiendo que los agentes químicos actúen durante más tiempo sobre la suciedad.',
    category: 'herramientas',
    letter: 'F',
  },
  {
    term: 'Forced Rotation (Rotación Forzada)',
    definition: 'Mecanismo de pulido donde tanto la órbita como la rotación están mecánicamente vinculadas. Ofrece mayor eficiencia de corte que una DA pura manteniendo cierto margen de seguridad.',
    category: 'herramientas',
    letter: 'F',
  },
  // G
  {
    term: 'Glaze',
    definition: 'Producto cosmético sin capacidad abrasiva que rellena micro-defectos y aumenta la profundidad del color, especialmente en vehículos de color oscuro.',
    category: 'quimicos',
    letter: 'G',
  },
  {
    term: 'Graphene (Grafeno)',
    definition: 'Material compuesto por una capa de átomos de carbono. En detallado, se utiliza para mejorar la resistencia térmica, la dureza y las propiedades antiestáticas de los selladores y coatings.',
    category: 'protecciones',
    letter: 'G',
  },
  {
    term: 'Grit Guard',
    definition: 'Rejilla de plástico colocada en el fondo del cubo de lavado que atrapa los sedimentos pesados, evitando que vuelvan al guante de lavado y rayen la pintura.',
    category: 'herramientas',
    letter: 'G',
  },
  {
    term: 'GSM (Gramos por Metro Cuadrado)',
    definition: 'Unidad que mide la densidad del tejido de microfibra. Un mayor GSM indica generalmente una mayor capacidad de absorción y suavidad. Las toallas de secado premium superan los 1200 GSM.',
    category: 'herramientas',
    letter: 'G',
  },
  // H
  {
    term: 'Haze (Neblina)',
    definition: 'Aspecto opaco o blanquecino que queda en la pintura tras un paso de corte agresivo, causado por las micro-marcas de los abrasivos gruesos. Se elimina con un paso de refinado.',
    category: 'exterior',
    letter: 'H',
  },
  {
    term: 'High Spots',
    definition: 'Acumulaciones excesivas de recubrimiento cerámico que no fueron retiradas a tiempo. Aparecen como manchas oscuras o irisadas y suelen requerir pulido para su corrección tras el curado.',
    category: 'protecciones',
    letter: 'H',
  },
  {
    term: 'Hologramas',
    definition: 'Micro-rayas tridimensionales creadas por el uso incorrecto de una pulidora rotativa. Son visibles bajo la luz directa como estelas de luz que siguen el movimiento del observador.',
    category: 'exterior',
    letter: 'H',
  },
  {
    term: 'Hydrophobic (Hidrofóbico)',
    definition: 'Propiedad de una superficie que repele el agua, provocando que esta se deslice rápidamente en lugar de humectar el sustrato. Es el efecto deseado de ceras, selladores y coatings.',
    category: 'protecciones',
    letter: 'H',
  },
  // I
  {
    term: 'IPA (Alcohol Isopropílico)',
    definition: 'Alcohol isopropílico utilizado habitualmente en diluciones del 15% al 50% para desengrasar la pintura tras el pulido, asegurando que no queden aceites que oculten defectos.',
    category: 'quimicos',
    letter: 'I',
  },
  {
    term: 'Iron Remover (Eliminador de Hierro)',
    definition: 'Limpiador reactivo que disuelve partículas ferrosas incrustadas en el barniz. Al reaccionar, el producto cambia a un color púrpura intenso, indicando la presencia de contaminación férrica.',
    category: 'quimicos',
    letter: 'I',
  },
  // J
  {
    term: 'Jewelling',
    definition: 'Técnica de llevar el acabado de la pintura a un nivel de perfección extrema mediante pulimentos de bajísima abrasividad. Es el refinado final para lograr una claridad cristalina.',
    category: 'tecnicas',
    letter: 'J',
  },
  // L
  {
    term: 'LSP (Last Step Product)',
    definition: 'Término que engloba cualquier producto final aplicado para proteger el vehículo: cera, sellador o recubrimiento cerámico. Es la última capa de protección del proceso de detallado.',
    category: 'protecciones',
    letter: 'L',
  },
  {
    term: 'Lubricante',
    definition: 'Sustancia (habitualmente en spray) diseñada para reducir la fricción entre la pintura y herramientas como la clay bar o toallas de secado, previniendo micro-rayados.',
    category: 'quimicos',
    letter: 'L',
  },
  // M
  {
    term: 'Marring',
    definition: 'Micro-rayado superficial, a menudo causado por el uso de una clay bar sin suficiente lubricación o por frotar la pintura con toallas de baja calidad.',
    category: 'exterior',
    letter: 'M',
  },
  {
    term: 'Microfibra',
    definition: 'Tejido sintético compuesto de poliéster y poliamida. Sus fibras son microscópicas, lo que le permite atrapar suciedad y absorber agua de manera mucho más eficiente que el algodón.',
    category: 'herramientas',
    letter: 'M',
  },
  {
    term: 'Mohs (Escala de)',
    definition: 'Escala de dureza mineral de 1 a 10. A menudo se confunde con la escala del lápiz (H) al hablar de la dureza de los recubrimientos cerámicos.',
    category: 'tecnicas',
    letter: 'M',
  },
  // O
  {
    term: 'Orange Peel (Piel de Naranja)',
    definition: 'Irregularidad en la superficie de la pintura que asemeja la textura de una naranja. Se debe a una mala nivelación de la pintura en fábrica o repintado.',
    category: 'exterior',
    letter: 'O',
  },
  {
    term: 'Orbital',
    definition: 'Se refiere al movimiento de rotación alrededor de un punto central desplazado. Las pulidoras orbitales aleatorias (DA) son las más populares por su seguridad.',
    category: 'herramientas',
    letter: 'O',
  },
  {
    term: 'Oxidación',
    definition: 'Proceso químico donde el barniz reacciona con el oxígeno y la luz UV, volviéndose opaco, blanquecino y áspero al tacto. Requiere pulido mecánico para restaurar el brillo.',
    category: 'exterior',
    letter: 'O',
  },
  {
    term: 'Ozono (Tratamiento de)',
    definition: 'Uso de gas trioxígeno (O₃) para desinfectar y eliminar olores persistentes en el interior de un vehículo. Oxida moléculas de olor y destruye bacterias en conductos de ventilación.',
    category: 'interior',
    letter: 'O',
  },
  // P
  {
    term: 'Pad',
    definition: 'Esponja, lana o disco de microfibra que se acopla a la pulidora. Su densidad y estructura de celda determinan su capacidad de corte o acabado.',
    category: 'herramientas',
    letter: 'P',
  },
  {
    term: 'Paint Correction (Corrección de Pintura)',
    definition: 'Proceso de nivelación mecánica del barniz para eliminar defectos permanentes como swirls, hologramas y arañazos, restaurando la claridad óptica de la superficie.',
    category: 'tecnicas',
    letter: 'P',
  },
  {
    term: 'Paint Transfer (Transferencia de Pintura)',
    definition: 'Depósito de pintura de un objeto externo sobre la carrocería tras un impacto o roce leve. Generalmente puede eliminarse con solventes o pulido sin daño al barniz original.',
    category: 'exterior',
    letter: 'P',
  },
  {
    term: 'pH Neutro',
    definition: 'Valor de pH 7.0 que garantiza seguridad total para materiales delicados y protecciones aplicadas. Ideal para el mantenimiento regular de vehículos con coating cerámico.',
    category: 'quimicos',
    letter: 'P',
  },
  {
    term: 'Polish (Pulimento)',
    definition: 'Producto que contiene partículas abrasivas suspendidas para corregir imperfecciones en el barniz. Existe en diferentes niveles de abrasividad según la etapa de corrección.',
    category: 'quimicos',
    letter: 'P',
  },
  {
    term: 'Polímero',
    definition: 'Molécula de cadena larga utilizada en selladores sintéticos para crear una barrera de protección más duradera que la cera natural, con mejor resistencia química.',
    category: 'protecciones',
    letter: 'P',
  },
  {
    term: 'PPF (Paint Protection Film)',
    definition: 'Lámina de poliuretano transparente de alta resistencia que se aplica sobre la pintura para protegerla contra impactos de piedras, arañazos y vandalismo. Es autoreparable con calor.',
    category: 'protecciones',
    letter: 'P',
  },
  // Q
  {
    term: 'Quick Detailer',
    definition: 'Producto en spray diseñado para una limpieza rápida de polvo ligero y para añadir un extra de brillo y protección instantánea entre lavados completos.',
    category: 'quimicos',
    letter: 'Q',
  },
  // R
  {
    term: 'Rail Dust',
    definition: 'Partículas metálicas procedentes del transporte ferroviario o industrial que se oxidan sobre la pintura. Es una forma común de contaminación férrica.',
    category: 'exterior',
    letter: 'R',
  },
  {
    term: 'Recubrimiento Cerámico (Coating)',
    definition: 'Protección de larga duración basada en nanotecnología (SiO2 o SiC) que crea una unión química permanente o semipermanente con el barniz. Ofrece dureza, brillo y repelencia al agua durante años.',
    category: 'protecciones',
    letter: 'R',
  },
  {
    term: 'RIDS',
    definition: 'Acrónimo de Random Isolated Deeper Scratches. Arañazos profundos que aparecen de forma aleatoria y que suelen requerir una corrección más agresiva que los swirls convencionales.',
    category: 'exterior',
    letter: 'R',
  },
  {
    term: 'Rotativa',
    definition: 'Pulidora que solo realiza un movimiento circular. Es la herramienta de corte más potente pero la más peligrosa para el barniz si no se maneja con experiencia.',
    category: 'herramientas',
    letter: 'R',
  },
  // S
  {
    term: 'Sealant (Sellador)',
    definition: 'Producto de protección sintético formulado con polímeros. Ofrece mayor durabilidad y resistencia química que las ceras naturales, con una duración de 6 a 9 meses.',
    category: 'protecciones',
    letter: 'S',
  },
  {
    term: 'Sheeting',
    definition: 'Efecto por el cual el agua se retira de la carrocería formando una lámina continua, dejando la superficie prácticamente seca. Contrario al beading (gotas esféricas).',
    category: 'protecciones',
    letter: 'S',
  },
  {
    term: 'SiO2 (Dióxido de Silicio)',
    definition: 'Componente principal de los recubrimientos cerámicos, responsable de la dureza y el brillo cristalino. Al aplicarse, forma una capa sólida, transparente y extremadamente resistente.',
    category: 'protecciones',
    letter: 'S',
  },
  {
    term: 'Snow Foam',
    definition: 'Jabón de alta espumabilidad que se aplica antes del lavado manual para ablandar la suciedad sin contacto. Se proyecta con foam cannon y se deja actuar varios minutos.',
    category: 'quimicos',
    letter: 'S',
  },
  {
    term: 'Swirl Marks',
    definition: 'Micro-rayas circulares en el barniz, habitualmente causadas por lavados incorrectos con esponjas inadecuadas o secados agresivos. Son el defecto más común en la pintura de coches usados.',
    category: 'exterior',
    letter: 'S',
  },
  // T
  {
    term: 'Tensioactivo (Surfactante)',
    definition: 'Agente químico que reduce la tensión superficial del agua, permitiendo que esta penetre y encapsule la suciedad de manera más efectiva. Componente base de jabones y champús.',
    category: 'quimicos',
    letter: 'T',
  },
  {
    term: 'Tire Dressing',
    definition: 'Acondicionador de neumáticos que puede ser de base agua (aspecto natural mate) o base solvente (aspecto brillante y mayor duración). Protege contra la degradación UV.',
    category: 'protecciones',
    letter: 'T',
  },
  {
    term: 'Tornador',
    definition: 'Herramienta de limpieza neumática que crea un vórtice de aire y producto para limpiar profundamente moquetas, techos y zonas de difícil acceso en el interior del vehículo.',
    category: 'herramientas',
    letter: 'T',
  },
  {
    term: 'Two Bucket Method',
    definition: 'Método de lavado que utiliza un cubo con jabón y otro con agua limpia para aclarar el guante, evitando que la suciedad vuelva a la carrocería y genere swirl marks.',
    category: 'tecnicas',
    letter: 'T',
  },
  // U
  {
    term: 'UV (Rayos Ultravioleta)',
    definition: 'Radiación solar causante de la degradación del color y la fragilidad de plásticos y cueros. El detallado profesional busca bloquear estos rayos mediante protectores y recubrimientos específicos.',
    category: 'exterior',
    letter: 'U',
  },
  // V
  {
    term: 'Vinyl Protectant',
    definition: 'Producto diseñado para proteger superficies de vinilo y plástico, evitando su agrietamiento y decoloración causados por la exposición a rayos UV y cambios de temperatura.',
    category: 'protecciones',
    letter: 'V',
  },
  // W
  {
    term: 'Water Spots (Marcas de Agua)',
    definition: 'Manchas calcáreas o grabados causados por el secado de agua dura sobre la pintura. Pueden ser superficiales (depósitos minerales) o profundos (grabados en el barniz).',
    category: 'exterior',
    letter: 'W',
  },
  {
    term: 'Wax (Cera)',
    definition: 'Término genérico para productos de protección basados en ceras naturales o sintéticas que proporcionan brillo y repelencia al agua. La cera de carnauba es la más valorada.',
    category: 'protecciones',
    letter: 'W',
  },
  {
    term: 'Wet Look',
    definition: 'Estética visual donde la pintura parece recién pintada y todavía húmeda, característica de las ceras de carnauba de alta calidad y coatings cerámicos premium.',
    category: 'exterior',
    letter: 'W',
  },
  {
    term: 'Wet Sanding (Lijado en Húmedo)',
    definition: 'Técnica de lijado con agua utilizada para eliminar defectos de pintura severos, piel de naranja o para restaurar faros amarillentos. Requiere experiencia para no dañar el barniz.',
    category: 'tecnicas',
    letter: 'W',
  },
  {
    term: 'Wheel Cleaner (Limpiador de Llantas)',
    definition: 'Limpiador específico para llantas. Puede ser ácido, alcalino o neutro reactivo según el tipo de acabado de la llanta (pulida, pintada o cromada).',
    category: 'quimicos',
    letter: 'W',
  },
];

// Get all unique letters that have terms
export const getAvailableLetters = (): string[] => {
  const letters = new Set(glossaryTerms.map(t => t.letter));
  return Array.from(letters).sort();
};

// Get terms grouped by letter
export const getTermsByLetter = (terms: GlossaryTerm[]): Record<string, GlossaryTerm[]> => {
  return terms.reduce((acc, term) => {
    if (!acc[term.letter]) acc[term.letter] = [];
    acc[term.letter].push(term);
    return acc;
  }, {} as Record<string, GlossaryTerm[]>);
};

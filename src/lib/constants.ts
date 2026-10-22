export const PILLARS = [
  {
    number: '01',
    title: 'Nutrición Saludable',
    icon: 'Utensils',
    description: 'Comer bien no es hacer dieta. Es darle a tu cuerpo lo que necesita para tener energía, vitalidad y disfrutar cada comida.',
    benefits: [
      'Más energía y vitalidad en el día a día',
      'Masa muscular y movilidad preservadas',
      'Sistema inmune más fuerte',
      'Mejor salud emocional y concentración',
    ],
    format: '2 teleconsultas/mes con nutricionista especializado',
  },
  {
    number: '02',
    title: 'Bienestar Físico',
    icon: 'Activity',
    description: 'Moverte bien es tu mayor seguro de independencia. No se trata del gimnasio — se trata de que tu cuerpo te lleve adonde querés ir, sin dolor.',
    benefits: [
      'Más movilidad y equilibrio cotidiano',
      'Prevención de lesiones y dolores',
      'Mejor descanso nocturno',
      'Mayor energía para disfrutar el día',
    ],
    format: 'Plan mensual personalizado + seguimiento por teleconsulta',
  },
  {
    number: '03',
    title: 'Salud Emocional',
    icon: 'Heart',
    description: 'Tenés un espacio profesional y cálido para procesar cada etapa de la vida y seguir adelante con fuerza, equilibrio y confianza.',
    benefits: [
      'Menos estrés y ansiedad cotidiana',
      'Más autoestima y motivación',
      'Vínculos familiares más fuertes',
      'Herramientas para adaptarte a los cambios',
    ],
    format: 'Psicología conductual + coaching emocional · 1 consulta/mes',
  },
  {
    number: '04',
    title: 'Teleconsultas en Casa',
    icon: 'Monitor',
    description: 'Sin traslados, sin salas de espera. Tus profesionales te atienden desde la comodidad de tu hogar, con la misma calidad que una consulta presencial.',
    benefits: [
      'Atención profesional sin salir de casa',
      'Horarios preestablecidos y respetados',
      'Seguimiento continuo de tus programas',
      'Comodidad, seguridad y acompañamiento real',
    ],
    format: 'Todas las consultas del programa vía teleconsulta',
  },
  {
    number: '05',
    title: 'Coaching y Bienestar',
    icon: 'Users',
    description: 'Charlas virtuales de coaching ontológico que te dan herramientas concretas para disfrutar esta etapa con propósito, claridad y confianza.',
    benefits: [
      'Desarrollo personal y autoconocimiento',
      'Herramientas para mejorar tus relaciones',
      'Propósito y motivación renovados',
      'Comunidad de personas en tu misma etapa',
    ],
    format: 'Charlas virtuales grupales mensuales',
  },
]

export const PLANS = [
  {
    id: 'esencial',
    name: 'Esencial',
    tagline: 'Primeros pasos hacia el bienestar',
    persona: 'Para quienes dan el primer paso',
    highlighted: false,
    features: [
      '1 consulta de Nutrición por mes',
      'Plan de Actividad Física mensual',
      'Charlas Virtuales de Bienestar',
      'Seguimiento por teleconsulta',
    ],
  },
  {
    id: 'activo',
    name: 'Activo',
    tagline: 'Seguimiento completo e integral',
    persona: 'Ideal para un cambio real',
    highlighted: true,
    badge: 'Más completo',
    features: [
      '2 consultas de Nutrición por mes',
      'Plan de Actividad Física + 1 seguimiento',
      '1 sesión de Salud Emocional por mes',
      'Charlas Virtuales de Coaching',
      'Seguimiento continuo por teleconsulta',
    ],
  },
  {
    id: 'pleno',
    name: 'Pleno',
    tagline: 'Acompañamiento total y personalizado',
    persona: 'Para quienes quieren lo máximo',
    highlighted: false,
    features: [
      '2 consultas de Nutrición por mes',
      'Plan de Actividad Física + seguimientos frecuentes',
      'Sesiones de Salud Emocional ampliadas',
      'Coaching ontológico personalizado',
      'Prioridad en agenda y soporte extendido',
      'Informes de progreso mensuales',
    ],
  },
]

export const EMOTIONAL_HOOKS = [
  {
    icon: 'User',
    title: 'Seguir siendo vos mismo',
    description: 'Independencia, energía y ganas de hacer planes. No querés que te cuiden — querés cuidarte bien.',
  },
  {
    icon: 'Heart',
    title: 'Disfrutar lo que importa',
    description: 'Tu familia, los viajes, el tiempo con quien amás. Querés estar presente y con energía para todo eso.',
  },
  {
    icon: 'Sparkles',
    title: 'Prevenir, no esperar',
    description: 'Los hábitos saludables aumentan la energía, la vitalidad y la calidad de vida. Invertir en salud hoy es ganar independencia para el futuro.',
  },
]

export const PILOT_PERKS = [
  {
    icon: 'Star',
    title: 'Acceso prioritario al programa',
    description: 'Sos parte del grupo fundador. Tu lugar queda reservado antes del lanzamiento oficial.',
  },
  {
    icon: 'MessageCircle',
    title: 'Tu opinión da forma al programa',
    description: 'Tu experiencia durante el piloto influye directamente en cómo evolucionará Proactiva Salud.',
  },
  {
    icon: 'Shield',
    title: 'Seguimiento intensivo del equipo',
    description: 'Durante la prueba piloto, el equipo profesional te acompañará con atención personalizada y constante.',
  },
  {
    icon: 'BadgePercent',
    title: 'Precio especial de piloto',
    description: 'Los participantes del piloto acceden a condiciones exclusivas que no estarán disponibles en el lanzamiento general.',
  },
]

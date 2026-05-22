'use client'

import { motion } from 'framer-motion'
import { Activity, Brain, Apple, Bike, Users } from 'lucide-react'

const PILLARS = [
  {
    icon: Activity,
    title: 'Salud física',
    desc:  'Chequeos, prevención y seguimiento médico para mantener tu cuerpo activo y fuerte.',
    iconBg:    'bg-brand/10',
    iconColor: 'text-brand',
  },
  {
    icon: Brain,
    title: 'Salud emocional',
    desc:  'Bienestar mental, manejo del estrés y fortaleza cognitiva para cada etapa.',
    iconBg:    'bg-orchid/15',
    iconColor: 'text-orchid',
  },
  {
    icon: Apple,
    title: 'Nutrición',
    desc:  'Alimentación consciente y hábitos que sostienen tu energía y vitalidad.',
    iconBg:    'bg-gold/20',
    iconColor: 'text-[#b8942c]',
  },
  {
    icon: Bike,
    title: 'Movimiento',
    desc:  'Actividades adaptadas a tu ritmo de vida para mayor autonomía y bienestar.',
    iconBg:    'bg-sky-soft/20',
    iconColor: 'text-sky-soft',
  },
  {
    icon: Users,
    title: 'Conexión',
    desc:  'Comunidad, vínculos y pertenencia para un envejecimiento activo y acompañado.',
    iconBg:    'bg-sage/20',
    iconColor: 'text-[#5a8860]',
  },
]

export function PillarsSection() {
  return (
    <section className="py-24 bg-white" id="programas">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22,1,0.36,1] }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl lg:text-5xl font-semibold text-navy leading-tight">
            Nuestros pilares para
            <br />
            <span className="text-brand">una vida plena</span>
          </h2>
        </motion.div>

        {/* Pillars grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22,1,0.36,1] }}
              whileHover={{ y: -6 }}
              className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 text-center cursor-default"
            >
              <div
                className={`w-14 h-14 ${p.iconBg} rounded-xl flex items-center justify-center mx-auto mb-4
                            group-hover:scale-110 transition-transform duration-300`}
              >
                <p.icon className={`${p.iconColor} w-6 h-6`} />
              </div>
              <h3 className="font-semibold text-navy text-[14.5px] mb-2">{p.title}</h3>
              <p className="text-[12.5px] text-muted leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
